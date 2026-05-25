import { createClient } from '@/lib/supabase/server';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://rollixmedia.vercel.app';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
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
  ];

  // Dynamic portfolio pages from Supabase
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
      priority: 0.8,
    }));

    return [...staticPages, ...projectPages];
  } catch {
    return staticPages;
  }
}
