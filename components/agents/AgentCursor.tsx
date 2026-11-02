'use client';

import React, { forwardRef } from 'react';
import { AGENT_COLORS, AGENT_NAMES } from '@/lib/agents/config';

interface AgentCursorProps {
  index: number;
}

/**
 * Coloured SVG arrow cursor with a small name-tag underneath.
 * Positioned absolutely — GSAP animates the parent wrapper's transform.
 * Also contains a ripple element for click animations.
 */
export const AgentCursor = forwardRef<HTMLDivElement, AgentCursorProps>(
  function AgentCursor({ index }, ref) {
    const color = AGENT_COLORS[index % AGENT_COLORS.length];
    const name = AGENT_NAMES[index % AGENT_NAMES.length];

    return (
      <div
        ref={ref}
        className="absolute pointer-events-none"
        style={{
          willChange: 'transform, opacity',
          opacity: 0,
          zIndex: 62,
        }}
        aria-hidden="true"
      >
        {/* Arrow cursor */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 3L11 20L14 13L21 10L4 3Z"
            fill={color}
            stroke="#F5F0FF"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>

        {/* Name tag */}
        <div
          className="absolute left-5 top-0 rounded px-1 py-px text-[9px] font-bold whitespace-nowrap leading-tight"
          style={{
            backgroundColor: color,
            color: '#FFFFFF',
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
          }}
        >
          {name}
        </div>

        {/* Click ripple (hidden by default, animated by GSAP) */}
        <div
          className="agent-ripple absolute top-[6px] left-[6px] h-6 w-6 rounded-full"
          style={{
            backgroundColor: `${color}50`,
            opacity: 0,
            transform: 'scale(0)',
            willChange: 'transform, opacity',
          }}
        />
      </div>
    );
  },
);

