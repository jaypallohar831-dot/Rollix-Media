'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12,           // faster interpolation — less lag, still smooth
        smoothWheel: true,
        wheelMultiplier: 0.8,  // slightly calmer wheel response
        touchMultiplier: 1.5,  // snappy mobile touch
        infinite: false,
      }}
    >
      <div style={{ position: 'relative' }}>
        {children}
      </div>
    </ReactLenis>
  );
}
