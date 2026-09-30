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

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      autoResize: true,
    });

    window.__lenis = lenis;

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);

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
