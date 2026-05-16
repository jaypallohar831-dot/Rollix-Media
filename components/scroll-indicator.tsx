'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/animations/variants';

export function ScrollIndicator() {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      transition={{ delay: 2.5 }}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
    >
      <span className="text-[9px] font-medium uppercase tracking-[0.4em] text-muted-foreground/40">
        Scroll
      </span>
      <div className="relative h-10 w-[1px] overflow-hidden animate-scroll-hint">
        <div className="absolute left-0 top-0 h-4 w-[1px] bg-gradient-to-b from-cinematic-orange to-transparent" />
        <div className="absolute inset-0 bg-white/[0.06]" />
      </div>
    </motion.div>
  );
}
