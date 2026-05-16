'use client';

/**
 * BokehBackground — Cinematic background with subtle CSS-animated bokeh lights.
 *
 * Uses CSS keyframes instead of framer-motion scroll listeners.
 * All animations run on the compositor thread — zero main thread cost.
 */
export function BokehBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Base: deep black */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Layer 1: Large soft bokeh — gentle float animation */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute top-[10%] left-[5%] h-96 w-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--cinematic-orange) 0%, transparent 70%)',
            animation: 'bokehDrift1 25s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-[20%] right-[10%] h-[500px] w-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--cinematic-orange) 0%, transparent 70%)',
            animation: 'bokehDrift2 30s ease-in-out infinite',
          }}
        />
      </div>

      {/* Layer 2: Smaller, tighter bokeh — gentle drift */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute top-[40%] right-[20%] h-64 w-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, white 0%, transparent 70%)',
            animation: 'bokehDrift3 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-[10%] left-[15%] h-80 w-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--cinematic-orange) 0%, transparent 70%)',
            animation: 'bokehDrift1 35s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* Noise / Grain texture (global) */}
      <div className="grain-overlay absolute inset-0 opacity-[0.4] mix-blend-overlay" />
    </div>
  );
}
