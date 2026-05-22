'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import { fadeUp } from '@/animations/variants';
import type { LucideIcon } from 'lucide-react';

import Link from 'next/link';

interface ServiceCardProps {
  index: string;
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Grid placement class */
  className?: string;
  /** Whether this is the featured (large) card */
  featured?: boolean;
}

/*
 * Performance changes vs. original:
 * 1. Replaced `transition-all` (was on 4 elements) with specific properties.
 *    transition-all causes the browser to check every animatable CSS property.
 * 2. Memoized to prevent re-renders when parent stagger container updates.
 * 3. Simplified hover glow — single border-color change instead of
 *    radial-gradient opacity + top-edge gradient opacity + base transition.
 */

export const ServiceCard = memo(function ServiceCard({
  index,
  slug,
  title,
  description,
  icon: Icon,
  className,
  featured = false,
}: ServiceCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ 
        y: -5,
        rotateX: 2,
        rotateY: -2,
        transition: { duration: 0.4, ease: 'easeOut' } 
      }}
      className={cn(
        'group relative flex cursor-pointer overflow-hidden rounded-2xl border transition-[border-color,background-color] duration-500 [transform-style:preserve-3d] [perspective:1000px]',
        // Base glass surface
        'border-white/[0.06] bg-white/[0.015]',
        // Hover state
        'hover:border-white/[0.12] hover:bg-white/[0.03]',
        // Layout
        featured
          ? 'flex-col justify-between p-8 sm:p-10 lg:p-12'
          : 'flex-col justify-between p-6 sm:p-8',
        className
      )}
    >
      <a href={`/#portfolio-${slug}`} className="absolute inset-0 z-20" onClick={(e) => {
        e.preventDefault();
        if (typeof window !== 'undefined') {
          if (window.location.pathname === '/') {
            // Same page jump
            const el = document.getElementById(`portfolio-${slug}`);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
              window.history.pushState(null, '', `/#portfolio-${slug}`);
            } else {
              window.location.hash = `#portfolio-${slug}`;
            }
          } else {
            // Cross page jump: assign guarantees browser handles the hash jump natively
            window.location.assign(`/#portfolio-${slug}`);
          }
        }
      }}>
        <span className="sr-only">View {title}</span>
      </a>

      {/* Ambient hover glow — very subtle warm glow on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
        style={{
          background: featured
            ? 'radial-gradient(ellipse 60% 60% at 30% 70%, rgba(212,118,60,0.06) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 70% 70% at 50% 100%, rgba(212,118,60,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Top edge gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(212,118,60,0.2) 50%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 pointer-events-none">
        {/* Header: index + icon */}
        <div className="mb-6 flex items-start justify-between sm:mb-8">
          <span className="text-[11px] font-medium tracking-[0.2em] text-cinematic-orange/80 transition-colors duration-500 group-hover:text-cinematic-orange">
            {index}
          </span>
          <Icon
            className={cn(
              'text-white/[0.2] transition-colors duration-500 group-hover:text-cinematic-orange/60',
              featured ? 'h-8 w-8 sm:h-10 sm:w-10' : 'h-6 w-6 sm:h-7 sm:w-7'
            )}
            strokeWidth={1}
          />
        </div>

        {/* Title */}
        <h3
          className={cn(
            'font-heading font-light tracking-[-0.01em] text-foreground transition-colors duration-500',
            featured
              ? 'text-2xl sm:text-3xl lg:text-[2.25rem]'
              : 'text-xl sm:text-2xl'
          )}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={cn(
            'mt-3 leading-relaxed text-foreground/80 transition-colors duration-500 group-hover:text-foreground sm:mt-4',
            featured
              ? 'max-w-[380px] text-[15px] sm:text-base'
              : 'text-[13px] sm:text-[14px]'
          )}
        >
          {description}
        </p>
      </div>

      {/* Footer: directional arrow */}
      <div className="relative z-10 mt-8 flex items-center justify-between sm:mt-10 pointer-events-none">
        <div className="h-[1px] flex-1 bg-white/[0.08] transition-colors duration-500 group-hover:bg-white/[0.15]" />
        <div className="ml-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.15] transition-[border-color,background-color] duration-500 group-hover:border-cinematic-orange/60 group-hover:bg-cinematic-orange/10 sm:h-9 sm:w-9">
          <ArrowUpRight className="h-3.5 w-3.5 text-foreground/70 transition-[color,transform] duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cinematic-orange sm:h-4 sm:w-4" />
        </div>
      </div>
    </motion.div>
  );
});
