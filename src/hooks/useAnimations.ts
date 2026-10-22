// ─────────────────────────────────────────────
// SYMMETRY — Global Scroll & Pop Animations Hook
// ─────────────────────────────────────────────

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollPopAnimations() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Refresh ScrollTrigger after DOM settle
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();

      // Batch animate icons to pop one by one
      ScrollTrigger.batch('.pop-icon', {
        interval: 0.1,
        batchMax: 6,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { scale: 0.3, opacity: 0, rotation: -15 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.6,
              stagger: 0.12,
              ease: 'back.out(2)',
              overwrite: 'auto',
            }
          );
        },
        start: 'top 88%',
      });

      // Batch animate cards to slide & pop up smoothly
      ScrollTrigger.batch('.pop-card', {
        interval: 0.15,
        batchMax: 4,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { y: 20, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
              overwrite: 'auto',
            }
          );
        },
        start: 'top 92%',
      });

      // Section titles reveal
      gsap.utils.toArray<HTMLElement>('.pop-heading').forEach((heading) => {
        gsap.fromTo(
          heading,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
            },
          }
        );
      });
    }, 200);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}
