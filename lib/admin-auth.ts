import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export class AdminAuthError extends Error {
  constructor(
    public readonly status: 401 | 403,
    message: string,
  ) {
    super(message);
    this.name = 'AdminAuthError';
  }
}

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new AdminAuthError(401, 'Unauthorized');
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const userEmail = user.email?.trim().toLowerCase();
  const isAdminEmail = adminEmail && userEmail === adminEmail;
  if (!isAdminEmail && (profileError || profile?.role !== 'admin')) {
    throw new AdminAuthError(403, 'Forbidden');
  }

  return { supabase, user, profile: profile || { role: 'admin' } };
}

export async function requireAdminOrRedirect() {
  try {
    return await requireAdmin();
  } catch {
    redirect('/admin/login');
  }
}
