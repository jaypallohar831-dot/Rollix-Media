export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  pillar: 'Strategy' | 'Creativity' | 'Growth';
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'discovery',
    number: '01',
    title: 'Discovery & Audit',
    subtitle: 'Market & Economics',
    description:
      'We analyze your business unit economics, audience behavior, competitor positioning, and existing conversion bottlenecks to find high-leverage growth opportunities.',
    pillar: 'Strategy',
  },
  {
    id: 'architecture',
    number: '02',
    title: 'Creative Blueprint',
    subtitle: 'Offer & Funnel Design',
    description:
      'Mapping out high-converting video hooks, storyboard scripts, and direct WhatsApp / landing page inquiry funnels engineered to convert attention into qualified inquiries.',
    pillar: 'Strategy',
  },
  {
    id: 'production',
    number: '03',
    title: 'Cinema Production',
    subtitle: 'Filming & Motion Edit',
    description:
      'Executing multi-camera 4K shoots with cinema glass and creating dynamic, high-retention reel edits with sound design, kinetic typography, and premium color grading.',
    pillar: 'Creativity',
  },
  {
    id: 'engineering',
    number: '04',
    title: 'Campaign Launch',
    subtitle: 'Meta Ads & Distribution',
    description:
      'Deploying targeted Meta and Google ad sets with tight geographic radius targeting. We test creative hooks live and optimize daily for lowest cost per qualified lead.',
    pillar: 'Growth',
  },
  {
    id: 'dominance',
    number: '05',
    title: 'Scale & Compound',
    subtitle: 'Predictable Revenue',
    description:
      'Scaling winning creatives, expanding ad spend profitably, and building an enduring organic brand footprint that compounds your market authority month over month.',
    pillar: 'Growth',
  },
];
