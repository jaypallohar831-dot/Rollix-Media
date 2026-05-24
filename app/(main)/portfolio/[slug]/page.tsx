'use client';

import { useParams } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { VideoPlayer } from '@/components/video-player';
import { FilmCard } from '@/components/film-card';
import {
  getPortfolioItem as getFallbackItem,
  getAdjacentItems as getFallbackAdjacent,
  PORTFOLIO_ITEMS as fallbackItems,
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
  Loader2
} from 'lucide-react';
import { portfolioService } from '@/services/portfolio.service';

export default function FilmDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedItems, setRelatedItems] = useState<PortfolioItem[]>([]);

useEffect(() => {
    async function loadProject() {
      try {
        const res = await portfolioService.getProjectBySlug(slug);
        if (res) {
          const data = res;
          const fallback = getFallbackItem(slug);
          const mapped: PortfolioItem = {
            id: data.slug,
            title: data.title,
            category: data.categories?.title || 'Uncategorized',
            tagline: data.seo_title || data.title,
            description: data.description,
            year: new Date(data.created_at).getFullYear().toString(),
            month: data.month,
            image: data.thumbnail || fallback?.image || '/assets/portfolio/wedding.png',
            mediaType: (data.video_url || fallback?.videoUrl ? 'video' : 'image') as 'video' | 'image',
            videoUrl: data.video_url || fallback?.videoUrl || undefined,
            tags: data.tags || fallback?.tags || [],
            location: data.location || 'India',
            client: data.client || fallback?.client,
            duration: data.duration || fallback?.duration,
            crew: data.crew || fallback?.crew || [],
            gallery: (data.gallery_images || []).map(img => ({ type: 'image' as const, src: img, alt: '' }))
          };
          setItem(mapped);
        } else {
          setItem(getFallbackItem(slug) || null);
        }

        const allProjects = await portfolioService.getProjects();
        if (allProjects && allProjects.length > 0) {
           const mappedRelated = allProjects
              .filter((p) => p.slug !== slug)
              .sort(() => 0.5 - Math.random())
              .slice(0, 3)
              .map((p) => ({
                id: p.slug,
                title: p.title,
                category: p.categories?.title || 'Uncategorized',
                tagline: p.seo_title || p.title,
                description: p.description,
                image: p.thumbnail || '/assets/portfolio/wedding.png',
                year: new Date(p.created_at).getFullYear().toString(),
                mediaType: (p.video_url ? 'video' : 'image') as 'video' | 'image',
                videoUrl: p.video_url || undefined,
                tags: p.tags || []
              }));
           setRelatedItems(mappedRelated);
        } else {
           setRelatedItems(fallbackItems.filter(p => p.id !== slug).slice(0, 3));
        }

      } catch (err) {
        console.error('Failed to load project:', err);
        setItem(getFallbackItem(slug) || null);
        setRelatedItems(fallbackItems.filter(p => p.id !== slug).slice(0, 3));
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [slug]);

  const adjacent = useMemo(() => {
    // This part is tricky because it depends on the full list. 
    // For now, we'll use fallbacks or a simplified logic.
    return getFallbackAdjacent(slug);
  }, [slug]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030303]">
        <Loader2 className="h-10 w-10 animate-spin text-cinematic-orange/50" />
      </main>
    );
  }

  if (!item) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030303]">
        <Container>
          <div className="text-center">
            <h1 className="font-heading text-3xl text-foreground">
              Film Not Found
            </h1>
            <p className="mt-3 text-muted-foreground/50">
              The project you&rsquo;re looking for doesn&rsquo;t exist.
            </p>
            <Link
              href="/portfolio"
              className="mt-6 inline-flex items-center gap-2 text-sm text-cinematic-orange transition-colors hover:text-cinematic-orange/80"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Films
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  const isVideo = item.mediaType === 'video';

  return (
    <main className="relative min-h-screen bg-[#030303]">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 50% 20%, rgba(212,118,60,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 pt-24 sm:pt-28">
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
              className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/90 transition-colors hover:text-cinematic-orange"
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
            className="mb-10 sm:mb-14"
          >
            {isVideo && item.videoUrl ? (
              <VideoPlayer
                src={item.videoUrl}
                poster={item.image}
                aspect="aspect-video"
                objectFit="contain"
                className="w-full"
              />
            ) : (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl sm:rounded-3xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority
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
                <div className="mb-4 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/90">
                  <span>
                    {item.month ? `${item.month} ${item.year}` : item.year}
                  </span>
                  {item.location && (
                    <>
                      <span className="text-cinematic-orange/90">►</span>
                      <span>{item.location}</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h1 className="font-heading text-4xl font-normal tracking-[0.01em] text-foreground sm:text-5xl lg:text-6xl">
                  {item.title}
                </h1>

                {/* Category tag */}
                <div className="mt-4">
                  <span className="inline-flex rounded-full border border-cinematic-orange/20 bg-cinematic-orange/5 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-cinematic-orange/80">
                    {item.category}
                  </span>
                </div>

                {/* Description */}
                {item.description && (
                  <p className="mt-8 max-w-[600px] text-base leading-[1.8] text-foreground sm:text-lg sm:leading-[1.9]">
                    {item.description}
                  </p>
                )}

                {/* Tags */}
                {item.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.2] bg-white/[0.08] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-foreground/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right — Project Details Card */}
              <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-6 sm:p-8">
                <h3 className="mb-6 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/90">
                  Project Details
                </h3>

                <div className="space-y-5">
                  {item.client && (
                    <div className="flex items-start gap-3">
                      <User className="mt-0.5 h-4 w-4 text-cinematic-orange" />
                      <div>
                        <span className="block text-[10px] uppercase tracking-[0.15em] text-foreground/70">
                          Client
                        </span>
                        <span className="text-sm text-foreground">
                          {item.client}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-4 w-4 text-cinematic-orange" />
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.15em] text-foreground/70">
                        Date
                      </span>
                      <span className="text-sm text-foreground">
                        {item.month} {item.year}
                      </span>
                    </div>
                  </div>

                  {item.location && (
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 text-cinematic-orange" />
                      <div>
                        <span className="block text-[10px] uppercase tracking-[0.15em] text-foreground/70">
                          Location
                        </span>
                        <span className="text-sm text-foreground">
                          {item.location}
                        </span>
                      </div>
                    </div>
                  )}

                  {item.duration && (
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-4 w-4 text-cinematic-orange" />
                      <div>
                        <span className="block text-[10px] uppercase tracking-[0.15em] text-foreground/70">
                          Duration
                        </span>
                        <span className="text-sm text-foreground">
                          {item.duration}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Play className="mt-0.5 h-4 w-4 text-cinematic-orange" />
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.15em] text-foreground/70">
                        Type
                      </span>
                      <span className="text-sm text-foreground">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── CREW / AUTHOR SECTION ── */}
{item.crew && item.crew.length > 0 && (
                   <div className="mt-8 border-t border-white/[0.1] pt-8">
                     <h3 className="mb-6 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/90">
                       Crew & Authors
                     </h3>
                     <div className="space-y-4">
                       {item.crew.map((member, idx) => (
                         <div key={idx} className="flex flex-col">
                           <span className="text-[10px] uppercase tracking-[0.15em] text-foreground/70">
                             {member.role}
                           </span>
                           <span className="text-sm text-foreground">
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
                  className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-full border border-cinematic-orange/30 bg-cinematic-orange/10 text-[11px] font-medium uppercase tracking-[0.2em] text-cinematic-orange transition-all duration-500 hover:bg-cinematic-orange hover:text-white"
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
             <h3 className="mb-6 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/90 sm:mb-8">
               Project Gallery
             </h3>

             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
               {item.gallery
                 .filter((g) => g.type === 'image')
                 .map((g, i) => (
                   <div
                     key={i}
                     className="relative aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl"
                   >
                     <Image
                       src={g.src}
                       alt={g.alt || item.title}
                       fill
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
          <div
            className="mb-16 h-[1px] w-full sm:mb-20"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
            }}
          />

          <div className="mb-16 grid grid-cols-2 gap-4 sm:mb-20 sm:gap-6">
            {/* Previous */}
            <div>
              {adjacent.prev ? (
                <Link
                  href={`/portfolio/${adjacent.prev.id}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/[0.12] sm:p-5"
                >
                  <ChevronLeft className="h-5 w-5 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-cinematic-orange" />
                  <div className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-[0.15em] text-foreground/70">
                      Previous
                    </span>
                    <span className="block truncate font-heading text-sm text-foreground transition-colors group-hover:text-cinematic-orange sm:text-base">
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
                  className="group flex items-center justify-end gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-right transition-all duration-300 hover:border-white/[0.12] sm:p-5"
                >
                  <div className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-[0.15em] text-foreground/70">
                      Next
                    </span>
                    <span className="block truncate font-heading text-sm text-foreground transition-colors group-hover:text-cinematic-orange sm:text-base">
                      {adjacent.next.title}
                    </span>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-cinematic-orange" />
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
              <h3 className="font-heading text-xl font-normal uppercase tracking-[0.08em] text-foreground sm:text-2xl">
                More Films
              </h3>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/90 transition-colors hover:text-cinematic-orange"
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
