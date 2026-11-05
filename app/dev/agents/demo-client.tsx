'use client';

import React, { useRef } from 'react';
import { AgentOverlay } from '@/components/agents/AgentOverlay';

export default function DevAgentsDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#0A0614] text-white px-6 py-16 sm:px-12 sm:py-24 font-sans select-none"
    >
      {/* Portalled Agent Engine */}
      <AgentOverlay containerRef={containerRef} />

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Layer 1: Eyebrow */}
        <div
          data-agent-layer="demo-eyebrow"
          data-agent-order="1"
          data-agent-type="text"
          data-agent-label="Eyebrow"
          className="inline-block rounded-full border border-violet-500/20 bg-violet-950/40 px-3.5 py-1 text-xs text-violet-300 font-mono"
        >
          ENGINE STAGE DEMO // STEP 1
        </div>

        {/* Layer 2: H1 Line 1 */}
        <h1
          data-agent-layer="demo-h1-1"
          data-agent-order="2"
          data-agent-type="text"
          data-agent-label="H1 line 1"
          className="text-4xl sm:text-6xl font-bold font-heading tracking-tight"
        >
          AI Agents Constructing
        </h1>

        {/* Layer 3: H1 Line 2 Gradient */}
        <div
          data-agent-layer="demo-h1-2"
          data-agent-order="3"
          data-agent-type="text"
          data-agent-label="H1 line 2"
          className="text-4xl sm:text-6xl font-bold font-heading bg-gradient-to-r from-violet-400 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent"
        >
          High-Velocity Experiences.
        </div>

        {/* Layer 4: Subtitle */}
        <p
          data-agent-layer="demo-subtitle"
          data-agent-order="4"
          data-agent-type="text"
          data-agent-label="Subtitle"
          className="max-w-2xl text-lg text-white leading-relaxed"
        >
          This isolated playground demonstrates the full multi-agent swarm architecture:
          boot clustering, seeded scatter, blueprint wireframing, and synchronized element reveals.
        </p>

        {/* Layer 5, 6, 7: 3 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            data-agent-layer="demo-card-1"
            data-agent-order="5"
            data-agent-type="card"
            data-agent-label="Card Alpha"
            className="rounded-2xl border border-violet-500/20 bg-[#1A0F33]/80 p-6 backdrop-blur-xs"
          >
            <div className="h-8 w-8 rounded-lg bg-violet-600/30 text-violet-300 flex items-center justify-center font-bold mb-3">
              01
            </div>
            <h3 className="font-semibold text-lg mb-1">Architecture</h3>
            <p className="text-xs text-white">Parallel worker queue with single GSAP master timeline.</p>
          </div>

          <div
            data-agent-layer="demo-card-2"
            data-agent-order="6"
            data-agent-type="card"
            data-agent-label="Card Beta"
            className="rounded-2xl border border-violet-500/20 bg-[#1A0F33]/80 p-6 backdrop-blur-xs"
          >
            <div className="h-8 w-8 rounded-lg bg-cyan-600/30 text-cyan-300 flex items-center justify-center font-bold mb-3">
              02
            </div>
            <h3 className="font-semibold text-lg mb-1">Precision</h3>
            <p className="text-xs text-white">Cached bounding box reading with zero layout thrashing.</p>
          </div>

          <div
            data-agent-layer="demo-card-3"
            data-agent-order="7"
            data-agent-type="card"
            data-agent-label="Card Gamma"
            className="rounded-2xl border border-violet-500/20 bg-[#1A0F33]/80 p-6 backdrop-blur-xs"
          >
            <div className="h-8 w-8 rounded-lg bg-pink-600/30 text-pink-300 flex items-center justify-center font-bold mb-3">
              03
            </div>
            <h3 className="font-semibold text-lg mb-1">Accessibility</h3>
            <p className="text-xs text-white">Strict aria-hidden decoration, polite live status pill, Esc to skip.</p>
          </div>
        </div>

        {/* Layer 8 & 9: CTAs */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            data-agent-layer="demo-cta-primary"
            data-agent-order="8"
            data-agent-type="button"
            data-agent-label="CTA Primary"
            className="rounded-full bg-[#7C3AED] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(168,85,247,0.5)]"
          >
            Deploy With Agents
          </button>

          <button
            data-agent-layer="demo-cta-secondary"
            data-agent-order="9"
            data-agent-type="button"
            data-agent-label="CTA Secondary"
            className="rounded-full border border-violet-500/30 bg-[#1A0F33] px-6 py-3.5 text-sm font-medium text-violet-200"
          >
            Inspect Engine Specs
          </button>
        </div>

        {/* Layer 10: Image/Media Placeholder */}
        <div
          data-agent-layer="demo-media"
          data-agent-order="10"
          data-agent-type="image"
          data-agent-label="Media Preview"
          className="h-44 w-full rounded-2xl border border-violet-500/25 bg-[#1A0F33] flex items-center justify-center text-xs font-mono text-violet-400"
        >
          [MEDIA FRAME · BBOX TRACKER]
        </div>

        {/* Layer 11: Input Box */}
        <div
          data-agent-layer="demo-input"
          data-agent-order="11"
          data-agent-type="input"
          data-agent-label="Input field"
          className="rounded-xl border border-violet-500/20 bg-[#120826] p-4 text-xs font-mono text-[#B7A9D6]"
        >
          &gt; prompt: "Scale agency leads in Rajasthan via digital marketing"
        </div>

        {/* Layer 12: Footer Micro badge */}
        <div
          data-agent-layer="demo-footer"
          data-agent-order="12"
          data-agent-type="text"
          data-agent-label="Status Tag"
          className="text-[11px] font-mono text-stone-500"
        >
          Ampledia Agentic Engine v2.0 · Bhilwara Studio
        </div>
      </div>
    </div>
  );
}

