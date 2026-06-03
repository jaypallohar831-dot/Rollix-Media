'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface FounderName {
  name: string;
  title?: string;
  side: 'left' | 'right';
}

interface CinematicRevealProps {
  imageSrc: string;
  alt: string;
  priority?: boolean;
  founders?: FounderName[];
  children?: React.ReactNode;
}

/**
 * CinematicReveal — Image reveal with cinematic scroll-driven parallax
 * and optional founder name animations that slide in from opposite sides.
 *
 * Founder names:
 *  - Slide IN  from left/right as the section enters the viewport
 *  - Meet in the center when fully visible
 *  - Slide OUT in the same direction when scrolling away
 */
export function CinematicReveal({ imageSrc, alt, priority = false, founders, children }: CinematicRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Image parallax — subtle zoom + fade + vertical shift
  const scale   = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y       = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  // Founder names — slide in when image enters, slide out when it exits
  // scrollYProgress: 0 = image bottom at viewport bottom (entering)
  //                  0.5 = image centered in viewport (fully visible)
  //                  1 = image top at viewport top (exiting)
  const nameOpacity  = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 0.95], [0, 1, 1, 0]);
  const leftNameX    = useTransform(scrollYProgress, [0.05, 0.35, 0.65, 0.95], ['-120px', '0px', '0px', '-120px']);
  const rightNameX   = useTransform(scrollYProgress, [0.05, 0.35, 0.65, 0.95], ['120px',  '0px', '0px',  '120px']);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[60vh] sm:h-[80vh] overflow-hidden my-24 sm:my-32 rounded-xl sm:rounded-2xl"
    >
      {/* ── Parallax image layer ── */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale, opacity, y }}
      >
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-contain"
          priority={priority}
          quality={100}
          unoptimized={true}
        />
        {/* Cinematic dark overlay */}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30" />
      </motion.div>

      {/* ── Founder name overlays ── */}
      {founders && founders.length > 0 && (
        <div className="absolute inset-0 z-20 flex items-end justify-between px-8 sm:px-14 pb-10 sm:pb-14 pointer-events-none">
          {founders.map((founder) => {
            const x = founder.side === 'left' ? leftNameX : rightNameX;
            return (
              <motion.div
                key={founder.name}
                style={{ x, opacity: nameOpacity }}
                className={`flex flex-col ${founder.side === 'right' ? 'items-end' : 'items-start'}`}
              >
                {/* Thin accent line */}
                <div
                  className={`mb-3 flex items-center gap-3 ${founder.side === 'right' ? 'flex-row-reverse' : ''}`}
                >
                  <span className="h-[1px] w-8 bg-cinematic-orange/60" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-cinematic-orange/80">
                    Co-Founder
                  </span>
                </div>

                {/* Name */}
                <span className="font-heading text-[clamp(1.05rem,2.8vw,2rem)] font-light tracking-[-0.01em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  {founder.name}
                </span>

                {/* Optional sub-title */}
                {founder.title && (
                  <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/50">
                    {founder.title}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ── Arbitrary children overlay ── */}
      {children && (
        <div className="relative z-10 flex h-full items-center justify-center p-6 text-center">
          {children}
        </div>
      )}
    </div>
  );
}
