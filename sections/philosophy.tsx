'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout';
import { CinematicReveal } from '@/components/cinematic-reveal';
import { fadeUp, staggerContainer, fadeIn } from '@/animations/variants';

/* ============================================
   Philosophy pillars — the brand's three truths
   ============================================ */
const PILLARS = [
  {
    index: '01',
    title: 'Strategic Dominance',
    body: 'We don\'t just design; we architect digital dominance. Every website and campaign is engineered to position your brand as the undisputed leader in your industry.',
  },
  {
    index: '02',
    title: 'Cinematic Authority',
    body: 'Leveraging high-end videography to capture your brand\'s authority. We use cinematic storytelling to build trust and emotional resonance with your ideal audience.',
  },
  {
    index: '03',
    title: 'Exponential Growth',
    body: 'Creativity without results is just art. We focus on data-driven growth strategies that turn high-end visuals into measurable business revenue and ROI.',
  },
];

/*
 * Performance changes vs. original:
 * 1. REMOVED section-level useScroll + useTransform for statementY parallax
 *    and lineHeight animation. These were 2 continuous scroll listeners
 *    running every frame for an effect that was barely perceptible.
 * 2. Removed one nested staggerContainer from the editorial body (was
 *    double-wrapping with initial="initial" whileInView="animate").
 * 3. Simplified the accent line — removed the motion.div with scrollY-driven
 *    height. Now uses a simple CSS transition.
 * 4. Reduced transition durations on hover effects (700ms → 500ms) for
 *    snappier interaction feel.
 */

export function PhilosophySection() {
  return (
    <section
      className="relative overflow-hidden bg-[#050505] py-32 sm:py-44 lg:py-56"
      aria-label="Brand Philosophy"
    >
      {/* Ambient background layers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Warm glow — slightly off-center left */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse 45% 50% at 30% 50%, rgba(212,118,60,0.07) 0%, transparent 70%)',
          }}
        />
        {/* Film grain */}
        <div className="grain-overlay absolute inset-0" />
      </div>

      <Container size="wide" className="relative z-10">
        {/* ──────────────────────────────────────
            PART 1 — Opening editorial line
            ────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-15%' }}
          className="mb-24 sm:mb-32 lg:mb-40"
        >
          {/* Thin accent line */}
          <motion.div
            variants={fadeIn}
            className="mb-10 sm:mb-14"
          >
            <div className="flex items-center gap-4">
              <span className="h-[1px] w-10 bg-cinematic-orange/40" />
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-cinematic-orange/70">
                Our Mandate
              </span>
            </div>
          </motion.div>

          {/* Main emotional statement */}
          <motion.h2
            variants={fadeUp}
            className="font-heading text-[clamp(2.2rem,6vw,6.5rem)] font-light leading-[0.95] tracking-[-0.03em] text-foreground"
          >
            <span className="block">Performance meets</span>
            <span className="block mt-1 sm:mt-3">
              high-end{' '}
              <span className="text-gradient-warm italic font-normal">
                artistry.
              </span>
            </span>
          </motion.h2>
        </motion.div>
        
        {/* Cinematic Image Reveal — breaking the text flow */}
        <CinematicReveal 
          imageSrc="/images/philosophy-hero-v3.png" 
          alt="Cinematic storytelling atmosphere"
          priority={true}
          founders={[
            { name: 'Mr. Jaypal', side: 'left' },
            { name: 'Mr. Rishabh Singh', side: 'right' },
          ]}
        />

        {/* ──────────────────────────────────────
            PART 2 — Asymmetric editorial body
            ────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-10%' }}
          className="mb-28 sm:mb-36 lg:mb-48"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-0">
            {/* Left — vertical accent line (desktop only) */}
            <div className="hidden lg:col-span-1 lg:flex lg:flex-col lg:items-center lg:pt-2">
              <div className="relative w-[1px] flex-1 bg-white/[0.04]">
                {/* Simple gradient line instead of scroll-driven height */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cinematic-orange/30 to-transparent" />
              </div>
            </div>

            {/* Center — poetic body copy */}
            <div className="lg:col-span-6 lg:col-start-2 lg:pl-10">
              <motion.p variants={fadeUp} className="text-lg leading-[1.8] text-foreground/90 sm:text-xl sm:leading-[1.9] lg:text-[22px] lg:leading-[1.85]">
                We don&rsquo;t just create content.
                <br className="hidden sm:block" />{' '}
                We engineer digital experiences 
                <br className="hidden sm:block" />{' '}
                that drive business transformation.
              </motion.p>

              <motion.p variants={fadeUp} className="mt-8 text-base leading-relaxed text-muted-foreground/90 sm:text-lg sm:leading-relaxed max-w-[480px]">
                In an era of noise, we bring clarity and cinematic impact. Our 
                approach blends the meticulous craft of video editing with the 
                strategic precision of high-end web design and search engine dominance.
              </motion.p>
            </div>

            {/* Right — pull quote (desktop offset) */}
            <motion.div
              variants={fadeUp}
              className="flex items-start lg:col-span-4 lg:col-start-9 lg:pt-16"
            >
              <div className="border-l border-cinematic-orange/20 pl-6 sm:pl-8">
                <p className="font-heading text-xl italic leading-snug text-foreground/80 sm:text-2xl sm:leading-snug">
                  &ldquo;We believe the most powerful films are the ones that make you 
                  feel something deeply human.&rdquo;
                </p>
                <span className="mt-4 inline-block text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground/70">
                  — Studio Manifesto
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ──────────────────────────────────────
            PART 3 — Three philosophy pillars
            ────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-10%' }}
        >
          {/* Subtle top divider */}
          <motion.div variants={fadeIn} className="mb-16 sm:mb-20">
            <div
              className="h-[1px] w-full"
              style={{
                background:
                  'linear-gradient(90deg, rgba(212,118,60,0.15) 0%, rgba(255,255,255,0.04) 40%, transparent 100%)',
              }}
            />
          </motion.div>

          <div className="grid grid-cols-1 gap-12 sm:gap-16 md:grid-cols-3 md:gap-10 lg:gap-16">
            {PILLARS.map((pillar) => (
              <motion.div
                key={pillar.index}
                variants={fadeUp}
                className="group"
              >
                {/* Index number */}
                <span className="mb-4 inline-block text-[11px] font-medium tracking-[0.2em] text-cinematic-orange/50 transition-colors duration-500 group-hover:text-cinematic-orange">
                  {pillar.index}
                </span>

                {/* Pillar title */}
                <h3 className="mb-4 font-heading text-2xl font-light tracking-[-0.01em] text-foreground sm:text-[1.75rem]">
                  {pillar.title}
                </h3>

                {/* Pillar body */}
                <p className="text-[15px] leading-relaxed text-muted-foreground/90 sm:text-base sm:leading-relaxed">
                  {pillar.body}
                </p>

                {/* Hover accent line */}
                <div className="mt-6 h-[1px] w-8 bg-white/[0.06] transition-[width,background-color] duration-500 group-hover:w-14 group-hover:bg-cinematic-orange/30" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ──────────────────────────────────────
            PART 4 — Closing emotional line
            ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="mt-28 sm:mt-36 lg:mt-48 text-center"
        >
          {/* Dot separator */}
          <div className="mb-10 flex justify-center">
            <span className="h-1 w-1 rounded-full bg-cinematic-orange/40" />
          </div>

          <p className="mx-auto max-w-[600px] font-heading text-[clamp(1.4rem,3vw,2.5rem)] font-light italic leading-[1.3] tracking-[-0.01em] text-foreground/90">
            A powerful film doesn&rsquo;t just tell a story.
            <br />
            It scales your vision and dominates the digital space.
          </p>

          {/* Closing accent */}
          <div className="mt-10 flex items-center justify-center gap-5">
            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-white/[0.1]" />
            <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-muted-foreground/30">
              This is our conviction
            </span>
            <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-white/[0.1]" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
