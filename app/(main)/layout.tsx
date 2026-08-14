import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div id="main-content">
        {children}
      </div>
      <Footer />
    </>
  );
}
