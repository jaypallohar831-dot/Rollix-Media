'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { buttonHover, buttonTap } from '@/animations/variants';
import { ReactNode, memo } from 'react';

interface CinematicButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'outline';
  className?: string;
  href?: string;
  showArrow?: boolean;
  onClick?: () => void;
}

/*
 * Performance changes vs. original:
 * 1. Removed backdrop-blur-sm from outline variant — blur is expensive.
 * 2. Removed the hover box-shadow on primary (was generating a 40px blur).
 *    Box-shadows with large blur radius trigger expensive repaint.
 * 3. Memoized to prevent re-renders.
 */

export const CinematicButton = memo(function CinematicButton({
  children,
  variant = 'primary',
  className,
  href,
  showArrow = true,
  onClick,
}: CinematicButtonProps) {
  const baseStyles =
    'group relative inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-medium tracking-wide uppercase transition-[background-color,border-color,color] duration-500 cursor-pointer overflow-hidden';

  const variants = {
    primary: cn(
      baseStyles,
      'bg-cinematic-orange text-white hover:brightness-110',
      className
    ),
    outline: cn(
      baseStyles,
      'border border-white/[0.12] text-foreground hover:border-white/[0.25] hover:bg-white/[0.03]',
      className
    ),
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={variants[variant]}
      whileHover={buttonHover}
      whileTap={buttonTap}
    >
      {/* Inner glow on hover for primary */}
      {variant === 'primary' && (
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      )}

      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {showArrow && (
          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
        )}
      </span>
    </Component>
  );
});
