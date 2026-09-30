// ─────────────────────────────────────────────
// SYMMETRY — Terms of Service & Enterprise Agreements
// ─────────────────────────────────────────────

import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, ArrowLeft, ShieldCheck, Scale, Zap } from 'lucide-react';
import { useEffect } from 'react';

export default function TermsPage() {
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
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8e8e9c] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </Link>

        {/* Header */}
        <div className="mb-14 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#9e9ea7] mb-4">
            <Scale className="w-3.5 h-3.5 text-white" />
            <span>COMMERCIAL TERMS OF SERVICE</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            TERMS & <span className="chrome-text">CONDITIONS</span>
          </h1>
          <p className="font-mono text-xs text-[#828290]">
            Effective Date: September 2026 • Governing Law: Standard International Commercial Arbitration
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-12 font-body text-sm text-[#a4a4b2] leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="font-display font-bold text-xl text-white mb-3 flex items-center gap-2">
              <span className="font-mono text-xs text-[#70707c]">01 //</span>
              Engagement Framework & Statement of Work
            </h2>
            <p>
              These Terms of Service govern all business engagements with SYMMETRY ("Company", "we", "us"). Individual project scopes, milestones, render quotas, and SLA benchmarks are formalized via a written Statement of Work (SOW) or digital partnership confirmation.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-display font-bold text-xl text-white mb-3 flex items-center gap-2">
              <span className="font-mono text-xs text-[#70707c]">02 //</span>
              AI Technology & Intellectual Property Transfer
            </h2>
            <p className="mb-3">
              SYMMETRY employs proprietary generative architectures, diffusion models, and procedural motion code.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#b8b8c6]">
              <li><strong className="text-white">Client Deliverables:</strong> All final rendered video files, motion graphics assets, landing page codebases, and custom creative outputs belong exclusively to the client with full worldwide commercial rights upon settlement of invoices.</li>
              <li><strong className="text-white">Underlying Tooling:</strong> SYMMETRY retains ownership of pre-existing internal scripts, model orchestrators, and prompt scaffolding, granting the client a perpetual, royalty-free license to use deliverables.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-display font-bold text-xl text-white mb-3 flex items-center gap-2">
              <span className="font-mono text-xs text-[#70707c]">03 //</span>
              Strict Confidentiality & Mutual NDA
            </h2>
            <p>
              Both parties agree to treat all unreleased product details, business metrics, prompt libraries, and strategic roadmaps as strictly confidential. This obligation persists indefinitely beyond the conclusion of the business relationship.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-display font-bold text-xl text-white mb-3 flex items-center gap-2">
              <span className="font-mono text-xs text-[#70707c]">04 //</span>
              Quality Assurance & Production SLAs
            </h2>
            <p>
              We guarantee delivery of high-fidelity creative assets aligned with the aesthetic standards established in the approved brief. Each milestone includes structured revision rounds to fine-tune motion physics, lighting, and copy hierarchy.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-display font-bold text-xl text-white mb-3 flex items-center gap-2">
              <span className="font-mono text-xs text-[#70707c]">05 //</span>
              Ethical AI Use & Prohibited Content
            </h2>
            <p>
              SYMMETRY will not produce deceptive synthetic media, defamatory representations, infringing deepfakes, or content violating international copyright standards. All marketing assets are verified for commercial distribution compliance.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-display font-bold text-xl text-white mb-3 flex items-center gap-2">
              <span className="font-mono text-xs text-[#70707c]">06 //</span>
              Limitation of Liability
            </h2>
            <p>
              Except in cases of gross negligence or willful misconduct, neither party shall be liable for indirect, consequential, or punitive damages. Total aggregate liability under any Statement of Work is capped at the total fees paid by client under that specific agreement.
            </p>
          </section>

          {/* Contact */}
          <section className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="font-display font-bold text-base text-white mb-2">
              Commercial Inquiries & Contract Administration
            </h3>
            <p className="text-xs text-[#8e8e9c]">
              To execute a master services agreement (MSA) or custom enterprise SLA:
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
