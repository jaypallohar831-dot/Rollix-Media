import { CompressedFileResult } from './image-utils';

export interface AudioCompressionOptions {
  bitrateKbps: number; // e.g., 64, 96, 128
  sampleRate: number; // e.g., 22050, 32000, 44100
  channels: 1 | 2; // 1 = Mono, 2 = Stereo
}

/**
 * Compresses audio file client-side using Web Audio API and OfflineAudioContext resampling.
 */
export async function compressSingleAudio(
  file: File,
  options: AudioCompressionOptions,
  onProgress?: (progress: number) => void
): Promise<CompressedFileResult> {
  const originalSize = file.size;
  const originalName = file.name;

  try {
    if (onProgress) onProgress(15);

    const arrayBuffer = await file.arrayBuffer();
    if (onProgress) onProgress(35);

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const tempAudioCtx = new AudioContextClass();

    const audioBuffer = await tempAudioCtx.decodeAudioData(arrayBuffer);
    if (onProgress) onProgress(60);

    tempAudioCtx.close();

    // Render resampled audio buffer
    const offlineCtx = new OfflineAudioContext(
      options.channels,
      Math.ceil((audioBuffer.duration * options.sampleRate)),
      options.sampleRate
    );

    const source = offlineCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(offlineCtx.destination);
    source.start(0);

    const renderedBuffer = await offlineCtx.startRendering();
    if (onProgress) onProgress(85);

    // Convert AudioBuffer to WAV Blob
    const wavBlob = audioBufferToWav(renderedBuffer);

    const newName = originalName.replace(/\.[^/.]+$/, '') + '_compressed.wav';
    const compressedFile = new File([wavBlob], newName, {
      type: 'audio/wav',
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
    const errorMessage = error instanceof Error ? error.message : 'Failed to compress audio file.';
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

/**
 * Encodes AudioBuffer into optimized WAV Blob
 */
function audioBufferToWav(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;

  const result = interleave(buffer);
  const dataLength = result.length * 2;
  const bufferLength = 44 + dataLength;

  const arrayBuffer = new ArrayBuffer(bufferLength);
  const view = new DataView(arrayBuffer);

  /* RIFF identifier */
  writeString(view, 0, 'RIFF');
  /* RIFF chunk length */
  view.setUint32(4, 36 + dataLength, true);
  /* RIFF type */
  writeString(view, 8, 'WAVE');
  /* format chunk identifier */
  writeString(view, 12, 'fmt ');
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw) */
  view.setUint16(20, format, true);
  /* channel count */
  view.setUint16(22, numChannels, true);
  /* sample rate */
  view.setUint32(24, sampleRate, true);
  /* byte rate (sample rate * block align) */
  view.setUint32(28, sampleRate * numChannels * (bitDepth / 8), true);
  /* block align (channel count * bytes per sample) */
  view.setUint16(32, numChannels * (bitDepth / 8), true);
  /* bits per sample */
  view.setUint16(34, bitDepth, true);
  /* data chunk identifier */
  writeString(view, 36, 'data');
  /* data chunk length */
  view.setUint32(40, dataLength, true);

  // Write PCM audio samples
  let offset = 44;
  for (let i = 0; i < result.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, result[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' });
}

function interleave(buffer: AudioBuffer): Float32Array {
  const channels = buffer.numberOfChannels;
  if (channels === 1) return buffer.getChannelData(0);

  const left = buffer.getChannelData(0);
  const right = buffer.getChannelData(1);
  const length = left.length + right.length;
  const result = new Float32Array(length);

  let inputIndex = 0;
  let index = 0;

  while (index < length) {
    result[index++] = left[inputIndex];
    result[index++] = right[inputIndex];
    inputIndex++;
  }
  return result;
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}
