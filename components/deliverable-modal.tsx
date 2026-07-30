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
          className="relative w-full overflow-hidden rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] bg-white max-w-6xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button - Outside the media area for clarity */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-colors bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Main Layout Container */}
          <div className="flex flex-col md:flex-row h-[85vh] max-h-[850px] min-h-[500px] w-full overflow-hidden">
            {/* Left: Media Section (Video / Image) */}
            <div className="relative flex-1 bg-black md:w-3/5 lg:w-2/3 h-[40vh] md:h-full shrink-0 flex items-center justify-center overflow-hidden">
              {deliverable.type === 'video' ? (
                <VideoPlayer
                  src={deliverable.url}
                  aspect="aspect-auto"
                  objectFit="contain"
                  className="absolute inset-0 h-full w-full"
                />
              ) : deliverable.type === 'image' ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={deliverable.url}
                  alt={deliverable.title}
                  className="h-full w-full object-contain p-4"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-white/50">
                  <ImageIcon className="mb-4 h-16 w-16 opacity-40" />
                  <p className="text-sm font-medium uppercase tracking-widest">Document View</p>
                </div>
              )}
            </div>

            {/* Right: Details & Strategy Section */}
            <div className="flex-1 md:w-2/5 lg:w-1/3 h-full overflow-y-auto bg-stone-50 p-6 sm:p-8 lg:p-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cinematic-orange/30 bg-cinematic-orange/10 px-3 py-1">
                <Sparkles className="h-3.5 w-3.5 text-cinematic-orange" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-cinematic-orange">
                  {deliverable.type} Deliverable
                </span>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="font-heading text-2xl sm:text-3xl font-normal text-stone-900 mb-3">
                    {deliverable.title}
                  </h3>
                  {!deliverable.thinking && !deliverable.result && (
                    <p className="text-sm leading-relaxed text-stone-600 font-light">
                      A crafted digital asset designed to elevate the brand&apos;s visual identity and engage the target audience.
                    </p>
                  )}
                </section>

                {deliverable.thinking && (
                  <section>
                    <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
                      Behind the Edit
                    </h4>
                    <div className="text-sm sm:text-base leading-relaxed text-stone-700 font-light space-y-3">
                      {deliverable.thinking.split('\n').map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>
                  </section>
                )}

                {(deliverable.result || deliverable.resultImage) && (
                  <section>
                    <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
                      Impact & Results
                    </h4>

                    {deliverable.result && (
                      <div className="mb-4 flex items-start gap-3 rounded-xl border border-cinematic-orange/20 bg-white p-4 shadow-sm">
                        <TrendingUp className="h-5 w-5 text-cinematic-orange shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-stone-900 leading-relaxed">
                          {deliverable.result}
                        </span>
                      </div>
                    )}

                    {deliverable.resultImage && (
                      <div className="rounded-xl overflow-hidden border border-stone-200 shadow-sm bg-white p-3 flex justify-center bg-stone-100/50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={deliverable.resultImage}
                          alt="Result Impact"
                          className="max-h-48 w-auto object-contain rounded-lg"
                        />
                      </div>
                    )}
                  </section>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
