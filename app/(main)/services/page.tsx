import type { Metadata } from 'next';
import { ServicesSection } from '@/sections/services';
import { Container, Divider } from '@/components/layout';
import { PAGE_SEO, OG_IMAGE, SOCIAL, SITE_URL, getCanonicalUrl } from '@/lib/seo.config';
import { WebPageSchema, ServiceListSchema, FAQSchema } from '@/components/seo/json-ld';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import { ServicesToPortfolioCTA } from '@/components/seo/internal-links';
import { SERVICES } from '@/lib/services';
import { SuccessStoriesSection } from '@/sections/success-stories';

export const metadata: Metadata = {
  title: PAGE_SEO.services.title,
  description: PAGE_SEO.services.description,
  keywords: PAGE_SEO.services.keywords as unknown as string[],
  alternates: { canonical: getCanonicalUrl('/services') },
  openGraph: {
    title: PAGE_SEO.services.title,
    description: PAGE_SEO.services.description,
    url: getCanonicalUrl('/services'),
    images: [{ url: OG_IMAGE.url, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: OG_IMAGE.alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_SEO.services.title,
    description: PAGE_SEO.services.description,
    images: [OG_IMAGE.url],
    creator: SOCIAL.twitterHandle,
  },
};

const SERVICES_FAQ = [
  {
    question: 'What digital marketing services does Rollix Media provide?',
    answer:
      'Rollix Media provides 8 core services: cinematic wedding videography, professional videography, video editing, social media marketing, website design & development, graphic design, SEO optimization, and digital advertising (Meta Ads & Google Ads).',
  },
  {
    question: 'How much does it cost to hire Rollix Media?',
    answer:
      'Pricing varies by service. Video editing starts at ₹15,000, web design from ₹15,000, social media management from ₹25,000/month, SEO from ₹20,000/month, and wedding videography packages from ₹1,50,000. Contact us for a customized quote.',
  },
  {
    question: 'Does Rollix Media work with clients outside Bhilwara?',
    answer:
      'Yes! While we are based in Bhilwara, Rajasthan, we work with clients across India and internationally. Our digital marketing, web design, and video editing services are available remotely.',
  },
];

export default function ServicesOverviewPage() {
  const serviceSchemaData = SERVICES.map((s) => ({
    name: s.title,
    description: s.description,
    url: getCanonicalUrl(`/services/${s.slug}`),
  }));

  return (
    <main className="relative min-h-screen pt-32 sm:pt-40 lg:pt-48">
      {/* Structured Data */}
      <WebPageSchema
        name="Digital Marketing Services"
        description={PAGE_SEO.services.description}
        url={getCanonicalUrl('/services')}
        type="CollectionPage"
        breadcrumb={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Services', url: getCanonicalUrl('/services') },
        ]}
      />
      <ServiceListSchema services={serviceSchemaData} />
      <FAQSchema faqs={SERVICES_FAQ} />

      {/* Services Hero */}
      <Container size="wide" className="mb-20 sm:mb-28 lg:mb-32">
        <Breadcrumbs items={[{ label: 'Services', href: '/services' }]} className="mb-8" />

        <div className="mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-cinematic-orange/80">
            <span className="h-[1px] w-6 bg-cinematic-orange/40" />
            Capabilities
          </span>
        </div>
        
        <h1 className="font-heading text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-foreground">
          Digital Marketing <span className="text-gradient-warm italic">Services</span>
        </h1>
        
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/90 sm:text-xl">
          We combine cinematic artistry with strategic precision to deliver measurable growth across video production, web development, social media, SEO, and performance marketing.
        </p>
      </Container>

      <Divider />

      {/* Reusing the Services Grid from the homepage */}
      <div className="py-12">
        <ServicesSection />
      </div>

      <Divider />

      {/* Real Results Case Study — Featured Ad Campaign */}
      <SuccessStoriesSection />

      {/* Internal linking: Services → Portfolio */}
      <ServicesToPortfolioCTA />
    </main>
  );
}
