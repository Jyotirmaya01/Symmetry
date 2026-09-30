// ─────────────────────────────────────────────
// SYMMETRY — The 4-Stage AI Execution Architecture
// ─────────────────────────────────────────────

import { useState } from 'react';
import { Search, Sliders, Cpu, Rocket, ArrowRight, Check } from 'lucide-react';

const steps = [
  {
    number: '01',
    phase: 'DISCOVERY & ARCHITECTURE',
    title: 'Algorithmic Audit & AI Moat Blueprint',
    desc: 'We reverse-engineer your brand positioning, marketing funnel, and operational bottlenecks to build a bespoke AI roadmap targeting asymmetric ROI.',
    deliverables: ['Competitive AI Benchmark', 'Opportunity Heatmap', 'Tech Stack & Model Feasibility'],
    icon: Search,
  },
  {
    number: '02',
    phase: 'ENGINE CALIBRATION',
    title: 'Custom LoRA & Visual Weights Fine-Tuning',
    desc: 'Generic AI looks generic. We train bespoke checkpoints on your brand assets, color profiles, and product renders to ensure 100% brand consistency.',
    deliverables: ['Proprietary Style LoRA', 'Prompt & Node Graph Library', 'Brand Fidelity Guardrails'],
    icon: Sliders,
  },
  {
    number: '03',
    phase: 'SYNTHETIC PRODUCTION',
    title: 'High-Velocity Cinematic Motion & Assets',
    desc: 'Our motion directors orchestrate frontier diffusion and transformer models to produce 4K commercials, product videos, and dynamic ad variants.',
    deliverables: ['Master Commercial Cuts', 'Omnichannel Variants (9:16 / 16:9)', '60fps UI Motion Assets'],
    icon: Cpu,
  },
  {
    number: '04',
    phase: 'SCALE & EMBED',
    title: 'Autonomous Pipeline & Business Automation',
    desc: 'We don’t just hand over static exports. We integrate automated pipelines into your daily operations so your team can generate new assets in minutes.',
    deliverables: ['Custom Webhooks & Agent Workflows', 'Internal Generation Dashboard', 'Team Training & SLA Support'],
    icon: Rocket,
  },
];

export default function SymmetryProcess() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="relative py-32 px-6 bg-[#030303] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#9e9ea7] mb-4">
            <span>THE SYMMETRY PROTOCOL</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            FROM BLANK CANVAS TO <span className="chrome-text">PRODUCTION EXCELLENCE</span>
          </h2>
          <p className="font-body text-[#9e9ea7] text-sm sm:text-base leading-relaxed">
            Our 4-stage systematic pipeline streamlines creative production, delivering cinema-grade motion and brand identity without sacrificing visual prestige.
          </p>
        </div>

        {/* Process Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`pop-card glass-panel rounded-2xl p-7 flex flex-col justify-between cursor-pointer transition-all duration-400 relative overflow-hidden group ${
                  isSelected ? 'border-white/40 bg-white/[0.06] shadow-[0_0_30px_rgba(255,255,255,0.08)]' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-display font-black text-3xl text-white/20 group-hover:text-white/60 transition-colors">
                      {step.number}
                    </span>
                    <div className="pop-icon p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8e8e9c] block mb-2">
                    {step.phase}
                  </span>
                  <h3 className="font-display font-bold text-lg text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-xs text-[#a0a0ae] leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <span className="font-mono text-[10px] text-[#70707c] uppercase tracking-wider block mb-2">
                    Key Deliverables
                  </span>
                  <ul className="space-y-1.5">
                    {step.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2 text-[11px] font-mono text-[#c0c0cc]">
                        <Check className="w-3 h-3 text-white/70" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
