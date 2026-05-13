import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.196.1.136", "10.196.4.136", "localhost", "10.47.81.136"],

  // Image optimization — auto WebP/AVIF conversion
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 128, 256, 384],
    qualities: [75, 80],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
  },

  // Turbopack-compatible experimental perf flags
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
