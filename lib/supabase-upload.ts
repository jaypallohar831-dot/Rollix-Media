import { SupabaseClient } from '@supabase/supabase-js';
import { UPLOAD_CONFIG } from './upload-config';
import { validateVideoFile, validateImageFile, verifyUploadAuth } from './media-validator';

export interface UploadOptions {
  contentType?: string;
  mediaType?: 'video' | 'image' | 'auto';
  skipValidation?: boolean;
  skipAuthCheck?: boolean;
}

/**
 * Uploads a file to Supabase Storage with automatic validation, long-lived CDN cache control,
 * and authenticated permission checks.
 */
export async function uploadToSupabaseStorage(
  supabase: SupabaseClient,
  filename: string,
  file: File | Blob,
  options?: UploadOptions | string
): Promise<string> {
  // Backwards compatibility if 4th arg was contentType string
  const opts: UploadOptions = typeof options === 'string' ? { contentType: options } : options || {};

  // 1. Authenticated permission check
  if (!opts.skipAuthCheck) {
    const authCheck = await verifyUploadAuth(supabase);
    if (!authCheck.authenticated) {
      throw new Error(authCheck.error || 'Unauthorized: Please log in to upload files.');
    }
  }

  // 2. Client-side media validation
  if (!opts.skipValidation && file instanceof File) {
    const isVideo = opts.mediaType === 'video' || (opts.mediaType !== 'image' && file.type.startsWith('video/'));
    const isImage = opts.mediaType === 'image' || (opts.mediaType !== 'video' && file.type.startsWith('image/'));

    if (isVideo) {
      const result = await validateVideoFile(file);
      if (!result.valid) {
        throw new Error(result.error);
      }
    } else if (isImage) {
      const result = validateImageFile(file);
      if (!result.valid) {
        throw new Error(result.error);
      }
    }
  }

  const uploadOptions = {
    cacheControl: UPLOAD_CONFIG.storage.cacheControl,
    upsert: false,
    contentType: opts.contentType || (file instanceof File ? file.type : undefined),
  };

  const targetBuckets = ['media', 'portfolio', 'uploads', 'public', 'assets'];

  let lastError: Error | null = null;

  for (const bucket of targetBuckets) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filename, file, uploadOptions);

      if (!error && data) {
        const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(data.path);
        return publicUrl;
      }

      if (error) {
        lastError = error;
        const { isSupabaseQuotaError } = await import('./supabase-error-handler');
        if (isSupabaseQuotaError(error)) {
          throw new Error('Uploads are temporarily restricted: Supabase project has exceeded its egress quota. Please check the Supabase dashboard.');
        }
        // If bucket does not exist, try next bucket in fallback list
        if (
          error.message?.toLowerCase().includes('not found') ||
          error.message?.toLowerCase().includes('bucket')
        ) {
          continue;
        }
        throw error;
      }
    } catch (e: unknown) {
      const err = e instanceof Error ? e : new Error(String(e));
      lastError = err;
      const { isSupabaseQuotaError } = await import('./supabase-error-handler');
      if (isSupabaseQuotaError(err)) {
        throw new Error('Uploads are temporarily restricted: Supabase project has exceeded its egress quota. Please check the Supabase dashboard.');
      }
      if (
        err.message?.toLowerCase().includes('not found') ||
        err.message?.toLowerCase().includes('bucket')
      ) {
        continue;
      }
      throw err;
    }
  }

  throw (
    lastError ||
    new Error(
      'Supabase Storage bucket not found. Please ensure a public bucket named "media" exists in your Supabase Dashboard.'
    )
  );
}
