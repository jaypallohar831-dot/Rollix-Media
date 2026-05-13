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
  'Wedding Film',
  'Photography',
  'Commercial Ad',
  'Brand Story',
  'Cinematic Reel',
  'Social Campaign',
  'Motion Graphics',
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
    category: 'Wedding Film',
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
    id: 'ember-and-oak',
    title: 'Ember & Oak',
    category: 'Brand Story',
    tagline: 'Craft born from generations of quiet devotion.',
    description:
      'A documentary-style brand film following three generations of artisan woodworkers. Raw textures, warm tones, and honest storytelling create an intimate portrait of dedication and craft.',
    year: '2023',
    month: 'MAR',
    location: 'Jaipur, India',
    image: '/assets/portfolio/brand.png',
    mediaType: 'video',
    videoUrl: 'https://res.cloudinary.com/dlvqjcd3o/video/upload/q_auto/f_auto/v1778642485/reel2_eh4suw.mp4',
    tags: ['Brand', 'Documentary', 'Artisan'],
    client: 'Ember & Oak Woodworks',
    duration: '4 min',
    group: 'featured',
    crew: [
      { role: 'Filmmaker', name: 'Varun Sharma' },
      { role: 'Sound Design', name: 'Neha Gupta' },
    ],
    gallery: [
      { type: 'video', src: 'https://res.cloudinary.com/dlvqjcd3o/video/upload/q_auto/f_auto/v1778642485/reel2_eh4suw.mp4', poster: '/assets/portfolio/brand.png' },
      { type: 'image', src: '/assets/portfolio/brand.png', alt: 'Workshop wide shot' },
    ],
  },

  {
    id: 'cinematic-flow',
    title: 'Cinematic Flow',
    category: 'Cinematic Reel',
    tagline: 'A seamless journey through space and time.',
    description:
      'A breathtaking visual experience showcasing cinematic motion, vivid colors, and dynamic flow. Perfect for high-end digital marketing and brand storytelling.',
    year: '2024',
    month: 'MAY',
    location: 'Global',
    image: '/assets/portfolio/reel.png',
    mediaType: 'video',
    videoUrl: 'https://res.cloudinary.com/dlvqjcd3o/video/upload/q_auto/f_auto/v1778642485/reel2_eh4suw.mp4',
    tags: ['Reel', 'Cinematic', 'Visuals'],
    client: 'Showreel',
    duration: '1 min',
    group: 'trending',
    crew: [
      { role: 'Lead Editor', name: 'Varun Sharma' },
    ],
    gallery: [
      { type: 'video', src: 'https://res.cloudinary.com/dlvqjcd3o/video/upload/q_auto/f_auto/v1778642485/reel2_eh4suw.mp4', poster: '/assets/portfolio/reel.png' },
    ],
  },
  {
    id: 'bloom',
    title: 'Bloom',
    category: 'Photography',
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
  },
  {
    id: 'pulse',
    title: 'Pulse',
    category: 'Motion Graphics',
    tagline: 'Where sound meets shape and rhythm finds form.',
    description:
      'A motion graphics package for a music festival brand. Pulsing geometries, synchronized typography, and reactive particle systems create an audiovisual experience that lives and breathes.',
    year: '2024',
    month: 'FEB',
    location: 'Bangalore, India',
    image: '/assets/portfolio/motion.png',
    mediaType: 'video',
    videoUrl: 'https://res.cloudinary.com/dlvqjcd3o/video/upload/q_auto/f_auto/v1778642485/reel2_eh4suw.mp4',
    tags: ['Motion', 'Animation', 'Festival'],
    client: 'Pulse Festival',
    duration: '30 sec',
    group: 'classics',
    crew: [
      { role: 'Motion Designer', name: 'Rahul Joshi' },
    ],
    gallery: [
      { type: 'video', src: 'https://res.cloudinary.com/dlvqjcd3o/video/upload/q_auto/f_auto/v1778642485/reel2_eh4suw.mp4', poster: '/assets/portfolio/motion.png' },
      { type: 'image', src: '/assets/portfolio/motion.png', alt: 'Key visual frame' },
    ],
  },
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
