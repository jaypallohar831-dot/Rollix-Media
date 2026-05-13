import { supabaseClient } from './supabase-client';

export const testimonialsService = {
  async getTestimonials() {
    const { data, error } = await supabaseClient
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },
};
