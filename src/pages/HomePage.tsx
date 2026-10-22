// ─────────────────────────────────────────────
// SYMMETRY — Homepage Architecture (High-Performance Deferred Loading)
// ─────────────────────────────────────────────

import { lazy, Suspense, useState, useEffect, useRef, type ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import { useScrollPopAnimations } from '@/hooks/useAnimations';

// Lazy-load below-the-fold sections to minimize critical JS payload & optimize LCP
const BentoServices = lazy(() => import('@/components/BentoServices'));
const MotionShowcase = lazy(() => import('@/components/MotionShowcase'));
const AiVideoShowcase = lazy(() => import('@/components/AiVideoShowcase'));
const ProjectVaultSection = lazy(() => import('@/components/ProjectVaultSection'));
const SymmetryProcess = lazy(() => import('@/components/SymmetryProcess'));
const ClientImpact = lazy(() => import('@/components/ClientImpact'));
const FaqSection = lazy(() => import('@/components/FaqSection'));
const CTASection = lazy(() => import('@/components/CTASection'));

// Native IntersectionObserver section wrapper with prefetch margin
function LazySection({
  children,
  id,
  minHeight = 350,
}: {
  children: ReactNode;
  id?: string;
  minHeight?: number;
}) {
  const [shouldLoad, setShouldLoad] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      if (id && window.location.hash === `#${id}`) return true;
    }
    return false;
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldLoad) return;

    // Load if hash links to this section
    const checkHash = () => {
      if (id && window.location.hash === `#${id}`) {
        setShouldLoad(true);
      }
    };
    window.addEventListener('hashchange', checkHash);

    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px' }
    );

    observer.observe(el);
    return () => {
      window.removeEventListener('hashchange', checkHash);
      observer.disconnect();
    };
  }, [shouldLoad, id]);

  return (
    <div id={id} ref={ref} style={{ minHeight: shouldLoad ? undefined : minHeight }}>
      {shouldLoad ? children : null}
    </div>
  );
}

export default function HomePage() {
  // Activate scroll-triggered staggered pop animations for icons and cards
  useScrollPopAnimations();

  return (
    <div className="relative min-h-screen bg-[#030303] text-white selection:bg-white/20 selection:text-white">
      {/* Global Fixed Navbar */}
      <Navbar />

      {/* Main Page Flow */}
      <main>
        {/* 1. Cinematic Hero with Video Background & ElevenLabs Top Line */}
        <HeroSection />

        {/* Below-the-fold sections deferred via IntersectionObserver for instant LCP */}
        <Suspense fallback={null}>
          {/* 2. Interactive Bento Grid of All 12 AI Solutions */}
          <LazySection id="solutions" minHeight={450}>
            <BentoServices />
          </LazySection>

          {/* 3. High-Definition Motion Graphics & Video Theater (Samsung, Claude, Spotify) */}
          <LazySection id="showcase">
            <MotionShowcase />
          </LazySection>

          {/* 4. AI Video Production & Commercial Gallery (Jewellery, Yapi, Bakery, Spotify, Netflix, Coffee) */}
          <LazySection id="ai-video">
            <AiVideoShowcase />
          </LazySection>

          {/* 5. Master Client Vault & Raw 4K Google Drive Repository */}
          <LazySection id="vault">
            <ProjectVaultSection />
          </LazySection>

          {/* 6. The 4-Stage Symmetry Protocol */}
          <LazySection id="protocol">
            <SymmetryProcess />
          </LazySection>

          {/* 7. Enterprise Outcomes & Verified Testimonials */}
          <LazySection id="impact">
            <ClientImpact />
          </LazySection>

          {/* 8. Frequently Asked Questions (FAQ) & Topical Authority */}
          <LazySection id="faq">
            <FaqSection />
          </LazySection>

          {/* 9. Grand CTA & Direct Project Inquiry Form */}
          <LazySection id="contact">
            <CTASection />
          </LazySection>
        </Suspense>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
