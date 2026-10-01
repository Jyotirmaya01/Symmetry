// ─────────────────────────────────────────────
// SYMMETRY — Curated AI Production Arsenal & Tech Stack
// ─────────────────────────────────────────────

import { useState, useId } from 'react';
import {
  ExternalLink,
  Sparkles,
  Mic,
  Video,
  Eye,
  Box,
  Cpu,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { AI_TOOLS, AI_STACK_CATEGORIES, type AiTool } from '@/data/aiStack';

// Helper to assign thematic icons per category
function getCategoryIcon(category: AiTool['category']) {
  switch (category) {
    case 'Audio & Voice':
      return <Mic className="w-4 h-4 text-emerald-400" />;
    case 'AI Video & Motion':
      return <Video className="w-4 h-4 text-cyan-400" />;
    case 'Concept & Visuals':
      return <Eye className="w-4 h-4 text-violet-400" />;
    case '3D & Spatial':
      return <Box className="w-4 h-4 text-amber-400" />;
    case 'Compute & Code':
      return <Cpu className="w-4 h-4 text-blue-400" />;
    default:
      return <Sparkles className="w-4 h-4 text-white/70" />;
  }
}

export default function AiStackSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const sectionId = useId();

  const filteredTools =
    selectedCategory === 'All'
      ? AI_TOOLS
      : AI_TOOLS.filter((tool) => tool.category === selectedCategory);

  return (
    <section
      id="ai-stack"
      aria-label="AI Creative Stack and Production Arsenal"
      className="relative w-full py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-amber-500/10 blur-[140px] pointer-events-none -z-10"
      />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-widest text-emerald-400/90 mb-5 shadow-inner">
          <Zap className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
          <span>Curated Production Arsenal</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extralight tracking-tight text-white mb-6">
          The AI Tech Stack Powering{' '}
          <span className="font-semibold bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            Symmetry
          </span>
        </h2>

        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
          We believe in total creative transparency. These are the exact neural models, voice synthesis engines,
          and spatial 3D platforms our team deploys daily to engineer commercial spots and interactive media.
        </p>

        {/* Category Filter Pills */}
        <div
          role="tablist"
          aria-label="Filter tools by category"
          className="flex flex-wrap items-center justify-center gap-2 mt-8"
        >
          {AI_STACK_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-black shadow-lg shadow-white/10 scale-105'
                    : 'bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.07] border border-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredTools.map((tool) => {
          const isElevenLabs = tool.id === 'elevenlabs';

          return (
            <article
              key={tool.id}
              className={`group relative flex flex-col justify-between rounded-3xl p-7 transition-all duration-500 backdrop-blur-2xl ${
                isElevenLabs
                  ? 'bg-gradient-to-b from-emerald-950/20 via-black/80 to-black/90 border-2 border-emerald-500/40 shadow-2xl shadow-emerald-500/10 lg:col-span-1'
                  : 'bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              {/* Highlight badge for ElevenLabs or Featured partners */}
              {isElevenLabs && (
                <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-semibold text-[11px] uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Studio Audio Partner</span>
                </div>
              )}

              <div>
                {/* Header & Badges */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/[0.04] border border-white/5 text-xs text-neutral-300">
                    {getCategoryIcon(tool.category)}
                    <span className="font-mono text-[11px]">{tool.category}</span>
                  </div>

                  {tool.dealBadge && (
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
                      <Tag className="w-3 h-3" />
                      <span>{tool.dealBadge}</span>
                    </div>
                  )}
                </div>

                {/* Tool Name & Tagline */}
                <h3 className="text-xl sm:text-2xl font-medium text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4">
                  {tool.tagline}
                </p>

                {/* Description */}
                <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-light">
                  {tool.description}
                </p>

                {/* Key Capabilities List */}
                <div className="space-y-2 mb-6">
                  {tool.keyFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/80 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Footer / CTA Action */}
              <div className="pt-5 border-t border-white/5 mt-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono text-neutral-500 truncate">
                    {tool.metrics}
                  </span>
                </div>

                <a
                  href={tool.affiliateUrl}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isElevenLabs
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-black font-semibold shadow-lg shadow-emerald-500/20 hover:scale-[1.02]'
                      : 'bg-white/10 hover:bg-white/20 text-white hover:border-white/30 border border-white/10'
                  }`}
                  aria-label={`Explore ${tool.name} with partner benefits (opens in new tab)`}
                >
                  <span>{isElevenLabs ? 'Explore ElevenLabs' : `Explore ${tool.name}`}</span>
                  <ExternalLink className="w-4 h-4 opacity-80" />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* Transparency & Disclosure Notice (FTC & Google SEO Requirement) */}
      <div className="mt-16 max-w-2xl mx-auto text-center px-4 py-4 rounded-2xl bg-white/[0.02] border border-white/5">
        <p className="text-neutral-500 text-xs leading-relaxed font-mono">
          <span className="text-neutral-400 font-semibold uppercase tracking-wider">Partner Transparency:</span>{' '}
          Symmetry only showcases tools that we actively test, benchmark, and deploy in client deliverables. Certain links above are affiliate partnerships that provide promotional credits or commissions at zero additional cost to you.
        </p>
      </div>
    </section>
  );
}
