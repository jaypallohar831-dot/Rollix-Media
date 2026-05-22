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
