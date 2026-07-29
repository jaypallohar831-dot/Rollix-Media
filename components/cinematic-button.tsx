'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { buttonHover, buttonTap } from '@/animations/variants';
import { ReactNode, memo } from 'react';
import Link from 'next/link';

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

const MotionLink = motion.create(Link);

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
      'border border-border text-foreground hover:border-cinematic-orange hover:text-cinematic-orange hover:bg-cinematic-orange/5',
      className
    ),
  };

  const Component = href ? MotionLink : motion.button;
  const componentProps = href ? { href } : { onClick };

  return (
    <Component
      {...componentProps}
      className={variants[variant]}
      whileHover={buttonHover}
      whileTap={buttonTap}
    >
      {/* Inner glow removed for minimal theme */}

      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {showArrow && (
          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
        )}
      </span>
    </Component>
  );
});
