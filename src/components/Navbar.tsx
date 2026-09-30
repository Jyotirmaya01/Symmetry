// ─────────────────────────────────────────────
// SYMMETRY — Floating Luxury Glassmorphism Navbar
// ─────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { smoothScrollTo } from '@/hooks/useLenis';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
    } else {
      smoothScrollTo(`#${id}`, -80);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 bg-[#030303]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link
          to="/"
          className="flex items-center gap-3.5 group cursor-pointer"
          aria-label="SYMMETRY Home"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden border border-white/20 p-0.5 bg-black/60 shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:border-white/50 transition-colors">
            <img
              src="/symmetry-logo.png"
              alt="SYMMETRY Emblem"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base sm:text-lg tracking-[0.22em] text-white leading-none">
              SYMMETRY
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#888894] mt-0.5 uppercase">
              AI Business Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 rounded-full px-6 py-2 bg-white/[0.03] border border-white/10 backdrop-blur-md">
          {[
            { name: 'Solutions', id: 'solutions' },
            { name: 'Motion', id: 'showreel' },
            { name: 'AI Videos', id: 'ai-videos' },
            { name: 'Vault', id: 'vault' },
            { name: 'Process', id: 'process' },
            { name: 'Reviews', id: 'impact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-xs uppercase tracking-widest font-mono text-[#a0a0ab] hover:text-white transition-colors cursor-pointer"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://calendly.com/sabatanant883/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider text-[#a0a0b0] hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer"
          >
            <span>Book 30-Min Call</span>
            <span className="text-[10px]">↗</span>
          </a>

          <button
            onClick={() => scrollToSection('contact')}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider text-black bg-white hover:bg-[#e0e0e0] font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_30px_rgba(255,255,255,0.45)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Initiate Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-4 pb-8 bg-[#08080a] border-b border-white/10 shadow-2xl flex flex-col gap-4">
          {[
            { name: 'Solutions', id: 'solutions' },
            { name: 'Motion', id: 'showreel' },
            { name: 'AI Videos', id: 'ai-videos' },
            { name: 'Vault', id: 'vault' },
            { name: 'Process', id: 'process' },
            { name: 'Reviews', id: 'impact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left py-2 text-sm uppercase tracking-widest font-mono text-[#b0b0bb] hover:text-white transition-colors"
            >
              {item.name}
            </button>
          ))}

          <a
            href="https://calendly.com/sabatanant883/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
          >
            <span>Book 30-Min Strategy Call</span>
            <span className="text-xs">↗</span>
          </a>

          <button
            onClick={() => scrollToSection('contact')}
            className="w-full py-3 rounded-xl bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
          >
            <span>Initiate Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-6 pt-2 text-xs font-mono text-[#8a8a96]">
            <a href="https://www.instagram.com/symmetry_official_?stkn=aHUzajRrNmc2ZTR1" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Instagram ↗
            </a>
            <span>•</span>
            <a href="https://youtube.com/@symmetry_official?si=_Pl3vL63HxJBorQj" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              YouTube ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
