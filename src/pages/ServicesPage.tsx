// ─────────────────────────────────────────────
// SYMMETRY — Full Creative Services Directory
// Dedicated SEO Landing Page for Commercial Search Ranking
// ─────────────────────────────────────────────

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { servicesData } from '@/data/services';
import { 
  ArrowLeft, ArrowUpRight, CheckCircle2, Video, Diamond, 
  Code2, Activity, Palette, Image, Workflow, TrendingUp,
  Clock, ShieldCheck, Sparkles, MessageSquare
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Video, Diamond, Code2, Activity, Palette, Image, Workflow, TrendingUp
};

export default function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Creative Services & Production Pricing — SYMMETRY";
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-white/20 selection:text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-36 pb-24">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#b4b4c4] hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Homepage</span>
        </Link>

        {/* Hero Header */}
        <header className="mb-16 border-b border-white/10 pb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-widest text-[#38bdf8] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>FULL CREATIVE SERVICES DIRECTORY</span>
          </div>
          
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight mb-6">
            3D MOTION DESIGN &amp; <br />
            <span className="chrome-text">COMMERCIAL VIDEO SERVICES</span>
          </h1>

          <p className="font-body text-base sm:text-lg text-[#a8a8b6] leading-relaxed">
            From cinema-grade 3D product animations to viral 4K vertical reels, we engineer visual assets that elevate brand prestige and accelerate customer acquisition.
          </p>
        </header>

        {/* Key Delivery Commitments */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center">
            <Clock className="w-6 h-6 text-[#38bdf8] mx-auto mb-3" />
            <h3 className="font-display font-bold text-base text-white mb-1">48–72h Turnaround</h3>
            <p className="font-body text-xs text-[#a0a0b0]">Rapid sprint delivery for initial masters and cutdowns without agency friction.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center">
            <Diamond className="w-6 h-6 text-[#38bdf8] mx-auto mb-3" />
            <h3 className="font-display font-bold text-base text-white mb-1">Uncompressed 4K ProRes</h3>
            <p className="font-body text-xs text-[#a0a0b0]">Cinema broadcast-ready deliverables in both 9:16 vertical and 16:9 widescreen.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-center">
            <ShieldCheck className="w-6 h-6 text-[#38bdf8] mx-auto mb-3" />
            <h3 className="font-display font-bold text-base text-white mb-1">Direct Team Access</h3>
            <p className="font-body text-xs text-[#a0a0b0]">Private Slack and Google Drive channels with zero middlemen or account executive delays.</p>
          </div>
        </div>

        {/* All Services Matrix */}
        <section aria-label="Services Catalog" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {servicesData.map((service) => {
            const IconComponent = iconMap[service.icon] || Video;
            return (
              <article 
                key={service.id}
                id={service.id}
                className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-wider text-[#38bdf8]">
                      {service.badge}
                    </span>
                  </div>

                  <h2 className="font-display font-bold text-2xl text-white mb-2">
                    {service.title}
                  </h2>

                  <p className="font-body text-sm text-[#b0b0c0] leading-relaxed mb-6">
                    {service.fullDesc}
                  </p>

                  <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                    <span className="font-mono text-xs text-[#8e8e9e] uppercase tracking-wider">{service.metricLabel}</span>
                    <span className="font-display font-bold text-sm text-white">{service.metric}</span>
                  </div>

                  <ul className="space-y-2.5 mb-8">
                    {service.tags.map((tag) => (
                      <li key={tag} className="flex items-center gap-2.5 text-xs text-[#c0c0d0]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8] flex-shrink-0" />
                        <span>{tag}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <a
                    href="https://calendly.com/sabatanant883/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-display font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer"
                  >
                    <span>Book Strategy Call</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={`mailto:symmetryofficial1@gmail.com?subject=Inquiry regarding ${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#a0a0b0] hover:text-white transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquire via Email</span>
                  </a>
                </div>
              </article>
            );
          })}
        </section>

        {/* Bottom CTA Banner */}
        <section className="glass-panel p-10 sm:p-14 rounded-3xl border border-white/15 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-4">
              READY TO ELEVATE YOUR BRAND WITH SYMMETRY?
            </h2>
            <p className="font-body text-sm sm:text-base text-[#a0a0b0] mb-8">
              Discuss your deliverables directly with our team. We deliver custom scopes, clear sprint timelines, and transparent pricing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://calendly.com/sabatanant883/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-display font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all"
              >
                Book 30-Min Strategy Call
              </a>
              <Link
                to="/"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/5 border border-white/15 text-white font-display font-medium text-xs uppercase tracking-wider hover:bg-white/10 transition-all"
              >
                Explore Homepage Showreel
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
