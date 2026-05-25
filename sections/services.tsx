'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout';
import { ServiceCard } from '@/components/service-card';
import { SERVICES as fallbackServices, SERVICE_DETAILS_MAP, type ServiceItem } from '@/lib/services';
import { staggerContainer, fadeUp, fadeIn } from '@/animations/variants';
import { servicesService } from '@/services/services.service';
import type { LucideIcon } from 'lucide-react';
import {
  Loader2, 
  Film, 
  Video, 
  Scissors, 
  TrendingUp, 
  Sparkles, 
  Share2, 
  Megaphone, 
  Monitor,
  Zap 
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Film: Film,
  Video: Video,
  Scissors: Scissors,
  TrendingUp: TrendingUp,
  Sparkles: Sparkles,
  Share2: Share2,
  Megaphone: Megaphone,
  Monitor: Monitor,
  Zap: Zap
};

export function ServicesSection() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await servicesService.getServices();
        if (data && data.length > 0) {
          const mapped: ServiceItem[] = data.map((s, idx) => ({
            index: (idx + 1).toString().padStart(2, '0'),
            slug: s.slug,
            title: s.title,
            description: s.description,
            icon: iconMap[s.icon] || Zap,
            featured: s.featured
          }));
          setServices(mapped);
        } else {
          setServices(fallbackServices);
        }
      } catch (err: unknown) {
        console.error('Failed to fetch services:', err instanceof Error ? err.message : String(err));
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  // Split services into layout groups
  const featured = services.find(s => s.featured) || services[0];
  const otherServices = services.filter(s => s.slug !== featured?.slug);
  
  const secondary = otherServices.slice(0, 2);
  const tertiary = otherServices.slice(2, 4);
  const quaternary = otherServices.slice(4);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#050505] py-28 sm:py-36 lg:py-44"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 70% 30%, rgba(212,118,60,0.05) 0%, transparent 70%)',
          }}
        />
        <div className="grain-overlay absolute inset-0" />
      </div>

      <Container size="wide" className="relative z-10">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-10%' }}
          className="mb-16 sm:mb-20 lg:mb-24"
        >
          <motion.div variants={fadeIn} className="mb-5 sm:mb-6">
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-cinematic-orange/80">
              <span className="h-[1px] w-6 bg-cinematic-orange/40" />
              Our Expertise
            </span>
          </motion.div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <motion.h2
              variants={fadeUp}
              className="font-heading text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1] tracking-[-0.02em] text-foreground"
            >
              Growth &{' '}
              <span className="text-gradient-warm italic">Production</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="max-w-[420px] text-base leading-relaxed text-foreground/90 lg:text-right"
            >
              We engineer strategic digital ecosystems and cinematic content 
              that turn your vision into market-leading reality.
            </motion.p>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-cinematic-orange/50" />
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-5%' }}
            className="flex flex-col gap-4 sm:gap-5"
          >
            {/* Row 1: Featured + 2 secondary */}
            <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-12">
              {featured && (
                <ServiceCard
                  index={featured.index}
                  slug={featured.slug}
                  title={featured.title}
                  description={featured.description}
                  icon={featured.icon}
                  featured
                  tools={SERVICE_DETAILS_MAP[featured.slug]?.tools}
                  className="lg:col-span-7 min-h-[320px] sm:min-h-[360px] lg:min-h-[420px]"
                />
              )}

              <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:col-span-5">
                {secondary.map((service) => (
                  <ServiceCard
                    key={service.slug}
                    index={service.index}
                    slug={service.slug}
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    tools={SERVICE_DETAILS_MAP[service.slug]?.tools}
                    className="min-h-[180px] sm:min-h-[195px]"
                  />
                ))}
              </div>
            </div>

            {/* Row 2: Two medium cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {tertiary.map((service) => (
                <ServiceCard
                  key={service.slug}
                  index={service.index}
                  slug={service.slug}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  tools={SERVICE_DETAILS_MAP[service.slug]?.tools}
                  className="min-h-[200px] sm:min-h-[220px]"
                />
              ))}
            </div>

            {/* Row 3: Three smaller cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
              {quaternary.map((service) => (
                <ServiceCard
                  key={service.slug}
                  index={service.index}
                  slug={service.slug}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  tools={SERVICE_DETAILS_MAP[service.slug]?.tools}
                  className="min-h-[200px] sm:min-h-[220px]"
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 flex items-center justify-center gap-5 sm:mt-20"
        >
          <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-white/[0.15]" />
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/60">
            {services.length} Disciplines · One Vision
          </span>
          <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-white/[0.15]" />
        </motion.div>
      </Container>
    </section>
  );
}
