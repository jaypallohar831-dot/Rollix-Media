'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader } from '@/components/loader';

export function HomepageLoader({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Loader onComplete={() => setIsLoaded(true)} />

      {/* Page content — starts invisible, fades up after loader completes */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
