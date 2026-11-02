import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/seo.config';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { NotFoundContent } from '@/components/not-found-content';

export const metadata: Metadata = {
  title: `Page Not Found | ${SITE_NAME}`,
  description: `The page you're looking for doesn't exist or has been moved. Explore ${SITE_NAME}'s digital marketing services, portfolio, and creative solutions.`,
  robots: { index: false, follow: true },
};

/**
 * Root-level 404 page.
 * Renders outside the (main) route group, so Navbar/Footer are included
 * inline to maintain a consistent user experience.
 * Shares UI with app/(main)/not-found.tsx via NotFoundContent.
 */
export default function RootNotFound() {
  return (
    <>
      <Navbar />
      <div id="main-content">
        <NotFoundContent fullHeight />
      </div>
      <Footer />
    </>
  );
}
