'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { HOMEPAGE_FAQ } from '@/lib/seo.config';
import { ChevronDown, MessageCircle, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from '@/lib/motion';
import { ScrollWordReveal } from '@/components/animations/scroll-word-reveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function FaqCtaSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const sectionRef = useRef<HTMLElement>(null);
  const faqHeaderRef = useRef<HTMLDivElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);
  const ctaCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // FAQ Header Reveal
      if (faqHeaderRef.current) {
        gsap.fromTo(
          faqHeaderRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: faqHeaderRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // FAQ List Reveal
      if (faqListRef.current) {
        gsap.fromTo(
          faqListRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: faqListRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      // CTA Card Entrance
      if (ctaCardRef.current) {
        gsap.fromTo(
          ctaCardRef.current,
          { opacity: 0, scale: 0.96, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaCardRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden bg-[#0A0614] py-16 sm:py-24 lg:py-28"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute top-10 left-1/3 h-[450px] w-[500px] -translate-x-1/2 rounded-full bg-[#7C3AED]/10 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 right-10 h-[400px] w-[450px] rounded-full bg-[#A855F7]/10 blur-[130px]"
        aria-hidden="true"
      />

      {/* Top subtle hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/25 to-transparent" />

      <Container size="wide" className="relative z-10">
        {/* ── PART 1: FAQ (BUYING OBJECTIONS) ── */}
        <div
          ref={faqHeaderRef}
          data-agent-layer="faq-header"
          data-agent-order="27"
          data-agent-type="text"
          data-agent-label="FAQ"
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/30 bg-[#1A0F33]/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7] animate-pulse" />
            Clear Answers
          </div>

          <ScrollWordReveal
            as="h2"
            text="Frequently Asked Questions."
            gradientWord="Questions."
            className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          />

          <p className="mt-4 text-base text-white sm:text-lg">
            Everything you need to know about our workflow, ad budgets, contract terms, and expected timelines.
          </p>
        </div>

        {/* Accordion List (Top 4 Crucial Objections) */}
        <div ref={faqListRef} className="mx-auto max-w-3xl space-y-3.5 sm:space-y-4">
          {HOMEPAGE_FAQ.slice(0, 4).map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;
            const questionId = `faq-question-${index}`;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-[#A855F7]/50 bg-[#1A0F33] shadow-lg shadow-[#7C3AED]/10'
                    : 'border-[#7C3AED]/20 bg-[#1A0F33]/70 hover:border-[#7C3AED]/40 hover:bg-[#1A0F33]'
                }`}
              >
                <button
                  type="button"
                  id={questionId}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleAccordion(index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors sm:p-6 focus:outline-none focus:ring-2 focus:ring-[#A855F7] focus:ring-offset-2 focus:ring-offset-[#0A0614] rounded-2xl"
                >
                  <span className="font-heading text-base font-semibold text-white sm:text-lg">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${
                      isOpen
                        ? 'rotate-180 border-[#A855F7] bg-[#7C3AED] text-white'
                        : 'border-[#7C3AED]/30 bg-[#241445] text-white'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>

                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[#7C3AED]/15 px-5 pb-5 pt-3.5 text-sm leading-relaxed text-white sm:px-6 sm:pb-6 sm:pt-4 sm:text-base">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── PART 2: HIGH-CONVERSION FINAL WHATSAPP CTA ── */}
        <div
          ref={ctaCardRef}
          id="cta"
          data-agent-layer="final-cta-card"
          data-agent-order="28"
          data-agent-type="card"
          data-agent-label="Final CTA Card"
          className="relative mt-20 overflow-hidden rounded-3xl border border-[#A855F7]/35 bg-gradient-to-b from-[#1A0F33] via-[#241445]/90 to-[#1A0F33] p-8 text-center shadow-2xl shadow-[#7C3AED]/15 sm:mt-28 sm:p-14 lg:p-16"
        >
          {/* Subtle inner radial glow */}
          <div
            className="pointer-events-none absolute -top-32 left-1/2 h-[350px] w-[500px] -translate-x-1/2 rounded-full bg-[#A855F7]/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto max-w-2xl">
            {/* Top pill */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#A855F7]/40 bg-[#241445] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
              <Sparkles className="h-3.5 w-3.5 text-[#A855F7]" />
              <span>Direct Founder Collaboration</span>
            </div>

            <h3 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Your Brand Deserves More.{' '}
              <span className="block mt-1 bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#DDD6FE] bg-clip-text text-transparent">
                Let&apos;s Build Together.
              </span>
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-white sm:text-base">
              Skip agency middlemen. Speak directly with Jaypal. Get a tailored 15-minute growth blueprint with zero commitment.
            </p>

            {/* CTAs Group */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:gap-4">
              <a
                href="https://wa.me/919024675831?text=Hi%20Ampledia%2C%20I%20am%20ready%20to%20scale%20my%20brand.%20Let%27s%20talk%20strategy."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#7C3AED] px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-[#7C3AED]/35 transition-all duration-300 hover:bg-[#6D28D9] hover:shadow-[#7C3AED]/50 focus:outline-none focus:ring-2 focus:ring-[#A855F7] focus:ring-offset-2 focus:ring-offset-[#0A0614] sm:w-auto sm:text-sm"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Let&apos;s Build Together</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#7C3AED]/40 bg-[#241445]/80 px-7 py-4 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:border-[#A855F7] hover:bg-[#7C3AED]/20 focus:outline-none focus:ring-2 focus:ring-[#A855F7] focus:ring-offset-2 focus:ring-offset-[#0A0614] sm:w-auto sm:text-sm"
              >
                <span>Send Brief via Form</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Trust Assurances */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-white">
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-[#A855F7]" />
                15-Minute Free Audit
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#10B981]" />
                Zero Lock-In Retainers
              </span>
              <span className="hidden sm:inline">•</span>
              <span>Bhilwara, RJ • Serving Pan-India</span>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom subtle hairline divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/20 to-transparent" />
    </section>
  );
}

