'use client';

import { useState } from 'react';
import { FileDropzone } from './file-dropzone';
import { CompressionResults } from './compression-results';
import { compressSinglePdf, PdfCompressionLevel } from '@/lib/compression/pdf-utils';
import { CompressedFileResult } from '@/lib/compression/image-utils';
import { trackEvent } from '@/lib/analytics';
import { Loader2, Sliders, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PdfCompressor() {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [level, setLevel] = useState<PdfCompressionLevel>('recommended');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [currentFileName, setCurrentFileName] = useState<string>('');
  const [results, setResults] = useState<CompressedFileResult[] | null>(null);

  const presets = [
    { id: 'recommended' as PdfCompressionLevel, label: 'Recommended', desc: 'Optimal stream compression & sharp text' },
    { id: 'extreme' as PdfCompressionLevel, label: 'Max Compression', desc: 'Maximum structure & metadata pruning' },
    { id: 'low' as PdfCompressionLevel, label: 'Light Compression', desc: 'Minimal structural re-encoding' },
  ];

  const handleFilesSelected = async (files: File[]) => {
    setIsProcessing(true);
    setCurrentProgress(0);
    setResults(null);

    trackEvent('pdf_compression_started', { count: files.length, level });

    const compressedResults: CompressedFileResult[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setCurrentFileName(file.name);

      const result = await compressSinglePdf(file, level, (prog) => {
        const batchProgress = Math.round(((i + prog / 100) / files.length) * 100);
        setCurrentProgress(batchProgress);
      });

      compressedResults.push(result);
    }

    setResults(compressedResults);
    setIsProcessing(false);
    trackEvent('pdf_compression_completed', { count: files.length });
  };

  const handleReset = () => {
    setResults(null);
    setCurrentProgress(0);
    setCurrentFileName('');
  };

  return (
    <div className="space-y-4">
      {results ? (
        <CompressionResults results={results} onReset={handleReset} toolTitle="PDF Compressor" />
      ) : (
        <div className="space-y-4">
          {/* Header Option Bar */}
          <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-white px-4 py-3 shadow-2xs">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Current Setup:</span>
              <span className="rounded-md bg-cinematic-orange/10 px-2.5 py-0.5 text-xs font-bold text-cinematic-orange uppercase">
                {level} Level
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

          {/* Collapsible Presets Panel */}
          {showSettings && (
            <div className="rounded-2xl border border-border bg-white p-4 shadow-sm space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {presets.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setLevel(p.id)}
                    disabled={isProcessing}
                    className={cn(
                      'flex flex-col items-start p-3 rounded-xl border text-left transition-all cursor-pointer',
                      level === p.id
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

          {/* Upload Dropzone or Processing Indicator */}
          {isProcessing ? (
            <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cinematic-orange/10 text-cinematic-orange animate-spin">
                <Loader2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-foreground">Optimizing PDF Document(s)...</h3>
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
              accept="application/pdf"
              acceptLabel="PDF documents (.pdf)"
              maxSizeMB={50}
              multiple={true}
              onFilesSelected={handleFilesSelected}
              isProcessing={isProcessing}
              toolType="pdf"
            />
          )}
        </div>
      )}
    </div>
  );
}
