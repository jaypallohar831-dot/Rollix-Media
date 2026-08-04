import { createClient } from '@supabase/supabase-js';
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo.config';

const baseUrl = SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Static core pages (priority ordered as per SEO best practice) ──
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/case-studies/vision-classes-bhilwara`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/compress`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // ── Individual Service pages (keyword-rich URLs) ──
  const servicePages: MetadataRoute.Sitemap = [
    'wedding-shooting',
    'videography',
    'video-editing',
    'social-media',
    'web-design',
    'graphic-design',
    'seo-dominance',
    'digital-marketing',
  ].map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  // ── Dynamic portfolio pages from Supabase ──
  // NOTE: We use the raw Supabase client here (not the SSR cookie client)
  // because sitemap.xml is called by Google's bot which has no cookies.
  // Using the cookie-based client causes a 500 error, making Google unable to fetch the sitemap.
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: projects } = await supabase
      .from('portfolio_projects')
      .select('slug, updated_at, thumbnail')
      .eq('status', 'published');

    const projectPages: MetadataRoute.Sitemap = (projects || []).map((project) => {
      // Sanitize slug — remove any special chars (e.g. encoded colons %3A) that break sitemap validation
      const cleanSlug = project.slug
        .toLowerCase()
        .replace(/[^a-z0-9\-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      return {
        url: `${baseUrl}/portfolio/${cleanSlug}`,
        lastModified: new Date(project.updated_at),
        changeFrequency: 'monthly' as const,
        priority: 0.75,
        ...(project.thumbnail && {
          images: [project.thumbnail],
        }),
      };
    });

    return [...staticPages, ...servicePages, ...projectPages];
  } catch {
    // Fallback: return static pages only if Supabase is unavailable
    return [...staticPages, ...servicePages];
  }
}
