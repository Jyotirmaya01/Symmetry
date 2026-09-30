// ─────────────────────────────────────────────
// SYMMETRY — Homepage Architecture
// ─────────────────────────────────────────────

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BentoServices from '@/components/BentoServices';
import MotionShowcase from '@/components/MotionShowcase';
import AiVideoShowcase from '@/components/AiVideoShowcase';
import ProjectVaultSection from '@/components/ProjectVaultSection';
import SymmetryProcess from '@/components/SymmetryProcess';
import ClientImpact from '@/components/ClientImpact';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { useScrollPopAnimations } from '@/hooks/useAnimations';

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

        {/* 3. High-Definition Motion Graphics & Video Theater (Samsung, Claude, Spotify) */}
        <MotionShowcase />

        {/* 4. AI Video Production & Commercial Gallery (Jewellery, Yapi, Bakery, Spotify, Netflix, Coffee) */}
        <AiVideoShowcase />

        {/* 5. Master Client Vault & Raw 4K Google Drive Repository */}
        <ProjectVaultSection />

        {/* 6. The 4-Stage Symmetry Protocol */}
        <SymmetryProcess />

        {/* 7. Enterprise Outcomes & Verified Testimonials */}
        <ClientImpact />

        {/* 8. Grand CTA & Direct Project Inquiry Form */}
        <CTASection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
