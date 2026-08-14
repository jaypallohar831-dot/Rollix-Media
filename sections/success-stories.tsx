'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { staggerContainer, fadeUp, fadeIn } from '@/animations/variants';
import { ArrowRight, Eye, MessageCircle, Target, Rocket } from 'lucide-react';

/* ─── CASE STUDY METRICS ─── */

const METRICS = [
  { value: '129K+', label: 'Views Generated' },
  { value: '15.4%', label: 'Engagement Rate' },
  { value: '40-60', label: 'Qualified Leads' },
  { value: '125:1', label: 'ROI Achieved' },
];

const VISUAL_CARDS = [
  { icon: Eye, value: '129,273', label: 'Total Views' },
  { icon: MessageCircle, value: '19,889', label: 'Engagement' },
  { icon: Target, value: '67,979', label: 'Unique Reach' },
  { icon: Rocket, value: '125:1', label: 'ROI', highlight: true },
];

/* ─── COMPONENT ─── */

export function SuccessStoriesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-15%' });

  return (
    <section
      ref={sectionRef}
      id="success-stories"
      className="relative overflow-hidden bg-background"
    >
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-border" />

      <Container size="wide" className="relative z-10 py-12 sm:py-16 lg:py-20">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          className="mb-16 text-center sm:mb-20"
        >
          <motion.span
            variants={fadeIn}
            className="mb-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-cinematic-orange sm:mb-6"
          >
            <span className="h-[1px] w-6 bg-cinematic-orange/40" />
            Success Stories
            <span className="h-[1px] w-6 bg-cinematic-orange/40" />
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-heading text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.02em] text-foreground"
          >
            Real Results. Real Clients.{' '}
            <span className="text-cinematic-orange italic">Real Impact.</span>
          </motion.h2>
        </motion.div>

        {/* Featured Case Study */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* Left — Info & Metrics */}
          <div>
            <h3 className="mb-2 font-heading text-3xl font-light text-foreground sm:text-4xl lg:text-[2.5rem]">
              Vision Classes Bhilwara
            </h3>
            <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.15em] text-cinematic-orange sm:text-xs">
              Instagram Ad Campaign for Educational Coaching
            </p>

            {/* Metrics Grid */}
            <div className="mb-8 grid grid-cols-2 gap-4">
              {METRICS.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.4 + i * 0.12,
                  }}
                  className="rounded-xl border-l-[3px] border-cinematic-orange bg-muted p-5"
                >
                  <span className="block text-2xl font-extrabold text-cinematic-orange sm:text-3xl">
                    {m.value}
                  </span>
                  <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground sm:text-[11px]">
                    {m.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mb-8 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed"
            >
              Rollix Media executed a targeted Instagram ad campaign for Vision
              Classes Bhilwara, generating 129K+ views and 19.8K engagement in
              just 30 days. Through strategic testimonial-based creative and
              hyper-local targeting, we delivered 40-60 qualified leads with a
              remarkable 125:1 return on investment.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <Link
                href="/case-studies/vision-classes-bhilwara"
                className="group inline-flex items-center gap-2.5 rounded-full border border-cinematic-orange/30 bg-cinematic-orange/10 px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-cinematic-orange transition-all duration-500 hover:bg-cinematic-orange hover:text-white sm:px-8 sm:py-4"
              >
                📊 Read Full Case Study
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Right — Visual Metric Cards */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {VISUAL_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 18,
                    delay: 0.5 + i * 0.15,
                  }}
                  className={`group relative overflow-hidden rounded-2xl border p-6 text-center transition-all duration-500 sm:p-8 ${
                    card.highlight
                      ? 'border-cinematic-orange bg-cinematic-orange shadow-md'
                      : 'border-border bg-white hover:border-cinematic-orange/30 shadow-sm'
                  }`}
                  style={{
                    transform: 'translateZ(0)', // GPU acceleration
                  }}
                >
                  <Icon
                    className={`relative z-10 mx-auto mb-4 h-8 w-8 sm:h-10 sm:w-10 ${
                      card.highlight ? 'text-white' : 'text-muted-foreground'
                    }`}
                  />
                  <span className={`relative z-10 block text-xl font-extrabold sm:text-2xl ${card.highlight ? 'text-white' : 'text-foreground'}`}>
                    {card.value}
                  </span>
                  <span className={`relative z-10 mt-2 block text-[10px] font-medium uppercase tracking-[0.1em] sm:text-[11px] ${card.highlight ? 'text-white/80' : 'text-muted-foreground'}`}>
                    {card.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border" />
    </section>
  );
}
