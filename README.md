# Ampledia Web Platform

> Official website and administrative CMS for **Ampledia** (formerly Rollix Media) — Digital | Creative | Growth.

## Overview
Ampledia is a premier digital agency in Bhilwara, Rajasthan, specializing in strategic performance marketing, creative video production, custom web development, SEO, and brand growth.

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS
- **Backend / Database**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env.local`
4. Run development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Build & Quality Checks

```bash
# Type check
npx tsc --noEmit

# Production build
npm run build
```
