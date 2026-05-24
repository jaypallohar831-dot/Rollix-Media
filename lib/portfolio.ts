export type MediaType = 'image' | 'video';

export interface GalleryItem {
  type: MediaType;
  src: string;
  alt?: string;
  poster?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description?: string;
  year: string;
  /** Month abbreviation for display, e.g. "JUN" */
  month?: string;
  /** Location / city name */
  location?: string;
  image: string;
  mediaType: MediaType;
  videoUrl?: string;
  gallery?: GalleryItem[];
  tags: string[];
  client?: string;
  duration?: string;
  /** Featured flag — shows in the hero carousel */
  featured?: boolean;
  /** Group for TWF-style rows: trending, classics, etc. */
  group?: 'trending' | 'classics' | 'featured';
  /** Crew / Authors involved in the project */
  crew?: { role: string; name: string }[];
}

/* ─── CATEGORY SYSTEM ─── */

export const PORTFOLIO_CATEGORIES = [
  'All',
  'Web Development',
  'Video Editing',
  'Social Media',
  'Graphics Designing',
  'Marketing',
  'SEO and Growth',
  'Business Growth',
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

/* ─── GROUP LABELS (for TWF-style horizontal rows) ─── */

export const PORTFOLIO_GROUPS = [
  { key: 'trending', label: 'Trending Now' },
  { key: 'featured', label: 'Featured Films' },
  { key: 'classics', label: 'Our Classics' },
] as const;

/* ─── PORTFOLIO DATA ─── */

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'eternal-vows',
    title: 'Eternal Vows',
    category: 'Video Editing',
    tagline: 'A love story told through light and silence.',
    description:
      'An intimate cinematic journey capturing the union of two souls. Shot across golden-hour landscapes and candlelit interiors, every frame breathes emotion. This film weaves together candid moments and choreographed sequences to tell a story of love that transcends time.',
    year: '2024',
    month: 'NOV',
    location: 'Udaipur, India',
    image: '/assets/portfolio/wedding.png',
    mediaType: 'video',
    videoUrl: 'https://res.cloudinary.com/dlvqjcd3o/video/upload/q_auto/f_auto/v1778642485/reel2_eh4suw.mp4',
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
      { type: 'video', src: 'https://res.cloudinary.com/dlvqjcd3o/video/upload/q_auto/f_auto/v1778642485/reel2_eh4suw.mp4', poster: '/assets/portfolio/wedding.png' },
      { type: 'image', src: '/assets/portfolio/wedding.png', alt: 'Ceremony wide shot' },
    ],
  },
  {
    id: 'bloom',
    title: 'Bloom',
    category: 'Graphics Designing',
    tagline: 'A season of growth, captured in golden light.',
    description:
      'A high-end editorial photography campaign designed for a lifestyle brand. Vibrant visuals and medium-format crispness that drove 3x engagement over the previous quarter.',
    year: '2023',
    month: 'JUN',
    location: 'Delhi, India',
    image: '/assets/portfolio/social.png',
    mediaType: 'image',
    tags: ['Social', 'Photography', 'Campaign'],
    client: 'Bloom Organics',
    group: 'featured',
    crew: [
      { role: 'Photographer', name: 'Sneha Kapoor' },
      { role: 'Art Director', name: 'Pooja Verma' },
    ],
    gallery: [
      { type: 'image', src: '/assets/portfolio/social.png', alt: 'Hero campaign image' },
    ],
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
