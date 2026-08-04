import type { Metadata } from 'next';
import { PAGE_SEO, SITE_URL, SITE_NAME } from '@/lib/seo.config';
import { CompressorWorkspace } from '@/components/tools/compressor-workspace';
import { CompressorFAQ } from '@/components/tools/compressor-faq';
import { FILE_COMPRESSOR_FAQS } from '@/lib/compression/faq-data';
import Link from 'next/link';
import { ShieldCheck, Zap, Layers, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: PAGE_SEO.toolsCompress.title,
  description: PAGE_SEO.toolsCompress.description,
  keywords: PAGE_SEO.toolsCompress.keywords as unknown as string[],
  alternates: {
    canonical: `${SITE_URL}/tools/compress`,
  },
  openGraph: {
    title: PAGE_SEO.toolsCompress.title,
    description: PAGE_SEO.toolsCompress.description,
    url: `${SITE_URL}/tools/compress`,
    type: 'website',
    siteName: SITE_NAME,
  },
};

export default function CompressToolPage() {
  // WebApplication JSON-LD Schema
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Rollix Media Free Online File Compressor',
    url: `${SITE_URL}/tools/compress`,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript and HTML5 Canvas',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Free online file compressor for JPG, PNG, WebP images, PDF documents, MP4 videos, MP3 audio, and ZIP archives. 100% browser client-side privacy.',
  };

  // FAQ Page Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FILE_COMPRESSOR_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="relative pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16 space-y-16">
        {/* Hero Banner Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cinematic-orange/30 bg-cinematic-orange/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cinematic-orange">
            <Zap className="h-3.5 w-3.5" />
            <span>All-in-One Free Utility Tool</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-light tracking-tight text-foreground leading-tight">
            Free All-in-One <span className="font-bold text-cinematic-orange">File Compressor</span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Shrink Images, PDFs, Videos, Audio files, and Archives in seconds without losing quality. 
            <strong className="text-foreground font-semibold"> 100% free, browser client-side, with zero server uploads.</strong>
          </p>

          {/* Key Value Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Zero Server Storage</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Instant Processing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-cinematic-orange" />
              <span>Batch Upload Support</span>
            </div>
          </div>
        </div>

        {/* Core Tool Interactive Workspace */}
        <div className="rounded-3xl border border-border bg-gradient-to-b from-white to-secondary/30 p-6 sm:p-10 shadow-lg">
          <CompressorWorkspace />
        </div>

        {/* On-Page Educational SEO Content */}
        <section className="space-y-12 py-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Why Compress Images &amp; PDFs Before Publishing?
            </h2>
            <p className="text-sm text-muted-foreground">
              Optimizing your media assets improves website loading speed, reduces email attachment bounces, and boosts Google SEO rankings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border bg-white p-6 space-y-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-cinematic-orange/10 text-cinematic-orange">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">Faster Website Speed</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Large images slow down websites dramatically. Compressing images by 70%+ ensures lightning-fast page loading speeds and lower bounce rates for visitors.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 space-y-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-cinematic-orange/10 text-cinematic-orange">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">100% Privacy Guarantee</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Unlike online converters that save files to unknown cloud servers, our tool processes everything in your browser memory. Your documents never leave your computer.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 space-y-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-cinematic-orange/10 text-cinematic-orange">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">Batch ZIP Downloads</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Easily compress dozens of prospectus images, coaching notes, or product catalog photos at once. Click one button to download everything as a ZIP file.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <CompressorFAQ />

        {/* Lead Gen Agency Conversion CTA Banner */}
        <section className="rounded-3xl border border-cinematic-orange/30 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 p-8 sm:p-14 text-white shadow-xl">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cinematic-orange/40 bg-cinematic-orange/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cinematic-orange">
              <Sparkles className="h-4 w-4" />
              <span>Rollix Media Agency Services</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-4xl font-light leading-snug">
              Need High-Converting <span className="font-bold text-cinematic-orange">Websites, Meta Ads, or Video Editing?</span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              We help coaching institutes, schools, and growing businesses build fast Next.js websites, run profitable ad campaigns, and produce cinema-grade promotional videos.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cinematic-orange shrink-0" />
                <span>Next.js High-Speed Web Development</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cinematic-orange shrink-0" />
                <span>Cinematic Video Editing &amp; Motion Graphics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cinematic-orange shrink-0" />
                <span>SEO Dominance &amp; Google Ranking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cinematic-orange shrink-0" />
                <span>High-ROI Meta &amp; Google Ad Campaigns</span>
              </li>
            </ul>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-cinematic-orange px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <span>Book Free Growth Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
              >
                <span>Explore All Services</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
