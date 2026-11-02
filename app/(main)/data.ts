/**
 * Server-side data fetching for the homepage.
 *
 * Runs all 3 Supabase queries in parallel using Promise.allSettled,
 * so they don't waterfall. Data arrives with the initial HTML —
 * no client-side spinners needed.
 */
import { createClient } from '@/lib/supabase/server';
import type { PortfolioItem } from '@/lib/portfolio';
import type { ServiceItem } from '@/lib/services';
import { SERVICES as fallbackServices } from '@/lib/services';
import type { PortfolioProject, PortfolioProjectDetail } from '@/services/portfolio.service';
import {
  Film, Video, Scissors, TrendingUp, Sparkles,
  Share2, Megaphone, Monitor, Zap
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Film, Video, Scissors, TrendingUp, Sparkles,
  Share2, Megaphone, Monitor, Zap,
};

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  avatar_url?: string;
}

export interface HomepageData {
  portfolioProjects: PortfolioItem[];
  services: ServiceItem[];
  testimonials: Testimonial[];
}

import { supabaseCircuitBreaker, withTimeout, isSupabaseQuotaError } from '@/lib/supabase-error-handler';

export async function getHomepageData(): Promise<HomepageData> {
  const { VISION_CLASSES_PROJECT } = await import('@/lib/portfolio');

  if (supabaseCircuitBreaker.shouldThrottle()) {
    return {
      portfolioProjects: [VISION_CLASSES_PROJECT],
      services: fallbackServices,
      testimonials: [],
    };
  }

  let portfolioResult: any = { status: 'rejected' };
  let servicesResult: any = { status: 'rejected' };
  let testimonialsResult: any = { status: 'rejected' };

  try {
    const supabase = await createClient();

    const fetchPortfolio = () => supabase
      .from('portfolio_projects')
      .select('*, categories(title, slug)')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    const fetchServices = () => supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: true });

    const fetchTestimonials = () => supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    const results = await Promise.allSettled([
      withTimeout<any>(Promise.resolve(fetchPortfolio()), 2500, { data: null, error: new Error('Timeout') }),
      withTimeout<any>(Promise.resolve(fetchServices()), 2500, { data: null, error: new Error('Timeout') }),
      withTimeout<any>(Promise.resolve(fetchTestimonials()), 2500, { data: null, error: new Error('Timeout') }),
    ]);

    portfolioResult = results[0];
    servicesResult = results[1];
    testimonialsResult = results[2];

    const hasErrors = results.some(
      r => r.status === 'rejected' || (r.status === 'fulfilled' && (r.value as any)?.error)
    );
    if (hasErrors) {
      const err = results.find(r => r.status === 'rejected' || (r.status === 'fulfilled' && (r.value as any)?.error));
      const actualError = err?.status === 'rejected' ? err.reason : (err?.value as any)?.error;
      if (isSupabaseQuotaError(actualError)) {
        supabaseCircuitBreaker.recordFailure(actualError, 'getHomepageData');
      }
    }
  } catch (err) {
    if (isSupabaseQuotaError(err)) {
      supabaseCircuitBreaker.recordFailure(err, 'getHomepageData');
    }
  }

  // --- Map portfolio ---
  let portfolioProjects: PortfolioItem[] = [];
  if (portfolioResult.status === 'fulfilled' && portfolioResult.value.data) {
    portfolioProjects = portfolioResult.value.data
      .map((item: PortfolioProjectDetail) => ({
        id: item.slug,
        title: item.title,
        category: item.categories?.title || 'Uncategorized',
        tagline: item.seo_title || item.title,
        description: item.description,
        year: new Date(item.created_at).getFullYear().toString(),
        image: item.thumbnail || '/assets/portfolio/wedding.webp',
        mediaType: (item.video_url && item.video_url !== '/assets/loader-bg.mp4') ? 'video' as const : 'image' as const,
        videoUrl: (item.video_url && item.video_url !== '/assets/loader-bg.mp4') ? item.video_url : undefined,
        deliverables: item.deliverables || [],
        tags: item.tags || [],
        featured: item.featured,
      }));
  }

  const hasVisionClasses = portfolioProjects.some(p => p.id === 'vision-classes-bhilwara');
  if (!hasVisionClasses) {
    const { VISION_CLASSES_PROJECT } = await import('@/lib/portfolio');
    portfolioProjects.unshift(VISION_CLASSES_PROJECT);
  }

  // --- Map services ---
  let services: ServiceItem[] = fallbackServices;
  if (servicesResult.status === 'fulfilled' && servicesResult.value.data?.length) {
    services = servicesResult.value.data.map(
      (s: { slug: string; title: string; description: string; icon: string; featured?: boolean }, idx: number) => ({
        index: (idx + 1).toString().padStart(2, '0'),
        slug: s.slug,
        title: s.title,
        description: s.description,
        icon: iconMap[s.icon] || Zap,
        featured: s.featured,
      })
    );
  }

  // --- Testimonials ---
  let testimonials: Testimonial[] = [];
  if (testimonialsResult.status === 'fulfilled' && testimonialsResult.value.data) {
    testimonials = testimonialsResult.value.data as Testimonial[];
  }

  return { portfolioProjects, services, testimonials };
}
