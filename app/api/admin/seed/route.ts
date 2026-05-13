import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { PORTFOLIO_ITEMS } from '@/lib/portfolio';

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    let count = 0;
    for (const item of PORTFOLIO_ITEMS) {
      const { error } = await supabase.from('portfolio_projects').upsert({
        title: item.title,
        slug: item.id,
        description: item.description || '',
        seo_title: item.tagline,
        thumbnail: item.image,
        video_url: item.videoUrl || '',
        location: item.location || '',
        tags: item.tags || [],
        featured: item.featured || false,
      }, { onConflict: 'slug' });
      
      if (!error) count++;
      else console.error('Error inserting:', error);
    }
    
    return NextResponse.json({ success: true, count, message: 'Database seeded successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
