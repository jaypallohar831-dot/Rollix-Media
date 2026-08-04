import type { Metadata } from 'next';
import { ContactForm } from './contact-form';
import { PAGE_SEO, OG_IMAGE, SOCIAL, BUSINESS, getCanonicalUrl } from '@/lib/seo.config';
import { WebPageSchema } from '@/components/seo/json-ld';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';

export const metadata: Metadata = {
  title: PAGE_SEO.contact.title,
  description: PAGE_SEO.contact.description,
  keywords: PAGE_SEO.contact.keywords as unknown as string[],
  alternates: { canonical: getCanonicalUrl('/contact') },
  openGraph: {
    title: PAGE_SEO.contact.title,
    description: PAGE_SEO.contact.description,
    url: getCanonicalUrl('/contact'),
    images: [{ url: OG_IMAGE.url, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: OG_IMAGE.alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_SEO.contact.title,
    description: PAGE_SEO.contact.description,
    images: [OG_IMAGE.url],
    creator: SOCIAL.twitterHandle,
  },
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen pt-32 sm:pt-40 lg:pt-48">
      <WebPageSchema
        name="Contact Rollix Media"
        description={PAGE_SEO.contact.description}
        url={getCanonicalUrl('/contact')}
        type="ContactPage"
        breadcrumb={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Contact', url: getCanonicalUrl('/contact') },
        ]}
      />

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <Breadcrumbs items={[{ label: 'Contact', href: '/contact' }]} className="mb-8" />
      </div>

      <ContactForm />
    </main>
  );
}
