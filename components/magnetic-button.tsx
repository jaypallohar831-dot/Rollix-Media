'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { isReducedMotion } from '@/lib/motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  target?: string;
  rel?: string;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className,
  strength = 24,
  target,
  rel,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = buttonRef.current;
    if (!el || typeof window === 'undefined') return;

    // Only enable magnetic pull on desktop devices with a precision pointer
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer || isReducedMotion()) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power2.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      xTo((distanceX / rect.width) * strength);
      yTo((distanceY / rect.height) * strength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  const innerContent = (
    <div
      ref={buttonRef}
      className={cn(
        'relative inline-flex items-center justify-center transition-transform duration-100 will-change-transform',
        className
      )}
    >
      {children}
    </div>
  );

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
    if (isExternal) {
      return (
        <a
          href={href}
          target={target || (href.startsWith('http') ? '_blank' : undefined)}
          rel={rel || (href.startsWith('http') ? 'noopener noreferrer' : undefined)}
          onClick={onClick}
          className="inline-block"
        >
          {innerContent}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className="inline-block">
        {innerContent}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block">
      {innerContent}
    </button>
  );
}

