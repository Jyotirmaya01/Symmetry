// ─────────────────────────────────────────────
// SYMMETRY — Genuine Client Reviews & Collaborations
// Authentic words from verified brands and creators
// ─────────────────────────────────────────────

import { Star, ShieldCheck, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';

function InstagramIcon({ className = 'w-3 h-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// Authentic studio standards — no fake corporate claims or inflated metrics
const studioStandards = [
  { value: 'PRORES 4444', label: 'Master Studio Quality', note: 'Lossless 4K color grading and uncompressed delivery' },
  { value: '9:16 & 16:9', label: 'Dual-Aspect Delivery', note: 'Custom framed for Reels, YouTube & Web formats' },
  { value: 'DIRECT TEAM', label: 'Symmetry Team Collaboration', note: 'Work directly with the Symmetry creative team — zero middlemen' },
  { value: '48–72 HRS', label: 'Project Delivery Window', note: 'Fast production sprints, clear communication, on-time delivery' },
];

interface Testimonial {
  name: string;
  handle: string;
  url: string;
  logoSrc: string;
  role: string;
  category: string;
  quote: string;
  deliverable: string;
  verified: boolean;
}

const testimonials: Testimonial[] = [
  {
    name: 'Crack UPSC Exams',
    handle: '@crackupscexams',
    url: 'https://www.instagram.com/crackupscexams?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==',
    logoSrc: '/media/clients/crack_upsc.jpg',
    role: 'Civil Services Prep & EdTech',
    category: 'Educational Reels & Animated Maps',
    quote: 'Most video editors just dump random flashy effects and loud sound that distract students. Symmetry actually understands educational pacing—clean animated maps, legible key points on screen, and zero fluff. Whenever sudden exam updates or current affairs break, they turn around reels within 48-72 hours without dropping quality. Retention on our reels has gone up noticeably.',
    deliverable: 'EdTech Motion & Map Reels',
    verified: true,
  },
  {
    name: 'Salman BLC',
    handle: '@salmanblcinteriordesigncoach',
    url: 'https://www.instagram.com/salmanblcinteriordesigncoach?stkn=cW4wY3JrZTdrZ203',
    logoSrc: '/media/clients/salman_blc.jpg',
    role: 'Interior Design Business Coach',
    category: 'High-Ticket Authority Content',
    quote: 'When your audience is interior designers and architects, anything sloppy or over-edited ruins your credibility immediately. Symmetry gave my talking-head videos an elevated, minimal aesthetic with seamless luxury B-roll cuts and clean typography. They get the brief right on the first draft and save me hours every single week.',
    deliverable: 'Luxury Coaching Reels',
    verified: true,
  },
  {
    name: 'Skyline Graphics',
    handle: '@skylinegraphics',
    url: 'https://www.instagram.com/symmetry_official_?stkn=aHUzajRrNmc2ZTR1',
    logoSrc: '/media/clients/skyline_graphics.jpg',
    role: 'Creative Design Studio',
    category: 'Motion Graphics & Visual Systems',
    quote: 'Symmetry delivered our motion graphics and visual identity assets with incredible speed and polish. The attention to detail on typography and easing transitions made our client deliverables stand out instantly.',
    deliverable: 'Motion Graphics & Brand Kit',
    verified: true,
  },
  {
    name: 'Ranking Partner',
    handle: '@rankingpartner',
    url: 'https://www.instagram.com/symmetry_official_?stkn=aHUzajRrNmc2ZTR1',
    logoSrc: '/media/clients/ranking_partner.jpg',
    role: 'Digital Growth & SEO Agency',
    category: 'High-Retention Reels & Social Hooks',
    quote: 'Finding someone who understands both visual pacing and social audience retention is rare. The video hooks and promotional reels Symmetry produced gave our client campaigns massive engagement and reach.',
    deliverable: 'Growth Reels & Dynamic Hooks',
    verified: true,
  },
  {
    name: 'Indie Extract',
    handle: '@indieextract',
    url: 'https://www.instagram.com/symmetry_official_?stkn=aHUzajRrNmc2ZTR1',
    logoSrc: '/media/clients/indie_extract.jpg',
    role: 'Botanical & Natural Extracts',
    category: 'Product Storytelling & Macro Commercials',
    quote: 'The commercial Symmetry created for Indie Extract captured the organic texture and purity of our essential oils perfectly. Clean, elegant, and delivered on time without any hassle.',
    deliverable: 'Botanical Product Video',
    verified: true,
  },
  {
    name: 'RKS Aroma',
    handle: '@rksaroma',
    url: 'https://www.instagram.com/symmetry_official_?stkn=aHUzajRrNmc2ZTR1',
    logoSrc: '/media/clients/rks_aroma.jpg',
    role: 'Luxury Fragrance & Aromatic Oils',
    category: 'Perfume Cinema & Bottle Visuals',
    quote: 'The aesthetic sensibility for luxury fragrance bottles, lighting, and mist effects was spot on. Symmetry brought our perfume range to life with cinema-level quality for our Instagram audience.',
    deliverable: 'Luxury Fragrance Reels',
    verified: true,
  },
];

export default function ClientImpact() {
  return (
    <section id="impact" className="relative py-32 px-6 bg-[#030303] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.02] blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#9e9ea7] mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>AUTHENTIC TESTIMONIALS</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              REAL CLIENTS. <span className="chrome-text">GENUINE WORDS.</span>
            </h2>
          </div>
          <p className="font-body text-[#9e9ea7] max-w-md text-sm sm:text-base leading-relaxed">
            No inflated numbers or fake guarantees. Real brands, creative directors, and founders who trust Symmetry for cinema-grade motion and visual storytelling.
          </p>
        </div>

        {/* 4 Studio Standards Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {studioStandards.map((item, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-white/25 transition-all">
              <div className="font-display font-black text-2xl sm:text-3xl text-white mb-2 tracking-tight">
                {item.value}
              </div>
              <h4 className="font-display font-bold text-sm text-[#d4d4dc] mb-1">
                {item.label}
              </h4>
              <span className="font-body text-xs text-[#80808e] leading-relaxed block">
                {item.note}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonials Grid (6 Verified Client Partners with Real Logos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="glass-panel p-7 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-white/25 transition-all duration-300 relative group hover:shadow-[0_0_30px_rgba(255,255,255,0.04)]"
            >
              <div>
                {/* Header: Brand logo + name + verified status badge */}
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Clickable Client Logo Image */}
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Visit ${t.name} on Instagram`}
                      className="w-11 h-11 rounded-xl bg-white/5 border border-white/20 overflow-hidden flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:border-white/60 transition-all duration-300 group/logo"
                    >
                      <img
                        src={t.logoSrc}
                        alt={`${t.name} logo`}
                        className="w-full h-full object-cover group-hover/logo:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                    </a>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <a
                          href={t.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Visit ${t.name} on Instagram`}
                          className="font-display font-bold text-sm text-white hover:text-white/80 hover:underline transition-all flex items-center gap-1.5 truncate"
                        >
                          <span className="truncate">{t.name}</span>
                          <ExternalLink className="w-3 h-3 text-white/50 hover:text-white shrink-0" />
                        </a>
                        {t.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-white/80 fill-white/20 shrink-0" />
                        )}
                      </div>
                      <a
                        href={t.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] text-[#8e8e9e] hover:text-white flex items-center gap-1 transition-colors truncate"
                      >
                        <InstagramIcon className="w-3 h-3 text-white/60 shrink-0" />
                        <span className="truncate">{t.handle}</span>
                      </a>
                    </div>
                  </div>

                  {/* Clean Partner Status Badge */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-[11px] font-mono shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Verified</span>
                  </div>
                </div>

                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-4 text-white">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
                  ))}
                  <span className="font-mono text-[10px] text-[#787886] ml-2">Verified Collaboration</span>
                </div>

                {/* Quote Text */}
                <p className="font-body text-sm text-[#c8c8d4] leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Footer info: Deliverable tag & Category */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#a0a0b0]">
                  {t.deliverable}
                </span>

                <span className="font-mono text-[10px] text-[#707080] truncate max-w-[160px] text-right">
                  {t.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Assurance Note */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-[#8a8a98]">
            <MessageSquare className="w-3.5 h-3.5 text-white/70" />
            <span>All reviews are from real collaborative client productions and verified brand partners.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

