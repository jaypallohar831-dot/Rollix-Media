'use client';

import { useState } from 'react';
import { FileDropzone } from './file-dropzone';
import { CompressionResults } from './compression-results';
import { compressSingleVideo, VideoCompressionOptions, VideoOutputFormat } from '@/lib/compression/video-utils';
import { CompressedFileResult } from '@/lib/compression/image-utils';
import { trackEvent } from '@/lib/analytics';
import { Loader2, Sliders, Target, Gauge, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export function VideoCompressor() {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [mode, setMode] = useState<'target' | 'preset'>('target');
  const [targetSizeMB, setTargetSizeMB] = useState<number>(10);
  const [customTargetMB, setCustomTargetMB] = useState<string>('10');

  const [resolution, setResolution] = useState<'original' | '1080p' | '720p' | '480p' | '360p'>('original');
  const [bitrateMbps, setBitrateMbps] = useState<number>(4.5);
  const [outputFormat, setOutputFormat] = useState<VideoOutputFormat>('auto');

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [currentFileName, setCurrentFileName] = useState<string>('');
  const [results, setResults] = useState<CompressedFileResult[] | null>(null);

  const targetPresets = [
    { label: '5 MB', value: 5.0, desc: 'Web & WhatsApp' },
    { label: '10 MB', value: 10.0, desc: 'HD Crisp' },
    { label: '20 MB', value: 20.0, desc: 'Full HD Master' },
    { label: '50 MB', value: 50.0, desc: '4K & Long Video Clips' },
  ];

  const resolutionPresets = [
    { id: 'original' as const, label: 'Original Resolution (Ultra HD Sharp)', desc: '100% pixel crispness' },
    { id: '1080p' as const, label: '1080p Full HD', desc: 'Sharp HD quality' },
    { id: '720p' as const, label: '720p HD', desc: 'Compact mobile size' },
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

    const options: VideoCompressionOptions = {
      mode,
      targetSizeMB,
      targetResolution: resolution,
      bitrateMbps,
      outputFormat,
    };

    trackEvent('video_compression_started', { count: files.length, options });

    const compressedResults: CompressedFileResult[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setCurrentFileName(file.name);

      const result = await compressSingleVideo(file, options, (prog) => {
        const batchProgress = Math.round(((i + prog / 100) / files.length) * 100);
        setCurrentProgress(batchProgress);
      });

      compressedResults.push(result);
    }

    setResults(compressedResults);
    setIsProcessing(false);
    trackEvent('video_compression_completed', { count: files.length });
  };

  const handleReset = () => {
    setResults(null);
    setCurrentProgress(0);
    setCurrentFileName('');
  };

  return (
    <div className="space-y-3">
      {results ? (
        <CompressionResults results={results} onReset={handleReset} toolTitle="Video Compressor" />
      ) : (
        <div className="space-y-3">
          {/* Compact Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-border bg-white px-3.5 py-2.5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-muted-foreground hidden sm:inline-block">Setup:</span>
              <span className="rounded-md bg-cinematic-orange/10 px-2 py-0.5 text-xs font-bold text-cinematic-orange">
                {mode === 'target' ? `Target ${targetSizeMB} MB` : `${bitrateMbps} Mbps`}
              </span>

              {/* Video Format Converter Selector */}
              <div className="flex items-center gap-1.5 border-l border-border pl-2">
                <RefreshCw className="h-3 w-3 text-cinematic-orange" />
                <span className="text-[11px] font-semibold text-muted-foreground hidden md:inline-block">Convert To:</span>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value as VideoOutputFormat)}
                  className="rounded-lg border border-border bg-secondary/60 px-2 py-1 text-xs font-bold text-foreground focus:border-cinematic-orange focus:outline-hidden cursor-pointer"
                >
                  <option value="auto">Auto Format (Best)</option>
                  <option value="mp4">Convert to MP4 (Universal)</option>
                  <option value="webm">Convert to WebM (VP9 HD)</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-secondary/60 px-2.5 py-1 text-xs font-semibold text-foreground transition-all hover:bg-secondary cursor-pointer ml-auto sm:ml-0"
            >
              <Sliders className="h-3 w-3 text-cinematic-orange" />
              <span>{showSettings ? 'Hide Options' : 'Adjust Options'}</span>
              {showSettings ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
          </div>

          {/* Collapsible Panel */}
          {showSettings && (
            <div className="rounded-2xl border border-border bg-white p-4 shadow-sm space-y-4 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Video Strategy:
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
                    onClick={() => setMode('preset')}
                    className={cn(
                      'flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-all cursor-pointer',
                      mode === 'preset'
                        ? 'bg-cinematic-orange text-white shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Gauge className="h-3.5 w-3.5" />
                    <span>Bitrate &amp; Resolution</span>
                  </button>
                </div>
              </div>

              {mode === 'target' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                        step="1"
                        min="1"
                        max="200"
                        value={customTargetMB}
                        onChange={(e) => handleCustomTargetChange(e.target.value)}
                        placeholder="e.g. 10"
                        className="w-full rounded-lg border border-input bg-white px-2.5 py-1 pr-8 text-xs font-medium text-foreground focus:border-cinematic-orange focus:outline-hidden"
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground">
                        MB
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {mode === 'preset' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {resolutionPresets.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setResolution(p.id)}
                        disabled={isProcessing}
                        className={cn(
                          'flex flex-col items-start p-3 rounded-xl border text-left transition-all cursor-pointer',
                          resolution === p.id
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
                      <span className="text-muted-foreground">Target Bitrate:</span>
                      <span className="font-bold text-foreground">{bitrateMbps} Mbps</span>
                    </div>
                    <input
                      type="range"
                      min={1.5}
                      max={12.0}
                      step={0.5}
                      value={bitrateMbps}
                      onChange={(e) => setBitrateMbps(Number(e.target.value))}
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
              <h3 className="text-base font-bold text-foreground">Encoding &amp; Converting Video...</h3>
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
              accept="video/mp4,video/webm,video/quicktime,video/x-msvideo"
              acceptLabel="MP4, WebM, MOV, AVI videos"
              maxSizeMB={300}
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
