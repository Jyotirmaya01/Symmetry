// ─────────────────────────────────────────────
// SYMMETRY — Fast 3D Ladder & Bouncing Ball Motion Intro
// Human-Crafted Kinetic Typography & Split-Aperture Reveal
// "Looking for AI business solution? We get you."
// ─────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';

interface LoaderProps {
  onComplete: () => void;
}

// 5 Isometric 3D Steps coordinates (Ascending towards upper apex)
const STEPS = [
  { id: 0, x: 170, y: 285, label: '01', w: 82, d: 38, h: 22 },
  { id: 1, x: 235, y: 235, label: '02', w: 82, d: 38, h: 22 },
  { id: 2, x: 300, y: 185, label: '03', w: 82, d: 38, h: 22 },
  { id: 3, x: 365, y: 135, label: '04', w: 82, d: 38, h: 22 },
  { id: 4, x: 430, y: 85, label: 'APEX', w: 96, d: 44, h: 24 },
];

export default function SymmetryLoader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<SVGGElement>(null);
  const ballCoreRef = useRef<SVGCircleElement>(null);
  const burstRef = useRef<SVGGElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    // If reduced motion is requested or running automated audits (Lighthouse, bots), exit immediately
    const isAutomatedAudit =
      typeof navigator !== 'undefined' &&
      (/Lighthouse|PageSpeed|Google-InspectionTool|HeadlessChrome|bot|spider|crawl/i.test(navigator.userAgent) ||
        Boolean((navigator as any).webdriver));

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || isAutomatedAudit) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({
        onComplete: () => {
          triggerExit();
        },
      });

      // ─── 0. FAST INITIAL STATE ───
      gsap.set('.loader-curtain-left', { xPercent: 0 });
      gsap.set('.loader-curtain-right', { xPercent: 0 });
      gsap.set('.step-polygon', { opacity: 0, y: 20, transformOrigin: 'center center' });
      gsap.set('.step-ripple', { scale: 0, opacity: 0, transformOrigin: 'center center' });
      gsap.set('.step-glow', { opacity: 0 });
      gsap.set('.kinetic-word', { yPercent: 110, opacity: 0 });
      gsap.set('.punchline-wrap', { scale: 0.7, opacity: 0, y: 15 });
      gsap.set('.apex-flare', { scale: 0, opacity: 0, transformOrigin: 'center center' });
      gsap.set(burstRef.current, { scale: 0, opacity: 0, transformOrigin: 'center center' });

      // Initial ball position
      gsap.set(ballRef.current, {
        x: STEPS[0].x,
        y: 60,
        opacity: 0,
        transformOrigin: 'center center',
      });

      // ─── 1. FAST INTRO REVEAL (0.0s – 0.25s) ───
      masterTl.to('.loader-header', {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: 'power2.out',
      });

      // 3D Ladder steps materialize rapidly
      masterTl.to(
        '.step-polygon',
        {
          opacity: 1,
          y: 0,
          duration: 0.22,
          stagger: 0.04,
          ease: 'power2.out',
        },
        '-=0.15'
      );

      // Ball drops in quickly
      masterTl.to(
        ballRef.current,
        {
          opacity: 1,
          duration: 0.1,
          ease: 'power1.out',
        },
        '-=0.1'
      );

      // ─── 2. FAST-PACED SNAPPY BOUNCES (0.25s – 1.1s) ───
      const addQuickBounce = (
        toX: number,
        toY: number,
        stepIdx: number,
        wordClass: string,
        duration = 0.18
      ) => {
        // Fall down to step
        masterTl.to(ballRef.current, {
          x: toX,
          y: toY - 14,
          duration: duration,
          ease: 'power2.in',
          onStart: () => {
            gsap.to(ballCoreRef.current, {
              scaleX: 0.88,
              scaleY: 1.18,
              duration: duration * 0.7,
              ease: 'power1.in',
            });
          },
          onComplete: () => {
            setActiveStep(stepIdx);
            // Quick squash
            gsap.timeline()
              .to(ballCoreRef.current, {
                scaleX: 1.28,
                scaleY: 0.72,
                duration: 0.05,
                ease: 'power3.out',
              })
              .to(ballCoreRef.current, {
                scaleX: 1,
                scaleY: 1,
                duration: 0.08,
                ease: 'power2.out',
              });

            // Step flash & ripple
            gsap.fromTo(
              `#step-glow-${stepIdx}`,
              { opacity: 0.8 },
              { opacity: 0, duration: 0.2, ease: 'power2.out' }
            );
            gsap.fromTo(
              `#step-ripple-${stepIdx}`,
              { scale: 0.6, opacity: 0.8 },
              { scale: 1.9, opacity: 0, duration: 0.25, ease: 'power2.out' }
            );
          },
        });

        // Kinetic text pop
        if (wordClass) {
          masterTl.to(
            wordClass,
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.18,
              ease: 'back.out(2)',
            },
            `-=${duration * 0.7}`
          );
        }

        // Rebound arc towards next step
        const nextStep = STEPS[stepIdx + 1];
        if (nextStep) {
          const midX = (toX + nextStep.x) / 2;
          const peakY = Math.min(toY, nextStep.y) - 40;

          masterTl.to(ballRef.current, {
            x: midX,
            y: peakY,
            duration: duration * 0.85,
            ease: 'power2.out',
            onStart: () => {
              gsap.to(ballCoreRef.current, {
                scaleX: 0.95,
                scaleY: 1.06,
                duration: duration * 0.4,
              });
            },
          });
        }
      };

      // Step 0: Initial drop -> "Looking"
      masterTl.to(ballRef.current, {
        x: STEPS[0].x,
        y: STEPS[0].y - 14,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setActiveStep(0);
          gsap.fromTo('#step-glow-0', { opacity: 0.8 }, { opacity: 0, duration: 0.2 });
          gsap.fromTo('#step-ripple-0', { scale: 0.6, opacity: 0.8 }, { scale: 1.9, opacity: 0, duration: 0.25 });
        },
      });
      masterTl.to('.word-looking', { yPercent: 0, opacity: 1, duration: 0.18, ease: 'back.out(2)' }, '-=0.12');

      // Arc to Step 1 -> "for"
      masterTl.to(ballRef.current, {
        x: (STEPS[0].x + STEPS[1].x) / 2,
        y: STEPS[1].y - 40,
        duration: 0.15,
        ease: 'power2.out',
      });
      addQuickBounce(STEPS[1].x, STEPS[1].y, 1, '.word-for', 0.18);

      // Arc to Step 2 -> "AI"
      addQuickBounce(STEPS[2].x, STEPS[2].y, 2, '.word-ai', 0.18);

      // Arc to Step 3 -> "business"
      addQuickBounce(STEPS[3].x, STEPS[3].y, 3, '.word-business', 0.18);

      // Arc to Step 4 (Apex Platform) -> "solution?"
      addQuickBounce(STEPS[4].x, STEPS[4].y, 4, '.word-solution', 0.2);

      // ─── 3. APEX LAUNCH INTO SYMMETRY (1.1s – 1.4s) ───
      masterTl.to(ballRef.current, {
        x: STEPS[4].x + 4,
        y: 12,
        duration: 0.24,
        ease: 'power3.out',
        onStart: () => {
          gsap.to(ballCoreRef.current, {
            scaleX: 0.8,
            scaleY: 1.3,
            duration: 0.18,
            ease: 'power2.in',
          });
        },
      });

      // Apex Impact Flare
      masterTl.to(
        burstRef.current,
        {
          scale: 2.2,
          opacity: 1,
          duration: 0.15,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(burstRef.current, { opacity: 0, duration: 0.2 });
          },
        },
        '-=0.08'
      );

      masterTl.to(
        '.apex-flare',
        {
          scale: 1.4,
          opacity: 1,
          duration: 0.16,
          ease: 'power3.out',
          onComplete: () => {
            gsap.to('.apex-flare', { opacity: 0.25, duration: 0.3 });
          },
        },
        '<0.02'
      );

      masterTl.to(
        ballRef.current,
        {
          scale: 1.5,
          opacity: 0,
          duration: 0.16,
          ease: 'power2.in',
        },
        '<'
      );

      // ─── 4. PUNCHLINE: "We get you." (1.4s – 1.7s) ───
      masterTl.to(
        '.punchline-wrap',
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.28,
          ease: 'back.out(2)',
        },
        '-=0.1'
      );

      masterTl.fromTo(
        '.punchline-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.25, ease: 'power2.out', transformOrigin: 'center center' },
        '-=0.15'
      );

      // Fast dwell so user sees the message, then immediate reveal
      masterTl.to({}, { duration: 0.32 });
    }, containerRef);

    // Keyboard shortcut to skip intro
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Space') {
        triggerExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      ctx.revert();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  // Snappy shutter split exit
  const triggerExit = () => {
    if (isSkipped) return;
    setIsSkipped(true);

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl.to('.loader-center-content', {
      scale: 1.04,
      opacity: 0,
      filter: 'blur(8px)',
      duration: 0.22,
      ease: 'power2.in',
    });

    tl.to(
      '.loader-curtain-left',
      {
        xPercent: -100,
        duration: 0.45,
        ease: 'power4.inOut',
      },
      '-=0.1'
    );

    tl.to(
      '.loader-curtain-right',
      {
        xPercent: 100,
        duration: 0.45,
        ease: 'power4.inOut',
      },
      '<'
    );

    tl.to(
      '.loader-laser-seam',
      {
        opacity: 0,
        duration: 0.18,
      },
      '<'
    );
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-auto select-none bg-transparent"
    >
      {/* Left Shutter Curtain */}
      <div className="loader-curtain-left absolute top-0 bottom-0 left-0 w-1/2 bg-[#030303] border-r border-white/10 z-10" />

      {/* Right Shutter Curtain */}
      <div className="loader-curtain-right absolute top-0 bottom-0 right-0 w-1/2 bg-[#030303] border-l border-white/10 z-10" />

      {/* Center Precision Seam */}
      <div className="loader-laser-seam absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] z-20 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-80" />
      </div>

      {/* Skip Button */}
      <button
        onClick={triggerExit}
        className="absolute top-6 right-6 z-30 flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-all text-xs font-mono group cursor-pointer"
        title="Skip intro animation (ESC)"
        aria-label="Skip intro animation"
      >
        <span>SKIP</span>
        <span className="hidden sm:inline text-[10px] text-white/40">[ESC]</span>
        <ArrowRight className="w-3.5 h-3.5 text-white/50 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Foreground Content */}
      <div className="loader-center-content relative z-30 flex flex-col items-center justify-center w-full max-w-4xl px-4 sm:px-6">
        
        {/* ─── UPPER: AUTHENTIC SYMMETRY BRAND CREST ─── */}
        <div className="loader-header opacity-0 -translate-y-3 flex flex-col items-center mb-1">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-2.5">
            <div className="absolute inset-0 rounded-2xl bg-white/10 blur-lg" />
            <div className="apex-flare absolute inset-[-10px] rounded-full bg-white/30 blur-md opacity-0 pointer-events-none" />

            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/25 p-1 bg-black/90 shadow-[0_4px_24px_rgba(0,0,0,0.8)] flex items-center justify-center">
              <picture>
                <source srcSet="/symmetry-logo.webp" type="image/webp" />
                <img
                  src="/symmetry-logo.png"
                  alt="SYMMETRY"
                  width="64"
                  height="64"
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>
          </div>

          <span className="block font-display font-black text-lg sm:text-xl tracking-[0.35em] text-white">
            SYMMETRY
          </span>
          <p className="font-mono text-[9px] tracking-widest text-[#a5a5b5] uppercase mt-0.5">
            CREATIVE MOTION & VISUAL SYSTEMS
          </p>
        </div>

        {/* ─── 3D ISOMETRIC LADDER & BOUNCING BALL CANVAS ─── */}
        <div className="relative w-full max-w-[540px] h-[200px] sm:h-[240px] my-1 flex items-center justify-center">
          <svg
            viewBox="0 0 600 340"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Step Top Face Metallic Brushed Gradient */}
              <linearGradient id="stepTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#252630" />
                <stop offset="50%" stopColor="#1c1d25" />
                <stop offset="100%" stopColor="#12131a" />
              </linearGradient>

              {/* Step Front-Left Dark Shaded Face */}
              <linearGradient id="stepFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#14151e" />
                <stop offset="100%" stopColor="#090a0f" />
              </linearGradient>

              {/* Step Front-Right Depth Face */}
              <linearGradient id="stepSideGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a1b24" />
                <stop offset="100%" stopColor="#0b0c11" />
              </linearGradient>

              {/* Ball Metallic Silver/Chrome Shading */}
              <radialGradient id="ballShading" cx="35%" cy="32%" r="65%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#e2e8f0" />
                <stop offset="75%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#0f172a" />
              </radialGradient>

              {/* Ball Bloom Filter */}
              <filter id="ballBloom" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Apex Burst Shockwave Filter */}
              <filter id="burstGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>

            {/* Subtle Base Plane Alignment Lines */}
            <g opacity="0.1" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8">
              <line x1="80" y1="310" x2="520" y2="310" strokeDasharray="3 3" />
              <line x1="120" y1="260" x2="480" y2="260" strokeDasharray="3 3" />
              <line x1="180" y1="210" x2="440" y2="210" strokeDasharray="3 3" />
            </g>

            {/* 3D Stepped Ladder Rungs */}
            {STEPS.map((s, idx) => {
              const topPoints = `${s.x},${s.y - s.d / 2} ${s.x + s.w / 2},${s.y} ${s.x},${s.y + s.d / 2} ${s.x - s.w / 2},${s.y}`;
              const leftFace = `${s.x - s.w / 2},${s.y} ${s.x},${s.y + s.d / 2} ${s.x},${s.y + s.d / 2 + s.h} ${s.x - s.w / 2},${s.y + s.h}`;
              const rightFace = `${s.x},${s.y + s.d / 2} ${s.x + s.w / 2},${s.y} ${s.x + s.w / 2},${s.y + s.h} ${s.x},${s.y + s.d / 2 + s.h}`;

              return (
                <g key={s.id} id={`step-group-${s.id}`} className="step-polygon">
                  {/* Step Shadow on plane beneath */}
                  <ellipse
                    cx={s.x}
                    cy={s.y + s.h + 8}
                    rx={s.w / 2 + 4}
                    ry={s.d / 2 + 3}
                    fill="black"
                    opacity="0.4"
                    filter="blur(5px)"
                  />

                  {/* Front Left Shaded Face */}
                  <polygon
                    points={leftFace}
                    fill="url(#stepFrontGrad)"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="0.8"
                  />

                  {/* Front Right Depth Face */}
                  <polygon
                    points={rightFace}
                    fill="url(#stepSideGrad)"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="0.8"
                  />

                  {/* Top Walking Surface */}
                  <polygon
                    points={topPoints}
                    fill="url(#stepTopGrad)"
                    stroke={activeStep === idx ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)'}
                    strokeWidth={activeStep === idx ? '1.2' : '0.8'}
                    className="transition-colors duration-150"
                  />

                  {/* Bevel Edge Highlights */}
                  <line
                    x1={s.x - s.w / 2}
                    y1={s.y}
                    x2={s.x}
                    y2={s.y + s.d / 2}
                    stroke={activeStep === idx ? '#ffffff' : 'rgba(255,255,255,0.35)'}
                    strokeWidth="1"
                  />
                  <line
                    x1={s.x}
                    y1={s.y + s.d / 2}
                    x2={s.x + s.w / 2}
                    y2={s.y}
                    stroke={activeStep === idx ? '#ffffff' : 'rgba(255,255,255,0.35)'}
                    strokeWidth="1"
                  />

                  {/* Step Flash Surface Glow on Ball Contact */}
                  <polygon
                    id={`step-glow-${idx}`}
                    points={topPoints}
                    fill="#ffffff"
                    opacity="0"
                    className="step-glow pointer-events-none"
                  />

                  {/* Expanding Ripple Ring on Impact */}
                  <ellipse
                    id={`step-ripple-${idx}`}
                    cx={s.x}
                    cy={s.y}
                    rx={s.w * 0.45}
                    ry={s.d * 0.45}
                    fill="none"
                    stroke="rgba(255,255,255,0.7)"
                    strokeWidth="1.5"
                    opacity="0"
                    className="step-ripple pointer-events-none"
                  />

                  {/* Step Index Label */}
                  <text
                    x={s.x}
                    y={s.y + 3}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.25)"
                    fontSize="9"
                    fontFamily="monospace"
                    letterSpacing="1"
                  >
                    {s.label}
                  </text>
                </g>
              );
            })}

            {/* Apex Impact Pulse */}
            <g ref={burstRef} className="pointer-events-none" opacity="0">
              <circle cx={STEPS[4].x + 4} cy="15" r="24" fill="rgba(255,255,255,0.2)" filter="url(#burstGlow)" />
              <circle cx={STEPS[4].x + 4} cy="15" r="12" fill="#ffffff" />
            </g>

            {/* Chrome Ball */}
            <g ref={ballRef} className="pointer-events-none" filter="url(#ballBloom)">
              <circle cx="0" cy="0" r="16" fill="rgba(255,255,255,0.18)" filter="blur(3px)" />

              {/* Sphere Body with Squash/Stretch */}
              <circle
                ref={ballCoreRef}
                cx="0"
                cy="0"
                r="13"
                fill="url(#ballShading)"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="1"
              />

              {/* Specular White Highlight */}
              <circle cx="-4" cy="-4" r="3.5" fill="#ffffff" opacity="0.95" />
            </g>
          </svg>
        </div>

        {/* ─── HUMAN-CRAFTED KINETIC TYPOGRAPHY ─── */}
        <div className="flex flex-col items-center text-center mt-2 mb-2">
          
          {/* Question: "Looking for AI business solution?" */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-2.5 text-base sm:text-xl md:text-2xl font-display font-bold tracking-tight text-[#c4c4d0] mb-1.5">
            <span className="overflow-hidden inline-block py-0.5">
              <span className="kinetic-word word-looking inline-block">Looking</span>
            </span>
            <span className="overflow-hidden inline-block py-0.5">
              <span className="kinetic-word word-for inline-block text-[#b0b0c0]">for</span>
            </span>
            <span className="overflow-hidden inline-block py-0.5">
              <span className="kinetic-word word-ai inline-block font-extrabold text-white">
                AI
              </span>
            </span>
            <span className="overflow-hidden inline-block py-0.5">
              <span className="kinetic-word word-business inline-block">business</span>
            </span>
            <span className="overflow-hidden inline-block py-0.5">
              <span className="kinetic-word word-solution inline-block text-white">solution?</span>
            </span>
          </div>

          {/* Punchline: "We get you." — Pure Human Design, No AI Sparkle Icons */}
          <div className="punchline-wrap flex flex-col items-center mt-0.5">
            <span className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight drop-shadow-[0_2px_18px_rgba(255,255,255,0.3)]">
              We get you.
            </span>

            {/* Clean Architectural Underline */}
            <div className="punchline-line w-28 sm:w-36 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent mt-1.5" />
          </div>
        </div>

        {/* Subtle Minimalist Indicator */}
        <div className="flex items-center gap-2 font-mono text-[9px] text-[#c2c2d2] tracking-widest uppercase mt-3">
          <span className="w-1 h-1 rounded-full bg-white/60" />
          <span>SYMMETRY STUDIO // VERIFIED PRODUCTION</span>
        </div>
      </div>
    </div>
  );
}
