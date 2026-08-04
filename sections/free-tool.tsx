'use client';

import { Section, Container } from '@/components/layout';
import { CompressorWorkspace } from '@/components/tools/compressor-workspace';
import { ShieldCheck, Zap, Sparkles, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export function FreeToolSection() {
  return (
    <Section id="free-tool" spacing="md" className="bg-[#FAFAFA] border-t border-border">
      <Container>
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Section Header */}
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-cinematic-orange">
              <span className="h-[1px] w-6 bg-cinematic-orange/40" />
              Free Utility Tool
              <span className="h-[1px] w-6 bg-cinematic-orange/40" />
            </span>

            <h2 className="font-heading text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-[1.15] tracking-[-0.02em] text-foreground">
              Instant Free <span className="font-bold text-cinematic-orange">File Compressor</span>
            </h2>

            <p className="mx-auto max-w-xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Compress Images, PDFs, Videos, Audio &amp; Archives directly in your browser. 
              <strong className="text-foreground font-semibold"> 100% private, 0 server uploads.</strong>
            </p>
          </div>

          {/* Interactive Compressor Workspace */}
          <div className="rounded-3xl border border-border bg-white p-4 sm:p-6 shadow-md">
            <CompressorWorkspace />
          </div>

          {/* Direct link to dedicated page option */}
          <div className="text-center">
            <Link
              href="/tools/compress"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-cinematic-orange transition-colors"
            >
              <span>Bookmark or share full tool page (/tools/compress)</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
