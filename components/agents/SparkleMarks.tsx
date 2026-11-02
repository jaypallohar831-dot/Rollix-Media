'use client';

import React from 'react';
import { COUNTS, seededRandom } from '@/lib/agents/config';

interface SparkleMarksProps {
  count?: number;
}

/**
 * 12 '+' sparkle marks that pop during the scatter phase (scale 0 -> 1 -> 0).
 */
export const SparkleMarks: React.FC<SparkleMarksProps> = ({ count = COUNTS.sparkles }) => {
  const sparkles = Array.from({ length: count }, (_, i) => {
    // Generate deterministic spread across screen coordinates
    const left = `${Math.round(10 + seededRandom(i * 3 + 1) * 80)}%`;
    const top = `${Math.round(15 + seededRandom(i * 7 + 2) * 70)}%`;
    const size = Math.round(10 + seededRandom(i * 5 + 3) * 6); // 10px - 16px

    return { id: i, left, top, size };
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-60" aria-hidden="true">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="agent-sparkle absolute flex items-center justify-center font-mono font-light select-none text-[#A855F7]"
          style={{
            left: s.left,
            top: s.top,
            fontSize: `${s.size}px`,
            opacity: 0,
            transform: 'scale(0)',
            willChange: 'transform, opacity',
            textShadow: '0 0 8px rgba(168, 85, 247, 0.8)',
          }}
        >
          +
        </div>
      ))}
    </div>
  );
};

