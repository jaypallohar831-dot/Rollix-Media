'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
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
    <section aria-label="Client Testimonials" className="relative overflow-hidden bg-background py-12 sm:py-16 lg:py-20">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none bg-background overflow-hidden" />

      <Container>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <motion.div variants={fadeIn} className="mb-4">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-cinematic-orange">
              <span className="h-[1px] w-8 bg-cinematic-orange" />
              Client Voices
            </span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl sm:text-5xl font-light text-foreground">
            Words from the <span className="text-cinematic-orange italic">Heart</span>
          </motion.h2>
        </motion.div>

          <div className="relative mx-auto max-w-4xl" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-3xl border border-border bg-white shadow-sm p-8 sm:p-16 text-center"
              >
                <Quote className="absolute top-8 left-8 h-12 w-12 text-cinematic-orange/10" aria-hidden="true" />
                
                <div className="flex justify-center mb-8">
                  <div className="flex items-center gap-1" aria-label={`Rating: ${current.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < current.rating ? 'fill-cinematic-orange text-cinematic-orange' : 'text-muted-foreground/30'}`} aria-hidden="true" />
                    ))}
                  </div>
                </div>

                <blockquote className="text-xl sm:text-2xl font-light leading-relaxed text-foreground italic mb-10">
                  &ldquo;{current.content}&rdquo;
                </blockquote>

                <div className="flex flex-col items-center">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden border border-border mb-4 bg-muted">
                    {current.avatar_url ? (
                      <Image
                        src={current.avatar_url}
                        alt={`Photo of ${current.name}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-muted-foreground/50">
                        <User className="h-8 w-8" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                  <h4 className="text-lg font-medium text-foreground">{current.name}</h4>
                  <p className="text-sm text-muted-foreground font-light">
                    {current.role} {current.company ? `· ${current.company}` : ''}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="absolute top-1/2 -left-4 sm:-left-12 lg:-left-20 -translate-y-1/2 hidden sm:block">
              <button 
                onClick={prev}
                aria-label="Previous testimonial"
                className="p-4 rounded-full border border-border bg-white text-muted-foreground hover:text-foreground hover:border-cinematic-orange/40 shadow-sm transition-[color,border-color] duration-300"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="absolute top-1/2 -right-4 sm:-right-12 lg:-right-20 -translate-y-1/2 hidden sm:block">
              <button 
                onClick={next}
                aria-label="Next testimonial"
                className="p-4 rounded-full border border-border bg-white text-muted-foreground hover:text-foreground hover:border-cinematic-orange/40 shadow-sm transition-[color,border-color] duration-300"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex justify-center gap-4 mt-8 sm:hidden">
               <button onClick={prev} aria-label="Previous testimonial" className="p-3 rounded-full border border-border bg-white shadow-sm text-muted-foreground"><ChevronLeft className="h-5 w-5" aria-hidden="true" /></button>
               <button onClick={next} aria-label="Next testimonial" className="p-3 rounded-full border border-border bg-white shadow-sm text-muted-foreground"><ChevronRight className="h-5 w-5" aria-hidden="true" /></button>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1 rounded-full transition-[width,background-color] duration-500 ${i === currentIndex ? 'w-8 bg-cinematic-orange' : 'w-2 bg-border hover:bg-muted-foreground/50'}`}
                />
              ))}
            </div>
          </div>
      </Container>
    </section>
  );
}
