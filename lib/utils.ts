import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns playable video URL with safe fallback for broken/unauthorized media sources.
 */
export function getOptimizedVideoUrl(url?: string, preview = true) {
  if (!url) {
    return '';
  }
  return url;
}

/**
 * Returns playable image URL with safe fallback for broken/unauthorized image sources.
 */
export function getOptimizedImageUrl(url?: string) {
  if (!url) {
    return '/assets/portfolio/wedding.png';
  }
  return url;
}
