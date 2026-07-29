'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Loader — Cinematic split-screen reveal using pure CSS animations.
 *
 * Performance fix: Removed framer-motion AND gsap imports.
 * The original loaded ~80KB+ of JS animation libraries just for a
 * 2-second splash screen. Now uses CSS @keyframes with animation-fill-mode
 * for identical visual output at zero JS cost.
 *
 * Timeline:
 *   0.0s – Text clip-reveals upward (CSS)
 *   0.3s – Loading bar shimmer starts (CSS)
 *   0.8s – Text fades to transparent (CSS)
 *   1.2s – Split-screen panels slide away (CSS)
 *   2.0s – Component unmounts (JS setTimeout)
 */
export function Loader({ onComplete }: { onComplete?: () => void }) {
  const [done, setDone] = useState(false);

  const handleComplete = useCallback(() => {
    setDone(true);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    // Total animation duration: ~2s
    const timer = setTimeout(handleComplete, 2000);
    return () => clearTimeout(timer);
  }, [handleComplete]);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-auto"
      aria-hidden="true"
    >
      {/* Top half — splits upward */}
      <div
        className="absolute top-0 left-0 right-0 h-1/2 bg-black will-change-transform"
        style={{
          animation: 'loaderSplitUp 0.8s cubic-bezier(0.76, 0, 0.24, 1) 1.2s forwards',
        }}
      />

      {/* Bottom half — splits downward */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-black will-change-transform"
        style={{
          animation: 'loaderSplitDown 0.8s cubic-bezier(0.76, 0, 0.24, 1) 1.2s forwards',
        }}
      />

      {/* Center content — BIG logo text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div
          style={{
            animation: 'loaderFadeOut 0.4s ease-in-out 0.8s forwards',
          }}
        >
          {/* ROLLIX text */}
          <div className="overflow-hidden pb-1">
            <div
              className="font-heading text-[clamp(4rem,12vw,10rem)] font-light leading-[1] tracking-[-0.02em] text-white origin-bottom-left"
              style={{
                animation: 'loaderTextReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            >
              ROLLIX
            </div>
          </div>

          {/* MEDIA text */}
          <div className="overflow-hidden pt-1 pb-1">
            <div
              className="font-heading text-[clamp(4rem,12vw,10rem)] font-light leading-[0.85] tracking-[-0.02em] origin-bottom-left"
              style={{
                color: 'var(--cinematic-orange, #d4763c)',
                animation: 'loaderTextReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards',
                transform: 'translateY(100%) rotate(2deg)',
              }}
            >
              MEDIA
            </div>
          </div>
        </div>

        {/* Minimal loading line */}
        <div
          className="relative mt-8 h-[2px] w-32 overflow-hidden"
          style={{
            animation: 'loaderFadeOut 0.4s ease-in-out 0.8s forwards, loaderBarReveal 0.4s ease-out 0.3s forwards',
            opacity: 0,
            transform: 'scaleX(0)',
          }}
        >
          <div className="absolute inset-0 bg-white/[0.1]" />
          <div
            className="absolute top-0 left-0 h-full w-[40%]"
            style={{
              background:
                'linear-gradient(90deg, transparent, var(--cinematic-orange, #d4763c), transparent)',
              animation: 'loaderBarShimmer 0.8s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </div>
  );
}

