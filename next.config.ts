import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.196.1.136", "10.196.4.136", "localhost", "10.47.81.136", "192.168.29.77"],

  // Image optimization — auto WebP/AVIF conversion
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fwjvcqwcedjmzxqcrvtf.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 128, 256, 384],
    qualities: [25, 50, 70, 75, 80, 90, 100],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
  },

  // Turbopack-compatible experimental perf flags
  experimental: {
    optimizeCss: true,
  },

  // Security headers for SEO trust signals
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },

  // Redirect trailing slashes to canonical URLs (SEO duplicate prevention)
  async redirects() {
    return [
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
