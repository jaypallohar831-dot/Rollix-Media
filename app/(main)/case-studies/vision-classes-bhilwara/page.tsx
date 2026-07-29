import type { Metadata } from 'next';
import { VisionClassesCaseStudy } from './vision-classes-case-study';

export const metadata: Metadata = {
  title: 'Vision Classes Bhilwara — Ad Campaign Results',
  description:
    'See how Vision Classes Bhilwara achieved 129K+ views, 67K+ reach, and 20:1 to 125:1 ROI from a ₹6,000 Instagram ad campaign managed by Rollix Media.',
  alternates: { canonical: 'https://rollixmedia.vercel.app/case-studies/vision-classes-bhilwara' },
  openGraph: {
    title: 'Vision Classes Bhilwara — Ad Campaign Results | Rollix Media',
    description:
      '129K+ views, 67K+ reach, 40-60 leads generated with just ₹6,000 ad spend. See the full animated case study.',
    url: 'https://rollixmedia.vercel.app/case-studies/vision-classes-bhilwara',
  },
};

export default function VisionClassesBhilwaraPage() {
  return <VisionClassesCaseStudy />;
}
