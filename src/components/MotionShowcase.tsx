// ─────────────────────────────────────────────
// SYMMETRY — Motion Graphics Theater
// Flagship Showcases: Samsung, Claude AI & Spotify
// ─────────────────────────────────────────────

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Maximize2, Focus, Film, Volume2, VolumeX } from 'lucide-react';
import { getOptimizedMediaUrl } from '@/utils/mediaUrl';

interface ShowcaseItem {
  id: string;
  title: string;
  badge: string;
  format: string;
  isVertical: boolean;
  videoSrc: string;
  description: string;
  specs: string[];
  techStack: string;
}

const showcases: ShowcaseItem[] = [
  {
    id: 'samsung-galaxy',
    title: 'Samsung Galaxy S26 Ultra — Reimagined Product Cinema',
    badge: 'Samsung Mobile // Motion Graphics',
    format: '9:16 Vertical Mobile Master',
    isVertical: true,
    videoSrc: '/media/samsung-galaxy-s26.mp4',
    description: 'Cinematic hardware lighting, precision titanium framing, and fluid camera choreography re-architecting the flagship smartphone reveal.',
    specs: ['9:16 Native Vertical', '60 FPS Master', 'Specular Light Rigs'],
    techStack: 'Cinema 4D + After Effects + Symmetry Audio Stinger',
  },
  {
    id: 'claude-motion',
    title: 'Claude AI — Neural Architecture & Kinetic Motion',
    badge: 'Anthropic Claude // Brand System',
    format: '16:9 Cinematic Landscape',
    isVertical: false,
    videoSrc: '/media/claude-motion-graphics.mp4',
    description: 'Kinetic typography, generative token streams, and dimensional spatial branding visualizing frontier AI reasoning capability.',
    specs: ['16:9 Landscape Master', 'Vector Geometry', 'Multi-Scale Keyframes'],
    techStack: 'Custom Motion Nodes + After Effects + Sound Design',
  },
  {
    id: 'spotify-motion',
    title: 'Spotify — Soundwave Dynamics & Wrapped Identity',
    badge: 'Spotify // Audio-Reactive Motion',
    format: '16:9 Cinematic Landscape',
    isVertical: false,
    videoSrc: '/media/spotify-motion-graphics.mp4',
    description: 'Dynamic audio-driven waveforms, kinetic color-cycling, and synchronized beat-matched rhythm built for global entertainment scale.',
    specs: ['16:9 Audio Frequency Sync', 'Kinetic Rhythm', 'Brand Color Waves'],
    techStack: 'After Effects + Audio-Reactive Expressions',
  },
];

export default function MotionShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const current = showcases[activeTab];

  // Defer video loading and pause playback when off-screen to save 4MB initial payload & GPU bandwidth
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (videoRef.current) {
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // When tab changes, reload video if in view
  useEffect(() => {
    if (videoRef.current && isInView) {
      videoRef.current.load();
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [activeTab, isInView]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section ref={sectionRef} id="showreel" className="relative py-32 px-6 bg-[#030303] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#b4b4c0] mb-4">
            <Film className="w-3.5 h-3.5 text-white" />
            <span>STUDIO BENCHMARK SHOWCASE</span>
          </div>
          <h2 className="pop-heading font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            MOTION AT THE <span className="chrome-text">SPEED OF THOUGHT</span>
          </h2>
          <p className="font-body text-[#b4b4c0] text-sm sm:text-base leading-relaxed">
            Explore our iconic motion graphics created for world-leading brands: Samsung, Claude AI, and Spotify.
          </p>
        </div>

        {/* Interactive Showcase Theater */}
        <div className="glass-panel rounded-3xl p-4 sm:p-8 border border-white/15 shadow-2xl relative overflow-hidden">
          {/* Main Video Viewport - Adapts smoothly between 9:16 Vertical and 16:9 Landscape */}
          <div
            className={`relative rounded-2xl overflow-hidden bg-black border border-white/10 group mb-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex items-center justify-center transition-all duration-500 ${
              current.isVertical ? 'min-h-[580px] py-6' : 'aspect-video'
            }`}
          >
            {/* Ambient Lighting Atmosphere (Hardware accelerated zero-cost GPU glow) */}
            <div className="hidden md:block absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_65%)] pointer-events-none" />

            {/* Video Container (Strictly 9:16 for vertical, 16:9 for landscape) */}
            <div
              className={`relative z-10 transition-all duration-500 ${
                current.isVertical
                  ? 'w-full max-w-[325px] aspect-[9/16] rounded-2xl overflow-hidden border border-white/30 shadow-[0_0_60px_rgba(255,255,255,0.2)] bg-black'
                  : 'w-full h-full flex items-center justify-center'
              }`}
            >
              <video
                ref={videoRef}
                src={isInView ? getOptimizedMediaUrl(current.videoSrc, { isVideo: true }) : undefined}
                loop
                muted={isMuted}
                playsInline
                preload="none"
                aria-label={`Motion showcase: ${current.title}`}
                title={current.title}
                onError={(e) => {
                  const target = e.currentTarget;
                  const local = current.videoSrc.startsWith('/') ? current.videoSrc : `/${current.videoSrc}`;
                  if (!target.src.endsWith(local)) {
                    target.src = local;
                  }
                }}
                className={`w-full h-full ${current.isVertical ? 'object-cover' : 'object-contain'} bg-black`}
              >
                <track kind="captions" src="data:text/vtt,WEBVTT" label="English" srcLang="en" default />
              </video>

              {/* Play Overlay when paused or awaiting first frame */}
              {!isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all cursor-pointer z-15 hover:bg-black/20"
                >
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 translate-x-0.5 fill-white" />
                  </div>
                </div>
              )}

              {/* Controls Overlay */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2.5 z-20">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? `Unmute audio for ${current.title}` : `Mute audio for ${current.title}`}
                  className="p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-white hover:text-black border border-white/20 backdrop-blur-md text-white transition-all cursor-pointer shadow-lg"
                  title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />}
                </button>
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? `Pause video for ${current.title}` : `Play video for ${current.title}`}
                  className="p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-white hover:text-black border border-white/20 backdrop-blur-md text-white transition-all cursor-pointer shadow-lg"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </button>
                <button
                  onClick={handleFullscreen}
                  aria-label={`View ${current.title} in fullscreen`}
                  className="p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-white hover:text-black border border-white/20 backdrop-blur-md text-white transition-all cursor-pointer shadow-lg"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Live Format Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-white/20 backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-white z-20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="uppercase tracking-wider">{current.format}</span>
              </div>
            </div>
          </div>

          {/* Selector Tabs & Specs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-white/10" role="tablist">
            {showcases.map((item, idx) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={activeTab === idx}
                aria-label={`Switch to showcase: ${item.title}`}
                onClick={() => setActiveTab(idx)}
                className={`text-left p-5 rounded-2xl transition-all duration-300 cursor-pointer ${
                  activeTab === idx
                    ? 'bg-white/[0.08] border border-white/30 shadow-lg scale-[1.02]'
                    : 'bg-transparent hover:bg-white/[0.03] border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#a5a5b5]">
                    {item.badge}
                  </span>
                  {activeTab === idx && <Focus className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className="block font-display font-bold text-base text-white mb-2 leading-snug">
                  {item.title}
                </span>
                <p className="font-body text-xs text-[#b0b0c0] leading-relaxed mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.specs.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-[#b0b0bc] border border-white/10"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Drive Vault Redirection Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#b4b4c4]">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Full ProRes 4444XQ masters & project archives accessible in Google Drive</span>
            </div>

            <a
              href="https://drive.google.com/drive/folders/1X8UtAyRPrM2zxo1IJiGWY4afLvLYOCx8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white hover:text-black border border-white/20 text-xs font-mono uppercase tracking-wider text-white transition-all group"
            >
              <span>Explore Master Drive Vault</span>
              <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
