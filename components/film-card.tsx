'use client';

import { memo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
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
    <Link
      href={`/portfolio/${item.id}`}
      className={cn('group block', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── THUMBNAIL ── */}
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl bg-[#111]',
          aspectMap[size]
        )}
      >
        {isVideo && item.videoUrl ? (
          <video
            ref={videoRef}
            src={`${item.videoUrl}#t=1.0`}
            preload="auto"
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04]"
          />
        ) : (
          <Image
            src={item.image}
            alt={`${item.title} — ${item.category}`}
            fill
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04]"
            sizes={
              size === 'hero'
                ? '100vw'
                : size === 'large'
                  ? '(max-width: 768px) 100vw, 50vw'
                  : '(max-width: 768px) 100vw, 33vw'
            }
            quality={80}
          />
        )}

        {/* Dark gradient overlay — stronger at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Hover dim */}
        <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />

        {/* Center play button (video projects) */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-0">
            <div
              className={cn(
                'flex items-center justify-center rounded-full bg-black/40 text-white/80 ring-1 ring-white/20 backdrop-blur-[2px] transition-all duration-500 group-hover:scale-110 group-hover:bg-black/50 group-hover:text-white group-hover:ring-white/30',
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
      <div className="mt-4 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/90">
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
          'mt-1.5 font-heading font-normal tracking-[0.02em] text-foreground transition-colors duration-300',
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
              className="rounded-full border border-white/[0.2] bg-white/[0.08] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.15em] text-foreground/90"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
});
