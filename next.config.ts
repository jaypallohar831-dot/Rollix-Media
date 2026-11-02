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

const NEW_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ampledia.in').replace(/\/$/, '');

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
    deviceSizes: [640, 750, 768, 828, 1024, 1080, 1200, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [25, 50, 70, 75, 80, 90, 100],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
  },

  // Explicitly disable production browser source maps (SEO/security/bundle size)
  productionBrowserSourceMaps: false,

  // Strip console in production to prevent console noise
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },

  // Turbopack-compatible performance optimizations and bundle size reduction
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'gsap',
      'lucide-react',
    ],
  },

  // Security headers for SEO trust signals + static asset caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
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
      // Cache manifest.json for PWA
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      // Prevent API routes from being indexed by search engines
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ];
  },

  // Redirect trailing slashes & legacy host domains to authoritative URLs
  async redirects() {
    return [
      // 1. Permanent (301) domain redirect from legacy host to new Ampledia URL
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'rollixmedia.vercel.app',
          },
        ],
        destination: `${NEW_URL}/:path*`,
        permanent: true,
      },
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
      // Consolidate duplicate case study URL into the authoritative portfolio project
      {
        source: '/case-studies/vision-classes-bhilwara',
        destination: '/portfolio/vision-classes-bhilwara',
        permanent: true,
      },
      {
        source: '/case-studies/:slug*',
        destination: '/portfolio/:slug*',
        permanent: true,
      },
      // Safely redirect decommissioned tool pages back to homepage
      {
        source: '/tools/:path*',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
