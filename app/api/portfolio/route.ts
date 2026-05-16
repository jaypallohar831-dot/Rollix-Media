import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { AdminAuthError, requireAdmin } from '@/lib/admin-auth';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
setAll() {
             // Read-only, no need to set
           },
        },
      }
    );

    let query = supabase
      .from('portfolio_projects')
      .select('*, categories(title, slug)')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (category) {
      const normalizedCategory = category.trim().toLowerCase();
      if (!/^[a-z0-9-]+$/.test(normalizedCategory)) {
        return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
      }

      const { data: categoryRow, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', normalizedCategory)
        .maybeSingle();

      if (categoryError) throw categoryError;
      query = categoryRow ? query.eq('category_id', categoryRow.id) : query.eq('category_id', '00000000-0000-0000-0000-000000000000');
    }

    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Fetch Portfolio Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { supabase } = await requireAdmin();

    const body = await request.json();
    const {
      title,
      slug,
      description,
      thumbnail,
      gallery_images,
      category_id,
      tags,
      featured,
      status,
      seo_title,
      seo_description,
    } = body;

    const { data, error } = await supabase
      .from('portfolio_projects')
      .insert([
        {
          title,
          slug,
          description,
          thumbnail,
          gallery_images,
          category_id,
          tags,
          featured,
          status,
          seo_title,
          seo_description,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Insert Portfolio Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error('Create Portfolio Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
