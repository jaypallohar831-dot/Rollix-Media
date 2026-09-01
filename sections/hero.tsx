'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { CinematicButton } from '@/components/cinematic-button';
import type { PortfolioItem } from '@/lib/portfolio';

/* ── Types ── */
interface MarqueeCard {
  id: string;
  type: 'image' | 'video';
  src: string;        // image src or video src
  poster?: string;    // fallback poster for videos
}

/* ── Local fallback assets ── */
const PORTFOLIO_IMAGES = [
  '/assets/portfolio/motion.png',
  '/assets/portfolio/brand.png',
  '/assets/portfolio/social.png',
  '/assets/portfolio/wedding.png',
];

/* ── Build marquee cards from real project data ── */
function buildMarqueeCards(projects: PortfolioItem[]): MarqueeCard[] {
  const cards: MarqueeCard[] = [];

  // 1. Collect all projects — video projects get video cards, image projects get image cards
  projects.forEach((p, i) => {
    if (p.videoUrl) {
      cards.push({
        id: `proj-${i}`,
        type: 'video',
        src: p.videoUrl,
        poster: p.image || PORTFOLIO_IMAGES[i % PORTFOLIO_IMAGES.length],
      });
    } else if (p.image) {
      cards.push({
        id: `proj-${i}`,
        type: 'image',
        src: p.image,
      });
    }
  });

  // 2. Collect video & image deliverables
  projects.forEach((p, i) => {
    if (p.deliverables && Array.isArray(p.deliverables)) {
      p.deliverables.forEach((d, di) => {
        if (d.type === 'video' && d.url) {
          cards.push({
            id: `deliv-${i}-${di}`,
            type: 'video',
            src: d.url,
            poster: d.resultImage || p.image || PORTFOLIO_IMAGES[i % PORTFOLIO_IMAGES.length],
          });
        } else if (d.type === 'image' && (d.resultImage || d.url)) {
          cards.push({
            id: `deliv-${i}-${di}`,
            type: 'image',
            src: d.resultImage || d.url,
          });
        }
      });
    }
  });

  // 3. If fewer than 9 cards, pad with local portfolio images
  if (cards.length < 9) {
    const needed = 9 - cards.length;
    for (let i = 0; i < needed; i++) {
      cards.push({
        id: `local-${i}`,
        type: 'image',
        src: PORTFOLIO_IMAGES[i % PORTFOLIO_IMAGES.length],
      });
    }
  }

  return cards;
}

/* ── Split cards into 3 columns with duplication for seamless loop ── */
function splitIntoColumns(cards: MarqueeCard[]): [MarqueeCard[], MarqueeCard[], MarqueeCard[]] {
  const perCol = Math.max(3, Math.ceil(cards.length / 3));
  const c1 = cards.slice(0, perCol);
  const c2 = cards.slice(perCol, perCol * 2);
  const c3 = cards.slice(perCol * 2, perCol * 3);

  // Ensure each column has at least 3 items
  const fill = (arr: MarqueeCard[]) => arr.length >= 3 ? arr : [...arr, ...cards.slice(0, 3 - arr.length)];

  // Duplicate each column for seamless infinite loop
  const dup = (arr: MarqueeCard[]) => [...arr, ...arr];

  return [dup(fill(c1)), dup(fill(c2)), dup(fill(c3))];
}

/* ── Main HeroSection ── */
interface HeroSectionProps {
  portfolioProjects?: PortfolioItem[];
}

export function HeroSection({ portfolioProjects = [] }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const overlayOpacity = useTransform(scrollYProgress, [0.3, 0.9], [0, 0.7]);

  const cards = buildMarqueeCards(portfolioProjects);
  const [col1, col2, col3] = splitIntoColumns(cards);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero — Digital Marketing Agency"
      className="relative flex min-h-screen items-center overflow-hidden bg-background pt-20 pb-16 sm:pt-24 sm:pb-24"
      suppressHydrationWarning
    >
      <div className="absolute inset-0 z-0 bg-background pointer-events-none" />

      <motion.div
        style={{ y: headlineY }}
        className="relative z-10 w-full max-w-[1300px] mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center"
      >
        {/* ── Left Column: Text content ── */}
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

        {/* ── Right Column: 3-Column Vertical Marquee ── */}
        <div
          className="relative flex items-center justify-center lg:justify-end w-full hero-fade-up"
          style={{ animationDelay: '0.6s' }}
        >
          <div
            className="relative w-full max-w-[540px] overflow-hidden"
            style={{ height: '580px' }}
          >
            {/* Top fade */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 z-20 bg-gradient-to-b from-background via-background/70 to-transparent" />
            {/* Bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 z-20 bg-gradient-to-t from-background via-background/70 to-transparent" />

            {/* 3 columns */}
            <div className="flex gap-3 h-full">
              {/* Column 1: UP */}
              <div className="flex-1 overflow-hidden">
                <motion.div
                  className="flex flex-col gap-3"
                  animate={mounted ? { y: ['0%', '-50%'] } : { y: '0%' }}
                  transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
                >
                  {col1.map((card, i) => (
                    <MarqueeCardElement key={`c1-${i}`} card={card} />
                  ))}
                </motion.div>
              </div>

              {/* Column 2: DOWN */}
              <div className="flex-1 overflow-hidden">
                <motion.div
                  className="flex flex-col gap-3"
                  animate={mounted ? { y: ['-50%', '0%'] } : { y: '0%' }}
                  transition={{ repeat: Infinity, ease: 'linear', duration: 35 }}
                >
                  {col2.map((card, i) => (
                    <MarqueeCardElement key={`c2-${i}`} card={card} />
                  ))}
                </motion.div>
              </div>

              {/* Column 3: UP */}
              <div className="flex-1 overflow-hidden">
                <motion.div
                  className="flex flex-col gap-3"
                  animate={mounted ? { y: ['0%', '-50%'] } : { y: '0%' }}
                  transition={{ repeat: Infinity, ease: 'linear', duration: 32 }}
                >
                  {col3.map((card, i) => (
                    <MarqueeCardElement key={`c3-${i}`} card={card} />
                  ))}
                </motion.div>
              </div>
            </div>
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

/* ── Single Marquee Card (Image or Video) ── */
function MarqueeCardElement({ card }: { card: MarqueeCard }) {
  if (card.type === 'video') {
    return (
      <div
        className="relative w-full overflow-hidden rounded-xl flex-shrink-0"
        style={{ height: '200px' }}
      >
        <video
          src={card.src}
          poster={card.poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          suppressHydrationWarning
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '0.75rem',
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl flex-shrink-0"
      style={{ height: '200px' }}
    >
      <img
        src={card.src}
        alt=""
        loading="lazy"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '0.75rem',
        }}
      />
    </div>
  );
}

