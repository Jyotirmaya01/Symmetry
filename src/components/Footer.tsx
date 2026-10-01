// ─────────────────────────────────────────────
// SYMMETRY — Global Footer
// ─────────────────────────────────────────────

import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 px-6 bg-[#030303] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10 items-start">
          {/* Brand Info */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/20 p-0.5 bg-black/60 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <picture>
                  <source srcSet="/symmetry-logo.webp" type="image/webp" />
                  <img
                    src="/symmetry-logo.png"
                    alt="SYMMETRY Logo"
                    width="40"
                    height="40"
                    className="w-full h-full object-cover"
                  />
                </picture>
              </div>
              <span className="font-display font-extrabold text-xl tracking-[0.25em] text-white">
                SYMMETRY
              </span>
            </div>

            <p className="font-mono text-xs uppercase tracking-widest text-[#c0c0d0]">
              ALL IN ONE AI POWERED BUSINESS SOLUTION
            </p>

            <p className="font-body text-xs text-[#a5a5b5] max-w-sm leading-relaxed mt-2">
              Combining frontier machine intelligence, sculptural motion design, and high-velocity systems to move businesses forward.
            </p>

            <div className="flex items-center gap-2 pt-2 text-[11px] font-mono tracking-widest text-[#a5a5b5] uppercase">
              <span>IDEAS</span>
              <span className="text-white/30">•</span>
              <span>DESIGN</span>
              <span className="text-white/30">•</span>
              <span>TECHNOLOGY</span>
              <span className="text-white/30">•</span>
              <span>IMPACT</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-white mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs font-mono text-[#b4b4c6]">
              {[
                { name: 'Solutions', href: '/#solutions' },
                { name: 'Motion Graphics', href: '/#showreel' },
                { name: 'AI Commercials', href: '/#ai-videos' },
                { name: 'Project Vault (Drive)', href: '/#vault' },
                { name: 'Process', href: '/#process' },
                { name: 'AI Production Stack', href: '/#ai-stack' },
                { name: 'Impact & Reviews', href: '/#impact' },
                { name: 'Contact', href: '/#contact' },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-white transition-colors block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('symmetry:open-review-modal'))}
                  className="hover:text-white text-emerald-400 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>★ Leave a Review</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Connect & Socials */}
          <div className="md:col-span-3 flex flex-col justify-between h-full">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-white mb-4">
                Connect Directly
              </h3>

              {/* Verified Email */}
              <div className="mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#b4b4c6] block mb-1">
                  Direct Inquiries
                </span>
                <a
                  href="mailto:symmetryofficial1@gmail.com"
                  className="font-mono text-xs text-white hover:text-white/80 transition-colors block break-all font-medium"
                >
                  symmetryofficial1@gmail.com
                </a>
              </div>

              {/* Calendly Booking Link */}
              <div className="mb-5">
                <a
                  href="https://calendly.com/sabatanant883/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white hover:text-black border border-white/20 text-xs font-mono uppercase tracking-wider text-white transition-all group"
                >
                  <span>Book 30-Min Strategy Call</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
                </a>
              </div>

              {/* Social Channels */}
              <div className="pt-3 border-t border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#b4b4c6] block mb-2">
                  Official Channels
                </span>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <a
                    href="https://www.instagram.com/symmetry_official_?stkn=aHUzajRrNmc2ZTR1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c0c0d2] hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>Instagram</span>
                    <span className="text-[10px]">↗</span>
                  </a>

                  <a
                    href="https://youtube.com/@symmetry_official?si=_Pl3vL63HxJBorQj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c0c0d2] hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>YouTube</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </div>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top of page"
              className="mt-8 self-start inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#c2c2d4]">
          <p>© {new Date().getFullYear()} SYMMETRY. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/security" className="text-[#c2c2d4] hover:text-white transition-colors">Enterprise Security</Link>
            <Link to="/privacy" className="text-[#c2c2d4] hover:text-white transition-colors">Privacy Charter</Link>
            <Link to="/terms" className="text-[#c2c2d4] hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
