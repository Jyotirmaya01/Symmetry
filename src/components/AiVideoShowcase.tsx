// ─────────────────────────────────────────────
// SYMMETRY — AI Video Production & Commercial Gallery
// Preserves Native Formats: Strictly 9:16 Vertical for Reels/Social, 16:9 for Cinema
// Featuring: Jewellery Brand Ad, Yapi Shower Gel, 3-Star Bakery, Spotify, Netflix & Coffee
// All cards include direct redirection to Project Archives on Google Drive
// ─────────────────────────────────────────────

import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Smartphone, Monitor, Video, ArrowUpRight, ExternalLink } from 'lucide-react';
import { getOptimizedMediaUrl } from '@/utils/mediaUrl';

const MASTER_DRIVE_URL = 'https://drive.google.com/drive/folders/1X8UtAyRPrM2zxo1IJiGWY4afLvLYOCx8';
const JEWELLERY_DRIVE_URL = 'https://drive.google.com/drive/folders/1AM5MOTOaYqnVakOe-OZgjc9OoXMbJGEh';

interface CommercialVideo {
  id: string;
  title: string;
  client: string;
  category: string;
  format: '9:16' | '16:9';
  formatLabel: string;
  videoSrc: string;
  metric: string;
  metricLabel: string;
  description: string;
  tags: string[];
  projectUrl: string;
}

const commercialVideos: CommercialVideo[] = [
  // ─── 9:16 VERTICAL COMMERCIAL REELS ───
  {
    id: 'jewellery-brand-ad',
    title: 'Aura Haute Joaillerie — High-Carat Diamond & Gold Ring Cinema',
    client: 'Aura Fine Jewelry',
    category: 'Luxury Goods & Jewelry AI Ad',
    format: '9:16',
    formatLabel: '9:16 Vertical Reel',
    videoSrc: '/media/jewellery-brand-ad.mp4',
    metric: '5.2x',
    metricLabel: 'ROAS on Meta & TikTok',
    description: 'Specular gemstone refraction, microscopic gold grain reflection physics, and tactile slow-motion macro rotation engineered for high-ticket luxury acquisition.',
    tags: ['Diamond Caustics', 'Macro Jewelry 4K', 'Luxury E-Commerce'],
    projectUrl: JEWELLERY_DRIVE_URL,
  },
  {
    id: 'yapi-shower-gel',
    title: 'Yapi Luxury Shower Gel — Sensory Water & Droplet Cinema',
    client: 'Yapi Cosmetics',
    category: 'Cosmetics & Skincare AI Ad',
    format: '9:16',
    formatLabel: '9:16 Vertical Reel',
    videoSrc: '/media/yapi-shower-gel.mp4',
    metric: '4.6x',
    metricLabel: 'Ad Conversion Lift',
    description: 'Photorealistic fluid dynamics, splashing water droplets, and high-speed botanical product macro-shots generated for social ad conversion.',
    tags: ['Fluids Simulation', 'Botanical AI', 'E-Commerce Variant'],
    projectUrl: MASTER_DRIVE_URL,
  },
  {
    id: 'bakery-client-ad',
    title: '3-Star Artisan Bakery — Warm Craft & Sensory Cinema',
    client: '3 Star Bakery',
    category: 'Food & Hospitality AI Ad',
    format: '9:16',
    formatLabel: '9:16 Vertical Reel',
    videoSrc: '/media/bakery-client-ad.mp4',
    metric: '+280%',
    metricLabel: 'Foot-Traffic Lift',
    description: 'Warm golden hour lighting, slow-motion steam, rising crust textures, and sensory visual storytelling engineered to evoke appetite and artisan prestige.',
    tags: ['Sensory Visuals', 'Slow-Motion Flour', 'Hyperlocal Ads'],
    projectUrl: MASTER_DRIVE_URL,
  },

  // ─── 16:9 CINEMATIC & BROADCAST COMMERCIALS ───
  {
    id: 'spotify-ad',
    title: 'Spotify — Soundwave Dynamics & Wrapped Motion Campaign',
    client: 'Spotify Global',
    category: 'Audio-Reactive Brand Campaign',
    format: '16:9',
    formatLabel: '16:9 Cinematic Landscape',
    videoSrc: '/media/spotify-motion-graphics.mp4',
    metric: '120M+',
    metricLabel: 'Campaign Impressions',
    description: 'Dynamic beat-matched waveform particles, kinetic color typography, and multi-platform soundwave choreography engineered for viral global reach.',
    tags: ['Audio Frequency Sync', 'Kinetic Rhythm', 'Streaming Campaign'],
    projectUrl: MASTER_DRIVE_URL,
  },
  {
    id: 'netflix-motion',
    title: 'Netflix Motion — Cinematic Streaming Kinetic Reveal',
    client: 'Netflix Campaign',
    category: 'Motion Graphics & Titles',
    format: '16:9',
    formatLabel: '16:9 Cinematic Landscape',
    videoSrc: '/media/netflix-motion.mp4',
    metric: '60 FPS',
    metricLabel: 'Vector Motion Master',
    description: 'Dynamic kinetic ribbon reveals, volumetric red lighting sweeps, and precision audio-synced stinger animations built for high-retention streaming campaigns.',
    tags: ['Broadcast Titles', 'Kinetic Rhythm', 'Sound Sync'],
    projectUrl: MASTER_DRIVE_URL,
  },
  {
    id: 'coffee-ai-ad',
    title: 'Artisan Roast — Rich Espresso & Roast Bean Cinema',
    client: 'Specialty Coffee Brand',
    category: 'CPG & Beverage AI Ad',
    format: '16:9',
    formatLabel: '16:9 Cinematic Landscape',
    videoSrc: '/media/coffee-ai-ad.mp4',
    metric: '+320%',
    metricLabel: 'Social Engagement',
    description: 'High-speed tumbling roasted beans, swirling crema ripples, and luxurious morning atmosphere crafted with generative neural cameras.',
    tags: ['Liquid Crema', 'Studio Lighting', 'Multi-Platform 4K'],
    projectUrl: MASTER_DRIVE_URL,
  },
];

export default function AiVideoShowcase() {
  const [filter, setFilter] = useState<'all' | '9:16' | '16:9'>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [mutedStates, setMutedStates] = useState<Record<string, boolean>>({
    'jewellery-brand-ad': true,
    'yapi-shower-gel': true,
    'bakery-client-ad': true,
    'spotify-ad': true,
    'netflix-motion': true,
    'coffee-ai-ad': true,
  });

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const togglePlay = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRefs.current[id];
    if (!video) return;

    if (playingId === id && !video.paused) {
      video.pause();
      setPlayingId(null);
    } else {
      // Pause other videos
      Object.keys(videoRefs.current).forEach((k) => {
        if (k !== id && videoRefs.current[k]) {
          videoRefs.current[k]?.pause();
        }
      });
      video.play().then(() => setPlayingId(id)).catch(() => {});
    }
  };

  const toggleMute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRefs.current[id];
    if (!video) return;

    video.muted = !video.muted;
    setMutedStates((prev) => ({
      ...prev,
      [id]: video.muted,
    }));
  };

  const handleFullscreen = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRefs.current[id];
    if (video && video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  const filteredVideos = commercialVideos.filter((v) => {
    if (filter === 'all') return true;
    return v.format === filter;
  });

  const verticalVideos = filteredVideos.filter((v) => v.format === '9:16');
  const horizontalVideos = filteredVideos.filter((v) => v.format === '16:9');

  return (
    <section id="ai-videos" className="relative py-32 px-6 bg-[#030303] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-white/10 pb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#9e9ea7] mb-4">
              <Video className="w-3.5 h-3.5 text-white" />
              <span>COMMERCIAL PRODUCTION ENGINE</span>
            </div>
            <h2 className="pop-heading font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              AI VIDEO <span className="chrome-text">COMMERCIAL GALLERY</span>
            </h2>
            <p className="font-body text-[#9e9ea7] max-w-xl text-sm leading-relaxed mt-3">
              Crafted in native display formats — vertical 9:16 for high-converting social campaigns and 16:9 for widescreen cinematic broadcast. Click any card to access its raw project directory.
            </p>
          </div>

          {/* Filter Pills & Vault Link */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <button
                onClick={() => setFilter('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  filter === 'all'
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'text-[#9a9aa8] hover:text-white'
                }`}
              >
                All (6)
              </button>
              <button
                onClick={() => setFilter('9:16')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  filter === '9:16'
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'text-[#9a9aa8] hover:text-white'
                }`}
              >
                <Smartphone className="w-3 h-3" />
                <span>9:16 Vertical (3)</span>
              </button>
              <button
                onClick={() => setFilter('16:9')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  filter === '16:9'
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'text-[#9a9aa8] hover:text-white'
                }`}
              >
                <Monitor className="w-3 h-3" />
                <span>16:9 Cinema (3)</span>
              </button>
            </div>

            <a
              href="#vault"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono text-white transition-all"
            >
              <span>Explore Vault</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 1. NATIVE 9:16 VERTICAL COMMERCIAL REELS SECTION */}
        {verticalVideos.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white tracking-wide">
                    9:16 Vertical Social & E-Commerce Cinema
                  </h3>
                  <p className="font-mono text-xs text-[#8c8c9a] uppercase tracking-wider">
                    Jewellery, Skincare & Hospitality Reels (Never Cropped Horizontally)
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-block font-mono text-xs text-[#828290]">
                {verticalVideos.length} Vertical Productions
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {verticalVideos.map((item) => {
                const isPlaying = playingId === item.id;
                const isMuted = mutedStates[item.id] ?? true;

                return (
                  <div
                    key={item.id}
                    className="glass-panel rounded-3xl p-6 border border-white/15 hover:border-white/35 transition-all duration-400 group relative flex flex-col justify-between overflow-hidden shadow-2xl hover:shadow-[0_0_35px_rgba(255,255,255,0.08)]"
                  >
                    {/* Top Client & Metric Bar */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs uppercase tracking-wider text-[#8e8e9c]">
                        {item.client}
                      </span>
                      <div className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-right">
                        <span className="font-display font-bold text-emerald-400 text-sm">
                          {item.metric}
                        </span>
                        <span className="font-mono text-[9px] text-[#90b09e] uppercase ml-1">
                          {item.metricLabel}
                        </span>
                      </div>
                    </div>

                    {/* Native 9:16 Vertical Video Frame */}
                    <div
                      onClick={(e) => togglePlay(item.id, e)}
                      className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-white/20 shadow-inner mb-5 cursor-pointer group/video"
                    >
                      <video
                        ref={(el) => {
                          videoRefs.current[item.id] = el;
                        }}
                        src={getOptimizedMediaUrl(item.videoSrc, { isVideo: true })}
                        loop
                        muted={isMuted}
                        playsInline
                        preload="none"
                        className="w-full h-full object-cover"
                      />

                      {/* Play Overlay when paused */}
                      {!isPlaying && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all group-hover/video:bg-black/20">
                          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover/video:scale-110 transition-transform">
                            <Play className="w-6 h-6 translate-x-0.5 fill-white" />
                          </div>
                        </div>
                      )}

                      {/* Floating Format Pill */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 border border-white/20 backdrop-blur-md text-[9px] font-mono text-white">
                        <Smartphone className="w-2.5 h-2.5 text-emerald-400" />
                        <span>9:16 REEL</span>
                      </div>

                      {/* Controls on Video */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-20">
                        <button
                          onClick={(e) => toggleMute(item.id, e)}
                          className="p-2 rounded-full bg-black/75 hover:bg-white hover:text-black border border-white/20 backdrop-blur-md text-white transition-all cursor-pointer shadow-md"
                          title={isMuted ? 'Unmute' : 'Mute'}
                        >
                          {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 text-emerald-400" />}
                        </button>
                        <button
                          onClick={(e) => handleFullscreen(item.id, e)}
                          className="p-2 rounded-full bg-black/75 hover:bg-white hover:text-black border border-white/20 backdrop-blur-md text-white transition-all cursor-pointer shadow-md"
                          title="Fullscreen"
                        >
                          <Maximize2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Metadata & Direct Link Redirection */}
                    <div>
                      <h4 className="font-display font-bold text-lg text-white mb-2 leading-snug group-hover:text-white">
                        <a
                          href={item.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline flex items-start justify-between gap-2"
                        >
                          <span>{item.title}</span>
                          <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white flex-shrink-0 mt-1" />
                        </a>
                      </h4>

                      <p className="font-body text-xs text-[#a0a0ae] leading-relaxed mb-4 line-clamp-3">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-5">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/5 text-[#b0b0bc] border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Direct Redirection Button */}
                      <a
                        href={item.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white hover:text-black border border-white/15 text-xs font-mono uppercase tracking-wider text-white transition-all group/btn"
                      >
                        <span className="font-semibold">Open Project Drive</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. NATIVE 16:9 CINEMATIC & BROADCAST SECTION */}
        {horizontalVideos.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white tracking-wide">
                    16:9 Cinematic Motion & Brand Commercials
                  </h3>
                  <p className="font-mono text-xs text-[#8c8c9a] uppercase tracking-wider">
                    Spotify, Netflix & Artisan Coffee (Widescreen 16:9 Masters)
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-block font-mono text-xs text-[#828290]">
                {horizontalVideos.length} Cinematic Productions
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {horizontalVideos.map((item) => {
                const isPlaying = playingId === item.id;
                const isMuted = mutedStates[item.id] ?? true;

                return (
                  <div
                    key={item.id}
                    className="glass-panel rounded-3xl p-6 border border-white/15 hover:border-white/35 transition-all duration-400 group relative flex flex-col justify-between overflow-hidden shadow-2xl hover:shadow-[0_0_35px_rgba(255,255,255,0.08)]"
                  >
                    <div>
                      {/* Top Bar */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs uppercase tracking-wider text-[#8e8e9c]">
                          {item.client}
                        </span>
                        <div className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-right">
                          <span className="font-display font-bold text-emerald-400 text-sm">
                            {item.metric}
                          </span>
                          <span className="font-mono text-[9px] text-[#90b09e] uppercase ml-1">
                            {item.metricLabel}
                          </span>
                        </div>
                      </div>

                      {/* Native 16:9 Landscape Video Container */}
                      <div
                        onClick={(e) => togglePlay(item.id, e)}
                        className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 mb-4 cursor-pointer group/video shadow-inner"
                      >
                        <video
                          ref={(el) => {
                            videoRefs.current[item.id] = el;
                          }}
                          src={getOptimizedMediaUrl(item.videoSrc, { isVideo: true })}
                          loop
                          muted={isMuted}
                          playsInline
                          preload="none"
                          className="w-full h-full object-cover"
                        />

                        {/* Play Overlay when paused */}
                        {!isPlaying && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all group-hover/video:bg-black/25">
                            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,255,255,0.25)] group-hover/video:scale-110 transition-transform">
                              <Play className="w-6 h-6 translate-x-0.5 fill-white" />
                            </div>
                          </div>
                        )}

                        {/* Bottom Controls */}
                        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 z-20">
                          <button
                            onClick={(e) => toggleMute(item.id, e)}
                            className="p-2 rounded-full bg-black/70 hover:bg-white hover:text-black border border-white/20 backdrop-blur-md text-white transition-all cursor-pointer shadow-md"
                            title={isMuted ? 'Unmute' : 'Mute'}
                          >
                            {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 text-emerald-400" />}
                          </button>
                          <button
                            onClick={(e) => handleFullscreen(item.id, e)}
                            className="p-2 rounded-full bg-black/70 hover:bg-white hover:text-black border border-white/20 backdrop-blur-md text-white transition-all cursor-pointer shadow-md"
                            title="Fullscreen"
                          >
                            <Maximize2 className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Format Badge */}
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 border border-white/20 backdrop-blur-md text-[9px] font-mono text-white">
                          <Monitor className="w-2.5 h-2.5 text-cyan-400" />
                          <span>16:9 CINEMA</span>
                        </div>
                      </div>

                      <h4 className="font-display font-bold text-lg text-white mb-2 leading-snug">
                        <a
                          href={item.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline flex items-start justify-between gap-2"
                        >
                          <span>{item.title}</span>
                          <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white flex-shrink-0 mt-1" />
                        </a>
                      </h4>

                      <p className="font-body text-xs text-[#a0a0ae] leading-relaxed mb-4 line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1 mb-5">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[9px] font-mono bg-white/5 text-[#b0b0bc] border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Direct Redirection Button */}
                      <a
                        href={item.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white hover:text-black border border-white/15 text-xs font-mono uppercase tracking-wider text-white transition-all group/btn"
                      >
                        <span className="font-semibold">Open Project Drive</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
