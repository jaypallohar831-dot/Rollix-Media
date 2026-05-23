import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.196.1.136", "10.196.4.136", "localhost", "10.47.81.136", "192.168.29.77"],

  // Image optimization — auto WebP/AVIF conversion
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
  },

  // Turbopack-compatible experimental perf flags
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
