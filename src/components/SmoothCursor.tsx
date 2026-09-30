// ─────────────────────────────────────────────
// SYMMETRY — Butter-Smooth Ambient Spotlight
// Ultra-Responsive 60fps GPU Cursor Lighting
// ─────────────────────────────────────────────

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function SmoothCursor() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = spotlightRef.current;
    if (!el) return;

    // Use gsap.quickTo for instant, lag-free 60fps tracking
    const xTo = gsap.quickTo(el, 'x', { duration: 0.14, ease: 'power2.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.14, ease: 'power2.out' });

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.to(el, { opacity: 1, duration: 0.25 });
        isVisible = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseLeave = () => {
      gsap.to(el, { opacity: 0, duration: 0.25 });
      isVisible = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="fixed top-0 left-0 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-30 opacity-0 transition-opacity hidden md:block will-change-transform transform-gpu"
      style={{
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 40%, transparent 70%)',
      }}
    />
  );
}
