'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_CATEGORIES, type PortfolioCategory } from '@/lib/portfolio';
import { cn } from '@/lib/utils';

interface PortfolioFilterProps {
  activeCategory: string;
  onCategoryChange: (category: PortfolioCategory) => void;
}

export function PortfolioFilter({
  activeCategory,
  onCategoryChange,
}: PortfolioFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      {PORTFOLIO_CATEGORIES.map((category) => {
        const isActive = activeCategory === category;

        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              'relative rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] transition-all duration-400 sm:px-5 sm:py-2.5 sm:text-[11px]',
              isActive
                ? 'border-cinematic-orange/40 bg-cinematic-orange/10 text-cinematic-orange'
                : 'border-white/[0.08] bg-white/[0.02] text-muted-foreground/60 hover:border-white/[0.15] hover:text-muted-foreground/90'
            )}
          >
            {category}

            {/* Active indicator dot */}
            {isActive && (
              <motion.span
                layoutId="portfolio-filter-active"
                className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cinematic-orange"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
