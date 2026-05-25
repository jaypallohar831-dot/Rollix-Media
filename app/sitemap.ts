import { createClient } from '@/lib/supabase/server';
import type { MetadataRoute } from 'next';

const baseUrl = 'https://rollixmedia.vercel.app';

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
      priority: 0.9,  // Services rank higher than portfolio
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
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
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
    priority: 0.85,  // Service sub-pages are high value
  }));

  // ── Dynamic portfolio pages from Supabase ──
  try {
    const supabase = await createClient();
    const { data: projects } = await supabase
      .from('portfolio_projects')
      .select('slug, updated_at')
      .eq('status', 'published');

    const projectPages: MetadataRoute.Sitemap = (projects || []).map((project) => ({
      url: `${baseUrl}/portfolio/${encodeURIComponent(project.slug)}`,
      lastModified: new Date(project.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }));

    return [...staticPages, ...servicePages, ...projectPages];
  } catch {
    return [...staticPages, ...servicePages];
  }
}
