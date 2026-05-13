# Premium Cinematic Agency Foundation

A high-end development environment for modern agency websites.

## Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS v4 + Shadcn UI
- **Animations**: Framer Motion & GSAP
- **Smooth Scroll**: Lenis
- **3D/Visuals**: Three.js (React Three Fiber/Drei)
- **Icons**: Lucide React
- **Theme**: Dark mode by default (next-themes)

## Folder Structure
- `app/`: Next.js App Router (pages & layouts)
- `components/`: Reusable UI components
  - `ui/`: Shadcn UI components
  - `canvas/`: Three.js/R3F components
- `sections/`: High-level page sections (Hero, About, etc.)
- `animations/`: Reusable Framer Motion variants
- `hooks/`: Custom React hooks
- `lib/`: Utility functions and third-party configs (GSAP, etc.)
- `styles/`: Global and component-specific styles
- `public/assets/`: Static assets (images, videos, models)

## Getting Started
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Lint and format: `npm run lint`

## Features
- **Smooth Scroll**: Integrated via `SmoothScroll` component in `layout.tsx`.
- **Global Dark Theme**: Configured with `ThemeProvider`.
- **GSAP & ScrollTrigger**: Pre-configured in `lib/gsap.ts`.
- **Framer Motion**: Ready-to-use variants in `animations/variants.ts`.
- **Performance**: Optimized with dynamic imports and clean architecture.
