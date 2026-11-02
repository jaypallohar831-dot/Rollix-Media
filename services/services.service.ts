import { supabaseClient } from './supabase-client';

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  featured?: boolean;
}

import {
  supabaseCircuitBreaker,
  isSupabaseQuotaError,
} from '@/lib/supabase-error-handler';

let cachedServices: { data: Service[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000;

export const servicesService = {
  clearCache(resetCircuitBreaker = false) {
    cachedServices = null;
    if (resetCircuitBreaker) {
      supabaseCircuitBreaker.reset();
    }
  },

  async getServices(forceFresh = false): Promise<Service[]> {
    if (!forceFresh && cachedServices && (Date.now() - cachedServices.timestamp < CACHE_TTL_MS)) {
      return cachedServices.data;
    }

    if (!forceFresh && supabaseCircuitBreaker.shouldThrottle()) {
      return cachedServices?.data || [];
    }

    try {
      const { data, error } = await supabaseClient
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        supabaseCircuitBreaker.recordFailure(error, 'servicesService.getServices');
        return cachedServices?.data || [];
      }

      supabaseCircuitBreaker.recordSuccess();
      cachedServices = { data: data as Service[], timestamp: Date.now() };
      return data as Service[];
    } catch (err) {
      supabaseCircuitBreaker.recordFailure(err, 'servicesService.getServices');
      return cachedServices?.data || [];
    }
  },

  async getServiceBySlug(slug: string): Promise<Service | null> {
    if (supabaseCircuitBreaker.shouldThrottle()) {
      return null;
    }

    try {
      const { data, error } = await supabaseClient
        .from('services')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        supabaseCircuitBreaker.recordFailure(error, `servicesService.getServiceBySlug(${slug})`);
        return null;
      }

      supabaseCircuitBreaker.recordSuccess();
      return data as Service;
    } catch (err) {
      supabaseCircuitBreaker.recordFailure(err, `servicesService.getServiceBySlug(${slug})`);
      return null;
    }
  },
};
