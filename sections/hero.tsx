'use client';

import React from 'react';
import { MagneticButton } from '@/components/magnetic-button';
import { BRAND } from '@/lib/brand';
import { MessageCircle, ArrowRight, Video, Target } from 'lucide-react';

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Ampledia Hero — Digital, Creative, Growth"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0A0614] pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 text-center"
    >
      {/* Subtle ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden z-0"
        aria-hidden="true"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] bg-violet-900/18 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[960px] mx-auto px-5 sm:px-8">
        {/* Tagline Eyebrow */}
        <div
          data-agent-layer="hero-eyebrow"
          data-agent-order="1"
          data-agent-type="text"
          data-agent-label="Agency Status"
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-violet-500/25 bg-violet-950/40 px-4 py-1.5 backdrop-blur-md"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-violet-300">
            Digital · Creative · Growth // Bhilwara Studio
          </span>
        </div>

        {/* Real Punchy SEO H1 Headline */}
        <h1 className="font-heading text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold tracking-[-0.035em] leading-[1.06] text-[#F5F0FF]">
          <span
            data-agent-layer="hero-h1-line1"
            data-agent-order="2"
            data-agent-type="text"
            data-agent-label="H1 Line 1"
            className="block"
          >
            Your Brand Deserves More.
          </span>
          <span
            data-agent-layer="hero-h1-line2"
            data-agent-order="3"
            data-agent-type="text"
            data-agent-label="H1 Line 2"
            className="block mt-2 bg-gradient-to-r from-violet-300 via-purple-200 to-fuchsia-300 bg-clip-text text-transparent"
          >
            We Scale It.
          </span>
        </h1>

        {/* Clear, direct 2-line subtitle (No jargon) */}
        <p
          data-agent-layer="hero-subtitle"
          data-agent-order="4"
          data-agent-type="text"
          data-agent-label="Value Proposition"
          className="mt-6 sm:mt-7 max-w-[680px] mx-auto text-base sm:text-lg leading-[1.65] text-[#B7A9D6]"
        >
          Cinema-grade video production &amp; high-converting Meta ad funnels engineered 
          to turn local attention into measurable business revenue.
        </p>

        {/* Fast Action CTAs */}
        <div className="mt-9 sm:mt-11 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div
            data-agent-layer="hero-cta-primary"
            data-agent-order="5"
            data-agent-type="button"
            data-agent-label="CTA: WhatsApp"
          >
            <MagneticButton
              href={BRAND.whatsapp}
              strength={25}
              className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-[#7C3AED] px-8 py-4 text-sm font-semibold tracking-wide text-white shadow-[0_0_28px_-4px_rgba(168,85,247,0.5)] transition-all duration-300 hover:bg-[#6D28D9] hover:shadow-[0_0_36px_-2px_rgba(168,85,247,0.7)]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Let&apos;s Build Together</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
          </div>

          <div
            data-agent-layer="hero-cta-secondary"
            data-agent-order="6"
            data-agent-type="button"
            data-agent-label="CTA: Work"
          >
            <MagneticButton
              href="/portfolio"
              strength={18}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-violet-500/25 bg-[#1A0F33]/60 px-7 py-4 text-sm font-medium text-[#F5F0FF] backdrop-blur-md transition-all duration-300 hover:border-violet-500/50 hover:bg-[#241445]"
            >
              <span>View Selected Work</span>
            </MagneticButton>
          </div>
        </div>

        {/* Minimal Proof Badges below CTA */}
        <div className="mt-12 pt-8 border-t border-violet-500/15 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-[#B7A9D6]">
          <div className="flex items-center gap-2">
            <Video className="h-4 w-4 text-violet-400" />
            <span>Cinema 4K Production</span>
          </div>
          <span className="text-violet-500/40">·</span>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-violet-400" />
            <span>₹100–150 Cost Per Lead</span>
          </div>
          <span className="text-violet-500/40">·</span>
          <div className="text-violet-300 font-semibold">
            Direct Founder Access
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
