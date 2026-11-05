'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { ServiceCard } from '@/components/service-card';
import { SERVICES as fallbackServices, SERVICE_DETAILS_MAP, type ServiceItem } from '@/lib/services';
import { servicesService } from '@/services/services.service';
import type { LucideIcon } from 'lucide-react';
import {
  Film,
  Video,
  Scissors,
  TrendingUp,
  Sparkles,
  Share2,
  Megaphone,
  Monitor,
  Zap,
  ArrowRight,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from '@/lib/motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, LucideIcon> = {
  Film,
  Video,
  Scissors,
  TrendingUp,
  Sparkles,
  Share2,
  Megaphone,
  Monitor,
  Zap,
};

interface ServicesSectionProps {
  initialServices?: ServiceItem[];
}

export function ServicesSection({ initialServices }: ServicesSectionProps = {}) {
  const [services, setServices] = useState<ServiceItem[]>(initialServices || fallbackServices);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const coreGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialServices && initialServices.length > 0) return;

    async function loadServices() {
      try {
        const data = await servicesService.getServices();
        if (data && data.length > 0) {
          const mapped: ServiceItem[] = fallbackServices.map((fallback) => {
            const found = data.find((d) => d.slug === fallback.slug);
            if (found) {
              return {
                ...fallback,
                title: found.title || fallback.title,
                description: found.description || fallback.description,
                icon: iconMap[found.icon] || fallback.icon,
              };
            }
            return fallback;
          });
          setServices(mapped);
        }
      } catch {
        // graceful fallback to static data
      }
    }

    loadServices();
  }, [initialServices]);

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      if (coreGridRef.current) {
        gsap.fromTo(
          coreGridRef.current.children,
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: coreGridRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [services]);

  // Focus on the Core 4 Money-Making Disciplines:
  // 1. Video Production, 2. Video Editing, 3. Social Media Management, 4. Meta & Google Ads
  const coreServices = services.filter((s) =>
    ['videography', 'video-editing', 'social-media', 'digital-marketing'].includes(s.slug)
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-[#0A0614] py-16 sm:py-24 lg:py-28"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute top-10 right-0 h-[450px] w-[500px] rounded-full bg-[#7C3AED]/10 blur-[130px]"
        aria-hidden="true"
      />

      {/* Top subtle hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/25 to-transparent" />

      <Container size="wide" className="relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          data-agent-layer="services-header"
          data-agent-order="19"
          data-agent-type="text"
          data-agent-label="Services Header"
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-18"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/30 bg-[#1A0F33]/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7] animate-pulse" />
            Core Growth Disciplines
          </div>

          <h2
            id="services-heading"
            className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Engineered for Reach.{' '}
            <span className="bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#DDD6FE] bg-clip-text text-transparent">
              Built for Revenue.
            </span>
          </h2>

          <p className="mt-4 text-base text-white sm:text-lg">
            We integrate cinema-grade video, retention editing, and precision Meta ad funnels into an unified growth engine for modern brands.
          </p>
        </div>

        {/* Core 4 Services Grid */}
        <div
          ref={coreGridRef}
          data-agent-layer="services-core-grid"
          data-agent-order="20"
          data-agent-type="card"
          data-agent-label="Core Services"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5"
        >
          {coreServices.map((service) => (
            <ServiceCard
              key={service.slug}
              index={service.index}
              slug={service.slug}
              title={service.title}
              description={service.description}
              icon={service.icon}
              pricingStarting={service.pricingStarting}
              tools={SERVICE_DETAILS_MAP[service.slug]?.tools}
              className="min-h-[290px]"
            />
          ))}
        </div>

        {/* Clean Link to full services catalogue */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/30 bg-[#1A0F33]/60 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 hover:border-[#A855F7] hover:bg-[#241445] hover:text-white"
          >
            <span>Explore All Capabilities &amp; Specialized Services</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>

      {/* Bottom subtle hairline divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/20 to-transparent" />
    </section>
  );
}
