// ─────────────────────────────────────────────
// SYMMETRY — Carbon Ads Minimalist Native Wrapper
// ─────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react';
import { X, Sparkles, ExternalLink } from 'lucide-react';

interface CarbonAdProps {
  serveId?: string;
  placement?: string;
  className?: string;
}

export default function CarbonAd({
  serveId = import.meta.env.VITE_CARBON_SERVE_ID,
  placement = import.meta.env.VITE_CARBON_PLACEMENT || 'symmetry-studio.vercel.app',
  className = '',
}: CarbonAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Check if dismissed in this browsing session
    if (sessionStorage.getItem('symmetry_ad_dismissed') === 'true') {
      setIsDismissed(true);
      return;
    }

    if (!serveId || !containerRef.current) {
      return;
    }

    // Clean up any existing script
    const existingScript = document.getElementById('_carbonads_js');
    if (existingScript) {
      existingScript.remove();
    }

    // Inject Carbon Ads official script
    const script = document.createElement('script');
    script.id = '_carbonads_js';
    script.type = 'text/javascript';
    script.async = true;
    script.src = `//cdn.carbonads.com/carbon.js?serve=${serveId}&placement=${encodeURIComponent(placement)}`;

    script.onload = () => setIsLoaded(true);
    script.onerror = () => setIsLoaded(false);

    containerRef.current.appendChild(script);

    return () => {
      const el = document.getElementById('_carbonads_js');
      if (el) el.remove();
    };
  }, [serveId, placement]);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('symmetry_ad_dismissed', 'true');
  };

  if (isDismissed) return null;

  return (
    <aside
      aria-label="Sponsored Partner"
      className={`relative group bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 transition-all duration-300 shadow-2xl ${className}`}
    >
      {/* Dismiss Button */}
      <button
        onClick={handleDismiss}
        aria-label="Dismiss sponsor note"
        className="absolute top-2.5 right-2.5 p-1 rounded-full text-neutral-500 hover:text-white hover:bg-white/10 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Carbon Ads Script Injection Target */}
      <div ref={containerRef} id="carbon-container" className="min-h-[100px]">
        {/* Fallback / Pre-approval placeholder when no serveId is configured yet */}
        {!serveId && (
          <div className="flex flex-col gap-2.5 max-w-[280px]">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400">
              <Sparkles className="w-3 h-3" />
              <span>Studio Partner Spotlight</span>
            </div>

            <p className="text-xs text-neutral-300 leading-snug">
              Audio powered by <span className="font-semibold text-white">ElevenLabs</span>. Neural voice synthesis and dynamic SFX for modern cinema.
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <a
                href="https://try.elevenlabs.io/wvovc6eu0tnv"
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-medium transition-colors"
              >
                <span>Claim Starter Credits</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest">
                Partner
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles for Carbon Ads native injector */}
      <style>{`
        #carbonads {
          display: flex;
          max-width: 320px;
          background: transparent;
          text-align: left;
          font-family: inherit;
        }
        #carbonads .carbon-wrap {
          display: flex;
          gap: 12px;
        }
        #carbonads .carbon-img img {
          border-radius: 8px;
          display: block;
        }
        #carbonads .carbon-text {
          font-size: 12px;
          color: #a3a3a3;
          line-height: 1.4;
          text-decoration: none;
        }
        #carbonads .carbon-text:hover {
          color: #ffffff;
        }
        #carbonads .carbon-poweredby {
          display: block;
          margin-top: 6px;
          font-size: 9px;
          font-family: monospace;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #737373;
          text-decoration: none;
        }
        #carbonads .carbon-poweredby:hover {
          color: #10b981;
        }
      `}</style>
    </aside>
  );
}
