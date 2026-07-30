import { Navbar } from '@/components/navbar';
import { ScrollMotionBlur } from '@/components/scroll-motion-blur';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <ScrollMotionBlur>
        {children}
      </ScrollMotionBlur>
    </>
  );
}
