'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, TrendingUp, ImageIcon } from 'lucide-react';
import type { Deliverable } from '@/lib/portfolio';
import { VideoPlayer } from '@/components/video-player';

interface DeliverableModalProps {
  deliverable: Deliverable | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DeliverableModal({ deliverable, isOpen, onClose }: DeliverableModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !deliverable || !mounted) return null;

  const hasStrategy = !!(deliverable.thinking || deliverable.result || deliverable.resultImage);

  const modalContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`relative w-full overflow-hidden rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] ${
            hasStrategy ? 'bg-white max-w-6xl' : 'bg-transparent max-w-5xl'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button - Outside the media area for clarity */}
          <button
            onClick={onClose}
            className={`absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-colors ${
              hasStrategy
                ? 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
            }`}
          >
            <X className="h-5 w-5" />
          </button>

          {hasStrategy ? (
            /* ── STRATEGY LAYOUT (SPLIT 50/50) ── */
            <div className="flex flex-col lg:grid lg:grid-cols-[1.2fr,1fr] max-h-[90vh]">
              {/* Media Section */}
              <div className="relative bg-black w-full min-h-[40vh] lg:h-[85vh] lg:min-h-0">
                {deliverable.type === 'video' ? (
                  <VideoPlayer
                    src={deliverable.url}
                    aspect="aspect-auto"
                    objectFit="cover"
                    className="absolute inset-0 w-full h-full"
                  />
                ) : deliverable.type === 'image' ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={deliverable.url} alt={deliverable.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 bg-stone-900">
                    <ImageIcon className="h-16 w-16 mb-4 opacity-40" />
                    <p className="text-sm font-medium uppercase tracking-widest">Document View</p>
                  </div>
                )}
                {/* Subtle gradient overlay to ensure text readability if we add any */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 mb-2 rounded-full bg-white/20 backdrop-blur-md text-[9px] font-bold uppercase tracking-widest text-white border border-white/20">
                    {deliverable.type}
                  </span>
                  <h3 className="text-2xl font-heading text-white drop-shadow-md">{deliverable.title}</h3>
                </div>
              </div>

              {/* Strategy Section */}
              <div className="p-8 sm:p-10 lg:p-12 overflow-y-auto bg-stone-50">
                <div className="inline-flex items-center gap-2 rounded-full border border-cinematic-orange/30 bg-cinematic-orange/10 px-3 py-1 mb-8">
                  <Sparkles className="h-4 w-4 text-cinematic-orange" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cinematic-orange">
                    Deliverable Insights
                  </span>
                </div>

                <div className="space-y-10">
                  {deliverable.thinking && (
                    <section>
                      <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-4">
                        Behind the Edit
                      </h4>
                      <div className="prose prose-stone prose-sm sm:prose-base leading-[1.8] text-stone-700 font-light">
                        {deliverable.thinking.split('\n').map((para, idx) => (
                          <p key={idx} className="mb-4 last:mb-0">{para}</p>
                        ))}
                      </div>
                    </section>
                  )}

                  {(deliverable.result || deliverable.resultImage) && (
                    <section>
                      <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-4">
                        Impact & Results
                      </h4>
                      
                      {deliverable.result && (
                        <div className="mb-6 flex items-start gap-4 rounded-2xl border border-cinematic-orange/20 bg-white p-6 shadow-sm">
                          <TrendingUp className="h-6 w-6 text-cinematic-orange shrink-0 mt-0.5" />
                          <span className="font-medium text-stone-900 leading-relaxed text-lg">{deliverable.result}</span>
                        </div>
                      )}

                      {deliverable.resultImage && (
                        <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-lg bg-white p-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={deliverable.resultImage} alt="Result Impact" className="w-full h-auto object-cover rounded-xl" />
                        </div>
                      )}
                    </section>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* ── MEDIA ONLY LAYOUT (NO STRATEGY) ── */
            <div className="relative w-full bg-black/50 overflow-hidden rounded-3xl ring-1 ring-white/10">
              <div className="relative w-full h-[60vh] sm:h-[75vh] lg:h-[85vh] flex items-center justify-center">
                {deliverable.type === 'video' ? (
                  <VideoPlayer
                    src={deliverable.url}
                    aspect="aspect-auto"
                    objectFit="contain"
                    className="absolute inset-0 w-full h-full"
                  />
                ) : deliverable.type === 'image' ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={deliverable.url} alt={deliverable.title} className="absolute inset-0 w-full h-full object-contain p-2" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-white/50">
                    <ImageIcon className="h-16 w-16 mb-4 opacity-40" />
                    <p className="text-sm font-medium">Document View Not Supported</p>
                  </div>
                )}
              </div>
              
              {/* Overlay Title */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none flex flex-col justify-end">
                <span className="text-white/60 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">{deliverable.type} Deliverable</span>
                <span className="text-white font-heading text-2xl sm:text-3xl drop-shadow-lg">{deliverable.title}</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
