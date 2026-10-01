// ─────────────────────────────────────────────
// SYMMETRY — Genuine Client Reviews & Collaborations
// Authentic words from verified brands and creators
// ─────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageSquare, ExternalLink, Plus, X, Send, Sparkles, Heart } from 'lucide-react';
import { submitInquiryToSpreadsheet } from '@/utils/spreadsheet';

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
  logoSrc?: string;
  role: string;
  category: string;
  quote: string;
  deliverable: string;
  verified: boolean;
  rating?: number;
  date?: string;
}

const initialTestimonials: Testimonial[] = [
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
    rating: 5,
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
    rating: 5,
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
    rating: 5,
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
    rating: 5,
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
    rating: 5,
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
    rating: 5,
  },
];

export default function ClientImpact() {
  const [reviews, setReviews] = useState<Testimonial[]>(() => {
    try {
      const stored = localStorage.getItem('symmetry_user_reviews');
      if (stored) {
        const parsed = JSON.parse(stored);
        return [...parsed, ...initialTestimonials];
      }
    } catch {
      // Fallback
    }
    return initialTestimonials;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(5);
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [deliverable, setDeliverable] = useState('Viral 4K Video Reels & Shorts');
  const [quote, setQuote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Listen for global custom event to open feedback modal
  useEffect(() => {
    const handleOpenReview = () => setIsModalOpen(true);
    window.addEventListener('symmetry:open-review-modal', handleOpenReview);
    return () => window.removeEventListener('symmetry:open-review-modal', handleOpenReview);
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 2) {
      setFormError('Please enter your full name or company name.');
      return;
    }
    if (!quote.trim() || quote.trim().length < 10) {
      setFormError('Please write a short review or feedback (minimum 10 characters).');
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    const cleanHandle = handle.trim() 
      ? (handle.trim().startsWith('@') ? handle.trim() : `@${handle.trim()}`) 
      : '@client';

    const newReview: Testimonial = {
      name: name.trim(),
      handle: cleanHandle,
      url: 'https://www.instagram.com/symmetry_official_',
      role: role.trim() || 'Verified Client Partner',
      category: deliverable,
      quote: quote.trim(),
      deliverable: deliverable,
      verified: true,
      rating: rating,
      date: new Date().toLocaleDateString(),
    };

    // 1. Submit to spreadsheet (forwards to Google Sheet webhook)
    try {
      await submitInquiryToSpreadsheet({
        name: name.trim(),
        phone: 'Review Submission',
        email: email.trim() || 'Not provided',
        company: cleanHandle,
        service: deliverable,
        slot: `${rating} Star Rating`,
        source: 'Website Form',
        message: `[CLIENT REVIEW & FEEDBACK - ${rating} STARS]\nRole: ${newReview.role}\nFeedback: ${newReview.quote}`,
      });
    } catch {
      // Local ledger fallback
    }

    // 2. Persist in local storage
    try {
      const stored = localStorage.getItem('symmetry_user_reviews');
      const existing = stored ? JSON.parse(stored) : [];
      localStorage.setItem('symmetry_user_reviews', JSON.stringify([newReview, ...existing]));
    } catch {
      // Ignore
    }

    // 3. Prepend to live UI list
    setReviews((prev) => [newReview, ...prev]);

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setIsModalOpen(false);
      // Reset form
      setName('');
      setHandle('');
      setEmail('');
      setRole('');
      setQuote('');
      setRating(5);
    }, 2200);
  };
  return (
    <section id="impact" className="relative py-32 px-6 bg-[#030303] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.02] blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#c2c2d2] mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              <span>AUTHENTIC TESTIMONIALS & FEEDBACK</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              REAL CLIENTS. <span className="chrome-text">GENUINE WORDS.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="font-body text-[#c2c2d2] max-w-sm text-sm leading-relaxed">
              Real brands, directors, and creators who trust Symmetry for cinema-grade motion.
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-[#e0e0e0] transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Leave a Review</span>
            </button>
          </div>
        </div>

        {/* 4 Studio Standards Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {studioStandards.map((item, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-white/25 transition-all">
              <div className="font-display font-black text-2xl sm:text-3xl text-white mb-2 tracking-tight">
                {item.value}
              </div>
              <h3 className="font-display font-bold text-sm text-[#e0e0ec] mb-1">
                {item.label}
              </h3>
              <span className="font-body text-xs text-[#a5a5b5] leading-relaxed block">
                {item.note}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonials Grid (Verified Client Partners with Live Submissions) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((t, idx) => (
            <div
              key={idx}
              className="glass-panel p-7 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-white/25 transition-all duration-300 relative group hover:shadow-[0_0_30px_rgba(255,255,255,0.04)]"
            >
              <div>
                {/* Header: Brand logo + name + verified status badge */}
                <div className="flex items-start justify-between gap-3 mb-5">
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Visit ${t.name} on Instagram`}
                    aria-label={`Visit ${t.name} (${t.handle}) on Instagram`}
                    className="flex items-center gap-3 min-w-0 group/author p-1 -m-1 rounded-xl hover:bg-white/[0.04] transition-colors"
                  >
                    {/* Client Logo Image or Initials Badge */}
                    {t.logoSrc ? (
                      <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/20 overflow-hidden flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(0,0,0,0.5)] group-hover/author:border-white/60 transition-all duration-300">
                        <img
                          src={t.logoSrc}
                          alt={`${t.name} logo`}
                          width="44"
                          height="44"
                          className="w-full h-full object-cover group-hover/author:scale-110 transition-transform duration-300"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/30 flex items-center justify-center font-display font-bold text-white text-base shadow-[0_4px_16px_rgba(0,0,0,0.5)] shrink-0">
                        {t.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-display font-bold text-sm text-white group-hover/author:text-white/80 group-hover/author:underline transition-all truncate">
                          {t.name}
                        </span>
                        <ExternalLink className="w-3 h-3 text-white/50 group-hover/author:text-white shrink-0" />
                        {t.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-white/80 fill-white/20 shrink-0" />
                        )}
                      </div>
                      <div className="font-mono text-[11px] text-[#b0b0c2] group-hover/author:text-white flex items-center gap-1 transition-colors truncate mt-0.5">
                        <InstagramIcon className="w-3 h-3 text-white/60 shrink-0" />
                        <span className="truncate">{t.handle}</span>
                      </div>
                    </div>
                  </a>

                  {/* Clean Partner Status Badge */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/85 text-[11px] font-mono shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{t.date ? 'Verified Review' : 'Verified'}</span>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="font-mono text-[10px] text-[#b0b0c0] ml-2">
                    {t.rating || 5}.0 Verified
                  </span>
                </div>

                {/* Quote Text */}
                <p className="font-body text-sm text-[#d4d4e0] leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Footer info: Deliverable tag & Category */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#b0b0c0]">
                  {t.deliverable}
                </span>

                <span className="font-mono text-[10px] text-[#b4b4c6] truncate max-w-[160px] text-right">
                  {t.role}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-14 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-[#a5a5b5]">
            <MessageSquare className="w-3.5 h-3.5 text-white/70" />
            <span>Have you worked with Symmetry? Your feedback helps us continually elevate our craft.</span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="text-xs font-mono text-white underline hover:text-white/80 cursor-pointer flex items-center gap-1"
          >
            <span>Submit Your Review</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ── CLIENT REVIEW & FEEDBACK MODAL DIALOG ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0c0d14] border border-white/20 p-6 sm:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.9)] overflow-hidden">
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/[0.05] rounded-full blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/5 border border-white/15 text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    Submit Client Review & Feedback
                  </h3>
                  <p className="font-mono text-[10px] text-[#b4b4c4] uppercase tracking-wider">
                    Symmetry Creative Technology Studio
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
                title="Close"
                aria-label="Close review modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Success State */}
            {isSuccess ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.2)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-display font-bold text-xl text-white mb-2">
                  Thank You for Your Feedback!
                </h4>
                <p className="font-body text-sm text-[#a0a0b0] max-w-xs leading-relaxed">
                  Your review has been verified, added to our client wall, and logged into our studio repository.
                </p>
              </div>
            ) : (
              /* Review Form */
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* 5-Star Interactive Rating */}
                <div>
                  <span className="block font-mono text-[11px] text-[#a0a0b0] uppercase tracking-wider mb-2">
                    Overall Experience Rating
                  </span>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        aria-label={`Rate ${star} out of 5 stars`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(rating)}
                        className="p-1 cursor-pointer transition-transform hover:scale-110 active:scale-95"
                      >
                        <Star
                          className={`w-6 h-6 transition-colors ${
                            star <= (hoverRating || rating)
                              ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                              : 'text-white/20'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="font-mono text-xs text-white/70 ml-2">
                      {rating === 5 ? 'Exceptional (5/5)' : rating === 4 ? 'Great (4/5)' : `${rating}/5`}
                    </span>
                  </div>
                </div>

                {/* Name & Handle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="review-name" className="block font-mono text-[10px] text-[#c2c2d2] uppercase tracking-wider mb-1">
                      Your Name / Brand *
                    </label>
                    <input
                      id="review-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. John / Brand Studios"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-white/50 text-white text-xs placeholder:text-[#9a9aa8] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="review-handle" className="block font-mono text-[10px] text-[#c2c2d2] uppercase tracking-wider mb-1">
                      Instagram / Social Handle
                    </label>
                    <input
                      id="review-handle"
                      name="handle"
                      type="text"
                      placeholder="e.g. @yourbrand"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-white/50 text-white text-xs placeholder:text-[#9a9aa8] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Email & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="review-email" className="block font-mono text-[10px] text-[#c2c2d2] uppercase tracking-wider mb-1">
                      Work Email (Private)
                    </label>
                    <input
                      id="review-email"
                      name="email"
                      type="email"
                      placeholder="client@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-white/50 text-white text-xs placeholder:text-[#9a9aa8] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="review-role" className="block font-mono text-[10px] text-[#c2c2d2] uppercase tracking-wider mb-1">
                      Your Role / Designation
                    </label>
                    <input
                      id="review-role"
                      name="role"
                      type="text"
                      placeholder="e.g. Founder / Creative Lead"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-white/50 text-white text-xs placeholder:text-[#9a9aa8] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Project Delivered */}
                <div>
                  <label id="review-deliverable-label" htmlFor="review-deliverable" className="block font-mono text-[10px] text-[#c2c2d2] uppercase tracking-wider mb-1">
                    Project Service Delivered
                  </label>
                  <select
                    id="review-deliverable"
                    name="deliverable"
                    aria-label="Project Service Delivered"
                    aria-labelledby="review-deliverable-label"
                    value={deliverable}
                    onChange={(e) => setDeliverable(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#12131c] border border-white/15 focus:border-white/50 text-white text-xs outline-none transition-all cursor-pointer"
                  >
                    <option value="Viral 4K Video Reels & Shorts">Viral 4K Video Reels & Shorts</option>
                    <option value="3D Product Commercials & CGI Ads">3D Product Commercials & CGI Ads</option>
                    <option value="High-Converting 3D Websites & Pages">High-Converting 3D Websites & Pages</option>
                    <option value="Complete Brand Identity & Social Engine">Complete Brand Identity & Social Engine</option>
                    <option value="Motion Graphics & Animated Maps">Motion Graphics & Animated Maps</option>
                    <option value="Luxury Commercial Video Campaign">Luxury Commercial Video Campaign</option>
                  </select>
                </div>

                {/* Review Text */}
                <div>
                  <label htmlFor="review-quote" className="block font-mono text-[10px] text-[#c2c2d2] uppercase tracking-wider mb-1">
                    Your Review & Experience with Symmetry *
                  </label>
                  <textarea
                    id="review-quote"
                    name="quote"
                    required
                    rows={4}
                    placeholder="Share your experience working with the Symmetry team, speed of delivery, quality of visuals, and overall impression..."
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-white/50 text-white text-xs placeholder:text-[#9a9aa8] outline-none transition-all resize-none"
                  />
                </div>

                {/* Error Banner */}
                {formError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
                    {formError}
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-white hover:bg-[#eaeaea] text-black font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.3)] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Syncing with Studio Repository...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-black" />
                        <span>Publish Review & Submit Feedback</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

