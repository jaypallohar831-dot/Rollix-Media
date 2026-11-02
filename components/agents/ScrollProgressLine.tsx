'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Attaches a 2px violet vertical progress bar to the left edge of the viewport.
 * Progressively fills as the user scrolls through the homepage.
 */
export function ScrollProgressLine() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.2,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 bottom-0 w-[2px] bg-white/5 z-50 pointer-events-none hidden sm:block"
    >
      <div
        ref={lineRef}
        className="w-full h-full bg-gradient-to-b from-[#7C3AED] via-[#A855F7] to-[#F472B6] origin-top"
        style={{ transform: 'scaleY(0)', willChange: 'transform' }}
      />
    </div>
  );
}

