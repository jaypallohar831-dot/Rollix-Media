'use client';

import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { Upload, FileImage, FileText, Archive, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileDropzoneProps {
  accept: string;
  acceptLabel: string;
  maxSizeMB?: number;
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
  isProcessing?: boolean;
  toolType?: 'image' | 'pdf' | 'zip';
}

export function FileDropzone({
  accept,
  acceptLabel,
  maxSizeMB = 25,
  multiple = true,
  onFilesSelected,
  isProcessing = false,
  toolType = 'image',
}: FileDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const validateAndPassFiles = (fileList: FileList | File[]) => {
    setErrorMessage(null);
    const filesArray = Array.from(fileList);

    if (filesArray.length === 0) return;

    const validFiles: File[] = [];
    let oversizedCount = 0;

    for (const file of filesArray) {
      if (file.size > maxSizeBytes) {
        oversizedCount++;
      } else {
        validFiles.push(file);
      }
    }

    if (oversizedCount > 0) {
      setErrorMessage(
        `${oversizedCount} file(s) exceeded the ${maxSizeMB}MB limit and were excluded.`
      );
    }

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isProcessing) setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (isProcessing) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndPassFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndPassFiles(e.target.files);
      e.target.value = '';
    }
  };

  const renderIcon = () => {
    switch (toolType) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-cinematic-orange shrink-0" />;
      case 'zip':
        return <Archive className="h-6 w-6 text-cinematic-orange shrink-0" />;
      default:
        return <FileImage className="h-6 w-6 text-cinematic-orange shrink-0" />;
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isProcessing && fileInputRef.current?.click()}
        className={cn(
          'group relative flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border-2 border-dashed px-4 sm:px-6 py-3.5 sm:py-4 transition-all duration-300 cursor-pointer bg-white/80 hover:bg-white',
          isDragOver
            ? 'border-cinematic-orange bg-cinematic-orange/5 scale-[1.005]'
            : 'border-border hover:border-cinematic-orange/60',
          isProcessing && 'pointer-events-none opacity-60'
        )}
        role="button"
        tabIndex={0}
        aria-label="Upload files for compression"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
          disabled={isProcessing}
        />

        {/* Left Side: Icon + Label */}
        <div className="flex items-center gap-3 text-left">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cinematic-orange/10 transition-transform group-hover:scale-105">
            {renderIcon()}
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-foreground">
              {isDragOver ? 'Drop files to start compressing' : 'Drag & drop files here, or click to upload'}
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Supports <span className="font-medium text-foreground">{acceptLabel}</span> up to{' '}
              <span className="font-medium text-foreground">{maxSizeMB}MB</span> per file
            </p>
          </div>
        </div>

        {/* Right Side: Select Files Button */}
        <div className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-cinematic-orange bg-cinematic-orange text-white px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all hover:bg-opacity-90 shadow-2xs">
          <Upload className="h-3.5 w-3.5" />
          <span>Select Files</span>
        </div>
      </div>

      {errorMessage && (
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
