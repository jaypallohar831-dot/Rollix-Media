'use client';

import { useState, useEffect } from 'react';
import { Loader } from '@/components/loader';

export function HomepageLoader({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Only show the heavy splash screen once per session
    const hasVisited = sessionStorage.getItem('rollix_visited');
    if (!hasVisited) {
      setShowLoader(true);
      sessionStorage.setItem('rollix_visited', 'true');
    }
  }, []);

  return (
    <>
      {showLoader && <Loader onComplete={() => setShowLoader(false)} />}

      {/* 
        Page content renders immediately for perfect Core Web Vitals (FCP/LCP).
        If the loader is active, it sits on top via z-index and covers this content.
      */}
      <div className="relative">
        {children}
      </div>
    </>
  );
}

