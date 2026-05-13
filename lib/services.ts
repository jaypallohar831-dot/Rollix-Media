import {
  Film,
  Video,
  Scissors,
  TrendingUp,
  Sparkles,
  Share2,
  Megaphone,
  Layers,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  index: string;
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const SERVICES: ServiceItem[] = [
  {
    index: '01',
    slug: 'wedding-films',
    title: 'Luxury Wedding Films',
    description:
      'Cinematic Indian love stories captured with emotional depth, artful composition, and a documentary sensibility that turns your big day into a timeless heirloom.',
    icon: Film,
  },
  {
    index: '02',
    slug: 'pre-wedding',
    title: 'Pre-Wedding Narratives',
    description:
      'Emotional, visually stunning pre-wedding films shot with premium cinematography, capturing the chemistry and anticipation of your journey.',
    icon: Video,
  },
  {
    index: '03',
    slug: 'reels-shorts',
    title: 'Reels & Short Films',
    description:
      'High-impact, cinematic reels and short-form storytelling designed to capture the vibrant essence of your celebrations for modern platforms.',
    icon: Scissors,
  },
  {
    index: '04',
    slug: 'creative-production',
    title: 'Creative Production',
    description:
      'End-to-end creative production for luxury brands and lifestyle—bringing a premium Indian aesthetic and cinematic scale to your vision.',
    icon: Sparkles,
  },
  {
    index: '05',
    slug: 'brand-films',
    title: 'Brand Films',
    description:
      'High-impact brand documentaries and commercial films that combine cinematic production quality with deeply human storytelling.',
    icon: Megaphone,
  },
  {
    index: '06',
    slug: 'visual-identity',
    title: 'Visual Identity',
    description:
      'Elegant brand identities and visual systems for premium businesses, crafted with the same luxurious attention to detail as our films.',
    icon: Layers,
  },
  {
    index: '07',
    slug: 'social-campaigns',
    title: 'Cinematic Campaigns',
    description:
      'Scroll-stopping social media campaigns that leverage our cinematic expertise to build luxury brands and engage premium audiences.',
    icon: Share2,
  },
  {
    index: '08',
    slug: 'digital-experiences',
    title: 'Digital Experiences',
    description:
      'Minimal, premium, and immersive web design that extends your brand\'s luxury narrative into the digital space.',
    icon: TrendingUp,
  },
];
