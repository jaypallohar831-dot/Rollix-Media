'use client';

import { memo, useRef, useState } from 'react';
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
  /** Whether title should highlight violet on hover */
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
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [imgSrc, setImgSrc] = useState<string>(
    item.image && item.image.trim() !== '' ? item.image : '/assets/portfolio/motion.webp'
  );

  const handleMouseEnter = () => {
    if (isVideo && item.videoUrl) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovered(true);
      }, 200);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(false);
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      className={cn(
        'group relative block rounded-2xl transition-transform duration-300 ease-out hover:-translate-y-1.5',
        className
      )}
    >
      <Link
        href={href ?? `/portfolio/${item.id}`}
        className="block focus:outline-none focus:ring-2 focus:ring-[#A855F7] focus:ring-offset-2 focus:ring-offset-[#0A0614] rounded-2xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* ── THUMBNAIL ── */}
        <div
          className={cn(
            'relative overflow-hidden rounded-2xl border border-[#7C3AED]/20 bg-[#1A0F33] transition-colors duration-300 group-hover:border-[#A855F7]/50',
            aspectMap[size]
          )}
        >
          <Image
            src={imgSrc}
            alt={`${item.title} — ${item.category} project by Ampledia`}
            fill
            unoptimized={imgSrc.startsWith('http')}
            onError={() => setImgSrc('/assets/portfolio/motion.webp')}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority={priority}
          />
          {isVideo && isHovered && item.videoUrl && (
            <video
              ref={videoRef}
              src={getOptimizedVideoUrl(item.videoUrl, true)}
              autoPlay
              preload="none"
              muted
              loop
              playsInline
              className="absolute inset-0 z-10 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 opacity-100"
              onError={(e) => console.error("Video failed to load:", item.videoUrl, e)}
            >
              <track kind="captions" srcLang="en" label="No captions available" />
            </video>
          )}

          {/* Hover dim */}
          <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-transparent" />

          {/* Center play button (video projects) */}
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
              <div
                className={cn(
                  'flex items-center justify-center rounded-full bg-[#7C3AED]/90 text-white shadow-lg shadow-[#7C3AED]/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110',
                  size === 'hero'
                    ? 'h-16 w-16 sm:h-20 sm:w-20'
                    : size === 'large'
                      ? 'h-12 w-12 sm:h-14 sm:w-14'
                      : 'h-10 w-10 sm:h-12 sm:w-12'
                )}
              >
                <Play
                  className={cn(
                    'ml-0.5',
                    size === 'hero'
                      ? 'h-6 w-6 sm:h-8 sm:w-8'
                      : 'h-4 w-4 sm:h-5 sm:w-5'
                  )}
                  fill="currentColor"
                />
              </div>
            </div>
          )}

          {/* Duration badge */}
          {item.duration && (
            <div className="absolute bottom-3 right-3 rounded-md bg-[#0A0614]/80 px-2 py-0.5 text-[10px] font-medium tracking-wide text-white backdrop-blur-sm">
              {item.duration}
            </div>
          )}

          {/* Category Tag Overlay */}
          <div className="absolute top-3 left-3">
            <span className="rounded-full border border-[#7C3AED]/30 bg-[#0A0614]/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#DDD6FE] backdrop-blur-md">
              {item.category}
            </span>
          </div>
        </div>
      </Link>

      {/* ── METADATA ROW & STRATEGY TRIGGER ── */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white">
          <span>{item.month ? `${item.month} ${item.year}` : item.year}</span>
          {item.location && (
            <>
              <span className="text-[#A855F7]">►</span>
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
            className="inline-flex items-center gap-1 rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#DDD6FE] hover:bg-[#7C3AED] hover:text-white transition-all shadow-xs"
          >
            <Sparkles className="h-3 w-3 text-[#A855F7]" />
            <span>Behind Strategy</span>
          </button>
        )}
      </div>

      {/* ── TITLE ── */}
      <Link href={href ?? `/portfolio/${item.id}`} className="block">
        <h3
          className={cn(
            'mt-1.5 py-0.5 font-heading font-bold tracking-tight text-white transition-colors duration-300',
            highlightOnHover && 'group-hover:text-[#A855F7]',
            size === 'hero'
              ? 'text-2xl sm:text-3xl'
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
              className="rounded-full border border-[#7C3AED]/20 bg-[#1A0F33]/80 px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.12em] text-[#C4B5FD]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
});
