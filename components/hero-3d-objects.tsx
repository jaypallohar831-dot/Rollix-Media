'use client';

import { memo } from 'react';

/**
 * Hero3DObjects — Floating 3D cinematic objects around the hero
 *
 * Performance fix: Replaced framer-motion infinite keyframe animations
 * with CSS @keyframes. Framer-motion's infinite animations use JS-driven
 * requestAnimationFrame loops that compete with the main thread.
 * CSS animations are handled by the compositor thread — zero main thread cost.
 *
 * Also reduced from 6 floating objects + 6 sparkles (12 concurrent JS animations)
 * to 4 floating objects + 4 sparkles using pure CSS.
 */

/* ── Individual floating object ── */
function FloatingObject({
  children,
  className = '',
  delay = 0,
  duration = 20,
  size = 60,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  size?: number;
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        width: size,
        height: size,
        animation: `heroFloat ${duration}s ease-in-out ${delay}s infinite, heroSpin ${duration * 2.5}s linear ${delay}s infinite`,
      }}
    >
      {children}
    </div>
  );
}

/* ── SVG Icons ── */

function CameraIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="10" y="24" width="46" height="34" rx="4" stroke="rgba(212,118,60,0.8)" strokeWidth="2" fill="rgba(212,118,60,0.08)" />
      <circle cx="33" cy="41" r="11" stroke="rgba(212,118,60,0.9)" strokeWidth="2" fill="rgba(212,118,60,0.05)" />
      <circle cx="33" cy="41" r="6" stroke="rgba(212,118,60,0.6)" strokeWidth="1.5" fill="rgba(212,118,60,0.1)" />
      <circle cx="33" cy="41" r="2" fill="rgba(212,118,60,0.8)" />
      <polygon points="56,32 70,24 70,50 56,42" stroke="rgba(212,118,60,0.7)" strokeWidth="2" fill="rgba(212,118,60,0.06)" />
      <rect x="14" y="28" width="6" height="4" rx="1" fill="rgba(212,118,60,0.5)" />
      <circle cx="50" cy="30" r="2" fill="rgba(255,80,80,0.8)" />
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="14" y="16" width="52" height="34" rx="3" stroke="rgba(120,180,255,0.7)" strokeWidth="2" fill="rgba(120,180,255,0.05)" />
      <rect x="18" y="20" width="44" height="26" rx="1" fill="rgba(120,180,255,0.08)" />
      <polygon points="35,28 35,42 47,35" fill="rgba(212,118,60,0.7)" />
      <path d="M8 54 L14 50 L66 50 L72 54 L8 54 Z" stroke="rgba(120,180,255,0.5)" strokeWidth="1.5" fill="rgba(120,180,255,0.04)" />
    </svg>
  );
}

function FilmReelIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="40" cy="40" r="28" stroke="rgba(212,118,60,0.7)" strokeWidth="2" fill="rgba(212,118,60,0.04)" />
      <circle cx="40" cy="40" r="18" stroke="rgba(212,118,60,0.5)" strokeWidth="1.5" fill="rgba(212,118,60,0.03)" />
      <circle cx="40" cy="40" r="6" stroke="rgba(212,118,60,0.8)" strokeWidth="2" fill="rgba(212,118,60,0.15)" />
    </svg>
  );
}

function ClapperboardIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="10" y="30" width="60" height="38" rx="3" stroke="rgba(212,118,60,0.7)" strokeWidth="2" fill="rgba(212,118,60,0.05)" />
      <path d="M10 30 L70 30 L66 18 L14 18 Z" stroke="rgba(212,118,60,0.8)" strokeWidth="2" fill="rgba(212,118,60,0.08)" />
    </svg>
  );
}

const SPARKLE_DATA = [
  { size: 4, bg: 'rgba(212,118,60,0.6)', top: '22%', left: '12%', dur: 7 },
  { size: 5, bg: 'rgba(255,255,255,0.4)', top: '35%', left: '88%', dur: 9 },
  { size: 3, bg: 'rgba(212,118,60,0.6)', top: '68%', left: '22%', dur: 6 },
  { size: 4, bg: 'rgba(255,255,255,0.4)', top: '50%', left: '75%', dur: 8 },
];

export const Hero3DObjects = memo(function Hero3DObjects() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <FloatingObject className="top-[8%] left-[6%]" delay={0} duration={18} size={70}><CameraIcon /></FloatingObject>
      <FloatingObject className="top-[20%] right-[5%]" delay={2} duration={22} size={80}><LaptopIcon /></FloatingObject>
      <FloatingObject className="bottom-[18%] left-[4%]" delay={1} duration={25} size={65}><FilmReelIcon /></FloatingObject>
      <FloatingObject className="top-[6%] right-[25%]" delay={4} duration={20} size={55}><ClapperboardIcon /></FloatingObject>

      {SPARKLE_DATA.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: s.size,
            height: s.size,
            background: s.bg,
            top: s.top,
            left: s.left,
            animation: `sparkleFloat ${s.dur}s ease-in-out ${i * 0.8}s infinite`,
          }}
        />
      ))}
    </div>
  );
});
