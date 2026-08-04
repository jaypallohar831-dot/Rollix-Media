'use client';

import { memo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn, getOptimizedVideoUrl } from '@/lib/utils';
import { Play, Sparkles } from 'lucide-react';
import type { PortfolioItem } from '@/lib/portfolio';

interface FilmCardProps {
  item: PortfolioItem;
  /** Size variant */
  size?: 'default' | 'large' | 'hero';
  className?: string;
  href?: string;
  priority?: boolean;
  /** Whether title should highlight orange on hover */
  highlightOnHover?: boolean;
  /** Callback to trigger Strategy Modal */
  onOpenStrategy?: (item: PortfolioItem) => void;
}

const aspectMap = {
  default: 'aspect-[4/3]',
  large: 'aspect-[16/10]',
  hero: 'aspect-[16/9] sm:aspect-[2.2/1]',
} as const;

export const FilmCard = memo(function FilmCard({
  item,
  size = 'default',
  className,
  href,
  priority = false,
  highlightOnHover = true,
  onOpenStrategy,
}: FilmCardProps) {
  const isVideo = item.mediaType === 'video';
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      className={cn(
        'group relative block transition-transform duration-400 ease-out hover:-translate-y-2 hover:scale-[1.01]',
        className
      )}
    >
      <Link
        href={href ?? `/portfolio/${item.id}`}
        className="block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* ── THUMBNAIL ── */}
        <div
          className={cn(
            'relative overflow-hidden rounded-2xl bg-muted',
            aspectMap[size]
          )}
        >
          <Image
            src={item.image}
            alt={`${item.title} — ${item.category} project by Rollix Media`}
            fill
            unoptimized={item.image.startsWith('http')}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            priority={priority}
          />
          {isVideo && item.videoUrl && (
            <video
              ref={videoRef}
              src={getOptimizedVideoUrl(item.videoUrl, true)}
              preload="none"
              muted
              loop
              playsInline
              className="absolute inset-0 z-10 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] opacity-0 group-hover:opacity-100"
              onError={(e) => console.error("Video failed to load:", item.videoUrl, e)}
            >
              <track kind="captions" srcLang="en" label="No captions available" />
            </video>
          )}

          {/* Hover dim */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />

          {/* Center play button (video projects) */}
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-0">
              <div
                className={cn(
                  'flex items-center justify-center rounded-full bg-white/90 text-foreground shadow-[0_4px_24px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover:scale-110',
                  size === 'hero'
                    ? 'h-18 w-18 sm:h-22 sm:w-22'
                    : size === 'large'
                      ? 'h-14 w-14 sm:h-16 sm:w-16'
                      : 'h-12 w-12 sm:h-14 sm:w-14'
                )}
              >
                <Play
                  className={cn(
                    'ml-0.5',
                    size === 'hero'
                      ? 'h-7 w-7 sm:h-8 sm:w-8'
                      : 'h-5 w-5 sm:h-6 sm:w-6'
                  )}
                  fill="currentColor"
                />
              </div>
            </div>
          )}

          {/* Duration badge */}
          {item.duration && (
            <div className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-0.5 text-[10px] font-medium tracking-wide text-white">
              {item.duration}
            </div>
          )}

          {/* Category Tag Overlay */}
          <div className="absolute top-3 left-3">
            <span className="rounded-full border border-white/30 bg-black/40 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              {item.category}
            </span>
          </div>
        </div>
      </Link>

      {/* ── METADATA ROW & STRATEGY TRIGGER ── */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          <span>{item.month ? `${item.month} ${item.year}` : item.year}</span>
          {item.location && (
            <>
              <span className="text-cinematic-orange">►</span>
              <span>{item.location}</span>
            </>
          )}
        </div>

        {/* Behind the Strategy Pill Button */}
        {onOpenStrategy && item.strategy && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenStrategy(item);
            }}
            className="inline-flex items-center gap-1 rounded-full border border-cinematic-orange/40 bg-cinematic-orange/10 px-2.5 py-0.5 text-[10px] font-bold text-cinematic-orange hover:bg-cinematic-orange hover:text-white transition-all shadow-2xs"
          >
            <Sparkles className="h-3 w-3" />
            <span>Behind Strategy</span>
          </button>
        )}
      </div>

      {/* ── TITLE ── */}
      <Link href={href ?? `/portfolio/${item.id}`} className="block">
        <h3
          className={cn(
            'mt-1.5 py-0.5 leading-normal font-heading font-normal tracking-[0.02em] text-foreground transition-colors duration-300',
            highlightOnHover && 'group-hover:text-cinematic-orange',
            size === 'hero'
              ? 'text-2xl sm:text-4xl'
              : size === 'large'
                ? 'text-xl sm:text-2xl'
                : 'text-lg sm:text-xl'
          )}
        >
          {item.title}
        </h3>
      </Link>

      {/* ── TAGS ── */}
      {item.tags && item.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-white shadow-2xs px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
});
