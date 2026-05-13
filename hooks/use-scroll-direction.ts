'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface ScrollState {
  /** Current scroll position in px */
  scrollY: number;
  /** Whether the user has scrolled past the threshold */
  isScrolled: boolean;
  /** Whether the navbar should be visible (hidden when scrolling down fast) */
  isVisible: boolean;
  /** Scroll direction */
  direction: 'up' | 'down' | null;
}

/**
 * Tracks scroll position, direction, and visibility state
 * for cinematic navbar behavior.
 *
 * Performance: Uses RAF throttling so at most one state update per frame.
 * Batches all derived state into a single setState call.
 *
 * @param threshold - px before "scrolled" state activates (default: 50)
 * @param hideThreshold - px of fast downward scroll before hiding (default: 300)
 */
export function useScrollDirection(
  threshold = 50,
  hideThreshold = 300
): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    isScrolled: false,
    isVisible: true,
    direction: null,
  });

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (ticking.current) return;

    ticking.current = true;
    requestAnimationFrame(() => {
      const currentY = window.scrollY;
      const direction = currentY > lastScrollY.current ? 'down' : 'up';
      const isScrolled = currentY > threshold;

      // Hide navbar only when scrolling down AND past the hide threshold
      const isVisible = direction === 'up' || currentY < hideThreshold;

      setState((prev) => {
        // Bail out if nothing changed — prevents unnecessary re-render
        if (
          prev.isScrolled === isScrolled &&
          prev.isVisible === isVisible &&
          prev.direction === direction
        ) {
          lastScrollY.current = currentY;
          ticking.current = false;
          return prev;
        }

        return {
          scrollY: currentY,
          isScrolled,
          isVisible,
          direction,
        };
      });

      lastScrollY.current = currentY;
      ticking.current = false;
    });
  }, [threshold, hideThreshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return state;
}
