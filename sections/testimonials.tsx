'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout';
import { Quote, Star, User, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from '@/lib/motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  avatar_url?: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Strictly obey rule: only real ones from DB, no fake lorem ipsum
  const hasTestimonials = testimonials && testimonials.length > 0;

  useEffect(() => {
    if (!hasTestimonials || typeof window === 'undefined' || !sectionRef.current) return;

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

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, scale: 0.96, y: 25 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [hasTestimonials]);

  if (!hasTestimonials) {
    return null;
  }

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[currentIndex];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-label="Client Testimonials & Reviews"
      className="relative overflow-hidden bg-[#0A0614] py-16 sm:py-24 lg:py-28"
    >
      {/* Background ambient glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C3AED]/10 blur-[140px]"
        aria-hidden="true"
      />

      {/* Top hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/25 to-transparent" />

      <Container size="wide" className="relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          data-agent-layer="testimonials-header"
          data-agent-order="25"
          data-agent-type="text"
          data-agent-label="Testimonials"
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-18"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/30 bg-[#1A0F33]/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7] animate-pulse" />
            Verified Client Feedback
          </div>

          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Words from Our{' '}
            <span className="bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#DDD6FE] bg-clip-text text-transparent">
              Growth Partners.
            </span>
          </h2>

          <p className="mt-4 text-base text-white sm:text-lg">
            Direct feedback from founders, institutions, and brand leaders scaling with Ampledia.
          </p>
        </div>

        {/* Testimonial Showcase Card */}
        <div className="relative mx-auto max-w-3xl" aria-live="polite">
          <div
            ref={cardRef}
            data-agent-layer="testimonials-card"
            data-agent-order="26"
            data-agent-type="card"
            data-agent-label="Featured Review"
            className="relative overflow-hidden rounded-3xl border border-[#7C3AED]/25 bg-[#1A0F33] p-8 text-center shadow-xl shadow-[#7C3AED]/10 sm:p-14"
          >
            {/* Background watermark quote icon */}
            <Quote
              className="pointer-events-none absolute top-6 left-6 h-16 w-16 text-[#7C3AED]/10"
              aria-hidden="true"
            />

            {/* Star Rating */}
            <div className="mb-6 flex justify-center">
              <div
                className="flex items-center gap-1.5 rounded-full border border-[#7C3AED]/20 bg-[#241445]/60 px-3.5 py-1"
                aria-label={`Rating: ${current.rating} out of 5 stars`}
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < current.rating
                        ? 'fill-[#F59E0B] text-[#F59E0B]'
                        : 'text-white/20'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>

            {/* Testimonial Content */}
            <blockquote className="font-heading text-lg font-normal leading-relaxed text-white italic sm:text-2xl sm:leading-relaxed">
              &ldquo;{current.content}&rdquo;
            </blockquote>

            {/* Author Details */}
            <div className="mt-8 flex flex-col items-center">
              <div className="relative mb-3 h-14 w-14 overflow-hidden rounded-full border-2 border-[#7C3AED]/40 bg-[#241445]">
                {current.avatar_url ? (
                  <Image
                    src={current.avatar_url}
                    alt={`Photo of ${current.name}`}
                    fill
                    unoptimized
                    sizes="56px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[#C4B5FD]">
                    <User className="h-6 w-6" aria-hidden="true" />
                  </div>
                )}
              </div>

              <h4 className="font-heading text-base font-bold text-white sm:text-lg">
                {current.name}
              </h4>

              <p className="mt-0.5 text-xs text-white sm:text-sm">
                {current.role}
                {current.company ? ` • ${current.company}` : ''}
              </p>
            </div>

            {/* Desktop Prev / Next Buttons */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="absolute left-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[#7C3AED]/30 bg-[#241445]/80 p-3 text-[#C4B5FD] backdrop-blur-sm transition-all duration-300 hover:border-[#A855F7] hover:bg-[#7C3AED] hover:text-white sm:flex"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>

                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="absolute right-4 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[#7C3AED]/30 bg-[#241445]/80 p-3 text-[#C4B5FD] backdrop-blur-sm transition-all duration-300 hover:border-[#A855F7] hover:bg-[#7C3AED] hover:text-white sm:flex"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Navigation Controls */}
          {testimonials.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4 sm:hidden">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#7C3AED]/30 bg-[#241445] text-[#C4B5FD]"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <button
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#7C3AED]/30 bg-[#241445] text-[#C4B5FD]"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Pagination Indicators */}
          {testimonials.length > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'w-7 bg-[#A855F7]'
                      : 'w-2 bg-[#7C3AED]/30 hover:bg-[#7C3AED]/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </Container>

      {/* Bottom hairline divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/20 to-transparent" />
    </section>
  );
}
