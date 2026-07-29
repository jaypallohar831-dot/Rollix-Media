import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Optimizes a Cloudinary video URL for faster loading by setting format to auto,
 * quality to auto, and optionally resizing it for preview thumbnails.
 */
export function getOptimizedVideoUrl(url: string, preview = true) {
  // Bypassing transformations as they cause 401 Unauthorized with Strict Transformations
  // or conflict with existing complex text/logo overlays in the URL.
  return url;
}
