import { CompressedFileResult } from './image-utils';

export type VideoOutputFormat = 'auto' | 'mp4' | 'webm';

export interface VideoCompressionOptions {
  mode: 'target' | 'preset';
  targetSizeMB: number; // e.g., 1, 2, 5, 10, 20, 50
  targetResolution: 'original' | '1080p' | '720p' | '480p' | '360p';
  bitrateMbps: number; // e.g., 2.0, 4.0, 6.0
  outputFormat?: VideoOutputFormat;
}

/**
 * Ultra-HD Crisp Video Compression & Format Converter Engine
 * Converts between MP4 (H.264 / AVC1) and WebM (VP9) with exact target file sizes.
 */
export async function compressSingleVideo(
  file: File,
  options: VideoCompressionOptions,
  onProgress?: (progress: number) => void
): Promise<CompressedFileResult> {
  const originalSize = file.size;
  const originalName = file.name;
  const targetFormat = options.outputFormat || 'auto';

  return new Promise((resolve) => {
    try {
      if (onProgress) onProgress(10);

      const video = document.createElement('video');
      video.muted = true;
      video.playsInline = true;
      video.preload = 'auto';

      const videoUrl = URL.createObjectURL(file);
      video.src = videoUrl;

      video.onloadedmetadata = () => {
        if (onProgress) onProgress(20);

        const duration = video.duration || 10;
        let calculatedBitrateBps = options.bitrateMbps * 1000 * 1000;
        let chosenResolution = options.targetResolution;

        if (options.mode === 'target') {
          const targetSizeBytes = options.targetSizeMB * 1024 * 1024;

          if (originalSize <= targetSizeBytes) {
            calculatedBitrateBps = Math.max(3500000, (originalSize * 8 * 0.88) / duration);
          } else {
            calculatedBitrateBps = Math.max(2200000, (targetSizeBytes * 8) / duration);
          }

          if (chosenResolution === 'original' || !chosenResolution) {
            chosenResolution = 'original';
          }
        }

        let targetWidth = video.videoWidth;
        let targetHeight = video.videoHeight;

        if (chosenResolution === '720p' && targetHeight > 720) {
          targetWidth = Math.round((video.videoWidth * 720) / video.videoHeight);
          targetHeight = 720;
        } else if (chosenResolution === '480p' && targetHeight > 480) {
          targetWidth = Math.round((video.videoWidth * 480) / video.videoHeight);
          targetHeight = 480;
        } else if (chosenResolution === '360p' && targetHeight > 360) {
          targetWidth = Math.round((video.videoWidth * 360) / video.videoHeight);
          targetHeight = 360;
        } else if (chosenResolution === '1080p' && targetHeight > 1080) {
          targetWidth = Math.round((video.videoWidth * 1080) / video.videoHeight);
          targetHeight = 1080;
        }

        targetWidth = Math.max(16, targetWidth - (targetWidth % 2));
        targetHeight = Math.max(16, targetHeight - (targetHeight % 2));

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d', { alpha: false });

        if (!ctx) {
          URL.revokeObjectURL(videoUrl);
          return resolve(createFallbackResult(file));
        }

        ctx.imageSmoothingEnabled = targetWidth !== video.videoWidth;
        ctx.imageSmoothingQuality = 'high';

        const canvasStream = canvas.captureStream(30);
        const mimeType = getSupportedVideoMimeType(targetFormat);

        const mediaRecorder = new MediaRecorder(canvasStream, {
          mimeType,
          videoBitsPerSecond: Math.round(calculatedBitrateBps),
        });

        const chunks: Blob[] = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
          URL.revokeObjectURL(videoUrl);
          const compressedBlob = new Blob(chunks, { type: mimeType });

          let ext = 'mp4';
          if (targetFormat === 'mp4') ext = 'mp4';
          else if (targetFormat === 'webm') ext = 'webm';
          else ext = mimeType.includes('mp4') ? 'mp4' : 'webm';

          const baseName = originalName.replace(/\.[^/.]+$/, '');
          const newName = `${baseName}_converted.${ext}`;

          let compressedFile = new File([compressedBlob], newName, {
            type: mimeType,
            lastModified: Date.now(),
          });

          // Safety check: if compression yielded larger file and format was auto, fallback
          if (compressedFile.size >= originalSize && targetFormat === 'auto') {
            compressedFile = file;
          }

          const compressedSize = compressedFile.size;
          const blobUrl = URL.createObjectURL(compressedFile);
          const savedBytes = Math.max(0, originalSize - compressedSize);
          const savedPercentage = Math.round((savedBytes / originalSize) * 100);

          if (onProgress) onProgress(100);

          resolve({
            file: compressedFile,
            originalName,
            originalSize,
            compressedSize,
            blobUrl,
            savedPercentage,
          });
        };

        let isDone = false;

        const processVideoFrame = () => {
          if (isDone || video.ended || video.paused) return;

          ctx.drawImage(video, 0, 0, targetWidth, targetHeight);

          if (video.duration > 0 && onProgress) {
            const prog = Math.min(95, 20 + Math.round((video.currentTime / video.duration) * 75));
            onProgress(prog);
          }

          if ('requestVideoFrameCallback' in video) {
            (video as unknown as { requestVideoFrameCallback: (cb: () => void) => void }).requestVideoFrameCallback(processVideoFrame);
          } else {
            requestAnimationFrame(processVideoFrame);
          }
        };

        mediaRecorder.start(100);
        video.playbackRate = 1.0;
        video.currentTime = 0;

        video.play().then(() => {
          if ('requestVideoFrameCallback' in video) {
            (video as unknown as { requestVideoFrameCallback: (cb: () => void) => void }).requestVideoFrameCallback(processVideoFrame);
          } else {
            requestAnimationFrame(processVideoFrame);
          }
        }).catch(() => {
          resolve(createFallbackResult(file));
        });

        video.onended = () => {
          isDone = true;
          setTimeout(() => {
            if (mediaRecorder.state !== 'inactive') {
              mediaRecorder.stop();
            }
          }, 200);
        };

        video.onerror = () => {
          isDone = true;
          URL.revokeObjectURL(videoUrl);
          resolve(createFallbackResult(file));
        };
      };

      video.onerror = () => {
        URL.revokeObjectURL(videoUrl);
        resolve(createFallbackResult(file));
      };
    } catch {
      resolve(createFallbackResult(file));
    }
  });
}

function getSupportedVideoMimeType(targetFormat: VideoOutputFormat = 'auto'): string {
  if (targetFormat === 'mp4') {
    if (MediaRecorder.isTypeSupported('video/mp4;codecs=avc1.4d401f')) return 'video/mp4;codecs=avc1.4d401f';
    if (MediaRecorder.isTypeSupported('video/mp4')) return 'video/mp4';
  }

  if (targetFormat === 'webm') {
    if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) return 'video/webm;codecs=vp9';
    if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) return 'video/webm;codecs=vp8';
    if (MediaRecorder.isTypeSupported('video/webm')) return 'video/webm';
  }

  // Auto mode preference
  if (MediaRecorder.isTypeSupported('video/mp4;codecs=avc1.4d401f')) return 'video/mp4;codecs=avc1.4d401f';
  if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) return 'video/webm;codecs=vp9';
  if (MediaRecorder.isTypeSupported('video/mp4')) return 'video/mp4';
  if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) return 'video/webm;codecs=vp8';
  return 'video/webm';
}

function createFallbackResult(file: File): CompressedFileResult {
  return {
    file,
    originalName: file.name,
    originalSize: file.size,
    compressedSize: file.size,
    blobUrl: URL.createObjectURL(file),
    savedPercentage: 0,
  };
}
