import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ProjectDetail } from './project-detail';
import {
  getPortfolioItem as getFallbackItem,
  PORTFOLIO_ITEMS as fallbackItems,
  type PortfolioItem,
} from '@/lib/portfolio';

const BASE_URL = 'https://rollixmedia.vercel.app';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ── Fetch helper (server-side) ──────────────────────────────────────────────
async function fetchProject(slug: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*, categories(title, slug)')
      .eq('slug', slug)
      .single();
    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

async function fetchRelated(slug: string) {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('portfolio_projects')
      .select('slug, title, thumbnail, video_url, categories(title), seo_title, tags, created_at')
      .eq('status', 'published')
      .neq('slug', slug)
      .order('created_at', { ascending: false })
      .limit(6);
    return data || [];
  } catch {
    return [];
  }
}

// ── Automatic SEO Metadata ──────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const project = await fetchProject(decodedSlug);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  const category = project.categories?.title || 'Digital Marketing';
  const location = project.location || 'Bhilwara, Rajasthan';

  // Auto-generate SEO title and description if not manually set
  const seoTitle = project.seo_title ||
    `${project.title} — Rollix Media Portfolio`;

  const seoDescription = project.seo_description ||
    `Watch "${project.title}" by Rollix Media — a premium ${category} project${project.location ? ` in ${location}` : ''}. Professional video editing & digital marketing agency in Bhilwara, India.`;

  const thumbnail = project.thumbnail ||
    `${BASE_URL}/og-image.jpg`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      project.title,
      category,
      'Rollix Media',
      'digital marketing Bhilwara',
      'video editing Rajasthan',
      ...(project.tags || []),
      location,
    ],
    authors: [{ name: 'Rollix Media', url: BASE_URL }],
    openGraph: {
      type: 'video.other',
      url: `${BASE_URL}/portfolio/${slug}`,
      title: seoTitle,
      description: seoDescription,
      images: [
        {
          url: thumbnail,
          width: 1280,
          height: 720,
          alt: project.title,
        },
      ],
      siteName: 'Rollix Media',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [thumbnail],
      creator: '@rollixmedia',
    },
    alternates: {
      canonical: `${BASE_URL}/portfolio/${slug}`,
    },
  };
}

// ── Page Component (Server Component) ──────────────────────────────────────
export default async function FilmDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const [projectData, relatedRaw] = await Promise.all([
    fetchProject(decodedSlug),
    fetchRelated(decodedSlug),
  ]);

  // Map DB data → PortfolioItem shape
  const item: PortfolioItem | null = projectData
    ? {
        id: projectData.slug,
        title: projectData.title,
        category: projectData.categories?.title || 'Uncategorized',
        tagline: projectData.seo_title || projectData.title,
        description: projectData.description,
        year: new Date(projectData.created_at).getFullYear().toString(),
        month: projectData.month,
        image: projectData.thumbnail || getFallbackItem(decodedSlug)?.image || '/assets/portfolio/wedding.png',
        mediaType: (projectData.video_url ? 'video' : 'image') as 'video' | 'image',
        videoUrl: projectData.video_url || undefined,
        tags: projectData.tags || [],
        location: projectData.location || 'India',
        client: projectData.client,
        duration: projectData.duration,
        crew: projectData.crew || [],
        strategy: projectData.strategy,
        deliverables: projectData.deliverables || [],
        gallery: (projectData.gallery_images || []).map((img: string) => ({
          type: 'image' as const,
          src: img,
          alt: '',
        })),
      }
    : getFallbackItem(decodedSlug) || null;

  if (!item) notFound();

  const relatedItems: PortfolioItem[] = relatedRaw.length > 0
    ? relatedRaw
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((p) => ({
          id: p.slug,
          title: p.title,
          category: (p.categories as { title: string } | { title: string }[] | null | undefined) ? (Array.isArray(p.categories) ? (p.categories as { title: string }[])[0]?.title : (p.categories as { title: string })?.title) || 'Uncategorized' : 'Uncategorized',
          tagline: p.seo_title || p.title,
          description: '',
          image: p.thumbnail || '/assets/portfolio/wedding.png',
          year: new Date(p.created_at).getFullYear().toString(),
          mediaType: (p.video_url ? 'video' : 'image') as 'video' | 'image',
          videoUrl: p.video_url || undefined,
          tags: p.tags || [],
        }))
    : fallbackItems.filter((p) => p.id !== decodedSlug).slice(0, 3);

  // ── JSON-LD Structured Data ──────────────────────────────────────────────
  const category = projectData?.categories?.title || 'Video Production';
  const seoDescription =
    projectData?.seo_description ||
    `Watch "${item.title}" by Rollix Media — a premium ${category} project. Professional digital marketing agency in Bhilwara, India.`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': item.videoUrl ? 'VideoObject' : 'CreativeWork',
    name: item.title,
    description: seoDescription,
    thumbnailUrl: item.image,
    ...(item.videoUrl && { contentUrl: item.videoUrl }),
    uploadDate: projectData?.created_at || new Date().toISOString(),
    genre: category,
    locationCreated: {
      '@type': 'Place',
      name: item.location || 'Bhilwara, Rajasthan, India',
    },
    creator: {
      '@type': 'Organization',
      name: 'Rollix Media',
      url: BASE_URL,
      logo: `${BASE_URL}/assets/logo.png`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rollix Media',
      url: BASE_URL,
    },
    url: `${BASE_URL}/portfolio/${slug}`,
    keywords: (item.tags || []).join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetail item={item} relatedItems={relatedItems} slug={decodedSlug} />
    </>
  );
}
