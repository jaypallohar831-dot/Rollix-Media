'use client';

import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { NAV_ITEMS } from '@/lib/navigation';
import { X } from 'lucide-react';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  pathname: string;
  onClose: () => void;
}

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const overlayVariants: Variants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.4, ease },
  },
  open: {
    opacity: 1,
    transition: { duration: 0.4, ease },
  },
};

const menuContainerVariants: Variants = {
  closed: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
  open: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const menuItemVariants: Variants = {
  closed: {
    y: 30,
    opacity: 0,
    transition: { duration: 0.3, ease },
  },
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease },
  },
};

const lineVariants: Variants = {
  closed: { scaleX: 0, transition: { duration: 0.3 } },
  open: { scaleX: 1, transition: { duration: 0.6, delay: 0.5, ease } },
};

/*
 * Performance changes vs. original:
 * 1. Removed backdrop-blur-md on the background — full-screen blur is one
 *    of the most expensive GPU operations. Replaced with solid opaque bg.
 * 2. Reduced animation durations and stagger delays for snappier feel.
 * 3. Reduced item y-offset from 40 to 30.
 */

export function MobileMenu({ isOpen, pathname, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col"
          variants={overlayVariants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          {/* Background — solid opaque, no blur */}
          <div className="absolute inset-0 bg-[#050505]/[0.98]" />

          {/* Subtle warm glow */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 50% 40% at 50% 80%, rgba(212,118,60,0.08) 0%, transparent 70%)',
            }}
          />

          {/* Close button */}
          <motion.button
            className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] text-foreground transition-colors duration-300 hover:border-cinematic-orange/40 hover:text-cinematic-orange sm:right-10 sm:top-10 cursor-pointer"
            onClick={onClose}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <X className="h-5 w-5" />
          </motion.button>

          {/* Navigation links */}
          <motion.nav
            className="relative z-10 flex flex-1 flex-col items-center justify-center gap-2"
            variants={menuContainerVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.sectionId}
                variants={menuItemVariants}
                className="group relative py-3 font-heading text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight tracking-[-0.02em] transition-colors duration-500"
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-4 ${
                    (item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href))
                      ? 'text-foreground'
                      : 'text-muted-foreground/40 hover:text-foreground'
                  }`}
                >
                  {/* Index number */}
                  <span className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-cinematic-orange/60">
                    0{i + 1}
                  </span>
                  {item.label}
                </Link>

                {/* Active dot */}
                {(item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href)) && (
                  <motion.span
                    className="absolute -right-6 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cinematic-orange pointer-events-none"
                    layoutId="mobile-active"
                    transition={{ duration: 0.4, ease }}
                  />
                )}
              </motion.div>
            ))}

            {/* Separator line */}
            <motion.div
              className="mt-6 h-[1px] w-16 origin-center bg-white/[0.08]"
              variants={lineVariants}
            />

            <motion.div variants={menuItemVariants} className="mt-6">
              <Link
                href="/contact"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full border border-cinematic-orange/40 px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.25em] text-cinematic-orange transition-[background-color,color] duration-500 hover:bg-cinematic-orange hover:text-white"
              >
                Start a Project
              </Link>
            </motion.div>
          </motion.nav>

          {/* Footer info */}
          <motion.div
            className="relative z-10 flex items-center justify-between border-t border-white/[0.04] px-6 py-6 sm:px-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40">
              © 2024
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40">
              Digital Creative Studio
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
