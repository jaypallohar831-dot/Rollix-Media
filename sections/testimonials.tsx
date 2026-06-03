'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/layout';
import { Quote, Star, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { staggerContainer, fadeUp, fadeIn } from '@/animations/variants';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  avatar_url?: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section className="relative overflow-hidden bg-[#030303] py-28 sm:py-36">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(212,118,60,0.08) 0%, transparent 60%)' }}
        />
      </div>

      <Container>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div variants={fadeIn} className="mb-4">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-cinematic-orange">
              <span className="h-[1px] w-8 bg-cinematic-orange/40" />
              Client Voices
            </span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl sm:text-5xl font-light text-white">
            Words from the <span className="text-gradient-warm italic">Heart</span>
          </motion.h2>
        </motion.div>

          <div className="relative mx-auto max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-3xl border border-white/[0.08] bg-[#0c0c0c]/95 p-8 sm:p-16 text-center"
              >
                <Quote className="absolute top-8 left-8 h-12 w-12 text-cinematic-orange/10" />
                
                <div className="flex justify-center mb-8">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < current.rating ? 'fill-cinematic-orange text-cinematic-orange' : 'text-white/10'}`} />
                    ))}
                  </div>
                </div>

                <p className="text-xl sm:text-2xl font-light leading-relaxed text-white/90 italic mb-10">
                  &ldquo;{current.content}&rdquo;
                </p>

                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-cinematic-orange/20 mb-4 bg-black/40">
                    {current.avatar_url ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={current.avatar_url} alt={current.name} className="h-full w-full object-cover" />
                      </>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-white/20">
                        <User className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <h4 className="text-lg font-medium text-white">{current.name}</h4>
                  <p className="text-sm text-muted-foreground font-light">
                    {current.role} {current.company ? `· ${current.company}` : ''}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="absolute top-1/2 -left-4 sm:-left-20 -translate-y-1/2 hidden sm:block">
              <button 
                onClick={prev}
                className="p-4 rounded-full border border-white/[0.08] bg-white/[0.02] text-white/40 hover:text-white hover:border-cinematic-orange/40 transition-[color,border-color] duration-300"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>
            <div className="absolute top-1/2 -right-4 sm:-right-20 -translate-y-1/2 hidden sm:block">
              <button 
                onClick={next}
                className="p-4 rounded-full border border-white/[0.08] bg-white/[0.02] text-white/40 hover:text-white hover:border-cinematic-orange/40 transition-[color,border-color] duration-300"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex justify-center gap-4 mt-8 sm:hidden">
               <button onClick={prev} className="p-3 rounded-full border border-white/[0.08] text-white/40"><ChevronLeft className="h-5 w-5" /></button>
               <button onClick={next} className="p-3 rounded-full border border-white/[0.08] text-white/40"><ChevronRight className="h-5 w-5" /></button>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1 rounded-full transition-[width,background-color] duration-500 ${i === currentIndex ? 'w-8 bg-cinematic-orange' : 'w-2 bg-white/10 hover:bg-white/20'}`}
                />
              ))}
            </div>
          </div>
      </Container>
    </section>
  );
}
