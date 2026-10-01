// ─────────────────────────────────────────────
// SYMMETRY — Master Project Vault & Archive Redirection Section
// Direct portal to Google Drive Raw 4K ProRes & Master Repositories
// ─────────────────────────────────────────────

import { FolderGit2, ArrowUpRight, HardDrive, Compass, ExternalLink, ShieldCheck, Film, Layers, PlaySquare } from 'lucide-react';

const MASTER_DRIVE_URL = 'https://drive.google.com/drive/folders/1X8UtAyRPrM2zxo1IJiGWY4afLvLYOCx8';
const JEWELLERY_DRIVE_URL = 'https://drive.google.com/drive/folders/1AM5MOTOaYqnVakOe-OZgjc9OoXMbJGEh';

const vaultCategories = [
  {
    title: 'Jewellery & High-Luxury Brand Commercials',
    tag: 'Dedicated Subfolder',
    description: '4K macro jewelry camera passes, diamond refraction caustics, and gold physics reels.',
    badge: '1088x1920 9:16 Vertical',
    url: JEWELLERY_DRIVE_URL,
    deliverables: 'Raw ProRes 4444XQ + Clean Plates',
  },
  {
    title: 'Consumer Hardware & Flagship Tech Films',
    tag: 'Samsung & Claude AI',
    description: 'Hardware lighting rigs, procedural titanium geometry, and neural architecture kinetic systems.',
    badge: 'Dual 9:16 + 16:9 Masters',
    url: MASTER_DRIVE_URL,
    deliverables: 'Cinema 4D + After Effects Project Nodes',
  },
  {
    title: 'Global Audio & Streaming Entertainment',
    tag: 'Spotify & Netflix',
    description: 'Beat-reactive waveform simulations, kinetic streaming stingers, and high-retention campaigns.',
    badge: '60 FPS Broadcast Master',
    url: MASTER_DRIVE_URL,
    deliverables: 'Stems + Waveform Particle Assets',
  },
  {
    title: 'CPG, Botanical Skincare & Artisan Cinema',
    tag: 'Yapi Cosmetics & 3-Star Bakery',
    description: 'Microscopic fluid dynamics, slow-motion steam, and high-conversion e-commerce variants.',
    badge: 'Multi-Aspect Social Cuts',
    url: MASTER_DRIVE_URL,
    deliverables: 'TikTok & Meta Ad Sets + Color Graded Masters',
  },
];

export default function ProjectVaultSection() {
  return (
    <section id="vault" className="relative py-32 px-6 bg-[#030303] border-t border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-white/[0.03] via-white/[0.07] to-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#b4b4c0] mb-4">
            <HardDrive className="w-3.5 h-3.5 text-white" />
            <span>CLOUD ARCHIVE & REPOSITORY ACCESS</span>
          </div>

          <h2 className="pop-heading font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            CLIENT PROJECT VAULT // <span className="chrome-text">RAW 4K ARCHIVE</span>
          </h2>

          <p className="font-body text-[#b4b4c0] text-sm sm:text-base leading-relaxed mb-8">
            Access our private production directory containing full-resolution 4K ProRes deliverables, raw C4D/After Effects project scenes, and neural prompt pipelines across all commercial engagements.
          </p>

          {/* Master Drive Redirection Primary CTA */}
          <a
            href={MASTER_DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-[#eaeaea] text-black font-mono text-sm uppercase tracking-wider font-bold transition-all duration-300 shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          >
            <FolderGit2 className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
            <span>Open Complete Google Drive Master Vault (50+ Projects)</span>
            <ExternalLink className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* 4 Interactive Category Vault Tiles (Directly Redirecting) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vaultCategories.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open Google Drive repository for ${item.title}`}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 hover:border-white/40 transition-all duration-300 group relative flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:-translate-y-1 cursor-pointer"
            >
              {/* Corner Ambient Shine */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.04] rounded-full blur-2xl group-hover:bg-white/[0.08] transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-wider text-[#b0b0c0]">
                    <Compass className="w-3 h-3 text-white" />
                    <span>{item.tag}</span>
                  </span>

                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-semibold">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2 group-hover:text-white leading-snug flex items-center justify-between">
                  <span>{item.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0 ml-2" />
                </h3>

                <p className="font-body text-xs sm:text-sm text-[#a8a8b8] leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#a0a0b0] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#b0b0c0]" />
                  <span>{item.deliverables}</span>
                </span>

                <span className="text-white group-hover:underline flex items-center gap-1">
                  <span>View Project Folder</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Security & Access Assurance Note */}
        <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <p className="font-mono text-xs text-[#a5a5b5]">
              All client files are hosted on Google Cloud enterprise storage with high-speed uncompressed bandwidth and lifetime link persistence.
            </p>
          </div>

          <a
            href={MASTER_DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open master Google Drive folder containing all client deliverables"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white hover:text-white/80 whitespace-nowrap"
          >
            <span>Direct Folder Link</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
