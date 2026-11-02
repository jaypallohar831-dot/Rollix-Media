/**
 * Supabase Error & Quota Restriction Handler
 *
 * Centralized utility to:
 * 1. Detect Supabase project restrictions (e.g. exceed_cached_egress_quota).
 * 2. Prevent automated retry loops using a client/server circuit breaker.
 * 3. Log errors cleanly without exposing API secrets or connection details.
 * 4. Generate user-friendly, non-technical error messages.
 */

export interface SupabaseErrorDetails {
  message?: string;
  details?: string;
  hint?: string;
  code?: string;
  status?: number;
}

const QUOTA_ERROR_PATTERNS = [
  /exceed_cached_egress_quota/i,
  /exceed.*quota/i,
  /service for this project is restricted/i,
  /restricted due to the following violations/i,
  /quota.*exceeded/i,
  /bandwidth.*exceeded/i,
  /egress.*limit/i,
  /enotfound/i,
  /getaddrinfo/i,
  /fetch failed/i,
  /econnrefused/i,
  /etimedout/i,
  /networkerror/i,
];

/**
 * Checks whether an error is caused by a Supabase project restriction, DNS removal, or network outage.
 */
export function isSupabaseQuotaError(error: unknown): boolean {
  if (!error) return false;

  const errorString = typeof error === 'string' 
    ? error 
    : error instanceof Error 
      ? `${error.message} ${error.name} ${'code' in error ? (error as any).code : ''} ${error.stack || ''}` 
      : JSON.stringify(error);

  return QUOTA_ERROR_PATTERNS.some((pattern) => pattern.test(errorString));
}

/**
 * Wraps a promise with a hard timeout to prevent hanging SSR renders (e.g. 2.5s max).
 */
export async function withTimeout<T>(
  promise: PromiseLike<T> | Promise<T>,
  ms = 2500,
  fallbackValue: T
): Promise<T> {
  let timeoutId: NodeJS.Timeout;
  const timeoutPromise = new Promise<T>((resolve) => {
    timeoutId = setTimeout(() => resolve(fallbackValue), ms);
  });
  try {
    return await Promise.race([Promise.resolve(promise), timeoutPromise]);
  } finally {
    clearTimeout(timeoutId!);
  }
}

/**
 * Extracts a safe, user-friendly message for public visitors.
 * Never leaks database tables, Supabase URLs, keys, or raw constraint messages.
 */
export function getSafeErrorMessage(error: unknown): string {
  if (isSupabaseQuotaError(error)) {
    return 'Our media gallery is temporarily undergoing scheduled bandwidth maintenance. Please check back shortly or explore our featured case studies.';
  }

  return 'Unable to load content at this moment. Please check your connection and try again.';
}

// ── Circuit Breaker & Retry Loop Prevention ───────────────────────────────────

class CircuitBreaker {
  private isRestricted = false;
  private restrictedUntil = 0;
  private lastLogTimestamp = 0;
  private readonly COOLDOWN_MS = 60_000; // 60s cooldown when restricted
  private readonly LOG_THROTTLE_MS = 15_000; // Log once every 15s max

  /**
   * Check if requests should be throttled/fast-failed to prevent hammering
   * a restricted project with automatic retry loops.
   */
  public shouldThrottle(): boolean {
    if (!this.isRestricted) return false;

    if (Date.now() < this.restrictedUntil) {
      return true;
    }

    // Cooldown elapsed; allow a tentative probe request
    this.isRestricted = false;
    return false;
  }

  /**
   * Record a Supabase failure. If it's a quota error, trips the circuit breaker.
   */
  public recordFailure(error: unknown, context: string): void {
    if (isSupabaseQuotaError(error)) {
      this.isRestricted = true;
      this.restrictedUntil = Date.now() + this.COOLDOWN_MS;

      const now = Date.now();
      if (now - this.lastLogTimestamp > this.LOG_THROTTLE_MS) {
        this.lastLogTimestamp = now;
        console.warn(
          `[Supabase Quota Protection] Service is restricted due to exceed_cached_egress_quota in [${context}]. Automatic retries are paused for 60s to prevent unnecessary traffic.`
        );
      }
    } else {
      // General error logging (sanitized)
      const now = Date.now();
      if (now - this.lastLogTimestamp > this.LOG_THROTTLE_MS) {
        this.lastLogTimestamp = now;
        const safeMsg = error instanceof Error ? error.message : typeof error === 'string' ? error : 'Unknown error';
        console.error(`[Supabase Error in ${context}]:`, safeMsg);
      }
    }
  }

  /**
   * Record a successful response. Resets the circuit breaker.
   */
  public recordSuccess(): void {
    this.isRestricted = false;
    this.restrictedUntil = 0;
  }

  /**
   * Manually reset to allow an explicit user-triggered retry.
   */
  public reset(): void {
    this.isRestricted = false;
    this.restrictedUntil = 0;
  }

  /**
   * Status check for UI banners
   */
  public getStatus(): { isRestricted: boolean; remainingCooldownSeconds: number } {
    const remaining = Math.max(0, Math.ceil((this.restrictedUntil - Date.now()) / 1000));
    return {
      isRestricted: this.isRestricted && remaining > 0,
      remainingCooldownSeconds: remaining,
    };
  }
}

export const supabaseCircuitBreaker = new CircuitBreaker();

/**
 * Custom error class for Supabase service outages.
 */
export class SupabaseServiceUnavailableError extends Error {
  public readonly isQuotaRestricted: boolean;

  constructor(message: string, isQuotaRestricted = false) {
    super(message);
    this.name = 'SupabaseServiceUnavailableError';
    this.isQuotaRestricted = isQuotaRestricted;
  }
}
