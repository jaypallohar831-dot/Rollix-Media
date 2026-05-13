'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { HeroBackground } from '@/components/hero-background';
import { Hero3DObjects } from '@/components/hero-3d-objects';
import { CinematicButton } from '@/components/cinematic-button';
import { ScrollIndicator } from '@/components/scroll-indicator';
import {
  fadeUp,
  staggerContainer,
  fadeIn,
} from '@/animations/variants';

/*
 * Performance changes vs. original:
 * 1. Kept the single useScroll — hero parallax is important for
 *    the cinematic feel and it's only one scroll listener.
 * 2. Reduced parallax ranges (headlineY: -80→-50, subtextY: -40→-25)
 *    to reduce visual displacement and GPU compositing work.
 * 3. Removed backdrop-blur-sm from the eyebrow tag — blur on
 *    a scroll-animated element is extremely expensive.
 */

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Subtle parallax on scroll — reduced ranges for less GPU work
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const subtextY = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0">
        <HeroBackground />
      </div>

      {/* 3D Floating Objects */}
      <div className="absolute inset-0 z-[5]">
        <Hero3DObjects />
      </div>

      {/* Fade overlay (much cheaper than animating opacity on the heavy containers) */}
      <motion.div 
        className="absolute inset-0 bg-[#050505] z-[6] pointer-events-none will-change-[opacity]" 
        style={{ opacity: overlayOpacity }} 
      />

      {/* Main content */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 flex w-full max-w-[1200px] flex-col items-center px-6 text-center sm:px-8 lg:px-12"
      >
        {/* Eyebrow tag — removed backdrop-blur for performance */}
        <motion.div variants={fadeUp} className="mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/40 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-cinematic-orange animate-pulse" />
            Premium Cinematic Studio
          </span>
        </motion.div>

        {/* Main headline — massive, emotional, serif */}
        <motion.div className="will-change-transform" style={{ y: headlineY }}>
          <motion.h1
            variants={fadeUp}
            className="font-heading text-[clamp(2.5rem,7vw,7.5rem)] font-light leading-[0.95] tracking-[-0.02em] text-foreground"
          >
            <span className="block">Crafting</span>
            <span className="block mt-2 sm:mt-3">
              <span className="text-gradient-warm font-normal italic">
                Cinematic
              </span>
            </span>
            <span className="block mt-2 sm:mt-3">Memories</span>
          </motion.h1>
        </motion.div>

        {/* Supporting paragraph */}
        <motion.div className="will-change-transform" style={{ y: subtextY }}>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-[540px] text-base leading-[1.8] text-foreground/80 sm:mt-10 sm:text-lg sm:leading-[1.9] font-light"
          >
            Transforming your most precious moments into timeless, emotional films. 
            A luxury storytelling experience crafted with heart, soul, and Indian cinematic grace.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center gap-4 sm:mt-14 sm:flex-row sm:gap-5"
        >
          <CinematicButton variant="primary" href="#work">
            View Our Films
          </CinematicButton>
          <CinematicButton variant="outline" href="#contact" showArrow={false}>
            Begin Your Story
          </CinematicButton>
        </motion.div>

        {/* Bottom accent line */}
        <motion.div
          variants={fadeIn}
          className="mt-16 sm:mt-24 flex items-center gap-6"
        >
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/[0.15]" />
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground/50">
            Est. 2024
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/[0.15]" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Bottom edge gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20" />
    </section>
  );
}
