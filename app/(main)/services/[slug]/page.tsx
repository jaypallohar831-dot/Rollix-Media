import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SERVICES, SERVICE_DETAILS_MAP } from '@/lib/services';
import { Container, Section, SectionHeader, Divider } from '@/components/layout';
import { PortfolioCard } from '@/components/portfolio-card';
import { PORTFOLIO_ITEMS } from '@/lib/portfolio';
import { CheckCircle2, IndianRupee } from 'lucide-react';
import { servicesService } from '@/services/services.service';
import { ToolsShowcase } from '@/components/tools-showcase';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Dynamic SEO metadata per service page
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  let service = null;
  try {
    service = await servicesService.getServiceBySlug(slug);
  } catch {
    // ignore
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!service) service = SERVICES.find((s) => s.slug === slug) as any;

  const title = service ? `${service.title} in Bhilwara` : 'Service';
  const description = service?.description || 'Professional digital marketing service by Rollix Media, Bhilwara.';

  return {
    title,
    description,
    alternates: { canonical: `https://rollixmedia.vercel.app/services/${slug}` },
    openGraph: {
      title: `${title} | Rollix Media`,
      description,
      url: `https://rollixmedia.vercel.app/services/${slug}`,
    },
  };
}

// Ensure dynamic generation for slugs
export async function generateStaticParams() {
  try {
    const data = await servicesService.getServices();
    return data.map(s => ({ slug: s.slug }));
  } catch {
    return SERVICES.map((service) => ({ slug: service.slug }));
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const resolvedParams = await params;
  
  // Try to fetch from DB first, fallback to local
  let service = null;
  try {
    service = await servicesService.getServiceBySlug(resolvedParams.slug);
  } catch {
    // ignore
  }

  if (!service) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    service = SERVICES.find((s) => s.slug === resolvedParams.slug) as any;
  }

  if (!service) {
    notFound();
  }

  // Fallback detail content if the slug isn't strictly defined in the map
  const details = SERVICE_DETAILS_MAP[resolvedParams.slug] || {
    deliverables: [
      { title: 'Custom Strategy', desc: 'A bespoke approach tailored to your brand.' },
      { title: 'Premium Quality', desc: 'Industry-leading tools and execution.' },
      { title: 'Dedicated Support', desc: 'Direct line of communication with our team.' },
      { title: 'Fast Turnaround', desc: 'Efficient delivery without compromising craft.' }
    ],
    process: [
      { step: 'Discovery', desc: 'We learn everything about your goals.' },
      { step: 'Strategy', desc: 'Mapping out the exact blueprint for success.' },
      { step: 'Execution', desc: 'Bringing the strategy to life.' },
      { step: 'Delivery', desc: 'Handing off the final polished assets.' }
    ],
    tools: [
      { name: 'Adobe Creative Cloud', color: '#ff0000', icon: 'Layers' },
      { name: 'Professional Gear', color: '#666666', icon: 'Camera' },
      { name: 'Analytics Tools', color: '#0088cc', icon: 'Monitor' },
      { name: 'Advanced Software', color: '#7777ee', icon: 'Cpu' }
    ],
    pricing: 'Custom quote based on requirements'
  };

  // Get related portfolio items based on category
  const relatedWork = PORTFOLIO_ITEMS.slice(0, 2);

  return (
    <main className="relative min-h-screen pt-28 sm:pt-36 lg:pt-40 bg-background text-foreground">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(199,123,67,0.06) 0%, transparent 60%)' }} />
      </div>

      <Container size="wide" className="relative z-10">
        {/* Service Hero */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          <div className="mb-6 sm:mb-8">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-cinematic-orange">
              <span className="h-[1px] w-6 bg-cinematic-orange/60" />
              Service
            </span>
          </div>
          
          <h1 className="font-heading text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-stone-900">
            {service.title.split(' ').map((word: string, i: number, arr: string[]) => 
               i === arr.length - 1 ? (
                 <span key={i} className="text-gradient-warm italic font-medium">{word}</span>
               ) : (
                 <span key={i}>{word} </span>
               )
            )}
          </h1>
          
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-600 sm:text-xl font-light">
            {service.description}
          </p>
        </div>
      </Container>

      <Divider />

      {/* Deliverables Section (What we provide) */}
      <Section spacing="sm">
        <Container>
          <div className="mb-12">
            <SectionHeader 
              eyebrow="Deliverables"
              title="What We Provide"
              description={`Everything you get when you partner with us for ${service.title}.`}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {details.deliverables.map((item, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-8 shadow-xs transition-all duration-300 hover:border-cinematic-orange/40 hover:shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-cinematic-orange/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <CheckCircle2 className="relative z-10 h-8 w-8 text-cinematic-orange mb-6" />
                <h4 className="relative z-10 text-xl font-heading font-semibold text-stone-900 mb-3">{item.title}</h4>
                <p className="relative z-10 text-stone-600 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Divider />

      {/* Methodology Section (How we provide it) */}
      <Section spacing="sm" withBackground>
        <Container>
          <div className="mb-12">
            <SectionHeader 
              eyebrow="Methodology"
              title="How We Do It"
              description="Our proven process to ensure premium quality from start to finish."
            />
          </div>
          <div className="relative">
             <div className="absolute left-[27px] top-0 bottom-0 w-[1px] bg-stone-300 hidden md:block" />
             <div className="flex flex-col gap-10">
               {details.process.map((item, idx) => (
                 <div key={idx} className="relative flex flex-col md:flex-row items-start gap-8">
                   <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-stone-300 bg-white text-cinematic-orange font-heading text-xl font-bold shadow-xs">
                     0{idx + 1}
                   </div>
                   <div className="flex-1 pt-2">
                     <h3 className="text-2xl font-heading font-semibold text-stone-900 mb-2">{item.step}</h3>
                     <p className="text-lg text-stone-600 font-light max-w-2xl leading-relaxed">{item.desc}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </Container>
      </Section>

      <Divider />

      {/* Tools & Software Section */}
      {details.tools && details.tools.length > 0 && (
        <>
          <Section spacing="sm">
            <Container>
              <div className="mb-10">
                <SectionHeader 
                  eyebrow="Technology"
                  title="Tools & Software"
                  description="We leverage industry-leading software and premium gear to deliver uncompromised quality."
                />
              </div>
              <ToolsShowcase tools={details.tools} />
            </Container>
          </Section>
          <Divider />
        </>
      )}

      {/* Pricing / Budget Section */}
      <Section spacing="sm">
        <Container>
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-stone-200 bg-white p-10 sm:p-16 text-center shadow-md relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(199,123,67,0.06),transparent)] pointer-events-none" />
            <IndianRupee className="mx-auto h-12 w-12 text-cinematic-orange mb-6" />
            <h2 className="text-3xl sm:text-4xl font-heading font-light text-stone-900 mb-4">Investment & Budget</h2>
            <p className="text-lg text-stone-600 font-light mb-8 max-w-xl mx-auto leading-relaxed">
              We focus on delivering high-end cinematic value. Our pricing reflects the premium quality, dedicated team, and state-of-the-art equipment we bring to every project.
            </p>
            <div className="inline-block rounded-full border border-cinematic-orange/30 bg-cinematic-orange/10 px-8 py-4 shadow-xs">
              <span className="text-xl font-semibold text-cinematic-orange">
                {details.pricing}
              </span>
            </div>
          </div>
        </Container>
      </Section>

      <Divider />

      {/* Featured Work related to this service */}
      <Section spacing="sm" withBackground>
        <Container size="wide">
          <SectionHeader 
            eyebrow="Selected Cases"
            title="Related Work"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2">
            {relatedWork.map((item) => (
              <PortfolioCard key={item.id} item={item} size="large" />
            ))}
          </div>
        </Container>
      </Section>

      <Divider />

      {/* Service CTA */}
      <Section id="contact" spacing="sm">
        <Container>
          <div className="text-center">
            <span className="mb-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-cinematic-orange">
              <span className="h-[1px] w-6 bg-cinematic-orange/60" />
              Let&rsquo;s Talk
            </span>
            <h2 className="mx-auto max-w-3xl font-heading text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-stone-900">
              Ready to elevate your <span className="text-gradient-warm italic font-medium">{service.title.split(' ').pop()}</span>?
            </h2>
            <div className="mt-12 flex justify-center">
              <a 
                href="/contact"
                className="inline-flex h-14 items-center justify-center rounded-full border border-stone-300 bg-white px-8 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-900 shadow-sm transition-all duration-300 hover:border-cinematic-orange hover:text-cinematic-orange"
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
