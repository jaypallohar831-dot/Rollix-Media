import { PhilosophySection } from '@/sections/philosophy';
import { ProcessSection } from '@/sections/process';
import { Divider } from '@/components/layout';

export default function AboutPage() {
  return (
    <main className="relative min-h-screen pt-20">
      <PhilosophySection />
      <Divider />
      <ProcessSection />
    </main>
  );
}
