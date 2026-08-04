'use client';

import { useState } from 'react';
import { FileDropzone } from './file-dropzone';
import { CompressionResults } from './compression-results';
import { compressGenericFilesToZip } from '@/lib/compression/zip-utils';
import { CompressedFileResult } from '@/lib/compression/image-utils';
import { trackEvent } from '@/lib/analytics';
import { Archive, Loader2, Info } from 'lucide-react';

export function ZipCompressor() {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [results, setResults] = useState<CompressedFileResult[] | null>(null);

  const handleFilesSelected = async (files: File[]) => {
    setIsProcessing(true);
    setCurrentProgress(0);
    setResults(null);

    trackEvent('zip_compression_started', { count: files.length });

    const result = await compressGenericFilesToZip(files, `archive-${Date.now()}.zip`, (prog) => {
      setCurrentProgress(prog);
    });

    setResults([result]);
    setIsProcessing(false);
    trackEvent('zip_compression_completed', { count: files.length });
  };

  const handleReset = () => {
    setResults(null);
    setCurrentProgress(0);
  };

  return (
    <div className="space-y-6">
      {results ? (
        <CompressionResults results={results} onReset={handleReset} toolTitle="Any-File ZIP Shrinker" />
      ) : (
        <div className="space-y-6">
          {/* Informational note */}
          <div className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 text-xs sm:text-sm text-muted-foreground">
            <Info className="h-5 w-5 text-cinematic-orange shrink-0" />
            <span>
              <strong>Archive & Shrink:</strong> Bundles any file types into a DEFLATE-compressed ZIP archive. Note: Already compressed media (MP4, MP3, JPG) won&rsquo;t shrink significantly further.
            </span>
          </div>

          {/* Upload Dropzone or Processing Indicator */}
          {isProcessing ? (
            <div className="rounded-2xl border border-border bg-white p-8 sm:p-12 text-center shadow-sm space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cinematic-orange/10 text-cinematic-orange animate-spin">
                <Loader2 className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Creating Compressed ZIP Archive...</h3>

              {/* Progress bar */}
              <div className="w-full max-w-md mx-auto h-3 bg-secondary rounded-full overflow-hidden mt-4">
                <div
                  className="h-full bg-cinematic-orange transition-all duration-300 rounded-full"
                  style={{ width: `${currentProgress}%` }}
                />
              </div>
              <span className="text-xs font-bold text-cinematic-orange">{currentProgress}%</span>
            </div>
          ) : (
            <FileDropzone
              accept="*"
              acceptLabel="Any files (Documents, Code, Audio, Video)"
              maxSizeMB={25}
              multiple={true}
              onFilesSelected={handleFilesSelected}
              isProcessing={isProcessing}
              toolType="zip"
            />
          )}
        </div>
      )}
    </div>
  );
}
