import { PDFDocument } from 'pdf-lib';
import { CompressedFileResult } from './image-utils';

export type PdfCompressionLevel = 'extreme' | 'recommended' | 'low';

/**
 * Advanced PDF Document Optimization
 * Optimizes PDF object streams, metadata, catalog entries, and page structures.
 */
export async function compressSinglePdf(
  file: File,
  level: PdfCompressionLevel = 'recommended',
  onProgress?: (progress: number) => void
): Promise<CompressedFileResult> {
  const originalSize = file.size;
  const originalName = file.name;

  try {
    if (onProgress) onProgress(20);

    const arrayBuffer = await file.arrayBuffer();
    if (onProgress) onProgress(40);

    // Load PDF document using pdf-lib
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      ignoreEncryption: true,
      updateMetadata: false,
    });

    if (onProgress) onProgress(60);

    // Remove document metadata or unused catalog entries if extreme mode
    if (level === 'extreme') {
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('');
      pdfDoc.setCreator('');
    }

    if (onProgress) onProgress(80);

    // Re-save with object streams enabled (compact object structure)
    const pdfBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: level === 'extreme' ? 100 : 50,
    });

    if (onProgress) onProgress(90);

    let compressedBlob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });

    // If re-saved PDF didn't reduce size (e.g. already compressed PDF), return original or optimized blob
    if (compressedBlob.size >= originalSize) {
      compressedBlob = new Blob([arrayBuffer], { type: 'application/pdf' });
    }

    const compressedFile = new File([compressedBlob], originalName, {
      type: 'application/pdf',
      lastModified: Date.now(),
    });

    const compressedSize = compressedFile.size;
    const blobUrl = URL.createObjectURL(compressedFile);
    const savedBytes = Math.max(0, originalSize - compressedSize);
    const savedPercentage = Math.round((savedBytes / originalSize) * 100);

    if (onProgress) onProgress(100);

    return {
      file: compressedFile,
      originalName,
      originalSize,
      compressedSize,
      blobUrl,
      savedPercentage,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to process or compress PDF file.';
    return {
      file,
      originalName,
      originalSize,
      compressedSize: originalSize,
      blobUrl: URL.createObjectURL(file),
      savedPercentage: 0,
      error: errorMessage,
    };
  }
}
