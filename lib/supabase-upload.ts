import { SupabaseClient } from '@supabase/supabase-js';

export async function uploadToSupabaseStorage(
  supabase: SupabaseClient,
  filename: string,
  file: File | Blob,
  contentType?: string
): Promise<string> {
  const options = {
    cacheControl: '3600',
    upsert: false,
    contentType: contentType || (file instanceof File ? file.type : undefined),
  };

  let targetBuckets = ['media', 'portfolio', 'uploads', 'public', 'assets'];

  // 1. Try listing existing buckets dynamically
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    if (buckets && buckets.length > 0) {
      const bucketNames = buckets.map((b) => b.name);
      targetBuckets = Array.from(new Set([...bucketNames, ...targetBuckets]));
    }
  } catch (e) {
    console.warn('Could not list buckets dynamically, using fallback list:', e);
  }

  let lastError: any = null;

  for (const bucket of targetBuckets) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filename, file, options);

      if (!error && data) {
        const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(data.path);
        return publicUrl;
      }

      if (error) {
        lastError = error;
        if (
          error.message?.toLowerCase().includes('not found') ||
          error.message?.toLowerCase().includes('bucket')
        ) {
          continue;
        }
        throw error;
      }
    } catch (e: any) {
      lastError = e;
      if (
        e.message?.toLowerCase().includes('not found') ||
        e.message?.toLowerCase().includes('bucket')
      ) {
        continue;
      }
      throw e;
    }
  }

  throw (
    lastError ||
    new Error(
      'Supabase Storage bucket not found. Please create a public bucket named "media" in your Supabase Dashboard.'
    )
  );
}
