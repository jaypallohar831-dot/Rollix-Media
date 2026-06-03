'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout';
import { FilmCard } from '@/components/film-card';
import { PortfolioCard } from '@/components/portfolio-card';
import { staggerContainer, fadeUp, fadeIn } from '@/animations/variants';
import { ArrowRight, Target } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { PortfolioItem } from '@/lib/portfolio';

const AdsShowcase = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
    {[
      { title: 'Google Search Dominance', metric: '12% CTR', stat: '45% lower CPA', bg: 'from-blue-500/10 to-transparent' },
      { title: 'Meta Conversion Campaigns', metric: '3.8x ROAS', stat: 'Scaling ad spend profitably', bg: 'from-purple-500/10 to-transparent' },
    ].map((ad, i) => (
      <div key={i} className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 p-8 sm:p-10 transition-colors duration-500 hover:border-white/[0.15]">
        <div className={`absolute inset-0 bg-gradient-to-br ${ad.bg} opacity-20 transition-opacity duration-500 group-hover:opacity-40`} />
        <Target className="relative z-10 h-10 w-10 text-white/40 mb-8 transition-colors duration-500 group-hover:text-white/80" />
        <h4 className="relative z-10 text-xl font-heading text-white mb-2">{ad.title}</h4>
        <div className="relative z-10 flex items-center gap-4 mt-8">
          <div className="flex flex-col">
            <span className="text-3xl font-light text-cinematic-orange">{ad.metric}</span>
            <span className="text-xs uppercase tracking-widest text-white/50 mt-1">Performance</span>
          </div>
          <div className="w-[1px] h-10 bg-white/10 mx-2" />
          <div className="flex flex-col">
            <span className="text-lg text-white/90">{ad.stat}</span>
            <span className="text-xs uppercase tracking-widest text-white/50 mt-1">Impact</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

interface PortfolioSectionProps {
  projects: PortfolioItem[];
}

export function PortfolioSection({ projects }: PortfolioSectionProps) {
  const getProjects = (slugs: string[]) => {
    return projects.filter(p => slugs.includes(p.category.toLowerCase().replace(/ /g, '-')));
  };

  const WEDDING = getProjects(['wedding-shooting', 'wedding-film']);
  const VIDEOGRAPHY = getProjects(['videography']);
  const EDITING = getProjects(['video-editing', 'commercial-ad', 'cinematic-reel']);
  const SOCIAL = getProjects(['social-media', 'social-campaign']);
  const WEB_DESIGN = getProjects(['web-design', 'web-development']);
  const GRAPHIC = getProjects(['graphics-designing', 'photography', 'motion-graphics', 'creative-direction']);

  return (
    <section id="portfolio" className="relative bg-[#050505] overflow-hidden">
      {/* Abstract cinematic background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(212,118,60,0.08) 0%, transparent 60%)' }} />
        <div className="grain-overlay absolute inset-0" />
      </div>

      <Container size="wide" className="relative z-10 py-24 sm:py-36 lg:py-48">
         {/* Masonry Hero Introduction */}
         <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-10%' }}
            className="relative w-full min-h-[60vh] sm:min-h-[80vh] flex items-center justify-center mb-24 sm:mb-40"
         >
            {/* Grid of Images in background */}
            <motion.div variants={staggerContainer} className="absolute inset-0 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 opacity-[0.35] pointer-events-none">
              {/* Column 1 */}
              <div className="flex flex-col gap-4 -translate-y-12">
                <motion.div variants={fadeUp} className="relative w-full rounded-xl overflow-hidden h-40">
                  <Image src="/assets/premium/Overlapping Cards/video editing.jpg" alt="" fill className="object-cover" quality={50} sizes="20vw" />
                </motion.div>
                <motion.div variants={fadeUp} className="relative w-full rounded-xl overflow-hidden h-64">
                  <Image src="/assets/portfolio/wedding.png" alt="" fill className="object-cover" quality={50} sizes="20vw" />
                </motion.div>
              </div>
              {/* Column 2 */}
              <div className="flex flex-col gap-4 translate-y-8">
                <motion.div variants={fadeUp} className="relative w-full rounded-xl overflow-hidden h-64">
                  <Image src="/assets/premium/Overlapping Cards/seo.jpg" alt="" fill className="object-cover" quality={50} sizes="20vw" />
                </motion.div>
                <motion.div variants={fadeUp} className="relative w-full rounded-xl overflow-hidden h-40">
                  <Image src="/assets/portfolio/brand.png" alt="" fill className="object-cover" quality={50} sizes="20vw" />
                </motion.div>
              </div>
              {/* Column 3 - Center */}
              <div className="flex flex-col gap-4 -translate-y-4 hidden sm:flex">
                 <motion.div variants={fadeUp} className="relative w-full rounded-xl overflow-hidden h-32">
                   <Image src="/assets/premium/Overlapping Cards/web designing.jpg" alt="" fill className="object-cover" quality={50} sizes="20vw" />
                 </motion.div>
                 <motion.div variants={fadeUp} className="relative w-full rounded-xl overflow-hidden h-48">
                   <Image src="/assets/portfolio/motion.png" alt="" fill className="object-cover" quality={50} sizes="20vw" />
                 </motion.div>
                 <motion.div variants={fadeUp} className="relative w-full rounded-xl overflow-hidden h-32">
                   <Image src="/assets/portfolio/social.png" alt="" fill className="object-cover" quality={50} sizes="20vw" />
                 </motion.div>
              </div>
              {/* Column 4 */}
              <div className="flex flex-col gap-4 translate-y-16 hidden md:flex">
                <motion.div variants={fadeUp} className="relative w-full rounded-xl overflow-hidden h-56">
                  <Image src="/assets/premium/Overlapping Cards/marketing.jpg" alt="" fill className="object-cover" quality={50} sizes="20vw" />
                </motion.div>
                <motion.div variants={fadeUp} className="relative w-full rounded-xl overflow-hidden h-56">
                  <Image src="/assets/portfolio/wedding.png" alt="" fill className="object-cover" quality={50} sizes="20vw" />
                </motion.div>
              </div>
              {/* Column 5 */}
              <div className="flex flex-col gap-4 -translate-y-8 hidden md:flex">
                <motion.div variants={fadeUp} className="relative w-full rounded-xl overflow-hidden h-40">
                  <Image src="/assets/premium/Overlapping Cards/graphics design.jpg" alt="" fill className="object-cover" quality={50} sizes="20vw" />
                </motion.div>
                <motion.div variants={fadeUp} className="relative w-full rounded-xl overflow-hidden h-64">
                  <Image src="/assets/premium/Overlapping Cards/business growth.jpg" alt="" fill className="object-cover" quality={50} sizes="20vw" />
                </motion.div>
              </div>
            </motion.div>

            {/* Central Glass Card */}
            <motion.div 
              variants={staggerContainer}
              className="relative z-10 flex flex-col items-center text-center bg-[#050505]/90 border border-white/[0.08] rounded-[2rem] p-10 sm:p-16 max-w-3xl mx-4 shadow-2xl"
            >
              <motion.span variants={fadeIn} className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-cinematic-orange/80 mb-6">
                <span className="h-[1px] w-6 bg-cinematic-orange/40" />
                Our Work
                <span className="h-[1px] w-6 bg-cinematic-orange/40" />
              </motion.span>
              <motion.h2 variants={fadeUp} className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-white">
                Your Next Big <br className="hidden sm:block" /> <span className="text-gradient-warm italic">Idea Starts Here</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-6 text-base sm:text-lg text-white/70">
                Imagination is the first step to innovation. <br/>
                Explore our digital footprint.
              </motion.p>
            </motion.div>
         </motion.div>

         <div className="flex flex-col gap-32 sm:gap-48">
            
            {/* 1. WEDDING SHOOTING */}
            {WEDDING.length > 0 && (
              <motion.div 
                 id="portfolio-wedding-shooting"
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: '-10%' }}
                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                 className="relative scroll-mt-32"
              >
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-heading text-cinematic-warm mb-4">Wedding Shooting</h3>
                    <p className="text-foreground/70 max-w-xl text-lg sm:text-xl">Cinematic Indian wedding visuals. Emotional storytelling wrapped in warm luxury tones. We capture the unseen moments that last a lifetime.</p>
                  </div>
                  <Link href="/contact" className="group inline-flex items-center gap-2 text-sm text-cinematic-orange hover:text-white transition-colors duration-300">
                    Book a cinematic shoot 
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
                <div className="flex flex-col gap-6 sm:gap-8">
                  <FilmCard size="hero" item={WEDDING[0]} highlightOnHover />
                  {WEDDING.length > 1 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                      {WEDDING.slice(1).map(proj => <FilmCard key={proj.id} size="large" item={proj} />)}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* 2. VIDEOGRAPHY */}
            {VIDEOGRAPHY.length > 0 && (
              <motion.div 
                 id="portfolio-videography"
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: '-10%' }}
                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                 className="relative scroll-mt-32"
              >
                <div className="mb-12">
                  <h3 className="text-4xl sm:text-5xl font-heading text-white mb-4">Videography</h3>
                  <p className="text-foreground/70 max-w-xl text-lg">Commercial shoots, brand films, and event production. Premium visual storytelling that elevates your brand&rsquo;s presence.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {VIDEOGRAPHY.map(proj => <FilmCard key={proj.id} size="large" item={proj} />)}
                </div>
              </motion.div>
            )}

            {/* 3. VIDEO EDITING */}
            {EDITING.length > 0 && (
              <motion.div 
                 id="portfolio-video-editing"
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: '-10%' }}
                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                 className="relative scroll-mt-32"
              >
                <div className="mb-12 md:text-right flex flex-col md:items-end">
                  <h3 className="text-4xl sm:text-5xl font-heading text-white mb-4">Video Editing</h3>
                  <p className="text-foreground/70 max-w-xl text-lg">Dynamic, motion-driven sequences. From color grading to complex transitions, we shape raw footage into high-retention masterpieces.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {EDITING.map(proj => <FilmCard key={proj.id} size="default" item={proj} />)}
                </div>
              </motion.div>
            )}

            {/* 4. SOCIAL MEDIA CAMPAIGN */}
            {SOCIAL.length > 0 && (
              <motion.div 
                 id="portfolio-social-media"
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: '-10%' }}
                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                 className="relative scroll-mt-32"
              >
                <div className="mb-12">
                  <h3 className="text-4xl sm:text-5xl font-heading text-white mb-4">Social Campaigns</h3>
                  <p className="text-foreground/70 max-w-xl text-lg">Energetic, fast-paced creatives. Viral Instagram reels and engagement-focused social content designed to stop the scroll.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8">
                     <FilmCard size="large" item={SOCIAL[0]} />
                  </div>
                  {SOCIAL.length > 1 && (
                    <div className="lg:col-span-4 flex flex-col gap-6">
                       {SOCIAL.slice(1).map(proj => <FilmCard key={proj.id} size="default" item={proj} />)}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* 5. WEBSITE DESIGN */}
            {WEB_DESIGN.length > 0 && (
              <>
              <div id="portfolio-web-development" className="absolute -mt-32" />
              <motion.div 
                 id="portfolio-web-design"
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: '-10%' }}
                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                 className="relative scroll-mt-32"
              >
                <div className="mb-12 max-w-xl">
                  <h3 className="text-4xl sm:text-5xl font-heading text-white mb-4">Website Design</h3>
                  <p className="text-foreground/70 text-lg">Minimal, futuristic, elegant. Immersive desktop and mobile interfaces that feel less like websites and more like digital experiences.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                   {WEB_DESIGN.map((proj, i) => (
                     <PortfolioCard key={proj.id} size="large" item={proj} className={i % 2 === 0 ? "md:translate-y-12" : ""} />
                   ))}
                </div>
              </motion.div>
              </>
            )}

            {/* 6. GRAPHIC DESIGN */}
            {GRAPHIC.length > 0 && (
              <>
              <div id="portfolio-graphics-designing" className="absolute -mt-32" />
              <div id="portfolio-graphic-design" className="absolute -mt-32" />
              <motion.div 
                 id="portfolio-creative-direction"
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: '-10%' }}
                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                 className="relative scroll-mt-32"
              >
                <div className="mb-12 text-center max-w-2xl mx-auto">
                  <h3 className="text-4xl sm:text-5xl font-heading text-white mb-4">Graphic Design</h3>
                  <p className="text-foreground/70 text-lg">Luxury visual identities. Posters, branding systems, and social creatives engineered with modern typography and asymmetric elegance.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12 lg:px-24">
                  {GRAPHIC.map((proj, i) => (
                    <PortfolioCard key={proj.id} size="default" item={proj} className={i % 2 === 0 ? "md:-translate-y-8" : "md:translate-y-8"} />
                  ))}
                </div>
              </motion.div>
              </>
            )}

            {/* 8. META / GOOGLE ADS */}
            <div id="portfolio-marketing" className="absolute -mt-32" />
            <div id="portfolio-ads" className="absolute -mt-32" />
            <div id="portfolio-business-growth" className="absolute -mt-32" />
            <motion.div 
               id="portfolio-digital-marketing"
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: '-10%' }}
               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
               className="relative scroll-mt-32"
            >
              <div className="mb-12 max-w-2xl">
                <h3 className="text-4xl sm:text-5xl font-heading text-white mb-4">Meta & Google Ads</h3>
                <p className="text-foreground/70 text-lg">Strategic, conversion-focused campaigns. We build premium ad funnels and performance dashboards that scale profitably.</p>
              </div>
              <AdsShowcase />
            </motion.div>

         </div>

      </Container>
    </section>
  );
}
