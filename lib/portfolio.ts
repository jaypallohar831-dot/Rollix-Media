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

export const PORTFOLIO_ITEMS: PortfolioItem[] = [];

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
