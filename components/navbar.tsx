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

/*
 * Performance changes vs. original:
 * 1. Replaced `transition-all` on header with specific properties.
 * 2. Memoized component to reduce re-renders from layout.
 */

export const Navbar = memo(function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isScrolled, isVisible } = useScrollDirection(50, 300);
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
          'fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-500 ease-out',
          isScrolled
            ? 'border-b border-white/[0.04] bg-[#050505]/60 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible || isMobileOpen ? 0 : -100,
          opacity: isVisible || isMobileOpen ? 1 : 0,
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
            <motion.a
              href="#contact"
              className={cn(
                'hidden items-center justify-center rounded-full px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-[border-color,color,background-color] duration-500 lg:inline-flex cursor-pointer',
                isScrolled
                  ? 'border border-cinematic-orange/30 text-cinematic-orange hover:bg-cinematic-orange hover:text-white'
                  : 'border border-white/[0.1] text-foreground/80 hover:border-white/[0.2] hover:text-foreground'
              )}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              Start a Project
            </motion.a>

            {/* Mobile hamburger */}
            <motion.button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] text-foreground transition-[border-color] duration-300 hover:border-white/[0.15] lg:hidden cursor-pointer"
              onClick={toggleMobile}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open navigation menu"
            >
              <Menu className="h-4 w-4" />
            </motion.button>
          </div>
        </nav>

        {/* Subtle bottom gradient line when scrolled */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(212,118,60,0.15) 50%, transparent 100%)',
              }}
            />
          )}
        </AnimatePresence>
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
