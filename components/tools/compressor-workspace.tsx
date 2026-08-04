'use client';

import { useState } from 'react';
import { ImageCompressor } from './image-compressor';
import { PdfCompressor } from './pdf-compressor';
import { VideoCompressor } from './video-compressor';
import { AudioCompressor } from './audio-compressor';
import { ZipCompressor } from './zip-compressor';
import { Image as ImageIcon, FileText, Video, Music, Archive, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

type ActiveTab = 'image' | 'pdf' | 'video' | 'audio' | 'zip';

export function CompressorWorkspace() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('image');

  const tabs = [
    { id: 'image' as ActiveTab, label: 'Image', icon: ImageIcon, badge: 'JPG, PNG, WebP' },
    { id: 'pdf' as ActiveTab, label: 'PDF', icon: FileText, badge: 'PDF Docs' },
    { id: 'video' as ActiveTab, label: 'Video', icon: Video, badge: 'MP4, WebM' },
    { id: 'audio' as ActiveTab, label: 'Audio', icon: Music, badge: 'MP3, WAV' },
    { id: 'zip' as ActiveTab, label: 'Any File (ZIP)', icon: Archive, badge: 'Archive' },
  ];

  return (
    <div className="w-full space-y-3">
      {/* Sleek Header Bar: Tabs + Privacy Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 rounded-xl border border-border bg-white p-1.5 shadow-2xs">
        {/* Tab Selector Pills */}
        <div className="flex flex-wrap items-center gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer',
                  isActive
                    ? 'bg-cinematic-orange text-white shadow-2xs'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
                <span
                  className={cn(
                    'hidden sm:inline-block rounded-md px-1.5 py-0.5 text-[9px] uppercase font-extrabold tracking-wider',
                    isActive ? 'bg-white/20 text-white' : 'bg-secondary text-muted-foreground'
                  )}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Client-Side Privacy Badge */}
        <div className="hidden lg:flex items-center gap-1 text-[11px] font-semibold text-emerald-600 px-3">
          <Lock className="h-3 w-3 shrink-0" />
          <span>100% Client-Side Privacy</span>
        </div>
      </div>

      {/* Active Compressor Component */}
      <div className="w-full">
        {activeTab === 'image' && <ImageCompressor />}
        {activeTab === 'pdf' && <PdfCompressor />}
        {activeTab === 'video' && <VideoCompressor />}
        {activeTab === 'audio' && <AudioCompressor />}
        {activeTab === 'zip' && <ZipCompressor />}
      </div>
    </div>
  );
}
