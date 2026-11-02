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
        'group relative py-2 text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 focus:outline-none focus:text-[#F5F0FF]',
        isActive
          ? 'text-[#F5F0FF]'
          : 'text-[#B7A9D6] hover:text-[#F5F0FF]'
      )}
    >
      {label}

      {/* Active indicator — subtle violet underline */}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-[2px] bg-[#A855F7] rounded-full"
        initial={false}
        animate={{
          width: isActive ? '100%' : '0%',
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Hover line (only when not active) */}
      {!isActive && (
        <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-[#7C3AED]/40 transition-[width] duration-300 group-hover:w-full rounded-full" />
      )}
    </Link>
  );
});
