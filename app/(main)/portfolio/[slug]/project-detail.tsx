'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { VideoPlayer } from '@/components/video-player';
import { FilmCard } from '@/components/film-card';
import {
  getAdjacentItems as getFallbackAdjacent,
  type PortfolioItem,
  type Deliverable
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
  Video,
  ImageIcon,
  File
} from 'lucide-react';

interface Props {
  item: PortfolioItem;
  relatedItems: PortfolioItem[];
  slug: string;
}

export function ProjectDetail({ item, relatedItems, slug }: Props) {
  const adjacent = useMemo(() => getFallbackAdjacent(slug), [slug]);
  const deliverables: Deliverable[] = item.deliverables && item.deliverables.length > 0
    ? item.deliverables 
    : [];

  // Legacy fallback for old items without deliverables
  if (deliverables.length === 0 && item.videoUrl) {
    deliverables.push({ id: 'legacy-vid', title: item.title, type: 'video', url: item.videoUrl });
  }

  const imagesOnly = deliverables.filter(d => d.type === 'image');
  const otherMedia = deliverables.filter(d => d.type !== 'image');

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(ellipse 50% 40% at 50% 15%, rgba(199, 123, 67, 0.08) 0%, transparent 70%)',
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
            className="mb-8 flex items-center justify-between"
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500 transition-colors hover:text-cinematic-orange"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Portfolio
            </Link>
          </motion.div>

          {/* ── PROJECT TITLE & HERO OVERVIEW ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 sm:mb-16"
          >
            <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">
              <span>{item.client || item.title}</span>
              {item.location && (
                <>
                  <span className="text-cinematic-orange">►</span>
                  <span>{item.location}</span>
                </>
              )}
            </div>

            <h1 className="font-heading text-4xl font-normal tracking-[0.01em] text-stone-900 sm:text-5xl lg:text-6xl max-w-4xl">
              {item.title}
            </h1>
            
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex rounded-full border border-cinematic-orange/30 bg-cinematic-orange/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cinematic-orange">
                {item.category}
              </span>
              {item.tags?.map((tag) => (
                <span key={tag} className="rounded-full border border-stone-200 bg-stone-100 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-700">
                  {tag}
                </span>
              ))}
            </div>

            {item.description && (
              <p className="mt-8 max-w-[800px] text-base leading-[1.8] text-stone-700 sm:text-lg sm:leading-[1.9] font-light">
                {item.description}
              </p>
            )}
          </motion.div>

          {/* ── STRATEGY SECTION ── */}
          {item.strategy && (item.strategy.objective || (item.strategy.approach && item.strategy.approach.length > 0)) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 sm:mb-20 rounded-3xl bg-stone-50 border border-stone-200 p-8 sm:p-12 shadow-inner"
            >
              <h3 className="mb-8 font-heading text-2xl font-light text-stone-900">Behind the Strategy</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  {item.strategy.objective && (
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-cinematic-orange mb-3">Objective</h4>
                      <p className="text-sm leading-relaxed text-stone-700">{item.strategy.objective}</p>
                    </div>
                  )}
                  {item.strategy.approach && item.strategy.approach.length > 0 && (
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-cinematic-orange mb-3">Our Approach</h4>
                      <ul className="space-y-3">
                        {item.strategy.approach.map((ap, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-stone-700">
                            <span className="text-cinematic-orange font-bold mt-1">✓</span>
                            <span>{ap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="space-y-8">
                  {item.strategy.results && item.strategy.results.length > 0 && (
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-cinematic-orange mb-3">Impact & Results</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {item.strategy.results.map((res, i) => (
                          <div key={i} className="rounded-xl bg-white border border-stone-200 p-4 shadow-sm">
                            <span className="text-sm font-semibold text-stone-900">{res}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {item.strategy.tools && item.strategy.tools.length > 0 && (
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-cinematic-orange mb-3">Tools & Tech</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.strategy.tools.map((t, i) => (
                          <span key={i} className="px-3 py-1 bg-white border border-stone-200 text-[10px] font-bold tracking-wider text-stone-600 rounded-full">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── DELIVERABLES GRID (Videos & Documents) ── */}
          {otherMedia.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              className="mb-16 sm:mb-20"
            >
              <h3 className="mb-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-900 sm:mb-8">
                <Video className="h-4 w-4 text-cinematic-orange" />
                Video & Document Deliverables
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                {otherMedia.map((media, idx) => (
                  <div key={media.id} className="w-full flex flex-col gap-2">
                    {media.type === 'video' ? (
                      <div className="relative overflow-hidden rounded-xl border border-stone-200 shadow-sm bg-black" style={{ aspectRatio: '4/5' }}>
                        <VideoPlayer
                          src={media.url}
                          aspect="aspect-auto"
                          objectFit="cover"
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>
                    ) : (
                      <a href={media.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-full min-h-[180px] rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 transition-colors">
                        <div className="flex flex-col items-center gap-2 text-center p-3">
                          <File className="h-6 w-6 text-cinematic-orange" />
                          <span className="text-xs font-bold uppercase tracking-widest text-stone-500">View</span>
                        </div>
                      </a>
                    )}
                    {media.title && (
                      <span className="text-[10px] font-semibold text-stone-600 text-center uppercase tracking-wider line-clamp-1">{media.title}</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── IMAGES GRID ── */}
          {imagesOnly.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 sm:mb-20"
            >
              <h3 className="mb-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-900 sm:mb-8">
                <ImageIcon className="h-4 w-4 text-cinematic-orange" />
                Graphic & Image Deliverables
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                {imagesOnly.map((img, i) => (
                  <div key={img.id} className="flex flex-col gap-2">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-stone-200 shadow-sm bg-stone-100">
                      <Image
                        src={img.url}
                        alt={img.title || item.title}
                        fill
                        unoptimized={img.url.startsWith('http')}
                        className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        quality={80}
                      />
                    </div>
                    {img.title && (
                      <span className="text-[10px] font-semibold text-stone-600 text-center line-clamp-1">{img.title}</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Fallback Legacy Gallery */}
          {item.gallery && item.gallery.length > 0 && deliverables.length === 0 && (
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
                 {item.gallery.map((g, i) => (
                   <div key={i} className="relative aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl border border-stone-200 shadow-sm">
                     <Image src={g.src} alt={g.alt || item.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
                   </div>
                 ))}
               </div>
             </motion.div>
          )}

          {/* ── METADATA ROW ── */}
          <div className="mb-16 sm:mb-20 border-t border-stone-200 pt-10">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {item.client && (
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400 mb-1">Client</span>
                  <span className="text-sm font-semibold text-stone-900">{item.client}</span>
                </div>
              )}
              {item.month && (
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400 mb-1">Date</span>
                  <span className="text-sm font-semibold text-stone-900">{item.month} {item.year}</span>
                </div>
              )}
              {item.duration && (
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400 mb-1">Duration</span>
                  <span className="text-sm font-semibold text-stone-900">{item.duration}</span>
                </div>
              )}
              {item.liveUrl && (
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400 mb-1">Live Links</span>
                  <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-cinematic-orange hover:underline">View Project</a>
                </div>
              )}
            </div>
            
            {item.crew && item.crew.length > 0 && (
              <div className="mt-8 pt-8 border-t border-stone-100 flex flex-wrap gap-x-12 gap-y-6">
                {item.crew.map((member, idx) => (
                  <div key={idx}>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400 mb-1">{member.role}</span>
                    <span className="text-sm font-semibold text-stone-900">{member.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-16 h-[1px] w-full bg-stone-200 sm:mb-20" />

          {/* ── PREV / NEXT NAVIGATION ── */}
          <div className="mb-16 grid grid-cols-2 gap-4 sm:mb-20 sm:gap-6">
            <div>
              {adjacent.prev && (
                <Link
                  href={`/portfolio/${adjacent.prev.id}`}
                  className="group flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-4 transition-all duration-300 hover:border-cinematic-orange hover:shadow-md sm:p-5"
                >
                  <ChevronLeft className="h-5 w-5 shrink-0 text-stone-400 transition-colors group-hover:text-cinematic-orange" />
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">Previous</span>
                    <span className="block truncate font-heading text-sm text-stone-900 transition-colors group-hover:text-cinematic-orange sm:text-base">
                      {adjacent.prev.title}
                    </span>
                  </div>
                </Link>
              )}
            </div>
            <div>
              {adjacent.next && (
                <Link
                  href={`/portfolio/${adjacent.next.id}`}
                  className="group flex items-center justify-end gap-3 rounded-xl border border-stone-200 bg-white p-4 text-right transition-all duration-300 hover:border-cinematic-orange hover:shadow-md sm:p-5"
                >
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">Next</span>
                    <span className="block truncate font-heading text-sm text-stone-900 transition-colors group-hover:text-cinematic-orange sm:text-base">
                      {adjacent.next.title}
                    </span>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-stone-400 transition-colors group-hover:text-cinematic-orange" />
                </Link>
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
                Explore More Brands
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
