import { Variants } from 'framer-motion';

// Premium minimal ease curve (Apple/Linear style)
const minimalEase = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: minimalEase,
    },
  },
};

export const fadeIn: Variants = {
  initial: {
    opacity: 0,
    filter: 'blur(6px)',
  },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: minimalEase,
    },
  },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const buttonHover = {
  scale: 1.01,
  transition: { duration: 0.2, ease: minimalEase },
};

export const buttonTap = {
  scale: 0.98,
};
