import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = {
  name: 120,
  email: 254,
  phone: 40,
  service_interest: 120,
  message: 3000,
};

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
    const body = await request.json();
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

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase
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
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error inserting contact lead:', error.message);
      return NextResponse.json(
        { error: `Database Error: ${error.message}` },
        { status: 500 }
      );
    }

    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASS && process.env.ADMIN_EMAIL) {
        const isGmail = (process.env.SMTP_HOST || 'smtp.gmail.com').includes('gmail.com');
        const transporter = nodemailer.createTransport(isGmail ? {
          service: 'gmail',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        } : {
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.SMTP_PORT || '587', 10),
          secure: process.env.SMTP_PORT === '465',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.verify();

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safePhone = escapeHtml(phone || 'Not provided');
        const safeService = escapeHtml(service_interest || 'Not specified');
        const safeMessage = escapeHtml(message);
        const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/messages`;

        await transporter.sendMail({
          from: `"Rollix Media Lead" <${process.env.SMTP_USER}>`,
          replyTo: email,
          to: process.env.ADMIN_EMAIL,
          subject: `New Lead: ${service_interest || 'General Inquiry'} from ${name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaec; border-radius: 10px;">
              <h2 style="color: #333;">New Inquiry Received</h2>
              <p style="color: #555;">You have received a new message from your website's contact form.</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; width: 120px;"><strong>Name:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${safePhone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Service:</strong></td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${safeService}</td>
                </tr>
              </table>
              <div style="margin-top: 20px; padding: 15px; background-color: #f9f9fa; border-radius: 8px;">
                <h4 style="margin-top: 0; color: #444;">Message:</h4>
                <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
              </div>
              <div style="margin-top: 30px; text-align: center;">
                <a href="${dashboardUrl}" style="background-color: #D4763C; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">View in Dashboard</a>
              </div>
            </div>
          `,
        });
      }
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Contact Form Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
