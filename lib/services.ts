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
    slug: 'video-editing',
    title: 'Professional Video Editing',
    description:
      'High-end post-production, color grading, and sound design. We transform raw footage into cinematic masterpieces that command attention.',
    icon: Scissors,
    featured: true,
  },
  {
    index: '02',
    slug: 'web-design',
    title: 'Strategic Web Designing',
    description:
      'Conversion-focused, premium websites designed to provide an immersive experience while turning visitors into loyal clients.',
    icon: Monitor,
  },
  {
    index: '03',
    slug: 'social-media',
    title: 'Social Media Management',
    description:
      'Data-driven social strategies and content creation that build a powerful digital presence and foster community engagement.',
    icon: Share2,
  },
  {
    index: '04',
    slug: 'seo-dominance',
    title: 'SEO & Search Dominance',
    description:
      'Technical SEO and content strategy designed to put your brand at the top of search results and drive organic growth.',
    icon: TrendingUp,
  },
  {
    index: '05',
    slug: 'videography',
    title: 'Cinematic Videography',
    description:
      'On-site production for commercials, brand stories, and events, captured with industry-leading equipment and artistic vision.',
    icon: Video,
  },
  {
    index: '06',
    slug: 'digital-marketing',
    title: 'Digital Marketing Strategy',
    description:
      'Full-funnel marketing campaigns combining paid media, email marketing, and funnel optimization for maximum ROI.',
    icon: Megaphone,
  },
  {
    index: '07',
    slug: 'business-growth',
    title: 'Business Growth Consulting',
    description:
      'Strategic scaling solutions that identify bottlenecks and leverage digital tools to accelerate your business revenue.',
    icon: Zap,
  },
  {
    index: '08',
    slug: 'creative-direction',
    title: 'Creative Direction',
    description:
      'Developing unique visual languages and brand narratives that differentiate your business in a crowded marketplace.',
    icon: Sparkles,
  },
];
