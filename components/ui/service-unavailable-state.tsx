'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

interface ServiceUnavailableStateProps {
  title?: string;
  message?: string;
  onRetry?: () => Promise<void> | void;
  showCaseStudyLink?: boolean;
}

export function ServiceUnavailableState({
  title = 'Showcase Temporarily Unavailable',
  message = 'Our portfolio showcase is currently undergoing scheduled bandwidth maintenance. The live showcase will resume automatically shortly.',
  onRetry,
  showCaseStudyLink = true,
}: ServiceUnavailableStateProps) {
  const [retrying, setRetrying] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleRetry = useCallback(async () => {
    if (retrying || cooldown > 0 || !onRetry) return;

    setRetrying(true);
    try {
      await onRetry();
    } catch {
      // Handled upstream
    } finally {
      setRetrying(false);
      // Enforce 10-second controlled cooldown to prevent hammering restricted endpoints
      setCooldown(10);
    }
  }, [retrying, cooldown, onRetry]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-border/60 bg-card/60 p-8 shadow-xl backdrop-blur-md sm:p-12"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cinematic-orange/20 bg-cinematic-orange/10 text-cinematic-orange">
          <AlertCircle className="h-8 w-8" />
        </div>

        <h3 className="font-heading text-2xl font-light tracking-tight text-foreground sm:text-3xl">
          {title}
        </h3>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {message}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {onRetry && (
            <button
              onClick={handleRetry}
              disabled={retrying || cooldown > 0}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-cinematic-orange px-6 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-cinematic-orange/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              <RefreshCw className={`h-4 w-4 ${retrying ? 'animate-spin' : ''}`} />
              {retrying
                ? 'Reconnecting...'
                : cooldown > 0
                ? `Retry in ${cooldown}s`
                : 'Retry Connection'}
            </button>
          )}

          {showCaseStudyLink && (
            <Link
              href="/portfolio/vision-classes-bhilwara"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/80 px-6 text-xs font-bold uppercase tracking-wider text-foreground shadow-xs transition-colors hover:border-cinematic-orange/40 hover:text-cinematic-orange sm:w-auto"
            >
              Read Vision Classes Study
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <div className="mt-10 border-t border-border/40 pt-6">
          <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Mail className="h-3.5 w-3.5 text-cinematic-orange" />
            Need immediate project reels?{' '}
            <Link href="/#contact" className="font-medium text-foreground underline hover:text-cinematic-orange">
              Contact us directly
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
