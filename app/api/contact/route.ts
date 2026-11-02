import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import nodemailer from 'nodemailer';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = {
  name: 120,
  email: 254,
  phone: 40,
  service_interest: 120,
  message: 3000,
};

/* ------------------------------------------------------------------ */
/*  Rate Limiter – max 3 submissions per IP per hour (in-memory)      */
/* ------------------------------------------------------------------ */
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 3;

const ipHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (ipHits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (hits.length >= RATE_LIMIT_MAX) return true;
  hits.push(now);
  ipHits.set(ip, hits);
  return false;
}

// Clean stale entries every 10 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [ip, hits] of ipHits) {
    const valid = hits.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) ipHits.delete(ip);
    else ipHits.set(ip, valid);
  }
}, 10 * 60 * 1000);

/* ------------------------------------------------------------------ */

function cleanString(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function POST(request: Request) {
  try {
    /* ---- Get client IP ---- */
    const hdrs = await headers();
    const ip =
      hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      hdrs.get('x-real-ip') ||
      'unknown';

    /* ---- Rate limit check ---- */
    if (isRateLimited(ip)) {
      console.warn(`[Contact API] Rate limited IP: ${ip}`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    /* ---- Honeypot check (bots fill hidden fields) ---- */
    if (body.website || body.company_url) {
      console.warn(`[Contact API] Honeypot triggered from IP: ${ip}`);
      // Return success so bots think it worked — don't reveal detection
      return NextResponse.json({ success: true });
    }

    const name = cleanString(body.name, LIMITS.name);
    const email = cleanString(body.email, LIMITS.email).toLowerCase();
    const phone = cleanString(body.phone, LIMITS.phone);
    const service_interest = cleanString(body.service_interest, LIMITS.service_interest);
    const message = cleanString(body.message, LIMITS.message);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { error: 'A valid email address is required' },
        { status: 400 }
      );
    }

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabaseKey = serviceRoleKey || anonKey;

    if (!supabaseKey) {
      console.error('[Contact API] No Supabase key available (neither SERVICE_ROLE nor ANON)');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    console.log(`[Contact API] Using ${serviceRoleKey ? 'SERVICE_ROLE' : 'ANON'} key`);

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    /* ---- Duplicate check: same email within 5 minutes ---- */
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: recentLead } = await supabase
      .from('contact_leads')
      .select('id')
      .eq('email', email)
      .gte('created_at', fiveMinAgo)
      .limit(1)
      .maybeSingle();

    if (recentLead) {
      console.warn(`[Contact API] Duplicate submission blocked for: ${email}`);
      // Return success so user doesn't keep retrying
      return NextResponse.json({
        success: true,
        message: 'Your inquiry has already been received. We will get back to you soon!',
      });
    }

    const { error } = await supabase
      .from('contact_leads')
      .insert([
        {
          name,
          email,
          phone,
          service_interest,
          message,
          status: 'new',
        },
      ]);


    let dbInsertSuccess = false;
    let dbErrorMessage: string | null = null;

    if (error) {
      const { isSupabaseQuotaError } = await import('@/lib/supabase-error-handler');
      if (isSupabaseQuotaError(error)) {
        console.warn('[Contact API] Supabase DB is restricted due to quota. Proceeding with email delivery fallback.');
      } else {
        console.error('[Contact API] Supabase error inserting contact lead:', error.message);
      }
      dbErrorMessage = error.message;
    } else {
      dbInsertSuccess = true;
    }

    let emailSent = false;
    let emailError: string | null = null;

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const adminEmail = process.env.ADMIN_EMAIL;

    console.log('[Contact API] Email config check:', {
      SMTP_USER: smtpUser ? '✓ set' : '✗ missing',
      SMTP_PASS: smtpPass ? '✓ set' : '✗ missing',
      ADMIN_EMAIL: adminEmail ? '✓ set' : '✗ missing',
      SMTP_HOST: process.env.SMTP_HOST || '(default: smtp.gmail.com)',
    });

    if (smtpUser && smtpPass && adminEmail) {
      try {
        const isGmail = (process.env.SMTP_HOST || 'smtp.gmail.com').includes('gmail.com');
        const transporter = nodemailer.createTransport(isGmail ? {
          service: 'gmail',
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        } : {
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.SMTP_PORT || '587', 10),
          secure: process.env.SMTP_PORT === '465',
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        // console.log('[Contact API] Verifying SMTP connection...');
        // await transporter.verify();
        // console.log('[Contact API] SMTP connection verified successfully');

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safePhone = escapeHtml(phone || 'Not provided');
        const safeService = escapeHtml(service_interest || 'Not specified');
        const safeMessage = escapeHtml(message);
        const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/messages`;

        const info = await transporter.sendMail({
          from: `"Ampledia Lead" <${smtpUser}>`,
          replyTo: email,
          to: adminEmail,
          subject: `[Ampledia Lead] ${service_interest || 'Inquiry'} from ${name}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; border: 1px solid rgba(124, 58, 237, 0.2); border-radius: 16px; background-color: #ffffff;">
              <div style="border-bottom: 2px solid #7C3AED; padding-bottom: 16px; margin-bottom: 20px;">
                <h2 style="color: #1A0F33; margin: 0; font-size: 20px; font-weight: 700;">Ampledia — New Client Inquiry</h2>
                <p style="color: #6B7280; margin: 4px 0 0; font-size: 13px;">Received via Ampledia contact portal</p>
              </div>

              <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; width: 130px; color: #6B7280; font-size: 13px;"><strong>Client Name:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #111827; font-size: 14px; font-weight: 600;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-size: 13px;"><strong>Email:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #7C3AED; font-size: 14px;"><a href="mailto:${safeEmail}" style="color: #7C3AED; text-decoration: none;">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-size: 13px;"><strong>Phone:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #111827; font-size: 14px;">${safePhone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-size: 13px;"><strong>Service Interest:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #7C3AED; font-size: 14px; font-weight: 600;">${safeService}</td>
                </tr>
              </table>

              <div style="margin-top: 24px; padding: 16px; background-color: #F9FAFB; border-left: 3px solid #7C3AED; border-radius: 8px;">
                <h4 style="margin: 0 0 8px; color: #374151; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Message Brief:</h4>
                <p style="color: #1F2937; line-height: 1.6; margin: 0; font-size: 14px; white-space: pre-wrap;">${safeMessage}</p>
              </div>

              <div style="margin-top: 32px; text-align: center;">
                <a href="${dashboardUrl}" style="display: inline-block; background-color: #7C3AED; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 9999px; font-size: 13px; font-weight: 600; letter-spacing: 0.05em;">View Lead in Studio Dashboard</a>
              </div>

              <div style="margin-top: 32px; border-top: 1px solid #E5E7EB; padding-top: 16px; text-align: center; color: #9CA3AF; font-size: 11px;">
                Ampledia (formerly Rollix Media) • Bhilwara, Rajasthan 311001 • <a href="https://ampledia.in" style="color: #7C3AED; text-decoration: none;">ampledia.in</a>
              </div>
            </div>
          `,
        });

        console.log('[Contact API] Email sent successfully:', info.messageId);
        emailSent = true;
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err);
        console.error('[Contact API] Email notification FAILED:', errMsg);
        emailError = errMsg;
      }
    } else {
      console.warn('[Contact API] Email notification skipped — missing SMTP_USER, SMTP_PASS, or ADMIN_EMAIL');
      emailError = 'Email not configured';
    }

    if (!dbInsertSuccess && !emailSent) {
      return NextResponse.json(
        { error: 'Unable to process your inquiry at this moment due to scheduled system maintenance. Please reach out to us directly via email or phone.' },
        { status: 503 }
      );
    }

    return NextResponse.json({ success: true, emailSent });
  } catch (error) {
    console.error('Contact Form Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
