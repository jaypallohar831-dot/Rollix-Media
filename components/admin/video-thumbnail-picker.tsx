'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { Camera, Play, Pause, Loader2, SkipBack, SkipForward, CheckCircle2 } from 'lucide-react';

interface VideoThumbnailPickerProps {
  videoUrl: string;
  onThumbnailCaptured: (thumbnailUrl: string) => void;
}


export default function VideoThumbnailPicker({ 
  videoUrl, 
  onThumbnailCaptured
}: VideoThumbnailPickerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [capturing, setCapturing] = useState(false);
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


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

  const captureFrame = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    setCapturing(true);
    setError(null);

    try {
      // ── Canvas capture ──
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

      // Upload to Supabase Storage
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      
      const filename = `portfolio/thumb_${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;

      const { data, error } = await supabase.storage
        .from('media')
        .upload(filename, blob, { cacheControl: '3600', upsert: false, contentType: 'image/jpeg' });

      if (error) {
        throw new Error(error.message);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(data.path);

      setCapturedPreview(publicUrl);
      onThumbnailCaptured(publicUrl);

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

  // Transform Cloudinary URLs to ensure browser compatibility (H.264/WebM)
  const getPlayableSrc = (url: string) => {
    if (!url) return url;
    return url;
  };

  const playableSrc = getPlayableSrc(videoUrl);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Camera className="h-4 w-4 text-cinematic-orange" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
          Pick Thumbnail from Video
        </span>
      </div>

      {/* Video Player */}
      <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-black/60 backdrop-blur-sm">
        <div className="relative aspect-video">
          <video
            ref={videoRef}
            src={playableSrc}
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
