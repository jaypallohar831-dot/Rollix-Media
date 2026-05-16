import { NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';
import { AdminAuthError, requireAdmin } from '@/lib/admin-auth';

interface CloudinaryResult {
  public_id: string;
  secure_url: string;
}

const ALLOWED_FOLDERS = new Set(['agency_media', 'portfolio', 'testimonials', 'videos']);
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'video/mp4',
  'video/webm',
  'video/quicktime',
]);
const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const formData = await request.formData();
    const file = formData.get('file');
    const requestedFolder = formData.get('folder');
    const folder = typeof requestedFolder === 'string' ? requestedFolder : 'agency_media';

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!ALLOWED_FOLDERS.has(folder)) {
      return NextResponse.json({ error: 'Invalid upload folder' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 415 });
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: 'File is too large' }, { status: 413 });
    }

    const result = await uploadImage(file, folder) as CloudinaryResult;

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error: unknown) {
    if (error instanceof AdminAuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error('Upload Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
