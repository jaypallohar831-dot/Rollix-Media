const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkDB() {
  const { data, error } = await supabase.from('portfolio_projects').select('id, videoUrl');
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
}

checkDB();
