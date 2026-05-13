import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Tracks overall page scroll progress (0 → 1).
 *
 * Performance: Uses RAF throttling and only updates state when
 * the progress value actually changes (rounded to 2 decimals).
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  const updateScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;

    requestAnimationFrame(() => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const next = Number((currentProgress / scrollHeight).toFixed(2));
        setProgress((prev) => (prev === next ? prev : next));
      }
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, [updateScroll]);

  return progress;
}
