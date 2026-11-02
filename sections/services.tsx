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
  HeartHandshake,
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
  const secondaryGridRef = useRef<HTMLDivElement>(null);
  const weddingBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialServices && initialServices.length > 0) return;

    async function loadServices() {
      try {
        const data = await servicesService.getServices();
        if (data && data.length > 0) {
          // Merge with fallback ordering and pricing details
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
      } catch (err: unknown) {
        console.error('Failed to fetch services:', err instanceof Error ? err.message : String(err));
      }
    }
    loadServices();
  }, [initialServices]);

  // GSAP ScrollTrigger Staggered Reveal
  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Header reveal
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

      // Core cards reveal
      if (coreGridRef.current) {
        gsap.fromTo(
          coreGridRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
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

      // Secondary cards reveal
      if (secondaryGridRef.current) {
        gsap.fromTo(
          secondaryGridRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: secondaryGridRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Wedding block reveal
      if (weddingBlockRef.current) {
        gsap.fromTo(
          weddingBlockRef.current,
          { opacity: 0, scale: 0.98, y: 25 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: weddingBlockRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [services]);

  // Lead with: Video Production, Video Editing, Social Media, Meta & Google Ads, Web Design
  const coreServices = services.filter((s) =>
    ['videography', 'video-editing', 'social-media', 'digital-marketing'].includes(s.slug)
  );

  const growthServices = services.filter((s) =>
    ['web-design', 'seo-dominance', 'graphic-design'].includes(s.slug)
  );

  const weddingService = services.find((s) => s.slug === 'wedding-shooting');

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
      <div
        className="pointer-events-none absolute bottom-20 left-0 h-[400px] w-[450px] rounded-full bg-[#A855F7]/10 blur-[120px]"
        aria-hidden="true"
      />

      {/* Top subtle hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/25 to-transparent" />

      <Container size="wide" className="relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/30 bg-[#1A0F33]/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#C4B5FD] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7] animate-pulse" />
            Core Capabilities
          </div>

          <h2
            id="services-heading"
            className="font-heading text-3xl font-bold tracking-tight text-[#F5F0FF] sm:text-4xl lg:text-5xl"
          >
            Engineered for Reach.{' '}
            <span className="bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#DDD6FE] bg-clip-text text-transparent">
              Built for Revenue.
            </span>
          </h2>

          <p className="mt-4 text-base text-[#B7A9D6] sm:text-lg">
            We integrate cinema-grade video, high-converting social media, and precision Meta ad funnels into an unified growth engine for modern brands.
          </p>
        </div>

        {/* 1. Core Services (Leading with Video, Social Media, Meta Ads) */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#A855F7]">
              Primary Growth Pillars
            </h3>
            <span className="text-xs text-[#B7A9D6]">01 — 04</span>
          </div>

          <div
            ref={coreGridRef}
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
        </div>

        {/* 2. Digital Infrastructure & Brand Ecosystem (Web, SEO, Brand Design) */}
        <div className="mb-14 sm:mb-16">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#A855F7]">
              Digital Infrastructure & Identity
            </h3>
            <span className="text-xs text-[#B7A9D6]">05 — 07</span>
          </div>

          <div
            ref={secondaryGridRef}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5"
          >
            {growthServices.map((service) => (
              <ServiceCard
                key={service.slug}
                index={service.index}
                slug={service.slug}
                title={service.title}
                description={service.description}
                icon={service.icon}
                pricingStarting={service.pricingStarting}
                tools={SERVICE_DETAILS_MAP[service.slug]?.tools}
                className="min-h-[260px]"
              />
            ))}
          </div>
        </div>

        {/* 3. Separate Dedicated Block: Wedding Cinematography */}
        {weddingService && (
          <div
            ref={weddingBlockRef}
            className="relative overflow-hidden rounded-3xl border border-[#A855F7]/30 bg-gradient-to-br from-[#1A0F33] via-[#241445]/80 to-[#1A0F33] p-7 sm:p-10 shadow-xl shadow-[#7C3AED]/10"
          >
            {/* Ambient luxury glow inside block */}
            <div
              className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-[#A855F7]/15 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#A855F7]/40 bg-[#241445] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#DDD6FE]">
                  <Sparkles className="h-3.5 w-3.5 text-[#F59E0B]" />
                  <span>Specialized Atelier • Private Commissions</span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-[#F5F0FF] sm:text-3xl">
                  Cinematic Wedding Storytelling
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#B7A9D6] sm:text-base">
                  For couples and families seeking heirloom-grade visual narratives. Multi-camera 4K/6K cinema setups, unscripted candid emotions, warm luxury color grading, and timeless feature films captured across Rajasthan and destination venues.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#C4B5FD]">
                  <span className="flex items-center gap-1.5">
                    <HeartHandshake className="h-4 w-4 text-[#A855F7]" />
                    Full Day & Multi-Day Coverage
                  </span>
                  <span>•</span>
                  <span>Teaser Trailers + 4K Feature Film</span>
                  <span>•</span>
                  <span className="font-semibold text-[#F5F0FF]">
                    {weddingService.pricingStarting || 'Starting from ₹1,50,000'}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link
                  href={`/services/${weddingService.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#7C3AED]/40 bg-[#241445] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#F5F0FF] transition-all duration-300 hover:border-[#A855F7] hover:bg-[#7C3AED]/20 focus:outline-none focus:ring-2 focus:ring-[#A855F7] focus:ring-offset-2 focus:ring-offset-[#0A0614] sm:text-sm"
                >
                  <span>Explore Deliverables</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="https://wa.me/919024675831?text=Hi%20Ampledia%2C%20I%20would%20like%20to%20inquire%20about%20Wedding%20Cinematography%20dates%20and%20packages."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7C3AED] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-[#7C3AED]/30 transition-all duration-300 hover:bg-[#6D28D9] hover:shadow-[#7C3AED]/50 focus:outline-none focus:ring-2 focus:ring-[#A855F7] focus:ring-offset-2 focus:ring-offset-[#0A0614] sm:text-sm"
                >
                  <span>Get Custom Quote</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </Container>

      {/* Bottom subtle hairline divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/20 to-transparent" />
    </section>
  );
}
