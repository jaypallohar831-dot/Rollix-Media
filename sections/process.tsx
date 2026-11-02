'use client';

import { useEffect, useRef } from 'react';
import { Container } from '@/components/layout';
import { PROCESS_STEPS } from '@/lib/process';
import { Search, Compass, Video, Zap, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from '@/lib/motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STEP_ICONS = [Search, Compass, Video, Zap, TrendingUp];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsListRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Header staggered reveal
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

      // Connecting line animation on desktop
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: stepsListRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // Steps sequential entrance
      if (stepsListRef.current) {
        gsap.fromTo(
          stepsListRef.current.children,
          { opacity: 0, y: 35, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepsListRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-heading"
      className="relative overflow-hidden bg-[#0A0614] py-16 sm:py-24 lg:py-28"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[450px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C3AED]/10 blur-[140px]"
        aria-hidden="true"
      />

      {/* Top subtle hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/25 to-transparent" />

      <Container size="wide" className="relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/30 bg-[#1A0F33]/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#C4B5FD] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7] animate-pulse" />
            Our 5-Step Methodology
          </div>

          <h2
            id="process-heading"
            className="font-heading text-3xl font-bold tracking-tight text-[#F5F0FF] sm:text-4xl lg:text-5xl"
          >
            How We Build.{' '}
            <span className="bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#DDD6FE] bg-clip-text text-transparent">
              How You Scale.
            </span>
          </h2>

          <p className="mt-4 text-base text-[#B7A9D6] sm:text-lg">
            From initial business audit to high-converting Meta ad funnels, our systematic roadmap transforms raw attention into predictable revenue.
          </p>
        </div>

        {/* 5-Step Process Timeline */}
        <div className="relative">
          {/* Horizontal connecting line (Desktop lg+) */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-[42px] left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-[#7C3AED]/20 via-[#A855F7]/40 to-[#7C3AED]/20 z-0"
            aria-hidden="true"
          />

          {/* Steps List */}
          <ol
            ref={stepsListRef}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5 relative z-10 list-none p-0 m-0"
          >
            {PROCESS_STEPS.map((step, index) => {
              const Icon = STEP_ICONS[index] || Search;

              return (
                <li
                  key={step.id}
                  className="group relative flex flex-col items-center rounded-2xl border border-[#7C3AED]/20 bg-[#1A0F33]/90 p-6 text-center transition-all duration-300 hover:border-[#A855F7]/60 hover:bg-[#1A0F33] hover:shadow-xl hover:shadow-[#7C3AED]/15 sm:p-7"
                >
                  {/* Step Icon Node */}
                  <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#7C3AED]/30 bg-[#241445] text-[#C4B5FD] shadow-lg shadow-[#0A0614] transition-all duration-300 group-hover:border-[#A855F7] group-hover:bg-[#7C3AED] group-hover:text-white group-hover:scale-105">
                    <Icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                    
                    {/* Step Number Tag */}
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#0A0614] border border-[#7C3AED]/40 font-mono text-[10px] font-bold text-[#A855F7] shadow-sm">
                      {step.number}
                    </span>
                  </div>

                  {/* Pillar Chip */}
                  <span className="mb-2 inline-flex items-center rounded-full border border-[#7C3AED]/20 bg-[#241445]/60 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-[#C4B5FD]">
                    {step.pillar}
                  </span>

                  {/* Step Title */}
                  <h3 className="font-heading text-lg font-bold text-[#F5F0FF] transition-colors duration-300 group-hover:text-[#DDD6FE]">
                    {step.title}
                  </h3>

                  {/* Step Subtitle */}
                  <div className="mt-1 text-xs font-medium text-[#A855F7]">
                    {step.subtitle}
                  </div>

                  {/* Step Description */}
                  <p className="mt-3 text-xs leading-relaxed text-[#B7A9D6]">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Bottom Assurance Strip */}
        <div className="mt-14 rounded-2xl border border-[#7C3AED]/20 bg-gradient-to-r from-[#1A0F33]/70 via-[#241445]/50 to-[#1A0F33]/70 p-5 text-center sm:p-6">
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs text-[#B7A9D6] sm:text-sm">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
              <strong>Weekly Strategy Updates</strong> via WhatsApp
            </span>
            <span className="hidden text-white/20 sm:inline">•</span>
            <span>
              <strong>Zero Lock-in Contracts:</strong> Results Drive Retention
            </span>
            <span className="hidden text-white/20 sm:inline">•</span>
            <span>
              <strong>Direct Founder Access:</strong> Rishabh &amp; Jaypal
            </span>
          </div>
        </div>
      </Container>

      {/* Bottom subtle hairline divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/20 to-transparent" />
    </section>
  );
}
