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
  pricingStarting?: string;
}

export const ServiceCard = memo(function ServiceCard({
  index,
  slug,
  title,
  description,
  icon: Icon,
  className,
  featured = false,
  tools,
  pricingStarting,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        'group relative flex cursor-pointer overflow-hidden rounded-2xl border transition-[border-color,background-color,transform,box-shadow] duration-300',
        // Ampledia Dark Canvas & Surface
        'border-[#7C3AED]/20 bg-[#1A0F33] shadow-md shadow-[#0A0614]',
        // Hover state
        'hover:border-[#A855F7]/60 hover:shadow-xl hover:shadow-[#7C3AED]/20 hover:-translate-y-1',
        // Layout
        featured
          ? 'flex-col justify-between p-8 sm:p-10 lg:p-12'
          : 'flex-col justify-between p-6 sm:p-7',
        className
      )}
    >
      <Link
        href={`/services/${slug}`}
        className="absolute inset-0 z-20 focus:outline-none focus:ring-2 focus:ring-[#A855F7] focus:ring-offset-2 focus:ring-offset-[#0A0614] rounded-2xl"
      >
        <span className="sr-only">Explore {title}</span>
      </Link>

      {/* Content */}
      <div className="relative z-10 pointer-events-none">
        {/* Header: index + icon */}
        <div className="mb-5 flex items-start justify-between sm:mb-6">
          <span className="font-mono text-xs font-semibold tracking-widest text-[#A855F7]">
            {index}
          </span>
          <div
            className={cn(
              'flex items-center justify-center rounded-xl bg-[#241445] text-[#C4B5FD] transition-colors duration-300 group-hover:bg-[#7C3AED] group-hover:text-white',
              featured ? 'h-12 w-12' : 'h-10 w-10'
            )}
          >
            <Icon
              className={cn(
                'transition-transform duration-300 group-hover:scale-110',
                featured ? 'h-6 w-6' : 'h-5 w-5'
              )}
              strokeWidth={1.75}
            />
          </div>
        </div>

        {/* Title */}
        <h3
          className={cn(
            'font-heading font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-white',
            featured
              ? 'text-2xl sm:text-3xl lg:text-4xl'
              : 'text-lg sm:text-xl'
          )}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={cn(
            'mt-2.5 leading-relaxed text-white transition-colors duration-300 group-hover:text-white',
            featured
              ? 'max-w-xl text-sm sm:text-base'
              : 'text-xs sm:text-sm'
          )}
        >
          {description}
        </p>

        {/* Pricing indicator */}
        {pricingStarting && (
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#7C3AED]/25 bg-[#241445]/60 px-3 py-1 text-[11px] font-medium text-white">
            <span className="h-1 w-1 rounded-full bg-[#A855F7]" />
            <span>{pricingStarting}</span>
          </div>
        )}

        {/* Mini Tools Icons */}
        {tools && tools.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {tools.map((tool, idx) => {
              const ToolIcon = (toolIconMap[tool.icon] || Wrench) as React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
              return (
                <div 
                  key={idx}
                  className="group/tool relative flex h-7 w-7 items-center justify-center rounded-lg border border-[#7C3AED]/20 bg-[#241445]/80 transition-transform duration-200 hover:scale-110 shadow-sm"
                  title={tool.name}
                >
                  <ToolIcon 
                    className="relative z-10 h-3.5 w-3.5 transition-colors duration-200" 
                    style={{ color: tool.color }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div className="relative z-10 mt-6 flex items-center justify-between sm:mt-8 pointer-events-none">
        <div className="h-[1px] flex-1 bg-[#7C3AED]/20 transition-colors duration-300 group-hover:bg-[#7C3AED]/40" />
        <div className="ml-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#7C3AED]/30 bg-[#241445]/50 text-[#C4B5FD] transition-all duration-300 group-hover:border-[#A855F7] group-hover:bg-[#7C3AED] group-hover:text-white sm:h-9 sm:w-9">
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  );
});
