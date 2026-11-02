/**
 * Ampledia GSAP Motion Engine & Utilities
 * 
 * Replaces heavy Three.js & Framer-Motion runtimes with lightweight,
 * high-performance GreenSock animations.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger once on the client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Checks if the user prefers reduced motion (system setting)
 */
export function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Connects Lenis instance to GSAP ScrollTrigger
 */
export function connectLenisToScrollTrigger(lenis: any) {
  if (typeof window === 'undefined' || !lenis) return;
  
  lenis.on('scroll', ScrollTrigger.update);
  
  const tickerFn = (time: number) => {
    lenis.raf(time * 1000);
  };
  
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tickerFn);
  };
}

/**
 * Reusable ScrollReveal helper using GSAP ScrollTrigger
 */
export function createScrollReveal(
  target: gsap.DOMTarget,
  options?: {
    y?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    trigger?: gsap.DOMTarget;
    start?: string;
  }
) {
  if (typeof window === 'undefined') return;

  if (isReducedMotion()) {
    gsap.set(target, { opacity: 1, y: 0 });
    return;
  }

  const {
    y = 30,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    stagger = 0.1,
    trigger = target,
    start = 'top 85%',
  } = options || {};

  return gsap.fromTo(
    target,
    { opacity, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger,
        start,
        once: true,
      },
    }
  );
}

/**
 * Stagger text animation helper for headlines
 */
export function createStaggerText(
  targets: gsap.DOMTarget,
  options?: {
    duration?: number;
    stagger?: number;
    delay?: number;
    trigger?: gsap.DOMTarget;
  }
) {
  if (typeof window === 'undefined') return;

  if (isReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return;
  }

  const {
    duration = 0.7,
    stagger = 0.08,
    delay = 0,
    trigger = targets,
  } = options || {};

  return gsap.fromTo(
    targets,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger,
        start: 'top 80%',
        once: true,
      },
    }
  );
}

export { gsap, ScrollTrigger };

