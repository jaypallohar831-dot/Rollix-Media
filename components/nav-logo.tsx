'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SITE_NAME } from '@/lib/navigation';

export function NavLogo() {
  return (
    <motion.a
      href="#hero"
      className="group relative flex items-center gap-1"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Accent mark */}
      <span className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center -ml-2 -mr-4">
        <Image
          src="/assets/logo.png"
          alt="Logo"
          fill
          sizes="(max-width: 768px) 64px, 80px"
          className="object-contain scale-[1.5]"
        />
      </span>

      {/* Logo text */}
      <span className="text-[15px] font-medium uppercase tracking-[0.35em] text-foreground transition-colors duration-500">
        {SITE_NAME}
      </span>
    </motion.a>
  );
}
