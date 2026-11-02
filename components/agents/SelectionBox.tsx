'use client';

import React, { forwardRef } from 'react';
import { SELECTION } from '@/lib/agents/config';

interface SelectionBoxProps {
  id: string;
  label: string;
  color?: string;
}

/**
 * Animated selection rectangle that wraps an active layer during build.
 * Features 8 square handles at corners + edge midpoints and a label chip.
 * Scaled and faded via GSAP using transform/opacity only.
 */
export const SelectionBox = forwardRef<HTMLDivElement, SelectionBoxProps>(
  function SelectionBox({ id, label, color = SELECTION.color }, ref) {
    const handleStyle: React.CSSProperties = {
      width: `${SELECTION.handleSize}px`,
      height: `${SELECTION.handleSize}px`,
      backgroundColor: SELECTION.handleColor,
      border: `1px solid ${color}`,
      position: 'absolute',
      pointerEvents: 'none',
    };

    const half = SELECTION.handleSize / 2;

    return (
      <div
        ref={ref}
        id={`selection-${id}`}
        className="selection-box absolute pointer-events-none"
        style={{
          border: `1.5px solid ${color}`,
          backgroundColor: `${color}15`,
          opacity: 0,
          transformOrigin: 'top left',
          willChange: 'transform, opacity',
          zIndex: 61,
        }}
        aria-hidden="true"
      >
        {/* Label Chip (matches reference design: colored tag on top-left) */}
        <div
          className="absolute -top-5 left-0 px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider font-mono uppercase whitespace-nowrap shadow-sm"
          style={{
            backgroundColor: color,
            color: '#FFFFFF',
          }}
        >
          {label}
        </div>

        {/* 8 Handles: 4 Corners + 4 Midpoints (Filled white squares with colored border) */}
        {/* Top-Left */}
        <div style={{ ...handleStyle, top: -half, left: -half }} />
        {/* Top-Center */}
        <div style={{ ...handleStyle, top: -half, left: `calc(50% - ${half}px)` }} />
        {/* Top-Right */}
        <div style={{ ...handleStyle, top: -half, right: -half }} />
        
        {/* Middle-Left */}
        <div style={{ ...handleStyle, top: `calc(50% - ${half}px)`, left: -half }} />
        {/* Middle-Right */}
        <div style={{ ...handleStyle, top: `calc(50% - ${half}px)`, right: -half }} />

        {/* Bottom-Left */}
        <div style={{ ...handleStyle, bottom: -half, left: -half }} />
        {/* Bottom-Center */}
        <div style={{ ...handleStyle, bottom: -half, left: `calc(50% - ${half}px)` }} />
        {/* Bottom-Right */}
        <div style={{ ...handleStyle, bottom: -half, right: -half }} />
      </div>
    );
  }
);

