'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollWordRevealProps {
  text: string;
  gradientWord?: string;
  className?: string;
  as?: 'h2' | 'h3' | 'p' | 'div';
}

export function ScrollWordReveal({
  text,
  gradientWord,
  className = '',
  as: Component = 'h2',
}: ScrollWordRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll('.word-reveal-token');
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          opacity: 0.18,
          filter: 'blur(3px)',
          y: 6,
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 82%',
            end: 'top 35%',
            scrub: 0.8,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [text, gradientWord]);

  const rawWords = text.split(' ');

  return (
    // @ts-expect-error dynamic polymorphic component ref
    <Component ref={containerRef} className={`${className} inline-block leading-tight`}>
      {rawWords.map((word, index) => {
        const isGradient = gradientWord && word.toLowerCase().includes(gradientWord.toLowerCase());

        return (
          <span
            key={index}
            className={`word-reveal-token inline-block mr-[0.28em] will-change-transform ${
              isGradient
                ? 'bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#DDD6FE] bg-clip-text text-transparent'
                : 'text-white'
            }`}
          >
            {word}
          </span>
        );
      })}
    </Component>
  );
}

export default ScrollWordReveal;
