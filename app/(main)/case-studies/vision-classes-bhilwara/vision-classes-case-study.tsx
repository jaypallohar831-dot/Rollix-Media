'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Eye,
  Users,
  Heart,
  MousePointerClick,
  UserPlus,
  Check,
  TrendingUp,
  Phone,
  MapPin,
  Play,
  Trophy,
  Medal,
  DollarSign,
  Calendar,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

/* ─────────────────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────────────────── */

const METRICS = [
  { label: 'Total Views', value: 129273, icon: Eye, gradient: 'from-violet-500 to-purple-600' },
  { label: 'Unique Reach', value: 67979, icon: Users, gradient: 'from-pink-500 to-rose-600' },
  { label: 'Engagement', value: 19889, icon: Heart, gradient: 'from-orange-500 to-amber-600' },
  { label: 'Link Clicks', value: 629, icon: MousePointerClick, gradient: 'from-cyan-500 to-blue-600' },
  { label: 'Leads Generated', value: 60, prefix: '40–', icon: UserPlus, gradient: 'from-emerald-500 to-green-600' },
];

const ADS = [
  { label: 'Faculty Interview', views: 41932, rank: 1 },
  { label: 'CET Offer', views: 19966, rank: 2 },
  { label: 'Student Success', views: 13852, rank: 3 },
  { label: 'Girl Testimonial', views: 6528, rank: 4 },
  { label: 'Classroom Tour', views: 4766, rank: 5 },
];

const MAX_VIEWS = 41932;

const MULTIPLIERS = ['20x', '50x', '100x', '125x'];

const BAR_COLORS = [
  'from-yellow-400 to-amber-500',
  'from-gray-300 to-gray-400',
  'from-amber-600 to-amber-700',
  'from-cyan-400 to-blue-500',
  'from-violet-400 to-purple-500',
];

const RANK_STYLES = [
  'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
  'bg-slate-200 text-slate-700',
  'bg-amber-100 text-amber-800 border border-amber-300',
  'bg-muted text-muted-foreground',
  'bg-muted text-muted-foreground',
];

/* ─────────────────────────────────────────────────────────
   COUNTER HOOK
   ───────────────────────────────────────────────────────── */

function useCounter(target: number, duration = 1200, shouldStart = false) {
  const [count, setCount] = useState(0);
  const animRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!shouldStart) return;
    const start = performance.now();
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * target));
      if (t < 1) animRef.current = requestAnimationFrame(tick);
    }
    animRef.current = requestAnimationFrame(tick);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [target, duration, shouldStart]);

  return count;
}

/* ─────────────────────────────────────────────────────────
   METRIC CARD
   ───────────────────────────────────────────────────────── */

function MetricCard({
  metric,
  index,
  isActive,
}: {
  metric: typeof METRICS[0];
  index: number;
  isActive: boolean;
}) {
  const count = useCounter(metric.value, 1400, isActive);
  const Icon = metric.icon;
  const formattedCount = (metric.prefix || '') + count.toLocaleString('en-IN');

  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={isActive ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 }}
      className="group relative flex items-center gap-5 rounded-2xl border border-border bg-white p-5 sm:p-7 shadow-sm transition-all hover:border-cinematic-orange/30 hover:shadow-md"
    >
      {/* Icon */}
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${metric.gradient} sm:h-16 sm:w-16 sm:rounded-2xl`}
      >
        <Icon className="h-7 w-7 text-white sm:h-8 sm:w-8" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground sm:text-sm">
          {metric.label}
        </p>
        <p className="text-3xl font-extrabold text-foreground sm:text-4xl lg:text-[2.75rem] leading-tight tabular-nums">
          {formattedCount}
        </p>
      </div>

      {/* Check */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isActive ? { scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 15, delay: index * 0.15 + 0.8 }}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500 sm:h-10 sm:w-10"
      >
        <Check className="h-5 w-5 text-white" />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   BAR CHART COLUMN
   ───────────────────────────────────────────────────────── */

function BarColumn({
  ad,
  index,
  isActive,
}: {
  ad: typeof ADS[0];
  index: number;
  isActive: boolean;
}) {
  const heightPct = (ad.views / MAX_VIEWS) * 100;

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      {/* Value */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: index * 0.2 + 0.8 }}
        className="text-xs font-bold text-foreground sm:text-sm tabular-nums"
      >
        {ad.views.toLocaleString('en-IN')}
      </motion.p>

      {/* Bar */}
      <div
        className="relative w-full overflow-hidden rounded-t-lg bg-muted/60"
        style={{ height: `${Math.max(heightPct * 2.8, 30)}px` }}
      >
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isActive ? { scaleY: 1 } : {}}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.2,
          }}
          className={`absolute inset-0 origin-bottom rounded-t-lg bg-gradient-to-t ${BAR_COLORS[index]}`}
          style={{ transformOrigin: 'bottom' }}
        />
      </div>

      {/* Rank */}
      <span
        className={`inline-flex items-center justify-center rounded-full px-2.5 py-1 text-[10px] font-bold sm:text-xs ${RANK_STYLES[index]}`}
      >
        #{ad.rank}
      </span>

      {/* Label */}
      <p className="max-w-[90px] text-center text-[10px] font-medium leading-tight text-muted-foreground sm:text-xs">
        {ad.label}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   CONFETTI
   ───────────────────────────────────────────────────────── */

function Confetti({ active }: { active: boolean }) {
  const colors = ['#FFD700', '#FF8C42', '#28A745', '#1F4788', '#ff6b6b', '#4facfe', '#f093fb'];
  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -20, x: `${5 + Math.random() * 90}%`, opacity: 1, rotate: 0 }}
          animate={{ y: '120vh', opacity: 0, rotate: 720 }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 0.6,
            ease: 'linear',
          }}
          className="absolute h-3 w-3 rounded-sm sm:h-4 sm:w-4"
          style={{
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            left: `${5 + Math.random() * 90}%`,
            borderRadius: Math.random() > 0.5 ? '50%' : '3px',
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION WRAPPER
   ───────────────────────────────────────────────────────── */

function CaseStudySection({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <div ref={ref} id={id} className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═════════════════════════════════════════════════════════ */

export function VisionClassesCaseStudy() {
  const [activeScene, setActiveScene] = useState<number | null>(null);
  const [metricsStarted, setMetricsStarted] = useState(false);
  const [chartStarted, setChartStarted] = useState(false);
  const [roiStarted, setRoiStarted] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [summaryStarted, setSummaryStarted] = useState(false);

  // Intersection observers for each section
  const metricsRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const roiRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const metricsInView = useInView(metricsRef, { once: false, margin: '-20%' });
  const chartInView = useInView(chartRef, { once: false, margin: '-20%' });
  const roiInView = useInView(roiRef, { once: false, margin: '-20%' });
  const summaryInView = useInView(summaryRef, { once: false, margin: '-20%' });

  useEffect(() => {
    if (metricsInView) setMetricsStarted(true);
  }, [metricsInView]);
  useEffect(() => {
    if (chartInView) setChartStarted(true);
  }, [chartInView]);
  useEffect(() => {
    if (roiInView) {
      setRoiStarted(true);
      const t = setTimeout(() => setConfettiActive(true), 2500);
      return () => clearTimeout(t);
    }
  }, [roiInView]);
  useEffect(() => {
    if (summaryInView) setSummaryStarted(true);
  }, [summaryInView]);

  // Calendar days: 14-30 June + 1-13 July
  const calDays: number[] = [];
  for (let d = 14; d <= 30; d++) calDays.push(d);
  for (let d = 1; d <= 13; d++) calDays.push(d);

  return (
    <main className="relative bg-background overflow-hidden text-foreground">
      {/* ── Ambient background ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,118,60,0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ════════════════════════════════════════════════════
         SCENE 1 — TITLE & CALENDAR
         ════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 py-24 sm:px-10 lg:px-16 overflow-hidden">
        {/* Glow */}
        <div
          className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-15 sm:w-[700px] sm:h-[700px]"
          style={{
            background: 'radial-gradient(circle, rgba(212,118,60,0.2) 0%, transparent 70%)',
          }}
        />

        {/* Logo badge */}
        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="relative z-10 mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#FF8C42] to-[#ff6b1a] shadow-lg sm:h-36 sm:w-36"
        >
          <Trophy className="h-14 w-14 text-white sm:h-16 sm:w-16" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center font-heading text-[clamp(2.2rem,6vw,4.5rem)] font-light leading-[1.1] tracking-[-0.02em] text-foreground"
        >
          <span className="text-cinematic-orange italic font-normal">
            VISION CLASSES
          </span>
          <br />
          BHILWARA
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mt-4 text-lg font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-2xl"
        >
          Ad Campaign Results
        </motion.p>

        {/* Calendar strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="relative z-10 mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-1.5 sm:gap-2"
        >
          {calDays.map((d, i) => (
            <motion.div
              key={`${d}-${i}`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
                delay: 1.2 + i * 0.04,
              }}
              className={`flex h-10 w-10 items-center justify-center rounded-lg text-xs font-semibold transition-colors sm:h-12 sm:w-12 sm:rounded-xl sm:text-sm ${
                i % 7 === 0 || i === calDays.length - 1
                  ? 'bg-cinematic-orange text-white shadow-sm border border-cinematic-orange'
                  : 'bg-white text-muted-foreground border border-border shadow-xs'
              }`}
            >
              {d}
            </motion.div>
          ))}
        </motion.div>

        {/* Date label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.5 }}
          className="relative z-10 mt-6 flex items-center gap-2 text-base font-semibold text-cinematic-orange sm:text-lg"
        >
          <Calendar className="h-5 w-5" />
          14 June — 13 July 2025 &bull; 30 Days
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-10 animate-scroll-hint"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <div className="h-8 w-[1px] bg-border" />
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════
         SCENE 2 — METRICS
         ════════════════════════════════════════════════════ */}
      <section ref={metricsRef} className="relative px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-[820px]">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={metricsStarted ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 text-center font-heading text-[clamp(1.8rem,4vw,3rem)] font-light text-foreground"
          >
            Campaign{' '}
            <span className="text-cinematic-orange italic">Performance</span>
          </motion.h2>

          <div className="flex flex-col gap-4 sm:gap-5">
            {METRICS.map((m, i) => (
              <MetricCard key={m.label} metric={m} index={i} isActive={metricsStarted} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
         SCENE 3 — BAR CHART
         ════════════════════════════════════════════════════ */}
      <section ref={chartRef} className="relative px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <div className="mx-auto max-w-3xl">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={chartStarted ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 text-center font-heading text-[clamp(1.8rem,4vw,3rem)] font-light text-foreground"
          >
            Top <span className="text-cinematic-orange italic">5 Ads</span>{' '}
            Performance
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={chartStarted ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 text-center text-sm text-muted-foreground sm:text-base"
          >
            Views per Ad Creative
          </motion.p>

          <div className="flex items-end gap-3 sm:gap-5 lg:gap-8">
            {ADS.map((ad, i) => (
              <BarColumn key={ad.label} ad={ad} index={i} isActive={chartStarted} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
         SCENE 4 — ROI
         ════════════════════════════════════════════════════ */}
      <section ref={roiRef} className="relative px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
        <Confetti active={confettiActive} />

        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={roiStarted ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 font-heading text-[clamp(1.8rem,4vw,3rem)] font-light text-foreground"
          >
            Return on{' '}
            <span className="text-emerald-600 italic">
              Investment
            </span>
          </motion.h2>

          {/* Investment card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={roiStarted ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.2 }}
            className="mb-8 flex items-center gap-5 rounded-2xl border border-border bg-white p-5 sm:gap-6 sm:p-7 shadow-sm"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF8C42] to-[#ff6b1a]">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Total Investment</p>
              <p className="text-4xl font-extrabold text-foreground sm:text-5xl">₹6,000</p>
            </div>
          </motion.div>

          {/* Multipliers */}
          <div className="mb-10 flex flex-wrap justify-center gap-3 sm:gap-4">
            {MULTIPLIERS.map((m, i) => (
              <motion.div
                key={m}
                initial={{ scale: 0, opacity: 0 }}
                animate={roiStarted ? { scale: 1, opacity: 1 } : {}}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 18,
                  delay: 0.8 + i * 0.3,
                }}
                className={`rounded-xl border px-5 py-3 text-xl font-bold sm:px-7 sm:py-4 sm:text-2xl ${
                  i === MULTIPLIERS.length - 1
                    ? 'border-emerald-500 bg-emerald-500 text-white shadow-md'
                    : 'border-border bg-white text-foreground shadow-xs'
                }`}
              >
                {m}
              </motion.div>
            ))}
          </div>

          {/* Final ROI */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={roiStarted ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 180, damping: 15, delay: 2.3 }}
            className="text-center"
          >
            <p className="mb-2 text-lg text-muted-foreground">Campaign ROI</p>
            <p className="text-5xl font-black sm:text-6xl lg:text-7xl">
              <span className="text-emerald-600 font-extrabold">
                20:1 → 125:1
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
         SCENE 5 — SUMMARY & CTA
         ════════════════════════════════════════════════════ */}
      <section
        ref={summaryRef}
        className="relative px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-36"
      >
        <div className="relative z-10 mx-auto max-w-[820px] text-center">
          {/* Brand */}
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={summaryStarted ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-2 font-heading text-[clamp(2rem,5vw,3.5rem)] font-light text-foreground"
          >
            VISION CLASSES BHILWARA
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={summaryStarted ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-10 flex items-center justify-center gap-2 text-base font-semibold text-cinematic-orange sm:text-lg"
          >
            <Trophy className="h-5 w-5" />
            Campaign Results at a Glance
          </motion.p>

          {/* Stats grid */}
          <div className="mb-8 grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { value: '129K+', label: 'Views' },
              { value: '67K+', label: 'Reach' },
              { value: '20K+', label: 'Engagement' },
              { value: '40–60', label: 'Leads Generated' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ y: 20, opacity: 0 }}
                animate={summaryStarted ? { y: 0, opacity: 1 } : {}}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.5 + i * 0.15,
                }}
                className="rounded-2xl border border-border bg-white px-4 py-5 sm:px-6 sm:py-7 shadow-sm"
              >
                <p className="text-2xl font-extrabold text-foreground sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Admissions */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={summaryStarted ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="mb-8 rounded-2xl border border-border bg-white p-5 sm:p-7 shadow-sm"
          >
            <p className="text-sm text-muted-foreground">Estimated Admissions</p>
            <p className="text-3xl font-extrabold text-foreground sm:text-4xl">
              12 – 30
            </p>
          </motion.div>

          {/* ROI badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={summaryStarted ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 1.3 }}
            className="mb-10 rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/50 px-6 py-6 sm:px-10 sm:py-8"
          >
            <p className="text-sm text-muted-foreground">Return on Investment</p>
            <p className="text-4xl font-black text-emerald-600 sm:text-5xl">
              20:1 → 125:1
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={summaryStarted ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.6 }}
            className="mb-8"
          >
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-8">
              <a
                href="tel:9116975022"
                className="flex items-center gap-2 text-foreground/80 transition-colors hover:text-cinematic-orange"
              >
                <Phone className="h-4 w-4 text-cinematic-orange" />
                <span className="text-sm font-medium sm:text-base">9116975022</span>
              </a>
              <a
                href="tel:9461332739"
                className="flex items-center gap-2 text-foreground/80 transition-colors hover:text-cinematic-orange"
              >
                <Phone className="h-4 w-4 text-cinematic-orange" />
                <span className="text-sm font-medium sm:text-base">9461332739</span>
              </a>
            </div>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-cinematic-orange" />
              Badla Chauraha, Bhilwara
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={summaryStarted ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#FF8C42] to-[#ff6b1a] px-7 py-3.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 sm:px-8 sm:py-4 sm:text-base"
            >
              <Sparkles className="h-4 w-4" />
              Book Free Demo
            </Link>
            <a
              href="tel:9116975022"
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-white px-7 py-3.5 text-sm font-bold text-foreground transition-colors hover:bg-muted sm:px-8 sm:py-4 sm:text-base shadow-xs"
            >
              <Phone className="h-4 w-4 text-emerald-600" />
              Call Now
            </a>
          </motion.div>

          {/* Ready message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={summaryStarted ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 2.3 }}
            className="mt-10 text-sm text-muted-foreground"
          >
            Ready to Join Vision Classes? Your success story starts here.
          </motion.p>
        </div>

        {/* WhatsApp FAB */}
        <motion.a
          href="https://wa.me/919116975022"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={summaryStarted ? { scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 2.2 }}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110 sm:h-16 sm:w-16"
          aria-label="Chat on WhatsApp"
        >
          <svg className="h-7 w-7 fill-white sm:h-8 sm:w-8" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </motion.a>
      </section>

      {/* ── Powered by Rollix Media footer ── */}
      <div className="border-t border-border px-6 py-8 text-center bg-white">
        <p className="text-xs text-muted-foreground">
          Campaign managed by{' '}
          <Link href="/" className="text-cinematic-orange transition-colors hover:underline">
            Rollix Media
          </Link>{' '}
          — Digital Marketing Agency, Bhilwara
        </p>
      </div>
    </main>
  );
}
