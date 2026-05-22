import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const newCategories = [
  { title: 'Web Development', slug: 'web-development' },
  { title: 'Video Editing', slug: 'video-editing' },
  { title: 'Social Media', slug: 'social-media' },
  { title: 'Graphics Designing', slug: 'graphics-designing' },
  { title: 'Marketing', slug: 'marketing' },
  { title: 'SEO and Growth', slug: 'seo-and-growth' },
  { title: 'Business Growth', slug: 'business-growth' }
];

async function updateCategories() {
  // Fetch existing
  const { data: existing, error } = await supabase.from('categories').select('*');
  if (error) {
    console.error('Error fetching', error);
    return;
  }
  
  console.log('Existing categories:', existing.length);
  
  // We will iterate over newCategories, and try to match with an existing one by index
  for (let i = 0; i < newCategories.length; i++) {
    const newCat = newCategories[i];
    if (i < existing.length) {
      // Update existing
      const oldCat = existing[i];
      console.log(`Updating ${oldCat.title} -> ${newCat.title}`);
      await supabase.from('categories').update({
        title: newCat.title,
        slug: newCat.slug,
        status: 'active'
      }).eq('id', oldCat.id);
    } else {
      // Insert new
      console.log(`Inserting new: ${newCat.title}`);
      await supabase.from('categories').insert([{
        title: newCat.title,
        slug: newCat.slug,
        status: 'active'
      }]);
    }
  }
  
  // Disable any leftover categories
  for (let i = newCategories.length; i < existing.length; i++) {
    const oldCat = existing[i];
    console.log(`Disabling leftover: ${oldCat.title}`);
    await supabase.from('categories').update({
      status: 'inactive'
    }).eq('id', oldCat.id);
  }
  
  console.log('Update complete!');
}

updateCategories();
