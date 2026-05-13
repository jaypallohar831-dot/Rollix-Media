'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { FilmCard } from '@/components/film-card';
import { getFeaturedItems, getItemsByGroup, PORTFOLIO_ITEMS, type PortfolioItem } from '@/lib/portfolio';
import { staggerContainer, fadeUp, fadeIn } from '@/animations/variants';
import { ArrowRight, Play, Loader2 } from 'lucide-react';
import { portfolioService } from '@/services/portfolio.service';

export function PortfolioSection() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await portfolioService.getProjects();
        if (data && data.length > 0) {
          // Map DB data to PortfolioItem type
          const mappedItems: PortfolioItem[] = data.map((item: any) => ({
            id: item.slug,
            title: item.title,
            category: (item.categories as any)?.title || 'Uncategorized',
            tagline: item.seo_title || item.title,
            description: item.description,
            year: new Date(item.created_at).getFullYear().toString(),
            image: item.thumbnail || '/assets/portfolio/wedding.png',
            mediaType: item.video_url ? 'video' : 'image',
            videoUrl: item.video_url || undefined,
            tags: item.tags || [],
            featured: item.featured,
            group: item.featured ? 'featured' : 'trending'
          }));
          setItems(mappedItems);
        } else {
          // Fallback to hardcoded items if DB is empty
          setItems(PORTFOLIO_ITEMS);
        }
      } catch (err) {
        console.error('Failed to fetch portfolio:', err);
        setItems(PORTFOLIO_ITEMS);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const featuredItems = useMemo(() => items.filter(i => i.featured).slice(0, 2), [items]);
  const trendingItems = useMemo(() => items.filter(i => !i.featured).slice(0, 6), [items]);

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-[#030303] py-28 sm:py-36 lg:py-44"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/3 rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgba(212,118,60,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      <Container size="wide" className="relative z-10">
        {/* SECTION HEADER */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-10%' }}
          className="mb-14 sm:mb-18 lg:mb-20"
        >
          <motion.div variants={fadeIn} className="mb-5 sm:mb-6">
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-cinematic-orange/80">
              <span className="h-[1px] w-6 bg-cinematic-orange/40" />
              Featured Films
            </span>
          </motion.div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <motion.h2
              variants={fadeUp}
              className="font-heading text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1] tracking-[-0.02em] text-foreground"
            >
              Indian Wedding{' '}
              <span className="text-gradient-warm italic">Cinema</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="max-w-[380px] text-base leading-relaxed text-muted-foreground/60 lg:text-right"
            >
              A curated archive of authentic emotions, cinematic grandeur, and timeless Indian visual stories.
            </motion.p>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-cinematic-orange/50" />
          </div>
        ) : (
          <>
            {/* FEATURED HERO CARDS */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-5%' }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10"
            >
              {featuredItems.map((item, index) => (
                <motion.div key={item.id} variants={fadeUp}>
                  <FilmCard 
                    item={item} 
                    size="large" 
                    priority={index === 0} 
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* HORIZONTAL REEL (Trending) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8 }}
              className="mt-20 sm:mt-28"
            >
              <div className="mb-8 flex items-center justify-between sm:mb-10">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08]">
                    <Play className="h-3 w-3 text-cinematic-orange/60" strokeWidth={2} fill="currentColor" />
                  </div>
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/50">
                    Trending Reels
                  </span>
                </div>
                <div
                  className="hidden h-[1px] flex-1 mx-6 sm:block"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(255,255,255,0.06) 0%, transparent 100%)',
                  }}
                />
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground/40 transition-colors hover:text-cinematic-orange"
                >
                  View All <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin sm:gap-5">
                {trendingItems.map((item) => (
                  <div
                    key={item.id}
                    className="w-[280px] flex-shrink-0 sm:w-[340px] lg:w-[400px]"
                  >
                    <FilmCard item={item} size="default" />
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {/* SECTION CLOSER — Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 sm:mt-28"
        >
          <div
            className="mb-12 h-[1px] w-full sm:mb-16"
            style={{
              background:
                'linear-gradient(90deg, rgba(212,118,60,0.15) 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
            }}
          />

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-12">
            {[
              { value: '150+', label: 'Projects Delivered' },
              { value: '40+', label: 'Wedding Films' },
              { value: '25+', label: 'Brand Campaigns' },
              { value: '98%', label: 'Client Satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="block font-heading text-3xl font-light tracking-[-0.02em] text-foreground sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/40">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
