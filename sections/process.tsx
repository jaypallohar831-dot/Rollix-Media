'use client';

import { useEffect, useRef } from 'react';
import { Container } from '@/components/layout';
import { Compass, Video, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from '@/lib/motion';
import { ScrollWordReveal } from '@/components/animations/scroll-word-reveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ROADMAP_STEPS = [
  {
    number: '01',
    title: 'Audit & Strategy',
    description: 'We analyze your market, competitors, and audience hook points to architect a winning creative roadmap.',
    icon: Compass,
  },
  {
    number: '02',
    title: 'Cinema Production',
    description: '4K multi-camera filming, authentic storytelling, and high-retention post-production that commands authority.',
    icon: Video,
  },
  {
    number: '03',
    title: 'Revenue Scale',
    description: 'Precision Meta ad funnels and WhatsApp direct-booking flows turning attention into qualified student/client leads.',
    icon: TrendingUp,
  },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsListRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/25 to-transparent" />

      <Container size="wide" className="relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          data-agent-layer="process-header"
          data-agent-order="23"
          data-agent-type="text"
          data-agent-label="Process Header"
          className="mx-auto mb-16 max-w-3xl text-center sm:mb-20"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/30 bg-[#1A0F33]/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7] animate-pulse" />
            Clear 3-Stage Roadmap
          </div>

          <ScrollWordReveal
            as="h2"
            text="How We Build. How You Scale."
            gradientWord="Scale."
            className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          />

          <p className="mt-4 text-base text-white sm:text-lg">
            A battle-tested 3-stage execution cycle that transforms audience curiosity into predictable brand revenue.
          </p>
        </div>

        {/* 3-Step Process Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Horizontal connecting line (Desktop lg+) */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-[42px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-[#7C3AED]/30 via-[#A855F7]/50 to-[#7C3AED]/30 z-0"
            aria-hidden="true"
          />

          {/* Steps List */}
          <ol
            ref={stepsListRef}
            data-agent-layer="process-steps-list"
            data-agent-order="24"
            data-agent-type="card"
            data-agent-label="Methodology Steps"
            className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-6 relative z-10 list-none p-0 m-0"
          >
            {ROADMAP_STEPS.map((step) => {
              const Icon = step.icon;

              return (
                <li
                  key={step.number}
                  className="group relative flex flex-col items-center rounded-2xl border border-[#7C3AED]/20 bg-[#1A0F33]/90 p-6 text-center transition-all duration-300 hover:border-[#A855F7]/60 hover:bg-[#1A0F33] hover:shadow-xl hover:shadow-[#7C3AED]/15 sm:p-8"
                >
                  <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#7C3AED]/30 bg-[#241445] text-white shadow-lg shadow-[#0A0614] transition-all duration-300 group-hover:border-[#A855F7] group-hover:bg-[#7C3AED] group-hover:text-white group-hover:scale-105">
                    <Icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#0A0614] border border-[#7C3AED]/40 font-mono text-[10px] font-bold text-[#A855F7] shadow-sm">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
                    {step.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-white">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/20 to-transparent" />
    </section>
  );
}
