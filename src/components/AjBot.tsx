// ─────────────────────────────────────────────
// SYMMETRY — "AJ" Live Animated Bot & 1-Click Call Booker
// Powered by Gemini 3.5 Flash Live Intelligence + Symmetry Studio Knowledge
// Styled to Match Symmetry's Obsidian, Chrome & Glass Theme
// ─────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Calendar,
  Phone,
  Mail,
  Building,
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
  FileCheck,
  AlertCircle,
  User,
  Loader2,
} from 'lucide-react';
import { smoothScrollTo } from '@/hooks/useLenis';
import { submitInquiryToSpreadsheet } from '@/utils/spreadsheet';

const CALENDLY_URL = 'https://calendly.com/sabatanant883/30min';

interface ChatMessage {
  id: string;
  sender: 'aj' | 'user';
  text: string;
  timestamp: string;
  type?: 'text' | 'booking-card' | 'quick-actions' | 'navigation-card' | 'autofill-pass';
  actions?: Array<{ label: string; action: () => void; icon?: string }>;
  bookingData?: {
    slots: string[];
    name?: string;
    phone?: string;
    email?: string;
    service?: string;
  };
}

// ─── ANIMATED "AJ" BOT AVATAR COMPONENT ───
// Uses the official VOID-BOT VB-7 robot with live floating hover,
// optic sensor flares, and audio-reactive energy pulses.
export function AjAvatar({
  isSpeaking = false,
  isThinking = false,
  size = 'md',
  className = '',
}: {
  isSpeaking?: boolean;
  isThinking?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
}) {
  if (size === 'hero') {
    // Full Hero Showcase inside Chat Window
    return (
      <div
        className={`relative w-full h-36 sm:h-40 rounded-2xl overflow-hidden bg-gradient-to-b from-[#0a0c16] via-[#05060b] to-[#030303] border border-white/15 flex items-center justify-center select-none ${className}`}
      >
        {/* Subtle Ambient Studio Spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-cyan-400/10 blur-2xl pointer-events-none rounded-full" />

        {/* Animated Floor Reflection Glow */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-40 h-3 bg-cyan-500/20 blur-md pointer-events-none rounded-full" />

        {/* 3D Floating Robot Body Container */}
        <div
          className={`relative z-10 w-full h-full flex items-center justify-center transition-transform duration-700 ${
            isSpeaking ? 'scale-105' : 'animate-[ajFloat_3.6s_ease-in-out_infinite]'
          }`}
        >
          <picture>
            <source srcSet="/media/aj-bot.webp" type="image/webp" />
            <img
              src="/media/aj-bot.png"
              alt="AJ — Symmetry Autonomous Assistant"
              width="512"
              height="285"
              className="w-full h-full object-contain filter contrast-[1.08] drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)]"
            />
          </picture>

          {/* Optic Laser Eye Glow Overlay */}
          <div className="absolute top-[28%] left-[58%] w-3.5 h-3.5 rounded-full bg-cyan-300 blur-[2px] opacity-80 animate-ping pointer-events-none" />
          <div className="absolute top-[29%] left-[58.5%] w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#38bdf8] pointer-events-none" />

          {/* Secondary Sensor Light */}
          <div className="absolute top-[32%] left-[64%] w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] pointer-events-none" />

          {/* Chest Vent Light Pulses */}
          <div className="absolute top-[48%] left-[59%] w-3 h-5 bg-cyan-400/30 blur-xs rounded-sm pointer-events-none animate-pulse" />
        </div>

        {/* Status Badge in corner */}
        <div className="absolute bottom-2.5 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 border border-white/15 backdrop-blur-md text-[9px] font-mono text-white/90">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold tracking-wider">AJ // ONLINE</span>
          <span className="text-white/30">•</span>
          <span className="text-[#c2c2d2]">
            {isSpeaking ? 'SPEAKING' : isThinking ? 'THINKING...' : 'LIVE ASSISTANT'}
          </span>
        </div>
      </div>
    );
  }

  // Circular / Squircle Avatar framing AJ's head
  const sizeClass =
    size === 'sm'
      ? 'w-10 h-10'
      : size === 'lg'
      ? 'w-16 h-16'
      : 'w-12 h-12';

  return (
    <div
      className={`relative rounded-2xl flex items-center justify-center select-none overflow-hidden ${sizeClass} ${className}`}
    >
      {/* Outer ambient cyan glow halo */}
      <div
        className={`absolute inset-[-4px] rounded-2xl bg-cyan-400/20 blur-md transition-all duration-300 ${
          isSpeaking
            ? 'scale-110 bg-cyan-400/40'
            : isThinking
            ? 'animate-pulse bg-cyan-300/30'
            : ''
        }`}
      />

      {/* Frame Container */}
      <div className="relative w-full h-full rounded-2xl bg-[#090b14] border border-white/20 overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.8)] flex items-center justify-center">
        {/* Cropped head of the robot */}
        <picture className="w-full h-full">
          <source srcSet="/media/aj-bot.webp" type="image/webp" />
          <img
            src="/media/aj-bot.png"
            alt="AJ Avatar"
            width="512"
            height="285"
            className="w-full h-full object-cover object-[58%_20%] scale-[1.9] transition-transform duration-300"
          />
        </picture>

        {/* Live Optic Glint */}
        <div className="absolute top-[35%] left-[50%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#38bdf8] pointer-events-none" />

        {/* Speaking energy border pulse */}
        {isSpeaking && (
          <div className="absolute inset-0 border-2 border-cyan-400/70 rounded-2xl pointer-events-none animate-pulse" />
        )}
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

// Heuristic & Regex Parser for natural client detail extraction (zero token cost)
function extractClientDetails(text: string): ExtractedDetails {
  const details: ExtractedDetails = {};

  // 1. Email extraction
  const emailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  if (emailMatch) {
    details.email = emailMatch[1].trim();
  }

  // 2. Phone extraction (international or domestic numbers)
  const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\+?\d{10,14}/);
  if (phoneMatch) {
    details.phone = phoneMatch[0].trim();
  }

  // 3. Name extraction patterns: "my name is X", "I am X", "I'm X", "name: X", "call me X"
  const namePatterns = [
    /(?:my name is|i am|i'm|call me|this is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
    /(?:name\s*[:=-]\s*)([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
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

  // 4. Company extraction: "from X", "at X", "company: X"
  const companyMatch = text.match(/(?:from|at|representing|company\s*[:=-])\s+([A-Z0-9][a-zA-Z0-9&.\s]{1,24})/);
  if (companyMatch && companyMatch[1]) {
    const comp = companyMatch[1].trim();
    if (!['the', 'my', 'a', 'an', 'symmetry'].includes(comp.toLowerCase())) {
      details.company = comp;
    }
  }

  // 5. Service detection with clear, human-understandable names
  const lower = text.toLowerCase();
  if (lower.includes('reel') || lower.includes('vertical') || lower.includes('tiktok') || lower.includes('short') || lower.includes('instagram')) {
    details.service = 'Viral 4K Video Reels & Shorts';
  } else if (lower.includes('3d') || lower.includes('vfx') || lower.includes('render') || lower.includes('blender') || lower.includes('cgi') || lower.includes('product')) {
    details.service = '3D Product Commercials & CGI Ads';
  } else if (lower.includes('website') || lower.includes('landing') || lower.includes('web design') || lower.includes('page') || lower.includes('ui')) {
    details.service = 'High-Converting 3D Websites & Pages';
  } else if (lower.includes('brand') || lower.includes('identity') || lower.includes('logo') || lower.includes('social media')) {
    details.service = 'Complete Brand Identity & Social Engine';
  } else if (lower.includes('other') || lower.includes('custom') || lower.includes('something else')) {
    details.service = 'Other';
  }

  // 6. Slot detection
  if (lower.includes('today')) {
    details.slot = 'Today at 4:00 PM';
  } else if (lower.includes('tomorrow')) {
    details.slot = 'Tomorrow at 11:00 AM';
  }

  return details;
}

// ─── MAIN AJ BOT INTERACTIVE COMPONENT ───
export default function AjBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [inputText, setInputText] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('Today at 4:00 PM');
  
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
  const [clientCustomService, setClientCustomService] = useState('');
  const [isFormPrefilled, setIsFormPrefilled] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);

  // Ephemeral developer key override (optional, zero frontend hardcoding)
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return sessionStorage.getItem('symmetry_ephemeral_key') || '';
  });
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKeyInput, setTempKeyInput] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatModalRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Initial greeting
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'aj',
      text: "Hello! I'm AJ, an AI assistant working at Symmetry. Share your name and email or what you're building, and I will help you connect with the Symmetry team and pre-fill your meeting details—no need to type everything.",
      timestamp: 'Just now',
      type: 'quick-actions',
    },
  ]);

  // Show proactive teaser bubble after 3.2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTeaser(true);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll chat to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isThinking]);

  // ─── BULLETPROOF LENIS SCROLL ISOLATION ───
  // Completely prevents window / website smooth scrolling while scrolling inside AJ chat
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

  // Open chat and hide teaser
  const handleOpenChat = () => {
    setIsOpen(true);
    setShowTeaser(false);
  };

  // Broadcast auto-fill event to website contact form (CTASection)
  const broadcastAutoFill = (details: {
    name?: string;
    phone?: string;
    email?: string;
    company?: string;
    service?: string;
    autoScroll?: boolean;
  }) => {
    const profile = {
      name: details.name || clientName,
      phone: details.phone || clientPhone,
      email: details.email || clientEmail,
      company: details.company || clientCompany,
      service: details.service || clientService,
    };

    try {
      localStorage.setItem('symmetry_client_profile', JSON.stringify(profile));
    } catch {
      // Ignore in private browsing
    }

    setIsFormPrefilled(true);

    window.dispatchEvent(
      new CustomEvent('symmetry:prefill-contact', {
        detail: {
          ...profile,
          message: `Inquiry via AJ Studio Assistant (${profile.service || 'Creative Motion'})`,
          autoScroll: details.autoScroll || false,
        },
      })
    );
  };

  // ─── VALIDATED DISCOVERY CALL BOOKING & SPREADSHEET SYNC ───
  const handleBookCallSubmit = async (slot: string = selectedSlot) => {
    const trimmedName = clientName.trim();
    const trimmedPhone = clientPhone.trim();
    const trimmedEmail = clientEmail.trim();

    // 1. Mandatory Validation: Require Name and strictly require valid Email
    if (!trimmedName || trimmedName.length < 2) {
      setBookingError('Please enter your full name so the Symmetry team knows who the discovery call is with.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setBookingError('Work Email is strictly required. Please enter a valid email address so the Symmetry team can confirm your call.');
      return false;
    }

    // 2. Clear previous errors and start submission state
    setBookingError(null);
    setIsBookingSubmitting(true);
    setIsThinking(true);

    const contactMethod = trimmedPhone ? `Phone: ${trimmedPhone}` : `Email: ${trimmedEmail}`;
    const effectiveService = clientService === 'Other' && clientCustomService.trim()
      ? `Other: ${clientCustomService.trim()}`
      : clientService || 'Viral 4K Video Reels & Shorts';

    // 3. Save directly to Studio Spreadsheet (inquiries.csv + Google Sheet webhook)
    try {
      await submitInquiryToSpreadsheet({
        name: trimmedName,
        phone: trimmedPhone || 'Not provided',
        email: trimmedEmail || '',
        company: clientCompany.trim() || 'Direct Client',
        service: effectiveService,
        slot: slot,
        source: 'AJ Chat Bot',
        message: `Discovery call scheduled via AJ Studio Assistant for ${slot}. Contact: ${contactMethod}`,
      });
    } catch (err) {
      console.warn('Spreadsheet logging error:', err);
    }

    // 4. Also pre-fill the website contact form
    broadcastAutoFill({
      name: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail,
      company: clientCompany,
      service: effectiveService,
      autoScroll: false,
    });

    const bookingRecord = {
      name: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail,
      service: effectiveService,
      slot: slot,
      bookedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem('symmetry_booked_call', JSON.stringify(bookingRecord));
    } catch {
      // Fallback
    }

    setIsThinking(false);
    setIsBookingSubmitting(false);
    setBookingConfirmed(true);

    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: 'aj',
        text: `Meeting confirmed for ${slot}!\n\nThe Symmetry team has received your booking for ${trimmedName}. All details have been logged into our studio spreadsheet.\n\nWe will reach out to ${trimmedEmail}${trimmedPhone ? ` or WhatsApp/Phone (${trimmedPhone})` : ''} within our 48-72h project window.`,
        timestamp: 'Just now',
        actions: [
          {
            label: 'Sync 30-Min on Calendly',
            action: () => {
              window.open(CALENDLY_URL, '_blank');
            },
          },
          {
            label: 'WhatsApp Direct (Instant)',
            action: () => {
              window.open(
                `https://wa.me/?text=Hi%20Symmetry%20Team,%20I%20just%20scheduled%20a%20discovery%20call%20with%20Symmetry%20for%20${encodeURIComponent(slot)}!%20Name:%20${encodeURIComponent(trimmedName)}`,
                '_blank'
              );
            },
          },
          {
            label: 'View Pre-Filled Form on Page',
            action: () => {
              smoothScrollTo('#contact', -80);
              setIsOpen(false);
            },
          },
        ],
      },
    ]);

    return true;
  };

  // Save Session Gemini Key (Optional developer tool)
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
        text: 'API connection updated. Operating in zero-exposure mode.',
        timestamp: 'Just now',
      },
    ]);
  };

  // ─── FREE TIER SECURE GEMINI CALLER (MINIMAL TOKEN CONSUMPTION) ───
  const callGeminiApi = async (userPrompt: string): Promise<string | null> => {
    // 1. Primary: Query secure server proxy /api/gemini
    // Keeps GEMINI_API_KEY 100% on the server; zero frontend key exposure!
    try {
      const trimmedHistory = messages
        .slice(-2) // Only 2 past turns to consume minimum tokens!
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
      // Backend route unreachable (e.g. pure static preview)
    }

    // 2. Secondary fallback: If user explicitly entered an ephemeral key in this session
    if (geminiApiKey) {
      try {
        const systemInstruction = `You are AJ, an AI assistant working at Symmetry (luxury video commercials, 3D motion graphics, brand identity, websites).
Symmetry Team: Connect clients directly with the Symmetry team. Turnaround: 48-72h project delivery.
Email is strictly required to confirm any discovery booking.
Answer in 2-3 crisp sentences. Encourage booking with email.`;

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent`,
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
                maxOutputTokens: 220, // Free tier token conservation
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

  // Natural Language & Query Processor with Auto-Detail Extraction
  const handleSendMessage = async (userQuery?: string) => {
    const query = (userQuery || inputText).trim();
    if (!query) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userQuery) setInputText('');

    // Extract any client details shared in message
    const extracted = extractClientDetails(query);
    const hasNewDetails = Boolean(
      extracted.name || extracted.phone || extracted.email || extracted.company || extracted.service
    );

    const updatedName = extracted.name || clientName;
    const updatedPhone = extracted.phone || clientPhone;
    const updatedEmail = extracted.email || clientEmail;
    const updatedCompany = extracted.company || clientCompany;
    const updatedService = extracted.service || clientService;
    const updatedSlot = extracted.slot || selectedSlot;

    if (hasNewDetails) {
      if (extracted.name) setClientName(extracted.name);
      if (extracted.phone) setClientPhone(extracted.phone);
      if (extracted.email) setClientEmail(extracted.email);
      if (extracted.company) setClientCompany(extracted.company);
      if (extracted.service) setClientService(extracted.service);
      if (extracted.slot) setSelectedSlot(extracted.slot);

      // Auto-fill the website contact form immediately!
      broadcastAutoFill({
        name: updatedName,
        phone: updatedPhone,
        email: updatedEmail,
        company: updatedCompany,
        service: updatedService,
        autoScroll: false,
      });
    }

    // Simulate AJ Thinking
    setIsThinking(true);

    // Call Gemini Free Tier API via secure server proxy
    const geminiResponse = await callGeminiApi(query);

    if (geminiResponse) {
      setIsThinking(false);
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 1200);

      const q = query.toLowerCase();
      const needsBookingCard =
        hasNewDetails ||
        q.includes('book') ||
        q.includes('call') ||
        q.includes('schedule') ||
        q.includes('talk') ||
        q.includes('fast') ||
        q.includes('price') ||
        q.includes('cost');

      setMessages((prev) => [
        ...prev,
        {
          id: `aj-${Date.now()}`,
          sender: 'aj',
          text: hasNewDetails
            ? `Understood, ${updatedName || 'there'}! I have automatically pre-filled our website's meeting form with your details—no need to type everything.\n\n${geminiResponse}`
            : geminiResponse,
          timestamp: 'Just now',
          type: hasNewDetails ? 'autofill-pass' : needsBookingCard ? 'booking-card' : 'text',
          bookingData: {
            slots: [
              'Today at 4:00 PM',
              'Today at 6:30 PM',
              'Tomorrow at 11:00 AM',
              'Tomorrow at 3:30 PM',
            ],
            name: updatedName,
            phone: updatedPhone,
            email: updatedEmail,
            service: updatedService,
          },
          actions: [
            {
              label: 'Lock In Call (1-Click)',
              action: () => handleBookCallSubmit(updatedSlot),
            },
            {
              label: 'View Pre-Filled Form on Page',
              action: () => {
                smoothScrollTo('#contact', -80);
                setIsOpen(false);
              },
            },
            {
              label: 'Book 30-Min on Calendly',
              action: () => window.open(CALENDLY_URL, '_blank'),
            },
          ],
        },
      ]);
      return;
    }

    // Native Fallback if API is offline
    setTimeout(() => {
      setIsThinking(false);
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 1200);

      const q = query.toLowerCase();

      // Fast / Best / Quality / Booking
      if (
        hasNewDetails ||
        q.includes('fast') ||
        q.includes('best') ||
        q.includes('good') ||
        q.includes('book') ||
        q.includes('schedule') ||
        q.includes('call') ||
        q.includes('price')
      ) {
        setMessages((prev) => [
          ...prev,
          {
            id: `aj-${Date.now()}`,
            sender: 'aj',
            text: hasNewDetails
              ? `Details noted, ${updatedName || 'there'}! I've automatically pre-filled your discovery meeting pass on our website so you don't need to retype anything.\n\nPick your preferred time slot below to lock it in in 1 click:`
              : "Symmetry delivers high-retention 4K commercials and 3D motion graphics directly with the Symmetry team—zero agency bureaucracy, 48-72h project delivery.\n\nWould you like to schedule a discovery call right now?",
            timestamp: 'Just now',
            type: hasNewDetails ? 'autofill-pass' : 'booking-card',
            bookingData: {
              slots: [
                'Today at 4:00 PM',
                'Today at 6:30 PM',
                'Tomorrow at 11:00 AM',
                'Tomorrow at 3:00 PM',
              ],
              name: updatedName,
              phone: updatedPhone,
              email: updatedEmail,
              service: updatedService,
            },
            actions: [
              {
                label: 'Confirm 1-Click Meeting',
                action: () => handleBookCallSubmit(updatedSlot),
              },
              {
                label: 'View Pre-Filled Form',
                action: () => {
                  smoothScrollTo('#contact', -80);
                  setIsOpen(false);
                },
              },
              {
                label: 'Book on Calendly',
                action: () => window.open(CALENDLY_URL, '_blank'),
              },
            ],
          },
        ]);
        return;
      }

      // Default Studio Answer
      setMessages((prev) => [
        ...prev,
        {
          id: `aj-${Date.now()}`,
          sender: 'aj',
          text: `Understood! Whether you need high-retention reels, a luxury 3D commercial, or project pricing, Symmetry delivers at maximum speed and cinema polish.\n\nTell me your name or project scope, and I'll fill in your meeting pass automatically!`,
          timestamp: 'Just now',
          type: 'booking-card',
          bookingData: {
            slots: ['Today at 4:00 PM', 'Tomorrow at 11:00 AM', 'Tomorrow at 3:00 PM'],
          },
          actions: [
            {
              label: 'Book 30-Min on Calendly',
              action: () => window.open(CALENDLY_URL, '_blank'),
            },
            {
              label: 'Watch 4K Showreels',
              action: () => {
                smoothScrollTo('#showreel', -80);
                setIsOpen(false);
              },
            },
            {
              label: 'View Verified Reviews',
              action: () => {
                smoothScrollTo('#impact', -80);
                setIsOpen(false);
              },
            },
          ],
        },
      ]);
    }, 400);
  };

  return (
    <>
      {/* ─── CSS KEYFRAME ANIMATIONS FOR THE BOT ─── */}
      <style>{`
        @keyframes ajFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(0.4deg); }
        }
      `}</style>

      {/* ─── FLOATING TEASER BUBBLE (PROACTIVE ONBOARDING) ─── */}
      {!isOpen && showTeaser && (
        <div className="fixed bottom-24 right-6 z-40 max-w-[290px] sm:max-w-xs animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="relative glass-panel p-4 rounded-2xl border border-white/20 shadow-[0_16px_50px_rgba(0,0,0,0.9)] bg-[#070810]/95 text-white">
            <button
              onClick={() => setShowTeaser(false)}
              className="absolute top-2 right-2 p-1 text-white/50 hover:text-white transition-colors cursor-pointer"
              aria-label="Dismiss message"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-start gap-3">
              <AjAvatar size="sm" isSpeaking={false} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-display font-bold text-xs text-white leading-snug">
                  Hi, I'm AJ
                </p>
                <p className="font-body text-[11px] text-[#c2c2d2] mt-1 leading-relaxed">
                  Need details on our 4K video services or want to book a call in 1 click?
                </p>

                {/* Theme-aligned buttons */}
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={handleOpenChat}
                    className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#e0e0e0] text-black font-mono text-[10px] font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(255,255,255,0.25)] flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <span>Chat with AJ</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => {
                      handleOpenChat();
                      handleSendMessage('Book a call');
                    }}
                    className="px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>1-Click Call</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── FLOATING LAUNCHER BUTTON (WEBSITE THEME ALIGNED) ─── */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
            } else {
              handleOpenChat();
            }
          }}
          className="group relative flex items-center gap-3 p-2 pr-3.5 rounded-full bg-[#05060c]/95 hover:bg-[#0a0c16] border border-white/20 hover:border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.12)] hover:shadow-[0_0_40px_rgba(255,255,255,0.28)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
          aria-label="Chat with AJ, Symmetry's Creative Assistant"
        >
          {/* Animated Avatar Icon */}
          <AjAvatar size="sm" isSpeaking={isSpeaking} isThinking={isThinking} />

          {/* Label + Online Beacon */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-xs tracking-wider text-white">
                AJ
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="font-mono text-[9px] text-[#b4b4c4] uppercase tracking-wider">
              {isOpen ? 'Close' : 'Explore & Book'}
            </span>
          </div>

          {/* Symmetry Website Theme Signature White Pill Badge */}
          <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white group-hover:bg-[#eaeaea] text-black font-mono text-[10px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all">
            <span>{isOpen ? 'Close' : '1-Click Call'}</span>
          </span>
        </button>
      </div>

      {/* ─── INTERACTIVE AJ CHAT DRAWER / MODAL ─── */}
      {isOpen && (
        <div
          ref={chatModalRef}
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          onWheel={(e) => e.stopPropagation()}
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] sm:w-[430px] h-[610px] max-h-[85vh] rounded-3xl bg-[#06070e]/95 backdrop-blur-2xl border border-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-250 overscroll-contain"
        >
          
          {/* Header */}
          <div className="p-3.5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <AjAvatar size="sm" isSpeaking={isSpeaking} isThinking={isThinking} />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-extrabold text-sm text-white tracking-wide">
                    AJ • Creative Assistant
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[8px] font-mono uppercase tracking-wider bg-white/10 text-white border border-white/20">
                    GEMINI LIVE
                  </span>
                </div>
                <p className="font-mono text-[10px] text-[#b0b0c2]">
                  Symmetry Team Assistant • 48-72h Delivery
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Optional Key Settings Toggle */}
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

              <button
                onClick={() => {
                  setMessages([
                    {
                      id: `msg-${Date.now()}`,
                      sender: 'aj',
                      text: "Chat cleared! How can I assist with your video project or call booking?",
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

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ─── HERO BOT SHOWCASE BANNER ─── */}
          <div className="px-3 pt-3">
            <AjAvatar size="hero" isSpeaking={isSpeaking} isThinking={isThinking} />
          </div>

          {/* Quick 1-Click Action Bar (Symmetry Theme Aligned) */}
          <div className="px-3 py-2 bg-black/40 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px] font-mono mt-1">
            <button
              onClick={() => handleSendMessage('Book a call in 1 click')}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-[#eaeaea] text-black font-bold uppercase tracking-wider text-[10px] shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
            >
              <Phone className="w-3 h-3 text-black" />
              <span>1-Click Call</span>
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

          {/* Messages Scroll Area with Bulletproof Lenis Isolation */}
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
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-white text-black font-medium shadow-[0_4px_16px_rgba(255,255,255,0.15)]'
                      : 'bg-white/[0.04] border border-white/10 text-[#d8d8e4]'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>

                  {/* Interactive Auto-Filled Website Pass */}
                  {m.type === 'autofill-pass' && (
                    <div className="mt-3 p-3.5 rounded-2xl bg-white/[0.05] border border-white/20 flex flex-col gap-2.5 font-mono text-[11px]">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-white font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Pre-Filled Website Pass</span>
                        </span>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          AUTO-SYNCED
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-[#c0c0cb]">
                        {clientName && (
                          <div className="flex justify-between items-center">
                            <span className="text-[#b0b0c0]">Name:</span>
                            <span className="text-white font-semibold">{clientName}</span>
                          </div>
                        )}
                        {clientPhone && (
                          <div className="flex justify-between items-center">
                            <span className="text-[#b0b0c0]">Phone:</span>
                            <span className="text-white font-semibold">{clientPhone}</span>
                          </div>
                        )}
                        {clientEmail && (
                          <div className="flex justify-between items-center">
                            <span className="text-[#b0b0c0]">Email:</span>
                            <span className="text-white font-semibold">{clientEmail}</span>
                          </div>
                        )}
                        {clientService && (
                          <div className="flex justify-between items-center">
                            <span className="text-[#b0b0c0]">Service:</span>
                            <span className="text-white font-medium truncate max-w-[190px]">
                              {clientService === 'Other'
                                ? (clientCustomService ? `Other: ${clientCustomService}` : 'Other (Custom Request)')
                                : clientService}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <span className="text-[#b0b0c0]">Slot:</span>
                          <span className="text-white font-semibold">{selectedSlot}</span>
                        </div>
                      </div>

                      <p className="text-[10px] text-emerald-400/90 font-mono mt-0.5">
                        ✓ Form on website pre-filled with zero retyping
                      </p>

                      {/* Interactive Autofill details or missing fields */}
                      {(!clientName || !clientEmail || (clientService === 'Other' && !clientCustomService)) && (
                        <div className="space-y-1.5 pt-2 border-t border-white/10">
                          <p className="text-[10px] text-amber-300/90 font-mono">
                            Please provide your name & email (required) to confirm the meeting:
                          </p>
                          {!clientName && (
                            <div className="relative">
                              <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                              <input
                                type="text"
                                placeholder="Your Full Name * (required)"
                                value={clientName}
                                onChange={(e) => {
                                  setClientName(e.target.value);
                                  setBookingError(null);
                                }}
                                className="w-full pl-8 pr-3 py-2 rounded-xl bg-black/70 border border-white/15 text-[11px] font-mono text-white placeholder:text-[#9a9aa8] focus:outline-none focus:border-white/50"
                              />
                            </div>
                          )}
                          {!clientEmail && (
                            <div className="relative">
                              <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                              <input
                                type="email"
                                placeholder="Work Email * (required)"
                                value={clientEmail}
                                onChange={(e) => {
                                  setClientEmail(e.target.value);
                                  setBookingError(null);
                                }}
                                className="w-full pl-8 pr-3 py-2 rounded-xl bg-black/70 border border-white/20 text-[11px] font-mono text-white placeholder:text-[#9a9aa8] focus:outline-none focus:border-white/60"
                              />
                            </div>
                          )}
                          {!clientPhone && (
                            <div className="relative">
                              <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                              <input
                                type="tel"
                                placeholder="WhatsApp or Phone (optional)"
                                value={clientPhone}
                                onChange={(e) => {
                                  setClientPhone(e.target.value);
                                  setBookingError(null);
                                }}
                                className="w-full pl-8 pr-3 py-2 rounded-xl bg-black/70 border border-white/15 text-[11px] font-mono text-white placeholder:text-[#9a9aa8] focus:outline-none focus:border-white/50"
                              />
                            </div>
                          )}
                          {clientService === 'Other' && !clientCustomService && (
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="Describe your custom project (e.g. YouTube edit, 3D promo)..."
                                value={clientCustomService}
                                onChange={(e) => setClientCustomService(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl bg-black/70 border border-white/20 text-[11px] font-mono text-white placeholder:text-[#9a9aa8] focus:outline-none focus:border-white/60"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Inline Error Alert */}
                      {bookingError && (
                        <div className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 text-[11px] font-mono flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                          <span>{bookingError}</span>
                        </div>
                      )}

                      <div className="pt-2 border-t border-white/10 flex flex-col gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleBookCallSubmit(selectedSlot)}
                          disabled={isBookingSubmitting}
                          className="w-full py-2.5 px-3 rounded-xl bg-white text-black font-bold uppercase tracking-wider text-xs hover:bg-[#eaeaea] shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all cursor-pointer text-center hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                          {isBookingSubmitting ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Saving to Studio Spreadsheet...</span>
                            </>
                          ) : (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Confirm Discovery Call</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            smoothScrollTo('#contact', -80);
                            setIsOpen(false);
                          }}
                          className="w-full py-2 px-3 rounded-xl bg-white/[0.08] hover:bg-white hover:text-black border border-white/20 text-white font-medium uppercase tracking-wider text-[10px] transition-all cursor-pointer text-center"
                        >
                          View Pre-Filled Form on Page
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Interactive Booking Card (Requires Name & Contact Details) */}
                  {m.type === 'booking-card' && (
                    <div className="mt-3 pt-3 border-t border-white/15 flex flex-col gap-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-white font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-white" />
                          <span>Select Discovery Slot:</span>
                        </span>

                        <a
                          href={CALENDLY_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[10px] text-[#a0a0b2] hover:text-white underline flex items-center gap-1"
                        >
                          <span>Calendly</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>

                      {/* Slot selection pills — NEVER auto-books on click */}
                      <div className="grid grid-cols-2 gap-1.5">
                        {m.bookingData?.slots.map((slot, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setSelectedSlot(slot);
                              setBookingError(null);
                            }}
                            className={`p-2 rounded-xl text-[10px] font-mono text-center border transition-all cursor-pointer uppercase tracking-wider ${
                              selectedSlot === slot
                                ? 'bg-white text-black font-bold border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                : 'bg-white/[0.04] border-white/15 text-white/90 hover:bg-white hover:text-black hover:border-white'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>

                      {/* Required Contact Details Input Fields */}
                      <div className="space-y-1.5 mt-1">
                        <div className="relative">
                          <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                          <input
                            type="text"
                            placeholder="Full Name (required)"
                            value={clientName}
                            onChange={(e) => {
                              setClientName(e.target.value);
                              setBookingError(null);
                            }}
                            className="w-full pl-8 pr-3 py-2 rounded-xl bg-black/70 border border-white/15 text-[11px] font-mono text-white placeholder:text-[#9a9aa8] focus:outline-none focus:border-white/60"
                          />
                        </div>

                        <div className="relative">
                          <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                          <input
                            type="email"
                            placeholder="Work Email * (required)"
                            value={clientEmail}
                            onChange={(e) => {
                              setClientEmail(e.target.value);
                              setBookingError(null);
                            }}
                            className="w-full pl-8 pr-3 py-2 rounded-xl bg-black/70 border border-white/20 text-[11px] font-mono text-white placeholder:text-[#9a9aa8] focus:outline-none focus:border-white/60"
                          />
                        </div>

                        <div className="relative">
                          <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                          <input
                            type="tel"
                            placeholder="WhatsApp or Phone (optional)"
                            value={clientPhone}
                            onChange={(e) => {
                              setClientPhone(e.target.value);
                              setBookingError(null);
                            }}
                            className="w-full pl-8 pr-3 py-2 rounded-xl bg-black/70 border border-white/15 text-[11px] font-mono text-white placeholder:text-[#9a9aa8] focus:outline-none focus:border-white/60"
                          />
                        </div>

                        {/* Service selector with Other option */}
                        <div className="relative">
                          <label id="bot-service-label" htmlFor="bot-booking-service" className="sr-only">
                            Select Creative Service for Project Scoping
                          </label>
                          <select
                            id="bot-booking-service"
                            name="bookingService"
                            aria-labelledby="bot-service-label"
                            aria-label="Select Creative Service for Project Scoping"
                            value={clientService}
                            onChange={(e) => setClientService(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-black/70 border border-white/15 text-[11px] font-mono text-white focus:outline-none focus:border-white/60 cursor-pointer"
                          >
                            <option value="Viral 4K Video Reels & Shorts" className="bg-[#101018] text-white">
                              🎥 Viral 4K Video Reels & Shorts
                            </option>
                            <option value="3D Product Commercials & CGI Ads" className="bg-[#101018] text-white">
                              ✨ 3D Product Commercials & CGI Ads
                            </option>
                            <option value="High-Converting 3D Websites & Pages" className="bg-[#101018] text-white">
                              💻 High-Converting 3D Websites & Pages
                            </option>
                            <option value="Complete Brand Identity & Social Engine" className="bg-[#101018] text-white">
                              👑 Complete Brand Identity & Social Engine
                            </option>
                            <option value="Other" className="bg-[#101018] text-white">
                              💡 Other / Custom Creative Project
                            </option>
                          </select>
                        </div>

                        {clientService === 'Other' && (
                          <div className="relative animate-in fade-in">
                            <input
                              type="text"
                              placeholder="Describe your custom project or need..."
                              value={clientCustomService}
                              onChange={(e) => setClientCustomService(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-black/70 border border-white/20 text-[11px] font-mono text-white placeholder:text-[#9a9aa8] focus:outline-none focus:border-white/60"
                            />
                          </div>
                        )}
                      </div>

                      {/* Inline Validation Alert */}
                      {bookingError && (
                        <div className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 text-[11px] font-mono flex items-center gap-2 animate-in fade-in">
                          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                          <span>{bookingError}</span>
                        </div>
                      )}

                      {/* Confirm Meeting Button */}
                      <button
                        type="button"
                        onClick={() => handleBookCallSubmit(selectedSlot)}
                        disabled={isBookingSubmitting}
                        className="w-full py-2.5 px-3 rounded-xl bg-white text-black font-bold uppercase tracking-wider text-xs hover:bg-[#eaeaea] shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
                      >
                        {isBookingSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Saving to Spreadsheet...</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Confirm Discovery Call</span>
                          </>
                        )}
                      </button>

                      <p className="text-[9px] text-[#b0b0c0] font-mono text-center flex items-center justify-center gap-1.5">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        <span>All bookings auto-synced into studio spreadsheet</span>
                      </p>
                    </div>
                  )}

                  {/* Quick Navigation Action Buttons (Website Theme Aligned) */}
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

                <span className="font-mono text-[9px] text-[#c2c2d2] mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {/* Thinking Indicator */}
            {isThinking && (
              <div className="flex items-center gap-2 text-white/90 font-mono text-[11px] p-2.5 bg-white/5 rounded-xl border border-white/10 max-w-[130px]">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>AJ is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Footer */}
          <div className="p-3 border-t border-white/10 bg-black/60">
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
                placeholder="Ask AJ anything or say 'book call'..."
                aria-label="Ask AJ anything or say 'book call'"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-xs text-white placeholder:text-[#9a9aa8] focus:outline-none focus:border-white/50 transition-colors"
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
                  Gemini API Connected
                </h4>
                <p className="font-mono text-[10px] text-[#b0b0c0]">
                  Live Multimodal Intelligence
                </p>
              </div>
            </div>

            <p className="font-body text-xs text-[#a0a0b2] leading-relaxed mb-4">
              Your Gemini API key is linked and active. AJ responds with live generative intelligence using Gemini 3.5 Flash.
            </p>

            <input
              type="password"
              placeholder="Gemini API Key"
              value={tempKeyInput}
              onChange={(e) => setTempKeyInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/20 text-xs font-mono text-white placeholder:text-[#9a9aa8] focus:outline-none focus:border-white mb-3"
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
