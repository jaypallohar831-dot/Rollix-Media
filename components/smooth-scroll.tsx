'use client';

import { ReactNode } from 'react';

/**
 * SmoothScroll — Previously using Lenis smooth scroll library.
 *
 * Performance fix: Lenis intercepts every scroll event, applies
 * its own lerp calculations, and programmatically sets scrollTop
 * on every requestAnimationFrame. This conflicts with framer-motion's
 * scroll tracking and adds constant main-thread work.
 *
 * Replaced with native CSS scroll-behavior: smooth which is
 * handled entirely by the browser's compositor thread.
 * The parent <html> element already has data-scroll-behavior="smooth".
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
