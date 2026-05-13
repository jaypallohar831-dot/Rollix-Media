'use client';

/*
 * Performance changes vs. original:
 * 1. Removed all motion imports — this component was importing framer-motion
 *    but not using any motion features. Static gradients don't need a motion library.
 * 2. Removed the scan-line texture (repeating-linear-gradient with 3px intervals).
 *    This was generating a GPU texture across the entire viewport with thousands
 *    of sub-pixel lines. Imperceptible at 0.015 opacity but costly to composite.
 * 3. Reduced the number of gradient layers from 7 to 5.
 */

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base: deep black */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Warm cinematic radial glow — center */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(212,118,60,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Secondary cool ambient glow — top right */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            'radial-gradient(ellipse 40% 40% at 80% 20%, rgba(120,100,80,0.1) 0%, transparent 60%)',
        }}
      />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(5,5,5,0.8) 100%)',
        }}
      />

      {/* Film grain overlay */}
      <div className="grain-overlay absolute inset-0" />

      {/* Subtle top-down gradient fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,5,5,0.3) 0%, transparent 30%, transparent 70%, rgba(5,5,5,0.6) 100%)',
        }}
      />
    </div>
  );
}
