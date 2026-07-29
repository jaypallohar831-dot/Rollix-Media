'use client';

import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/navigation';
import { useScrollDirection } from '@/hooks/use-scroll-direction';
import { usePathname } from 'next/navigation';
import { NavLogo } from '@/components/nav-logo';
import { NavLink } from '@/components/nav-link';
import { MobileMenu } from '@/components/mobile-menu';
import Link from 'next/link';

/*
 * Performance changes vs. original:
 * 1. Replaced `transition-all` on header with specific properties.
 * 2. Memoized component to reduce re-renders from layout.
 */

const MotionLink = motion.create(Link);

export const Navbar = memo(function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isScrolled } = useScrollDirection(50, 300);
  const pathname = usePathname();

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-out',
          isScrolled
            ? 'border-b border-border bg-white/90 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        )}
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Inner container with premium spacing */}
        <nav className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6 sm:px-10 lg:px-16">
          {/* Logo — left */}
          <NavLogo />

          {/* Desktop navigation — center */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.sectionId}
                href={item.href}
                label={item.label}
                isActive={
                  item.href === '/'
                    ? pathname === '/'
                    : pathname?.startsWith(item.href)
                }
              />
            ))}
          </div>

          {/* Right side — CTA + hamburger */}
          <div className="flex items-center gap-4">
            {/* Desktop CTA */}
            <MotionLink
              href="/contact"
              className={cn(
                'hidden items-center justify-center rounded-full px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-[border-color,color,background-color] duration-500 lg:inline-flex cursor-pointer',
                isScrolled
                  ? 'border border-cinematic-orange text-cinematic-orange hover:bg-cinematic-orange hover:text-white'
                  : 'border border-border text-foreground hover:border-cinematic-orange hover:text-cinematic-orange'
              )}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              Start a Project
            </MotionLink>

            {/* Mobile hamburger */}
            <motion.button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-[border-color] duration-300 hover:border-cinematic-orange lg:hidden cursor-pointer"
              onClick={toggleMobile}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open navigation menu"
            >
              <Menu className="h-4 w-4" />
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <MobileMenu
        isOpen={isMobileOpen}
        pathname={pathname}
        onClose={closeMobile}
      />
    </>
  );
});
