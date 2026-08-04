'use client';

import { useState } from 'react';
import { FileDropzone } from './file-dropzone';
import { CompressionResults } from './compression-results';
import {
  compressSingleImage,
  CompressedFileResult,
  CompressionSettings,
  OutputFormat,
} from '@/lib/compression/image-utils';
import { trackEvent } from '@/lib/analytics';
import { Sliders, Loader2, Target, Gauge, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ImageCompressor() {
  // Settings state
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [mode, setMode] = useState<'target' | 'quality'>('target');
  const [targetSizeMB, setTargetSizeMB] = useState<number>(2); // Default target size: 2 MB
  const [customTargetMB, setCustomTargetMB] = useState<string>('2');
  const [qualityPercent, setQualityPercent] = useState<number>(75);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('auto');

  // Processing state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [currentFileName, setCurrentFileName] = useState<string>('');
  const [results, setResults] = useState<CompressedFileResult[] | null>(null);

  const targetPresets = [
    { label: '500 KB', value: 0.5, desc: 'Ultra-fast web loading' },
    { label: '1 MB', value: 1.0, desc: 'Recommended for websites' },
    { label: '2 MB', value: 2.0, desc: 'Optimal for social media & ads' },
    { label: '5 MB', value: 5.0, desc: 'HD marketing materials' },
    { label: '10 MB', value: 10.0, desc: 'High-res master graphics' },
  ];

  const qualityPresets = [
    { label: 'High Quality', value: 85, desc: 'Minimal quality loss (~40-60% smaller)' },
    { label: 'Recommended', value: 75, desc: 'Balanced (~60-80% smaller)' },
    { label: 'Max Savings', value: 50, desc: 'Maximum compression (~80-90% smaller)' },
  ];

  const handleCustomTargetChange = (val: string) => {
    setCustomTargetMB(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      setTargetSizeMB(num);
    }
  };

  const handleFilesSelected = async (files: File[]) => {
    setIsProcessing(true);
    setCurrentProgress(0);
    setResults(null);

    const settings: CompressionSettings = {
      mode,
      targetSizeMB,
      qualityPercent,
      outputFormat,
    };

    trackEvent('image_compression_started', { count: files.length, settings });

    const compressedResults: CompressedFileResult[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setCurrentFileName(file.name);

      const result = await compressSingleImage(file, settings, (prog) => {
        const batchProgress = Math.round(((i + prog / 100) / files.length) * 100);
        setCurrentProgress(batchProgress);
      });

      compressedResults.push(result);
    }

    setResults(compressedResults);
    setIsProcessing(false);
    trackEvent('image_compression_completed', { count: files.length });
  };

  const handleReset = () => {
    setResults(null);
    setCurrentProgress(0);
    setCurrentFileName('');
  };

  return (
    <div className="space-y-3">
      {results ? (
        <CompressionResults results={results} onReset={handleReset} toolTitle="Image Compressor" />
      ) : (
        <div className="space-y-3">
          {/* Compact Settings Toggle Header */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-border bg-white px-3.5 py-2.5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-muted-foreground hidden sm:inline-block">Setup:</span>
              
              {/* Target Size Badge */}
              <span className="rounded-md bg-cinematic-orange/10 px-2 py-0.5 text-xs font-bold text-cinematic-orange">
                {mode === 'target' ? `Target ${targetSizeMB} MB` : `Quality ${qualityPercent}%`}
              </span>

              {/* Format Converter Selector */}
              <div className="flex items-center gap-1.5 border-l border-border pl-2">
                <RefreshCw className="h-3 w-3 text-cinematic-orange" />
                <span className="text-[11px] font-semibold text-muted-foreground hidden md:inline-block">Convert To:</span>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value as OutputFormat)}
                  className="rounded-lg border border-border bg-secondary/60 px-2 py-1 text-xs font-bold text-foreground focus:border-cinematic-orange focus:outline-hidden cursor-pointer"
                >
                  <option value="auto">Auto WebP (Best Compression)</option>
                  <option value="jpeg">Convert to JPG / JPEG</option>
                  <option value="png">Convert to PNG</option>
                  <option value="webp">Convert to WebP</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-secondary/60 px-2.5 py-1 text-xs font-semibold text-foreground transition-all hover:bg-secondary cursor-pointer ml-auto sm:ml-0"
            >
              <Sliders className="h-3 w-3 text-cinematic-orange" />
              <span>{showSettings ? 'Hide Options' : 'Adjust Target Size'}</span>
              {showSettings ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
          </div>

          {/* Collapsible Advanced Settings Panel */}
          {showSettings && (
            <div className="rounded-2xl border border-border bg-white p-4 shadow-sm space-y-4 transition-all">
              {/* Mode Toggle Pills */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Compression Strategy:
                </span>
                <div className="flex items-center gap-1 rounded-xl bg-secondary p-1">
                  <button
                    type="button"
                    onClick={() => setMode('target')}
                    className={cn(
                      'flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-all cursor-pointer',
                      mode === 'target'
                        ? 'bg-cinematic-orange text-white shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Target className="h-3.5 w-3.5" />
                    <span>Target Max File Size</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('quality')}
                    className={cn(
                      'flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-all cursor-pointer',
                      mode === 'quality'
                        ? 'bg-cinematic-orange text-white shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Gauge className="h-3.5 w-3.5" />
                    <span>Quality Percentage</span>
                  </button>
                </div>
              </div>

              {/* Mode 1: Target File Size Selection */}
              {mode === 'target' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {targetPresets.map((p) => (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => {
                          setTargetSizeMB(p.value);
                          setCustomTargetMB(p.value.toString());
                        }}
                        disabled={isProcessing}
                        className={cn(
                          'flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer',
                          targetSizeMB === p.value
                            ? 'border-cinematic-orange bg-cinematic-orange/10 text-cinematic-orange font-bold ring-2 ring-cinematic-orange/20'
                            : 'border-border hover:border-cinematic-orange/40 bg-white text-foreground'
                        )}
                      >
                        <span className="text-xs font-extrabold">{p.label}</span>
                        <span className="text-[9px] text-muted-foreground">{p.desc}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs text-muted-foreground shrink-0">Custom Target:</span>
                    <div className="relative flex-1 max-w-[140px]">
                      <input
                        type="number"
                        step="0.1"
                        min="0.1"
                        max="50"
                        value={customTargetMB}
                        onChange={(e) => handleCustomTargetChange(e.target.value)}
                        placeholder="e.g. 1.5"
                        className="w-full rounded-lg border border-input bg-white px-2.5 py-1 pr-8 text-xs font-medium text-foreground focus:border-cinematic-orange focus:outline-hidden"
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground">
                        MB
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Mode 2: Quality Percentage Selection */}
              {mode === 'quality' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {qualityPresets.map((p) => (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => setQualityPercent(p.value)}
                        disabled={isProcessing}
                        className={cn(
                          'flex flex-col items-start p-3 rounded-xl border text-left transition-all cursor-pointer',
                          qualityPercent === p.value
                            ? 'border-cinematic-orange bg-cinematic-orange/5 ring-2 ring-cinematic-orange/20'
                            : 'border-border hover:border-cinematic-orange/40 bg-white'
                        )}
                      >
                        <span className="text-xs font-semibold text-foreground">{p.label}</span>
                        <span className="text-[10px] text-muted-foreground">{p.desc}</span>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-muted-foreground">Quality:</span>
                      <span className="font-bold text-foreground">{qualityPercent}%</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      step={5}
                      value={qualityPercent}
                      onChange={(e) => setQualityPercent(Number(e.target.value))}
                      disabled={isProcessing}
                      className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-cinematic-orange"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Upload Dropzone or Processing Indicator */}
          {isProcessing ? (
            <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cinematic-orange/10 text-cinematic-orange animate-spin">
                <Loader2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-foreground">Compressing &amp; Converting Image(s)...</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Processing <span className="font-semibold text-foreground">{currentFileName}</span>
              </p>

              <div className="w-full max-w-xs mx-auto h-2 bg-secondary rounded-full overflow-hidden mt-3">
                <div
                  className="h-full bg-cinematic-orange transition-all duration-300 rounded-full"
                  style={{ width: `${currentProgress}%` }}
                />
              </div>
              <span className="text-xs font-bold text-cinematic-orange">{currentProgress}%</span>
            </div>
          ) : (
            <FileDropzone
              accept="image/jpeg,image/png,image/webp,image/jpg"
              acceptLabel="JPG, PNG, WebP images"
              maxSizeMB={50}
              multiple={true}
              onFilesSelected={handleFilesSelected}
              isProcessing={isProcessing}
              toolType="image"
            />
          )}
        </div>
      )}
    </div>
  );
}
