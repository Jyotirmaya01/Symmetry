// ─────────────────────────────────────────────
// SYMMETRY — App Root with Routing, Lenis & Loader
// ─────────────────────────────────────────────

import { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLenis } from '@/hooks/useLenis';
import HomePage from '@/pages/HomePage';
import SymmetryLoader from '@/components/SymmetryLoader';
import SmoothCursor from '@/components/SmoothCursor';

// Code-split heavy below-the-fold & secondary routes
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
const TermsPage = lazy(() => import('@/pages/TermsPage'));
const SecurityPage = lazy(() => import('@/pages/SecurityPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const AjBot = lazy(() => import('@/components/AjBot'));

function AppContent() {
  // Initialize luxury butter-smooth scrolling
  useLenis();

  // 3D Ladder & Bouncing Ball Preloader (Plays on website load)
  const [loading, setLoading] = useState(true);

  const handleLoaderComplete = () => {
    setLoading(false);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#030303] text-white">
      {/* 3D Ladder & Bouncing Ball Preloader */}
      {loading && <SymmetryLoader onComplete={handleLoaderComplete} />}

      {/* 60fps GPU Ambient Spotlight Cursor Follower */}
      <SmoothCursor />

      {/* Live Animated Creative Assistant & 1-Click Call Booker (Lazy loaded) */}
      <Suspense fallback={null}>
        <AjBot />
      </Suspense>

      {/* Page Routing with Lazy Loading */}
      <Suspense fallback={<div className="min-h-screen bg-[#030303]" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          {/* Dynamic 404 Error Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
