import JSZip from 'jszip';
import { CompressedFileResult } from './image-utils';

/**
 * Packages multiple files into a single downloadable .zip archive.
 */
export async function createZipArchive(
  files: { name: string; blob: Blob | File }[],
  zipFileName: string = 'rollix-compressed-files.zip',
  onProgress?: (percent: number) => void
): Promise<{ blob: Blob; url: string; fileName: string }> {
  const zip = new JSZip();

  files.forEach(({ name, blob }) => {
    // Prevent filename collisions inside ZIP
    zip.file(name, blob);
  });

  const zipBlob = await zip.generateAsync(
    {
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    },
    (metadata) => {
      if (onProgress) {
        onProgress(Math.round(metadata.percent));
      }
    }
  );

  const url = URL.createObjectURL(zipBlob);

  return {
    blob: zipBlob,
    url,
    fileName: zipFileName,
  };
}

/**
 * Compresses any batch of files into a Zip file for the generic zip compressor tool.
 */
export async function compressGenericFilesToZip(
  files: File[],
  zipName: string = 'compressed-archive.zip',
  onProgress?: (percent: number) => void
): Promise<CompressedFileResult> {
  const totalOriginalSize = files.reduce((acc, f) => acc + f.size, 0);

  const zip = new JSZip();
  files.forEach((file) => {
    zip.file(file.name, file);
  });

  const zipBlob = await zip.generateAsync(
    {
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 },
    },
    (metadata) => {
      if (onProgress) {
        onProgress(Math.round(metadata.percent));
      }
    }
  );

  const zipFile = new File([zipBlob], zipName, {
    type: 'application/zip',
    lastModified: Date.now(),
  });

  const compressedSize = zipFile.size;
  const blobUrl = URL.createObjectURL(zipFile);
  const savedBytes = Math.max(0, totalOriginalSize - compressedSize);
  const savedPercentage = totalOriginalSize > 0 ? Math.round((savedBytes / totalOriginalSize) * 100) : 0;

  return {
    file: zipFile,
    originalName: zipName,
    originalSize: totalOriginalSize,
    compressedSize,
    blobUrl,
    savedPercentage,
  };
}
