'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * MouseFollowLight — Subtle premium lighting effect that follows the cursor.
 *
 * Performance fix: Replaced framer-motion springs with a single
 * requestAnimationFrame loop using CSS custom properties. This eliminates:
 * - 2 spring animations running on every mouse move
 * - framer-motion's overhead for tracking 2 motion values
 * - React state updates for visibility toggling
 *
 * Now uses raw DOM manipulation — zero React re-renders.
 * The RAF loop auto-stops when position converges (delta < 0.5px)
 * and restarts on the next mousemove event.
 */
export function MouseFollowLight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(false);
  const runningRef = useRef(false);

  const animate = useCallback(function animateFrame() {
    const pos = posRef.current;
    // Lerp for smooth movement (equivalent to spring damping)
    pos.x += (pos.targetX - pos.x) * 0.08;
    pos.y += (pos.targetY - pos.y) * 0.08;

    if (primaryRef.current) {
      primaryRef.current.style.transform = `translate(${pos.x - 300}px, ${pos.y - 300}px)`;
    }
    if (secondaryRef.current) {
      secondaryRef.current.style.transform = `translate(${pos.x - 100}px, ${pos.y - 100}px)`;
    }

    // Stop the loop when position has converged (within 0.5px)
    const dx = Math.abs(pos.targetX - pos.x);
    const dy = Math.abs(pos.targetY - pos.y);
    if (dx < 0.5 && dy < 0.5) {
      runningRef.current = false;
      return;
    }

    rafRef.current = requestAnimationFrame(animateFrame);
  }, []);

  const startLoop = useCallback(() => {
    if (!runningRef.current) {
      runningRef.current = true;
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
      if (!visibleRef.current) {
        visibleRef.current = true;
        container.style.opacity = '1';
      }
      // Restart the RAF loop on new mouse movement
      startLoop();
    };

    const handleMouseLeave = () => {
      visibleRef.current = false;
      if (container) container.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      visibleRef.current = true;
      if (container) container.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [startLoop]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[100] mix-blend-soft-light"
      style={{ opacity: 0, transition: 'opacity 0.6s ease-in-out' }}
    >
      {/* Primary warm light */}
      <div
        ref={primaryRef}
        className="absolute left-0 top-0"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(212,118,60,0.1) 0%, transparent 70%)',
        }}
      />

      {/* Secondary tight center glow */}
      <div
        ref={secondaryRef}
        className="absolute left-0 top-0"
        style={{
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(212,118,60,0.05) 0%, transparent 50%)',
        }}
      />
    </div>
  );
}
