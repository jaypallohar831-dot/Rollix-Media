'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { HeroBackground } from '@/components/hero-background';
import { Hero3DObjects } from '@/components/hero-3d-objects';
import { Hero3DCamera } from '@/components/hero-3d-camera';
import { CinematicButton } from '@/components/cinematic-button';
import { ScrollIndicator } from '@/components/scroll-indicator';
import {
  fadeUp,
  staggerContainer,
  fadeIn,
} from '@/animations/variants';

/*
 * Smooth parallax restored — but lightweight.
 * Uses framer-motion useScroll which is compositor-optimized.
 * Only 2 transforms (headline Y-shift + fade overlay) instead
 * of the original 3 + heavy blur.
 *
 * Performance: Hero video (12.7 MB) is deferred — preload="none"
 * and source only mounts after 2s delay so it doesn't block
 * initial paint or compete with critical resources.
 */

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Defer video loading — let the page paint first
  useEffect(() => {
    const timer = setTimeout(() => setLoadVideo(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Subtle parallax: headline shifts up 60px as user scrolls past
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  // Fade to black as user scrolls past hero
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.9], [0, 0.7]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 z-0">
        <HeroBackground />
      </div>

      {/* Cinematic Background Video (Low Opacity) — deferred load */}
      <div className="absolute inset-0 z-[1] overflow-hidden opacity-20 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="w-full h-full object-cover scale-[1.02]"
        >
          {loadVideo && (
            <source src="/assets/premium/hero-bg-video.mp4" type="video/mp4" />
          )}
        </video>
        {/* Soft gradient mask to blend edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
      </div>

      {/* 3D Floating Objects */}
      <div className="absolute inset-0 z-[5]">
        <Hero3DObjects />
      </div>

      {/* 3D Camera */}
      <Hero3DCamera />

      {/* Main content — with subtle parallax */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        style={{ y: headlineY }}
        className="relative z-10 flex w-full max-w-[1200px] flex-col items-center px-6 pt-24 sm:pt-32 text-center sm:px-8 lg:px-12"
      >
        {/* Eyebrow tag */}
        <motion.div variants={fadeUp} className="mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-black/60 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-cinematic-orange animate-pulse" />
            Digital Marketing Agency
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={staggerContainer}
          className="font-heading text-[clamp(2.5rem,7vw,7.5rem)] font-light leading-[0.95] tracking-[-0.02em] text-foreground"
        >
          <span className="block overflow-hidden pb-4 -mb-4">
            <motion.span variants={fadeUp} className="block pb-2">Architecting</motion.span>
          </span>
          <span className="block mt-2 sm:mt-3 overflow-hidden pb-6 -mb-6 pr-6 -mr-6">
            <motion.span
              variants={fadeUp}
              className="text-gradient-warm font-normal italic block pb-4 pr-4"
            >
              Digital
            </motion.span>
          </span>
          <span className="block mt-2 sm:mt-3 overflow-hidden pb-4 -mb-4">
            <motion.span variants={fadeUp} className="block pb-2">Dominance</motion.span>
          </span>
        </motion.h1>

        {/* Supporting paragraph */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-8 max-w-[600px] text-base leading-[1.8] text-foreground/80 sm:mt-10 sm:text-lg sm:leading-[1.9] font-light"
        >
          A high-performance creative agency blending premium videography,
          strategic web design, and data-driven marketing to scale your business.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center gap-4 sm:mt-14 sm:flex-row sm:gap-5"
        >
          <CinematicButton variant="primary" href="/services">
            Explore Our Services
          </CinematicButton>
          <CinematicButton variant="outline" href="/contact" showArrow={false}>
            Start Your Growth
          </CinematicButton>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="mt-12 sm:mt-20 flex items-center gap-6"
        >
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/[0.15]" />
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground/50">
            Est. 2024
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/[0.15]" />
        </motion.div>
      </motion.div>

      {/* Scroll fade overlay — darkens as user scrolls past */}
      <motion.div
        className="absolute inset-0 z-[15] bg-[#050505] pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Bottom edge gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20" />
    </section>
  );
}
