'use client';

import { useState } from 'react';
import { FileDropzone } from './file-dropzone';
import { CompressionResults } from './compression-results';
import { compressSingleAudio, AudioCompressionOptions } from '@/lib/compression/audio-utils';
import { CompressedFileResult } from '@/lib/compression/image-utils';
import { trackEvent } from '@/lib/analytics';
import { Loader2, Sliders, Target, Gauge, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AudioCompressor() {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [mode, setMode] = useState<'target' | 'preset'>('target');
  const [targetSizeMB, setTargetSizeMB] = useState<number>(1);
  const [customTargetMB, setCustomTargetMB] = useState<string>('1');

  const [sampleRate, setSampleRate] = useState<number>(32000);
  const [channels, setChannels] = useState<1 | 2>(2);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [currentFileName, setCurrentFileName] = useState<string>('');
  const [results, setResults] = useState<CompressedFileResult[] | null>(null);

  const targetPresets = [
    { label: '500 KB', value: 0.5, desc: 'Voice clips' },
    { label: '1 MB', value: 1.0, desc: 'Web Audio' },
    { label: '2 MB', value: 2.0, desc: 'Music Clips' },
    { label: '5 MB', value: 5.0, desc: 'Podcasts & Master' },
  ];

  const sampleRatePresets = [
    { value: 32000, label: '32 kHz (Recommended)', desc: 'Balanced quality & size' },
    { value: 44100, label: '44.1 kHz (CD Quality)', desc: 'High fidelity' },
    { value: 22050, label: '22.05 kHz (Voice)', desc: 'Max compression' },
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

    let effectiveSampleRate = sampleRate;
    if (mode === 'target') {
      if (targetSizeMB <= 0.5) effectiveSampleRate = 22050;
      else if (targetSizeMB <= 2.0) effectiveSampleRate = 32000;
      else effectiveSampleRate = 44100;
    }

    const options: AudioCompressionOptions = {
      bitrateKbps: 96,
      sampleRate: effectiveSampleRate,
      channels,
    };

    trackEvent('audio_compression_started', { count: files.length, options });

    const compressedResults: CompressedFileResult[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setCurrentFileName(file.name);

      const result = await compressSingleAudio(file, options, (prog) => {
        const batchProgress = Math.round(((i + prog / 100) / files.length) * 100);
        setCurrentProgress(batchProgress);
      });

      compressedResults.push(result);
    }

    setResults(compressedResults);
    setIsProcessing(false);
    trackEvent('audio_compression_completed', { count: files.length });
  };

  const handleReset = () => {
    setResults(null);
    setCurrentProgress(0);
    setCurrentFileName('');
  };

  return (
    <div className="space-y-4">
      {results ? (
        <CompressionResults results={results} onReset={handleReset} toolTitle="Audio Compressor" />
      ) : (
        <div className="space-y-4">
          {/* Compact Setup Header */}
          <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-white px-4 py-3 shadow-2xs">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Current Setup:</span>
              <span className="rounded-md bg-cinematic-orange/10 px-2.5 py-0.5 text-xs font-bold text-cinematic-orange">
                {mode === 'target' ? `Target ${targetSizeMB} MB` : `${sampleRate / 1000} kHz`}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/60 px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:bg-secondary cursor-pointer"
            >
              <Sliders className="h-3.5 w-3.5 text-cinematic-orange" />
              <span>{showSettings ? 'Hide Options' : 'Adjust Options'}</span>
              {showSettings ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* Collapsible Panel */}
          {showSettings && (
            <div className="rounded-2xl border border-border bg-white p-4 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Audio Strategy:
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
                    <span>Target File Size</span>
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
                    <span>Sample Rate</span>
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
                </div>
              )}

              {mode === 'preset' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {sampleRatePresets.map((p) => (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => setSampleRate(p.value)}
                        disabled={isProcessing}
                        className={cn(
                          'flex flex-col items-start p-3 rounded-xl border text-left transition-all cursor-pointer',
                          sampleRate === p.value
                            ? 'border-cinematic-orange bg-cinematic-orange/5 ring-2 ring-cinematic-orange/20'
                            : 'border-border hover:border-cinematic-orange/40 bg-white'
                        )}
                      >
                        <span className="text-xs font-semibold text-foreground">{p.label}</span>
                        <span className="text-[10px] text-muted-foreground">{p.desc}</span>
                      </button>
                    ))}
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
              <h3 className="text-base font-bold text-foreground">Resampling &amp; Encoding Audio...</h3>
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
              accept="audio/mpeg,audio/wav,audio/aac,audio/ogg,audio/m4a"
              acceptLabel="MP3, WAV, AAC, M4A, OGG audio"
              maxSizeMB={100}
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
