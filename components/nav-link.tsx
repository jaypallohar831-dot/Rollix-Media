'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

export const NavLink = memo(function NavLink({ href, label, isActive, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'group relative py-2 text-[13px] font-medium uppercase tracking-[0.2em] transition-colors duration-500',
        isActive
          ? 'text-foreground'
          : 'text-muted-foreground/70 hover:text-foreground'
      )}
    >
      {label}

      {/* Active indicator — subtle underline */}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-[1px] bg-cinematic-orange"
        initial={false}
        animate={{
          width: isActive ? '100%' : '0%',
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Hover line (only when not active) */}
      {!isActive && (
        <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-border transition-[width] duration-500 group-hover:w-full" />
      )}
    </Link>
  );
});
