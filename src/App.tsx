// ─────────────────────────────────────────────
// SYMMETRY — App Root with Routing, Lenis & Loader
// ─────────────────────────────────────────────

import { useState, lazy, Suspense, Component, type ReactNode, type ErrorInfo } from 'react';
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

// ── Error Boundary for graceful fallback when lazy chunks fail ──
interface ErrorBoundaryProps { children: ReactNode; }
interface ErrorBoundaryState { hasError: boolean; }

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Symmetry ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[200px] px-6">
          <div className="text-center">
            <p className="font-mono text-sm text-[#b4b4c6] mb-3">Something went wrong loading this section.</p>
            <button
              onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
              className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono uppercase tracking-wider text-white transition-all cursor-pointer"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

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
      <ErrorBoundary>
        <Suspense fallback={null}>
          <AjBot />
        </Suspense>
      </ErrorBoundary>

      {/* Page Routing with Lazy Loading */}
      <ErrorBoundary>
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
      </ErrorBoundary>
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

