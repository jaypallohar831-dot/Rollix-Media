/**
 * Ampledia Client-Side Analytics & Pixel Tracker
 * 
 * Supports Google Analytics 4 (gtag) and Meta Pixel (fbq).
 * Safely guards against missing SDKs or SSR execution.
 */

export function trackEvent(eventName: string, data?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  const eventPayload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    ...data,
  };

  // Console log in development
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Analytics Event]', eventName, eventPayload);
  }

  // 1. Google Analytics (gtag)
  const win = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };

  if (typeof win.gtag === 'function') {
    win.gtag('event', eventName, data);
  }

  // 2. Meta Pixel (fbq)
  if (typeof win.fbq === 'function') {
    win.fbq('trackCustom', eventName, data);
  }
}

/**
 * Standard Meta Pixel conversion event
 */
export function trackMetaLead(leadData?: { content_name?: string; value?: number; currency?: string }) {
  if (typeof window === 'undefined') return;
  const win = window as unknown as { fbq?: (...args: unknown[]) => void };
  if (typeof win.fbq === 'function') {
    win.fbq('track', 'Lead', leadData);
  }
}
