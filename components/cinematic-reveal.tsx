'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface CinematicRevealProps {
  imageSrc: string;
  alt: string;
  children?: React.ReactNode;
}

/**
 * CinematicReveal — Image reveal with cinematic scroll-driven parallax.
 *
 * Uses lightweight scroll transforms (only scale + opacity on the
 * image container). No clip-path animation (which was the expensive part).
 * The parallax effect gives a premium cinematic feel at low GPU cost.
 */
export function CinematicReveal({ imageSrc, alt, children }: CinematicRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Subtle zoom-out as the image scrolls into view
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  // Parallax shift — image moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <div ref={containerRef} className="relative w-full h-[60vh] sm:h-[80vh] overflow-hidden my-24 sm:my-32 rounded-xl sm:rounded-2xl">
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale, opacity, y }}
      >
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover"
          priority={false}
        />
        {/* Cinematic dark overlay */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60" />
      </motion.div>

      {/* Content overlay */}
      {children && (
        <div className="relative z-10 flex h-full items-center justify-center p-6 text-center">
          {children}
        </div>
      )}
    </div>
  );
}
