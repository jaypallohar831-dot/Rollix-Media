import type { Metadata } from 'next';
import { VisionClassesCaseStudy } from './vision-classes-case-study';
import { OG_IMAGE, SOCIAL, getCanonicalUrl } from '@/lib/seo.config';
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo/json-ld';

export const metadata: Metadata = {
  title: 'Vision Classes Bhilwara — Ad Campaign Case Study | Rollix Media',
  description:
    'See how Vision Classes Bhilwara achieved 129K+ views, 67K+ reach, and 20:1 to 125:1 ROI from a ₹6,000 Instagram ad campaign managed by Rollix Media. Full case study with strategy breakdown.',
  keywords: [
    'Instagram ad campaign case study',
    'Vision Classes Bhilwara',
    'digital marketing results',
    'ROI case study',
    'Rollix Media case study',
    'coaching institute marketing',
    'ad campaign Bhilwara',
  ],
  alternates: { canonical: getCanonicalUrl('/case-studies/vision-classes-bhilwara') },
  openGraph: {
    title: 'Vision Classes Bhilwara — Ad Campaign Results | Rollix Media',
    description:
      '129K+ views, 67K+ reach, 40-60 leads generated with just ₹6,000 ad spend. See the full animated case study.',
    url: getCanonicalUrl('/case-studies/vision-classes-bhilwara'),
    images: [{ url: OG_IMAGE.url, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: 'Vision Classes Bhilwara Ad Campaign Results' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vision Classes Bhilwara — 125:1 ROI Case Study | Rollix Media',
    description: '129K+ views, 67K+ reach, 125:1 ROI from ₹6,000 ad spend. Full case study.',
    images: [OG_IMAGE.url],
    creator: SOCIAL.twitterHandle,
  },
};

export default function VisionClassesBhilwaraPage() {
  return (
    <>
      <ArticleSchema
        headline="Vision Classes Bhilwara — Instagram Ad Campaign Case Study"
        description="How Rollix Media achieved 129K+ views, 67K+ reach, and 125:1 ROI for Vision Classes Bhilwara with a ₹6,000 Instagram ad campaign."
        url={getCanonicalUrl('/case-studies/vision-classes-bhilwara')}
        datePublished="2024-11-01"
        dateModified="2025-05-01"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: getCanonicalUrl('/') },
          { name: 'Case Studies', url: getCanonicalUrl('/case-studies/vision-classes-bhilwara') },
          { name: 'Vision Classes Bhilwara', url: getCanonicalUrl('/case-studies/vision-classes-bhilwara') },
        ]}
      />
      <VisionClassesCaseStudy />
    </>
  );
}
