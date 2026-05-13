'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';

/**
 * Hero3DObjects — Floating 3D cinematic objects around the hero
 *
 * Uses CSS 3D perspective transforms + framer-motion keyframe
 * animations to create an orbiting, parallax-y feel.
 *
 * Objects: Camera, Laptop, Film Reel, Play Button, Clapperboard
 * All rendered as stylized SVG icons with glow effects.
 */

/* ── Individual floating object ── */
function FloatingObject({
  children,
  className = '',
  delay = 0,
  duration = 20,
  floatRange = 30,
  rotateRange = 15,
  size = 60,
  glowColor = 'rgba(212,118,60,0.3)',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  floatRange?: number;
  rotateRange?: number;
  size?: number;
  glowColor?: string;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        width: size,
        height: size,
        perspective: 800,
      }}
      animate={{
        y: [-floatRange, floatRange, -floatRange],
        x: [-floatRange * 0.5, floatRange * 0.5, -floatRange * 0.5],
        rotateY: [-rotateRange, rotateRange, -rotateRange],
        rotateX: [-rotateRange * 0.5, rotateRange * 0.5, -rotateRange * 0.5],
        rotateZ: [-rotateRange * 0.3, rotateRange * 0.3, -rotateRange * 0.3],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      <motion.div
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateY: [0, 360],
        }}
        transition={{
          duration: duration * 2.5,
          repeat: Infinity,
          ease: 'linear',
          delay,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ── SVG Icons as 3D objects ── */

function CameraIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Camera body */}
      <rect x="10" y="24" width="46" height="34" rx="4" stroke="rgba(212,118,60,0.8)" strokeWidth="2" fill="rgba(212,118,60,0.08)" />
      {/* Lens */}
      <circle cx="33" cy="41" r="11" stroke="rgba(212,118,60,0.9)" strokeWidth="2" fill="rgba(212,118,60,0.05)" />
      <circle cx="33" cy="41" r="6" stroke="rgba(212,118,60,0.6)" strokeWidth="1.5" fill="rgba(212,118,60,0.1)" />
      <circle cx="33" cy="41" r="2" fill="rgba(212,118,60,0.8)" />
      {/* Viewfinder */}
      <polygon points="56,32 70,24 70,50 56,42" stroke="rgba(212,118,60,0.7)" strokeWidth="2" fill="rgba(212,118,60,0.06)" />
      {/* Flash */}
      <rect x="14" y="28" width="6" height="4" rx="1" fill="rgba(212,118,60,0.5)" />
      {/* Record light */}
      <circle cx="50" cy="30" r="2" fill="rgba(255,80,80,0.8)">
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Screen */}
      <rect x="14" y="16" width="52" height="34" rx="3" stroke="rgba(120,180,255,0.7)" strokeWidth="2" fill="rgba(120,180,255,0.05)" />
      {/* Screen inner glow */}
      <rect x="18" y="20" width="44" height="26" rx="1" fill="rgba(120,180,255,0.08)" />
      {/* Play button on screen */}
      <polygon points="35,28 35,42 47,35" fill="rgba(212,118,60,0.7)" />
      {/* Base / Keyboard */}
      <path d="M8 54 L14 50 L66 50 L72 54 L8 54 Z" stroke="rgba(120,180,255,0.5)" strokeWidth="1.5" fill="rgba(120,180,255,0.04)" />
      {/* Hinge */}
      <line x1="14" y1="50" x2="66" y2="50" stroke="rgba(120,180,255,0.3)" strokeWidth="1" />
      {/* Trackpad */}
      <rect x="32" y="51" width="16" height="2" rx="1" fill="rgba(120,180,255,0.2)" />
    </svg>
  );
}

function FilmReelIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Outer ring */}
      <circle cx="40" cy="40" r="28" stroke="rgba(212,118,60,0.7)" strokeWidth="2" fill="rgba(212,118,60,0.04)" />
      {/* Inner ring */}
      <circle cx="40" cy="40" r="18" stroke="rgba(212,118,60,0.5)" strokeWidth="1.5" fill="rgba(212,118,60,0.03)" />
      {/* Center hub */}
      <circle cx="40" cy="40" r="6" stroke="rgba(212,118,60,0.8)" strokeWidth="2" fill="rgba(212,118,60,0.15)" />
      <circle cx="40" cy="40" r="2" fill="rgba(212,118,60,0.9)" />
      {/* Sprocket holes */}
      <circle cx="40" cy="16" r="3" fill="rgba(212,118,60,0.3)" />
      <circle cx="40" cy="64" r="3" fill="rgba(212,118,60,0.3)" />
      <circle cx="16" cy="40" r="3" fill="rgba(212,118,60,0.3)" />
      <circle cx="64" cy="40" r="3" fill="rgba(212,118,60,0.3)" />
      {/* Diagonal sprockets */}
      <circle cx="23" cy="23" r="3" fill="rgba(212,118,60,0.25)" />
      <circle cx="57" cy="57" r="3" fill="rgba(212,118,60,0.25)" />
      <circle cx="57" cy="23" r="3" fill="rgba(212,118,60,0.25)" />
      <circle cx="23" cy="57" r="3" fill="rgba(212,118,60,0.25)" />
      {/* Spokes */}
      <line x1="40" y1="22" x2="40" y2="10" stroke="rgba(212,118,60,0.2)" strokeWidth="1" />
      <line x1="40" y1="58" x2="40" y2="70" stroke="rgba(212,118,60,0.2)" strokeWidth="1" />
      <line x1="22" y1="40" x2="10" y2="40" stroke="rgba(212,118,60,0.2)" strokeWidth="1" />
      <line x1="58" y1="40" x2="70" y2="40" stroke="rgba(212,118,60,0.2)" strokeWidth="1" />
    </svg>
  );
}

function ClapperboardIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Board body */}
      <rect x="10" y="30" width="60" height="38" rx="3" stroke="rgba(212,118,60,0.7)" strokeWidth="2" fill="rgba(212,118,60,0.05)" />
      {/* Clapper arm */}
      <path d="M10 30 L70 30 L66 18 L14 18 Z" stroke="rgba(212,118,60,0.8)" strokeWidth="2" fill="rgba(212,118,60,0.08)" />
      {/* Stripes on clapper */}
      <line x1="22" y1="18" x2="18" y2="30" stroke="rgba(212,118,60,0.4)" strokeWidth="2" />
      <line x1="34" y1="18" x2="30" y2="30" stroke="rgba(212,118,60,0.4)" strokeWidth="2" />
      <line x1="46" y1="18" x2="42" y2="30" stroke="rgba(212,118,60,0.4)" strokeWidth="2" />
      <line x1="58" y1="18" x2="54" y2="30" stroke="rgba(212,118,60,0.4)" strokeWidth="2" />
      {/* Hinge */}
      <circle cx="14" cy="30" r="3" fill="rgba(212,118,60,0.6)" />
      {/* Text lines on board */}
      <line x1="18" y1="40" x2="50" y2="40" stroke="rgba(212,118,60,0.25)" strokeWidth="1.5" />
      <line x1="18" y1="47" x2="42" y2="47" stroke="rgba(212,118,60,0.2)" strokeWidth="1.5" />
      <line x1="18" y1="54" x2="55" y2="54" stroke="rgba(212,118,60,0.15)" strokeWidth="1.5" />
    </svg>
  );
}

function DancerIcon() {
  return (
    <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Head */}
      <circle cx="40" cy="14" r="7" stroke="rgba(255,180,120,0.8)" strokeWidth="1.5" fill="rgba(255,180,120,0.1)" />
      {/* Hair flowing */}
      <path d="M35 10 Q30 5 28 12" stroke="rgba(255,180,120,0.4)" strokeWidth="1" fill="none" />
      <path d="M45 10 Q50 5 52 12" stroke="rgba(255,180,120,0.4)" strokeWidth="1" fill="none" />
      {/* Torso */}
      <path d="M40 21 L40 48" stroke="rgba(255,180,120,0.7)" strokeWidth="2" strokeLinecap="round" />
      {/* Left arm extended — dance pose */}
      <path d="M40 28 Q25 22 15 12" stroke="rgba(255,180,120,0.6)" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Right arm up — dance pose */}
      <path d="M40 28 Q55 20 60 8" stroke="rgba(255,180,120,0.6)" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Skirt / dress */}
      <path d="M34 42 Q40 55 46 42" stroke="rgba(212,118,60,0.5)" strokeWidth="1.5" fill="rgba(212,118,60,0.08)" />
      <path d="M30 48 Q40 62 50 48" stroke="rgba(212,118,60,0.6)" strokeWidth="1.5" fill="rgba(212,118,60,0.06)" />
      {/* Left leg — extended pose */}
      <path d="M38 48 Q28 65 18 80" stroke="rgba(255,180,120,0.6)" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Right leg — pointed */}
      <path d="M42 48 Q52 62 58 75" stroke="rgba(255,180,120,0.6)" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Foot points */}
      <path d="M18 80 L14 82" stroke="rgba(255,180,120,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M58 75 L62 76" stroke="rgba(255,180,120,0.5)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Sparkle trail */}
      <circle cx="12" cy="10" r="1.5" fill="rgba(212,118,60,0.6)">
        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="63" cy="6" r="1.5" fill="rgba(212,118,60,0.6)">
        <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
      </circle>
      <circle cx="8" cy="20" r="1" fill="rgba(255,180,120,0.5)">
        <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="1s" />
      </circle>
    </svg>
  );
}

function PlayTriangleIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Outer circle */}
      <circle cx="40" cy="40" r="30" stroke="rgba(212,118,60,0.5)" strokeWidth="2" fill="rgba(212,118,60,0.03)" />
      {/* Inner glow ring */}
      <circle cx="40" cy="40" r="24" stroke="rgba(212,118,60,0.2)" strokeWidth="1" fill="none" strokeDasharray="4 6" />
      {/* Play triangle */}
      <polygon points="32,24 32,56 60,40" fill="rgba(212,118,60,0.6)" stroke="rgba(212,118,60,0.8)" strokeWidth="1.5" />
      {/* Glow center */}
      <circle cx="42" cy="40" r="4" fill="rgba(212,118,60,0.15)">
        <animate attributeName="r" values="4;6;4" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.15;0.3;0.15" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ── Pre-computed sparkle data (avoids hydration mismatch from Math.random) ── */
const SPARKLE_DATA = [
  { size: 4, bg: 'rgba(212,118,60,0.6)', top: '22%', left: '12%', shadow: '0 0 8px rgba(212,118,60,0.4)', yDrift: -52, xDrift: 8, dur: 7 },
  { size: 5, bg: 'rgba(255,255,255,0.4)', top: '35%', left: '88%', shadow: '0 0 6px rgba(255,255,255,0.3)', yDrift: -60, xDrift: -14, dur: 9 },
  { size: 3, bg: 'rgba(212,118,60,0.6)', top: '68%', left: '22%', shadow: '0 0 8px rgba(212,118,60,0.4)', yDrift: -45, xDrift: 18, dur: 6 },
  { size: 6, bg: 'rgba(255,255,255,0.4)', top: '50%', left: '75%', shadow: '0 0 6px rgba(255,255,255,0.3)', yDrift: -55, xDrift: -10, dur: 10 },
  { size: 4, bg: 'rgba(212,118,60,0.6)', top: '78%', left: '60%', shadow: '0 0 8px rgba(212,118,60,0.4)', yDrift: -48, xDrift: 15, dur: 8 },
  { size: 5, bg: 'rgba(255,255,255,0.4)', top: '18%', left: '45%', shadow: '0 0 6px rgba(255,255,255,0.3)', yDrift: -65, xDrift: -20, dur: 11 },
  { size: 3, bg: 'rgba(212,118,60,0.6)', top: '60%', left: '92%', shadow: '0 0 8px rgba(212,118,60,0.4)', yDrift: -42, xDrift: 5, dur: 7.5 },
  { size: 6, bg: 'rgba(255,255,255,0.4)', top: '42%', left: '8%', shadow: '0 0 6px rgba(255,255,255,0.3)', yDrift: -58, xDrift: -12, dur: 9.5 },
];

/* ── Main Export ── */
export const Hero3DObjects = memo(function Hero3DObjects() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ perspective: 1200 }}
      aria-hidden="true"
    >
      {/* Camera — top left area */}
      <FloatingObject
        className="top-[8%] left-[6%] sm:top-[12%] sm:left-[8%]"
        delay={0}
        duration={18}
        floatRange={25}
        rotateRange={20}
        size={70}
        glowColor="rgba(212,118,60,0.25)"
      >
        <CameraIcon />
      </FloatingObject>

      {/* Laptop — right side middle */}
      <FloatingObject
        className="top-[20%] right-[5%] sm:top-[18%] sm:right-[8%]"
        delay={2}
        duration={22}
        floatRange={20}
        rotateRange={12}
        size={80}
        glowColor="rgba(120,180,255,0.2)"
      >
        <LaptopIcon />
      </FloatingObject>

      {/* Film Reel — bottom left */}
      <FloatingObject
        className="bottom-[18%] left-[4%] sm:bottom-[22%] sm:left-[10%]"
        delay={1}
        duration={25}
        floatRange={22}
        rotateRange={360}
        size={65}
        glowColor="rgba(212,118,60,0.2)"
      >
        <FilmReelIcon />
      </FloatingObject>

      {/* Dancer — right side lower */}
      <FloatingObject
        className="bottom-[15%] right-[6%] sm:bottom-[20%] sm:right-[10%]"
        delay={3}
        duration={16}
        floatRange={18}
        rotateRange={8}
        size={75}
        glowColor="rgba(255,180,120,0.2)"
      >
        <DancerIcon />
      </FloatingObject>

      {/* Clapperboard — top right-ish */}
      <FloatingObject
        className="top-[6%] right-[25%] sm:top-[8%] sm:right-[22%]"
        delay={4}
        duration={20}
        floatRange={28}
        rotateRange={18}
        size={55}
        glowColor="rgba(212,118,60,0.15)"
      >
        <ClapperboardIcon />
      </FloatingObject>

      {/* Play Button — left side middle */}
      <FloatingObject
        className="top-[45%] left-[3%] sm:top-[40%] sm:left-[5%]"
        delay={5}
        duration={24}
        floatRange={20}
        rotateRange={10}
        size={50}
        glowColor="rgba(212,118,60,0.2)"
      >
        <PlayTriangleIcon />
      </FloatingObject>

      {/* Orbiting sparkles / particles — deterministic values to avoid hydration mismatch */}
      {SPARKLE_DATA.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: s.size,
            height: s.size,
            background: s.bg,
            top: s.top,
            left: s.left,
            boxShadow: s.shadow,
          }}
          animate={{
            y: [0, s.yDrift, 0],
            x: [0, s.xDrift, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: s.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
  );
});
