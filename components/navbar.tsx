'use client';

import { useState, useCallback, memo } from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/navigation';
import { useScrollDirection } from '@/hooks/use-scroll-direction';
import { usePathname } from 'next/navigation';
import { NavLogo } from '@/components/nav-logo';
import { NavLink } from '@/components/nav-link';
import { MobileMenu } from '@/components/mobile-menu';
import Link from 'next/link';

export const Navbar = memo(function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isScrolled } = useScrollDirection(40, 250);
  const pathname = usePathname();

  const toggleMobile = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  return (
    <>
      <header
        data-agent-layer="navbar"
        data-agent-order="10"
        data-agent-type="card"
        data-agent-label="Navbar"
        className={cn(
          'fixed left-0 right-0 z-50 flex justify-center transition-[top,padding] duration-500 ease-out',
          isScrolled ? 'top-3 px-4 sm:px-6' : 'top-0 px-0'
        )}
      >
        <div
          className={cn(
            'w-full max-w-[1360px] transition-[border-radius,border-color,background-color,backdrop-filter,box-shadow] duration-500 ease-out overflow-hidden',
            isScrolled
              ? 'rounded-full border border-[#7C3AED]/30 bg-[#1A0F33]/85 backdrop-blur-2xl shadow-[0_8px_32px_rgba(10,6,20,0.8),inset_0_1px_2px_rgba(168,85,247,0.2)]'
              : 'rounded-none border-b border-[#7C3AED]/10 bg-transparent'
          )}
        >
          {/* Inner container */}
          <nav
            aria-label="Main navigation"
            className={cn(
              'mx-auto flex items-center justify-between transition-[height,padding] duration-500 ease-out',
              isScrolled ? 'h-[60px] px-5 sm:px-8' : 'h-[72px] px-6 sm:px-10 lg:px-14'
            )}
          >
            {/* Logo — left */}
            <NavLogo />

            {/* Desktop navigation — center */}
            <div className="hidden items-center gap-7 lg:flex">
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
            <div className="flex items-center gap-3.5">
              {/* Desktop WhatsApp CTA */}
              <a
                href="https://wa.me/919024675831?text=Hi%20Ampledia%2C%20I%20would%20like%20to%20discuss%20a%20project%20for%20my%20brand."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center justify-center rounded-full bg-[#7C3AED] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-[#7C3AED]/25 transition-all duration-300 hover:bg-[#6D28D9] hover:shadow-[#7C3AED]/40 focus:outline-none focus:ring-2 focus:ring-[#A855F7] lg:inline-flex cursor-pointer"
              >
                Let&apos;s Build Together
              </a>

              {/* Mobile hamburger */}
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#7C3AED]/30 bg-[#1A0F33]/80 text-white transition-colors duration-300 hover:border-[#A855F7] hover:bg-[#241445] lg:hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A855F7]"
                onClick={toggleMobile}
                aria-label="Open navigation menu"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <MobileMenu
        isOpen={isMobileOpen}
        pathname={pathname}
        onClose={closeMobile}
      />
    </>
  );
});
