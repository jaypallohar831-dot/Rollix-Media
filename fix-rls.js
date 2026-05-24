require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function addInsertPolicy() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  console.log('Adding INSERT policy for anon users on contact_leads...\n');

  // Use Supabase's rpc to execute raw SQL via a database function
  // First, create the policy using the service role key via the SQL endpoint
  const { data, error } = await supabase.rpc('exec_sql', {
    query: `CREATE POLICY "Allow anonymous inserts" ON public.contact_leads FOR INSERT TO anon WITH CHECK (true);`
  });

  if (error) {
    // The rpc function might not exist, so let's try the REST SQL endpoint directly
    console.log('rpc method not available, trying direct SQL API...');
    
    const response = await fetch(`${url}/rest/v1/rpc/`, {
      method: 'POST',
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    });
    
    console.log('Direct API response:', response.status);
    
    // If that doesn't work either, provide manual SQL
    console.log('\n========================================');
    console.log('MANUAL FIX REQUIRED - Run this SQL in');
    console.log('Supabase Dashboard > SQL Editor:');
    console.log('========================================\n');
    console.log(`CREATE POLICY "allow_anon_insert_contact_leads"
ON public.contact_leads
FOR INSERT
TO anon
WITH CHECK (true);`);
    console.log('\n========================================');
  } else {
    console.log('✅ Policy added successfully!');
  }
}

addInsertPolicy().catch(console.error);
