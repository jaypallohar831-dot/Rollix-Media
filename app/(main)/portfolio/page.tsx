'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { FilmCard } from '@/components/film-card';
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_ITEMS,
  type PortfolioCategory,
  type PortfolioItem,
} from '@/lib/portfolio';
import { Play, ChevronLeft, ChevronRight, ArrowRight, Loader2 } from 'lucide-react';
import { portfolioService } from '@/services/portfolio.service';
import type { PortfolioProject } from '@/services/portfolio.service';
import dynamic from 'next/dynamic';

const ProcessSection = dynamic(() => import('@/sections/process').then(m => ({ default: m.ProcessSection })));

/* ─────────────────────────────────────────
   HERO CAROUSEL  (TWF-style full-width slider)
   ───────────────────────────────────────── */
function HeroCarousel({ items }: { items: PortfolioItem[] }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  const total = items.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (total === 0) return;
    timerRef.current = setInterval(next, 6000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next, total]);

  // Reset timer on manual navigation
  const go = useCallback(
    (dir: 'next' | 'prev') => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (dir === 'next') {
        next();
      } else {
        prev();
      }
      timerRef.current = setInterval(next, 6000);
    },
    [next, prev]
  );

  if (total === 0) return null;
  const item = items[current];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="relative aspect-[16/9] sm:aspect-[2.4/1] w-full"
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            unoptimized={item.image.startsWith('http')}
            className="object-cover"
            sizes="100vw"
            quality={80}
          />

          {/* Cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-14">
            {/* Meta */}
            <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/90 sm:text-xs">
              <span>{item.location || 'Global'}</span>
              <span className="text-cinematic-orange">►</span>
              <span>{item.month || 'Selected'} {item.year}</span>
            </div>

            {/* Title */}
            <h2 className="font-heading text-3xl font-normal tracking-[0.01em] text-white sm:text-5xl lg:text-6xl">
              {item.title}
            </h2>

            {/* Tagline */}
            <p className="mt-2 max-w-[500px] text-sm leading-relaxed text-white/90 sm:text-base">
              {item.tagline}
            </p>

            {/* View Film button */}
            <Link
              href={`/portfolio/${item.id}`}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-400 hover:border-cinematic-orange/60 hover:bg-cinematic-orange/20 hover:text-white sm:px-6 sm:py-3"
            >
              {item.mediaType === 'video' && <Play className="h-3.5 w-3.5" fill="currentColor" />}
              {item.mediaType === 'video' ? 'View Film' : 'View Project'}
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={() => go('prev')}
        className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white/90 backdrop-blur-sm transition-all hover:bg-black/60 hover:text-white sm:left-5 sm:h-12 sm:w-12"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      <button
        onClick={() => go('next')}
        className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white/90 backdrop-blur-sm transition-all hover:bg-black/60 hover:text-white sm:right-5 sm:h-12 sm:w-12"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 right-6 z-20 flex items-center gap-1.5 sm:bottom-6 sm:right-10">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (timerRef.current) clearInterval(timerRef.current);
              setCurrent(i);
              timerRef.current = setInterval(next, 6000);
            }}
            className={`h-1 rounded-full transition-all duration-400 ${
              i === current
                ? 'w-6 bg-cinematic-orange'
                : 'w-2 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   HORIZONTAL SCROLL ROW (TWF-style section)
   ───────────────────────────────────────── */
function FilmRow({
  label,
  items,
}: {
  label: string;
  items: PortfolioItem[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const distance = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({
      left: dir === 'right' ? distance : -distance,
      behavior: 'smooth',
    });
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="mb-14 sm:mb-20">
      {/* Row header */}
      <div className="mb-6 flex items-center justify-between sm:mb-8">
        <h2 className="font-heading text-xl font-normal uppercase tracking-[0.08em] text-foreground sm:text-2xl">
          {label}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-all hover:border-cinematic-orange hover:text-cinematic-orange"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-all hover:border-cinematic-orange hover:text-cinematic-orange"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin sm:gap-6"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="w-[240px] flex-shrink-0 sm:w-[300px] lg:w-[340px]"
          >
            <FilmCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ALL FILMS GRID (TWF-style 2-col grid)
   ───────────────────────────────────────── */
function AllFilmsGrid({
  items,
}: {
  items: PortfolioItem[];
}) {
  return (
    <div>
      {/* Section header */}
      <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-heading text-xl font-normal uppercase tracking-[0.08em] text-foreground sm:text-2xl">
          The Full Archive
        </h2>
      </div>

      {/* 2-col grid like TWF */}
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2"
        >
          {items.map((item, i) => (
            <FilmCard
              key={item.id}
              item={item}
              size="large"
              priority={i < 4}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-foreground/80">
            No projects in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   PORTFOLIO PAGE — Main export
   ───────────────────────────────────────── */
export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('All');
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await portfolioService.getProjects();
        if (data && data.length > 0) {
          const mapped: PortfolioItem[] = data.map((item: PortfolioProject) => ({
            id: item.slug,
            title: item.title,
            category: item.categories?.title || 'Uncategorized',
            tagline: item.seo_title || item.title,
            description: item.description,
            year: new Date(item.created_at).getFullYear().toString(),
            image: item.thumbnail || '/assets/portfolio/wedding.png',
            mediaType: item.video_url ? 'video' : 'image',
            videoUrl: item.video_url || undefined,
            tags: item.tags || [],
            featured: item.featured,
            group: item.featured ? 'featured' : 'trending',
            location: item.location || 'India'
          }));
          setItems(mapped);
        } else {
          setItems(PORTFOLIO_ITEMS);
        }
      } catch (err) {
        console.error('Failed to load portfolio:', err);
        setItems(PORTFOLIO_ITEMS);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredItems = useMemo(
    () => {
      if (activeCategory === 'All') return items;
      return items.filter(item => item.category === activeCategory);
    },
    [activeCategory, items]
  );

  // Group items for horizontal rows
  const trendingItems = useMemo(() => items.filter(i => i.group === 'trending'), [items]);
  const classicsItems = useMemo(() => items.filter(i => i.group === 'classics'), [items]);
  const featuredItems = useMemo(() => items.filter(i => i.featured), [items]);

  return (
    <main className="relative min-h-screen bg-background">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none fixed z-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 70% 10%, rgba(212,118,60,0.05) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 pt-24 sm:pt-28">
        <Container size="wide">
          {/* ── PAGE TITLE ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center sm:mb-14"
          >
            <h1 className="font-heading text-3xl font-normal uppercase tracking-[0.1em] text-foreground sm:text-4xl lg:text-5xl">
              Cinematic Archives
            </h1>
            <div
              className="mx-auto mt-4 mb-10 h-[1px] w-12"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(212,118,60,0.4), transparent)',
              }}
            />

            {/* ── GLOBAL CATEGORY FILTER TABS ── */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {PORTFOLIO_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] transition-all duration-300 sm:text-[11px] ${
                    activeCategory === cat
                      ? 'border-cinematic-orange/60 bg-cinematic-orange/20 text-cinematic-orange shadow-[0_0_15px_rgba(212,118,60,0.3)]'
                      : 'border-border/60 text-foreground/80 hover:border-border hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {loading ? (
            <div className="flex h-96 items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-cinematic-orange/50" />
            </div>
          ) : (
            <>
              {activeCategory === 'All' ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key="all-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-16 sm:mb-24">
                      <HeroCarousel items={featuredItems} />
                    </div>

                    <div className="mb-12 mt-8 flex flex-col items-center">
                      <h2 className="font-heading text-3xl font-normal uppercase tracking-[0.1em] text-foreground sm:text-4xl">
                        Our Projects
                      </h2>
                      <div className="mt-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-cinematic-orange to-transparent opacity-50" />
                    </div>

                    <div>
                      {PORTFOLIO_CATEGORIES.filter(c => c !== 'All').map(category => {
                        const catItems = items.filter(item => item.category === category);
                        if (catItems.length === 0) return null;
                        return (
                          <FilmRow key={category} label={category} items={catItems} />
                        );
                      })}
                    </div>

                    <div
                      className="my-8 h-[1px] w-full sm:my-12"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent 0%, hsl(var(--border)) 50%, transparent 100%)',
                      }}
                    />

                    <div className="pb-20 sm:pb-28">
                      <AllFilmsGrid items={filteredItems} />
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="pb-20 sm:pb-28 pt-8"
                  >
                    <AllFilmsGrid items={filteredItems} />
                  </motion.div>
                </AnimatePresence>
              )}
            </>
          )}
        </Container>

        {/* ── PROCESS / STRATEGY SECTION ── */}
        <ProcessSection />

        {/* ── BOTTOM CTA ── */}
        <div className="border-t border-border/60 bg-background py-20 sm:py-28">
          <Container>
            <div className="text-center">
              <span className="mb-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-cinematic-orange/80">
                <span className="h-[1px] w-6 bg-cinematic-orange/40" />
                Ready to create?
              </span>
              <h2 className="mx-auto max-w-2xl font-heading text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-foreground">
                Let&rsquo;s tell your{' '}
                <span className="text-gradient-warm italic">story</span>
              </h2>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/contact"
                  className="inline-flex h-14 items-center gap-2 rounded-full border border-cinematic-orange/30 bg-cinematic-orange/10 px-8 text-[11px] font-medium uppercase tracking-[0.2em] text-cinematic-orange transition-all duration-500 hover:bg-cinematic-orange hover:text-white"
                >
                  Enquire Now
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </main>
  );
}
