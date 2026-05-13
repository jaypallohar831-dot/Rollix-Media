import { Variants } from 'framer-motion';

// Premium cinematic ease curve but tuned for snappy, smooth speed
const snappyEase = [0.25, 1, 0.5, 1] as const;

// --- Fade up with snappy timing ---
export const fadeUp: Variants = {
  initial: {
    opacity: 0,
    y: 20, // reduced distance
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: snappyEase,
    },
  },
};

// --- Fade in (no movement) ---
export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// --- Stagger container for child animations ---
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08, // faster stagger
      delayChildren: 0.1,    // less delay
    },
  },
};

// --- Scale up with snappy ease ---
export const scaleUp: Variants = {
  initial: {
    scale: 0.95, // closer to 1
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: snappyEase,
    },
  },
};

// --- Slide in from left ---
export const slideInLeft: Variants = {
  initial: {
    x: -30, // reduced distance
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: snappyEase,
    },
  },
};

// --- Slide in from right ---
export const slideInRight: Variants = {
  initial: {
    x: 30, // reduced distance
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: snappyEase,
    },
  },
};

// --- Word-by-word text reveal ---
export const wordReveal: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export const wordRevealChild: Variants = {
  initial: {
    y: '100%',
    opacity: 0,
  },
  animate: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: snappyEase,
    },
  },
};

// --- Character-by-character reveal ---
export const charReveal: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.015,
    },
  },
};

export const charRevealChild: Variants = {
  initial: {
    y: '110%',
    opacity: 0,
    rotateX: -45, // reduced rotation
  },
  animate: {
    y: '0%',
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.4,
      ease: snappyEase,
    },
  },
};

// --- Parallax float for background elements ---
export const parallaxFloat: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [-5, 5, -5], // reduced float amplitude
    transition: {
      duration: 6,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
};

// --- Button hover scale ---
export const buttonHover = {
  scale: 1.02,
  transition: { duration: 0.2, ease: snappyEase },
};

export const buttonTap = {
  scale: 0.98,
};
