// ─────────────────────────────────────────────
// SYMMETRY — After Effects 3D Rolling Card Carousel & Grid
// Cinematic 3D Depth, Kinetic Cylindrical Roll & 180° Flips
// ─────────────────────────────────────────────

import { useState, useRef, useEffect } from 'react';
import { servicesData, type ServiceItem } from '@/data/services';
import { 
  Video, Diamond, Activity, Image, Palette, Code2, 
  Globe, Layers, Cpu, Workflow, TrendingUp, ShieldCheck, 
  RotateCw, ChevronLeft, ChevronRight, CheckCircle2, ArrowUpRight,
  LayoutGrid, Disc3, Play, Pause
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Video, Diamond, Activity, Image, Palette, Code2,
  Globe, Layers, Cpu, Workflow, TrendingUp, ShieldCheck
};

export default function BentoServices() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'3d-roll' | 'grid'>('3d-roll');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [isAutoRolling, setIsAutoRolling] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Video & Reels', '3D & Commercials', 'Web & Landing Pages', 'Branding & Automation'];

  const filteredServices = activeCategory === 'All'
    ? servicesData
    : servicesData.filter((s) => s.category === activeCategory);

  const handleSelectService = (serviceTitle: string) => {
    window.dispatchEvent(
      new CustomEvent('symmetry:prefill-contact', {
        detail: {
          service: serviceTitle,
          autoScroll: true,
        },
      })
    );
  };

  // Reset active index when category changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  // Optional auto-roll timer
  useEffect(() => {
    if (!isAutoRolling || viewMode !== '3d-roll') return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filteredServices.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isAutoRolling, viewMode, filteredServices.length]);

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % filteredServices.length);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + filteredServices.length) % filteredServices.length);
  };

  const toggleFlip = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Touch / Swipe handler
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextCard();
      else prevCard();
    }
    touchStartX.current = null;
  };

  return (
    <section id="solutions" className="relative py-32 px-6 bg-[#030303] overflow-hidden">
      {/* Background Ambience & Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header — Client-Friendly & Clear */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 border-b border-white/10 pb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#b4b4c0] mb-4">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>WHAT WE DELIVER // 48-72 HOUR PROJECT DELIVERY</span>
            </div>
            <h2 className="pop-heading font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-3">
              CREATIVE SERVICES <span className="chrome-text">BUILT TO GROW</span>
            </h2>
            <p className="font-body text-sm sm:text-base text-[#b8b8c6] max-w-2xl leading-relaxed">
              From viral 4K video reels and 3D product commercials to luxury websites—clear deliverables, fast 48–72h turnaround, and direct collaboration with the Symmetry team.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle: 3D Roll vs Grid */}
            <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <button
                onClick={() => setViewMode('3d-roll')}
                aria-label="Switch to 3D Cylindrical Roll view"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === '3d-roll' ? 'bg-white text-black font-semibold shadow-md' : 'text-[#b4b4c4] hover:text-white'
                }`}
              >
                <Disc3 className="w-3.5 h-3.5" />
                <span>3D Roll</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                aria-label="Switch to Bento Grid view"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-black font-semibold shadow-md' : 'text-[#b4b4c4] hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Bento Grid</span>
              </button>
            </div>

            {/* Auto Roll Toggle (3D Mode) */}
            {viewMode === '3d-roll' && (
              <button
                onClick={() => setIsAutoRolling(!isAutoRolling)}
                aria-label={isAutoRolling ? 'Pause Auto-Roll carousel' : 'Start Auto-Roll carousel'}
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  isAutoRolling ? 'bg-white text-black border-white' : 'bg-white/5 text-white/70 border-white/10 hover:text-white'
                }`}
                title={isAutoRolling ? 'Pause Auto-Roll' : 'Start Auto-Roll'}
              >
                {isAutoRolling ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-label={`Filter services by ${cat}`}
              className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105'
                  : 'bg-white/[0.04] text-[#a0a0ab] hover:text-white hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ────────────────────────────────────────────────────────── */}
        {/* MODE 1: AFTER EFFECTS 3D CYLINDRICAL ROLLING CAROUSEL DECK */}
        {/* ────────────────────────────────────────────────────────── */}
        {viewMode === '3d-roll' && (
          <div className="relative w-full py-12 flex flex-col items-center select-none">
            {/* 3D Perspective Stage */}
            <div
              ref={containerRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative w-full h-[520px] flex items-center justify-center overflow-visible"
              style={{ perspective: '1500px' }}
            >
              {filteredServices.map((service, index) => {
                const IconComponent = iconMap[service.icon] || Diamond;
                const isFlipped = !!flippedCards[service.id];
                const count = filteredServices.length;

                // Calculate relative cyclic offset from active index
                let offset = (index - activeIndex) % count;
                if (offset > count / 2) offset -= count;
                if (offset < -count / 2) offset += count;

                const isCenter = offset === 0;
                const absOffset = Math.abs(offset);

                // Only render cards within visible field of depth
                if (absOffset > 3) return null;

                // After Effects cylindrical projection math
                const rotateY = offset * 26; // 3D angular yaw
                const translateX = offset * 290; // horizontal spacing in 3D
                const translateZ = -absOffset * 150; // depth into Z-space
                const scale = Math.max(0.72, 1 - absOffset * 0.12);
                const opacity = isCenter ? 1 : Math.max(0.2, 1 - absOffset * 0.35);
                const zIndex = 30 - Math.round(absOffset * 5);

                return (
                  <div
                    key={service.id}
                    onClick={() => {
                      if (!isCenter) {
                        setActiveIndex(index);
                      } else {
                        toggleFlip(service.id);
                      }
                    }}
                    className="absolute w-[310px] sm:w-[360px] h-[480px] cursor-pointer transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.2,0.85,0.2,1.05)] will-change-transform transform-gpu"
                    style={{
                      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      opacity,
                      zIndex,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Flippable 3D Card Shell */}
                    <div
                      className={`relative w-full h-full transform-style-3d ${
                        isFlipped ? 'card-flipped' : ''
                      }`}
                    >
                      {/* ── CARD FRONT ── */}
                      <div
                        className={`absolute inset-0 backface-hidden rounded-3xl p-7 flex flex-col justify-between border transition-[background-color,border-color,box-shadow] duration-500 ${
                          isCenter
                            ? 'bg-[#0f1118] border-white/35 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(255,255,255,0.12)]'
                            : 'bg-[#08090d]/90 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {/* Chrome Shimmer Sheen on Center Card */}
                        {isCenter && (
                          <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
                            <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
                          </div>
                        )}

                        <div>
                          {/* Top Bar */}
                          <div className="flex items-center justify-between mb-6">
                            <div className="p-3.5 rounded-2xl bg-white/[0.08] border border-white/15 text-white shadow-lg">
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#a0a0b2]">
                              <RotateCw className="w-3 h-3" />
                              <span>{isCenter ? 'Click to Flip' : 'Click to Focus'}</span>
                            </div>
                          </div>

                          {/* Category & Badge */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-mono text-[11px] text-[#a5a5b5] uppercase tracking-widest truncate">
                              {service.category}
                            </span>
                            {service.badge && (
                              <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-[9px] font-mono text-cyan-300 font-semibold shrink-0">
                                {service.badge}
                              </span>
                            )}
                          </div>
                          <h3 className="font-display font-bold text-xl text-white mb-2 leading-snug">
                            {service.title}
                          </h3>
                          <p className="font-body text-xs text-[#b8b8c8] leading-relaxed line-clamp-3">
                            {service.shortDesc}
                          </p>
                        </div>

                        {/* Bottom Metric & Action */}
                        <div className="pt-4 border-t border-white/10 flex items-end justify-between">
                          <div>
                            <span className="font-display font-bold text-2xl text-white block">
                              {service.metric}
                            </span>
                            <span className="font-mono text-[10px] text-[#a5a5b5] uppercase tracking-wider">
                              {service.metricLabel}
                            </span>
                          </div>

                          <span className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white hover:text-black text-white text-[11px] font-mono uppercase tracking-wider flex items-center gap-1 transition-colors">
                            <span>Details</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>

                      {/* ── CARD BACK (Flipped 180deg) ── */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#0c0e14] rounded-3xl p-7 flex flex-col justify-between border border-white/30 shadow-2xl">
                        <div>
                          <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-white/10">
                            <span className="font-mono text-[11px] uppercase tracking-widest text-[#c2c2d4]">
                              What You Get
                            </span>
                            <button
                              onClick={(e) => toggleFlip(service.id, e)}
                              className="flex items-center gap-1 text-[11px] font-mono text-white/90 hover:text-white"
                            >
                              <RotateCw className="w-3 h-3" />
                              <span>Flip</span>
                            </button>
                          </div>

                          <h3 className="font-display font-bold text-lg text-white mb-2">
                            {service.title}
                          </h3>
                          <p className="font-body text-xs text-[#d8d8e4] leading-relaxed mb-3">
                            {service.fullDesc}
                          </p>

                          <div className="space-y-1.5 mb-4">
                            <span className="font-mono text-[10px] uppercase text-cyan-300 font-semibold tracking-wider block">
                              Deliverables Included:
                            </span>
                            {service.tags.map((tag, i) => (
                              <div key={i} className="flex items-center gap-2 text-[11px] font-mono text-white/95">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span>{tag}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/10">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectService(service.title);
                            }}
                            className="w-full py-3 rounded-xl bg-white text-black font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#eaeaea] transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-[1.01] active:scale-[0.99]"
                          >
                            <span>Choose This Service</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 3D Carousel Navigation Controls & Indicator */}
            <div className="flex items-center gap-6 mt-8">
              <button
                onClick={prevCard}
                className="p-3.5 rounded-full bg-white/5 hover:bg-white hover:text-black border border-white/15 text-white transition-all cursor-pointer shadow-lg active:scale-95"
                aria-label="Previous card"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Position Progress Dots with accessible 36px touch targets */}
              <div className="flex items-center gap-1.5" role="group" aria-label="Service carousel navigation">
                {filteredServices.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className="min-h-[36px] min-w-[36px] flex items-center justify-center p-2 cursor-pointer rounded-full transition-transform active:scale-90"
                    aria-label={`Go to slide ${idx + 1}`}
                    aria-current={activeIndex === idx ? 'true' : undefined}
                  >
                    <span
                      className={`h-1.5 rounded-full transition-all duration-300 pointer-events-none block ${
                        activeIndex === idx ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={nextCard}
                className="p-3.5 rounded-full bg-white/5 hover:bg-white hover:text-black border border-white/15 text-white transition-all cursor-pointer shadow-lg active:scale-95"
                aria-label="Next card"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <p className="font-mono text-[11px] text-[#c4c4d4] mt-4 uppercase tracking-widest">
              Slide or use arrows to roll • Click center card to rotate specs
            </p>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────── */}
        {/* MODE 2: BENTO GRID VIEW                                    */}
        {/* ────────────────────────────────────────────────────────── */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const IconComponent = iconMap[service.icon] || Diamond;
              const isFlipped = !!flippedCards[service.id];

              return (
                <div
                  key={service.id}
                  className="perspective-1000 h-[480px] pop-card"
                >
                  <div
                    onClick={() => toggleFlip(service.id)}
                    className={`relative w-full h-full transform-style-3d cursor-pointer ${
                      isFlipped ? 'card-flipped' : ''
                    }`}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden glass-panel glass-panel-hover rounded-3xl p-7 flex flex-col justify-between border border-white/10">
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/15 text-white shadow-lg">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span className="flex items-center gap-1 text-[10px] font-mono text-[#b4b4c4]">
                            <RotateCw className="w-3 h-3" />
                            <span>Flip</span>
                          </span>
                        </div>

                        {/* Category & Badge */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="font-mono text-[11px] text-[#b0b0c0] uppercase tracking-widest truncate">
                            {service.category}
                          </span>
                          {service.badge && (
                            <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-[9px] font-mono text-cyan-300 font-semibold shrink-0">
                              {service.badge}
                            </span>
                          )}
                        </div>
                        <h3 className="font-display font-bold text-xl text-white mb-2 leading-snug">
                          {service.title}
                        </h3>
                        <p className="font-body text-xs text-[#a2a2b4] leading-relaxed mb-6">
                          {service.shortDesc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-end justify-between">
                        <div>
                          <span className="font-display font-bold text-2xl text-white block">
                            {service.metric}
                          </span>
                          <span className="font-mono text-[10px] text-[#b0b0be] uppercase tracking-wider">
                            {service.metricLabel}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-white/60 hover:text-white flex items-center gap-1">
                          <span>Details</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 glass-panel rounded-3xl p-7 flex flex-col justify-between border border-white/25 bg-[#09090b]">
                      <div>
                        <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-white/10">
                          <span className="font-mono text-[11px] uppercase tracking-widest text-[#c2c2d4]">
                            What You Get
                          </span>
                          <button
                            onClick={(e) => toggleFlip(service.id, e)}
                            className="flex items-center gap-1 text-[11px] font-mono text-white/70 hover:text-white"
                          >
                            <RotateCw className="w-3 h-3" />
                            <span>Flip</span>
                          </button>
                        </div>

                        <h3 className="font-display font-bold text-lg text-white mb-2">
                          {service.title}
                        </h3>
                        <p className="font-body text-xs text-[#c0c0cc] leading-relaxed mb-3">
                          {service.fullDesc}
                        </p>

                        <div className="space-y-1.5 mb-4">
                          <span className="font-mono text-[10px] uppercase text-cyan-400 tracking-wider block">
                            Deliverables Included:
                          </span>
                          {service.tags.map((tag, i) => (
                            <div key={i} className="flex items-center gap-2 text-[11px] font-mono text-white/90">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{tag}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectService(service.title);
                          }}
                          className="w-full py-3 rounded-xl bg-white text-black font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#eaeaea] transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-[1.01] active:scale-[0.99]"
                        >
                          <span>Choose This Service</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
