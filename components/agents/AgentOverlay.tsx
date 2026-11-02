'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AGENT_COLORS } from '@/lib/agents/config';
import { AgentCursor } from './AgentCursor';
import { SelectionBox } from './SelectionBox';
import { SparkleMarks } from './SparkleMarks';
import { WireframeOverlay } from './WireframeOverlay';
import { StatusPill } from './StatusPill';
import { useAgentSequence } from '@/hooks/useAgentSequence';

interface AgentOverlayProps {
  containerRef?: React.RefObject<HTMLElement | null>;
}

/**
 * AgentOverlay — Renders all visual agent artifacts (cursors, selection boxes,
 * wireframes, sparkles) via React portal at document.body.
 * Fixed inset-0, pointer-events-none, z-60, aria-hidden="true" (except status pill).
 */
export const AgentOverlay: React.FC<AgentOverlayProps> = ({ containerRef }) => {
  const [mounted, setMounted] = useState(false);

  const {
    phase,
    layers,
    revealedCount,
    totalCount,
    agentCount,
    isPillVisible,
    skip,
    replay,
    closePill,
    registerCursorRef,
    registerSelectionRef,
    wireframeRef,
    sparkleContainerRef,
    faintLogoRef,
    pillRef,
  } = useAgentSequence(containerRef);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <>
      {/* Decorative Overlay Container (strictly aria-hidden, pointer-events-none) */}
      <div
        id="agent-animation-overlay"
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[60] overflow-hidden"
      >
        {/* Faint "A" watermark mark at screen center */}
        <div
          ref={faintLogoRef}
          className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none select-none"
        >
          <span
            className="text-[180px] sm:text-[260px] font-bold text-violet-400 font-heading"
            style={{ filter: 'drop-shadow(0 0 40px rgba(168, 85, 247, 0.3))' }}
          >
            A
          </span>
        </div>

        {/* Sparkle Marks container */}
        <div ref={sparkleContainerRef} className="absolute inset-0 pointer-events-none">
          <SparkleMarks />
        </div>

        {/* Wireframe & Blueprint Overlay */}
        <div ref={wireframeRef} className="absolute inset-0 pointer-events-none">
          <WireframeOverlay layers={layers} />
        </div>

        {/* Selection Boxes (one per measured layer) */}
        {layers.map((layer) => (
          <SelectionBox
            key={layer.id}
            id={layer.id}
            label={layer.label}
            ref={(el) => registerSelectionRef(layer.id, el)}
          />
        ))}

        {/* Agent Cursors (6 desktop, 3 mobile) */}
        {AGENT_COLORS.map((_, index) => (
          <AgentCursor
            key={index}
            index={index}
            ref={(el) => registerCursorRef(index, el)}
          />
        ))}
      </div>

      {/* Accessible Interactive Status Pill (NOT aria-hidden) */}
      {isPillVisible && (
        <div ref={pillRef}>
          <StatusPill
            phase={phase}
            agentCount={agentCount}
            revealedCount={revealedCount}
            totalCount={totalCount}
            onSkip={skip}
            onReplay={replay}
            onClose={closePill}
          />
        </div>
      )}
    </>,
    document.body
  );
};

