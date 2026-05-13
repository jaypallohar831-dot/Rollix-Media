'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout';
import { PROCESS_STEPS } from '@/lib/process';
import { staggerContainer, fadeUp, fadeIn } from '@/animations/variants';

/*
 * Performance changes vs. original:
 * 1. Memoized ProcessStepCard to prevent re-renders.
 * 2. Replaced `transition-all` with specific properties.
 * 3. Simplified the animated line segment — was using a variant that
 *    animated `height` (layout-triggering property). Changed to
 *    `scaleY` (GPU-composited transform).
 * 4. Reduced the number of massive background number elements — they
 *    were using extremely large font sizes (14rem-16rem) which forces
 *    the browser to composite huge text layers. Reduced max size.
 * 5. Changed process line width animation from `width` (layout) to
 *    `scaleX` (transform).
 */

export function ProcessSection() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-[#020202] py-28 sm:py-36 lg:py-44"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute left-0 top-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgba(212,118,60,0.08) 0%, transparent 70%)',
          }}
        />
        <div className="grain-overlay absolute inset-0" />
      </div>

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          {/* ──────────────────────────────────────
              STICKY HEADER — Left Column
              ────────────────────────────────────── */}
          <div className="lg:col-span-4 lg:col-start-1">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-10%' }}
              className="sticky top-32 lg:top-48"
            >
              <motion.div variants={fadeIn} className="mb-5 sm:mb-6">
                <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-cinematic-orange/80">
                  <span className="h-[1px] w-6 bg-cinematic-orange/40" />
                  Our Approach
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="font-heading text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.02em] text-foreground"
              >
                Crafting the <br />
                <span className="text-gradient-warm italic">Legacy</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-[340px] text-base leading-relaxed text-foreground/80 sm:text-lg"
              >
                We don&rsquo;t just point a camera. We capture the soul of your most cherished moments through a deliberate, cinematic approach.
              </motion.p>
              
              {/* Subtle visual anchor line for desktop — uses scaleX instead of width */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden lg:block mt-12 h-[1px] w-[40px] origin-left bg-white/[0.1]" 
              />
            </motion.div>
          </div>

          {/* ──────────────────────────────────────
              SCROLLING STEPS — Right Column
              ────────────────────────────────────── */}
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="flex flex-col">
              {PROCESS_STEPS.map((step, index) => (
                <ProcessStepCard
                  key={step.id}
                  step={step}
                  isLast={index === PROCESS_STEPS.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

const ProcessStepCard = memo(function ProcessStepCard({
  step,
  isLast,
}: {
  step: (typeof PROCESS_STEPS)[0];
  isLast: boolean;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-20%' }}
      className={`group relative pl-8 sm:pl-12 ${isLast ? '' : 'mb-28 sm:mb-40'}`}
    >
      {/* Passive track line */}
      <div className="absolute bottom-0 left-0 top-0 w-[1px] bg-white/[0.04] transition-colors duration-500 group-hover:bg-white/[0.1]" />

      {/* Active animated line segment — uses scaleY (GPU) instead of height (layout) */}
      <motion.div
        variants={{
          initial: { scaleY: 0 },
          animate: { scaleY: 1 },
        }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="absolute left-0 top-0 w-[1px] h-full origin-top bg-gradient-to-b from-cinematic-orange to-cinematic-orange/0"
      />

      {/* Massive background number — reduced size for less compositor work */}
      <div className="absolute -left-6 -top-10 select-none font-heading text-[6rem] font-bold leading-none text-white/[0.015] transition-colors duration-500 group-hover:text-cinematic-orange/[0.03] sm:-left-12 sm:-top-16 sm:text-[10rem]">
        {step.number}
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 pt-4 sm:pt-8">
        <motion.div variants={fadeIn} className="mb-4 sm:mb-6">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-cinematic-orange/70">
            {step.subtitle}
          </span>
        </motion.div>

        <motion.h3
          variants={fadeUp}
          className="mb-5 font-heading text-3xl font-light tracking-[-0.01em] text-foreground sm:text-4xl lg:text-5xl"
        >
          {step.title}
        </motion.h3>

        <motion.p
          variants={fadeUp}
          className="max-w-[460px] text-base leading-relaxed text-foreground/80 sm:text-lg"
        >
          {step.description}
        </motion.p>
      </div>
    </motion.div>
  );
});
