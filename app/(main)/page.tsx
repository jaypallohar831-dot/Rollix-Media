import type { Metadata } from 'next';
import { HeroSection } from '@/sections/hero';
import { Section, Container, Divider } from '@/components/layout';
import { HomepageLoader } from '@/components/homepage-loader';
import { getHomepageData } from './data';
import dynamic from 'next/dynamic';
import { PAGE_SEO, SITE_URL, OG_IMAGE, SOCIAL, HOMEPAGE_FAQ, getCanonicalUrl } from '@/lib/seo.config';
import { WebPageSchema, FAQSchema } from '@/components/seo/json-ld';

// Below-fold sections: lazy-loaded to reduce initial JS bundle (not visible at LCP)
const PhilosophySection = dynamic(() => import('@/sections/philosophy').then(m => ({ default: m.PhilosophySection })));
const PortfolioSection = dynamic(() => import('@/sections/portfolio').then(m => ({ default: m.PortfolioSection })));
const TestimonialsSection = dynamic(() => import('@/sections/testimonials').then(m => ({ default: m.TestimonialsSection })));
const SuccessStoriesSection = dynamic(() => import('@/sections/success-stories').then(m => ({ default: m.SuccessStoriesSection })));
const ProcessSection = dynamic(() => import('@/sections/process').then(m => ({ default: m.ProcessSection })));
const FreeToolSection = dynamic(() => import('@/sections/free-tool').then(m => ({ default: m.FreeToolSection })));

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
};

export default async function Home() {
  const { portfolioProjects, services, testimonials } = await getHomepageData();

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

      <HeroSection />

      {/* Brand Philosophy — emotional manifesto */}
      <PhilosophySection />

      <Divider />

      {/* Portfolio — Digital Marketing Services Showcase */}
      <PortfolioSection projects={portfolioProjects} />

      <Divider />

      {/* Success Stories — featured case study */}
      <SuccessStoriesSection />

      <Divider />

      {/* Process — behind the craft */}
      <ProcessSection />

      <Divider />

      {/* Testimonials — social proof (2nd last) */}
      <TestimonialsSection testimonials={testimonials} />

      {/* Free File Compressor Tool — Home utility section */}
      <FreeToolSection />

      <Divider />

      <Section id="contact" spacing="lg" withBackground>
        <Container>
          <div className="text-center">
            <span className="mb-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-cinematic-orange">
              <span className="h-[1px] w-6 bg-cinematic-orange/40" />
              Let&rsquo;s Connect
            </span>
            <h2 className="mx-auto max-w-3xl font-heading text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-foreground">
              Ready to accelerate your <span className="text-cinematic-orange italic">Digital Growth</span>?
            </h2>
            <div className="mt-12 flex justify-center">
              <a 
                href="/contact"
                className="inline-flex h-14 items-center justify-center rounded-full border border-border bg-white shadow-sm px-8 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground transition-all duration-500 hover:border-cinematic-orange hover:text-cinematic-orange"
              >
                Start Your Project
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
    </HomepageLoader>
  );
}
