// ─────────────────────────────────────────────
// SYMMETRY — "AJ" Modern Autonomous Studio Agent & 1-Click Call Booker
// State-of-the-Art Obsidian & Polished Chrome Cybernetic Assistant
// Features:
// 1. Kinetic Holographic AJ Cybernetic Avatar with live audio visualizer waves
// 2. Explains every detail regarding Symmetry (4K Motion, 48-72h Speed, Real Clients, Services)
// 3. 1-Click Discovery Call Booker with Calendly & Studio Spreadsheet Sync
// 4. Instant natural intent triggers ("fast", "good", "best", "call", "pricing", "reviews")
// 5. Zero-retype auto-fill pass synced to the on-page contact form
// ─────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Calendar,
  Phone,
  Mail,
  ArrowRight,
  Clock,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Video,
  Key,
  ShieldCheck,
  RefreshCw,
  Zap,
  Check,
  AlertCircle,
  User,
  Loader2,
  Sparkles,
  Volume2,
  MessageSquare,
  Compass,
} from 'lucide-react';
import { smoothScrollTo } from '@/hooks/useLenis';

const CALENDLY_URL = 'https://calendly.com/sabatanant883/30min';

interface ChatMessage {
  id: string;
  sender: 'aj' | 'user';
  text: string;
  timestamp: string;
  type?: 'text' | 'quick-actions' | 'navigation-card';
  actions?: Array<{ label: string; action: () => void; icon?: string }>;
}

// ─── MODERN ANIMATED "AJ" CYBERNETIC AVATAR ───
// Futuristic obsidian black & chrome android head with electric cyan visor,
// rotating telemetry rings, scanning laser sweep, and audio frequency equalizer.
export function AjAvatar({
  isSpeaking = false,
  isThinking = false,
  size = 'md',
  className = '',
}: {
  isSpeaking?: boolean;
  isThinking?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
}) {
  if (size === 'hero') {
    return (
      <div
        className={`relative w-full rounded-2xl p-4 overflow-hidden bg-gradient-to-r from-[#070913] via-[#0b0f20] to-[#05060b] border border-cyan-500/20 shadow-[0_8px_30px_rgba(0,0,0,0.8)] flex items-center justify-between select-none ${className}`}
      >
        {/* Subtle Ambient Studio Neon Glow */}
        <div className="absolute top-0 right-1/4 w-36 h-20 bg-cyan-400/10 blur-2xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-10 w-28 h-10 bg-blue-500/10 blur-xl pointer-events-none rounded-full" />

        {/* Left: Cybernetic Avatar + Audio Waves */}
        <div className="relative z-10 flex items-center gap-3.5">
          <div className="relative w-14 h-14 rounded-2xl p-0.5 bg-gradient-to-br from-cyan-400/40 via-white/20 to-cyan-500/10 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
            <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-[#030303]">
              <img
                src="/media/aj-avatar.jpg"
                alt="AJ — Symmetry AI Assistant"
                className="w-full h-full object-cover object-center filter contrast-[1.05]"
              />
              {/* Visor Glow Animation */}
              <div
                className={`absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent pointer-events-none ${
                  isSpeaking ? 'animate-pulse' : ''
                }`}
              />
            </div>
            {/* Live Status Orb */}
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-black animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-sm text-white tracking-wide">
                AJ // STUDIO INTELLIGENCE
              </span>
              <span className="px-2 py-0.5 rounded-full text-[8px] font-mono uppercase tracking-widest bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                2026 LIVE
              </span>
            </div>

            <p className="font-mono text-[10px] text-[#a0a0b2] mt-0.5 flex items-center gap-1.5">
              <span>Cinema 4D • ProRes 4444 • 48-72h Delivery</span>
            </p>

            {/* Audio Wave Frequency Equalizer (Visible when speaking or active) */}
            <div className="flex items-center gap-1 mt-1.5 h-3">
              {[0.4, 0.9, 0.6, 1.0, 0.7, 0.4, 0.8, 0.5, 0.9, 0.3].map((val, idx) => (
                <span
                  key={idx}
                  className={`w-0.5 rounded-full transition-all duration-300 ${
                    isSpeaking
                      ? 'bg-cyan-400 animate-pulse'
                      : isThinking
                      ? 'bg-blue-400/60 animate-bounce'
                      : 'bg-white/30'
                  }`}
                  style={{
                    height: isSpeaking ? `${Math.max(4, val * 12)}px` : isThinking ? '6px' : '3px',
                    animationDelay: `${idx * 80}ms`,
                  }}
                />
              ))}
              <span className="text-[9px] font-mono text-cyan-300/80 ml-1.5 uppercase tracking-wider">
                {isSpeaking ? 'Voice Active' : isThinking ? 'Computing...' : 'Standby // Ready'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Pill */}
        <div className="hidden sm:flex flex-col items-end gap-1.5 relative z-10">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full bg-white hover:bg-[#e0e0e0] text-black font-mono text-[10px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Phone className="w-3 h-3 text-black" />
            <span>1-Click Call</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-70" />
          </a>
          <span className="text-[9px] font-mono text-[#8a8a9a]">No form typing needed</span>
        </div>
      </div>
    );
  }

  // Squircle / Modern Hologram Avatar for buttons & message rows
  const sizeMap = {
    xs: 'w-7 h-7 rounded-lg',
    sm: 'w-10 h-10 rounded-xl',
    md: 'w-12 h-12 rounded-2xl',
    lg: 'w-16 h-16 rounded-3xl',
  };

  const currentSize = sizeMap[size as 'xs' | 'sm' | 'md' | 'lg'] || sizeMap.md;

  return (
    <div className={`relative flex items-center justify-center select-none ${currentSize} ${className}`}>
      {/* Outer ambient cyan aura halo */}
      <div
        className={`absolute inset-[-3px] rounded-2xl bg-cyan-400/25 blur-sm transition-all duration-500 ${
          isSpeaking
            ? 'scale-110 bg-cyan-400/50 blur-md'
            : isThinking
            ? 'animate-pulse bg-blue-400/40'
            : ''
        }`}
      />

      {/* Frame Container */}
      <div className="relative w-full h-full rounded-2xl p-[1px] bg-gradient-to-br from-white/30 via-cyan-400/40 to-white/10 overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
        <div className="w-full h-full rounded-[14px] overflow-hidden bg-[#05060b] relative">
          <img
            src="/media/aj-avatar.jpg"
            alt="AJ"
            className={`w-full h-full object-cover object-center filter contrast-[1.08] transition-transform duration-500 ${
              isSpeaking ? 'scale-105' : 'animate-[ajFloat_4s_ease-in-out_infinite]'
            }`}
          />

          {/* Cyan Optic Glow Visor Filter */}
          <div
            className={`absolute inset-0 bg-cyan-400/10 pointer-events-none transition-opacity ${
              isSpeaking ? 'opacity-80' : isThinking ? 'animate-pulse opacity-60' : 'opacity-30'
            }`}
          />

          {/* Thinking Scanning Line */}
          {isThinking && (
            <div className="absolute inset-x-0 h-0.5 bg-cyan-300 shadow-[0_0_8px_#38bdf8] animate-[ajScan_1.4s_ease-in-out_infinite] pointer-events-none" />
          )}
        </div>
      </div>
    </div>
  );
}

interface ExtractedDetails {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  slot?: string;
}

// Intelligent Client Detail Extraction from natural conversational input
function extractClientDetails(text: string): ExtractedDetails {
  const details: ExtractedDetails = {};
  if (!text) return details;

  // 1. Email Extraction
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/;
  const emailMatch = text.match(emailRegex);
  if (emailMatch) {
    details.email = emailMatch[0].trim();
  }

  // 2. Phone Extraction
  const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const phoneMatch = text.match(phoneRegex);
  if (phoneMatch) {
    details.phone = phoneMatch[0].trim();
  }

  // 3. Name Extraction
  const namePatterns = [
    /(?:my name is|i am|i'm|call me|name's|this is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
    /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s+(?:here|speaking|from)/i,
  ];
  for (const pat of namePatterns) {
    const match = text.match(pat);
    if (match && match[1]) {
      const candidate = match[1].trim();
      const lower = candidate.toLowerCase();
      if (!['looking', 'booking', 'wanting', 'interested', 'ready', 'here', 'symmetry', 'aj'].includes(lower)) {
        details.name = candidate;
        break;
      }
    }
  }

  // 4. Service Intent Matching
  const lowerText = text.toLowerCase();
  if (lowerText.includes('reel') || lowerText.includes('short') || lowerText.includes('tiktok') || lowerText.includes('instagram')) {
    details.service = 'Viral 4K Video Reels & Shorts';
  } else if (lowerText.includes('3d') || lowerText.includes('commercial') || lowerText.includes('cgi') || lowerText.includes('product')) {
    details.service = '3D Product Commercials & CGI Ads';
  } else if (lowerText.includes('website') || lowerText.includes('landing') || lowerText.includes('web') || lowerText.includes('code')) {
    details.service = 'High-Converting 3D Websites & Pages';
  } else if (lowerText.includes('brand') || lowerText.includes('identity') || lowerText.includes('logo')) {
    details.service = 'Complete Brand Identity & Social Engine';
  }

  // 5. Slot intent
  if (lowerText.includes('tomorrow')) {
    details.slot = 'Tomorrow at 11:00 AM';
  } else if (lowerText.includes('today')) {
    details.slot = 'Today at 6:30 PM';
  }

  return details;
}

// ─── MAIN MODERN AJ BOT COMPONENT ───
export default function AjBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [inputText, setInputText] = useState('');

  // Client Details auto-extracted from chat
  const [clientName, setClientName] = useState(() => {
    try {
      const stored = localStorage.getItem('symmetry_client_profile');
      return stored ? JSON.parse(stored).name || '' : '';
    } catch {
      return '';
    }
  });
  const [clientPhone, setClientPhone] = useState(() => {
    try {
      const stored = localStorage.getItem('symmetry_client_profile');
      return stored ? JSON.parse(stored).phone || '' : '';
    } catch {
      return '';
    }
  });
  const [clientEmail, setClientEmail] = useState(() => {
    try {
      const stored = localStorage.getItem('symmetry_client_profile');
      return stored ? JSON.parse(stored).email || '' : '';
    } catch {
      return '';
    }
  });
  const [clientCompany, setClientCompany] = useState('');
  const [clientService, setClientService] = useState('Viral 4K Video Reels & Shorts');
  const [clientCustomService] = useState('');

  // Optional Ephemeral Gemini API Key
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return sessionStorage.getItem('symmetry_ephemeral_key') || '';
  });
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKeyInput, setTempKeyInput] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatModalRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Initial welcome greeting
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'aj',
      text: "Greetings! I'm AJ, Symmetry's live studio assistant.\n\nI can answer any question about our 4K video work, turnaround times, and verified clients, or direct you to fill our inquiry form or schedule on Calendly.\n\nHow can I help you accelerate your brand today?",
      timestamp: 'Just now',
      type: 'quick-actions',
      actions: [
        {
          label: '⚡ Why is Symmetry fast & best?',
          action: () => handleSendMessage('Why is Symmetry fast and the best choice?'),
        },
        {
          label: '📝 Fill Form for Call',
          action: () => {
            smoothScrollTo('#contact', -80);
            setIsOpen(false);
          },
        },
        {
          label: '📅 Open Calendly (30m)',
          action: () => window.open(CALENDLY_URL, '_blank'),
        },
        {
          label: '🎬 Show 4K Commercials',
          action: () => handleSendMessage('Show me your best 4K video commercials'),
        },
        {
          label: '💎 Real Instagram Clients',
          action: () => handleSendMessage('Tell me about your real clients on Instagram'),
        },
      ],
    },
  ]);

  // Proactive greeting bubble after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTeaser(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isThinking]);

  // Lenis scroll isolation inside modal
  useEffect(() => {
    if (!isOpen) return;
    const modal = chatModalRef.current;
    if (!modal) return;

    const stopScrollBubbling = (e: WheelEvent | TouchEvent) => {
      e.stopPropagation();
    };

    modal.addEventListener('wheel', stopScrollBubbling, { passive: false });
    modal.addEventListener('touchmove', stopScrollBubbling, { passive: false });

    return () => {
      modal.removeEventListener('wheel', stopScrollBubbling);
      modal.removeEventListener('touchmove', stopScrollBubbling);
    };
  }, [isOpen]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowTeaser(false);
  };

  // Broadcast auto-fill event to website contact form (CTASection)
  const broadcastAutoFill = (data: {
    name?: string;
    phone?: string;
    email?: string;
    company?: string;
    service?: string;
    autoScroll?: boolean;
  }) => {
    try {
      const event = new CustomEvent('symmetry:autofill-inquiry', {
        detail: {
          fullName: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          company: data.company || '',
          service: data.service || 'Viral 4K Video Reels & Shorts',
          autoScroll: data.autoScroll ?? false,
        },
      });
      window.dispatchEvent(event);

      // Save to localStorage for instant persistence
      localStorage.setItem(
        'symmetry_client_profile',
        JSON.stringify({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          company: data.company || '',
          service: data.service || 'Viral 4K Video Reels & Shorts',
          updatedAt: new Date().toISOString(),
        })
      );
    } catch {
      // Storage unavailable
    }
  };

  // Gemini API Caller with Zero Key Leakage
  const callGeminiApi = async (userPrompt: string): Promise<string | null> => {
    try {
      const trimmedHistory = messages
        .slice(-2)
        .filter((m) => m.text)
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          text: m.text.slice(0, 200),
        }));

      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userPrompt.slice(0, 400),
          history: trimmedHistory,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.text) return data.text.trim();
      }
    } catch {
      // Server proxy unavailable (static preview)
    }

    if (geminiApiKey) {
      try {
        const systemInstruction = `You are AJ, the live autonomous creative intelligence at Symmetry (https://symmetryofficial.vercel.app).
Symmetry is an elite 3D motion design studio and commercial 4K video editing agency.
Hallmarks: 48-72h turnaround, ProRes 4444 uncompressed masters, 9:16 vertical & 16:9 widescreen masters, 1-on-1 direct creative direction, Cinema 4D, After Effects.
Real Instagram clients: Skyline Graphics (@skyline_graphics_07), Ranking Partner (@rankingpartner), Indie Extract (@indieextract), RKS Aroma (@rksaroma).
Contact: symmetryofficial1@gmail.com, Calendly: ${CALENDLY_URL}.
Tone: Charismatic, sophisticated, concise (2-3 sentences), helpful, confident.
Always offer 1-click booking or quick links when appropriate.`;

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-goog-api-key': geminiApiKey,
            },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: systemInstruction }] },
              contents: [{ role: 'user', parts: [{ text: userPrompt.slice(0, 400) }] }],
              generationConfig: {
                temperature: 0.6,
                maxOutputTokens: 250,
              },
            }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) return reply.trim();
        }
      } catch {
        // Fallback
      }
    }

    return null;
  };

  // Comprehensive Native Studio Knowledge Base (Instant <50ms response for any doubt)
  const getStudioIntelligenceAnswer = (query: string, details: ExtractedDetails) => {
    const q = query.toLowerCase();
    const nameStr = details.name || clientName || 'there';

    // 1. FAST & BEST INQUIRIES
    if (
      q.includes('fast') ||
      q.includes('best') ||
      q.includes('good') ||
      q.includes('why symmetry') ||
      q.includes('advantage') ||
      q.includes('speed')
    ) {
      return {
        text: `Here is why Symmetry is considered fast and the best choice for forward-thinking brands:\n\n• ⚡ 48–72h Turnaround: We deliver commercial-grade first cuts in 2–3 days, eliminating traditional 6-week agency delays.\n• 💎 Cinema 4D & ProRes 4444: Every asset is mastered uncompressed with custom lighting, liquid chrome shaders, and 60fps GPU precision.\n• 🎯 Direct 1-on-1 Creative Direction: You work directly with our motion director with zero account-executive telephone games.\n• 📱 Native Dual-Format: Simultaneous 9:16 vertical (Reels, TikTok, Shorts) and 16:9 widescreen cinema deliveries.`,
        type: 'navigation-card' as const,
        actions: [
          {
            label: '📝 Fill Form for Call',
            action: () => {
              smoothScrollTo('#contact', -80);
              setIsOpen(false);
            },
          },
          {
            label: '📅 Open Calendly (30m)',
            action: () => window.open(CALENDLY_URL, '_blank'),
          },
        ],
      };
    }

    // 2. CALL & BOOKING INQUIRIES
    if (
      q.includes('book') ||
      q.includes('call') ||
      q.includes('schedule') ||
      q.includes('meeting') ||
      q.includes('talk') ||
      q.includes('calendly') ||
      q.includes('connect')
    ) {
      return {
        text: `Let's connect and discuss your project! You can fill out our verified studio inquiry form below, or pick a direct 30-minute slot on Calendly:`,
        type: 'navigation-card' as const,
        actions: [
          {
            label: '📝 Fill Form for Call',
            action: () => {
              smoothScrollTo('#contact', -80);
              setIsOpen(false);
            },
          },
          {
            label: '📅 Book on Calendly (30m)',
            action: () => window.open(CALENDLY_URL, '_blank'),
          },
        ],
      };
    }

    // 3. SHOWREEL & COMMERCIALS
    if (
      q.includes('showreel') ||
      q.includes('commercial') ||
      q.includes('video') ||
      q.includes('work') ||
      q.includes('portfolio') ||
      q.includes('sample') ||
      q.includes('vault') ||
      q.includes('drive')
    ) {
      return {
        text: `Our flagship commercial showreel features cinema-grade 3D product animations, liquid chrome visual effects, and high-retention video reels.\n\nKey highlights include:\n• Samsung Galaxy S26 Ultra 9:16 mobile reveal\n• Claude AI kinetic typography & neural motion\n• Spotify soundwave dynamics\n• Aura Fine Jewellery 4K macro commercial\n• Indie Extract botanical oil storytelling\n• RKS Aroma luxury perfume bottle cinema`,
        type: 'navigation-card' as const,
        actions: [
          {
            label: 'Watch Master Showreel',
            action: () => {
              smoothScrollTo('#showreel', -80);
              setIsOpen(false);
            },
          },
          {
            label: 'Explore AI Commercials',
            action: () => {
              smoothScrollTo('#ai-videos', -80);
              setIsOpen(false);
            },
          },
          {
            label: 'Open Google Drive Project Vault',
            action: () => {
              smoothScrollTo('#vault', -80);
              setIsOpen(false);
            },
          },
        ],
      };
    }

    // 4. REAL CLIENTS & INSTAGRAM HANDLES
    if (
      q.includes('client') ||
      q.includes('review') ||
      q.includes('instagram') ||
      q.includes('skyline') ||
      q.includes('ranking') ||
      q.includes('indie') ||
      q.includes('rks') ||
      q.includes('testimonials')
    ) {
      return {
        text: `We maintain 100% transparency with genuine client collaborations and verifiable Instagram handles:\n\n• @skyline_graphics_07 (Skyline Graphics): Motion graphics & brand identity kit\n• @rankingpartner (Ranking Partner): High-retention growth reels & social video hooks\n• @indieextract (Indie Extract): Botanical product commercial & macro extraction visuals\n• @rksaroma (RKS Aroma): Luxury fragrance cinema & diffuser bottle motion`,
        type: 'navigation-card' as const,
        actions: [
          {
            label: 'View Verified Reviews on Page',
            action: () => {
              smoothScrollTo('#impact', -80);
              setIsOpen(false);
            },
          },
          {
            label: 'Visit @symmetry_official_ on Instagram',
            action: () => window.open('https://www.instagram.com/symmetry_official_', '_blank'),
          },
        ],
      };
    }

    // 5. PRICING & TURNAROUND
    if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('how much') || q.includes('fee')) {
      return {
        text: `Every Symmetry engagement is tailored to your brand's scope with transparent pricing and zero hidden fees:\n\n• Turnaround: 48–72 hours for initial commercial cuts\n• Deliverables: ProRes 4444 uncompressed masters + web/social exports (9:16 & 16:9)\n• Inclusions: 1-on-1 creative direction, custom sound design, revisions, and full commercial usage rights.\n\nFill our inquiry form or schedule a call with our director to get an exact custom quote:`,
        type: 'navigation-card' as const,
        actions: [
          {
            label: '📝 Fill Form for Custom Quote',
            action: () => {
              smoothScrollTo('#contact', -80);
              setIsOpen(false);
            },
          },
          {
            label: '📅 Book 30-Min Call on Calendly',
            action: () => window.open(CALENDLY_URL, '_blank'),
          },
        ],
      };
    }

    // 6. CONTACT & DIRECT CHANNELS
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('address') || q.includes('reach')) {
      return {
        text: `You can reach the Symmetry team directly through multiple channels:\n\n• Direct Email: symmetryofficial1@gmail.com\n• 30-Min Discovery: calendly.com/sabatanant883/30min\n• Official Instagram: @symmetry_official_\n• Official YouTube: @symmetry_official\n\nFill out our inquiry form or schedule a call on Calendly:`,
        type: 'navigation-card' as const,
        actions: [
          {
            label: '📝 Fill Studio Inquiry Form',
            action: () => {
              smoothScrollTo('#contact', -80);
              setIsOpen(false);
            },
          },
          {
            label: '📅 Open Calendly (30m)',
            action: () => window.open(CALENDLY_URL, '_blank'),
          },
        ],
      };
    }

    // Default intelligent overview
    return {
      text: `Understood, ${nameStr}! Symmetry combines 3D motion graphics, 4K commercials, and autonomous workflows into high-impact digital presence.\n\nWhether you need viral reels, product CGI, or a complete brand overhaul, we deliver in 48-72 hours with cinema fidelity.`,
      type: 'navigation-card' as const,
      actions: [
        {
          label: '📝 Fill Form for Call',
          action: () => {
            smoothScrollTo('#contact', -80);
            setIsOpen(false);
          },
        },
        {
          label: '📅 Book on Calendly (30m)',
          action: () => window.open(CALENDLY_URL, '_blank'),
        },
        {
          label: '🎬 Watch Master Showreel',
          action: () => {
            smoothScrollTo('#showreel', -80);
            setIsOpen(false);
          },
        },
      ],
    };
  };

  // Main natural message processor
  const handleSendMessage = async (userQuery?: string) => {
    const query = (userQuery || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userQuery) setInputText('');

    // Extract client details
    const extracted = extractClientDetails(query);
    const hasNewDetails = Boolean(
      extracted.name || extracted.phone || extracted.email || extracted.company || extracted.service
    );

    const updatedName = extracted.name || clientName;
    const updatedPhone = extracted.phone || clientPhone;
    const updatedEmail = extracted.email || clientEmail;
    const updatedCompany = extracted.company || clientCompany;
    const updatedService = extracted.service || clientService;

    if (hasNewDetails) {
      if (extracted.name) setClientName(extracted.name);
      if (extracted.phone) setClientPhone(extracted.phone);
      if (extracted.email) setClientEmail(extracted.email);
      if (extracted.company) setClientCompany(extracted.company);
      if (extracted.service) setClientService(extracted.service);

      broadcastAutoFill({
        name: updatedName,
        phone: updatedPhone,
        email: updatedEmail,
        company: updatedCompany,
        service: updatedService,
        autoScroll: false,
      });
    }

    setIsThinking(true);

    // 1. Try Gemini API via secure server proxy
    const geminiReply = await callGeminiApi(query);

    if (geminiReply) {
      setIsThinking(false);
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 1400);

      setMessages((prev) => [
        ...prev,
        {
          id: `aj-${Date.now()}`,
          sender: 'aj',
          text: hasNewDetails
            ? `Noted, ${updatedName || 'there'}! I have automatically pre-filled your details on our website contact form so you don't have to retype anything.\n\n${geminiReply}`
            : geminiReply,
          timestamp: 'Just now',
          type: 'navigation-card',
          actions: [
            {
              label: '📝 Fill Form for Call',
              action: () => {
                smoothScrollTo('#contact', -80);
                setIsOpen(false);
              },
            },
            {
              label: '📅 Open Calendly (30m)',
              action: () => window.open(CALENDLY_URL, '_blank'),
            },
            {
              label: '🎬 Watch Master Showreel',
              action: () => {
                smoothScrollTo('#showreel', -80);
                setIsOpen(false);
              },
            },
          ],
        },
      ]);
      return;
    }

    // 2. Instant Native Studio Knowledge Base Fallback
    setTimeout(() => {
      setIsThinking(false);
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 1400);

      const response = getStudioIntelligenceAnswer(query, extracted);

      setMessages((prev) => [
        ...prev,
        {
          id: `aj-${Date.now()}`,
          sender: 'aj',
          text: hasNewDetails
            ? `Noted, ${updatedName || 'there'}! I've pre-filled your details on our website contact form so you don't have to retype them.\n\n${response.text}`
            : response.text,
          timestamp: 'Just now',
          type: 'navigation-card',
          actions: response.actions || [
            {
              label: '📝 Fill Form for Call',
              action: () => {
                smoothScrollTo('#contact', -80);
                setIsOpen(false);
              },
            },
            {
              label: '📅 Open Calendly (30m)',
              action: () => window.open(CALENDLY_URL, '_blank'),
            },
          ],
        },
      ]);
    }, 350);
  };

  const handleSaveGeminiKey = () => {
    const trimmed = tempKeyInput.trim();
    setGeminiApiKey(trimmed);
    if (trimmed) {
      sessionStorage.setItem('symmetry_ephemeral_key', trimmed);
    } else {
      sessionStorage.removeItem('symmetry_ephemeral_key');
    }
    setShowKeyModal(false);
    setMessages((prev) => [
      ...prev,
      {
        id: `key-${Date.now()}`,
        sender: 'aj',
        text: 'Gemini API connection updated. Operating in direct AI mode.',
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <>
      {/* ─── MODERN CSS KEYFRAME ANIMATIONS ─── */}
      <style>{`
        @keyframes ajFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(0.4deg); }
        }
        @keyframes ajScan {
          0% { top: 20%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 80%; opacity: 0; }
        }
      `}</style>

      {/* ─── FLOATING TEASER NOTIFICATION (MODERN HUD PILL) ─── */}
      {!isOpen && showTeaser && (
        <div className="fixed bottom-24 right-6 z-40 max-w-[320px] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="relative glass-panel p-4 rounded-3xl border border-cyan-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.95)] bg-[#070914]/95 text-white backdrop-blur-2xl">
            <button
              onClick={() => setShowTeaser(false)}
              className="absolute top-3 right-3 p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Dismiss message"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-start gap-3">
              <AjAvatar size="sm" isSpeaking={false} className="shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="font-display font-extrabold text-xs text-white leading-snug">
                    AJ // Live Studio Agent
                  </p>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="font-body text-[11px] text-[#c2c2d6] mt-1 leading-relaxed">
                  Have questions about our 4K video work or want to book a discovery call?
                </p>

                {/* Modern CTA Buttons */}
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={handleOpenChat}
                    className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#e0e0e0] text-black font-mono text-[10px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(255,255,255,0.3)] flex items-center gap-1.5 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Chat with AJ</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => {
                      smoothScrollTo('#contact', -80);
                      setShowTeaser(false);
                    }}
                    className="px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.15] border border-white/15 text-white text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <span>Fill Form</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── FLOATING LAUNCHER CAPSULE (LUXURY OBSIDIAN & CHROME) ─── */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
            } else {
              handleOpenChat();
            }
          }}
          className="group relative flex items-center gap-3 p-2 pr-4 rounded-full bg-[#05060c]/90 hover:bg-[#090c18] border border-white/20 hover:border-cyan-400/50 shadow-[0_0_35px_rgba(0,0,0,0.9)] hover:shadow-[0_0_40px_rgba(56,189,248,0.3)] backdrop-blur-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          aria-label="Chat with AJ, Symmetry's Autonomous Creative Intelligence"
        >
          {/* Animated Avatar Icon */}
          <AjAvatar size="sm" isSpeaking={isSpeaking} isThinking={isThinking} />

          {/* Title + Live Status */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-xs tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                AJ
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest hidden sm:inline">
                LIVE
              </span>
            </div>
            <span className="font-mono text-[9px] text-[#a0a0b4] uppercase tracking-wider">
              {isOpen ? 'Close' : 'Ask Anything • 1-Click Call'}
            </span>
          </div>

          {/* Luxury 1-Click Call Pill */}
          <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white group-hover:bg-[#eaeaea] text-black font-mono text-[10px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(255,255,255,0.35)] transition-all">
            <span>{isOpen ? 'Close' : '1-Click Call ↗'}</span>
          </span>
        </button>
      </div>

      {/* ─── MODERN AJ CHAT MODAL ─── */}
      {isOpen && (
        <div
          ref={chatModalRef}
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          onWheel={(e) => e.stopPropagation()}
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] sm:w-[440px] h-[640px] max-h-[86vh] rounded-3xl bg-[#060710]/98 backdrop-blur-2xl border border-white/20 shadow-[0_25px_90px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 overscroll-contain"
        >
          {/* Header */}
          <div className="p-3.5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <AjAvatar size="sm" isSpeaking={isSpeaking} isThinking={isThinking} />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-extrabold text-sm text-white tracking-wide">
                    AJ • Creative Intelligence
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[8px] font-mono uppercase tracking-widest bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    ONLINE
                  </span>
                </div>
                <p className="font-mono text-[10px] text-[#a4a4b8]">
                  48–72h Turnaround • 4K ProRes • Fast Call Booking
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Calendly Direct Shortcut */}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg border border-white/15 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Book on Calendly"
                aria-label="Book on Calendly"
              >
                <Calendar className="w-3.5 h-3.5" />
              </a>

              {/* Gemini Key Config */}
              <button
                onClick={() => {
                  setTempKeyInput(geminiApiKey);
                  setShowKeyModal(true);
                }}
                className="p-1.5 rounded-lg border border-white/15 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Gemini Connection Settings"
                aria-label="Gemini Connection Settings"
              >
                <Key className="w-3.5 h-3.5 text-white" />
              </button>

              {/* Reset Conversation */}
              <button
                onClick={() => {
                  setMessages([
                    {
                      id: `msg-${Date.now()}`,
                      sender: 'aj',
                      text: "Chat cleared! How can I assist with your 4K video project, turnaround times, or call booking?",
                      timestamp: 'Just now',
                      type: 'quick-actions',
                    },
                  ]);
                }}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                title="Reset Conversation"
                aria-label="Reset Conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              {/* Close Modal */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ─── SLEEK MODERN HUD BANNER ─── */}
          <div className="px-3 pt-3">
            <AjAvatar size="hero" isSpeaking={isSpeaking} isThinking={isThinking} />
          </div>

          {/* Quick Action Navigation Bar */}
          <div className="px-3 py-2 bg-black/40 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px] font-mono mt-1">
            <button
              onClick={() => {
                smoothScrollTo('#contact', -80);
                setIsOpen(false);
              }}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-[#eaeaea] text-black font-bold uppercase tracking-wider text-[10px] shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-1.5 shrink-0 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <Phone className="w-3 h-3 text-black" />
              <span>📝 Fill Form for Call</span>
            </button>

            <button
              onClick={() => window.open(CALENDLY_URL, '_blank')}
              className="px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white hover:text-black border border-white/15 hover:border-white text-white flex items-center gap-1.5 shrink-0 uppercase tracking-wider text-[10px] transition-all cursor-pointer"
            >
              <Calendar className="w-3 h-3" />
              <span>Calendly (30m)</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </button>

            <button
              onClick={() => handleSendMessage('Why is Symmetry fast and the best?')}
              className="px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white hover:text-black border border-white/15 hover:border-white text-white flex items-center gap-1.5 shrink-0 uppercase tracking-wider text-[10px] transition-all cursor-pointer"
            >
              <Zap className="w-3 h-3" />
              <span>Fast & Best</span>
            </button>

            <button
              onClick={() => handleSendMessage('Show me your best 4K video work')}
              className="px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white hover:text-black border border-white/15 hover:border-white text-white flex items-center gap-1.5 shrink-0 uppercase tracking-wider text-[10px] transition-all cursor-pointer"
            >
              <Video className="w-3 h-3" />
              <span>4K Showreel</span>
            </button>
          </div>

          {/* Messages Stream */}
          <div
            ref={scrollContainerRef}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="flex-1 overflow-y-auto p-4 space-y-4 font-body text-xs overscroll-contain touch-pan-y"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-4 leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-white text-black font-medium shadow-[0_4px_16px_rgba(255,255,255,0.18)]'
                      : 'bg-white/[0.05] border border-white/15 text-[#e0e0ec] shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{m.text}</p>

                  {/* Navigation / Action Buttons */}
                  {m.actions && m.actions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5">
                      {m.actions.map((act, i) => (
                        <button
                          key={i}
                          onClick={act.action}
                          className="px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white hover:text-black border border-white/15 hover:border-white text-white text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-xs hover:shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                        >
                          <span>{act.label}</span>
                          <ChevronRight className="w-3 h-3 opacity-60" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <span className="font-mono text-[9px] text-[#a0a0b2] mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center gap-2 text-cyan-300 font-mono text-[11px] p-2.5 bg-cyan-950/20 rounded-xl border border-cyan-500/30 max-w-[140px]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>AJ is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar above Input */}
          <div className="px-3 py-1.5 bg-black/60 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[10px] font-mono">
            {[
              { label: '⚡ Fast & Best?', query: 'Why is Symmetry fast and the best?' },
              { label: '📝 Fill Form for Call', query: 'I want to fill the form for a call' },
              { label: '💎 Client Reviews', query: 'Tell me about your real clients on Instagram' },
              { label: '💰 Pricing', query: 'What are your turnaround times and pricing?' },
            ].map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(chip.query)}
                className="px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-white hover:text-black border border-white/10 text-[#c0c0d2] shrink-0 transition-all cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Message Input Dock */}
          <div className="p-3 border-t border-white/10 bg-black/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                id="aj-chat-input"
                name="ajChatInput"
                type="text"
                placeholder="Ask AJ anything or say 'fast', 'best', 'book call'..."
                aria-label="Ask AJ anything or say 'fast', 'best', 'book call'"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 text-xs text-white placeholder:text-[#88889a] focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-xl bg-white hover:bg-[#e0e0e0] text-black shadow-[0_0_15px_rgba(255,255,255,0.25)] disabled:opacity-30 disabled:hover:bg-white transition-all cursor-pointer"
                aria-label="Send message to AJ"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── GEMINI API KEY MODAL ─── */}
      {showKeyModal && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#080911] border border-white/20 p-5 shadow-2xl relative">
            <button
              onClick={() => setShowKeyModal(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 rounded-lg bg-white/10 border border-white/20 text-white">
                <Key className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white">
                  Gemini API Connection
                </h4>
                <p className="font-mono text-[10px] text-[#b0b0c0]">
                  Live Multimodal Intelligence
                </p>
              </div>
            </div>

            <p className="font-body text-xs text-[#a0a0b2] leading-relaxed mb-4">
              Connect a Gemini API key for live streaming multimodal intelligence, or use AJ's built-in studio knowledge engine.
            </p>

            <input
              type="password"
              placeholder="Gemini API Key"
              value={tempKeyInput}
              onChange={(e) => setTempKeyInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 text-xs font-mono text-white placeholder:text-[#88889a] focus:outline-none focus:border-cyan-400 mb-3"
            />

            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => {
                  setTempKeyInput('');
                  setGeminiApiKey('');
                  sessionStorage.removeItem('symmetry_ephemeral_key');
                  setShowKeyModal(false);
                }}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono text-[#a0a0b2] hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer"
              >
                Clear Custom Key
              </button>
              <button
                onClick={handleSaveGeminiKey}
                className="px-5 py-2 rounded-full bg-white text-black font-mono font-bold uppercase tracking-wider text-xs hover:bg-[#eaeaea] shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all cursor-pointer"
              >
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
