// ─────────────────────────────────────────────
// SYMMETRY — Homepage Architecture
// ─────────────────────────────────────────────

import { lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BentoServices from '@/components/BentoServices';
import Footer from '@/components/Footer';
import { useScrollPopAnimations } from '@/hooks/useAnimations';

// Lazy-load below-the-fold sections to minimize initial JS payload and optimize LCP
const MotionShowcase = lazy(() => import('@/components/MotionShowcase'));
const AiVideoShowcase = lazy(() => import('@/components/AiVideoShowcase'));
const ProjectVaultSection = lazy(() => import('@/components/ProjectVaultSection'));
const SymmetryProcess = lazy(() => import('@/components/SymmetryProcess'));
const AiStackSection = lazy(() => import('@/components/AiStackSection'));
const ClientImpact = lazy(() => import('@/components/ClientImpact'));
const CTASection = lazy(() => import('@/components/CTASection'));
const CarbonAd = lazy(() => import('@/components/CarbonAd'));

export default function HomePage() {
  // Activate scroll-triggered staggered pop animations for icons and cards
  useScrollPopAnimations();

  return (
    <div className="relative min-h-screen bg-[#030303] text-white selection:bg-white/20 selection:text-white">
      {/* Global Fixed Navbar */}
      <Navbar />

      {/* Main Page Flow */}
      <main>
        {/* 1. Cinematic Hero with Video Background */}
        <HeroSection />

        {/* 2. Interactive Bento Grid of All 12 AI Solutions */}
        <BentoServices />

        {/* Below-the-fold sections wrapped in Suspense for instant initial page render */}
        <Suspense fallback={null}>
          {/* 3. High-Definition Motion Graphics & Video Theater (Samsung, Claude, Spotify) */}
          <MotionShowcase />

          {/* 4. AI Video Production & Commercial Gallery (Jewellery, Yapi, Bakery, Spotify, Netflix, Coffee) */}
          <AiVideoShowcase />

          {/* 5. Master Client Vault & Raw 4K Google Drive Repository */}
          <ProjectVaultSection />

          {/* 6. The 4-Stage Symmetry Protocol */}
          <SymmetryProcess />

          {/* 7. Curated AI Production Arsenal & Tech Stack (Affiliate Engine) */}
          <AiStackSection />

          {/* 8. Enterprise Outcomes & Verified Testimonials */}
          <ClientImpact />

          {/* 9. Grand CTA & Direct Project Inquiry Form */}
          <CTASection />
        </Suspense>
      </main>

      {/* Discreet Carbon Ads Placement (Floating corner on desktop with dismissal) */}
      <Suspense fallback={null}>
        <div className="fixed bottom-6 right-6 z-40 hidden xl:block">
          <CarbonAd />
        </div>
      </Suspense>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
