import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoUrl = searchParams.get('url');

  if (!videoUrl) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  try {
    const range = req.headers.get('range');
    const fetchHeaders: Record<string, string> = {};
    if (range) {
      fetchHeaders['Range'] = range;
    }

    const res = await fetch(videoUrl, {
      headers: fetchHeaders,
    });

    if (!res.ok && res.status !== 206) {
      return NextResponse.json({ error: `Failed to fetch video: ${res.statusText}` }, { status: res.status });
    }

    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', res.headers.get('Content-Type') || 'video/mp4');
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    
    if (res.headers.has('Content-Length')) {
      responseHeaders.set('Content-Length', res.headers.get('Content-Length')!);
    }
    if (res.headers.has('Content-Range')) {
      responseHeaders.set('Content-Range', res.headers.get('Content-Range')!);
    }
    if (res.headers.has('Accept-Ranges')) {
      responseHeaders.set('Accept-Ranges', res.headers.get('Accept-Ranges') || 'bytes');
    }

    return new NextResponse(res.body, {
      status: res.status,
      headers: responseHeaders,
    });
  } catch (err) {
    console.error('Error proxying video:', err);
    return NextResponse.json({ error: 'Failed to proxy video' }, { status: 500 });
  }
}
