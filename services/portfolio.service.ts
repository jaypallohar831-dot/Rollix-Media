import { supabaseClient } from './supabase-client';

export const portfolioService = {
  async getProjects() {
    const { data, error } = await supabaseClient
      .from('portfolio_projects')
      .select('*, categories(title, slug)')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getProjectBySlug(slug: string) {
    const { data, error } = await supabaseClient
      .from('portfolio_projects')
      .select('*, categories(title, slug)')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  },
};
