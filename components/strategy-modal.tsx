'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  Target,
  Wrench,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  Calendar,
  User,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import type { PortfolioItem } from '@/lib/portfolio';

interface StrategyModalProps {
  project: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StrategyModal({ project, isOpen, onClose }: StrategyModalProps) {
  if (!isOpen || !project) return null;

  const strategy = project.strategy;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl rounded-3xl border border-border bg-white shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Header Bar */}
          <div className="relative bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 p-6 sm:p-8 text-white">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cinematic-orange mb-2">
              <Sparkles className="h-4 w-4" />
              <span>Behind the Strategy</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {project.title}
            </h2>

            <p className="mt-2 text-sm text-stone-300 max-w-xl">
              {project.tagline}
            </p>

            {/* Quick Meta Row */}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-stone-300 font-medium">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cinematic-orange/20 px-3 py-1 text-cinematic-orange border border-cinematic-orange/30 font-bold">
                {project.category}
              </span>
              {project.client && (
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-cinematic-orange" /> {project.client}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-cinematic-orange" /> {project.year}
              </span>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-thin">
            
            {/* 1. Project Objective */}
            {strategy?.objective && (
              <div className="rounded-2xl border border-border/80 bg-muted/30 p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-cinematic-orange" /> Project Objective & Challenge
                </h3>
                <p className="text-sm sm:text-base text-foreground leading-relaxed font-medium">
                  {strategy.objective}
                </p>
              </div>
            )}

            {/* 2. Step-by-Step Strategy & Execution */}
            {strategy?.approach && strategy.approach.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-3">
                  <Zap className="h-4 w-4 text-cinematic-orange" /> Strategy & Execution Workflow
                </h3>
                <div className="space-y-3">
                  {strategy.approach.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 shadow-2xs"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cinematic-orange/10 text-xs font-bold text-cinematic-orange">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Tools & Tech Stack */}
            {strategy?.tools && strategy.tools.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-3">
                  <Wrench className="h-4 w-4 text-cinematic-orange" /> Tools & Tech Stack Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {strategy.tools.map((tool) => (
                    <span
                      key={tool}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-stone-50 px-3 py-1.5 text-xs font-bold text-foreground shadow-2xs"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Results & Impact Achieved */}
            {strategy?.results && strategy.results.length > 0 && (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/50 p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-emerald-600" /> Key Impact & Results Delivered
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {strategy.results.map((res, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 rounded-xl bg-white border border-emerald-200/80 p-3 shadow-2xs text-xs sm:text-sm font-bold text-emerald-950"
                    >
                      <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer Bar */}
          <div className="border-t border-border bg-stone-50 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-3">
            {strategy?.liveUrl ? (
              <Link
                href={strategy.liveUrl}
                target={strategy.liveUrl.startsWith('http') ? '_blank' : '_self'}
                className="inline-flex items-center gap-2 text-xs font-bold text-cinematic-orange hover:underline"
              >
                <span>View Full Project / Case Study</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <span className="text-xs text-muted-foreground">Crafted by Rollix Media</span>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="rounded-xl border border-border bg-white px-4 py-2 text-xs font-bold text-foreground hover:bg-muted transition-colors"
              >
                Close
              </button>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-xl bg-cinematic-orange px-4 py-2 text-xs font-bold text-white shadow-2xs hover:bg-stone-900 transition-colors"
              >
                Get Similar Results
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
