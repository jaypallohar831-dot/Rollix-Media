export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'discovery',
    number: '01',
    title: 'Strategic Discovery',
    subtitle: 'Audit & Insight',
    description:
      'We deep-dive into your business model, identifying market bottlenecks and high-value opportunities to position your brand for undisputed leadership.',
  },
  {
    id: 'architecture',
    number: '02',
    title: 'Creative Architecture',
    subtitle: 'Design & Strategy',
    description:
      'Designing a high-conversion digital ecosystem. From premium web design to social narrative architecture, we build the foundation for your scale.',
  },
  {
    id: 'production',
    number: '03',
    title: 'High-End Production',
    subtitle: 'Cinematic Creation',
    description:
      'This is where our cinematic heritage meets marketing strategy. We craft visual assets with surgical precision, ensuring every frame drives authority.',
  },
  {
    id: 'engineering',
    number: '04',
    title: 'Growth Engineering',
    subtitle: 'SEO & Optimization',
    description:
      'Deploying technical SEO and data-driven marketing funnels. We optimize your digital presence to dominate search results and maximize conversion ROI.',
  },
  {
    id: 'dominance',
    number: '05',
    title: 'Market Dominance',
    subtitle: 'Scale & Leadership',
    description:
      'The final phase: full-scale market dominance. We deliver a permanent, high-performance digital presence that scales your business to new heights.',
  },
];
