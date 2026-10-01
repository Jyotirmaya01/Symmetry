// ─────────────────────────────────────────────
// SYMMETRY — Cinematic Hero Section
// Smooth Slow-Scroll Parallax + Precision Typography
// ─────────────────────────────────────────────

import { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, ArrowDown, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { smoothScrollTo } from '@/hooks/useLenis';
import { getOptimizedMediaUrl } from '@/utils/mediaUrl';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-pause video when scrolled out of view to free 100% GPU video decoding bandwidth
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
            setIsPlaying(true);
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Staggered entrance — pure compositor transforms for instant 60fps
      gsap.fromTo(
        '.hero-stagger',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.1,
        }
      );

      // Hero scroll parallax — compositor-only transform & opacity (Zero repaints)
      gsap.to(contentRef.current, {
        y: -120,
        opacity: 0,
        scale: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.4,
        },
      });

      // Video background slow cinematic drift on scroll (Hardware accelerated)
      gsap.to('.hero-video-container', {
        y: 60,
        scale: 1.05,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

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

  const scrollToSolutions = () => {
    smoothScrollTo('#solutions', -80);
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between items-center pt-28 pb-12 px-6 overflow-hidden bg-[#030303]"
    >
      {/* ── Background Video Container with Vignette ── */}
      <div className="hero-video-container absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center will-change-transform transform-gpu">
        <video
          ref={videoRef}
          src={getOptimizedMediaUrl('Symmetry_Most_compressed.mp4', { isVideo: true })}
          poster={getOptimizedMediaUrl('Symmetry_Most_compressed.mp4', { isVideo: true, isPoster: true, width: 900 })}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label="Symmetry 3D cinematic motion reel showcase"
          title="Symmetry 3D motion showcase"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.endsWith('/Symmetry_Most_compressed.mp4') && !target.src.endsWith('/Symmetry_compress.mp4')) {
              target.src = '/Symmetry_Most_compressed.mp4';
            }
          }}
          className="w-full h-full object-cover sm:object-contain max-h-[110vh] opacity-80"
        >
          <track kind="captions" src="data:text/vtt,WEBVTT" label="English" srcLang="en" default />
        </video>

        {/* Ambient Radial Vignette — Blends edges to pure pitch black */}
        <div className="absolute inset-0 video-vignette pointer-events-none" />

        {/* Subtle Horizontal & Vertical Gradient Grid */}
        <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />
      </div>

      {/* ── Vertical Laser Symmetry Axis Line ── */}
      <div className="hidden lg:block laser-line top-0 bottom-0 left-1/2 -translate-x-1/2 z-1 pointer-events-none opacity-30" />

      {/* ── Floating Video Control Badges (Top Right) ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex justify-end gap-3 mb-4">
        <button
          onClick={toggleSound}
          aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[#c0c0cb] hover:text-white hover:border-white/40 transition-all text-xs font-mono cursor-pointer"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" />}
          <span>{isMuted ? 'Muted' : 'Sound ON'}</span>
        </button>

        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause Background Reel' : 'Play Background Reel'}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[#c0c0cb] hover:text-white hover:border-white/40 transition-all text-xs font-mono cursor-pointer"
          title={isPlaying ? 'Pause Reel' : 'Play Reel'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-white" />}
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </button>
      </div>

      {/* ── Main Foreground Content ── */}
      <div ref={contentRef} className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center my-auto">
        {/* Live Status Pill */}
        <div className="hero-stagger inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-lg mb-6 shadow-[0_0_20px_rgba(255,255,255,0.06)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#d0d0dc]">
            SYMMETRY // CREATIVE TECHNOLOGY & MOTION STUDIO
          </span>
        </div>

        {/* Hero Main Headline */}
        <h1 className="hero-stagger font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.05] sm:leading-[1] mb-6">
          CINEMATIC VISION.
          <br />
          <span className="chrome-text chrome-glow">UNCOMPROMISING IMPACT.</span>
        </h1>

        {/* Tagline / Subtitle */}
        <p className="hero-stagger font-body text-base sm:text-xl text-[#a8a8b6] max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          We fuse computational design, cinema-grade commercial motion, and autonomous business workflows into category-defining digital presence for ambitious global brands.
        </p>

        {/* Call to Actions */}
        <div className="hero-stagger flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={scrollToSolutions}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-display font-semibold text-sm uppercase tracking-wider hover:bg-[#e6e6e6] transition-all duration-300 shadow-[0_0_35px_rgba(255,255,255,0.35)] hover:shadow-[0_0_50px_rgba(255,255,255,0.6)] hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Explore Studio Solutions</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <a
            href="https://calendly.com/sabatanant883/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 hover:border-white/40 text-white font-display font-medium text-sm uppercase tracking-wider backdrop-blur-md transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Book 30-Min Strategy Call</span>
            <span className="text-xs">↗</span>
          </a>
        </div>

        {/* Studio Craft Commitments */}
        <div className="hero-stagger grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 mt-14 pt-10 border-t border-white/10 w-full max-w-3xl">
          <div className="flex flex-col items-center">
            <span className="font-display font-bold text-2xl sm:text-3xl text-white">4K ProRes</span>
            <span className="font-mono text-[11px] text-[#a5a5b5] uppercase tracking-wider mt-1">
              Master Deliverables
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display font-bold text-2xl sm:text-3xl text-white">9:16 & 16:9</span>
            <span className="font-mono text-[11px] text-[#a5a5b5] uppercase tracking-wider mt-1">
              Multi-Format Framing
            </span>
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col items-center">
            <span className="font-display font-bold text-2xl sm:text-3xl text-white">Bespoke</span>
            <span className="font-mono text-[11px] text-[#a5a5b5] uppercase tracking-wider mt-1">
              Custom Craft Direction
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom Brand Pillars Ticker & Scroll Indicator ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
        <div className="flex items-center gap-3 text-[11px] font-mono tracking-widest text-[#a5a5b5] uppercase">
          <span>IDEAS</span>
          <span className="text-white/30">•</span>
          <span>DESIGN</span>
          <span className="text-white/30">•</span>
          <span>TECHNOLOGY</span>
          <span className="text-white/30">•</span>
          <span>IMPACT</span>
        </div>

        <button
          onClick={scrollToSolutions}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#a0a0b0] hover:text-white transition-colors cursor-pointer group"
        >
          <span>Scroll to Discover</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}
