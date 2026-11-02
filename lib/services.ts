import {
  Scissors,
  Monitor,
  Share2,
  TrendingUp,
  Video,
  Megaphone,
  Zap,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  index: string;
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  featured?: boolean;
  pricingStarting?: string;
  category?: 'core' | 'growth' | 'specialized';
}

export const SERVICES: ServiceItem[] = [
  {
    index: '01',
    slug: 'videography',
    title: 'Video Production',
    description:
      'Cinema-grade commercial shoots, brand films, and high-retention product videos that capture attention and build authority.',
    icon: Video,
    featured: true,
    pricingStarting: 'Starting from ₹40,000 / project',
    category: 'core',
  },
  {
    index: '02',
    slug: 'video-editing',
    title: 'Video Editing & Motion',
    description:
      'Fast-paced, high-retention reel edits, sound design, dynamic typography, and cinematic color grading engineered for engagement.',
    icon: Scissors,
    pricingStarting: 'Starting from ₹15,000 / project',
    category: 'core',
  },
  {
    index: '03',
    slug: 'social-media',
    title: 'Social Media Growth',
    description:
      'Algorithm-informed organic strategies, scroll-stopping Instagram reels, cohesive feed curation, and audience growth systems.',
    icon: Share2,
    pricingStarting: 'Starting from ₹25,000 / month',
    category: 'core',
  },
  {
    index: '04',
    slug: 'digital-marketing',
    title: 'Meta & Google Ads',
    description:
      'High-converting performance marketing funnels, hyper-targeted local campaigns, and lead generation designed for measurable ROI.',
    icon: Megaphone,
    pricingStarting: 'Starting from ₹15,000 / month',
    category: 'core',
  },
  {
    index: '05',
    slug: 'web-design',
    title: 'Web Design & Dev',
    description:
      'Bespoke, lightning-fast digital storefronts and web apps built with Next.js, tailored for seamless conversion on desktop and mobile.',
    icon: Monitor,
    pricingStarting: 'Starting from ₹15,000 / project',
    category: 'growth',
  },
  {
    index: '06',
    slug: 'seo-dominance',
    title: 'SEO & Organic Growth',
    description:
      'Data-driven on-page SEO, technical audits, Google Business Profile optimization, and local search dominance that compounds over time.',
    icon: TrendingUp,
    pricingStarting: 'Starting from ₹20,000 / month',
    category: 'growth',
  },
  {
    index: '07',
    slug: 'graphic-design',
    title: 'Brand & Graphic Design',
    description:
      'Cohesive visual identity systems, logos, high-impact ad creatives, and marketing collateral with bold, modern typography.',
    icon: Zap,
    pricingStarting: 'Starting from ₹10,000 / project',
    category: 'growth',
  },
  {
    index: '08',
    slug: 'wedding-shooting',
    title: 'Wedding Cinematography',
    description:
      'Cinematic Indian wedding storytelling with warm luxury tones, emotional narratives, and timeless visual memories.',
    icon: Sparkles,
    pricingStarting: 'Starting from ₹1,50,000 / Get a quote',
    category: 'specialized',
  },
];

export interface ServiceDetailContent {
  deliverables: { title: string; desc: string }[];
  process: { step: string; desc: string }[];
  tools?: { name: string; color: string; icon: string }[];
  pricing: string;
}

export const SERVICE_DETAILS_MAP: Record<string, ServiceDetailContent> = {
  'videography': {
    deliverables: [
      { title: 'Commercials', desc: 'High-end advertisements that drive brand value.' },
      { title: 'Brand Films', desc: 'Documentary-style narratives for your company.' },
      { title: 'Event Coverage', desc: 'Dynamic, multi-cam capture of live events.' },
      { title: 'Interviews & Testimonials', desc: 'Professionally lit with crystal-clear audio.' }
    ],
    process: [
      { step: 'Concept & Scripting', desc: 'Developing the core visual idea, storyboard, and script.' },
      { step: 'Production Shoot', desc: 'Executing the shoot with our cinema-line 4K/6K gear.' },
      { step: 'Post-production', desc: 'Editing, color grading, and custom sound design.' },
      { step: 'Delivery', desc: 'Handing off broadcast and social-ready master files.' }
    ],
    tools: [
      { name: 'Sony FX3 & Cinema Line', color: '#ff3333', icon: 'SiSony' },
      { name: 'DJI Ronin 4D & Drones', color: '#dddddd', icon: 'SiDji' },
      { name: 'Aputure Lighting', color: '#ffaa00', icon: 'Zap' },
      { name: 'Sennheiser Pro Audio', color: '#00aaff', icon: 'Monitor' }
    ],
    pricing: 'Starting from ₹40,000 / project (Get a custom quote)'
  },
  'video-editing': {
    deliverables: [
      { title: 'Color Grading', desc: 'Professional cinematic color correction and mood matching.' },
      { title: 'Sound Design', desc: 'Immersive audio mixing, SFX, and foley.' },
      { title: 'Motion Graphics', desc: 'Custom kinetic typography and animated lower thirds.' },
      { title: 'High Retention Pacing', desc: 'Optimized hooks and pacing for Instagram & YouTube.' }
    ],
    process: [
      { step: 'Footage Ingest', desc: 'Organizing and high-speed proxy generation.' },
      { step: 'Rough Cut', desc: 'Building the narrative rhythm and hook structure.' },
      { step: 'Refinement', desc: 'Pacing, sound design, transitions, and VFX.' },
      { step: 'Final Polish', desc: 'Color grading, mastering, and multi-format export.' }
    ],
    tools: [
      { name: 'Premiere Pro', color: '#ea77ff', icon: 'Video' },
      { name: 'After Effects', color: '#9999ff', icon: 'Sparkles' },
      { name: 'DaVinci Resolve', color: '#ff5555', icon: 'SiDavinciresolve' },
      { name: 'CapCut Pro', color: '#ffffff', icon: 'Scissors' }
    ],
    pricing: 'Starting from ₹15,000 / project (Get a custom quote)'
  },
  'social-media': {
    deliverables: [
      { title: 'Viral Reels & Shorts', desc: 'Short-form content engineered for maximum algorithmic reach.' },
      { title: 'Carousel Sets', desc: 'High-value educational and engaging multi-slide assets.' },
      { title: 'Grid Aesthetics', desc: 'A curated, premium visual identity for your brand profile.' },
      { title: 'Growth & Content Strategy', desc: 'Monthly content calendars aligned with sales targets.' }
    ],
    process: [
      { step: 'Account Audit', desc: 'Analyzing your current presence, audience, and competitors.' },
      { step: 'Content Plan', desc: 'Mapping out a month of strategic, high-converting topics.' },
      { step: 'Creation & Polish', desc: 'Shooting, designing, and caption writing.' },
      { step: 'Publishing & Review', desc: 'Scheduling and analyzing engagement data.' }
    ],
    tools: [
      { name: 'Meta Business Suite', color: '#0668e1', icon: 'SiMeta' },
      { name: 'Canva Pro', color: '#00c4cc', icon: 'SiCanva' },
      { name: 'CapCut Pro', color: '#ffffff', icon: 'Video' },
      { name: 'Instagram Insights', color: '#ea77ff', icon: 'TrendingUp' }
    ],
    pricing: 'Starting from ₹25,000 / month (Get a custom quote)'
  },
  'digital-marketing': {
    deliverables: [
      { title: 'Meta Ads (FB & Insta)', desc: 'High-ROI campaigns targeting local and national audiences.' },
      { title: 'Google Search & Maps', desc: 'Intent-driven campaigns capturing customers searching now.' },
      { title: 'WhatsApp Direct Funnel', desc: 'Zero-friction lead routing directly into your WhatsApp.' },
      { title: 'Analytics & Reporting', desc: 'Real-time dashboard tracking cost per lead and conversions.' }
    ],
    process: [
      { step: 'Strategy & Audience', desc: 'Defining target cohorts, budgets, and compelling offers.' },
      { step: 'Creative Production', desc: 'Producing high-converting video and image ad creatives.' },
      { step: 'Campaign Launch', desc: 'Setting up tracking pixels, events, and testing ad sets.' },
      { step: 'Optimization & Scaling', desc: 'Pruning underperforming ads and scaling top performers.' }
    ],
    tools: [
      { name: 'Meta Ads Manager', color: '#0668e1', icon: 'SiMeta' },
      { name: 'Google Ads', color: '#4285f4', icon: 'SiGoogleads' },
      { name: 'Google Analytics 4', color: '#f4b400', icon: 'SiGoogleanalytics' },
      { name: 'WhatsApp Business API', color: '#25D366', icon: 'Share2' }
    ],
    pricing: 'Starting from ₹15,000 / month management (Get a custom quote)'
  },
  'web-design': {
    deliverables: [
      { title: 'Custom UI/UX', desc: 'Bespoke designs tailored specifically to your brand identity.' },
      { title: 'Responsive Development', desc: 'Flawless presentation across phones, tablets, and desktops.' },
      { title: 'Next.js & Performance', desc: 'Sub-second page loads, SEO optimization, and clean code.' },
      { title: 'CMS Integration', desc: 'Easy-to-use admin dashboard to manage projects and content.' }
    ],
    process: [
      { step: 'Information Architecture', desc: 'Mapping user journeys and conversion funnels.' },
      { step: 'Figma Prototyping', desc: 'Crafting the visual language, typography, and interactive components.' },
      { step: 'Modern Codebase', desc: 'Developing with Next.js, Tailwind CSS, and TypeScript.' },
      { step: 'Launch & Handoff', desc: 'Domain setup, SSL, analytics integration, and training.' }
    ],
    tools: [
      { name: 'Figma', color: '#f24e1e', icon: 'SiFigma' },
      { name: 'Next.js', color: '#ffffff', icon: 'SiNextdotjs' },
      { name: 'Tailwind CSS', color: '#38bdf8', icon: 'SiTailwindcss' },
      { name: 'Vercel', color: '#ffffff', icon: 'SiVercel' }
    ],
    pricing: 'Starting from ₹15,000 / project (Get a custom quote)'
  },
  'seo-dominance': {
    deliverables: [
      { title: 'Technical Audit', desc: 'Eliminating crawl errors, speed bottlenecks, and broken links.' },
      { title: 'Keyword Strategy', desc: 'Targeting high-intent local and commercial search phrases.' },
      { title: 'Local GBP Ranking', desc: 'Optimizing Google Business Profile for map pack visibility.' },
      { title: 'On-Page Content', desc: 'Optimizing titles, headers, schema markup, and internal linking.' }
    ],
    process: [
      { step: 'Audit & Baseline', desc: 'Deep dive into current rankings, citations, and search gaps.' },
      { step: 'Technical Fixes', desc: 'Implementing structured data, metadata, and core web vitals.' },
      { step: 'Local Optimization', desc: 'Enhancing local relevance across Bhilwara and target markets.' },
      { step: 'Monthly Tracking', desc: 'Transparent reporting of impressions, rankings, and inquiries.' }
    ],
    tools: [
      { name: 'Google Search Console', color: '#4285f4', icon: 'SiGooglesearchconsole' },
      { name: 'Google Analytics 4', color: '#f4b400', icon: 'SiGoogleanalytics' },
      { name: 'SEMrush / Ahrefs', color: '#ff6600', icon: 'TrendingUp' },
      { name: 'Schema Markup Validator', color: '#38bdf8', icon: 'Monitor' }
    ],
    pricing: 'Starting from ₹20,000 / month (Get a custom quote)'
  },
  'graphic-design': {
    deliverables: [
      { title: 'Brand Identity Systems', desc: 'Logos, color palettes, typography, and brand usage guidelines.' },
      { title: 'Ad Creatives', desc: 'Thumb-stopping graphics for Meta, Google, and outdoor boards.' },
      { title: 'Marketing Collateral', desc: 'Brochures, pitch decks, visiting cards, and product packaging.' },
      { title: 'Vector Asset Handoff', desc: 'Print-ready CMYK files and high-res digital vectors.' }
    ],
    process: [
      { step: 'Discovery', desc: 'Understanding brand positioning, tone, and visual goals.' },
      { step: 'Concept Exploration', desc: 'Developing distinct visual directions and moodboards.' },
      { step: 'Refinement', desc: 'Polishing typography, proportions, and application contexts.' },
      { step: 'Asset Packaging', desc: 'Delivering full source files across AI, PSD, SVG, and PDF.' }
    ],
    tools: [
      { name: 'Adobe Illustrator', color: '#ff9a00', icon: 'DiIllustrator' },
      { name: 'Adobe Photoshop', color: '#31a8ff', icon: 'DiPhotoshop' },
      { name: 'Figma', color: '#f24e1e', icon: 'SiFigma' },
      { name: 'CorelDRAW', color: '#00cc00', icon: 'SiCoreldraw' }
    ],
    pricing: 'Starting from ₹10,000 / project (Get a custom quote)'
  },
  'wedding-shooting': {
    deliverables: [
      { title: 'Cinematic Wedding Teaser', desc: 'A 1–2 minute high-emotion teaser trailer of your wedding.' },
      { title: 'Full Feature Film', desc: 'A 20–30 minute beautifully scored and paced wedding movie.' },
      { title: 'Candid & Drone Coverage', desc: 'Unscripted intimate moments and sweeping aerial venue vistas.' },
      { title: 'Highlight Reels for Instagram', desc: 'Ready-to-share vertical reels delivered rapidly after events.' }
    ],
    process: [
      { step: 'Family Consultation', desc: 'Understanding your wedding timeline, rituals, and aesthetic preferences.' },
      { step: 'Pre-production Prep', desc: 'Scouting venue lighting, sound coordination, and crew assignments.' },
      { step: 'Discreet Cinematic Shoot', desc: 'Multi-camera cinema setup with natural candid capture.' },
      { step: 'Artisan Post-production', desc: 'Grading, sound design, music licensing, and emotional storyline editing.' }
    ],
    tools: [
      { name: 'Sony FX3 & Cinema Cameras', color: '#ff3333', icon: 'SiSony' },
      { name: 'DJI Ronin & 4K Drones', color: '#dddddd', icon: 'SiDji' },
      { name: 'Aputure Ambient Lighting', color: '#ffaa00', icon: 'Zap' },
      { name: '32-Bit Float Audio Systems', color: '#00aaff', icon: 'Monitor' }
    ],
    pricing: 'Starting from ₹1,50,000 (Custom quote based on events)'
  },
};

// Aliases for database slugs
SERVICE_DETAILS_MAP['web-designing'] = SERVICE_DETAILS_MAP['web-design'];
SERVICE_DETAILS_MAP['seo-and-growth'] = SERVICE_DETAILS_MAP['seo-dominance'];
SERVICE_DETAILS_MAP['wedding-cinematography'] = SERVICE_DETAILS_MAP['wedding-shooting'];
SERVICE_DETAILS_MAP['marketing'] = SERVICE_DETAILS_MAP['digital-marketing'];
SERVICE_DETAILS_MAP['business-growth'] = SERVICE_DETAILS_MAP['digital-marketing'];
