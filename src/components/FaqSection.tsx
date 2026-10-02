// ─────────────────────────────────────────────
// SYMMETRY — FAQ & Search Optimization Accordion
// High-Intent Search Queries, Zero-Middleman Clarity & Rich Snippets
// ─────────────────────────────────────────────

import { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, MessageCircle, ArrowUpRight } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  badge: string;
  keywords: string[];
}

export const faqs: FaqItem[] = [
  {
    question: 'What services does Symmetry 3D motion design studio provide?',
    answer: 'Symmetry is a full-service 3D motion design studio and commercial video editing agency. We specialize in cinema-grade 3D product animations, photorealistic CGI commercials, viral 4K video reels (for Instagram, TikTok, and YouTube Shorts), documentary explainer graphics (Vox and Magnates Media style), and interactive 3D digital architecture built on Three.js.',
    badge: 'Core Services',
    keywords: ['3D motion design studio', 'video editing agency', 'CGI product animation'],
  },
  {
    question: 'What is the typical project turnaround time at Symmetry?',
    answer: 'Our standard production sprint delivers complete initial 4K masters and motion drafts within 48 to 72 hours. Because you work directly with our senior creative animators and editors without account manager middlemen, feedback loops are instantaneous and turnaround is drastically faster than traditional creative agencies.',
    badge: '48-72h Turnaround',
    keywords: ['rapid video turnaround', '48 hour animation delivery', 'fast video editing'],
  },
  {
    question: 'What video formats, aspect ratios, and resolutions do you deliver?',
    answer: 'Every project is delivered in uncompressed master quality (ProRes 4444 and pristine 4K H.264/H.265). We deliver multi-format exports including 9:16 vertical (optimized for Instagram Reels, TikTok, and YouTube Shorts) and 16:9 cinematic widescreen (for TV commercials, website hero headers, YouTube, and investor presentations).',
    badge: 'ProRes 4444 & 4K',
    keywords: ['4K video production', 'ProRes 4444 deliverables', '9:16 vertical video'],
  },
  {
    question: 'How does 3D CGI product animation boost ecommerce and DTC conversions?',
    answer: 'Photorealistic 3D product animations allow customers to visualize internal mechanics, materials, craftsmanship, and exploded views that physical cameras cannot capture. DTC and luxury brands using our 3D product renders consistently see higher average order value (AOV), reduced return rates, and up to a 60% boost in paid advertising click-through rates.',
    badge: 'High Conversion',
    keywords: ['3D product animation ecommerce', 'CGI ads for DTC', 'product visualization'],
  },
  {
    question: 'Do you produce high-retention video reels for creators and edtech brands?',
    answer: 'Yes! We engineer high-retention video reels and shorts for top global creators and institutions (including Crack UPSC Exams and Salman BLC). Our edits incorporate physiological hook timing, kinetic animated typography, custom sound design, map animations, and dynamic visual pacing designed to trigger viral algorithm distribution.',
    badge: 'Viral Retention',
    keywords: ['viral video reels agency', 'Instagram reels editor', 'TikTok video editing'],
  },
  {
    question: 'How do clients collaborate directly with the Symmetry creative team?',
    answer: 'We eliminate bureaucratic agency bureaucracy. Once booked, you receive direct access to a private Slack/WhatsApp channel and an organized Google Drive workspace. You collaborate directly with the director and lead artist with real-time screen shares, Loom reviews, and instant iterations.',
    badge: 'Direct Access',
    keywords: ['hire 3d motion designer', 'direct creative collaboration', 'no middlemen'],
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-28 px-6 bg-[#030303] border-t border-white/5 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.015] blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#b4b4c0] mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>KNOWLEDGE & FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="pop-heading font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            EVERYTHING YOU NEED <span className="chrome-text">TO KNOW</span>
          </h2>

          <p className="font-body text-sm sm:text-base text-[#a8a8b6] max-w-2xl mx-auto leading-relaxed">
            Clear, transparent answers about our 3D motion design services, 4K video editing workflows, 48–72h turnaround, and direct collaboration protocol.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white/[0.04] border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.04)]'
                    : 'bg-white/[0.015] border-white/10 hover:border-white/20 hover:bg-white/[0.025]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between gap-4 text-left cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/10 text-white/90 w-fit">
                      {faq.badge}
                    </span>
                    <h3 className="font-display font-semibold text-base sm:text-lg text-white group-hover:text-cyan-200 transition-colors">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-white/10 bg-white/5 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-white text-black' : 'text-white/60 group-hover:text-white'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-1 text-sm sm:text-base text-[#c4c4d4] font-body leading-relaxed border-t border-white/5">
                    <p className="mb-4">{faq.answer}</p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {faq.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="text-[10px] font-mono text-[#8e8e9e] bg-white/[0.03] px-2 py-0.5 rounded border border-white/5"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Consultation Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-white/[0.04] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-base">Have a bespoke project or custom scope?</h4>
              <p className="text-xs sm:text-sm text-[#9e9eae]">We respond within 2 hours with an actionable production roadmap.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="mailto:symmetryofficial1@gmail.com"
              className="px-5 py-2.5 rounded-full bg-white text-black font-display font-semibold text-xs uppercase tracking-wider hover:bg-[#e6e6e6] transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>Email Creative Director</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
