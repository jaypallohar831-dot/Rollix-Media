'use client';

import { motion } from 'framer-motion';
import { wordReveal, wordRevealChild } from '@/animations/variants';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
  const words = children.split(' ');

  return (
    <motion.span
      variants={wordReveal}
      initial="initial"
      animate="animate"
      className={cn('inline-flex flex-wrap', className)}
      style={{ transitionDelay: `${delay}s` }}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.3em]">
          <motion.span
            variants={wordRevealChild}
            className="inline-block"
            custom={i}
            style={{
              transitionDelay: `${delay + i * 0.08}s`,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
