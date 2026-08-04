/**
 * Simple client-side analytics event tracker.
 * Logs event data safely to console and window tracking if present.
 */
export function trackEvent(eventName: string, data?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  const eventPayload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    ...data,
  };

  // 1. Console log in development mode or for debugging
  if (process.env.NODE_NODE_ENV !== 'production') {
    console.log('[Analytics Event]', eventName, eventPayload);
  }

  // 2. Window gtag or custom analytics bridge if attached
  if (typeof (window as unknown as { gtag?: Function }).gtag === 'function') {
    (window as unknown as { gtag: Function }).gtag('event', eventName, data);
  }
}
