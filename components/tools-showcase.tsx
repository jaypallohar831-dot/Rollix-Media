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
        const Icon = (toolIconMap[tool.icon] || Wrench) as React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
        
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
            <div
              className="relative flex flex-col items-center justify-center p-6 rounded-2xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:border-stone-300 hover:shadow-md"
              style={{
                animation: `toolFloat 4s ease-in-out ${idx * 0.2}s infinite`,
              }}
            >
              {/* Colored Glow behind icon */}
              <div
                className="absolute inset-0 opacity-10 transition-opacity duration-500 group-hover:opacity-25 blur-xl rounded-full"
                style={{ backgroundColor: tool.color, transform: 'translateZ(-10px)' }}
              />

              <div 
                className="relative z-10 flex h-16 w-16 items-center justify-center rounded-xl bg-stone-50 border border-stone-200 mb-4 [transform:translateZ(20px)] shadow-xs"
                style={{ boxShadow: `0 0 20px ${tool.color}22` }}
              >
                <Icon
                  className="h-8 w-8 transition-transform duration-500 group-hover:scale-110"
                  style={{ color: tool.color }}
                />
              </div>

              <h4 
                className="text-stone-900 font-semibold text-center [transform:translateZ(10px)]"
              >
                {tool.name}
              </h4>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
