/**
 * Internal Linking CTA Sections
 * Reusable cross-linking components for SEO internal linking strategy.
 */
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CTALinkProps {
  eyebrow: string;
  heading: string;
  highlight: string;
  href: string;
  label: string;
}

function CTASection({ eyebrow, heading, highlight, href, label }: CTALinkProps) {
  return (
    <section className="border-t border-border bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16">
        <div className="text-center">
          <span className="mb-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-cinematic-orange/80">
            <span className="h-[1px] w-6 bg-cinematic-orange/40" />
            {eyebrow}
          </span>
          <h2 className="mx-auto max-w-2xl font-heading text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-foreground">
            {heading}{' '}
            <span className="text-cinematic-orange italic font-normal">{highlight}</span>
          </h2>
          <div className="mt-8 flex justify-center">
            <Link
              href={href}
              className="group inline-flex h-14 items-center gap-2 rounded-full border border-cinematic-orange/30 bg-cinematic-orange/10 px-8 text-[11px] font-medium uppercase tracking-[0.2em] text-cinematic-orange transition-all duration-500 hover:bg-cinematic-orange hover:text-white"
            >
              {label}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Services → Portfolio */
export function ServicesToPortfolioCTA() {
  return (
    <CTASection
      eyebrow="Our Work"
      heading="See how we deliver"
      highlight="real results"
      href="/portfolio"
      label="View Portfolio"
    />
  );
}

/** Portfolio → Contact */
export function PortfolioToContactCTA() {
  return (
    <CTASection
      eyebrow="Ready to start?"
      heading="Let&rsquo;s build your next"
      highlight="success story"
      href="/contact"
      label="Start Your Project"
    />
  );
}

/** About → Contact */
export function AboutToContactCTA() {
  return (
    <CTASection
      eyebrow="Let's talk"
      heading="Ready to work with"
      highlight="our team?"
      href="/contact"
      label="Get in Touch"
    />
  );
}

/** Services → Contact */
export function ServicesToContactCTA() {
  return (
    <CTASection
      eyebrow="Get started"
      heading="Ready to accelerate your"
      highlight="digital growth?"
      href="/contact"
      label="Get a Free Quote"
    />
  );
}
