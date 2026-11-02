import type { Metadata } from 'next';
import DevAgentsDemo from './demo-client';

export const metadata: Metadata = {
  title: 'AI Agents Build Engine Test | Ampledia',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DevAgentsPage() {
  return <DevAgentsDemo />;
}

