'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout';
import { PROCESS_STEPS } from '@/lib/process';
import { staggerContainer, fadeUp, fadeIn } from '@/animations/variants';
import { Search, Pencil, Camera, TrendingUp, Rocket } from 'lucide-react';

const ICONS = [Search, Pencil, Camera, TrendingUp, Rocket];

export function ProcessSection() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-background py-12 sm:py-16 lg:py-20"
    >
      <div className="absolute inset-0 pointer-events-none bg-background" aria-hidden="true" />

      <Container size="wide" className="relative z-10 border-t border-border/40 pt-6 sm:pt-8 lg:pt-10">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, margin: '-10%' }}
          className="mb-16 sm:mb-24 flex flex-col items-start"
        >
          <motion.div variants={fadeIn} className="mb-4 sm:mb-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cinematic-orange">
              Our Approach
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-heading text-[clamp(2.5rem,4vw,3.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-foreground"
          >
            Our Execution
          </motion.h2>
        </motion.div>

        {/* Horizontal Timeline */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, margin: '-10%' }}
          className="relative"
        >
          {/* Horizontal Line connecting icons (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-[1px] bg-border/60 z-0" />

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6 relative z-10">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = ICONS[index];
              return (
                <motion.div key={step.id} variants={fadeUp} className="flex flex-col items-center text-center group">
                  {/* Icon in Circle */}
                  <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-white shadow-sm transition-all duration-500 group-hover:border-cinematic-orange group-hover:shadow-md relative z-10">
                    <Icon className="h-6 w-6 text-cinematic-orange transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                  </div>

                  <span className="mb-3 text-[11px] font-bold text-cinematic-orange">
                    {step.number}
                  </span>
                  
                  <h3 className="mb-3 font-heading text-lg font-medium tracking-[-0.01em] text-foreground">
                    {step.subtitle}
                  </h3>
                  
                  <p className="text-[13px] leading-relaxed text-muted-foreground px-2">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
