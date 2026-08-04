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

  // Security headers for SEO trust signals + static asset caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      // Immutable cache for static assets (fonts, images, CSS, JS bundles)
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache images for 30 days
      {
        source: '/assets/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      // Cache sitemap and robots for 1 hour (allow frequent crawl updates)
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
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
