require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY  // service role bypasses RLS
);

// Slugs to fix: old → new
const SLUG_FIXES = [
  { old: 'varun-collection-',                                        new: 'varun-collection' },
  { old: 'vaya-tribe-',                                             new: 'vaya-tribe' },
  { old: "urban-style-men's-wear:-stop-motion-collection-reel",     new: 'urban-style-mens-wear-stop-motion-reel' },
  { old: 'divine-ram-lalla-themed-event-decor-&-celebration-walkthrough', new: 'divine-ram-lalla-event-decor-walkthrough' },
];

async function fixSlugs() {
  console.log('🔧 Starting slug fixes...\n');

  for (const fix of SLUG_FIXES) {
    console.log(`Updating: "${fix.old}" → "${fix.new}"`);

    const { data, error } = await supabase
      .from('portfolio_projects')
      .update({ slug: fix.new })
      .eq('slug', fix.old)
      .select('id, title, slug');

    if (error) {
      console.error(`  ❌ Error:`, error.message);
    } else if (!data || data.length === 0) {
      console.log(`  ⚠️  Not found — skipping (slug may already be fixed)`);
    } else {
      console.log(`  ✅ Updated: "${data[0].title}"`);
    }
  }

  console.log('\n✅ Done! Verify below:\n');

  // Verify
  const { data: projects } = await supabase
    .from('portfolio_projects')
    .select('title, slug')
    .order('created_at', { ascending: false });

  projects?.forEach(p => console.log(`  ${p.slug}  →  "${p.title}"`));
}

fixSlugs().catch(console.error);
