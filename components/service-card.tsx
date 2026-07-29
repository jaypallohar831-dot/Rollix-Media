'use client';

import { memo } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { toolIconMap } from '@/lib/tool-icons';
import { Wrench } from 'lucide-react';

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
  tools?: { name: string; color: string; icon: string }[];
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
  tools,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        'group relative flex cursor-pointer overflow-hidden rounded-2xl border transition-[border-color,background-color,transform] duration-500',
        // Base solid surface
        'border-border bg-white shadow-sm',
        // Hover state — pure CSS 3D tilt
        'hover:border-cinematic-orange/40 hover:shadow-md hover:-translate-y-1',
        // Layout
        featured
          ? 'flex-col justify-between p-8 sm:p-10 lg:p-12'
          : 'flex-col justify-between p-6 sm:p-8',
        className
      )}
    >
      <Link href={`/services/${slug}`} className="absolute inset-0 z-20">
        <span className="sr-only">View {title}</span>
      </Link>

      {/* Content */}
      <div className="relative z-10 pointer-events-none">
        {/* Header: index + icon */}
        <div className="mb-6 flex items-start justify-between sm:mb-8">
          <span className="text-[11px] font-medium tracking-[0.2em] text-cinematic-orange/80 transition-colors duration-500 group-hover:text-cinematic-orange">
            {index}
          </span>
          <Icon
            className={cn(
              'text-muted-foreground transition-colors duration-500 group-hover:text-cinematic-orange',
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
            'mt-3 leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-foreground sm:mt-4',
            featured
              ? 'max-w-[380px] text-[15px] sm:text-base'
              : 'text-[13px] sm:text-[14px]'
          )}
        >
          {description}
        </p>

        {/* Mini Tools Icons */}
        {tools && tools.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {tools.map((tool, idx) => {
              const ToolIcon = toolIconMap[tool.icon] || Wrench;
              return (
                <div 
                  key={idx}
                  className="group/tool relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white transition-transform duration-300 hover:scale-110 shadow-sm"
                  title={tool.name}
                >
                  <ToolIcon 
                    className="relative z-10 h-4 w-4 transition-colors duration-300" 
                    style={{ color: tool.color }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="relative z-10 mt-8 flex items-center justify-between sm:mt-10 pointer-events-none">
        <div className="h-[1px] flex-1 bg-border transition-colors duration-500" />
        <div className="ml-4 flex h-8 w-8 items-center justify-center rounded-full border border-border transition-[border-color,background-color] duration-500 group-hover:border-cinematic-orange group-hover:bg-cinematic-orange/10 sm:h-9 sm:w-9">
          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-[color,transform] duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cinematic-orange sm:h-4 sm:w-4" />
        </div>
      </div>
    </div>
  );
});
