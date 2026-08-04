import imageCompression from 'browser-image-compression';

export interface CompressedFileResult {
  file: File;
  originalName: string;
  originalSize: number;
  compressedSize: number;
  blobUrl: string;
  savedPercentage: number;
  error?: string;
}

export type OutputFormat = 'auto' | 'webp' | 'jpeg' | 'png';

export interface CompressionSettings {
  mode: 'target' | 'quality';
  targetSizeMB: number; // e.g., 0.5, 1, 2, 5, 10, 20
  qualityPercent: number; // 10 to 100
  outputFormat: OutputFormat;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Advanced Client-Side Image Compression & Format Converter Engine
 * Handles PNG, WebP, JPEG format conversion with strict target file size enforcement.
 */
export async function compressSingleImage(
  file: File,
  settings: CompressionSettings,
  onProgress?: (progress: number) => void
): Promise<CompressedFileResult> {
  const originalSize = file.size;
  const originalName = file.name;

  try {
    if (onProgress) onProgress(15);

    let compressedFile: File;

    if (settings.mode === 'target') {
      const requestedSizeBytes = settings.targetSizeMB * 1024 * 1024;
      const effectiveTargetBytes = Math.min(originalSize * 0.85, requestedSizeBytes);

      compressedFile = await compressToTargetSize(file, effectiveTargetBytes, settings.outputFormat, onProgress);
    } else {
      const qualityRatio = Math.max(0.1, Math.min(1.0, settings.qualityPercent / 100));

      if (settings.outputFormat === 'png') {
        compressedFile = await compressPngToTarget(file, originalSize * qualityRatio, qualityRatio);
      } else {
        try {
          const maxMB = Math.max(0.05, (originalSize / (1024 * 1024)) * (qualityRatio * 0.65));
          const options = {
            maxSizeMB: maxMB,
            maxWidthOrHeight: 3840,
            useWebWorker: true,
            initialQuality: qualityRatio,
            fileType: settings.outputFormat === 'auto' ? 'image/webp' : `image/${settings.outputFormat}`,
            onProgress: (p: number) => {
              if (onProgress) onProgress(Math.round(p * 0.8));
            },
          };
          compressedFile = await imageCompression(file, options);
        } catch {
          compressedFile = await compressWithCanvasAdvanced(file, qualityRatio, 1.0, settings.outputFormat);
        }
      }
    }

    // Safety Check: If output PNG/JPEG/WebP size exceeds original size, apply PNG resolution scaling or WebP pass
    if (compressedFile.size >= originalSize) {
      if (settings.outputFormat === 'png') {
        compressedFile = await compressPngToTarget(file, originalSize * 0.85, 0.75);
      } else {
        const forcedWebp = await compressWithCanvasAdvanced(file, 0.65, 0.85, 'webp');
        if (forcedWebp.size < originalSize) {
          compressedFile = forcedWebp;
        }
      }
    }

    // Force exact output file extension and MIME type matching settings.outputFormat
    compressedFile = await forceImageFormatExtension(compressedFile, originalName, settings.outputFormat);

    if (onProgress) onProgress(100);

    const compressedSize = compressedFile.size;
    const blobUrl = URL.createObjectURL(compressedFile);
    const savedBytes = Math.max(0, originalSize - compressedSize);
    const savedPercentage = Math.round((savedBytes / originalSize) * 100);

    return {
      file: compressedFile,
      originalName,
      originalSize,
      compressedSize,
      blobUrl,
      savedPercentage,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to compress image.';
    return {
      file,
      originalName,
      originalSize,
      compressedSize: originalSize,
      blobUrl: URL.createObjectURL(file),
      savedPercentage: 0,
      error: errorMessage,
    };
  }
}

/**
 * Special PNG Resolution Scaling Engine
 * Browser canvas ignores quality ratio for PNGs. We scale pixel dimensions to strictly enforce target size.
 */
async function compressPngToTarget(file: File, targetSizeBytes: number, qualityRatio: number): Promise<File> {
  let scale = Math.min(1.0, qualityRatio);
  let bestPng = await compressWithCanvasAdvanced(file, 1.0, scale, 'png');

  // If PNG is larger than target, scale down dimensions until size target is met
  for (let pass = 0; pass < 4 && bestPng.size > targetSizeBytes; pass++) {
    scale *= Math.min(0.85, Math.sqrt(targetSizeBytes / bestPng.size));
    bestPng = await compressWithCanvasAdvanced(file, 1.0, scale, 'png');
  }

  return bestPng;
}

async function forceImageFormatExtension(file: File, originalName: string, outputFormat: OutputFormat): Promise<File> {
  let targetExt = 'webp';
  let mimeType = 'image/webp';

  if (outputFormat === 'jpeg') {
    targetExt = 'jpg';
    mimeType = 'image/jpeg';
  } else if (outputFormat === 'png') {
    targetExt = 'png';
    mimeType = 'image/png';
  } else if (outputFormat === 'webp') {
    targetExt = 'webp';
    mimeType = 'image/webp';
  } else {
    targetExt = 'webp';
    mimeType = 'image/webp';
  }

  const baseName = originalName.replace(/\.[^/.]+$/, '');
  const newName = `${baseName}_compressed.${targetExt}`;

  return new File([file], newName, { type: mimeType, lastModified: Date.now() });
}

async function compressToTargetSize(
  file: File,
  targetSizeBytes: number,
  outputFormat: OutputFormat,
  onProgress?: (progress: number) => void
): Promise<File> {
  if (outputFormat === 'png') {
    return compressPngToTarget(file, targetSizeBytes, 0.9);
  }

  let lowQuality = 0.20;
  let highQuality = 0.85;
  let bestFile: File | null = null;
  let scaleFactor = 1.0;

  const dims = await getImageDimensions(file);
  const maxDim = Math.max(dims.width, dims.height);

  if (maxDim > 3840) {
    scaleFactor = 3840 / maxDim;
  }

  for (let pass = 0; pass < 4; pass++) {
    const midQuality = (lowQuality + highQuality) / 2;
    if (onProgress) onProgress(20 + pass * 20);

    const candidate = await compressWithCanvasAdvanced(file, midQuality, scaleFactor, outputFormat);

    if (candidate.size <= targetSizeBytes) {
      bestFile = candidate;
      lowQuality = midQuality;
    } else {
      highQuality = midQuality;
      if (pass >= 1 && candidate.size > targetSizeBytes) {
        scaleFactor *= 0.85;
      }
    }
  }

  if (!bestFile || bestFile.size >= file.size) {
    bestFile = await compressWithCanvasAdvanced(file, 0.50, scaleFactor * 0.80, outputFormat);
  }

  return bestFile;
}

async function compressWithCanvasAdvanced(
  file: File,
  quality: number,
  scale: number = 1.0,
  outputFormat: OutputFormat = 'auto'
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read image file.'));

    img.onload = () => {
      const targetWidth = Math.max(16, Math.round(img.width * scale));
      const targetHeight = Math.max(16, Math.round(img.height * scale));

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(file);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      if (outputFormat === 'jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, targetWidth, targetHeight);
      }

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      let mimeType = 'image/webp';
      if (outputFormat === 'jpeg') mimeType = 'image/jpeg';
      else if (outputFormat === 'png') mimeType = 'image/png';
      else if (outputFormat === 'webp') mimeType = 'image/webp';

      const extension = mimeType.split('/')[1] || 'webp';
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      const newName = `${baseName}.${extension}`;

      canvas.toBlob(
        (blob) => {
          if (!blob) return resolve(file);
          const compressed = new File([blob], newName, {
            type: mimeType,
            lastModified: Date.now(),
          });
          resolve(compressed);
        },
        mimeType,
        quality
      );
    };

    img.onerror = () => reject(new Error('Corrupted image file.'));
    reader.readAsDataURL(file);
  });
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => resolve({ width: 1920, height: 1080 });
    reader.readAsDataURL(file);
  });
}
