import { UPLOAD_CONFIG, formatFileSize, formatDuration } from './upload-config';
import type { SupabaseClient } from '@supabase/supabase-js';

export interface ValidationResult {
  valid: boolean;
  error?: string;
  metadata?: {
    sizeBytes: number;
    sizeFormatted: string;
    mimeType: string;
    durationSeconds?: number;
    durationFormatted?: string;
  };
}

/**
 * Fast, non-blocking video duration probe using HTML5 video metadata.
 * Only reads headers/moov atom of local file blob without freezing the main thread.
 */
export async function probeVideoDuration(file: File): Promise<number> {
  return new Promise((resolve) => {
    // If running in non-browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return resolve(0);
    }

    try {
      const video = document.createElement('video');
      video.preload = 'metadata';

      const objectUrl = URL.createObjectURL(file);

      const cleanup = () => {
        URL.revokeObjectURL(objectUrl);
        video.onloadedmetadata = null;
        video.onerror = null;
      };

      // Safety timeout: if browser cannot parse headers within 2.5s, don't block upload
      const timeout = setTimeout(() => {
        cleanup();
        resolve(0);
      }, 2500);

      video.onloadedmetadata = () => {
        clearTimeout(timeout);
        const duration = video.duration;
        cleanup();
        resolve(isFinite(duration) ? duration : 0);
      };

      video.onerror = () => {
        clearTimeout(timeout);
        cleanup();
        resolve(0);
      };

      video.src = objectUrl;
    } catch {
      resolve(0);
    }
  });
}

/**
 * Validates a video file before uploading to Supabase Storage.
 * Checks file type, file size, and duration.
 */
export async function validateVideoFile(file: File): Promise<ValidationResult> {
  const { video } = UPLOAD_CONFIG;

  // 1. Check extension & MIME type
  const ext = `.${file.name.split('.').pop()?.toLowerCase()}`;
  const isValidMime = video.allowedMimeTypes.includes(file.type.toLowerCase() as any);
  const isValidExt = video.allowedExtensions.includes(ext as any);

  if (!isValidMime && !isValidExt) {
    return {
      valid: false,
      error: `Unsupported video format "${ext || file.type}". Allowed formats: MP4 (.mp4), WebM (.webm), MOV (.mov).`,
    };
  }

  // 2. Check file size
  if (file.size > video.maxSizeBytes) {
    return {
      valid: false,
      error: `Video size (${formatFileSize(file.size)}) exceeds the maximum allowed limit of ${video.maxSizeLabel}. Please compress the video or upload a shorter clip.`,
    };
  }

  // 3. Check duration (where practical)
  const duration = await probeVideoDuration(file);
  if (duration > 0 && duration > video.maxDurationSeconds) {
    return {
      valid: false,
      error: `Video length (${formatDuration(duration)}) exceeds the maximum limit of ${video.maxDurationLabel} for portfolio clips. Please trim the video before uploading.`,
      metadata: {
        sizeBytes: file.size,
        sizeFormatted: formatFileSize(file.size),
        mimeType: file.type,
        durationSeconds: duration,
        durationFormatted: formatDuration(duration),
      },
    };
  }

  return {
    valid: true,
    metadata: {
      sizeBytes: file.size,
      sizeFormatted: formatFileSize(file.size),
      mimeType: file.type,
      durationSeconds: duration > 0 ? duration : undefined,
      durationFormatted: duration > 0 ? formatDuration(duration) : undefined,
    },
  };
}

/**
 * Validates an image file before uploading to Supabase Storage.
 */
export function validateImageFile(file: File): ValidationResult {
  const { image } = UPLOAD_CONFIG;

  const ext = `.${file.name.split('.').pop()?.toLowerCase()}`;
  const isValidMime = image.allowedMimeTypes.includes(file.type.toLowerCase() as any);
  const isValidExt = image.allowedExtensions.includes(ext as any);

  if (!isValidMime && !isValidExt) {
    return {
      valid: false,
      error: `Unsupported image format "${ext || file.type}". Allowed formats: JPEG, PNG, WebP, AVIF.`,
    };
  }

  if (file.size > image.maxSizeBytes) {
    return {
      valid: false,
      error: `Image size (${formatFileSize(file.size)}) exceeds the maximum allowed limit of ${image.maxSizeLabel}.`,
    };
  }

  return {
    valid: true,
    metadata: {
      sizeBytes: file.size,
      sizeFormatted: formatFileSize(file.size),
      mimeType: file.type,
    },
  };
}

/**
 * Verifies that the client has an active authenticated user session before uploading.
 */
export async function verifyUploadAuth(supabase: SupabaseClient): Promise<{ authenticated: boolean; user?: any; error?: string }> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      return {
        authenticated: false,
        error: 'You must be logged in as an administrator to upload media files to Supabase Storage.',
      };
    }
    return { authenticated: true, user };
  } catch (err) {
    return {
      authenticated: false,
      error: 'Failed to verify session credentials. Please log in again.',
    };
  }
}
