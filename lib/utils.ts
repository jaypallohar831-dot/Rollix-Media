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
  if (!url || !url.includes('res.cloudinary.com')) return url;
  if (url.includes('/q_') || url.includes('/f_') || url.includes('/vc_')) return url;

  // For hover previews in cards, we don't need 4K resolution.
  // We'll drop the quality, force auto-format, and limit width to 800px.
  const transforms = preview ? 'q_auto,f_auto,w_800' : 'q_auto,f_auto';
  
  return url.replace('/video/upload/', `/video/upload/${transforms}/`);
}
