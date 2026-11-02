/**
 * Ampledia Font Engine
 * 
 * Provides Sora (headings) and Inter (body) typography variables
 * decoupled from build-time external font network timeouts.
 */

export const sora = {
  variable: 'font-sora',
  className: 'font-sora',
};

export const inter = {
  variable: 'font-inter',
  className: 'font-inter',
};

// Backward compatibility aliases
export const geistSans = inter;
export const playfairDisplay = sora;
