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
 */
export function MouseFollowLight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(false);

  // Use a standard function wrapped in useCallback to avoid 'used before initialization' TDZ issues.
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

    rafRef.current = requestAnimationFrame(animateFrame);
  }, []);

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

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

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
