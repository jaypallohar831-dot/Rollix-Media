// Simple animation variants definitions
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
};

export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1 } },
};

export const buttonHover = {
  scale: 1.02,
};

export const buttonTap = {
  scale: 0.98,
};
