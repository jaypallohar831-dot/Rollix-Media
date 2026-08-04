/**
 * IndexNow API Route — Instantly pushes URLs to Bing, Yandex, and other search engines.
 * Unlike Google (which relies on sitemap crawling), IndexNow provides INSTANT indexing.
 * 
 * Usage: POST /api/indexnow with { urls: ["/services/video-editing", "/portfolio/my-project"] }
 * Or GET /api/indexnow to push ALL site pages at once.
 */
import { NextRequest, NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/seo.config';

// IndexNow key — also needs to be placed as a static file at /public/<key>.txt
const INDEXNOW_KEY = 'rollixmedia2024indexnow';

const ALL_STATIC_URLS = [
  '/',
  '/about',
  '/services',
  '/services/wedding-shooting',
  '/services/videography',
  '/services/video-editing',
  '/services/social-media',
  '/services/web-design',
  '/services/graphic-design',
  '/services/seo-dominance',
  '/services/digital-marketing',
  '/portfolio',
  '/contact',
  '/tools/compress',
  '/case-studies/vision-classes-bhilwara',
  '/privacy-policy',
  '/terms',
];

// GET: Push ALL site pages to IndexNow
export async function GET() {
  try {
    const fullUrls = ALL_STATIC_URLS.map((path) => `${SITE_URL}${path}`);

    const payload = {
      host: new URL(SITE_URL).hostname,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: fullUrls,
    };

    // Submit to IndexNow API (Bing endpoint serves Bing + Yandex + other partners)
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    // Also ping Google's sitemap notification endpoint
    await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap.xml`)}`);

    return NextResponse.json({
      success: true,
      indexed: fullUrls.length,
      indexNowStatus: response.status,
      googlePinged: true,
      message: `Submitted ${fullUrls.length} URLs to IndexNow (Bing/Yandex) and pinged Google sitemap.`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

// POST: Push specific URLs to IndexNow
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const urls: string[] = body.urls || [];

    if (urls.length === 0) {
      return NextResponse.json({ success: false, error: 'No URLs provided' }, { status: 400 });
    }

    const fullUrls = urls.map((path: string) =>
      path.startsWith('http') ? path : `${SITE_URL}${path}`
    );

    const payload = {
      host: new URL(SITE_URL).hostname,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: fullUrls,
    };

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      success: true,
      indexed: fullUrls.length,
      indexNowStatus: response.status,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
