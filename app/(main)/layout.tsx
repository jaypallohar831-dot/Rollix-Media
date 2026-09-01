import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SmoothScroll } from '@/components/smooth-scroll';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <Navbar />
      <div id="main-content">
        {children}
      </div>
      <Footer />
    </SmoothScroll>
  );
}
