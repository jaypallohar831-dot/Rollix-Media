'use client';

import { memo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn, getOptimizedVideoUrl } from '@/lib/utils';
import { ArrowUpRight, Play } from 'lucide-react';
import type { PortfolioItem } from '@/lib/portfolio';

interface PortfolioCardProps {
  item: PortfolioItem;
  /** Layout size variant */
  size?: 'featured' | 'large' | 'default';
  className?: string;
  /** Priority loading for above-fold images */
  priority?: boolean;
}

const aspectClasses = {
  featured: 'aspect-[16/9] sm:aspect-[2.4/1]',
  large: 'aspect-[16/10] sm:aspect-[16/9]',
  default: 'aspect-[4/3] sm:aspect-[16/10]',
} as const;

export const PortfolioCard = memo(function PortfolioCard({
  item,
  size = 'default',
  className,
  priority = false,
}: PortfolioCardProps) {
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
      className="block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
        <div className={cn("relative overflow-hidden rounded-xl sm:rounded-2xl transition-transform duration-500", aspectClasses[size])}>
          {/* Image with CSS-only hover zoom */}
          <div className="absolute inset-0 overflow-hidden bg-muted">
            <Image
              src={item.image}
              alt={item.title}
              fill
              unoptimized={item.image.startsWith('http')}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-105"
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
              className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out will-change-transform group-hover:scale-105 opacity-0 group-hover:opacity-100"
            />
          )}
          </div>

          {/* Video play indicator — centered, pulsing on hover */}
        {isVideo && (
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <div
              className={cn(
                'flex items-center justify-center rounded-full bg-white/90 text-foreground shadow-[0_4px_24px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover:scale-110',
                size === 'featured'
                  ? 'h-16 w-16 sm:h-20 sm:w-20'
                  : size === 'large'
                    ? 'h-12 w-12 sm:h-16 sm:w-16'
                    : 'h-10 w-10 sm:h-12 sm:w-12'
              )}
            >
              <Play
                className={cn(
                  'ml-0.5',
                  size === 'featured'
                    ? 'h-6 w-6 sm:h-7 sm:w-7'
                    : size === 'large'
                      ? 'h-5 w-5 sm:h-6 sm:w-6'
                      : 'h-4 w-4 sm:h-5 sm:w-5'
                )}
                fill="currentColor"
              />
            </div>
          </div>
        )}

        {/* Top-left category tag — no backdrop-blur for performance */}
        <div className="absolute left-4 top-4 z-10 flex items-center gap-2 sm:left-6 sm:top-6">
          <span
            className={cn(
              'inline-flex items-center rounded-full bg-white/90 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground shadow-sm',
              size === 'featured' && 'sm:px-4 sm:py-2 sm:text-[11px]'
            )}
          >
            {item.category}
          </span>

          {/* Media type badge */}
          {isVideo && (
            <span className="inline-flex items-center gap-1 rounded-full bg-cinematic-orange px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-white shadow-sm">
              <Play className="h-2.5 w-2.5" fill="currentColor" />
              Video
            </span>
          )}
        </div>

        <div className="absolute right-4 top-4 z-10 flex items-center gap-3 sm:right-6 sm:top-6">
          {item.duration && (
            <span className="rounded bg-black/40 px-2 py-0.5 text-[10px] font-medium tracking-[0.15em] text-white backdrop-blur-sm">
              {item.duration}
            </span>
          )}
          <span className="rounded bg-black/40 px-2 py-0.5 text-[10px] font-medium tracking-[0.15em] text-white backdrop-blur-sm">
            {item.year}
          </span>
        </div>
      </div>

      {/* Bottom content — title, tagline, arrow (Moved outside image for light theme) */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          {/* Title */}
          <h3
            className={cn(
              'font-heading font-normal tracking-[0.02em] text-foreground transition-colors duration-500 group-hover:text-cinematic-orange',
              size === 'featured'
                ? 'text-2xl sm:text-3xl'
                : size === 'large'
                  ? 'text-xl sm:text-2xl'
                  : 'text-lg sm:text-xl'
            )}
          >
            {item.title}
          </h3>

          {/* Tagline */}
          <p
            className={cn(
              'mt-1.5 max-w-[400px] text-muted-foreground',
              size === 'featured'
                ? 'text-sm'
                : 'text-xs'
            )}
          >
            {item.tagline}
          </p>
        </div>

        {/* Directional arrow */}
        <div
          className={cn(
            'flex shrink-0 items-center justify-center rounded-full border border-border bg-white shadow-sm transition-[border-color] duration-500 group-hover:border-cinematic-orange',
            size === 'featured'
              ? 'h-10 w-10 sm:h-12 sm:w-12'
              : 'h-8 w-8 sm:h-10 sm:w-10'
          )}
        >
          <ArrowUpRight
            className={cn(
              'text-muted-foreground transition-[color,transform] duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cinematic-orange',
              size === 'featured' ? 'h-5 w-5' : 'h-4 w-4'
            )}
          />
        </div>
      </div>
    </Link>
  );
});
