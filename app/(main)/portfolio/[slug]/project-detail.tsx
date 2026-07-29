'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { VideoPlayer } from '@/components/video-player';
import { FilmCard } from '@/components/film-card';
import {
  getAdjacentItems as getFallbackAdjacent,
  type PortfolioItem
} from '@/lib/portfolio';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  Clock,
  User,
  Play,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface Props {
  item: PortfolioItem;
  relatedItems: PortfolioItem[];
  slug: string;
}

export function ProjectDetail({ item, relatedItems, slug }: Props) {
  const adjacent = useMemo(() => getFallbackAdjacent(slug), [slug]);
  const isVideo = item.mediaType === 'video';

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 50% 15%, rgba(199, 123, 67, 0.08) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 pt-28 sm:pt-32 pb-20">
        <Container size="wide">
          {/* ── BACK NAV ── */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500 transition-colors hover:text-cinematic-orange"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Films
            </Link>
          </motion.div>

          {/* ── HERO MEDIA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="mx-auto max-w-4xl mb-10 sm:mb-14"
          >
            {isVideo && item.videoUrl ? (
              <VideoPlayer
                src={item.videoUrl}
                poster={item.image}
                aspect="aspect-video"
                objectFit="contain"
                className="w-full shadow-xl rounded-2xl overflow-hidden"
              />
            ) : (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl">
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
              </div>
            )}
          </motion.div>

          {/* ── PROJECT INFO ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-16 sm:mb-20"
          >
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px] lg:gap-16">
              {/* Left — Title & Description */}
              <div>
                {/* Meta */}
                <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">
                  <span>
                    {item.month ? `${item.month} ${item.year}` : item.year}
                  </span>
                  {item.location && (
                    <>
                      <span className="text-cinematic-orange">►</span>
                      <span>{item.location}</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h1 className="font-heading text-4xl font-normal tracking-[0.01em] text-stone-900 sm:text-5xl lg:text-6xl">
                  {item.title}
                </h1>

                {/* Category tag */}
                <div className="mt-4">
                  <span className="inline-flex rounded-full border border-cinematic-orange/30 bg-cinematic-orange/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cinematic-orange">
                    {item.category}
                  </span>
                </div>

                {/* Description */}
                {item.description && (
                  <p className="mt-8 max-w-[600px] text-base leading-[1.8] text-stone-700 sm:text-lg sm:leading-[1.9] font-light">
                    {item.description}
                  </p>
                )}

                {/* Tags */}
                {item.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-stone-200 bg-stone-100 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right — Project Details Card */}
              <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
                <h3 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-900">
                  Project Details
                </h3>

                <div className="space-y-5">
                  {item.client && (
                    <div className="flex items-start gap-3">
                      <User className="mt-0.5 h-4 w-4 text-cinematic-orange" />
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">
                          Client
                        </span>
                        <span className="text-sm font-semibold text-stone-900">
                          {item.client}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-4 w-4 text-cinematic-orange" />
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">
                        Date
                      </span>
                      <span className="text-sm font-semibold text-stone-900">
                        {item.month} {item.year}
                      </span>
                    </div>
                  </div>

                  {item.location && (
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 text-cinematic-orange" />
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">
                          Location
                        </span>
                        <span className="text-sm font-semibold text-stone-900">
                          {item.location}
                        </span>
                      </div>
                    </div>
                  )}

                  {item.duration && (
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-4 w-4 text-cinematic-orange" />
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">
                          Duration
                        </span>
                        <span className="text-sm font-semibold text-stone-900">
                          {item.duration}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Play className="mt-0.5 h-4 w-4 text-cinematic-orange" />
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">
                        Type
                      </span>
                      <span className="text-sm font-semibold text-stone-900">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── CREW / AUTHOR SECTION ── */}
                {item.crew && item.crew.length > 0 && (
                  <div className="mt-8 border-t border-stone-100 pt-8">
                    <h3 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-900">
                      Crew & Authors
                    </h3>
                    <div className="space-y-4">
                      {item.crew.map((member, idx) => (
                        <div key={idx} className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">
                            {member.role}
                          </span>
                          <span className="text-sm font-semibold text-stone-900">
                            {member.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enquire CTA */}
                <Link
                  href="/contact"
                  className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-cinematic-orange text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-md transition-all duration-300 hover:bg-stone-900 hover:shadow-lg"
                >
                  Enquire Now
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* ── PHOTO GALLERY (if multiple gallery items) ── */}
          {item.gallery && item.gallery.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 sm:mb-20"
            >
              <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 sm:mb-8">
                Project Gallery
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                {item.gallery
                  .filter((g) => g.type === 'image')
                  .map((g, i) => (
                    <div
                      key={i}
                      className="relative aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl border border-stone-200 shadow-sm"
                    >
                      <Image
                        src={g.src}
                        alt={g.alt || item.title}
                        fill
                        unoptimized={g.src.startsWith('http')}
                        className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={80}
                      />
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* ── PREV / NEXT NAVIGATION ── */}
          <div className="mb-16 h-[1px] w-full bg-stone-200 sm:mb-20" />

          <div className="mb-16 grid grid-cols-2 gap-4 sm:mb-20 sm:gap-6">
            {/* Previous */}
            <div>
              {adjacent.prev ? (
                <Link
                  href={`/portfolio/${adjacent.prev.id}`}
                  className="group flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-4 transition-all duration-300 hover:border-cinematic-orange hover:shadow-md sm:p-5"
                >
                  <ChevronLeft className="h-5 w-5 shrink-0 text-stone-400 transition-colors group-hover:text-cinematic-orange" />
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">
                      Previous
                    </span>
                    <span className="block truncate font-heading text-sm text-stone-900 transition-colors group-hover:text-cinematic-orange sm:text-base">
                      {adjacent.prev.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Next */}
            <div>
              {adjacent.next ? (
                <Link
                  href={`/portfolio/${adjacent.next.id}`}
                  className="group flex items-center justify-end gap-3 rounded-xl border border-stone-200 bg-white p-4 text-right transition-all duration-300 hover:border-cinematic-orange hover:shadow-md sm:p-5"
                >
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">
                      Next
                    </span>
                    <span className="block truncate font-heading text-sm text-stone-900 transition-colors group-hover:text-cinematic-orange sm:text-base">
                      {adjacent.next.title}
                    </span>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-stone-400 transition-colors group-hover:text-cinematic-orange" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>

          {/* ── MORE FILMS ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="pb-20 sm:pb-28"
          >
            <div className="mb-8 flex items-center justify-between">
              <h3 className="font-heading text-xl font-normal uppercase tracking-[0.08em] text-stone-900 sm:text-2xl">
                More Films
              </h3>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-stone-600 transition-colors hover:text-cinematic-orange"
              >
                View All
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
              {relatedItems.map((r) => (
                <FilmCard key={r.id} item={r} />
              ))}
            </div>
          </motion.div>
        </Container>
      </div>
    </main>
  );
}
