import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { PORTFOLIO_ITEMS } from './lib/portfolio.js';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function seed() {
  console.log('Seeding database...');
  for (const item of PORTFOLIO_ITEMS) {
    const { error } = await supabase.from('portfolio_projects').insert({
      title: item.title,
      slug: item.id,
      description: item.description,
      seo_title: item.tagline,
      thumbnail: item.image,
      video_url: item.videoUrl,
      location: item.location,
      tags: item.tags,
      featured: item.featured || false,
    });
    if (error) {
      console.error('Error inserting', item.title, error.message);
    } else {
      console.log('Inserted', item.title);
    }
  }
  console.log('Done!');
}

seed();
