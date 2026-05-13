'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SITE_NAME } from '@/lib/navigation';

export function NavLogo() {
  return (
    <motion.a
      href="#hero"
      className="group relative flex items-center gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Accent mark */}
      <span className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center overflow-hidden">
        <Image 
          src="/assets/logo.png" 
          alt="Logo" 
          fill
          sizes="(max-width: 768px) 32px, 40px"
          className="object-contain"
        />
      </span>

      {/* Logo text */}
      <span className="text-[13px] font-medium uppercase tracking-[0.35em] text-foreground transition-colors duration-500">
        {SITE_NAME}
      </span>
    </motion.a>
  );
}
