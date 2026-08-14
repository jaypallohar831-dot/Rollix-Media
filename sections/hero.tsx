'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { CinematicButton } from '@/components/cinematic-button';

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.9], [0, 0.7]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero — Digital Marketing Agency"
      className="relative flex min-h-screen items-center overflow-hidden bg-background pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      <div className="absolute inset-0 z-0 bg-background pointer-events-none" />

      <motion.div
        style={{ y: headlineY }}
        className="relative z-10 w-full max-w-[1300px] mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center"
      >
        {/* Left Column: Text content */}
        <div className="flex flex-col items-start text-left">
          <div className="mb-6 sm:mb-8 hero-fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-cinematic-orange">
              Digital Marketing Agency
            </span>
          </div>

          <h1 className="font-heading text-[clamp(2.25rem,6vw,5.5rem)] font-light leading-[1.08] tracking-[-0.02em] text-foreground">
            <span className="block overflow-hidden pb-1 -mb-1">
              <span className="block hero-fade-up" style={{ animationDelay: '0.15s' }}>Architecting</span>
            </span>
            <span className="block mt-1 sm:mt-2 overflow-hidden pb-2 -mb-2">
              <span className="text-cinematic-orange font-normal italic block hero-fade-up" style={{ animationDelay: '0.22s' }}>
                Digital
              </span>
            </span>
            <span className="block mt-1 sm:mt-2 overflow-hidden pb-1 -mb-1">
              <span className="block hero-fade-up" style={{ animationDelay: '0.3s' }}>Dominance</span>
            </span>
          </h1>

          <p
            className="mt-6 max-w-[480px] text-base leading-[1.6] text-muted-foreground sm:mt-8 sm:text-lg sm:leading-[1.7] font-light hero-fade-up"
            style={{ animationDelay: '0.38s' }}
          >
            A high-performance creative agency blending premium videography,
            strategic web design, and data-driven marketing to scale your business.
          </p>

          <div
            className="mt-8 flex flex-col w-full items-stretch gap-3 sm:w-auto sm:mt-12 sm:flex-row sm:items-center sm:flex-wrap hero-fade-up"
            style={{ animationDelay: '0.45s' }}
          >
            <CinematicButton variant="primary" href="/services">
              Explore Our Services
            </CinematicButton>
            <CinematicButton variant="outline" href="/portfolio">
              View Portfolio
            </CinematicButton>
            <CinematicButton variant="outline" href="/contact" showArrow={false}>
              Start Your Growth
            </CinematicButton>
          </div>

          <div
            className="mt-12 sm:mt-24 hero-fade-up"
            style={{ animationDelay: '0.52s' }}
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
              Est. 2026
            </span>
          </div>
        </div>

        {/* Right Column: Video Reel and Scroll Indicator */}
        <div className="relative flex items-center justify-end w-full hero-fade-up" style={{ animationDelay: '0.6s' }}>
          <div className="relative w-full max-w-[600px] aspect-video sm:aspect-square lg:aspect-[4/4.5] overflow-hidden rounded-2xl sm:rounded-[32px] bg-muted shadow-lg mr-0 lg:mr-12 group">
            <video
              src="/assets/premium/hero-bg-video.mp4"
              poster="/assets/premium/hero-bg-poster.jpg"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            >
              <track kind="captions" srcLang="en" label="No captions available" />
            </video>
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </div>

          {/* Vertical SCROLL indicator */}
          <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 flex-col items-center gap-4">
            <div className="h-16 w-[1px] bg-border" />
            <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-muted-foreground [writing-mode:vertical-lr] rotate-180">
              Scroll
            </span>
            <div className="h-16 w-[1px] bg-border" />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 z-[15] bg-background pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />
    </section>
  );
}
