import type { Metadata } from 'next';
import { geistSans, geistMono, inter, playfairDisplay } from './fonts';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: 'Rollix Media | Premium Digital Agency',
  description:
    'Award-winning digital creative studio specializing in premium web design, SEO, and cinematic production for high-growth brands.',
  keywords: [
    'digital agency',
    'premium web design',
    'creative studio',
    'SEO optimization',
    'cinematic video production',
    'brand strategy',
    'Rollix Media',
  ],
  authors: [{ name: 'Rollix Media' }],
  creator: 'Rollix Media',
  publisher: 'Rollix Media',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rollixmedia.com'),
  openGraph: {
    title: 'Rollix Media | Premium Digital Agency',
    description: 'Award-winning digital creative studio specializing in premium web design.',
    url: 'https://rollixmedia.com',
    siteName: 'Rollix Media',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rollix Media - Digital Marketing Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rollix Media | Digital Marketing Agency',
    description: 'Premium digital marketing agency in Bhilwara, India.',
    images: ['/og-image.jpg'],
    creator: '@rollixmedia',
  },
  alternates: {
    canonical: 'https://rollixmedia.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Rollix Media',
    description: 'Premium digital marketing agency in Bhilwara, India. Video editing, social media marketing, web development, SEO, and graphics designing.',
    url: 'https://rollixmedia.vercel.app',
    logo: 'https://rollixmedia.vercel.app/og-image.jpg',
    image: 'https://rollixmedia.vercel.app/og-image.jpg',
    telephone: '+91-9024675831',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bhilwara, Rajasthan',
      addressLocality: 'Bhilwara',
      addressRegion: 'Rajasthan',
      postalCode: '311001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '25.3478',
      longitude: '74.6313',
    },
    areaServed: ['Bhilwara', 'Rajasthan', 'India'],
    priceRange: '₹₹',
    openingHours: 'Mo-Sa 09:00-19:00',
    sameAs: [
      'https://instagram.com/rollixmedia',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Marketing Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Video Editing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Marketing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Graphics Designing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wedding Shooting' } },
      ],
    },
  };

  return (
    <html lang="en" suppressHydrationWarning className="relative antialiased" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${playfairDisplay.variable} relative min-h-full font-sans`}
        style={{ position: 'relative' }}
        suppressHydrationWarning
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
