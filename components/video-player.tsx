'use client';

import { useRef, useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Maximize2, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  /** Aspect ratio class */
  aspect?: string;
  /** Auto-play on mount (muted) */
  autoPlay?: boolean;
  /** Show controls overlay */
  showControls?: boolean;
  /** Control video scaling */
  objectFit?: 'cover' | 'contain';
}

export const VideoPlayer = memo(function VideoPlayer({
  src,
  poster,
  className,
  aspect = 'aspect-video',
  autoPlay = false,
  showControls = true,
  objectFit = 'cover',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const hideTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setProgress((video.currentTime / video.duration) * 100 || 0);
  }, []);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  }, []);

  const handleFullscreen = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  }, []);

  const handleMouseMove = useCallback(() => {
    setShowOverlay(true);
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => {
      if (isPlaying) setShowOverlay(false);
    }, 2500);
  }, [isPlaying]);

  return (
    <div
      className={cn(
        'group/player relative overflow-hidden rounded-xl bg-black sm:rounded-2xl',
        aspect,
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowOverlay(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={isMuted}
        autoPlay={autoPlay}
        loop
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
        className={cn(
          'absolute inset-0 h-full w-full cursor-pointer',
          objectFit === 'contain' ? 'object-contain' : 'object-cover'
        )}
      />

      {/* Cinematic vignette overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)]" />

      {showControls && (
        <AnimatePresence>
          {(showOverlay || !isPlaying) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-10 flex flex-col justify-between"
            >
              {/* Center play/pause */}
              <div className="flex flex-1 items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-cinematic-orange/40 hover:bg-black/60 sm:h-20 sm:w-20"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" />
                  ) : (
                    <Play className="ml-1 h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" />
                  )}
                </button>
              </div>

              {/* Bottom controls bar */}
              <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-4 pt-12 sm:px-6 sm:pb-5">
                {/* Progress bar */}
                <div
                  className="mb-3 h-1 w-full cursor-pointer rounded-full bg-white/10 transition-all hover:h-1.5"
                  onClick={handleSeek}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cinematic-orange to-cinematic-orange/60 transition-[width] duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Controls row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="text-white/70 transition-colors hover:text-white"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" fill="currentColor" />
                      )}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="text-white/70 transition-colors hover:text-white"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  <button
                    onClick={handleFullscreen}
                    className="text-white/70 transition-colors hover:text-white"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
});
