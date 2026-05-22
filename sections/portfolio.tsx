'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout';
import { FilmCard } from '@/components/film-card';
import { PortfolioCard } from '@/components/portfolio-card';
import { staggerContainer, fadeUp, fadeIn } from '@/animations/variants';
import { ArrowRight, TrendingUp, BarChart3, Users, Target } from 'lucide-react';
import Link from 'next/link';
import type { PortfolioItem } from '@/lib/portfolio';

// MOCK DATA for the Structured Showcase
const WEDDING_PROJECTS: PortfolioItem[] = [
  {
    id: 'w1', title: 'Eternal Vows', category: 'Wedding Film', tagline: 'A love story told through light.', year: '2024', image: '/assets/portfolio/wedding.png', mediaType: 'video', videoUrl: 'https://res.cloudinary.com/dlvqjcd3o/video/upload/q_auto/f_auto/v1778642485/reel2_eh4suw.mp4', tags: ['Cinematic', 'Emotional']
  },
  {
    id: 'w2', title: 'Golden Hour', category: 'Pre-Wedding', tagline: 'Candid moments in Rajasthan.', year: '2023', image: '/assets/portfolio/wedding.png', mediaType: 'image', tags: ['Candid', 'Warm']
  },
  {
    id: 'w3', title: 'The Royal Union', category: 'Destination', tagline: 'Luxury wedding in Udaipur.', year: '2024', image: '/assets/portfolio/wedding.png', mediaType: 'image', tags: ['Luxury', 'Grand']
  }
];

const VIDEOGRAPHY_PROJECTS: PortfolioItem[] = [
  { id: 'v1', title: 'Ember & Oak', category: 'Brand Film', tagline: 'Documentary style production.', year: '2023', image: '/assets/portfolio/brand.png', mediaType: 'video', tags: ['Commercial'] },
  { id: 'v2', title: 'Urban Pulse', category: 'Event Coverage', tagline: 'High energy festival coverage.', year: '2024', image: '/assets/portfolio/social.png', mediaType: 'video', tags: ['Event'] }
];

const EDITING_PROJECTS: PortfolioItem[] = [
  { id: 'e1', title: 'Neon Nights', category: 'Motion Reel', tagline: 'Color grading & transitions.', year: '2024', image: '/assets/portfolio/motion.png', mediaType: 'video', tags: ['Color Grading'] },
  { id: 'e2', title: 'Speed Ramp', category: 'Automotive', tagline: 'Dynamic motion cuts.', year: '2024', image: '/assets/portfolio/brand.png', mediaType: 'video', tags: ['Dynamic'] },
  { id: 'e3', title: 'Rhythm', category: 'Music Video', tagline: 'Beat-synced edits.', year: '2023', image: '/assets/portfolio/social.png', mediaType: 'video', tags: ['Music'] }
];

const SOCIAL_PROJECTS: PortfolioItem[] = [
  { id: 's1', title: 'Bloom Campaign', category: 'Instagram Reels', tagline: '3x engagement growth.', year: '2024', image: '/assets/portfolio/social.png', mediaType: 'video', tags: ['Reels'] },
  { id: 's2', title: 'TechLaunch', category: 'Social Creatives', tagline: 'Product launch sequence.', year: '2024', image: '/assets/portfolio/brand.png', mediaType: 'image', tags: ['Product'] },
  { id: 's3', title: 'FitLife', category: 'TikTok Campaign', tagline: 'Viral fitness trends.', year: '2023', image: '/assets/portfolio/motion.png', mediaType: 'video', tags: ['Viral'] },
];

const WEB_DESIGN_PROJECTS: PortfolioItem[] = [
  { id: 'web1', title: 'Aura Skincare', category: 'E-Commerce UI', tagline: 'Minimal, futuristic shopping experience.', year: '2024', image: '/assets/portfolio/social.png', mediaType: 'image', tags: ['UI/UX', 'E-Commerce'] },
  { id: 'web2', title: 'Nexus FinTech', category: 'Web App', tagline: 'Sleek dashboard interfaces.', year: '2023', image: '/assets/portfolio/brand.png', mediaType: 'image', tags: ['Dashboard'] }
];

const GRAPHIC_PROJECTS: PortfolioItem[] = [
  { id: 'g1', title: 'Lumina Branding', category: 'Visual Identity', tagline: 'Luxury brand kit.', year: '2024', image: '/assets/portfolio/wedding.png', mediaType: 'image', tags: ['Identity'] },
  { id: 'g2', title: 'Neon Posters', category: 'Print Design', tagline: 'Retro-futuristic aesthetics.', year: '2023', image: '/assets/portfolio/motion.png', mediaType: 'image', tags: ['Print'] }
];

const SeoShowcase = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
    {[
      { label: 'Organic Traffic Growth', value: '+240%', desc: '6-month campaign for a leading D2C brand', icon: TrendingUp },
      { label: 'Top 3 Rankings', value: 'Page 1', desc: 'Dominating 15+ high-volume keywords', icon: BarChart3 },
      { label: 'Inbound Leads', value: '4.5x', desc: 'Sustainable ROI through content authority', icon: Users }
    ].map((stat, i) => (
      <div key={i} className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.01] p-8 transition-colors duration-500 hover:bg-white/[0.03]">
        <stat.icon className="h-8 w-8 text-cinematic-orange/60 mb-6 transition-colors duration-500 group-hover:text-cinematic-orange" />
        <div className="font-heading text-4xl text-white mb-2">{stat.value}</div>
        <div className="text-sm font-medium tracking-wider text-white/80 uppercase mb-2">{stat.label}</div>
        <div className="text-sm text-white/50 leading-relaxed">{stat.desc}</div>
      </div>
    ))}
  </div>
);

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

import { useState, useEffect, useMemo } from 'react';
import { portfolioService } from '@/services/portfolio.service';
import type { PortfolioProject } from '@/services/portfolio.service';

export function PortfolioSection() {
  const [dbProjects, setDbProjects] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await portfolioService.getProjects();
        if (data && data.length > 0) {
          const mapped: PortfolioItem[] = data.map((item: PortfolioProject) => ({
            id: item.slug,
            title: item.title,
            category: item.categories?.title || 'Uncategorized',
            tagline: item.seo_title || item.title,
            year: new Date(item.created_at).getFullYear().toString(),
            image: item.thumbnail || '/assets/portfolio/wedding.png',
            mediaType: item.video_url ? 'video' : 'image',
            videoUrl: item.video_url || undefined,
            tags: item.tags || [],
            featured: item.featured
          }));
          setDbProjects(mapped);
        }
      } catch (err) {
        console.error('Failed to load portfolio:', err);
      }
    }
    load();
  }, []);

  // Helper to get category projects and pad with mock data if needed
  const getProjects = (slugs: string[], fallback: PortfolioItem[], minCount: number) => {
    const matching = dbProjects.filter(p => slugs.includes(p.category.toLowerCase().replace(/ /g, '-')) || slugs.includes(p.id));
    const result = [...matching];
    let i = 0;
    while (result.length < minCount) {
      // Add a fallback project, but ensure we don't duplicate IDs if possible, or just append
      result.push({ ...fallback[i % fallback.length], id: `mock-${slugs[0]}-${i}` });
      i++;
    }
    return result;
  };

  const WEDDING = getProjects(['wedding-shooting', 'wedding-film'], WEDDING_PROJECTS, 3);
  const VIDEOGRAPHY = getProjects(['videography'], VIDEOGRAPHY_PROJECTS, 2);
  const EDITING = getProjects(['video-editing', 'commercial-ad', 'cinematic-reel'], EDITING_PROJECTS, 3);
  const SOCIAL = getProjects(['social-media', 'social-campaign'], SOCIAL_PROJECTS, 3);
  const WEB_DESIGN = getProjects(['web-design', 'web-development'], WEB_DESIGN_PROJECTS, 2);
  const GRAPHIC = getProjects(['graphics-designing', 'photography', 'motion-graphics', 'creative-direction'], GRAPHIC_PROJECTS, 2);
  const SEO = getProjects(['seo-and-growth', 'seo-dominance'], [], 0); // SEO uses SeoShowcase mostly
  const ADS = getProjects(['marketing', 'business-growth', 'digital-marketing'], [], 0); // Ads uses AdsShowcase mostly

  return (
    <section id="portfolio" className="relative bg-[#050505] overflow-hidden">
      {/* Abstract cinematic background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(212,118,60,0.08) 0%, transparent 60%)' }} />
        <div className="grain-overlay absolute inset-0" />
      </div>

      <Container size="wide" className="relative z-10 py-24 sm:py-36 lg:py-48">
         {/* Introduction */}
         <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-10%' }}
            className="mb-24 sm:mb-36 text-center"
         >
            <motion.span variants={fadeIn} className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-cinematic-orange/80 mb-6">
              <span className="h-[1px] w-6 bg-cinematic-orange/40" />
              Our Work
              <span className="h-[1px] w-6 bg-cinematic-orange/40" />
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-foreground mx-auto max-w-4xl">
              A Symphony of <span className="text-gradient-warm italic">Vision & Growth</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-6 text-lg text-foreground/70 max-w-2xl mx-auto">
              We don&rsquo;t just offer services. We craft dedicated cinematic experiences and engineered growth campaigns. Explore our disciplines.
            </motion.p>
         </motion.div>

         <div className="flex flex-col gap-32 sm:gap-48">
            
            {/* 1. WEDDING SHOOTING */}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <FilmCard size="large" item={WEDDING[1]} />
                  <FilmCard size="large" item={WEDDING[2]} />
                </div>
              </div>
            </motion.div>

            {/* 2. VIDEOGRAPHY */}
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
                <FilmCard size="large" item={VIDEOGRAPHY[0]} />
                <FilmCard size="large" item={VIDEOGRAPHY[1]} />
              </div>
            </motion.div>

            {/* 3. VIDEO EDITING */}
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

            {/* 4. SOCIAL MEDIA CAMPAIGN */}
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
                <div className="lg:col-span-4 flex flex-col gap-6">
                   <FilmCard size="default" item={SOCIAL[1]} />
                   <FilmCard size="default" item={SOCIAL[2]} />
                </div>
              </div>
            </motion.div>

            {/* 5. WEBSITE DESIGN */}
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
                 <PortfolioCard size="large" item={WEB_DESIGN[0]} className="md:translate-y-12" />
                 <PortfolioCard size="large" item={WEB_DESIGN[1]} />
              </div>
            </motion.div>

            {/* 6. GRAPHIC DESIGN */}
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
                <PortfolioCard size="default" item={GRAPHIC[0]} className="md:-translate-y-8" />
                <PortfolioCard size="default" item={GRAPHIC[1]} className="md:translate-y-8" />
              </div>
            </motion.div>

            {/* 7. SEO */}
            <div id="portfolio-seo-and-growth" className="absolute -mt-32" />
            <div id="portfolio-seo" className="absolute -mt-32" />
            <motion.div 
               id="portfolio-seo-dominance"
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: '-10%' }}
               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
               className="relative border border-white/[0.05] bg-gradient-to-b from-white/[0.02] to-transparent p-8 sm:p-12 md:p-16 rounded-3xl scroll-mt-32"
            >
              <div className="max-w-2xl">
                <h3 className="text-4xl sm:text-5xl font-heading text-white mb-4">SEO</h3>
                <p className="text-foreground/70 text-lg">Clean, trustworthy, and professional. We don&rsquo;t guess—we analyze, rank, and grow your organic footprint with data-driven strategy.</p>
              </div>
              <SeoShowcase />
            </motion.div>

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


