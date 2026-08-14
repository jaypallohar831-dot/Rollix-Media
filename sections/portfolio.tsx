'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/layout';
import { fadeUp, staggerContainer, fadeIn } from '@/animations/variants';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { PortfolioItem } from '@/lib/portfolio';
import { useRef } from 'react';

interface PortfolioSectionProps {
  projects: PortfolioItem[];
}

export function PortfolioSection({ projects }: PortfolioSectionProps) {
  // Take first 6 projects for the homepage reel
  const displayProjects = projects.slice(0, 6);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="relative bg-background overflow-hidden py-12 sm:py-16 lg:py-20">
      <div className="absolute inset-0 pointer-events-none bg-background" aria-hidden="true" />

      <Container size="wide" className="relative z-10 border-t border-border/40 pt-6 sm:pt-8 lg:pt-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-start">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-4 lg:col-start-1 lg:sticky lg:top-32 flex flex-col">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-10%' }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="mb-6 sm:mb-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cinematic-orange">
                  Our Work
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="font-heading text-[clamp(2.5rem,4vw,3.5rem)] font-light leading-tight py-1 tracking-[-0.02em] text-foreground mb-6"
              >
                A Symphony of <br className="hidden lg:block" />
                Vision & Growth
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-muted-foreground text-sm leading-[1.7] sm:text-[15px] mb-10 max-w-[400px]"
              >
                We don&rsquo;t just offer services. We craft dedicated 
                cinematic experiences and engineered growth 
                campaigns. Explore our disciplines.
              </motion.p>

              <motion.div variants={fadeIn}>
                <Link
                  href="/portfolio"
                  className="group inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-cinematic-orange hover:text-foreground transition-colors duration-300"
                >
                  View All Work
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Horizontal Scroll Reel */}
          <div className="lg:col-span-8 lg:col-start-5 relative">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div 
                ref={scrollRef}
                className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-thin pb-6 sm:pb-8 w-full"
                style={{ scrollBehavior: 'smooth' }}
              >
                {displayProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              {/* Scroll Right Button Overlay */}
              <button 
                onClick={scrollRight}
                className="hidden lg:flex absolute top-[35%] -right-5 translate-x-1/2 h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border border-border text-foreground hover:text-cinematic-orange transition-colors z-10"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
}

function ProjectCard({ project }: { project: PortfolioItem }) {
  const isVideo = project.mediaType === 'video' && !!project.videoUrl;
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <Link 
      href={`/portfolio/${project.id}`} 
      className="group flex-shrink-0 w-[240px] sm:w-[280px] snap-start flex flex-col gap-3 sm:gap-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
        <Image
          src={project.image || '/assets/portfolio/motion.png'}
          alt={project.title}
          fill
          unoptimized={(project.image || '').startsWith('http')}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {isVideo && project.videoUrl && (
          <video
            ref={videoRef}
            src={project.videoUrl}
            preload="none"
            muted
            loop
            playsInline
            className="absolute inset-0 z-10 h-full w-full object-cover transition-all duration-700 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 z-20 bg-black/5 transition-colors duration-500 group-hover:bg-transparent pointer-events-none" />
      </div>
      <div>
        <h4 className="font-heading text-lg font-medium text-foreground mb-1 group-hover:text-cinematic-orange transition-colors">
          {project.title}
        </h4>
        <p className="text-xs font-medium text-cinematic-orange uppercase tracking-wider mb-1">
          {project.tags && project.tags.length > 0 ? project.tags.join(' • ') : (project.category || 'Digital Marketing')}
        </p>
        {project.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        )}
      </div>
    </Link>
  );
}
