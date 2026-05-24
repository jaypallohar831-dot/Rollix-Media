// ONE-TIME setup endpoint to add RLS INSERT policy for contact_leads
// DELETE THIS FILE after running it once!

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Security: only allow with a secret query param
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  
  if (secret !== 'fix-rls-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Diagnostic: check which keys are available
  const diagnostics = {
    SUPABASE_SERVICE_ROLE_KEY: serviceRoleKey ? `exists (${serviceRoleKey.slice(0, 20)}...)` : 'MISSING',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: anonKey ? `exists (${anonKey.slice(0, 20)}...)` : 'MISSING',
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'MISSING',
    SMTP_USER: process.env.SMTP_USER ? 'set' : 'MISSING',
    SMTP_PASS: process.env.SMTP_PASS ? 'set' : 'MISSING',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL ? 'set' : 'MISSING',
  };

  // Test insert with available key
  const { createClient } = await import('@supabase/supabase-js');
  
  const results: Record<string, string> = {};
  
  // Test with service role key
  if (serviceRoleKey) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      serviceRoleKey,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );
    
    const { data, error } = await supabase
      .from('contact_leads')
      .insert([{ name: 'RLS Test', email: 'rls-test@test.com', message: 'test', status: 'new' }])
      .select('id')
      .single();
    
    if (error) {
      results.serviceRoleInsert = `FAILED: ${error.message}`;
    } else {
      results.serviceRoleInsert = `SUCCESS (id: ${data.id})`;
      // Clean up
      await supabase.from('contact_leads').delete().eq('id', data.id);
      results.cleanup = 'done';
    }
  } else {
    results.serviceRoleInsert = 'SKIPPED - no key';
  }

  // Test with anon key
  if (anonKey) {
    const anonClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      anonKey
    );
    
    const { error } = await anonClient
      .from('contact_leads')
      .insert([{ name: 'Anon Test', email: 'anon-test@test.com', message: 'test', status: 'new' }])
      .select('id')
      .single();
    
    results.anonInsert = error ? `FAILED: ${error.message}` : 'SUCCESS';
  }

  return NextResponse.json({ diagnostics, results }, { status: 200 });
}
