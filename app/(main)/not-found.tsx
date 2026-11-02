import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/seo.config';
import { NotFoundContent } from '@/components/not-found-content';

export const metadata: Metadata = {
  title: `Page Not Found | ${SITE_NAME}`,
  description: `The page you're looking for doesn't exist or has been moved. Explore ${SITE_NAME}'s digital marketing services, portfolio, and creative solutions.`,
  robots: { index: false, follow: true },
};

/**
 * 404 page for the (main) route group.
 * Rendered when notFound() is called from within any (main)/ route.
 * Navbar/Footer are already provided by app/(main)/layout.tsx.
 */
export default function NotFound() {
  return <NotFoundContent />;
}

