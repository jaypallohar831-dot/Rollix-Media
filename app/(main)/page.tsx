import { HeroSection } from '@/sections/hero';
import { PhilosophySection } from '@/sections/philosophy';
import { PortfolioSection } from '@/sections/portfolio';
import { TestimonialsSection } from '@/sections/testimonials';
import { ProcessSection } from '@/sections/process';
import { Section, Container, Divider } from '@/components/layout';
import { HomepageLoader } from '@/components/homepage-loader';

export default function Home() {
  return (
    <HomepageLoader>
    <main className="relative">
      <HeroSection />

      {/* Brand Philosophy — emotional manifesto */}
      <PhilosophySection />

      <Divider />

      {/* Portfolio — Digital Marketing Services Showcase */}
      <PortfolioSection />

      <Divider />

      {/* Testimonials — social proof */}
      <TestimonialsSection />

      <Divider />

      {/* Process — behind the craft */}
      <ProcessSection />

      <Divider />

      <Section id="contact" spacing="lg" withBackground>
        <Container>
          <div className="text-center">
            <span className="mb-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-cinematic-orange/80">
              <span className="h-[1px] w-6 bg-cinematic-orange/40" />
              Let&rsquo;s Connect
            </span>
            <h2 className="mx-auto max-w-3xl font-heading text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-foreground">
              Ready to accelerate your <span className="text-gradient-warm italic">Digital Growth</span>?
            </h2>
            <div className="mt-12 flex justify-center">
              <a 
                href="/contact"
                className="inline-flex h-14 items-center justify-center rounded-full border border-cinematic-orange/30 bg-cinematic-orange/10 px-8 text-[11px] font-medium uppercase tracking-[0.2em] text-cinematic-orange transition-all duration-500 hover:bg-cinematic-orange hover:text-white"
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
