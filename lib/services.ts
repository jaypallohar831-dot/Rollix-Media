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
}

export const SERVICES: ServiceItem[] = [
  {
    index: '01',
    slug: 'wedding-shooting',
    title: 'Wedding Shooting',
    description:
      'Cinematic Indian wedding visuals. Emotional storytelling wrapped in warm luxury tones. We capture the unseen moments that last a lifetime.',
    icon: Sparkles,
    featured: true,
  },
  {
    index: '02',
    slug: 'videography',
    title: 'Videography',
    description:
      'Commercial shoots, brand films, and event production. Premium visual storytelling that elevates your brand\'s presence.',
    icon: Video,
  },
  {
    index: '03',
    slug: 'video-editing',
    title: 'Video Editing',
    description:
      'Dynamic, motion-driven sequences. From color grading to complex transitions, we shape raw footage into high-retention masterpieces.',
    icon: Scissors,
  },
  {
    index: '04',
    slug: 'social-media',
    title: 'Social Media',
    description:
      'Energetic, fast-paced creatives. Viral Instagram reels and engagement-focused social content designed to stop the scroll.',
    icon: Share2,
  },
  {
    index: '05',
    slug: 'web-design',
    title: 'Web Design',
    description:
      'Minimal, futuristic, elegant. Immersive desktop and mobile interfaces that feel less like websites and more like digital experiences.',
    icon: Monitor,
  },
  {
    index: '06',
    slug: 'graphic-design',
    title: 'Graphic Design',
    description:
      'Luxury visual identities. Posters, branding systems, and social creatives engineered with modern typography and asymmetric elegance.',
    icon: Zap,
  },
  {
    index: '07',
    slug: 'seo-dominance',
    title: 'SEO',
    description:
      'Clean, trustworthy, and professional. We don\'t guess—we analyze, rank, and grow your organic footprint with data-driven strategy.',
    icon: TrendingUp,
  },
  {
    index: '08',
    slug: 'digital-marketing',
    title: 'Ads (Meta/Google)',
    description:
      'Strategic, conversion-focused campaigns. We build premium ad funnels and performance dashboards that scale profitably.',
    icon: Megaphone,
  },
];

export interface ServiceDetailContent {
  deliverables: { title: string; desc: string }[];
  process: { step: string; desc: string }[];
  tools?: { name: string; color: string; icon: string }[];
  pricing: string;
}

export const SERVICE_DETAILS_MAP: Record<string, ServiceDetailContent> = {
  'wedding-shooting': {
    deliverables: [
      { title: 'Cinematic Teaser', desc: 'A 1-minute high-energy teaser of your wedding.' },
      { title: 'Full Feature Film', desc: 'A 20-30 minute emotional and beautifully paced wedding movie.' },
      { title: 'Candid Photography', desc: 'Unscripted, raw moments captured perfectly.' },
      { title: 'Drone & Aerials', desc: 'Breathtaking bird’s-eye views of your venue and events.' }
    ],
    process: [
      { step: 'Consultation', desc: 'Understanding your story, preferences, and aesthetic.' },
      { step: 'Pre-production', desc: 'Scouting locations and preparing the gear and crew.' },
      { step: 'The Shoot', desc: 'Unobtrusive, cinematic coverage on your big day.' },
      { step: 'Post-production', desc: 'Color grading, sound design, and emotional editing.' }
    ],
    tools: [
      { name: 'Sony FX3 & RED', color: '#ff3333', icon: 'SiSony' },
      { name: 'DJI Ronin & Drones', color: '#dddddd', icon: 'SiDji' },
      { name: 'Aputure Lighting', color: '#ffaa00', icon: 'Zap' },
      { name: 'Teradek Wireless', color: '#00aaff', icon: 'Monitor' }
    ],
    pricing: 'Packages start at ₹1,50,000 / $1,800'
  },
  'video-editing': {
    deliverables: [
      { title: 'Color Grading', desc: 'Professional cinematic color correction.' },
      { title: 'Sound Design', desc: 'Immersive audio mixing and foley.' },
      { title: 'Motion Graphics', desc: 'Custom lower thirds and animated titles.' },
      { title: 'Fast Turnaround', desc: 'Optimized workflows for quick delivery.' }
    ],
    process: [
      { step: 'Footage Ingest', desc: 'Organizing and proxy generation.' },
      { step: 'Rough Cut', desc: 'Building the narrative structure.' },
      { step: 'Refinement', desc: 'Pacing, transitions, and VFX.' },
      { step: 'Final Polish', desc: 'Color grading and mastering.' }
    ],
    tools: [
      { name: 'Premiere Pro', color: '#ea77ff', icon: 'Video' },
      { name: 'After Effects', color: '#9999ff', icon: 'Sparkles' },
      { name: 'DaVinci Resolve', color: '#ff5555', icon: 'SiDavinciresolve' },
      { name: 'CapCut Pro', color: '#ffffff', icon: 'Scissors' }
    ],
    pricing: 'Starts at ₹15,000 / $200 per project'
  },
  'videography': {
    deliverables: [
      { title: 'Commercials', desc: 'High-end advertisements that drive brand value.' },
      { title: 'Brand Films', desc: 'Documentary-style narratives for your company.' },
      { title: 'Event Coverage', desc: 'Dynamic, multi-cam capture of live events.' },
      { title: 'Interviews', desc: 'Professionally lit and crystal clear audio.' }
    ],
    process: [
      { step: 'Concept', desc: 'Developing the core visual idea and script.' },
      { step: 'Production', desc: 'Executing the shoot with our cinema-line gear.' },
      { step: 'Post-production', desc: 'Editing, color grading, and sound mixing.' },
      { step: 'Delivery', desc: 'Handing off broadcast-ready files.' }
    ],
    tools: [
      { name: 'Sony FX3 & RED', color: '#ff3333', icon: 'SiSony' },
      { name: 'DJI Ronin 4D', color: '#dddddd', icon: 'SiDji' },
      { name: 'Aputure Lights', color: '#ffaa00', icon: 'Zap' },
      { name: 'Teradek Wireless', color: '#00aaff', icon: 'Monitor' }
    ],
    pricing: 'Starts at ₹40,000 / $500 per day'
  },
  'social-media': {
    deliverables: [
      { title: 'Viral Reels', desc: 'Short-form content engineered for the algorithm.' },
      { title: 'Carousel Posts', desc: 'High-value educational and engaging carousels.' },
      { title: 'Grid Aesthetics', desc: 'A beautifully curated and cohesive profile.' },
      { title: 'Growth Strategy', desc: 'Data-driven plans to increase your following.' }
    ],
    process: [
      { step: 'Audit', desc: 'Analyzing your current presence and competitors.' },
      { step: 'Content Plan', desc: 'Mapping out a month of strategic content.' },
      { step: 'Creation', desc: 'Shooting and designing the assets.' },
      { step: 'Publishing', desc: 'Scheduling and community management.' }
    ],
    tools: [
      { name: 'Meta Suite', color: '#0668e1', icon: 'SiMeta' },
      { name: 'Hootsuite', color: '#000000', icon: 'SiHootsuite' },
      { name: 'CapCut Pro', color: '#ffffff', icon: 'Video' },
      { name: 'Canva Pro', color: '#00c4cc', icon: 'SiCanva' }
    ],
    pricing: 'Retainers from ₹25,000 / $300 per month'
  },
  'web-design': {
    deliverables: [
      { title: 'Custom UI/UX', desc: 'Bespoke designs tailored to your brand identity.' },
      { title: 'Responsive Dev', desc: 'Flawless performance on desktop and mobile.' },
      { title: 'Fast Loading', desc: 'Optimized code for maximum speed and SEO.' },
      { title: 'CMS Integration', desc: 'Easy-to-use backends for content management.' }
    ],
    process: [
      { step: 'Wireframing', desc: 'Mapping the user journey and layout structure.' },
      { step: 'UI Design', desc: 'Crafting the visual language and interactions.' },
      { step: 'Development', desc: 'Writing clean, modern React/Next.js code.' },
      { step: 'Launch', desc: 'Testing, deploying, and handing over the keys.' }
    ],
    tools: [
      { name: 'Figma', color: '#f24e1e', icon: 'SiFigma' },
      { name: 'Next.js', color: '#ffffff', icon: 'SiNextdotjs' },
      { name: 'Tailwind CSS', color: '#38bdf8', icon: 'SiTailwindcss' },
      { name: 'Vercel', color: '#ffffff', icon: 'SiVercel' }
    ],
    pricing: 'Projects start at ₹50,000 / $600'
  },
  'graphic-design': {
    deliverables: [
      { title: 'Brand Identity', desc: 'Logos, typography, and color systems.' },
      { title: 'Marketing Assets', desc: 'Flyers, brochures, and digital banners.' },
      { title: 'Social Creatives', desc: 'Thumb-stopping graphics for ads and posts.' },
      { title: 'Packaging', desc: 'Premium design for physical products.' }
    ],
    process: [
      { step: 'Discovery', desc: 'Understanding your brand values and audience.' },
      { step: 'Drafting', desc: 'Exploring different visual directions.' },
      { step: 'Refinement', desc: 'Polishing the chosen concept.' },
      { step: 'Handoff', desc: 'Delivering all necessary source files and formats.' }
    ],
    tools: [
      { name: 'Adobe Photoshop', color: '#31a8ff', icon: 'DiPhotoshop' },
      { name: 'Adobe Illustrator', color: '#ff9a00', icon: 'DiIllustrator' },
      { name: 'Adobe InDesign', color: '#ff3366', icon: 'PenTool' },
      { name: 'CorelDRAW', color: '#00cc00', icon: 'SiCoreldraw' }
    ],
    pricing: 'Starts at ₹10,000 / $150 per project'
  },
  'seo-dominance': {
    deliverables: [
      { title: 'Technical Audit', desc: 'Finding and fixing site-wide issues.' },
      { title: 'Keyword Strategy', desc: 'Identifying high-intent search terms.' },
      { title: 'On-Page SEO', desc: 'Optimizing content, meta tags, and structure.' },
      { title: 'Link Building', desc: 'Acquiring high-quality backlinks safely.' }
    ],
    process: [
      { step: 'Analysis', desc: 'Deep dive into your current search visibility.' },
      { step: 'Optimization', desc: 'Implementing technical and on-page fixes.' },
      { step: 'Content', desc: 'Creating assets that attract organic traffic.' },
      { step: 'Reporting', desc: 'Monthly tracking of rankings and traffic.' }
    ],
    tools: [
      { name: 'Ahrefs', color: '#ff6600', icon: 'TrendingUp' },
      { name: 'SEMrush', color: '#ff8800', icon: 'SiSemrush' },
      { name: 'Search Console', color: '#4285f4', icon: 'SiGooglesearchconsole' },
      { name: 'Google Analytics', color: '#f4b400', icon: 'SiGoogleanalytics' }
    ],
    pricing: 'Retainers from ₹20,000 / $250 per month'
  },
  'digital-marketing': {
    deliverables: [
      { title: 'Meta Ads', desc: 'High-ROI campaigns on Facebook and Instagram.' },
      { title: 'Google Ads', desc: 'Search and Display campaigns to capture intent.' },
      { title: 'Funnel Building', desc: 'Designing the path from click to conversion.' },
      { title: 'Analytics', desc: 'Deep tracking of every dollar spent.' }
    ],
    process: [
      { step: 'Strategy', desc: 'Defining audiences, budgets, and offers.' },
      { step: 'Creative', desc: 'Producing ad copy and visual assets.' },
      { step: 'Launch', desc: 'Setting up the campaigns and tracking pixels.' },
      { step: 'Optimization', desc: 'A/B testing and scaling winning ads.' }
    ],
    tools: [
      { name: 'Google Ads', color: '#4285f4', icon: 'SiGoogleads' },
      { name: 'Meta Ads', color: '#0668e1', icon: 'SiMeta' },
      { name: 'Google Analytics', color: '#f4b400', icon: 'SiGoogleanalytics' },
      { name: 'TikTok Ads', color: '#00f2fe', icon: 'SiTiktok' }
    ],
    pricing: 'Management fee from ₹15,000 / $200 per month'
  }
};

// Aliases for database slugs
SERVICE_DETAILS_MAP['web-designing'] = SERVICE_DETAILS_MAP['web-design'];
SERVICE_DETAILS_MAP['seo-and-growth'] = SERVICE_DETAILS_MAP['seo-dominance'];
SERVICE_DETAILS_MAP['wedding-cinematography'] = SERVICE_DETAILS_MAP['wedding-shooting'];
SERVICE_DETAILS_MAP['marketing'] = SERVICE_DETAILS_MAP['digital-marketing'];
SERVICE_DETAILS_MAP['business-growth'] = SERVICE_DETAILS_MAP['digital-marketing'];
