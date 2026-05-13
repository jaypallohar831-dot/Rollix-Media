import { notFound } from 'next/navigation';
import { SERVICES } from '@/lib/services';
import { Container, Section, SectionHeader, Divider } from '@/components/layout';
import { PortfolioCard } from '@/components/portfolio-card';
import { PORTFOLIO_ITEMS } from '@/lib/portfolio';
import { ProcessSection } from '@/sections/process';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: ServicePageProps) {
  const resolvedParams = await params;
  const service = SERVICES.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  // Get related portfolio items based on category
  // For demo, just slice the first 2
  const relatedWork = PORTFOLIO_ITEMS.slice(0, 2);

  return (
    <main className="relative min-h-screen pt-32 sm:pt-40 lg:pt-48">
      <Container size="wide">
        {/* Service Hero */}
        <div className="mb-20 sm:mb-28 lg:mb-32">
          <div className="mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-cinematic-orange/80">
              <span className="h-[1px] w-6 bg-cinematic-orange/40" />
              Service No. {service.index}
            </span>
          </div>
          
          <h1 className="font-heading text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-foreground">
            {service.title.split(' ').map((word, i, arr) => 
               i === arr.length - 1 ? (
                 <span key={i} className="text-gradient-warm italic">{word}</span>
               ) : (
                 <span key={i}>{word} </span>
               )
            )}
          </h1>
          
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {service.description}
          </p>
        </div>
      </Container>

      <Divider />

      {/* Cinematic Overview */}
      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
            <div>
              <SectionHeader 
                eyebrow="The Craft"
                title="Elevating the Standard"
                description={`Our approach to ${service.title.toLowerCase()} is rooted in emotional storytelling. We don't just deliver files; we engineer feelings.`}
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-base leading-relaxed text-muted-foreground/80 sm:text-lg">
                Every frame, every cut, every word is deliberate. We work closely with our partners to understand the truth behind their brand, translating that truth into a visual language that is impossible to ignore.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Divider />

      {/* Process Section Reused */}
      <ProcessSection />

      <Divider />

      {/* Featured Work related to this service */}
      <Section spacing="lg" withBackground>
        <Container size="wide">
          <SectionHeader 
            eyebrow="Selected Cases"
            title="Related Work"
          />
          <div className="mt-16 grid grid-cols-1 gap-6 sm:mt-24 md:grid-cols-2">
            {relatedWork.map((item) => (
              <PortfolioCard key={item.id} item={item} size="large" />
            ))}
          </div>
        </Container>
      </Section>

      <Divider />

      {/* Service CTA */}
      <Section id="contact" spacing="lg">
        <Container>
          <div className="text-center">
            <span className="mb-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-cinematic-orange/80">
              <span className="h-[1px] w-6 bg-cinematic-orange/40" />
              Let's Talk
            </span>
            <h2 className="mx-auto max-w-3xl font-heading text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-foreground">
              Ready to elevate your <span className="text-gradient-warm italic">{service.title.split(' ').pop()}</span>?
            </h2>
            <div className="mt-12 flex justify-center">
              <a 
                href="mailto:hello@rollix.media"
                className="inline-flex h-14 items-center justify-center rounded-full border border-cinematic-orange/30 bg-cinematic-orange/10 px-8 text-[11px] font-medium uppercase tracking-[0.2em] text-cinematic-orange transition-all duration-500 hover:bg-cinematic-orange hover:text-white"
              >
                Start a Project
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
