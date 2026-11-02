/**
 * Video & Media Upload Configuration for Ampledia.
 *
 * Configurable thresholds engineered to protect Supabase Free Plan limits:
 * - Storage Quota: 1 GB (target usage < 400 MB)
 * - Cached Egress Quota: 5 GB/month
 */

export const UPLOAD_CONFIG = {
  // Video constraints
  video: {
    // 25 MB max per clip — ample for 60-120s 1080p web-optimized promotional reels
    maxSizeBytes: Number(process.env.NEXT_PUBLIC_MAX_VIDEO_SIZE_MB || 25) * 1024 * 1024,
    maxSizeLabel: `${process.env.NEXT_PUBLIC_MAX_VIDEO_SIZE_MB || 25} MB`,
    // 180 seconds (3 minutes) max duration for portfolio/deliverable preview clips
    maxDurationSeconds: 180,
    maxDurationLabel: '3 minutes',
    allowedMimeTypes: [
      'video/mp4',
      'video/webm',
      'video/quicktime', // .mov (common iPhone/Mac uploads)
    ],
    allowedExtensions: ['.mp4', '.webm', '.mov'],
  },

  // Image constraints
  image: {
    // 5 MB max per image thumbnail/gallery photo
    maxSizeBytes: 5 * 1024 * 1024,
    maxSizeLabel: '5 MB',
    allowedMimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
    ],
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.avif'],
  },

  // Storage bucket & CDN cache policy
  storage: {
    defaultBucket: 'media',
    // 1-year immutable caching for content-addressed uploads
    cacheControl: '31536000, immutable',
  },
} as const;

/**
 * Format bytes into human-readable string (e.g. 14.2 MB)
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Format seconds into mm:ss (e.g. 02:15)
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
