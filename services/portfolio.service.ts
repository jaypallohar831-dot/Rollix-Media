import { supabaseClient } from './supabase-client';

export interface PortfolioProject {
  slug: string;
  title: string;
  description: string;
  seo_title: string;
  thumbnail: string;
  video_url?: string;
  location?: string;
  tags?: string[];
  featured?: boolean;
  created_at: string;
  categories?: { title: string };
}

export type Deliverable = {
  id: string;
  title: string;
  type: 'video' | 'image' | 'document';
  url: string;
};

export interface PortfolioProjectDetail extends PortfolioProject {
  id: string;
  category_id?: string;
  gallery_images?: string[];
  client?: string;
  duration?: string;
  crew?: Array<{ role: string; name: string }>;
  month?: string;
  status?: string;
  live_url?: string;
  strategy?: {
    objective?: string;
    approach?: string[];
    tools?: string[];
    results?: string[];
  };
  deliverables?: Deliverable[];
}

import {
  supabaseCircuitBreaker,
  isSupabaseQuotaError,
  SupabaseServiceUnavailableError,
} from '@/lib/supabase-error-handler';

let cachedProjects: { data: PortfolioProject[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export const portfolioService = {
  clearCache(resetCircuitBreaker = false) {
    cachedProjects = null;
    if (resetCircuitBreaker) {
      supabaseCircuitBreaker.reset();
    }
  },

  async getProjects(forceFresh = false): Promise<PortfolioProject[]> {
    if (!forceFresh && cachedProjects && (Date.now() - cachedProjects.timestamp < CACHE_TTL_MS)) {
      return cachedProjects.data;
    }

    if (!forceFresh && supabaseCircuitBreaker.shouldThrottle()) {
      throw new SupabaseServiceUnavailableError(
        'Service is temporarily throttled due to quota restrictions',
        true
      );
    }

    try {
      const { data, error } = await supabaseClient
        .from('portfolio_projects')
        .select('*, categories(title, slug)')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) {
        supabaseCircuitBreaker.recordFailure(error, 'portfolioService.getProjects');
        throw new SupabaseServiceUnavailableError(error.message, isSupabaseQuotaError(error));
      }

      supabaseCircuitBreaker.recordSuccess();
      cachedProjects = { data: data as PortfolioProject[], timestamp: Date.now() };
      return data as PortfolioProject[];
    } catch (err) {
      if (err instanceof SupabaseServiceUnavailableError) throw err;
      supabaseCircuitBreaker.recordFailure(err, 'portfolioService.getProjects');
      throw new SupabaseServiceUnavailableError(
        err instanceof Error ? err.message : 'Failed to fetch projects',
        isSupabaseQuotaError(err)
      );
    }
  },

  async getProjectBySlug(slug: string): Promise<PortfolioProjectDetail | null> {
    if (supabaseCircuitBreaker.shouldThrottle()) {
      throw new SupabaseServiceUnavailableError(
        'Service is temporarily throttled due to quota restrictions',
        true
      );
    }

    try {
      const { data, error } = await supabaseClient
        .from('portfolio_projects')
        .select('*, categories(title, slug)')
        .eq('slug', slug)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        supabaseCircuitBreaker.recordFailure(error, `portfolioService.getProjectBySlug(${slug})`);
        throw new SupabaseServiceUnavailableError(error.message, isSupabaseQuotaError(error));
      }

      supabaseCircuitBreaker.recordSuccess();
      return data as PortfolioProjectDetail;
    } catch (err) {
      if (err instanceof SupabaseServiceUnavailableError) throw err;
      supabaseCircuitBreaker.recordFailure(err, `portfolioService.getProjectBySlug(${slug})`);
      throw new SupabaseServiceUnavailableError(
        err instanceof Error ? err.message : 'Failed to fetch project',
        isSupabaseQuotaError(err)
      );
    }
  },
};
