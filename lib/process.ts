export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'vision',
    number: '01',
    title: 'The Connection',
    subtitle: 'Discovery & Concept',
    description:
      'We begin not with cameras, but with conversations. Understanding your cultural roots, your journey, and the human truth that will drive your wedding or brand story.',
  },
  {
    id: 'narrative',
    number: '02',
    title: 'The Blueprint',
    subtitle: 'Story Architecture',
    description:
      'A structure is built. We craft the pacing, the cultural nuances, and the emotional arcs. This is where ideas become blueprints for a cinematic legacy.',
  },
  {
    id: 'frame',
    number: '03',
    title: 'The Ceremony',
    subtitle: 'Cinematic Production',
    description:
      'Light, composition, and authentic Indian grandeur converge. From the quiet morning rituals to the vibrant mandap, we capture not just the events, but how they feel.',
  },
  {
    id: 'atmosphere',
    number: '04',
    title: 'The Canvas',
    subtitle: 'Editing & Color',
    description:
      'In the edit suite, the story breathes. We sculpt the pacing, paint with warm, rich color grading, and weave emotional soundscapes that pull the viewer into your world.',
  },
  {
    id: 'memory',
    number: '05',
    title: 'The Legacy',
    subtitle: 'Final Delivery',
    description:
      'The film is presented. It ceases to be just footage and becomes an heirloom. We deliver not just a video, but a permanent, luxurious emotional imprint.',
  },
];
