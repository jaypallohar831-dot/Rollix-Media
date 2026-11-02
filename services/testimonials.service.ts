import { supabaseClient } from './supabase-client';

import {
  supabaseCircuitBreaker,
  isSupabaseQuotaError,
} from '@/lib/supabase-error-handler';

let cachedTestimonials: { data: any[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000;

export const testimonialsService = {
  clearCache(resetCircuitBreaker = false) {
    cachedTestimonials = null;
    if (resetCircuitBreaker) {
      supabaseCircuitBreaker.reset();
    }
  },

  async getTestimonials(forceFresh = false) {
    if (!forceFresh && cachedTestimonials && (Date.now() - cachedTestimonials.timestamp < CACHE_TTL_MS)) {
      return cachedTestimonials.data;
    }

    if (!forceFresh && supabaseCircuitBreaker.shouldThrottle()) {
      return cachedTestimonials?.data || [];
    }

    try {
      const { data, error } = await supabaseClient
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        supabaseCircuitBreaker.recordFailure(error, 'testimonialsService.getTestimonials');
        return cachedTestimonials?.data || [];
      }

      supabaseCircuitBreaker.recordSuccess();
      cachedTestimonials = { data: data || [], timestamp: Date.now() };
      return data || [];
    } catch (err) {
      supabaseCircuitBreaker.recordFailure(err, 'testimonialsService.getTestimonials');
      return cachedTestimonials?.data || [];
    }
  },
};
