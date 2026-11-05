'use client';

import { useState } from 'react';
import { Target, Video, Globe, Sparkles, Cpu, Activity, Zap } from 'lucide-react';

interface EngineNode {
  id: string;
  title: string;
  category: string;
  metric: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  position: 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right';
}

const NODES: EngineNode[] = [
  {
    id: 'meta-ads',
    title: 'Meta Performance Ads',
    category: 'Acquisition',
    metric: '₹100–150 CPL',
    icon: Target,
    color: '#A855F7',
    position: 'top-left',
  },
  {
    id: 'cinema-4k',
    title: '4K Cinema Filming',
    category: 'Production',
    metric: 'Cinema 4K 10-Bit',
    icon: Video,
    color: '#EC4899',
    position: 'bottom-left',
  },
  {
    id: 'web-platforms',
    title: 'Conversion Platforms',
    category: 'Engineering',
    metric: 'Next.js 16 · 99 Perf',
    icon: Globe,
    color: '#3B82F6',
    position: 'top-right',
  },
  {
    id: 'retention-edit',
    title: 'Retention Motion Edit',
    category: 'Creative',
    metric: '87% Hook Rate',
    icon: Sparkles,
    color: '#F59E0B',
    position: 'bottom-right',
  },
];

export function HeroGrowthEngine() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div
      data-agent-layer="hero-growth-engine"
      data-agent-order="7"
      data-agent-type="card"
      data-agent-label="Growth Engine Visualizer"
      className="relative mx-auto mt-14 w-full max-w-5xl select-none px-2 sm:mt-18"
    >
      {/* ── AMBIENT CINEMATIC LIGHT RAY (Matches video's top-right light shaft) ── */}
      <div
        className="pointer-events-none absolute -top-40 right-4 sm:-top-60 sm:right-10 h-[500px] w-[260px] sm:w-[420px] origin-top-right rotate-[-24deg] rounded-full bg-gradient-to-b from-[#F97316]/25 via-[#A855F7]/20 to-transparent blur-3xl animate-ray-sweep"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[#7C3AED]/15 blur-[100px]"
        aria-hidden="true"
      />

      {/* Main Container Card */}
      <div className="relative overflow-hidden rounded-3xl border border-[#7C3AED]/25 bg-gradient-to-b from-[#160B2C]/90 via-[#0E061E]/95 to-[#160B2C]/90 p-6 sm:p-10 shadow-[0_16px_60px_-15px_rgba(124,58,237,0.25)] backdrop-blur-xl">
        
        {/* Background circuit grid lines */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-[0.06]" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #A855F7 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
          aria-hidden="true" 
        />

        {/* Header Ribbon */}
        <div className="relative z-10 mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-[#7C3AED]/15 pb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#10B981]" />
            </span>
            <span className="font-mono text-xs font-semibold tracking-wider text-white uppercase">
              Ampledia Autonomous Growth Engine
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#7C3AED]/30 bg-[#241445]/60 px-3 py-1 font-mono text-[11px] text-white">
            <Activity className="h-3.5 w-3.5 text-[#A855F7] animate-pulse" />
            <span>4 Live Disciplines Connected</span>
          </div>
        </div>

        {/* Interactive Circuit Core Display */}
        <div className="relative z-10 flex min-h-[380px] sm:min-h-[420px] items-center justify-center">
          
          {/* SVG Animated Circuit Traces (Desktop/Tablet) */}
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
            viewBox="0 0 800 420"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="traceGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#C084FC" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0.2" />
              </linearGradient>

              {/* Glowing filter for pulses */}
              <filter id="pulseGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Trace 1: Top-Left Node to Center Core */}
            <path
              id="path-tl"
              d="M 180 90 L 320 90 L 370 190 L 400 200"
              stroke={activeNode === 'meta-ads' ? '#A855F7' : 'rgba(168, 85, 247, 0.25)'}
              strokeWidth={activeNode === 'meta-ads' ? '2.5' : '1.5'}
              strokeDasharray={activeNode === 'meta-ads' ? 'none' : '4 4'}
              className="transition-colors duration-300"
            />
            {/* Animated Light Packet along Trace 1 */}
            <circle r="4" fill="#C084FC" filter="url(#pulseGlowFilter)">
              <animateMotion
                dur={activeNode === 'meta-ads' ? '1.2s' : '2.8s'}
                repeatCount="indefinite"
                path="M 180 90 L 320 90 L 370 190 L 400 200"
              />
            </circle>

            {/* Trace 2: Bottom-Left Node to Center Core */}
            <path
              id="path-bl"
              d="M 180 330 L 320 330 L 370 230 L 400 220"
              stroke={activeNode === 'cinema-4k' ? '#EC4899' : 'rgba(168, 85, 247, 0.25)'}
              strokeWidth={activeNode === 'cinema-4k' ? '2.5' : '1.5'}
              strokeDasharray={activeNode === 'cinema-4k' ? 'none' : '4 4'}
              className="transition-colors duration-300"
            />
            {/* Animated Light Packet along Trace 2 */}
            <circle r="4" fill="#F472B6" filter="url(#pulseGlowFilter)">
              <animateMotion
                dur={activeNode === 'cinema-4k' ? '1.2s' : '3.2s'}
                repeatCount="indefinite"
                path="M 180 330 L 320 330 L 370 230 L 400 220"
              />
            </circle>

            {/* Trace 3: Top-Right Node to Center Core */}
            <path
              id="path-tr"
              d="M 620 90 L 480 90 L 430 190 L 400 200"
              stroke={activeNode === 'web-platforms' ? '#3B82F6' : 'rgba(168, 85, 247, 0.25)'}
              strokeWidth={activeNode === 'web-platforms' ? '2.5' : '1.5'}
              strokeDasharray={activeNode === 'web-platforms' ? 'none' : '4 4'}
              className="transition-colors duration-300"
            />
            {/* Animated Light Packet along Trace 3 */}
            <circle r="4" fill="#60A5FA" filter="url(#pulseGlowFilter)">
              <animateMotion
                dur={activeNode === 'web-platforms' ? '1.2s' : '2.6s'}
                repeatCount="indefinite"
                path="M 620 90 L 480 90 L 430 190 L 400 200"
              />
            </circle>

            {/* Trace 4: Bottom-Right Node to Center Core */}
            <path
              id="path-br"
              d="M 620 330 L 480 330 L 430 230 L 400 220"
              stroke={activeNode === 'retention-edit' ? '#F59E0B' : 'rgba(168, 85, 247, 0.25)'}
              strokeWidth={activeNode === 'retention-edit' ? '2.5' : '1.5'}
              strokeDasharray={activeNode === 'retention-edit' ? 'none' : '4 4'}
              className="transition-colors duration-300"
            />
            {/* Animated Light Packet along Trace 4 */}
            <circle r="4" fill="#FBBF24" filter="url(#pulseGlowFilter)">
              <animateMotion
                dur={activeNode === 'retention-edit' ? '1.2s' : '3s'}
                repeatCount="indefinite"
                path="M 620 330 L 480 330 L 430 230 L 400 220"
              />
            </circle>
          </svg>

          {/* ── CENTER CORE: THE PROCESSOR ── */}
          <div className="relative z-20 flex flex-col items-center">
            {/* Pulsing Concentric Aura */}
            <div className="absolute -inset-4 rounded-3xl bg-[#7C3AED]/20 blur-xl animate-pulse" />
            
            <div className="relative flex h-28 w-28 sm:h-36 sm:w-36 flex-col items-center justify-center rounded-2xl border-2 border-[#A855F7] bg-[#1F103D] p-3 text-center shadow-2xl shadow-[#7C3AED]/50 animate-pulse-glow">
              {/* Corner Pin Accents */}
              <span className="absolute -top-1 -left-1 h-2 w-2 rounded-full bg-[#DDD6FE]" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#DDD6FE]" />
              <span className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-[#DDD6FE]" />
              <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-[#DDD6FE]" />

              <div className="mb-1.5 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#C084FC] text-white shadow-md">
                <Cpu className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
              </div>
              <span className="font-heading text-xs sm:text-sm font-extrabold tracking-tight text-white">
                AMPLEDIA
              </span>
              <span className="mt-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#C084FC]">
                CORE AI
              </span>
            </div>
            
            <div className="mt-3 flex items-center gap-1.5 rounded-full border border-[#7C3AED]/30 bg-[#1A0F33]/80 px-3 py-0.5 text-[10px] font-mono text-white">
              <Zap className="h-3 w-3 text-[#F59E0B]" />
              <span>Full-Stack Pipeline Active</span>
            </div>
          </div>

          {/* ── 4 SURROUNDING INTERACTIVE NODES ── */}
          <div className="absolute inset-0 flex flex-col justify-between sm:block">
            {NODES.map((node) => {
              const Icon = node.icon;
              const isHovered = activeNode === node.id;

              // Absolute positioning classes for desktop
              const posClasses = {
                'top-left': 'sm:absolute sm:top-6 sm:left-4',
                'bottom-left': 'sm:absolute sm:bottom-6 sm:left-4',
                'top-right': 'sm:absolute sm:top-6 sm:right-4',
                'bottom-right': 'sm:absolute sm:bottom-6 sm:right-4',
              }[node.position];

              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  className={`group relative flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 transition-all duration-300 sm:w-64 backdrop-blur-md ${posClasses} ${
                    isHovered
                      ? 'scale-105 border-[#A855F7] bg-[#241445] shadow-xl shadow-[#7C3AED]/30'
                      : 'border-[#7C3AED]/20 bg-[#1A0F33]/80 hover:border-[#7C3AED]/40 hover:bg-[#1A0F33]'
                  }`}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${node.color}20`, color: node.color }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-white">
                        {node.category}
                      </span>
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: node.color }}
                      />
                    </div>
                    <div className="truncate font-heading text-xs font-bold text-white">
                      {node.title}
                    </div>
                    <div className="mt-0.5 font-mono text-[11px] font-semibold text-[#DDD6FE]">
                      {node.metric}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Status Ticker */}
        <div className="relative z-10 mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#7C3AED]/15 pt-4 text-xs font-mono text-white">
          <div className="flex items-center gap-4">
            <span className="text-[#C084FC]">Status: Synchronized</span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:inline">Zero Outsourced Production</span>
          </div>
          <div className="text-[11px] text-white">
            Hover any node to inspect signal pipeline
          </div>
        </div>

      </div>
    </div>
  );
}

export default HeroGrowthEngine;
