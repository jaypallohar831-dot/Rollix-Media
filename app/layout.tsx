import type { Metadata } from 'next';
import { geistSans, geistMono, playfair } from './fonts';
import './globals.css';
import { SmoothScroll } from '@/components/smooth-scroll';
import { MouseFollowLight } from '@/components/mouse-follow-light';
import { BokehBackground } from '@/components/bokeh-background';
import { SpeedInsights } from '@vercel/speed-insights/next';
export const metadata: Metadata = {
  metadataBase: new URL('https://rollixmedia.vercel.app'),
  title: {
    default: 'Rollix Media | Digital Marketing Agency in Bhilwara',
    template: '%s | Rollix Media',
  },
  description:
    'Rollix Media is a premium digital marketing agency in Bhilwara, India. We specialize in video editing, social media marketing, web development, SEO, and graphics designing.',
  keywords: [
    'digital marketing agency Bhilwara',
    'video editing Bhilwara',
    'social media marketing Rajasthan',
    'web development Bhilwara',
    'SEO agency India',
    'graphics designing Bhilwara',
    'Rollix Media',
    'content creation agency',
  ],
  authors: [{ name: 'Rollix Media', url: 'https://rollixmedia.vercel.app' }],
  creator: 'Rollix Media',
  publisher: 'Rollix Media',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://rollixmedia.vercel.app',
    siteName: 'Rollix Media',
    title: 'Rollix Media | Digital Marketing Agency in Bhilwara',
    description:
      'Premium digital marketing agency in Bhilwara, India. Video editing, social media, web development & more.',
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
  return (
    <html lang="en" suppressHydrationWarning className="dark relative antialiased" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} relative min-h-full font-sans`}
        style={{ position: 'relative' }}
        suppressHydrationWarning
      >
        <BokehBackground />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <MouseFollowLight />
        <SpeedInsights />
      </body>
    </html>
  );
}
