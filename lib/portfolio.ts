export type MediaType = 'image' | 'video';

export interface GalleryItem {
  type: MediaType;
  src: string;
  alt?: string;
  poster?: string;
}

export interface ProjectStrategy {
  objective: string;
  approach: string[];
  tools: string[];
  results: string[];
  liveUrl?: string;
}

export type Deliverable = {
  id: string;
  title: string;
  type: 'video' | 'image' | 'document';
  url: string;
  thinking?: string;
  result?: string;
  resultImage?: string;
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description?: string;
  year: string;
  image: string;
  mediaType: 'video' | 'image';
  videoUrl?: string;
  tags: string[];
  featured?: boolean;
  group?: 'trending' | 'featured' | 'classics';
  location?: string;
  month?: string;
  client?: string;
  duration?: string;
  liveUrl?: string;
  gallery?: { type: string; src: string; alt?: string; poster?: string }[];
  crew?: { role: string; name: string }[];
  strategy?: ProjectStrategy;
  deliverables?: Deliverable[];
}

/* ─── CATEGORY SYSTEM ─── */

export const PORTFOLIO_CATEGORIES = [
  'All',
  'Web Development',
  'Video Editing',
  'Social Media',
  'Graphics Designing',
  'Ad Campaigns',
  'SEO & Growth',
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

/* ─── GROUP LABELS (for TWF-style horizontal rows) ─── */

export const PORTFOLIO_GROUPS = [
  { key: 'trending', label: 'Trending Now' },
  { key: 'featured', label: 'Featured Projects' },
  { key: 'classics', label: 'Our Classics' },
] as const;

/* ─── PORTFOLIO DATA ─── */

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'vision-classes-bhilwara',
    title: 'Vision Classes Bhilwara',
    category: 'Ad Campaigns',
    tagline: 'Hyper-targeted Instagram Ad Campaign & High-Converting Landing Page.',
    description:
      'Engineered an ad campaign with 5 video creatives, generating 129K+ views, 67K+ reach, and 40-60 high-intent leads with just ₹6,000 ad spend.',
    year: '2025',
    month: 'JUL',
    location: 'Bhilwara, India',
    image: '/assets/portfolio/social.png',
    mediaType: 'image',
    tags: ['Ad Campaign', 'Lead Gen', 'Meta Ads', 'ROI 125x'],
    client: 'Vision Classes Bhilwara',
    duration: '30 Days',
    featured: true,
    group: 'trending',
    crew: [
      { role: 'Campaign Strategist', name: 'Rollix Media Team' },
      { role: 'Media Buyer', name: 'Jaypal' },
    ],
    strategy: {
      objective: 'Drive fresh student admissions for competitive exam batches on a tight budget of ₹6,000.',
      approach: [
        'A/B tested 5 distinct video creatives (Faculty Interview, CET Offer, Student Success, Testimonial, Tour).',
        'Built a high-converting single-page interactive case study & lead capture funnel.',
        'Targeted local Bhilwara students & parents aged 16-45 with interest-based geotargeting.'
      ],
      tools: ['Meta Ads Manager', 'Next.js', 'Framer Motion', 'WhatsApp Business API'],
      results: ['129,273 Total Views', '67,979 Unique Reach', '40–60 Direct Admissions Leads', '20:1 to 125:1 ROI'],
      liveUrl: '/case-studies/vision-classes-bhilwara',
    },
  },
  {
    id: 'rollix-web-platform',
    title: 'Rollix Media Web Platform',
    category: 'Web Development',
    tagline: 'High-Performance Next.js Agency Web Application with Admin Engine.',
    description:
      'Architected a ultra-fast, SEO-optimized web platform with dynamic portfolio management, blog engine, interactive quote calculators, and SSR performance.',
    year: '2025',
    month: 'MAY',
    location: 'India',
    image: '/assets/portfolio/motion.png',
    mediaType: 'image',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
    client: 'Rollix Media',
    featured: true,
    group: 'featured',
    crew: [
      { role: 'Lead Architect', name: 'Rollix Dev Team' },
      { role: 'UI/UX Designer', name: 'Rollix Creative' },
    ],
    strategy: {
      objective: 'Establish a world-class digital agency web application to capture inbound client inquiries.',
      approach: [
        'Implemented App Router with Server-Side Rendering (SSR) & incremental static regeneration.',
        'Created custom admin panel for live portfolio curation, project case studies, and blog posts.',
        'Applied modern glassmorphism design, dark/light themes, and smooth micro-animations.'
      ],
      tools: ['Next.js 14', 'TypeScript', 'TailwindCSS', 'Supabase', 'Framer Motion'],
      results: ['99+ Lighthouse Performance Score', '< 0.8s First Contentful Paint', '3.5x Higher Client Inquiries'],
      liveUrl: 'https://rollixmedia.vercel.app',
    },
  },
  {
    id: 'eternal-vows',
    title: 'Eternal Vows',
    category: 'Video Editing',
    tagline: 'A love story told through light and silence.',
    description:
      'An intimate cinematic journey capturing the union of two souls. Shot across golden-hour landscapes and candlelit interiors, every frame breathes emotion.',
    year: '2024',
    month: 'NOV',
    location: 'Udaipur, India',
    image: '/assets/portfolio/wedding.png',
    mediaType: 'video',
    videoUrl: '/assets/loader-bg.mp4',
    tags: ['Wedding', 'Cinematic', 'Destination'],
    client: 'Private Commission',
    duration: '8 min',
    featured: true,
    group: 'trending',
    crew: [
      { role: 'Director', name: 'Varun Sharma' },
      { role: 'Cinematographer', name: 'Aisha Rao' },
      { role: 'Editor', name: 'Karan Singh' },
    ],
    gallery: [
      { type: 'video', src: '/assets/loader-bg.mp4', poster: '/assets/portfolio/wedding.png' },
      { type: 'image', src: '/assets/portfolio/wedding.png', alt: 'Ceremony wide shot' },
    ],
    strategy: {
      objective: 'Craft an emotionally resonant cinematic film for a luxury destination wedding.',
      approach: [
        'Color graded with custom teal & warm tungsten LUTs to evoke timeless elegance.',
        'Designed custom soundscape blending acoustic scores with natural ambient audio clips.',
        'Edited fast-paced teaser reels for Instagram alongside an 8-minute main feature film.'
      ],
      tools: ['Adobe Premiere Pro', 'DaVinci Resolve Studio', 'After Effects', 'Logic Pro'],
      results: ['250K+ Organic Instagram Reel Views', 'Client Satisfaction Rating 100%'],
    },
  },
  {
    id: 'bloom-brand-identity',
    title: 'Bloom Organics Identity',
    category: 'Graphics Designing',
    tagline: 'A season of growth, captured in golden light.',
    description:
      'High-end brand identity and packaging design for an organic lifestyle brand. Created custom iconography, typography guides, and social media carousels.',
    year: '2023',
    month: 'JUN',
    location: 'Delhi, India',
    image: '/assets/portfolio/social.png',
    mediaType: 'image',
    tags: ['Branding', 'Graphics', 'Packaging'],
    client: 'Bloom Organics',
    group: 'featured',
    crew: [
      { role: 'Art Director', name: 'Pooja Verma' },
      { role: 'Brand Designer', name: 'Sneha Kapoor' },
    ],
    strategy: {
      objective: 'Rebrand an artisanal organic skincare line to appeal to eco-conscious Gen Z & millennial buyers.',
      approach: [
        'Developed Earth-toned minimalist color system using organic HSL palettes.',
        'Created scalable vector logo system, packaging templates, and 30 social carousel guidelines.',
        'Designed eco-friendly unboxing experience graphics.'
      ],
      tools: ['Adobe Illustrator', 'Figma', 'Adobe Photoshop', 'Blender 3D'],
      results: ['3x Engagement Growth', '45% Increase in Direct Website Sales'],
    },
  },
  {
    id: 'creator-growth-engine',
    title: 'Organic Creator Growth Engine',
    category: 'Social Media',
    tagline: 'Scale personal brand reach to 500K+ monthly impressions.',
    description:
      'End-to-end social media growth strategy including content calendar design, script writing, viral hook structure, and community engagement.',
    year: '2024',
    month: 'AUG',
    location: 'India',
    image: '/assets/portfolio/wedding.png',
    mediaType: 'image',
    tags: ['Instagram Reels', 'Social Strategy', 'Content System'],
    client: 'Tech & Lifestyle Creator',
    group: 'classics',
    crew: [
      { role: 'Content Lead', name: 'Rollix Social Team' },
    ],
    strategy: {
      objective: 'Scale client social channel from 5,000 followers to 50,000+ active followers in 90 days.',
      approach: [
        'Formulated a 3-pillar content strategy: Educational Carousels, Viral Short Reels, and Story Polls.',
        'Implemented daily story engagement loops and strategic hashtag/audio trends.',
        'Optimized bio, link-in-bio funnel, and automated DM responses for lead capture.'
      ],
      tools: ['Meta Business Suite', 'CapCut Pro', 'Notion Content OS', 'Canva Pro'],
      results: ['520K+ Monthly Reach', '+38K New Organic Followers', '14.2% Average Engagement Rate'],
    },
  },
  {
    id: 'local-seo-dominance',
    title: 'Local Business SEO Surge',
    category: 'SEO & Growth',
    tagline: 'Rank #1 on Google Maps & Organic Search in 60 Days.',
    description:
      'Comprehensive local SEO optimization campaign for a regional service provider, driving 200+ phone calls per month.',
    year: '2024',
    month: 'SEP',
    location: 'Bhilwara, India',
    image: '/assets/portfolio/motion.png',
    mediaType: 'image',
    tags: ['SEO', 'Google Maps', 'Local Growth'],
    client: 'Regional Health Clinic',
    group: 'classics',
    crew: [
      { role: 'SEO Strategist', name: 'Rollix SEO Specialist' },
    ],
    strategy: {
      objective: 'Outrank local competitors on Google Search for high-intent medical queries in Bhilwara.',
      approach: [
        'Optimized Google Business Profile with GEO-tagged photos, service catalogs, and automated review collection.',
        'Built 40+ local citations, schema markup, and location-targeted landing pages.',
        'Published high-authority blog content solving top patient questions.'
      ],
      tools: ['Google Search Console', 'Ahrefs', 'Google Business Profile', 'SurferSEO'],
      results: ['Rank #1 for 18 Primary Keywords', '+240% Increase in Monthly Google Calls'],
    },
  }
];

/* ─── HELPERS ─── */

export function filterPortfolio(category: string): PortfolioItem[] {
  if (category === 'All') return PORTFOLIO_ITEMS;
  return PORTFOLIO_ITEMS.filter((item) => item.category === category);
}

export function getVideoProjects(): PortfolioItem[] {
  return PORTFOLIO_ITEMS.filter((item) => item.mediaType === 'video');
}

export function getPhotoProjects(): PortfolioItem[] {
  return PORTFOLIO_ITEMS.filter((item) => item.mediaType === 'image');
}

export function getPortfolioItem(id: string): PortfolioItem | undefined {
  return PORTFOLIO_ITEMS.find((item) => item.id === id);
}

export function getFeaturedItems(): PortfolioItem[] {
  return PORTFOLIO_ITEMS.filter((item) => item.featured);
}

export function getItemsByGroup(group: string): PortfolioItem[] {
  return PORTFOLIO_ITEMS.filter((item) => item.group === group);
}

export function getAdjacentItems(id: string): { prev: PortfolioItem | null; next: PortfolioItem | null } {
  const index = PORTFOLIO_ITEMS.findIndex((item) => item.id === id);
  return {
    prev: index > 0 ? PORTFOLIO_ITEMS[index - 1] : null,
    next: index < PORTFOLIO_ITEMS.length - 1 ? PORTFOLIO_ITEMS[index + 1] : null,
  };
}
