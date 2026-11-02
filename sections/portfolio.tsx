'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/layout';
import { ArrowRight, ChevronRight, ChevronLeft, Sparkles, Target, Eye, Users } from 'lucide-react';
import type { PortfolioItem } from '@/lib/portfolio';
import { VISION_CLASSES_PROJECT } from '@/lib/portfolio';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from '@/lib/motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PortfolioSectionProps {
  projects?: PortfolioItem[];
}

export function PortfolioSection({ projects }: PortfolioSectionProps) {
  // Ensure we always have our verified project available
  const allProjects = useMemo(() => {
    if (projects && projects.length > 0) {
      const hasVision = projects.some((p) => p.id === 'vision-classes-bhilwara');
      return hasVision ? projects : [VISION_CLASSES_PROJECT, ...projects];
    }
    return [VISION_CLASSES_PROJECT];
  }, [projects]);

  // Compute available categories with real content (No empty filters rule)
  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    cats.add('All');
    allProjects.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [allProjects]);

  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return allProjects;
    return allProjects.filter((p) => p.category === activeCategory);
  }, [allProjects, activeCategory]);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger Entrance Animation
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

      // Filter tabs reveal
      if (filtersRef.current) {
        gsap.fromTo(
          filtersRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: filtersRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }

      // Projects grid reveal
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      // Footer bar reveal
      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="relative overflow-hidden bg-[#0A0614] py-16 sm:py-24 lg:py-28"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute top-1/4 -left-32 h-[450px] w-[500px] rounded-full bg-[#7C3AED]/10 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 right-0 h-[400px] w-[450px] rounded-full bg-[#A855F7]/10 blur-[130px]"
        aria-hidden="true"
      />

      {/* Top subtle hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/25 to-transparent" />

      <Container size="wide" className="relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          data-agent-layer="portfolio-header"
          data-agent-order="21"
          data-agent-type="text"
          data-agent-label="Portfolio Header"
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/30 bg-[#1A0F33]/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#C4B5FD] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7] animate-pulse" />
            Selected Client Work
          </div>

          <h2
            id="portfolio-heading"
            className="font-heading text-3xl font-bold tracking-tight text-[#F5F0FF] sm:text-4xl lg:text-5xl"
          >
            Crafted for Impact.{' '}
            <span className="bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#DDD6FE] bg-clip-text text-transparent">
              Engineered to Scale.
            </span>
          </h2>

          <p className="mt-4 text-base text-[#B7A9D6] sm:text-lg">
            Real campaigns, measurable student acquisitions, and digital creative executions engineered for ambitious brands.
          </p>
        </div>

        {/* Dynamic Category Filter Pills (Only categories with active content) */}
        {availableCategories.length > 1 && (
          <div
            ref={filtersRef}
            className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:mb-12"
          >
            {availableCategories.map((cat) => {
              const count =
                cat === 'All'
                  ? allProjects.length
                  : allProjects.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#A855F7] ${
                    activeCategory === cat
                      ? 'border border-[#A855F7] bg-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/30'
                      : 'border border-[#7C3AED]/20 bg-[#1A0F33]/80 text-[#B7A9D6] hover:border-[#7C3AED]/40 hover:text-[#F5F0FF]'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                      activeCategory === cat
                        ? 'bg-black/25 text-white'
                        : 'bg-[#241445] text-[#C4B5FD]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Featured Projects Grid */}
        <div
          ref={gridRef}
          data-agent-layer="portfolio-showcase-grid"
          data-agent-order="22"
          data-agent-type="card"
          data-agent-label="Portfolio Grid"
          className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12"
        >
          {filteredProjects.map((project, idx) => {
            const isFeatured = idx === 0;

            return (
              <div
                key={project.id}
                className={`group relative overflow-hidden rounded-3xl border border-[#7C3AED]/25 bg-[#1A0F33] p-6 sm:p-8 transition-all duration-300 hover:border-[#A855F7]/60 hover:shadow-2xl hover:shadow-[#7C3AED]/20 ${
                  isFeatured ? 'lg:col-span-12' : 'lg:col-span-6'
                }`}
              >
                <div className={`grid grid-cols-1 items-center gap-6 sm:gap-8 ${isFeatured ? 'lg:grid-cols-12' : ''}`}>
                  {/* Thumbnail / Media Container */}
                  <div
                    className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#7C3AED]/20 bg-[#241445] ${
                      isFeatured ? 'lg:col-span-7' : ''
                    }`}
                  >
                    <Image
                      src={project.image || '/assets/portfolio/motion.webp'}
                      alt={`${project.title} — ${project.category} by Ampledia`}
                      fill
                      unoptimized={project.image?.startsWith('http')}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0614]/80 via-transparent to-transparent opacity-60" />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="rounded-full border border-[#7C3AED]/30 bg-[#0A0614]/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#DDD6FE] backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Verified badge */}
                    <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-[#10B981]/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      Live Verified Case Study
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className={`flex flex-col justify-between ${isFeatured ? 'lg:col-span-5' : ''}`}>
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A855F7]">
                        <span>{project.location || 'Bhilwara, Rajasthan'}</span>
                        <span>•</span>
                        <span>{project.year || '2024'}</span>
                      </div>

                      <h3 className="font-heading text-2xl font-bold text-[#F5F0FF] transition-colors duration-300 group-hover:text-[#DDD6FE] sm:text-3xl">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-[#B7A9D6]">
                        {project.description ||
                          'Targeted Instagram and Meta ad campaigns engineered for hyper-local lead generation, driving verified student inquiries.'}
                      </p>

                      {/* Verified stats snippet */}
                      <div className="mt-5 grid grid-cols-2 gap-2.5">
                        <div className="rounded-xl border border-[#7C3AED]/20 bg-[#241445]/60 p-3">
                          <div className="flex items-center gap-1 text-[11px] text-[#A855F7]">
                            <Eye className="h-3 w-3" />
                            <span>Total Views</span>
                          </div>
                          <div className="mt-1 font-heading text-lg font-bold text-[#F5F0FF]">
                            129K+
                          </div>
                        </div>

                        <div className="rounded-xl border border-[#7C3AED]/20 bg-[#241445]/60 p-3">
                          <div className="flex items-center gap-1 text-[11px] text-[#A855F7]">
                            <Target className="h-3 w-3" />
                            <span>Leads Generated</span>
                          </div>
                          <div className="mt-1 font-heading text-lg font-bold text-[#F5F0FF]">
                            40–60
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      {project.tags && project.tags.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-[#7C3AED]/20 bg-[#1A0F33] px-2.5 py-0.5 text-[10px] font-medium text-[#C4B5FD]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* CTAs */}
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/portfolio/${project.id}`}
                        className="inline-flex items-center gap-2 rounded-full bg-[#7C3AED] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-[#7C3AED]/30 transition-all duration-300 hover:bg-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#A855F7]"
                      >
                        <span>View Full Breakdown</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>

                      <Link
                        href="/portfolio"
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#7C3AED]/30 bg-[#241445]/50 px-4 py-2.5 text-xs font-semibold text-[#DDD6FE] transition-colors hover:border-[#A855F7] hover:text-white"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-[#A855F7]" />
                        <span>All Case Studies</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Link to Full Portfolio */}
        <div
          ref={footerRef}
          className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#7C3AED]/20 bg-[#1A0F33]/60 p-6 sm:flex-row sm:p-7"
        >
          <div className="text-center sm:text-left">
            <h4 className="font-heading text-lg font-bold text-[#F5F0FF]">
              Looking for our complete catalog of creative work?
            </h4>
            <p className="mt-1 text-xs text-[#B7A9D6] sm:text-sm">
              Explore past commercial productions, client video deliverables, and web applications.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#7C3AED]/40 bg-[#241445] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#F5F0FF] transition-all duration-300 hover:border-[#A855F7] hover:bg-[#7C3AED] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#A855F7]"
          >
            <span>Explore Portfolio Archive</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>

      {/* Bottom subtle hairline divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/20 to-transparent" />
    </section>
  );
}
