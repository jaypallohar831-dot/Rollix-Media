'use client';

import React from 'react';
import type { LayerInfo } from '@/lib/agents/config';

interface WireframeOverlayProps {
  layers: LayerInfo[];
}

/**
 * Blueprint Phase Wireframe:
 * - 1px dashed outline (#A855F7 @ 60%) at layer bbox
 * - Hairline alignment guides at boundaries
 * - Tiny dimension label (W x H)
 * - I-beam cursor and name chip for text layers
 * - Violet glow scan bar sweeping top to bottom
 */
export const WireframeOverlay: React.FC<WireframeOverlayProps> = ({ layers }) => {
  return (
    <div
      id="agent-wireframe-container"
      className="absolute inset-0 pointer-events-none overflow-hidden z-60"
      aria-hidden="true"
      style={{ opacity: 0, willChange: 'opacity' }}
    >
      {/* 2px Violet Glow Scan Bar */}
      <div
        id="agent-scan-bar"
        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#A855F7] to-transparent shadow-[0_0_12px_#A855F7]"
        style={{
          top: 0,
          opacity: 0,
          transform: 'translateY(0)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Blueprint elements per layer */}
      {layers.map((layer) => {
        const { bbox, id, type, label } = layer;
        const width = Math.round(bbox.width);
        const height = Math.round(bbox.height);

        return (
          <div
            key={id}
            className="agent-wireframe-box absolute"
            style={{
              top: `${Math.round(bbox.top + window.scrollY)}px`,
              left: `${Math.round(bbox.left + window.scrollX)}px`,
              width: `${width}px`,
              height: `${height}px`,
              border: '1px dashed rgba(168, 85, 247, 0.6)',
              backgroundColor: type === 'image' || type === 'card' ? 'rgba(42, 33, 71, 0.45)' : 'transparent',
            }}
          >
            {/* Dimension Label */}
            <span
              className="absolute -top-4 right-0 font-mono text-[9px] text-white/80 tracking-tighter"
              style={{ fontFamily: 'var(--font-inter, monospace)' }}
            >
              {width} × {height}
            </span>

            {/* Hairline alignment cross-guides (Desktop subtle) */}
            <div className="hidden sm:block absolute -left-12 -right-12 top-0 h-px bg-[#A855F7]/15 pointer-events-none" />
            <div className="hidden sm:block absolute -left-12 -right-12 bottom-0 h-px bg-[#A855F7]/15 pointer-events-none" />

            {/* I-beam & Type Chip for text layers */}
            {type === 'text' && (
              <div className="absolute top-1 left-1.5 flex items-center gap-1">
                <span className="w-0.5 h-3 bg-[#A855F7] animate-pulse" />
                <span className="rounded bg-[#1A0F33] px-1 py-0.2 text-[8px] font-mono text-violet-300 border border-[#A855F7]/30">
                  {label}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

