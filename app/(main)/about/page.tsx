import type { Metadata } from 'next';
import { PhilosophySection } from '@/sections/philosophy';
import { ProcessSection } from '@/sections/process';
import { Divider } from '@/components/layout';
import { PAGE_SEO, SITE_URL, OG_IMAGE, SOCIAL, getCanonicalUrl } from '@/lib/seo.config';
import { WebPageSchema } from '@/components/seo/json-ld';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { AboutToContactCTA } from '@/components/seo/internal-links';

export const metadata: Metadata = {
  title: PAGE_SEO.about.title,
  description: PAGE_SEO.about.description,
  keywords: PAGE_SEO.about.keywords as unknown as string[],
  alternates: { canonical: getCanonicalUrl('/about') },
  openGraph: {
    title: PAGE_SEO.about.title,
    description: PAGE_SEO.about.description,
    url: getCanonicalUrl('/about'),
    images: [{ url: OG_IMAGE.url, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: OG_IMAGE.alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_SEO.about.title,
    description: PAGE_SEO.about.description,
    images: [OG_IMAGE.url],
    creator: SOCIAL.twitterHandle,
  },
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen pt-20">
      <WebPageSchema
        name="About Rollix Media"
        description={PAGE_SEO.about.description}
        url={getCanonicalUrl('/about')}
        type="AboutPage"
        breadcrumb={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'About', url: getCanonicalUrl('/about') },
        ]}
      />

      <div className="mx-auto max-w-[1400px] px-6 pt-12 sm:px-10 lg:px-16">
        <Breadcrumbs items={[{ label: 'About', href: '/about' }]} />
      </div>

      <PhilosophySection />
      <Divider />
      <ProcessSection />

      {/* Internal linking: About → Contact */}
      <AboutToContactCTA />
    </main>
  );
}
