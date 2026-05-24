'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export function Loader({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'splitting' | 'done'>('visible');
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const handleComplete = useCallback(() => {
    setPhase('done');
    onComplete?.();
  }, [onComplete]);

  // After 1s → fade text to transparent, then split
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setPhase('fading');
    }, 800);

    return () => clearTimeout(fadeTimer);
  }, []);

  // When fading starts, animate text to transparent then trigger split
  useEffect(() => {
    if (phase !== 'fading') return;

    const tl = gsap.timeline({
      onComplete: () => setPhase('splitting'),
    });

    // Fade text + line to transparent
    tl.to([textRef.current, lineRef.current], {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
    });

    return () => { tl.kill(); };
  }, [phase]);

  // Split-screen reveal
  useEffect(() => {
    if (phase !== 'splitting') return;

    const tl = gsap.timeline({
      onComplete: handleComplete,
    });

    tl.to(topPanelRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
    });

    tl.to(
      bottomPanelRef.current,
      {
        yPercent: 100,
        duration: 0.8,
        ease: 'power4.inOut',
      },
      '<'
    );

    return () => { tl.kill(); };
  }, [phase, handleComplete]);

  if (phase === 'done') return null;

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-auto"
      aria-hidden="true"
    >
      {/* Top half — splits upward */}
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-black will-change-transform"
      />

      {/* Bottom half — splits downward */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-black will-change-transform"
      />

      {/* Center content — BIG logo text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {/* Massive logo text with clip reveal */}
        <div ref={textRef} className="flex flex-col items-center">
          <div className="overflow-hidden pb-1">
            <motion.div
              initial={{ y: '100%', rotate: 2 }}
              animate={{ y: '0%', rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-[clamp(4rem,12vw,10rem)] font-light leading-[1] tracking-[-0.02em] text-white origin-bottom-left"
            >
              ROLLIX
            </motion.div>
          </div>
          <div className="overflow-hidden pt-1 pb-1">
            <motion.div
              initial={{ y: '100%', rotate: 2 }}
              animate={{ y: '0%', rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-heading text-[clamp(4rem,12vw,10rem)] font-light leading-[0.85] tracking-[-0.02em] origin-bottom-left"
              style={{ color: 'var(--cinematic-orange, #d4763c)' }}
            >
              MEDIA
            </motion.div>
          </div>
        </div>

        {/* Minimal loading line below logo */}
        <motion.div
          ref={lineRef}
          className="relative mt-8 h-[2px] w-32 overflow-hidden"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 bg-white/[0.1]" />
          <motion.div
            className="absolute top-0 left-0 h-full w-[40%]"
            style={{
              background:
                'linear-gradient(90deg, transparent, var(--cinematic-orange, #d4763c), transparent)',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '350%' }}
            transition={{
              duration: 0.8,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
