import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SmoothScroll } from '@/components/smooth-scroll';
import { FloatingWhatsApp } from '@/components/floating-whatsapp';
import { ScrollProgressLine } from '@/components/agents/ScrollProgressLine';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <ScrollProgressLine />
      <Navbar />
      <div id="main-content">
        {children}
      </div>
      <Footer />
      <FloatingWhatsApp />
    </SmoothScroll>
  );
}
