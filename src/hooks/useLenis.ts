// ─────────────────────────────────────────────
// SYMMETRY — Butter-Smooth Lenis Scroll Engine
// Tuned for Luxury Weight, Zero Jitter & High Inertia
// ─────────────────────────────────────────────

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    const lenis = new Lenis({
      duration: isTouch ? 0.6 : 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.0,
      syncTouch: false, // Let mobile use native GPU compositor momentum scrolling
      autoResize: true,
    });

    window.__lenis = lenis;

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    // Keep healthy lag smoothing (500ms max lag, 33ms adjusted) so mobile devices never freeze
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
}

// Helper function for silky smooth programmatic scrolling
export function smoothScrollTo(target: string | HTMLElement, offset: number = -60) {
  if (window.__lenis) {
    window.__lenis.scrollTo(target, { offset, duration: 1.3 });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
