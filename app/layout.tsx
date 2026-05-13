import type { Metadata } from 'next';
import { geistSans, geistMono, playfair } from './fonts';
import './globals.css';
import { SmoothScroll } from '@/components/smooth-scroll';

export const metadata: Metadata = {
  title: 'Cinematic Agency | Premium Digital Experiences',
  description:
    'A modern creative studio specializing in immersive cinematic web experiences, visual storytelling, and premium brand narratives.',
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
          <SmoothScroll>
            {children}
          </SmoothScroll>
      </body>
    </html>
  );
}
