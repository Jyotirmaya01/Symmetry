// ─────────────────────────────────────────────
// SYMMETRY — Cinema-Grade Physics Cursor & Ambient Light
// Zero-Lag 120fps Engine:
// 1. Instant 0ms Laser Reticle (Direct hardware transform, zero latency)
// 2. Continuous rAF Physics Lerp Ring (Buttery organic inertia without React re-render thrashing)
// 3. Dynamic Velocity Stretch & Rotation (Follows cursor momentum vector)
// 4. Zero Re-render DOM Attribute Binding (Direct dataset & textContent updates)
// 5. Ambient Photonic Spotlight (Subtle gradient illumination)
// ─────────────────────────────────────────────

import { useEffect, useRef } from 'react';

export default function SmoothCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on non-touch devices with fine pointers and desktop viewports
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    const spotlight = spotlightRef.current;
    if (!dot || !ring) return;

    // Enable custom cursor styling on body
    document.body.classList.add('custom-cursor-enabled');

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let spotX = -100;
    let spotY = -100;
    let isVisible = false;
    let animationFrameId: number;
    let isPressed = false;
    let currentState: 'default' | 'hover' | 'media' | 'text' = 'default';

    // Physics Lerp Loop: Locked 60fps/120fps hardware composite
    const render = () => {
      if (isVisible) {
        // Trailing ring physics lerp (smooth 0.18 spring factor)
        const ringLerp = 0.18;
        ringX += (targetX - ringX) * ringLerp;
        ringY += (targetY - ringY) * ringLerp;

        // Ambient spotlight lazy drift lerp
        const spotLerp = 0.08;
        spotX += (targetX - spotX) * spotLerp;
        spotY += (targetY - spotY) * spotLerp;

        // Momentum vector calculation
        const dx = targetX - ringX;
        const dy = targetY - ringY;
        const dist = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        // Velocity-based squash & stretch (only active in default or hover state)
        let stretch = 0;
        let rotation = 0;
        if (currentState === 'default' && dist > 2) {
          stretch = Math.min(dist * 0.004, 0.35);
          rotation = angle;
        }

        const scaleModifier = isPressed ? 0.8 : 1;

        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) rotate(${rotation}deg) scale(${
          (1 + stretch) * scaleModifier
        }, ${(1 - stretch * 0.7) * scaleModifier})`;

        if (spotlight) {
          spotlight.style.transform = `translate3d(${spotX}px, ${spotY}px, 0) translate(-50%, -50%)`;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // 0ms Instant Laser Reticle (Instantaneous hardware coordinate)
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;

      if (!isVisible) {
        isVisible = true;
        ringX = targetX;
        ringY = targetY;
        spotX = targetX;
        spotY = targetY;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        if (spotlight) spotlight.style.opacity = '1';
      }
    };

    const updateCursorState = (state: 'default' | 'hover' | 'media' | 'text', text: string = '') => {
      if (currentState === state && (!label || label.textContent === text)) return;
      currentState = state;
      ring.setAttribute('data-cursor-state', state);

      if (label) {
        label.textContent = text;
        label.style.display = text ? 'block' : 'none';
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor') || '';
        if (type === 'play') {
          updateCursorState('media', 'PLAY');
          return;
        }
        if (type === 'explore' || type === 'view') {
          updateCursorState('media', 'VIEW');
          return;
        }
        if (type === 'flip') {
          updateCursorState('media', 'FLIP');
          return;
        }
      }

      // Video elements
      if (target.closest('video, .hero-video-container')) {
        updateCursorState('media', 'SOUND');
        return;
      }

      // Text input fields
      if (target.closest('input, textarea, [contenteditable="true"]')) {
        updateCursorState('text', '');
        return;
      }

      // Interactive clickable elements (buttons, links, controls)
      if (
        target.closest(
          'a, button, [role="button"], [role="tab"], .cursor-pointer, input[type="submit"]'
        )
      ) {
        updateCursorState('hover', '');
        return;
      }

      // Default baseline
      updateCursorState('default', '');
    };

    const onMouseDown = () => {
      isPressed = true;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(1.6)`;
    };

    const onMouseUp = () => {
      isPressed = false;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(1)`;
    };

    const onMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      if (spotlight) spotlight.style.opacity = '0';
    };

    const onMouseEnter = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      ringX = targetX;
      ringY = targetY;
      spotX = targetX;
      spotY = targetY;
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      if (spotlight) spotlight.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <>
      {/* ── 1. AMBIENT GLOW SPOTLIGHT (Photonic Trail) ── */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-[480px] h-[480px] rounded-full pointer-events-none z-[9990] opacity-0 hidden md:block will-change-transform transform-gpu transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle, rgba(56, 189, 248, 0.06) 0%, rgba(255, 255, 255, 0.02) 35%, transparent 70%)',
        }}
      />

      {/* ── 2. FLUID VELOCITY RING ── */}
      <div
        ref={ringRef}
        data-cursor-state="default"
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center opacity-0 hidden md:flex will-change-transform transform-gpu cursor-ring-element"
      >
        <span
          ref={labelRef}
          className="text-[10px] font-mono font-bold tracking-widest text-cyan-300 uppercase drop-shadow-[0_0_6px_rgba(34,211,238,0.8)] hidden select-none"
        />
      </div>

      {/* ── 3. 0MS INSTANT LASER DOT RETICLE ── */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full opacity-0 hidden md:block will-change-transform transform-gpu cursor-dot-element"
      />
    </>
  );
}
