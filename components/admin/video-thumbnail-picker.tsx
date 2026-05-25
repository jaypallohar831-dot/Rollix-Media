'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { Camera, Play, Pause, Loader2, SkipBack, SkipForward, CheckCircle2 } from 'lucide-react';

interface VideoThumbnailPickerProps {
  videoUrl: string;
  onThumbnailCaptured: (thumbnailUrl: string) => void;
  currentThumbnail?: string;
}

/**
 * Checks if a URL is a Cloudinary video URL
 */
function isCloudinaryVideoUrl(url: string) {
  return url.includes('res.cloudinary.com') && url.includes('/video/upload/');
}

export default function VideoThumbnailPicker({ 
  videoUrl, 
  onThumbnailCaptured, 
  currentThumbnail 
}: VideoThumbnailPickerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [capturing, setCapturing] = useState(false);
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isCloudinary = isCloudinaryVideoUrl(videoUrl);

  // Update time as video plays
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => {
      setDuration(video.duration);
      // Seek to 1 second for a nice initial frame
      video.currentTime = Math.min(1, video.duration);
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('ended', onEnded);
    };
  }, [videoUrl]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }, []);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const time = parseFloat(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  }, []);

  const skipFrames = useCallback((seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    const newTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
    video.currentTime = newTime;
    setCurrentTime(newTime);
  }, []);

  /**
   * Capture the current frame using Cloudinary URL transformation.
   * Transforms the video URL into an image URL at a specific time offset.
   * Falls back to canvas capture for non-Cloudinary URLs.
   */
  const captureFrame = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    setCapturing(true);
    setError(null);

    const time = video.currentTime;

    try {
      if (isCloudinary) {
        // ── Cloudinary approach: URL transformation (reliable, no CORS issues) ──
        // Replace extension with .jpg
        const withoutExt = videoUrl.substring(0, videoUrl.lastIndexOf('.'));
        const jpgUrl = withoutExt + '.jpg';
        
        // Insert transform after /upload/
        const transform = `so_${time.toFixed(2)},w_1280,c_limit,q_auto,f_jpg/`;
        const thumbnailUrl = jpgUrl.replace('/upload/', `/upload/${transform}`);

        // Verify the URL works (Cloudinary generates the image on-the-fly)
        const checkRes = await fetch(thumbnailUrl, { method: 'HEAD' });
        if (!checkRes.ok) {
          throw new Error('Cloudinary failed to generate thumbnail from video');
        }

        setCapturedPreview(thumbnailUrl);
        onThumbnailCaptured(thumbnailUrl);
      } else {
        // ── Fallback: Canvas capture for non-Cloudinary videos ──
        const canvas = canvasRef.current;
        if (!canvas) throw new Error('Canvas not available');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context not available');

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert to blob
        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => (b ? resolve(b) : reject(new Error('Failed to create image blob'))),
            'image/jpeg',
            0.92
          );
        });

        // Upload to Cloudinary
        const sigRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ folder: 'portfolio' })
        });
        const sigData = await sigRes.json();

        if (!sigData.success) {
          throw new Error(sigData.error || 'Failed to get upload signature');
        }

        const uploadData = new FormData();
        uploadData.append('file', blob, 'video-thumbnail.jpg');
        uploadData.append('api_key', sigData.apiKey);
        uploadData.append('timestamp', sigData.timestamp);
        uploadData.append('signature', sigData.signature);
        uploadData.append('folder', sigData.folder);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${sigData.cloudName}/image/upload`,
          { method: 'POST', body: uploadData }
        );
        const uploadResult = await uploadRes.json();

        if (uploadResult.secure_url) {
          setCapturedPreview(uploadResult.secure_url);
          onThumbnailCaptured(uploadResult.secure_url);
        } else {
          throw new Error('Upload failed — no URL returned');
        }
      }
    } catch (err) {
      console.error('Thumbnail capture failed:', err);
      setError(err instanceof Error ? err.message : 'Capture failed');
    } finally {
      setCapturing(false);
    }
  }, [videoUrl, onThumbnailCaptured]);

  const formatTime = (t: number) => {
    const mins = Math.floor(t / 60);
    const secs = Math.floor(t % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Camera className="h-4 w-4 text-cinematic-orange" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
          Pick Thumbnail from Video
        </span>
        {isCloudinary && (
          <span className="ml-auto text-[9px] font-mono text-emerald-500/60 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            Cloudinary ✓
          </span>
        )}
      </div>

      {/* Video Player */}
      <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-black/60 backdrop-blur-sm">
        <div className="relative aspect-video">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={videoRef}
            src={videoUrl}
            className="h-full w-full object-contain bg-black"
            preload="metadata"
            playsInline
            muted
          />

          {/* Play overlay */}
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity"
          >
            {isPlaying ? (
              <Pause className="h-12 w-12 text-white/80 drop-shadow-lg" />
            ) : (
              <Play className="h-12 w-12 text-white/80 drop-shadow-lg" />
            )}
          </button>
        </div>

        {/* Controls Bar */}
        <div className="px-4 py-3 space-y-2 bg-white/[0.03] border-t border-white/[0.06]">
          {/* Timeline Scrubber */}
          <div className="relative group">
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.04}
              value={currentTime}
              onChange={handleSeek}
              className="video-scrubber w-full"
            />
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {/* Skip back */}
              <button
                type="button"
                onClick={() => skipFrames(-0.5)}
                className="p-1.5 rounded-lg hover:bg-white/[0.06] text-muted-foreground hover:text-white transition-all"
                title="Back 0.5s"
              >
                <SkipBack className="h-3.5 w-3.5" />
              </button>

              {/* Play/Pause */}
              <button
                type="button"
                onClick={togglePlay}
                className="p-1.5 rounded-lg hover:bg-white/[0.06] text-muted-foreground hover:text-white transition-all"
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              </button>

              {/* Skip forward */}
              <button
                type="button"
                onClick={() => skipFrames(0.5)}
                className="p-1.5 rounded-lg hover:bg-white/[0.06] text-muted-foreground hover:text-white transition-all"
                title="Forward 0.5s"
              >
                <SkipForward className="h-3.5 w-3.5" />
              </button>

              {/* Time display */}
              <span className="ml-2 text-[10px] font-mono text-muted-foreground/60">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Capture button */}
            <button
              type="button"
              onClick={captureFrame}
              disabled={capturing}
              className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-cinematic-orange/10 hover:bg-cinematic-orange/20 border border-cinematic-orange/20 hover:border-cinematic-orange/40 text-cinematic-orange transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {capturing ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Camera className="h-3.5 w-3.5" />
              )}
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {capturing ? 'Capturing...' : 'Use as Thumbnail'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Captured preview */}
      {capturedPreview && !error && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span className="text-[11px] text-emerald-300">
            Thumbnail captured successfully! Preview updated in &ldquo;Project Cover&rdquo;.
          </span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
          <span className="text-[11px] text-red-300">⚠ {error}</span>
        </div>
      )}

      {/* Hidden canvas for fallback frame capture (non-Cloudinary videos) */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
