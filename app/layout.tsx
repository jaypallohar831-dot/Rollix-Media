import type { Metadata, Viewport } from 'next';
import { geistSans, geistMono, inter, playfairDisplay } from './fonts';
import './globals.css';
import { SpeedInsights } from "@vercel/speed-insights/next"
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  BUSINESS,
  SOCIAL,
  OG_IMAGE,
  PRIMARY_KEYWORDS,
  PAGE_SEO,
  VERIFICATION,
} from '@/lib/seo.config';
import {
  OrganizationSchema,
  LocalBusinessSchema,
  WebSiteSchema,
  AggregateRatingSchema,
} from '@/components/seo/json-ld';

// ── Viewport (separated from metadata in Next.js 16) ────────────────────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#C77B43',
  colorScheme: 'light',
};

// ── Root Metadata ───────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: PAGE_SEO.home.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: PRIMARY_KEYWORDS as unknown as string[],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'Digital Marketing',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: PAGE_SEO.home.title,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE.url,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
        type: OG_IMAGE.type,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_SEO.home.title,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
    creator: SOCIAL.twitterHandle,
    site: SOCIAL.twitterHandle,
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: VERIFICATION.google,
    ...(VERIFICATION.bing ? { other: { 'msvalidate.01': [VERIFICATION.bing] } } : {}),
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': SITE_NAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="relative antialiased" data-scroll-behavior="smooth">
      <head>
        {/* ── Resource Hints for Core Web Vitals (faster LCP, lower FID) ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fwjvcqwcedjmzxqcrvtf.supabase.co" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://fwjvcqwcedjmzxqcrvtf.supabase.co" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />

        {/* ── PWA Manifest ── */}
        <link rel="manifest" href="/manifest.json" />

        {/* ── Structured Data: Organization + LocalBusiness + WebSite + AggregateRating ── */}
        <OrganizationSchema />
        <LocalBusinessSchema />
        <WebSiteSchema />
        <AggregateRatingSchema ratingValue={4.9} reviewCount={47} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${playfairDisplay.variable} relative min-h-full font-sans`}
        style={{ position: 'relative' }}
        suppressHydrationWarning
      >
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-cinematic-orange focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
