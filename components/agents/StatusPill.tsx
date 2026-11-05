'use client';

import React from 'react';
import { AGENT_COLORS, PILL } from '@/lib/agents/config';
import { RotateCcw, X, FastForward } from 'lucide-react';

interface StatusPillProps {
  phase: string;
  agentCount: number;
  revealedCount: number;
  totalCount: number;
  elapsedSeconds?: number;
  onSkip: () => void;
  onReplay: () => void;
  onClose: () => void;
}

/**
 * Floating glass status pill at the bottom center of the screen.
 * NOT aria-hidden, role="status" with accessible labels.
 */
export const StatusPill: React.FC<StatusPillProps> = ({
  phase,
  agentCount,
  revealedCount,
  totalCount,
  elapsedSeconds = 8.4,
  onSkip,
  onReplay,
  onClose,
}) => {
  const isDone = phase === 'done' || phase === 'skipped';
  const progressPercent = totalCount > 0 ? Math.min(100, Math.round((revealedCount / totalCount) * 100)) : 0;

  return (
    <aside
      id="agent-status-pill"
      role="status"
      aria-live="polite"
      tabIndex={0}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-70 flex flex-col items-center gap-1.5 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 shadow-[0_8px_32px_rgba(10,6,20,0.65)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
      style={{
        backgroundColor: PILL.bg,
        border: `1px solid ${PILL.border}`,
        backdropFilter: `blur(${PILL.blur})`,
        WebkitBackdropFilter: `blur(${PILL.blur})`,
      }}
    >
      <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono text-white">
        {/* Stacked agent dots */}
        <div className="flex items-center -space-x-1" aria-hidden="true">
          {AGENT_COLORS.slice(0, agentCount).map((color, i) => (
            <span
              key={i}
              className="inline-block h-2 w-2 rounded-full border border-[#0A0614]"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Phase Text & Dynamic Counters */}
        <div className="flex items-center gap-1.5 select-none text-[11px] sm:text-xs">
          {phase === 'boot' && <span className="animate-pulse text-violet-300">Scanning page...</span>}

          {phase !== 'boot' && !isDone && (
            <>
              <span className="font-semibold text-violet-300">{agentCount} agents</span>
              <span className="text-white/40">·</span>
              <span>
                <span className="text-white font-bold">{revealedCount}</span>
                <span className="text-white/70"> / {totalCount} layers</span>
              </span>
            </>
          )}

          {isDone && (
            <span className="text-emerald-300 font-medium">
              Built by {agentCount} agents · {elapsedSeconds.toFixed(1)}s
            </span>
          )}
        </div>

        {/* Interactive Controls */}
        <div className="flex items-center gap-1.5 pl-1 border-l border-violet-500/30">
          {!isDone ? (
            <button
              type="button"
              onClick={onSkip}
              aria-label="Skip page build animation"
              className="inline-flex items-center gap-1 rounded-full bg-violet-950/60 px-2 py-0.5 text-[10px] text-violet-300 hover:bg-violet-900/80 hover:text-white transition-colors"
            >
              <FastForward className="h-3 w-3" />
              <span>Skip</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onReplay}
              aria-label="Replay page build animation"
              className="inline-flex items-center gap-1 rounded-full bg-violet-950/60 px-2.5 py-0.5 text-[10px] text-violet-300 hover:bg-violet-900/80 hover:text-white transition-colors"
            >
              <RotateCcw className="h-2.5 w-2.5" />
              <span>Replay</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close status pill"
            className="rounded-full p-1 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Progress Line */}
      {!isDone && phase !== 'boot' && (
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden" aria-hidden="true">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-400 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </aside>
  );
};

