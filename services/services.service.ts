import { supabaseClient } from './supabase-client';

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  featured?: boolean;
}

export const servicesService = {
  async getServices(): Promise<Service[]> {
    const { data, error } = await supabaseClient
      .from('services')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data as Service[];
  },

  async getServiceBySlug(slug: string): Promise<Service | null> {
    const { data, error } = await supabaseClient
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data as Service;
  },
};
