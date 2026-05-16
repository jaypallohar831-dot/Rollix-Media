'use client';

import { Suspense, memo, useMemo, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MotionChip {
  label: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  delay: number;
}

/**
 * MarketingMotionVisual — Premium 3D growth engine visual.
 *
 * Performance fix: Replaced the entire Three.js Canvas (which was creating
 * a second WebGL context with 3 useFrame loops running at 60fps) with a
 * pure CSS/SVG animated visual. The Three.js scene had:
 * - GrowthCore: 4 meshes with continuous rotation/pulse
 * - SignalNetwork: 6 spheres + line segments with continuous rotation
 * - DataBars: 7 meshes with continuous scale animation
 *
 * This was the #1 performance killer — a full WebGL pipeline running
 * inside a portfolio card that may not even be visible on screen.
 *
 * The replacement uses CSS animations (compositor thread) and SVG
 * for the same visual impression at ~1% of the GPU cost.
 */

function GrowthCoreVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Central glowing orb */}
      <div
        className="relative h-32 w-32 rounded-full sm:h-40 sm:w-40"
        style={{
          background: 'radial-gradient(circle, rgba(212,118,60,0.4) 0%, rgba(109,45,17,0.2) 50%, transparent 70%)',
          animation: 'pulseCore 3s ease-in-out infinite',
        }}
      >
        {/* Inner icosahedron-like shape using CSS */}
        <div
          className="absolute inset-4 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(212,118,60,0.8) 0%, rgba(212,118,60,0.3) 40%, rgba(109,45,17,0.4) 100%)',
            boxShadow: '0 0 60px rgba(212,118,60,0.3), inset 0 0 30px rgba(109,45,17,0.5)',
            animation: 'spinSlow 12s linear infinite',
          }}
        />
      </div>

      {/* Orbit ring A */}
      <div
        className="absolute h-48 w-48 rounded-full border border-[rgba(139,216,255,0.25)] sm:h-56 sm:w-56"
        style={{ animation: 'orbitA 8s linear infinite' }}
      >
        <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#8bd8ff] shadow-[0_0_12px_rgba(139,216,255,0.6)]" />
      </div>

      {/* Orbit ring B */}
      <div
        className="absolute h-64 w-64 rounded-full border border-[rgba(243,180,123,0.15)] sm:h-72 sm:w-72"
        style={{ animation: 'orbitB 12s linear infinite reverse' }}
      >
        <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#f3b47b] shadow-[0_0_12px_rgba(243,180,123,0.5)]" />
      </div>

      {/* Network nodes */}
      {[
        { x: '15%', y: '30%', size: 6, color: '#f6a15f', delay: 0 },
        { x: '80%', y: '25%', size: 5, color: '#79d8ff', delay: 0.5 },
        { x: '25%', y: '70%', size: 7, color: '#f6a15f', delay: 1 },
        { x: '75%', y: '65%', size: 5, color: '#79d8ff', delay: 1.5 },
        { x: '50%', y: '15%', size: 4, color: '#f6a15f', delay: 0.8 },
        { x: '55%', y: '80%', size: 4, color: '#79d8ff', delay: 1.2 },
      ].map((node, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: node.x,
            top: node.y,
            width: node.size,
            height: node.size,
            background: node.color,
            boxShadow: `0 0 ${node.size * 3}px ${node.color}`,
            animation: `sparkleFloat ${4 + i}s ease-in-out ${node.delay}s infinite`,
          }}
        />
      ))}

      {/* SVG connection lines */}
      <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="15" y1="30" x2="50" y2="15" stroke="#d4763c" strokeWidth="0.3" />
        <line x1="50" y1="15" x2="80" y2="25" stroke="#d4763c" strokeWidth="0.3" />
        <line x1="80" y1="25" x2="75" y2="65" stroke="#d4763c" strokeWidth="0.3" />
        <line x1="75" y1="65" x2="55" y2="80" stroke="#d4763c" strokeWidth="0.3" />
        <line x1="55" y1="80" x2="25" y2="70" stroke="#d4763c" strokeWidth="0.3" />
        <line x1="25" y1="70" x2="15" y2="30" stroke="#d4763c" strokeWidth="0.3" />
      </svg>

      {/* Data bars — bottom right */}
      <div className="absolute bottom-[12%] right-[12%] flex items-end gap-1">
        {[0.48, 0.82, 0.68, 1.12, 0.92, 1.36, 1.05].map((h, i) => (
          <div
            key={i}
            className="w-[5px] rounded-t-sm"
            style={{
              height: `${h * 28}px`,
              background: i > 3 ? '#8bd8ff' : '#d4763c',
              boxShadow: `0 0 8px ${i > 3 ? 'rgba(139,216,255,0.3)' : 'rgba(212,118,60,0.3)'}`,
              animation: `barPulse 2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export const MarketingMotionVisual = memo(function MarketingMotionVisual() {
  const chips: MotionChip[] = [
    { label: 'SEO', top: '17%', left: '12%', delay: 0 },
    { label: 'ADS', top: '18%', right: '11%', delay: 0.35 },
    { label: 'ROI', bottom: '15%', left: '14%', delay: 0.7 },
    { label: 'CRM', bottom: '17%', right: '13%', delay: 1.05 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505]" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'linear-gradient(135deg, rgba(212,118,60,0.2), transparent 34%, rgba(74,172,219,0.14) 66%, transparent)',
        }}
      />
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* CSS/SVG replacement for Three.js scene */}
      <GrowthCoreVisual />

      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 to-transparent" />

      {chips.map((chip) => (
        <div
          key={chip.label}
          className="absolute rounded-md border border-white/15 bg-black/40 px-3 py-1.5 font-mono text-[10px] font-semibold tracking-[0.24em] text-white/80 shadow-[0_0_24px_rgba(212,118,60,0.12)] backdrop-blur-sm"
          style={{
            top: chip.top,
            left: chip.left,
            right: chip.right,
            bottom: chip.bottom,
            animation: `chipFloat 4.8s ease-in-out ${chip.delay}s infinite`,
          }}
        >
          {chip.label}
        </div>
      ))}

      <div className="absolute left-5 top-5 hidden items-center gap-2 sm:flex">
        <span className="h-2 w-2 rounded-full bg-cinematic-orange shadow-[0_0_16px_rgba(212,118,60,0.9)]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/55">
          Growth Engine
        </span>
      </div>

      <div className="absolute bottom-5 right-5 hidden text-right font-mono sm:block">
        <span className="block text-lg font-semibold tracking-[0.08em] text-white">
          +248%
        </span>
        <span className="block text-[9px] uppercase tracking-[0.24em] text-white/45">
          Campaign Reach
        </span>
      </div>
    </div>
  );
});
