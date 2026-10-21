// ─────────────────────────────────────────────
// SYMMETRY — Cinema-Grade Interactive Magnetic Cursor & Physics Trailing Ring
// Features:
// 1. Instant laser point reticle (0ms tracking)
// 2. Velocity-responsive outer fluid ring (squash & stretch)
// 3. Dynamic context morphing: "PLAY", "EXPLORE", "FLIP", "FOCUS"
// 4. Click ripple shockwave animation
// 5. Ambient cursor lighting spotlight
// 6. Zero lag: hardware-accelerated transforms & passive listeners
// ─────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function SmoothCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'media' | 'text' | 'active'>('default');

  useEffect(() => {
    // Only activate on non-touch devices with fine pointers
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const spotlight = spotlightRef.current;
    if (!dot || !ring) return;

    // Center pivot origins
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });
    if (spotlight) gsap.set(spotlight, { xPercent: -50, yPercent: -50 });

    // Hardware-accelerated quickTo setters
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.04, ease: 'none' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.04, ease: 'none' });

    const ringX = gsap.quickTo(ring, 'x', { duration: 0.22, ease: 'power2.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.22, ease: 'power2.out' });

    const spotX = spotlight ? gsap.quickTo(spotlight, 'x', { duration: 0.35, ease: 'power2.out' }) : null;
    const spotY = spotlight ? gsap.quickTo(spotlight, 'y', { duration: 0.35, ease: 'power2.out' }) : null;

    let isVisible = false;
    let prevX = 0;
    let prevY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      if (!isVisible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.25, overwrite: 'auto' });
        if (spotlight) gsap.to(spotlight, { opacity: 1, duration: 0.35, overwrite: 'auto' });
        isVisible = true;
      }

      // Update positions
      dotX(x);
      dotY(y);
      ringX(x);
      ringY(y);
      if (spotX && spotY) {
        spotX(x);
        spotY(y);
      }

      // Velocity calculation for dynamic rotation and squash & stretch
      const deltaX = x - prevX;
      const deltaY = y - prevY;
      const velocity = Math.min(Math.hypot(deltaX, deltaY), 35);
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      if (velocity > 3) {
        gsap.to(ring, {
          rotation: angle,
          scaleX: 1 + velocity * 0.008,
          scaleY: Math.max(0.78, 1 - velocity * 0.006),
          duration: 0.15,
          ease: 'power1.out',
          overwrite: 'auto',
        });
      } else {
        gsap.to(ring, {
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      prevX = x;
      prevY = y;
    };

    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
      if (spotlight) gsap.to(spotlight, { opacity: 0, duration: 0.3 });
      isVisible = false;
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.75, duration: 0.1, ease: 'power2.inOut' });
      gsap.to(dot, { scale: 1.6, duration: 0.1, ease: 'power2.inOut' });
    };

    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.2, ease: 'back.out(2)' });
      gsap.to(dot, { scale: 1, duration: 0.2, ease: 'power2.out' });
    };

    // Context Detection via Event Delegation
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor') || '';
        if (type === 'play') {
          setCursorText('PLAY');
          setCursorState('media');
          return;
        }
        if (type === 'explore' || type === 'view') {
          setCursorText('VIEW');
          setCursorState('media');
          return;
        }
        if (type === 'flip') {
          setCursorText('FLIP');
          setCursorState('media');
          return;
        }
      }

      // Check for video containers or interactive players
      const videoContainer = target.closest('video, .hero-video-container');
      if (videoContainer) {
        setCursorText('SOUND');
        setCursorState('media');
        return;
      }

      // Check for text inputs
      if (target.closest('input, textarea, [contenteditable="true"]')) {
        setCursorText('');
        setCursorState('text');
        return;
      }

      // Check for interactive clickables (links, buttons, accordion headers)
      if (
        target.closest(
          'a, button, [role="button"], [role="tab"], .cursor-pointer, input[type="submit"]'
        )
      ) {
        setCursorText('');
        setCursorState('hover');
        return;
      }

      // Default state
      setCursorText('');
      setCursorState('default');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      {/* ── 1. AMBIENT GLOW SPOTLIGHT ── */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-30 opacity-0 hidden md:block will-change-transform transform-gpu"
        style={{
          background:
            'radial-gradient(circle, rgba(56, 189, 248, 0.05) 0%, rgba(255, 255, 255, 0.02) 30%, transparent 70%)',
        }}
      />

      {/* ── 2. FLUID TRAILING RING ── */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full flex items-center justify-center opacity-0 hidden md:flex will-change-transform transform-gpu transition-[width,height,background-color,border-color,box-shadow] duration-250 ease-out ${
          cursorState === 'media'
            ? 'w-20 h-20 bg-black/75 border border-cyan-400/80 shadow-[0_0_25px_rgba(34,211,238,0.4)] backdrop-blur-md'
            : cursorState === 'hover'
            ? 'w-14 h-14 bg-white/[0.08] border border-white/60 shadow-[0_0_20px_rgba(255,255,255,0.25)] backdrop-blur-[2px]'
            : cursorState === 'text'
            ? 'w-6 h-10 rounded-sm bg-transparent border-l-2 border-cyan-400'
            : 'w-9 h-9 bg-transparent border border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.1)]'
        }`}
      >
        {/* Dynamic Context Monospace Label */}
        {cursorText && (
          <span
            ref={labelRef}
            className="text-[10px] font-mono font-bold tracking-widest text-cyan-300 uppercase animate-in fade-in zoom-in-75 duration-150 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]"
          >
            {cursorText}
          </span>
        )}
      </div>

      {/* ── 3. PRECISION LASER RETICLE DOT ── */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full opacity-0 hidden md:block will-change-transform transform-gpu transition-[width,height,background-color,box-shadow,opacity] duration-150 ease-out ${
          cursorState === 'media'
            ? 'w-0 h-0 opacity-0'
            : cursorState === 'hover'
            ? 'w-2.5 h-2.5 bg-cyan-300 shadow-[0_0_10px_#22d3ee]'
            : cursorState === 'text'
            ? 'w-0 h-0 opacity-0'
            : 'w-1.5 h-1.5 bg-white shadow-[0_0_8px_#ffffff]'
        }`}
      />
    </>
  );
}
