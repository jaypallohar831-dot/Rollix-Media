'use client';

import { memo, useRef } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { cn, getOptimizedVideoUrl } from '@/lib/utils';
import { Play } from 'lucide-react';
import type { PortfolioItem } from '@/lib/portfolio';

/**
 * TWF-inspired Film Card
 * Layout: rounded thumbnail with centered play overlay →
 *         metadata row (DATE ► LOCATION) →
 *         large serif title →
 *         optional tag pills
 *
 * Used on the Portfolio page in horizontal scroll rows
 * and the grid layout.
 */

interface FilmCardProps {
  item: PortfolioItem;
  /** Size variant */
  size?: 'default' | 'large' | 'hero';
  className?: string;
  href?: string;
  priority?: boolean;
  /** Whether title should highlight orange on hover (TWF style) */
  highlightOnHover?: boolean;
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
      className={cn('group block transition-transform duration-400 ease-out hover:-translate-y-2 hover:scale-[1.01]', className)}
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
          alt={item.title}
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
            preload="metadata"
            muted
            loop
            playsInline
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.includes('/assets/loader-bg.mp4')) {
                target.src = '/assets/loader-bg.mp4';
              }
            }}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] opacity-0 group-hover:opacity-100"
          />
        )}
        {/* Very subtle overlay for contrast if needed */}
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />

        {/* Hover dim */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

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

        {/* Duration badge — bottom-right */}
        {item.duration && (
          <div className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-0.5 text-[10px] font-medium tracking-wide text-white">
            {item.duration}
          </div>
        )}
      </div>

      {/* ── METADATA ROW ── */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        <span>{item.month ? `${item.month} ${item.year}` : item.year}</span>
        {item.location && (
          <>
            <span className="text-cinematic-orange">►</span>
            <span>{item.location}</span>
          </>
        )}
      </div>

      {/* ── TITLE ── */}
      <h3
        className={cn(
          'mt-1.5 py-1 leading-normal font-heading font-normal tracking-[0.02em] text-foreground transition-colors duration-300',
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

      {/* ── TAGS ── */}
      {item.tags && item.tags.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-white shadow-sm px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
    </div>
  );
});
