import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { AdminAuthError, requireAdmin } from '@/lib/admin-auth';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_FOLDERS = new Set(['agency_media', 'portfolio', 'testimonials', 'videos']);

export async function POST(request: Request) {
  try {
    await requireAdmin();

    let folder = 'agency_media';
    try {
      const body = await request.json();
      if (body.folder && typeof body.folder === 'string') {
        folder = body.folder;
      }
    } catch {
      // Fallback if not JSON or no body
    }

    if (!ALLOWED_FOLDERS.has(folder)) {
      return NextResponse.json({ error: 'Invalid upload folder' }, { status: 400 });
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
      success: true,
      timestamp,
      signature,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder
    });
  } catch (error: unknown) {
    if (error instanceof AdminAuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error('Signature Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
