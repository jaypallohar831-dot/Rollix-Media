import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Ignore in server context
            }
          },
        },
      }
    );

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .maybeSingle();

    console.log("LOGIN DEBUG:", {
      userEmail: data.user.email,
      envAdminEmail: process.env.ADMIN_EMAIL,
      profile: profile,
      profileError: profileError,
    });

    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const userEmail = data.user.email?.trim().toLowerCase();
    const isAdminEmail = adminEmail && userEmail === adminEmail;

    if (!isAdminEmail && (profileError || profile?.role !== 'admin')) {
      await supabase.auth.signOut();
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    return NextResponse.json({ success: true, user: data.user, profile: profile || { role: 'admin' } });
  } catch (error) {
    console.error('Admin Login Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
