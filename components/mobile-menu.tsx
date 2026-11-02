'use client';

import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { NAV_ITEMS } from '@/lib/navigation';
import { X, MessageCircle } from 'lucide-react';
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
    transition: { duration: 0.3, ease },
  },
  open: {
    opacity: 1,
    transition: { duration: 0.3, ease },
  },
};

const menuContainerVariants: Variants = {
  closed: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
  open: {
    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
  },
};

const menuItemVariants: Variants = {
  closed: {
    y: 20,
    opacity: 0,
    transition: { duration: 0.25, ease },
  },
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease },
  },
};

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
          {/* Background — Dark solid canvas */}
          <div className="absolute inset-0 bg-[#0A0614]/98 backdrop-blur-2xl" onClick={onClose} />

          {/* Close button */}
          <button
            className="absolute right-6 top-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[#7C3AED]/30 bg-[#1A0F33]/80 text-[#F5F0FF] transition-colors duration-300 hover:border-[#A855F7] hover:text-[#A855F7] sm:right-8 sm:top-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A855F7]"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Navigation links */}
          <motion.nav
            className="relative z-10 flex flex-1 flex-col items-center justify-center gap-2 overflow-y-auto py-16 px-6"
            variants={menuContainerVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {NAV_ITEMS.map((item, i) => {
              const isActive = item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href);

              return (
                <motion.div
                  key={item.sectionId}
                  variants={menuItemVariants}
                  className="group relative py-2.5 font-heading text-[clamp(1.75rem,5vw,3rem)] font-bold tracking-tight transition-colors duration-300"
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 ${
                      isActive
                        ? 'text-[#F5F0FF]'
                        : 'text-[#B7A9D6]/60 hover:text-[#F5F0FF]'
                    }`}
                  >
                    {/* Index number */}
                    <span className="font-mono text-xs font-semibold text-[#A855F7]/80">
                      0{i + 1}
                    </span>
                    <span>{item.label}</span>
                  </Link>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.span
                      className="absolute -right-5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#A855F7] pointer-events-none shadow-sm shadow-[#A855F7]"
                      layoutId="mobile-active"
                      transition={{ duration: 0.35, ease }}
                    />
                  )}
                </motion.div>
              );
            })}

            {/* Mobile Menu Action */}
            <motion.div variants={menuItemVariants} className="mt-8 flex flex-col gap-3 w-full max-w-xs">
              <a
                href="https://wa.me/919024675831?text=Hi%20Ampledia%2C%20I%20would%20like%20to%20discuss%20a%20project%20for%20my%20brand."
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center justify-center gap-2 rounded-full bg-[#7C3AED] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#7C3AED]/30"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Let&apos;s Build Together</span>
              </a>

              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center justify-center gap-2 rounded-full border border-[#7C3AED]/30 bg-[#1A0F33] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#F5F0FF]"
              >
                <span>Contact Page</span>
              </Link>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
