// ─────────────────────────────────────────────
// SYMMETRY — Enterprise Security & Infrastructure Charter
// ─────────────────────────────────────────────

import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Lock, Server, Key, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

export default function SecurityPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-36 pb-24">
        {/* Back Navigation */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#b4b4c4] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </Link>

        {/* Header */}
        <div className="mb-14 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#b4b4c0] mb-4">
            <Shield className="w-3.5 h-3.5 text-white" />
            <span>ENTERPRISE SECURITY INFRASTRUCTURE</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            SECURITY & <span className="chrome-text">INFRASTRUCTURE</span>
          </h1>
          <p className="font-mono text-xs text-[#b4b4c4]">
            Defense-in-depth architecture engineered for global brands and regulated industries.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <Server className="w-6 h-6 text-white mb-3" />
            <h3 className="font-display font-bold text-base text-white mb-1">
              Isolated VPCs
            </h3>
            <p className="font-body text-xs text-[#b4b4c4] leading-relaxed">
              Dedicated neural inference compute clusters isolated by hardware security modules.
            </p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <Key className="w-6 h-6 text-white mb-3" />
            <h3 className="font-display font-bold text-base text-white mb-1">
              End-to-End Encryption
            </h3>
            <p className="font-body text-xs text-[#b4b4c4] leading-relaxed">
              All client assets encrypted with AES-256 at rest and TLS 1.3 in transit.
            </p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <Lock className="w-6 h-6 text-white mb-3" />
            <h3 className="font-display font-bold text-base text-white mb-1">
              Zero-Retention Policy
            </h3>
            <p className="font-body text-xs text-[#b4b4c4] leading-relaxed">
              Model inputs and fine-tuned weights never cross-pollinate with external tenants.
            </p>
          </div>
        </div>

        {/* Detailed Security Controls */}
        <div className="space-y-10 font-body text-sm text-[#b8b8c6] leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-xl text-white mb-3">
              1. Compute & Model Segregation
            </h2>
            <p>
              Our automated rendering engines and generative workers execute in ephemeral containers destroyed immediately upon render completion. Custom LoRA weights and embeddings are maintained in encrypted customer-managed key (CMEK) storage buckets.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-white mb-3">
              2. Access Control & Multi-Factor Enforcement
            </h2>
            <p>
              Only vetted creative engineers with strict background clearance access production pipelines. All human access enforces hardware FIDO2 multi-factor authentication with comprehensive immutable audit logging.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-white mb-3">
              3. Continuous Vulnerability Management
            </h2>
            <p>
              We conduct automated static code analysis, third-party dependency auditing, and regular penetration testing. We maintain a responsible disclosure bug bounty program with global security researchers.
            </p>
          </section>

          {/* Security Contact */}
          <section className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="font-display font-bold text-base text-white mb-2">
              Request Enterprise Security Whitepaper
            </h3>
            <p className="text-xs text-[#b4b4c4]">
              To request our SOC2 report, architectural diagrams, or submit vendor questionnaires:
              <br />
              <span className="text-white font-mono mt-1 block">symmetryofficial1@gmail.com</span>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
