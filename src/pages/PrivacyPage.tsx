// ─────────────────────────────────────────────
// SYMMETRY — Privacy Charter & AI Data Protection
// ─────────────────────────────────────────────

import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Lock, Cpu, EyeOff, FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';

export default function PrivacyPage() {
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
            <Lock className="w-3.5 h-3.5 text-white" />
            <span>ENTERPRISE PRIVACY CHARTER</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            PRIVACY & <span className="chrome-text">AI DATA GOVERNANCE</span>
          </h1>
          <p className="font-mono text-xs text-[#b4b4c4]">
            Effective Date: September 2026 • Document Version: 2.4-PROD
          </p>
        </div>

        {/* Core AI Guarantee Box */}
        <div className="glass-panel p-8 rounded-3xl border border-white/20 bg-gradient-to-br from-white/[0.04] to-transparent mb-12 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-6 h-6 text-white" />
            <h3 className="font-display font-bold text-lg text-white">
              The Symmetry Non-Training Guarantee
            </h3>
          </div>
          <p className="font-body text-sm text-[#c0c0cd] leading-relaxed mb-4">
            Under no circumstances are client intellectual property, uploaded media assets, prompt engineering architectures, custom LoRA weights, or internal enterprise data ingested to train public foundational AI models.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-white/90">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Public Model Retention</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Isolated Enterprise VPC Compute</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>End-to-End Encrypted Pipelines</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Client IP Ownership</span>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-12 font-body text-sm text-[#b8b8c6] leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="font-display font-bold text-xl text-white mb-3 flex items-center gap-2">
              <span className="font-mono text-xs text-[#c2c2d2]">01 //</span>
              Information We Collect & Process
            </h2>
            <p className="mb-3">
              SYMMETRY operates as an advanced AI creative technology agency. To design, render, automate, and deploy tailored digital solutions, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#b8b8c6]">
              <li><strong className="text-white">Business Engagement Data:</strong> Client contact details, enterprise domain, project specifications, and billing information.</li>
              <li><strong className="text-white">Creative & Brand Artifacts:</strong> Vector logos, 3D CAD files, color systems, style guides, and raw footage supplied for model fine-tuning.</li>
              <li><strong className="text-white">Workflow Telemetry:</strong> API response metrics, generation latency, and render completion logs necessary to fulfill SLAs.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-display font-bold text-xl text-white mb-3 flex items-center gap-2">
              <span className="font-mono text-xs text-[#c2c2d2]">02 //</span>
              Model Isolation & Enclave Processing
            </h2>
            <p>
              When developing custom AI solutions, video pipelines, or automated workflows, all model inference takes place in cryptographically segregated virtual private clouds (VPC). Client weights and LoRA adapters are stored in dedicated encrypted volumes with AES-256 standards and hardware-level isolation.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-display font-bold text-xl text-white mb-3 flex items-center gap-2">
              <span className="font-mono text-xs text-[#c2c2d2]">03 //</span>
              Ownership of AI-Generated Output
            </h2>
            <p>
              As between SYMMETRY and the client, all final deliverables—including generated 4K commercials, motion systems, procedural 3D models, landing page code, and thumbnail assets—are assigned 100% to the client upon full payment. SYMMETRY claims zero copyright or royalty over your commercial outputs.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-display font-bold text-xl text-white mb-3 flex items-center gap-2">
              <span className="font-mono text-xs text-[#c2c2d2]">04 //</span>
              Data Retention & Destruction
            </h2>
            <p>
              Raw source assets provided for project execution are retained exclusively for the duration of the project milestone plus a standard 30-day archival window for revision support. Upon written request, SYMMETRY issues a certified Certificate of Data Destruction verifying total purge from all cache tiers.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-display font-bold text-xl text-white mb-3 flex items-center gap-2">
              <span className="font-mono text-xs text-[#c2c2d2]">05 //</span>
              Global Regulatory Compliance
            </h2>
            <p>
              Our automated pipelines and synthetic generation workflows adhere strictly to the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and the European Union Artificial Intelligence Act (EU AI Act). We enforce watermarking removal only on authorized proprietary commercial deliverables.
            </p>
          </section>

          {/* Contact */}
          <section className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="font-display font-bold text-base text-white mb-2">
              Data Protection Officer & Security Inquiries
            </h3>
            <p className="text-xs text-[#b4b4c4]">
              For custom Data Processing Agreements (DPA), vendor security assessments, or audit logs:
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
