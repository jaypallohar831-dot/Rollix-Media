import Link from 'next/link';
import { Home, MessageSquare } from 'lucide-react';

const SUGGESTED_PAGES = [
  { label: 'Our Services', href: '/services', description: 'Video editing, web design, SEO, social media & more' },
  { label: 'Portfolio', href: '/portfolio', description: 'Browse our completed projects & case studies' },
  { label: 'About Us', href: '/about', description: 'Learn more about Ampledia & our team' },
  { label: 'Contact Us', href: '/contact', description: 'Get a free quote or start your project today' },
];

/**
 * Shared 404 page content — used by both root and (main) not-found pages.
 * Extracted to avoid maintaining identical UI in two separate files.
 */
export function NotFoundContent({ fullHeight = false }: { fullHeight?: boolean }) {
  return (
    <main className={`relative flex flex-col items-center justify-center px-6 py-24 sm:py-32 ${fullHeight ? 'min-h-screen' : 'min-h-[80vh]'}`}>
      {/* Background ambiance */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(199,123,67,0.08) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* 404 Number */}
        <div className="mb-6 font-heading text-[clamp(6rem,15vw,10rem)] font-light leading-none tracking-[-0.04em] text-cinematic-orange/20">
          404
        </div>

        {/* Eyebrow */}
        <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-cinematic-orange/80">
          <span className="h-[1px] w-6 bg-cinematic-orange/40" />
          Page Not Found
        </span>

        {/* Heading */}
        <h1 className="mt-2 font-heading text-3xl font-light leading-tight tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
          This page doesn&rsquo;t{' '}
          <span className="font-normal italic text-cinematic-orange">exist</span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
          The page you&rsquo;re looking for may have been moved, deleted, or never existed. Let&rsquo;s get you back on track.
        </p>

        {/* Primary Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex h-12 items-center gap-2 rounded-full border border-cinematic-orange/30 bg-cinematic-orange/10 px-7 text-[11px] font-medium uppercase tracking-[0.2em] text-cinematic-orange transition-all duration-500 hover:bg-cinematic-orange hover:text-white"
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-border px-7 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground transition-all duration-500 hover:border-cinematic-orange hover:text-cinematic-orange"
          >
            <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
            Contact Us
          </Link>
        </div>

        {/* Divider */}
        <div
          className="mx-auto my-12 h-[1px] w-24"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(212,118,60,0.4), transparent)',
          }}
        />

        {/* Suggested Pages */}
        <div className="text-left">
          <h2 className="mb-6 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Popular Pages
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SUGGESTED_PAGES.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group rounded-xl border border-border bg-white p-5 transition-all duration-300 hover:border-cinematic-orange/40 hover:shadow-md"
              >
                <h3 className="text-sm font-semibold text-foreground transition-colors group-hover:text-cinematic-orange">
                  {page.label}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {page.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
