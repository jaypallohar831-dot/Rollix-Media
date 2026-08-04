import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
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
        <div id="main-content">
          {children}
        </div>
        <Footer />
      </ScrollMotionBlur>
    </>
  );
}
