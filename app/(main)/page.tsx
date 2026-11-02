import type { Metadata } from 'next';
import { Divider } from '@/components/layout';
import { HomepageLoader } from '@/components/homepage-loader';
import { getHomepageData } from './data';
import dynamic from 'next/dynamic';
import { PAGE_SEO, OG_IMAGE, SOCIAL, HOMEPAGE_FAQ, getCanonicalUrl } from '@/lib/seo.config';
import { WebPageSchema, FAQSchema } from '@/components/seo/json-ld';
import { HeroSection } from '@/sections/hero';

// Below-fold sections: lazy-loaded to reduce initial JS bundle (not visible at LCP)
const PhilosophySection = dynamic(() => import('@/sections/philosophy').then(m => ({ default: m.PhilosophySection })));
const ServicesSection = dynamic(() => import('@/sections/services').then(m => ({ default: m.ServicesSection })));
const PortfolioSection = dynamic(() => import('@/sections/portfolio').then(m => ({ default: m.PortfolioSection })));
const TestimonialsSection = dynamic(() => import('@/sections/testimonials').then(m => ({ default: m.TestimonialsSection })));
const SuccessStoriesSection = dynamic(() => import('@/sections/success-stories').then(m => ({ default: m.SuccessStoriesSection })));
const ProcessSection = dynamic(() => import('@/sections/process').then(m => ({ default: m.ProcessSection })));
const FaqCtaSection = dynamic(() => import('@/sections/faq-cta').then(m => ({ default: m.FaqCtaSection })));

export const metadata: Metadata = {
  title: PAGE_SEO.home.title,
  description: PAGE_SEO.home.description,
  keywords: PAGE_SEO.home.keywords as unknown as string[],
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
  openGraph: {
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
    url: getCanonicalUrl('/'),
    images: [{ url: OG_IMAGE.url, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: OG_IMAGE.alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
    images: [OG_IMAGE.url],
    creator: SOCIAL.twitterHandle,
  },
  other: {
    'geo.region': 'IN-RJ',
    'geo.placename': 'Bhilwara, Rajasthan',
    'geo.position': '25.3478;74.6313',
    'ICBM': '25.3478, 74.6313',
  },
};

// ISR: regenerate homepage every hour (data rarely changes)
export const revalidate = 3600;

export default async function Home() {
  const { portfolioProjects, testimonials } = await getHomepageData();

  return (
    <HomepageLoader>
      <main className="relative">
        {/* Homepage JSON-LD schemas */}
        <WebPageSchema
          name={PAGE_SEO.home.title}
          description={PAGE_SEO.home.description}
          url={getCanonicalUrl('/')}
          breadcrumb={[{ name: 'Home', url: getCanonicalUrl('/') }]}
        />
        <FAQSchema faqs={HOMEPAGE_FAQ} />

        <HeroSection portfolioProjects={portfolioProjects} />

        {/* Brand Philosophy — emotional manifesto */}
        <PhilosophySection />

        <Divider />

        {/* Success Stories — featured case study */}
        <SuccessStoriesSection />

        <Divider />

        {/* Services — Core Growth & Production Disciplines */}
        <ServicesSection />

        <Divider />

        {/* Portfolio — Digital Marketing Services Showcase */}
        <PortfolioSection projects={portfolioProjects} />

        <Divider />

        {/* Process — behind the craft */}
        <ProcessSection />

        <Divider />

        {/* Testimonials — social proof */}
        <TestimonialsSection testimonials={testimonials} />

        <Divider />

        {/* FAQ & High-Conversion Final WhatsApp CTA */}
        <FaqCtaSection />
      </main>
    </HomepageLoader>
  );
}
