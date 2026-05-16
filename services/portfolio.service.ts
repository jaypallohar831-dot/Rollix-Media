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

export interface PortfolioProjectDetail extends PortfolioProject {
  id: string;
  category_id?: string;
  gallery_images?: string[];
  client?: string;
  duration?: string;
  crew?: Array<{ role: string; name: string }>;
  month?: string;
  status?: string;
}

export const portfolioService = {
  async getProjects(): Promise<PortfolioProject[]> {
    const { data, error } = await supabaseClient
      .from('portfolio_projects')
      .select('*, categories(title, slug)')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as PortfolioProject[];
  },

  async getProjectBySlug(slug: string): Promise<PortfolioProjectDetail | null> {
    const { data, error } = await supabaseClient
      .from('portfolio_projects')
      .select('*, categories(title, slug)')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data as PortfolioProjectDetail;
  },
};
