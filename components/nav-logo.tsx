'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_NAME } from '@/lib/navigation';

export function NavLogo() {
  return (
    <Link
      href="/"
      className="group relative flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#A855F7] rounded-lg"
      aria-label={`${SITE_NAME} — Home`}
    >
      {/* Accent mark */}
      <span className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center -ml-2 -mr-3">
        <Image
          src="/assets/logo.png"
          alt={`${SITE_NAME} Logo`}
          fill
          priority
          sizes="(max-width: 768px) 56px, 64px"
          className="object-contain scale-125"
        />
      </span>

      {/* Logo text */}
      <span className="font-heading text-[15px] font-bold uppercase tracking-[0.3em] text-white transition-colors duration-300 group-hover:text-white">
        {SITE_NAME}
      </span>
    </Link>
  );
}
