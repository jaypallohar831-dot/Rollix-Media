import type { Metadata } from 'next';
import { PAGE_SEO, OG_IMAGE, SOCIAL, getCanonicalUrl } from '@/lib/seo.config';

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
