// ─────────────────────────────────────────────
// SYMMETRY — 404 System Anomaly & Error Page
// Luxury Cyber-Chassis Aesthetic with Glitch Radar & Direct Navigation
// ─────────────────────────────────────────────

import { Link } from 'react-router-dom';
import { ArrowLeft, HardDrive, ShieldAlert, Mail, Terminal, RefreshCw, Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen bg-[#030303] text-white flex flex-col justify-between selection:bg-white/20 selection:text-white overflow-hidden">
      <Navbar />

      {/* Ambient background glow & grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <main className="relative z-10 flex-1 flex items-center justify-center py-32 px-6">
        <div className="max-w-3xl w-full mx-auto text-center">
          {/* Security Anomaly Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-mono uppercase tracking-widest text-red-400 mb-8 shadow-[0_0_20px_rgba(239,68,68,0.15)] animate-pulse">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>SECURITY MATRIX // PATH DESYNCHRONIZATION</span>
          </div>

          {/* Giant Chrome 404 */}
          <div className="relative select-none mb-6">
            <h1 className="font-display font-black text-8xl sm:text-[14rem] tracking-tighter leading-none chrome-text drop-shadow-[0_0_80px_rgba(255,255,255,0.2)]">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
              <span className="font-mono text-xs uppercase tracking-[0.5em] text-white">
                ANOMALY_VECTOR_NOT_FOUND
              </span>
            </div>
          </div>

          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white mb-4 tracking-tight">
            THE REQUESTED DIMENSION DOES NOT EXIST
          </h2>

          <p className="font-body text-[#9e9ea7] max-w-lg mx-auto text-sm sm:text-base leading-relaxed mb-10">
            The neural route you attempted to access has either migrated, decayed, or remains outside authorized sector coordinates.
          </p>

          {/* Simulated Diagnostics Terminal */}
          <div className="max-w-md mx-auto mb-10 p-4 rounded-2xl bg-black/80 border border-white/10 text-left font-mono text-[11px] text-[#8e8e9c] shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[#606070]">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-white/50" />
                <span>SYMMETRY_CORE_DIAGNOSTIC</span>
              </span>
              <span className="text-emerald-400">STATUS: RE-ROUTING</span>
            </div>
            <div className="space-y-1">
              <p><span className="text-[#606070]">$</span> ORIGIN_HASH: <span className="text-white">0x7F2A...9C1D</span></p>
              <p><span className="text-[#606070]">$</span> RATE_LIMITER: <span className="text-emerald-400">ACTIVE [3/min max]</span></p>
              <p><span className="text-[#606070]">$</span> GEO_LOCATION_SPOOF_FILTER: <span className="text-emerald-400">VERIFIED</span></p>
              <p><span className="text-[#606070]">$</span> RECOMMENDED_ACTION: <span className="text-white">RETURN_TO_BASE_GATEWAY</span></p>
            </div>
          </div>

          {/* Quick Navigation Recovery Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#e4e4e4] transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Return to Orbit</span>
            </Link>

            <Link
              to="/#vault"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <HardDrive className="w-4 h-4 text-white" />
              <span>Access Project Vault</span>
            </Link>

            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 text-white" />
              <span>Direct Inquiry</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
