'use client';

import { memo } from 'react';

/**
 * Hero3DCamera — Cinematic floating 3D camera using pure CSS.
 *
 * Uses CSS transforms + perspective for the 3D look and CSS
 * keyframes for the floating animation. Zero JS, zero WebGL,
 * all compositor thread.
 */
export const Hero3DCamera = memo(function Hero3DCamera() {
  return (
    <div
      className="absolute inset-0 z-[5] pointer-events-none flex items-center justify-center"
      aria-hidden="true"
      style={{ perspective: '800px' }}
    >
      <div
        className="relative"
        style={{
          width: 180,
          height: 110,
          transformStyle: 'preserve-3d',
          animation: 'cameraFloat 8s ease-in-out infinite',
        }}
      >
        {/* Camera body — front */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #111 100%)',
            boxShadow: '0 0 60px rgba(212,118,60,0.12), 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
            transform: 'translateZ(12px)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
        />
        {/* Camera body — back */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: '#111',
            transform: 'translateZ(-12px)',
          }}
        />
        {/* Camera body — top */}
        <div
          className="absolute left-0 right-0"
          style={{
            height: 24,
            top: -12,
            background: 'linear-gradient(180deg, #222, #1a1a1a)',
            transform: 'rotateX(90deg)',
            transformOrigin: 'bottom',
          }}
        />

        {/* Lens outer ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 64,
            height: 64,
            top: '50%',
            left: '30%',
            transform: 'translate(-50%, -50%) translateZ(18px)',
            background: 'linear-gradient(135deg, #222 0%, #111 100%)',
            border: '2.5px solid rgba(212,118,60,0.35)',
            boxShadow: '0 0 30px rgba(212,118,60,0.15), inset 0 0 20px rgba(0,0,0,0.5)',
          }}
        >
          {/* Lens inner — glass */}
          <div
            className="absolute rounded-full"
            style={{
              width: 42,
              height: 42,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle at 30% 30%, rgba(120,180,255,0.12) 0%, #080808 40%, rgba(212,118,60,0.06) 100%)',
              border: '1.5px solid rgba(212,118,60,0.25)',
              boxShadow: 'inset 0 0 15px rgba(0,0,0,0.6)',
            }}
          >
            {/* Lens reflection highlight */}
            <div
              className="absolute rounded-full"
              style={{
                width: 10,
                height: 10,
                top: '22%',
                left: '28%',
                background: 'rgba(255,255,255,0.2)',
                filter: 'blur(2px)',
              }}
            />
            {/* Inner aperture circle */}
            <div
              className="absolute rounded-full"
              style={{
                width: 14,
                height: 14,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                border: '1px solid rgba(212,118,60,0.15)',
                animation: 'pulseCore 3s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        {/* Viewfinder bump */}
        <div
          className="absolute rounded-sm"
          style={{
            width: 28,
            height: 18,
            top: -6,
            left: 30,
            transform: 'translateZ(14px)',
            background: 'linear-gradient(180deg, #252525, #1a1a1a)',
            border: '1px solid rgba(255,255,255,0.04)',
            borderRadius: 4,
          }}
        />

        {/* Shutter button */}
        <div
          className="absolute rounded-full"
          style={{
            width: 14,
            height: 14,
            top: -8,
            right: 30,
            transform: 'translateZ(14px)',
            background: 'var(--cinematic-orange, #d4763c)',
            borderRadius: '50%',
            boxShadow: '0 0 16px rgba(212,118,60,0.4), inset 0 -2px 4px rgba(0,0,0,0.3)',
          }}
        />

        {/* Recording indicator — pulsing red dot */}
        <div
          className="absolute rounded-full"
          style={{
            width: 6,
            height: 6,
            top: -4,
            right: 55,
            transform: 'translateZ(14px)',
            background: '#ff4040',
            boxShadow: '0 0 8px rgba(255,64,64,0.6)',
            animation: 'pulseCore 2s ease-in-out infinite',
          }}
        />

        {/* Side grip texture */}
        <div
          className="absolute"
          style={{
            width: 16,
            height: 50,
            top: '50%',
            right: 8,
            transform: 'translateY(-50%) translateZ(14px)',
            background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 2px, transparent 2px, transparent 5px)',
            borderRadius: 3,
          }}
        />
      </div>
    </div>
  );
});
