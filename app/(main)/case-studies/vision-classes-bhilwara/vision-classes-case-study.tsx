'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Trophy,
  DollarSign,
  Calendar,
  Sparkles,
  Award,
  ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';

/* ─────────────────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────────────────── */

const METRICS = [
  { label: 'Total Views', value: 129273, formatted: '129K+', icon: Eye, gradient: 'from-violet-500 to-purple-600', note: 'Total impressions' },
  { label: 'Unique Reach', value: 67979, formatted: '67.9K+', icon: Users, gradient: 'from-pink-500 to-rose-600', note: 'Individual users' },
  { label: 'Engagement', value: 19889, formatted: '19.8K+', icon: Heart, gradient: 'from-orange-500 to-amber-600', note: 'Likes & saves' },
  { label: 'Link Clicks', value: 629, formatted: '629', icon: MousePointerClick, gradient: 'from-cyan-500 to-blue-600', note: 'Profile & WhatsApp' },
  { label: 'Leads Generated', value: 60, formatted: '40–60', prefix: '40–', icon: UserPlus, gradient: 'from-emerald-500 to-green-600', note: 'Direct inquiries' },
];

const ADS = [
  { label: 'Faculty Interview', views: 41932, rank: 1, pct: 100 },
  { label: 'CET Offer', views: 19966, rank: 2, pct: 47.6 },
  { label: 'Student Success', views: 13852, rank: 3, pct: 33.0 },
  { label: 'Girl Testimonial', views: 6528, rank: 4, pct: 15.5 },
  { label: 'Classroom Tour', views: 4766, rank: 5, pct: 11.3 },
];

const MULTIPLIERS = ['20x', '50x', '100x', '125x'];

/* ─────────────────────────────────────────────────────────
   CONFETTI
   ───────────────────────────────────────────────────────── */

function Confetti() {
  const colors = ['#FFD700', '#FF8C42', '#28A745', '#1F4788', '#ff6b6b', '#4facfe'];

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -10, x: `${5 + (i * 4)}%`, opacity: 1, rotate: 0 }}
          animate={{ y: '100vh', opacity: 0, rotate: 360 }}
          transition={{
            duration: 2.5 + (i % 3),
            delay: (i % 5) * 0.2,
            repeat: Infinity,
            repeatDelay: 4,
            ease: 'linear',
          }}
          className="absolute h-2 w-2 rounded-sm"
          style={{
            backgroundColor: colors[i % colors.length],
            left: `${(i * 4) + 2}%`,
            borderRadius: i % 2 === 0 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
}

/* ═════════════════════════════════════════════════════════
   MAIN COMPONENT — SINGLE PAGE DASHBOARD
   ═════════════════════════════════════════════════════════ */

export function VisionClassesCaseStudy() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calendar days: 14-30 June + 1-13 July (30 Days)
  const calDays: number[] = [];
  for (let d = 14; d <= 30; d++) calDays.push(d);
  for (let d = 1; d <= 13; d++) calDays.push(d);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-background via-muted/20 to-background text-foreground px-3 py-3 sm:px-6 sm:py-5 lg:px-8 lg:py-6 flex flex-col justify-between overflow-x-hidden selection:bg-cinematic-orange selection:text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(212,118,60,0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      <Confetti />

      <div className="mx-auto max-w-7xl w-full flex-1 flex flex-col justify-between gap-4 relative z-20">

        {/* ════════════════════════════════════════════════════
           TOP HEADER BANNER
           ════════════════════════════════════════════════════ */}
        <header className="rounded-2xl border border-border/80 bg-white/80 p-4 sm:p-5 backdrop-blur-md shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            
            {/* Title & Badge */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF8C42] to-[#ff6b1a] shadow-sm text-white">
                <Trophy className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-cinematic-orange/10 px-2.5 py-0.5 text-[11px] font-bold text-cinematic-orange uppercase tracking-wider">
                    <Sparkles className="h-3 w-3" /> Case Study
                  </span>
                  <span className="text-xs text-muted-foreground hidden sm:inline">• Rollix Media Verified</span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground">
                  VISION CLASSES <span className="text-cinematic-orange italic font-normal">BHILWARA</span>
                </h1>
              </div>
            </div>

            {/* Campaign Summary Capsules */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-3 py-2 text-xs font-semibold text-foreground">
                <Calendar className="h-4 w-4 text-cinematic-orange" />
                <span>14 June — 13 July 2025</span>
                <span className="rounded-md bg-cinematic-orange/20 px-1.5 py-0.5 text-[10px] text-cinematic-orange font-bold">30 Days</span>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-50/80 px-3 py-2 text-xs font-bold text-emerald-700 shadow-2xs">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                <span>ROI: 20:1 → 125:1</span>
              </div>
            </div>

          </div>
        </header>

        {/* ════════════════════════════════════════════════════
           MAIN DASHBOARD GRID (1 SCREEN FIT)
           ════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">

          {/* ── LEFT COLUMN: METRICS & ADS BREAKDOWN (7 COLS) ── */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* 1. Key Performance Metrics Grid */}
            <div className="rounded-2xl border border-border/80 bg-white/80 p-4 sm:p-5 backdrop-blur-md shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Award className="h-4 w-4 text-cinematic-orange" /> Campaign Performance Metrics
                </h2>
                <span className="text-xs text-muted-foreground font-medium">Ad Spend: ₹6,000</span>
              </div>

              {/* 5 Compact Metric Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {METRICS.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={mounted ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="group relative flex flex-col justify-between rounded-xl border border-border/70 bg-white p-3 shadow-2xs transition-all hover:border-cinematic-orange/40 hover:shadow-xs"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${m.gradient} text-white shadow-2xs`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <Check className="h-3.5 w-3.5 text-emerald-500 opacity-80" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground truncate">
                          {m.label}
                        </p>
                        <p className="text-lg font-black tracking-tight text-foreground mt-0.5 tabular-nums">
                          {m.formatted}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* 2. Top 5 Ads Performance Horizontal Bar Chart */}
            <div className="rounded-2xl border border-border/80 bg-white/80 p-4 sm:p-5 backdrop-blur-md shadow-sm flex flex-col justify-between flex-1 gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-cinematic-orange" /> Top 5 Ad Creatives Breakdown
                </h3>
                <span className="text-xs text-muted-foreground">Total Views: 129,273</span>
              </div>

              {/* Progress Bars */}
              <div className="flex flex-col gap-2.5">
                {ADS.map((ad, i) => (
                  <div key={ad.label} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <div className="flex items-center gap-2">
                        <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                          i === 0 ? 'bg-amber-500 text-white' : i === 1 ? 'bg-slate-300 text-slate-800' : i === 2 ? 'bg-amber-700 text-white' : 'bg-muted text-muted-foreground'
                        }`}>
                          #{ad.rank}
                        </span>
                        <span className="text-foreground font-medium">{ad.label}</span>
                      </div>
                      <span className="text-muted-foreground tabular-nums font-bold">
                        {ad.views.toLocaleString('en-IN')} <span className="text-[10px] font-normal">views</span>
                      </span>
                    </div>

                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted/60">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={mounted ? { width: `${ad.pct}%` } : {}}
                        transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          i === 0
                            ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                            : i === 1
                            ? 'bg-gradient-to-r from-slate-400 to-slate-500'
                            : i === 2
                            ? 'bg-gradient-to-r from-amber-600 to-amber-800'
                            : 'bg-gradient-to-r from-cinematic-orange/60 to-cinematic-orange/80'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: ROI & ADMISSIONS SUMMARY (5 COLS) ── */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            {/* 1. Return On Investment Card */}
            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30 p-4 sm:p-5 backdrop-blur-md shadow-sm flex flex-col justify-between gap-4">
              
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-600" /> Investment ROI
                </span>
                <span className="text-xs font-semibold text-emerald-700">₹6,000 Spend</span>
              </div>

              {/* Big ROI Numbers */}
              <div className="text-center py-1">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  Campaign ROI Generated
                </p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-600 tracking-tight mt-1">
                  20:1 → 125:1
                </p>
                <p className="text-xs text-emerald-700/80 font-medium mt-1">
                  Revenue Generated: ₹1,20,000 – ₹7,50,000
                </p>
              </div>

              {/* Multiplier Pills */}
              <div className="flex items-center justify-center gap-2">
                {MULTIPLIERS.map((m, i) => (
                  <span
                    key={m}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                      i === MULTIPLIERS.length - 1
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-white border border-emerald-200 text-emerald-900'
                    }`}
                  >
                    {m}
                  </span>
                ))}
              </div>

              {/* Estimated Admissions Box */}
              <div className="rounded-xl border border-border bg-white p-3 text-center flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground">Estimated Admissions</span>
                <span className="text-xl font-extrabold text-foreground">12 – 30 Students</span>
              </div>
            </div>

            {/* 2. Compact 30-Day Campaign Calendar Matrix */}
            <div className="rounded-2xl border border-border/80 bg-white/80 p-4 backdrop-blur-md shadow-sm flex flex-col justify-between gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-cinematic-orange" /> 30-Day Campaign Run
                </span>
                <span className="text-[11px] text-cinematic-orange font-semibold">Active Daily Ads</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-1">
                {calDays.map((d, i) => (
                  <div
                    key={`${d}-${i}`}
                    className={`flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-md text-[10px] font-bold transition-all ${
                      i % 7 === 0 || i === calDays.length - 1
                        ? 'bg-cinematic-orange text-white shadow-2xs'
                        : 'bg-muted/80 text-foreground/80'
                    }`}
                    title={`Day ${i + 1}: ${d}`}
                  >
                    {d}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* ════════════════════════════════════════════════════
           BOTTOM CONTACT & ACTION BAR
           ════════════════════════════════════════════════════ */}
        <footer className="rounded-2xl border border-border/80 bg-white/90 p-4 sm:p-5 backdrop-blur-md shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          
          {/* Location & Phone Info */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-foreground/80 font-medium">
            <a
              href="tel:9116975022"
              className="flex items-center gap-1.5 hover:text-cinematic-orange transition-colors font-bold"
            >
              <Phone className="h-4 w-4 text-cinematic-orange" />
              <span>9116975022</span>
            </a>
            <a
              href="tel:9461332739"
              className="flex items-center gap-1.5 hover:text-cinematic-orange transition-colors font-bold"
            >
              <Phone className="h-4 w-4 text-cinematic-orange" />
              <span>9461332739</span>
            </a>
            <span className="flex items-center gap-1 text-muted-foreground text-xs hidden md:flex">
              <MapPin className="h-3.5 w-3.5 text-cinematic-orange" />
              Badla Chauraha, Bhilwara
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#ff6b1a] px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-2xs hover:opacity-95 transition-all"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Book Free Demo
            </Link>

            <a
              href="tel:9116975022"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-foreground hover:bg-muted transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-emerald-600" />
              Call Now
            </a>
          </div>

        </footer>

        {/* Agency Attribution */}
        <div className="text-center py-1">
          <p className="text-[11px] text-muted-foreground">
            Campaign managed by{' '}
            <Link href="/" className="text-cinematic-orange font-semibold hover:underline inline-flex items-center gap-0.5">
              Rollix Media <ArrowUpRight className="h-3 w-3" />
            </Link>{' '}
            — Digital Marketing Agency, Bhilwara
          </p>
        </div>

      </div>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/919024675831"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <svg className="h-6 w-6 sm:h-7 sm:w-7 fill-white" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </main>
  );
}
