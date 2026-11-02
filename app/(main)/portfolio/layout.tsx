import type { Metadata } from 'next';
import { PAGE_SEO, OG_IMAGE, SOCIAL, getCanonicalUrl } from '@/lib/seo.config';

/**
 * Portfolio layout — pass-through wrapper with shared metadata.
 * 
 * Note: title, description, and OG metadata are set here because the
 * portfolio listing page (page.tsx) is a 'use client' component and
 * cannot export metadata directly.
 * 
 * IMPORTANT: alternates.canonical is NOT set here — it would leak the
 * /portfolio canonical to /portfolio/[slug] child pages. Each child page
 * sets its own canonical via generateMetadata() instead.
 */
export const metadata: Metadata = {
  title: PAGE_SEO.portfolio.title,
  description: PAGE_SEO.portfolio.description,
  keywords: PAGE_SEO.portfolio.keywords as unknown as string[],
  alternates: { canonical: getCanonicalUrl('/portfolio') },
  openGraph: {
    title: PAGE_SEO.portfolio.title,
    description: PAGE_SEO.portfolio.description,
    url: getCanonicalUrl('/portfolio'),
    images: [{ url: OG_IMAGE.url, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: OG_IMAGE.alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_SEO.portfolio.title,
    description: PAGE_SEO.portfolio.description,
    images: [OG_IMAGE.url],
    creator: SOCIAL.twitterHandle,
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

