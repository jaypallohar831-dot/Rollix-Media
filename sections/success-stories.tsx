'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { ArrowRight, Eye, Users, Target, Zap, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from '@/lib/motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── VERIFIED CASE STUDY METRICS (VISION CLASSES BHILWARA) ─── */

const VERIFIED_STATS = [
  { value: '129K+', label: 'Total Views' },
  { value: '67.9K', label: 'Local Reach' },
  { value: '40–60', label: 'Student Leads' },
  { value: '~₹120', label: 'Cost Per Lead' },
];

const METRIC_CARDS = [
  {
    icon: Eye,
    value: '129,273',
    label: 'Total Video Views',
    detail: '30-day hyper-local Instagram campaign',
    highlight: false,
  },
  {
    icon: Users,
    value: '67,979',
    label: 'Unique Local Reach',
    detail: 'Focused within Bhilwara district radius',
    highlight: false,
  },
  {
    icon: Target,
    value: '40–60',
    label: 'Qualified Student Leads',
    detail: 'Direct inquiries via WhatsApp ad funnel',
    highlight: true,
  },
  {
    icon: Zap,
    value: '₹100–150',
    label: 'Cost Per Lead',
    detail: 'Achieved on a modest ₹6,000 ad budget',
    highlight: false,
  },
];

/* ─── COMPONENT ─── */

export function SuccessStoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    if (isReducedMotion()) {
      // Immediate presentation for reduced motion
      return;
    }

    const ctx = gsap.context(() => {
      // Section header reveal
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

      // Left column reveal
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      // Right cards staggered entrance
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.metric-card');
        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.94, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      // Bottom banner reveal
      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bannerRef.current,
              start: 'top 90%',
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
      id="results"
      aria-labelledby="results-heading"
      className="relative overflow-hidden bg-[#0A0614] py-16 sm:py-24 lg:py-28"
    >
      {/* Background ambient radial gradients */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[450px] w-[600px] -translate-x-1/2 rounded-full bg-[#7C3AED]/10 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-10 h-[380px] w-[450px] rounded-full bg-[#A855F7]/10 blur-[120px]"
        aria-hidden="true"
      />

      {/* Top subtle hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/25 to-transparent" />

      <Container size="wide" className="relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          data-agent-layer="success-header"
          data-agent-order="17"
          data-agent-type="text"
          data-agent-label="Results"
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-20"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/30 bg-[#1A0F33]/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#C4B5FD] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7] animate-pulse" />
            Verified Client Results
          </div>

          <h2
            id="results-heading"
            className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Proof Over Promises.{' '}
            <span className="bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#DDD6FE] bg-clip-text text-transparent">
              Real Local Growth.
            </span>
          </h2>

          <p className="mt-4 text-base text-white sm:text-lg">
            We don&apos;t inflate numbers. Every view, reach metric, and qualified student inquiry below was tracked live during active campaign delivery.
          </p>
        </div>

        {/* Featured Case Study Grid */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Context, Mini-Stats & CTA (col-span-5) */}
          <div ref={leftColRef} className="flex flex-col lg:col-span-5">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#A855F7]">
              <span>Featured Case Study</span>
              <span className="h-1 w-1 rounded-full bg-[#A855F7]" />
              <span>Coaching & Education</span>
            </div>

            <h3 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Vision Classes Bhilwara
            </h3>

            <p className="mt-3 text-sm font-medium text-white">
              Meta Ads & Video Creative Funnel for Institute Admissions
            </p>

            <p className="mt-4 text-sm leading-relaxed text-white sm:text-base">
              Ampledia designed and executed a hyper-local Meta ad campaign for Vision Classes Bhilwara. By combining authentic student testimonial videos with tight geographic radius targeting and a direct WhatsApp inquiry funnel, we delivered <strong className="text-white">40–60 high-intent student leads</strong> at an estimated cost of <strong className="text-white">~₹100–150 per lead</strong> from a ₹6,000 ad budget.
            </p>

            {/* Quick Summary Pill Grid */}
            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
              {VERIFIED_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-[#7C3AED]/20 bg-[#1A0F33]/70 p-3.5 backdrop-blur-sm"
                >
                  <div className="text-xl font-bold text-white sm:text-2xl">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-xs text-white">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Key Outcomes Checklist */}
            <ul className="mt-6 space-y-2.5 text-xs text-white sm:text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#A855F7]" />
                <span>Hyper-targeted radius within Bhilwara educational zones</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#A855F7]" />
                <span>Zero friction WhatsApp direct-admission funnel</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#A855F7]" />
                <span>19,889 active engagements (saves, shares, replies)</span>
              </li>
            </ul>

            {/* Case Study CTA Link */}
            <div className="mt-8">
              <Link
                href="/portfolio/vision-classes-bhilwara"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#7C3AED] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-[#7C3AED]/25 transition-all duration-300 hover:bg-[#6D28D9] hover:shadow-[#7C3AED]/40 focus:outline-none focus:ring-2 focus:ring-[#A855F7] focus:ring-offset-2 focus:ring-offset-[#0A0614] sm:px-7 sm:py-3.5 sm:text-sm"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Visual Cards (col-span-7) */}
          <div
            ref={cardsRef}
            data-agent-layer="success-metrics-grid"
            data-agent-order="18"
            data-agent-type="card"
            data-agent-label="Metrics Grid"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-7"
          >
            {METRIC_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className={`metric-card relative overflow-hidden rounded-2xl p-6 transition-all duration-300 sm:p-7 ${
                    card.highlight
                      ? 'border-2 border-[#A855F7] bg-gradient-to-b from-[#241445] to-[#1A0F33] shadow-xl shadow-[#7C3AED]/20'
                      : 'border border-[#7C3AED]/20 bg-[#1A0F33]/90 hover:border-[#7C3AED]/40 hover:bg-[#1A0F33]'
                  }`}
                >
                  {/* Subtle corner badge for highlight card */}
                  {card.highlight && (
                    <span className="absolute top-4 right-4 rounded-full bg-[#7C3AED] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm">
                      Core Outcome
                    </span>
                  )}

                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                      card.highlight
                        ? 'bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/30'
                        : 'bg-[#241445] text-[#C4B5FD]'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
                    {card.value}
                  </div>

                  <div className="mt-2 text-sm font-semibold text-white">
                    {card.label}
                  </div>

                  <p className="mt-1 text-xs text-white">
                    {card.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Banner: Spend & Engagement Transparency */}
        <div
          ref={bannerRef}
          className="mt-12 rounded-2xl border border-[#7C3AED]/25 bg-gradient-to-r from-[#1A0F33] via-[#241445]/60 to-[#1A0F33] p-5 text-center sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-white sm:text-sm">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#10B981]" />
              <strong>Campaign Period:</strong> 30 Days Live Run
            </span>
            <span className="hidden text-white/20 sm:inline">•</span>
            <span>
              <strong>Total Ad Spend:</strong> ₹6,000 INR
            </span>
            <span className="hidden text-white/20 sm:inline">•</span>
            <span>
              <strong>Active Engagement:</strong> 19,889 Interactions
            </span>
            <span className="hidden text-white/20 sm:inline">•</span>
            <span className="text-[#C4B5FD]">
              100% Verified in Meta Ads Manager
            </span>
          </div>
        </div>
      </Container>

      {/* Bottom subtle hairline divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/20 to-transparent" />
    </section>
  );
}
