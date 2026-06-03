'use client';

import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';
import { toolIconMap } from '@/lib/tool-icons';


interface ToolItem {
  name: string;
  color: string;
  icon: string;
}

interface ToolsShowcaseProps {
  tools?: ToolItem[];
}

export function ToolsShowcase({ tools }: ToolsShowcaseProps) {
  if (!tools || tools.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-12">
      {tools.map((tool, idx) => {
        const Icon = toolIconMap[tool.icon] || Wrench;
        
        return (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative"
          >
            {/* 3D Floating Container */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotateX: [0, 5, 0],
                rotateY: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: idx * 0.2, // Stagger float animation
              }}
              className="relative flex flex-col items-center justify-center p-6 rounded-2xl border border-white/[0.08] bg-black/40 [transform-style:preserve-3d] shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-colors duration-500 hover:border-white/[0.2]"
            >
              {/* Colored Glow behind icon */}
              <div
                className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40 blur-xl rounded-full"
                style={{ backgroundColor: tool.color, transform: 'translateZ(-10px)' }}
              />

              <div 
                className="relative z-10 flex h-16 w-16 items-center justify-center rounded-xl bg-white/5 border border-white/10 mb-4 [transform:translateZ(20px)]"
                style={{ boxShadow: `0 0 20px ${tool.color}33` }}
              >
                <Icon
                  className="h-8 w-8 transition-transform duration-500 group-hover:scale-110"
                  style={{ color: tool.color }}
                />
              </div>

              <h4 
                className="text-white font-medium text-center [transform:translateZ(10px)]"
              >
                {tool.name}
              </h4>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
