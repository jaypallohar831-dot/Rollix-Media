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
  'Social Media',
  'Video Editing',
  'Web Designing',
  'SEO & Growth',
  'Ad Campaigns',
  'Wedding Videography',
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

/* ─── GROUP LABELS (for TWF-style horizontal rows) ─── */

export const PORTFOLIO_GROUPS = [
  { key: 'trending', label: 'Trending Now' },
  { key: 'featured', label: 'Featured Projects' },
  { key: 'classics', label: 'Our Classics' },
] as const;

/* ─── PORTFOLIO DATA ─── */

export const VISION_CLASSES_PROJECT: PortfolioItem = {
  id: 'vision-classes-bhilwara',
  title: 'Vision Classes Bhilwara',
  category: 'Ad Campaigns',
  tagline: '129K+ Views & 125:1 ROI Instagram Ad Campaign',
  description: 'Rollix Media executed a targeted Instagram ad campaign for Vision Classes Bhilwara, generating 129K+ views, 19.8K engagement, 67.9K reach, and 40-60 qualified leads with a 125:1 ROI in 30 days.',
  year: '2024',
  image: '/assets/portfolio/motion.png',
  mediaType: 'image',
  tags: ['Ad Campaigns', 'Instagram Ads', 'Meta Ads', 'Lead Generation', '125:1 ROI'],
  featured: true,
  group: 'featured',
  location: 'Bhilwara, Rajasthan',
  client: 'Vision Classes Bhilwara',
  liveUrl: '/case-studies/vision-classes-bhilwara',
  strategy: {
    objective: 'Generate qualified student leads for coaching admissions in Bhilwara while maximizing ad ROI.',
    approach: [
      'Engineered testimonial-based video creatives focused on student success',
      'Implemented hyper-local radius targeting across Bhilwara district',
      'Optimized WhatsApp direct-lead funnel for instant inquiry response',
      'Scaled profitable ad sets with a ₹6,000 ad budget'
    ],
    tools: ['Meta Ads Manager', 'Instagram Video Ads', 'Premiere Pro', 'WhatsApp API'],
    results: [
      '129,273 Total Video Views',
      '19,889 Total Engagement',
      '67,979 Unique Local Reach',
      '40-60 Qualified Student Leads',
      '125:1 Return on Ad Spend (ROI)'
    ]
  }
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [VISION_CLASSES_PROJECT];

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
