'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout';
import { fadeUp, staggerContainer, fadeIn } from '@/animations/variants';

const PILLARS = [
  {
    index: '01',
    title: 'Strategic Dominance',
    body: 'We don\'t just design; we architect digital dominance. Every website and campaign is engineered to position your brand as the leader in your industry.',
  },
  {
    index: '02',
    title: 'Cinematic Authority',
    body: 'Leveraging high-end videography to capture your brand\'s authority. We use cinematic storytelling to build trust and emotional resonance.',
  },
  {
    index: '03',
    title: 'Exponential Growth',
    body: 'Creativity without results is just art. We focus on data-driven strategies that turn high-end visuals into measurable business revenue and ROI.',
  },
];

export function PhilosophySection() {
  return (
    <section
      className="relative overflow-hidden bg-background py-12 sm:py-16 lg:py-20"
      aria-label="Brand Philosophy"
    >
      <div className="absolute inset-0 pointer-events-none bg-background" aria-hidden="true" />

      <Container size="wide" className="relative z-10 border-t border-border/40 pt-6 sm:pt-8 lg:pt-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, margin: '-10%' }}
          className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12"
        >
          {/* Left Column: Title */}
          <div className="lg:col-span-4 lg:col-start-1 flex flex-col">
            <motion.div variants={fadeIn} className="mb-6 sm:mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cinematic-orange">
                Our Mandate
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-heading text-[clamp(2.5rem,4vw,3.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-foreground pr-4"
            >
              Performance meets <br className="hidden lg:block" />
              high-end <span className="text-cinematic-orange italic font-normal">artistry.</span>
            </motion.h2>
          </div>

          {/* Right Column: 3 Pillars */}
          <div className="lg:col-span-8 lg:col-start-5 pt-2">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6 lg:gap-8">
              {PILLARS.map((pillar) => (
                <motion.div key={pillar.index} variants={fadeUp} className="group flex flex-col">
                  <span className="mb-4 block text-[11px] font-medium tracking-[0.1em] text-muted-foreground transition-colors duration-500 group-hover:text-cinematic-orange">
                    {pillar.index}
                  </span>
                  <h3 className="mb-3 font-heading text-lg sm:text-xl font-medium tracking-[-0.01em] text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-[1.7] text-muted-foreground sm:text-[15px]">
                    {pillar.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
