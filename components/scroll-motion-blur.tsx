'use client';

import { useEffect, useRef, ReactNode } from 'react';

/**
 * ScrollMotionBlur
 * Top/Bottom vignettes & motion blur ONLY appear during active scrolling.
 * When scrolling stops, all overlays and blur effects become 100% clear (opacity 0).
 */
export function ScrollMotionBlur({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const topOverlayRef = useRef<HTMLDivElement>(null);
  const bottomOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let timer: NodeJS.Timeout;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      const blurAmount = Math.min(delta * 0.08, 4);

      // Show top & bottom blur overlays ONLY during scroll
      if (topOverlayRef.current) {
        topOverlayRef.current.style.opacity = '1';
        topOverlayRef.current.style.transition = 'opacity 0.1s ease-out';
      }
      if (bottomOverlayRef.current) {
        bottomOverlayRef.current.style.opacity = '1';
        bottomOverlayRef.current.style.transition = 'opacity 0.1s ease-out';
      }

      // Apply dynamic velocity blur to content during scroll
      if (contentRef.current && blurAmount > 0.3) {
        contentRef.current.style.filter = `blur(${blurAmount.toFixed(1)}px)`;
        contentRef.current.style.transition = 'filter 0.05s ease-out';
      }

      // Clear all blur as soon as scroll stops
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (topOverlayRef.current) {
          topOverlayRef.current.style.opacity = '0';
          topOverlayRef.current.style.transition = 'opacity 0.35s ease-out';
        }
        if (bottomOverlayRef.current) {
          bottomOverlayRef.current.style.opacity = '0';
          bottomOverlayRef.current.style.transition = 'opacity 0.35s ease-out';
        }
        if (contentRef.current) {
          contentRef.current.style.filter = 'blur(0px)';
          contentRef.current.style.transition = 'filter 0.35s ease-out';
        }
      }, 50);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Top Edge Blur Overlay (Hidden by default, fades in only while scrolling) */}
      <div
        ref={topOverlayRef}
        className="fixed top-0 left-0 right-0 h-16 pointer-events-none z-40 backdrop-blur-[8px] opacity-0 transition-opacity duration-300"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Bottom Edge Blur Overlay (Hidden by default, fades in only while scrolling) */}
      <div
        ref={bottomOverlayRef}
        className="fixed bottom-0 left-0 right-0 h-16 pointer-events-none z-40 backdrop-blur-[8px] opacity-0 transition-opacity duration-300"
        style={{
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        }}
        aria-hidden="true"
      />

      <div ref={contentRef} className="w-full">
        {children}
      </div>
    </>
  );
}
