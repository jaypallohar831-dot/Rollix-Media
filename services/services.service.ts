import { supabaseClient } from './supabase-client';

export const servicesService = {
  async getServices() {
    const { data, error } = await supabaseClient
      .from('services')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getServiceBySlug(slug: string) {
    const { data, error } = await supabaseClient
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data;
  },
};
