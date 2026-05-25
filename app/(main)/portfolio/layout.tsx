import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | Cinematic Archives',
  description:
    'Explore Rollix Media\'s portfolio — cinematic video edits, social media campaigns, website designs, and creative projects from Bhilwara, India.',
  alternates: { canonical: 'https://rollixmedia.vercel.app/portfolio' },
  openGraph: {
    title: 'Portfolio | Rollix Media',
    description: 'Watch our best video editing, social media, and web development projects.',
    url: 'https://rollixmedia.vercel.app/portfolio',
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
