'use client';

import { useState } from 'react';
import { Download, Archive, CheckCircle2, FileCheck, RefreshCw, ArrowRight, Sparkles } from 'lucide-react';
import { CompressedFileResult, formatFileSize } from '@/lib/compression/image-utils';
import { createZipArchive } from '@/lib/compression/zip-utils';
import Link from 'next/link';

interface CompressionResultsProps {
  results: CompressedFileResult[];
  onReset: () => void;
  toolTitle?: string;
}

export function CompressionResults({ results, onReset, toolTitle = 'File Compressor' }: CompressionResultsProps) {
  const [isZipping, setIsZipping] = useState(false);

  const totalOriginal = results.reduce((acc, r) => acc + r.originalSize, 0);
  const totalCompressed = results.reduce((acc, r) => acc + r.compressedSize, 0);
  const totalSaved = Math.max(0, totalOriginal - totalCompressed);
  const overallSavedPercent = totalOriginal > 0 ? Math.round((totalSaved / totalOriginal) * 100) : 0;

  const handleDownloadSingle = (result: CompressedFileResult) => {
    const link = document.createElement('a');
    link.href = result.blobUrl;
    link.download = result.file.name; // Use converted output file name with exact new extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAllZip = async () => {
    if (results.length === 0) return;
    setIsZipping(true);
    try {
      const filesForZip = results.map((r) => ({
        name: r.file.name, // Use converted file names in ZIP archive
        blob: r.file,
      }));

      const { url, fileName } = await createZipArchive(filesForZip, `compressed-files-${Date.now()}.zip`);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to create ZIP archive:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Banner: Overall Summary */}
      <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cinematic-orange">
              <CheckCircle2 className="h-4 w-4" />
              <span>Compression &amp; Format Conversion Complete</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Saved {formatFileSize(totalSaved)} ({overallSavedPercent}% smaller)
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Total: {formatFileSize(totalOriginal)} &rarr;{' '}
              <span className="font-semibold text-foreground">{formatFileSize(totalCompressed)}</span> across{' '}
              {results.length} file(s).
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {results.length > 1 && (
              <button
                onClick={handleDownloadAllZip}
                disabled={isZipping}
                className="inline-flex items-center gap-2 rounded-full bg-cinematic-orange px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-opacity-90 shadow-md cursor-pointer disabled:opacity-50"
              >
                <Archive className="h-4 w-4" />
                <span>{isZipping ? 'Creating ZIP...' : 'Download All (ZIP)'}</span>
              </button>
            )}

            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-5 py-3 text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-secondary cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Compress More</span>
            </button>
          </div>
        </div>
      </div>

      {/* File List Cards */}
      <div className="space-y-3">
        {results.map((item, index) => (
          <div
            key={`${item.file.name}-${index}`}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border bg-white p-4 sm:p-5 transition-all hover:border-cinematic-orange/40"
          >
            {/* Left info */}
            <div className="flex items-start sm:items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cinematic-orange/10 text-cinematic-orange">
                <FileCheck className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-foreground truncate max-w-xs sm:max-w-md">
                  {item.file.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <span className="text-[11px] font-semibold text-cinematic-orange uppercase">
                    From {item.originalName}
                  </span>
                  <span>&bull;</span>
                  <span className="line-through">{formatFileSize(item.originalSize)}</span>
                  <span>&rarr;</span>
                  <span className="font-semibold text-foreground">{formatFileSize(item.compressedSize)}</span>
                  {item.savedPercentage > 0 && (
                    <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-600">
                      -{item.savedPercentage}%
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right download action */}
            <div className="flex items-center gap-3 self-end sm:self-center">
              <button
                onClick={() => handleDownloadSingle(item)}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-xs font-bold text-foreground transition-all hover:border-cinematic-orange hover:text-cinematic-orange shadow-2xs cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download ({item.file.name.split('.').pop()?.toUpperCase()})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Soft Lead Generation CTA */}
      <div className="mt-8 rounded-2xl border border-cinematic-orange/30 bg-gradient-to-r from-cinematic-orange/10 via-amber-500/5 to-transparent p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-cinematic-orange/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cinematic-orange">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Need Business Growth?</span>
            </div>
            <h4 className="text-lg font-bold text-foreground">
              Preparing content or graphics for your business or coaching institute?
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Rollix Media crafts high-converting Meta Ads, high-speed Next.js websites, SEO dominance, and cinematic brand video editing. Let&rsquo;s scale your revenue.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cinematic-orange px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-opacity-90"
          >
            <span>Get Free Strategy Call</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
