'use client';

import React, { useState } from 'react';
import { MagneticButton } from '@/components/magnetic-button';
import { BRAND } from '@/lib/brand';
import {
  Compass,
  Sparkles,
  TrendingUp,
  MessageCircle,
  ArrowRight,
  Send,
} from 'lucide-react';
import type { PortfolioItem } from '@/lib/portfolio';

interface HeroSectionProps {
  portfolioProjects?: PortfolioItem[];
}

export function HeroSection({ portfolioProjects = [] }: HeroSectionProps) {
  const [inputMessage, setInputMessage] = useState('');

  const targetMessage = 'We want to scale our brand with Ampledia';

  const handleWhatsAppSend = () => {
    const textToSend = inputMessage || targetMessage;
    const url = `${BRAND.whatsapp}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="hero"
      aria-label="Ampledia Hero — Digital, Creative, Growth"
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#0A0614] pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28"
    >
      {/* Restrained subtle ambient background illumination */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden z-0"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-violet-900/15 blur-[140px] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-purple-600/10 blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* ─── LEFT COLUMN: Brand Mandate & Typography ─── */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Tagline Eyebrow */}
            <div
              data-agent-layer="hero-eyebrow"
              data-agent-order="1"
              data-agent-type="text"
              data-agent-label="Eyebrow"
              className="mb-5 sm:mb-6 inline-flex items-center gap-2.5 rounded-full border border-violet-500/20 bg-violet-950/40 px-3.5 py-1.5 backdrop-blur-md"
            >
              <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-violet-300">
                Digital · Creative · Growth
              </span>
            </div>

            {/* Real SEO H1 Headline */}
            <h1 className="font-heading text-[clamp(2.5rem,6vw,5.15rem)] font-bold tracking-[-0.03em] leading-[1.08] text-[#F5F0FF]">
              <span
                data-agent-layer="hero-h1-line1"
                data-agent-order="2"
                data-agent-type="text"
                data-agent-label="H1 Line 1"
                className="block"
              >
                Your Brand
              </span>
              <span
                data-agent-layer="hero-h1-line2"
                data-agent-order="3"
                data-agent-type="text"
                data-agent-label="H1 Gradient"
                className="relative inline-block mt-1 sm:mt-2"
              >
                <span className="bg-gradient-to-r from-violet-300 via-purple-200 to-fuchsia-300 bg-clip-text text-transparent">
                  Deserves More.
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p
              data-agent-layer="hero-subtitle"
              data-agent-order="4"
              data-agent-type="text"
              data-agent-label="Subtitle"
              className="mt-6 sm:mt-7 max-w-[540px] text-base leading-[1.65] text-[#B7A9D6] sm:text-lg sm:leading-[1.7] font-normal"
            >
              A high-performance creative agency blending strategic videography,
              custom web architecture, and data-driven marketing to scale your brand
              with undisputed market authority.
            </p>

            {/* 3 Pillar Chips */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-[620px]">
              <div
                data-agent-layer="hero-pillar-1"
                data-agent-order="5"
                data-agent-type="card"
                data-agent-label="Pillar: Strategy"
                className="flex items-center gap-3 rounded-2xl border border-violet-500/15 bg-[#1A0F33]/80 p-3 sm:p-3.5 backdrop-blur-xs transition-colors hover:border-violet-500/35"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-600/20 text-violet-300">
                  <Compass className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#F5F0FF]">Strategy</p>
                  <p className="text-[11px] text-[#B7A9D6]">Ideas that work</p>
                </div>
              </div>

              <div
                data-agent-layer="hero-pillar-2"
                data-agent-order="6"
                data-agent-type="card"
                data-agent-label="Pillar: Creativity"
                className="flex items-center gap-3 rounded-2xl border border-violet-500/15 bg-[#1A0F33]/80 p-3 sm:p-3.5 backdrop-blur-xs transition-colors hover:border-violet-500/35"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-600/20 text-violet-300">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#F5F0FF]">Creativity</p>
                  <p className="text-[11px] text-[#B7A9D6]">Design that speaks</p>
                </div>
              </div>

              <div
                data-agent-layer="hero-pillar-3"
                data-agent-order="7"
                data-agent-type="card"
                data-agent-label="Pillar: Growth"
                className="flex items-center gap-3 rounded-2xl border border-violet-500/15 bg-[#1A0F33]/80 p-3 sm:p-3.5 backdrop-blur-xs transition-colors hover:border-violet-500/35"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-600/20 text-violet-300">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#F5F0FF]">Growth</p>
                  <p className="text-[11px] text-[#B7A9D6]">Results that matter</p>
                </div>
              </div>
            </div>

            {/* CTA Group with Magnetic Button */}
            <div className="mt-9 sm:mt-11 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <div
                data-agent-layer="hero-cta-primary"
                data-agent-order="8"
                data-agent-type="button"
                data-agent-label="CTA: WhatsApp"
              >
                <MagneticButton
                  href={BRAND.whatsapp}
                  strength={28}
                  className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-[#7C3AED] px-8 py-4 text-sm font-semibold tracking-wide text-white shadow-[0_0_28px_-4px_rgba(168,85,247,0.5)] transition-all duration-300 hover:bg-[#6D28D9] hover:shadow-[0_0_36px_-2px_rgba(168,85,247,0.7)]"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Let&apos;s Build Together</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </MagneticButton>
              </div>

              <div
                data-agent-layer="hero-cta-secondary"
                data-agent-order="9"
                data-agent-type="button"
                data-agent-label="CTA: Portfolio"
              >
                <MagneticButton
                  href="/portfolio"
                  strength={18}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-violet-500/25 bg-[#1A0F33]/60 px-7 py-4 text-sm font-medium text-[#F5F0FF] backdrop-blur-md transition-all duration-300 hover:border-violet-500/50 hover:bg-[#241445]"
                >
                  <span>View Portfolio</span>
                </MagneticButton>
              </div>
            </div>

          </div>

          {/* ─── RIGHT COLUMN: Neon Glow Laptop / Mountain Art Panel ─── */}
          <div
            data-agent-layer="hero-visual"
            data-agent-order="12"
            data-agent-type="image"
            data-agent-label="Studio Panel"
            className="lg:col-span-5 w-full"
          >
            <div className="relative rounded-[24px] sm:rounded-[28px] border border-violet-500/25 bg-[#1A0F33] p-4 sm:p-6 shadow-[0_0_36px_-8px_rgba(124,58,237,0.35)] backdrop-blur-xl">
              
              {/* Laptop Display Top Chrome */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-violet-500/15">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-[11px] font-mono tracking-wide text-[#B7A9D6]">
                    ampledia.in/studio
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-violet-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Bhilwara Studio Online
                </span>
              </div>

              {/* Vector Mountain Art Screen */}
              <div className="relative mt-4 h-48 sm:h-56 w-full overflow-hidden rounded-xl border border-violet-500/20 bg-[#0E071D]">
                
                {/* SVG Geometric Neon Mountain Art */}
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 400 220"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="skyGrad" x1="200" y1="0" x2="200" y2="150" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1A0F33" stopOpacity="0.4" />
                      <stop offset="1" stopColor="#0A0614" stopOpacity="0.9" />
                    </linearGradient>
                    <linearGradient id="sunGlow" x1="200" y1="40" x2="200" y2="120" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#C084FC" />
                      <stop offset="0.6" stopColor="#7C3AED" />
                      <stop offset="1" stopColor="#0A0614" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="mountainFront" x1="200" y1="90" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3B176B" />
                      <stop offset="1" stopColor="#120826" />
                    </linearGradient>
                    <linearGradient id="mountainBack" x1="200" y1="70" x2="200" y2="180" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#581C87" />
                      <stop offset="1" stopColor="#1E0B38" />
                    </linearGradient>
                  </defs>

                  {/* Sky background */}
                  <rect width="400" height="220" fill="url(#skyGrad)" />

                  {/* Radiant Sun/Horizon Aperture */}
                  <circle cx="200" cy="115" r="48" fill="url(#sunGlow)" />
                  <circle cx="200" cy="115" r="46" stroke="#A855F7" strokeWidth="1.2" strokeOpacity="0.7" />

                  {/* Perspective Horizon Grid Lines */}
                  <line x1="0" y1="180" x2="400" y2="180" stroke="#7C3AED" strokeWidth="0.75" strokeOpacity="0.3" />
                  <line x1="0" y1="195" x2="400" y2="195" stroke="#7C3AED" strokeWidth="0.75" strokeOpacity="0.4" />
                  <line x1="0" y1="210" x2="400" y2="210" stroke="#7C3AED" strokeWidth="1" strokeOpacity="0.5" />
                  
                  <line x1="200" y1="180" x2="40" y2="220" stroke="#7C3AED" strokeWidth="0.75" strokeOpacity="0.4" />
                  <line x1="200" y1="180" x2="120" y2="220" stroke="#7C3AED" strokeWidth="0.75" strokeOpacity="0.4" />
                  <line x1="200" y1="180" x2="200" y2="220" stroke="#7C3AED" strokeWidth="0.75" strokeOpacity="0.5" />
                  <line x1="200" y1="180" x2="280" y2="220" stroke="#7C3AED" strokeWidth="0.75" strokeOpacity="0.4" />
                  <line x1="200" y1="180" x2="360" y2="220" stroke="#7C3AED" strokeWidth="0.75" strokeOpacity="0.4" />

                  {/* Back Mountain Ridge */}
                  <path
                    d="M30 180L110 95L180 145L270 75L370 180H30Z"
                    fill="url(#mountainBack)"
                    stroke="#A855F7"
                    strokeWidth="1.25"
                    strokeOpacity="0.6"
                  />

                  {/* Front Mountain Peak */}
                  <path
                    d="M100 180L200 90L290 180H100Z"
                    fill="url(#mountainFront)"
                    stroke="#C084FC"
                    strokeWidth="1.5"
                  />

                  {/* Peak Ridge Highlights */}
                  <line x1="200" y1="90" x2="200" y2="180" stroke="#E9D5FF" strokeWidth="1" strokeOpacity="0.7" />
                  <line x1="270" y1="75" x2="275" y2="180" stroke="#E9D5FF" strokeWidth="0.75" strokeOpacity="0.5" />
                </svg>

                {/* Subtle Overlay Badge */}
                <div className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-2.5 py-1 backdrop-blur-md border border-violet-500/20">
                  <p className="text-[10px] font-mono tracking-wider text-violet-300">
                    Ampledia Signature Hub // 2026
                  </p>
                </div>
              </div>

              {/* Interactive Direct Dispatch Input Console */}
              <div className="relative mt-4 rounded-xl border border-violet-500/25 bg-[#120826] p-3 sm:p-4 transition-all duration-300 focus-within:border-violet-400">
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="whatsapp-inquiry-input"
                    className="text-[10px] font-mono uppercase tracking-wider text-violet-300"
                  >
                    Direct WhatsApp Growth Inquiry
                  </label>
                  <span className="text-[10px] text-[#B7A9D6]/60">Enter to send</span>
                </div>

                <div className="relative flex items-center min-h-[44px]">
                  <input
                    id="whatsapp-inquiry-input"
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleWhatsAppSend();
                      }
                    }}
                    placeholder="Describe your brand or growth goal..."
                    className="w-full bg-transparent text-sm text-[#F5F0FF] placeholder:text-[#B7A9D6]/40 outline-none pr-12 font-sans"
                  />

                  <button
                    type="button"
                    onClick={handleWhatsAppSend}
                    aria-label="Send WhatsApp message directly to Ampledia founders"
                    className="relative overflow-hidden shrink-0 flex h-9 w-9 items-center justify-center rounded-lg bg-[#7C3AED] text-white transition-all duration-300 hover:bg-[#6D28D9] hover:scale-105 active:scale-95 shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Micro-footer inside device */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-[#B7A9D6]/70 px-1">
                <span>Rishabh Singh &amp; Jaypal · Co-Founders</span>
                <span className="text-violet-400 font-medium">100% Confidential</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
