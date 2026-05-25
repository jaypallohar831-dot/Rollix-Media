import type { Metadata } from 'next';
import { ServicesSection } from '@/sections/services';
import { Container, Divider } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Our Services | Video Editing, Social Media, Web Development',
  description:
    'Explore Rollix Media\'s full range of services: cinematic video editing, social media marketing, website development, SEO, graphics designing, and digital advertising in Bhilwara.',
  alternates: { canonical: 'https://rollixmedia.vercel.app/services' },
  openGraph: {
    title: 'Services | Rollix Media',
    description: 'Video editing, social media, website development & more — by Rollix Media, Bhilwara.',
    url: 'https://rollixmedia.vercel.app/services',
  },
};


export default function ServicesOverviewPage() {
  return (
    <main className="relative min-h-screen pt-32 sm:pt-40 lg:pt-48">
      {/* Services Hero */}
      <Container size="wide" className="mb-20 sm:mb-28 lg:mb-32">
        <div className="mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-cinematic-orange/80">
            <span className="h-[1px] w-6 bg-cinematic-orange/40" />
            Capabilities
          </span>
        </div>
        
        <h1 className="font-heading text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-foreground">
          The Anatomy of <span className="text-gradient-warm italic">Emotion</span>
        </h1>
        
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/90 sm:text-xl">
          We combine cinematic artistry with strategic precision to craft visual experiences that command attention and drive narrative impact.
        </p>
      </Container>

      <Divider />

      {/* Reusing the Services Grid from the homepage */}
      <div className="py-12">
        <ServicesSection />
      </div>

    </main>
  );
}
