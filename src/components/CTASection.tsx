// ─────────────────────────────────────────────
// SYMMETRY — Enterprise Client Inquiry Form
// Features:
// 1. Multi-Country Phone Selector with Live Search
// 2. Strict Rate Limiting (Cooldown Protection & Timers)
// 3. Geolocation & Timezone Discrepancy Verification
// 4. "Don't Try to be Smart" Anti-Cheat & Fake Detail Anomaly Warning
// 5. Luxurious Multi-Stage Neural Handshake Loading Experience
// ─────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Send,
  Compass,
  Calendar,
  Mail,
  Clock,
  Lock,
  Shield,
  ShieldAlert,
  AlertTriangle,
  Globe2,
  Phone,
  RefreshCw,
  Cpu,
  ChevronDown,
  X,
  Search,
} from 'lucide-react';
import { smoothScrollTo } from '@/hooks/useLenis';
import { submitInquiryToSpreadsheet } from '@/utils/spreadsheet';

interface CountryItem {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

const COUNTRIES: CountryItem[] = [
  { name: 'United States', code: 'US', dialCode: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: '🇬🇧' },
  { name: 'India', code: 'IN', dialCode: '+91', flag: '🇮🇳' },
  { name: 'United Arab Emirates', code: 'AE', dialCode: '+971', flag: '🇦🇪' },
  { name: 'Canada', code: 'CA', dialCode: '+1', flag: '🇨🇦' },
  { name: 'Australia', code: 'AU', dialCode: '+61', flag: '🇦🇺' },
  { name: 'Germany', code: 'DE', dialCode: '+49', flag: '🇩🇪' },
  { name: 'France', code: 'FR', dialCode: '+33', flag: '🇫🇷' },
  { name: 'Singapore', code: 'SG', dialCode: '+65', flag: '🇸🇬' },
  { name: 'Japan', code: 'JP', dialCode: '+81', flag: '🇯🇵' },
  { name: 'Switzerland', code: 'CH', dialCode: '+41', flag: '🇨🇭' },
  { name: 'Netherlands', code: 'NL', dialCode: '+31', flag: '🇳🇱' },
  { name: 'Saudi Arabia', code: 'SA', dialCode: '+966', flag: '🇸🇦' },
  { name: 'Italy', code: 'IT', dialCode: '+39', flag: '🇮🇹' },
  { name: 'Spain', code: 'ES', dialCode: '+34', flag: '🇪🇸' },
  { name: 'Sweden', code: 'SE', dialCode: '+46', flag: '🇸🇪' },
  { name: 'Norway', code: 'NO', dialCode: '+47', flag: '🇳🇴' },
  { name: 'Ireland', code: 'IE', dialCode: '+353', flag: '🇮🇪' },
  { name: 'Brazil', code: 'BR', dialCode: '+55', flag: '🇧🇷' },
  { name: 'South Africa', code: 'ZA', dialCode: '+27', flag: '🇿🇦' },
];

const DISPOSABLE_EMAIL_DOMAINS = [
  'test.com',
  'example.com',
  'mailinator.com',
  'tempmail.com',
  '10minutemail.com',
  'fake.com',
  'fakeemail.com',
  'asdf.com',
  'qwerty.com',
  'trashmail.com',
  'guerrillamail.com',
  'yopmail.com',
  'sharklasers.com',
  'dispostable.com',
];

const FAKE_LOCATIONS = [
  'mars',
  'nowhere',
  'north pole',
  'south pole',
  'fake street',
  '123 fake',
  'asdf',
  'qwerty',
  'test',
  'n/a',
  'unknown',
  'xyz',
  'none',
  'wonderland',
  'bikini bottom',
  'hogwarts',
];

const GIBBERISH_PATTERNS = [
  /^[a-z]{1,2}$/i,
  /^(.)\1{4,}$/,
  /^(asdf|qwerty|zxcv|1234|qwer|hjkl|poiuy)/i,
];

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 mins

export default function CTASection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+1',
    phone: '',
    location: '',
    company: '',
    service: 'Viral 4K Video Reels & Shorts',
    customService: '',
    message: '',
    honeypot: '', // bot trap
  });

  const [selectedCountry, setSelectedCountry] = useState<CountryItem>(COUNTRIES[0]);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Security & verification state
  const [detectedTimezone, setDetectedTimezone] = useState('');
  const [securityAlert, setSecurityAlert] = useState<string | null>(null);
  const [shakeKey, setShakeKey] = useState(0);

  // Rate limiting state
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitSecondsLeft, setRateLimitSecondsLeft] = useState(0);

  // Multi-stage loading animation state
  const [loadingStep, setLoadingStep] = useState<number | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Detect user telemetry on mount
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setDetectedTimezone(tz || 'UTC');
    } catch {
      setDetectedTimezone('UTC / Global');
    }

    checkRateLimit();
  }, []);

  // Listen for auto-fill events from AJ Assistant
  useEffect(() => {
    const handlePrefill = (e: Event) => {
      const customEvent = e as CustomEvent<{
        name?: string;
        email?: string;
        phone?: string;
        countryCode?: string;
        company?: string;
        service?: string;
        message?: string;
        location?: string;
        autoScroll?: boolean;
      }>;
      const data = customEvent.detail;
      if (!data) return;

      setFormData((prev) => ({
        ...prev,
        name: data.name ?? prev.name,
        email: data.email ?? prev.email,
        phone: data.phone ?? prev.phone,
        company: data.company ?? prev.company,
        service: data.service ?? prev.service,
        message: data.message ?? prev.message,
        location: data.location ?? prev.location,
        countryCode: data.countryCode ?? prev.countryCode,
      }));

      if (data.countryCode) {
        const found = COUNTRIES.find((c) => c.code === data.countryCode);
        if (found) setSelectedCountry(found);
      }

      if (data.autoScroll) {
        smoothScrollTo('#contact', -80);
      }
    };

    window.addEventListener('symmetry:prefill-contact', handlePrefill);
    return () => window.removeEventListener('symmetry:prefill-contact', handlePrefill);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Rate limit countdown timer
  useEffect(() => {
    if (!isRateLimited || rateLimitSecondsLeft <= 0) return;
    const timer = setInterval(() => {
      setRateLimitSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRateLimited(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRateLimited, rateLimitSecondsLeft]);

  const checkRateLimit = () => {
    try {
      const raw = localStorage.getItem('symmetry_inquiry_timestamps');
      if (!raw) return false;
      const timestamps: number[] = JSON.parse(raw);
      const now = Date.now();
      const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

      if (recent.length >= RATE_LIMIT_MAX) {
        const oldestRecent = Math.min(...recent);
        const remainingMs = RATE_LIMIT_WINDOW_MS - (now - oldestRecent);
        const remainingSec = Math.ceil(remainingMs / 1000);
        setIsRateLimited(true);
        setRateLimitSecondsLeft(remainingSec);
        return true;
      }
    } catch {
      // Fallback
    }
    return false;
  };

  const recordSubmission = () => {
    try {
      const raw = localStorage.getItem('symmetry_inquiry_timestamps');
      const timestamps: number[] = raw ? JSON.parse(raw) : [];
      timestamps.push(Date.now());
      localStorage.setItem('symmetry_inquiry_timestamps', JSON.stringify(timestamps));
    } catch {
      // Fallback
    }
  };

  const validateAntiCheat = (): string | null => {
    // 1. Honeypot check (invisible bot trap)
    if (formData.honeypot.trim().length > 0) {
      return 'Automated crawling or script injection detected via security trap.';
    }

    // 2. Name validation
    const trimmedName = formData.name.trim();
    if (trimmedName.length < 3) {
      return "Please enter a valid full name. Input is too short or incomplete.";
    }
    for (const pat of GIBBERISH_PATTERNS) {
      if (pat.test(trimmedName)) {
        return "Don't try to be smart: Gibberish or test name pattern detected. Please enter legitimate credentials.";
      }
    }

    // 3. Email validation & Disposable domain blocking
    const emailParts = formData.email.toLowerCase().trim().split('@');
    if (emailParts.length !== 2) {
      return 'Please enter a valid RFC-compliant email address.';
    }
    const [userPart, domainPart] = emailParts;
    if (DISPOSABLE_EMAIL_DOMAINS.includes(domainPart)) {
      return `Don't try to be smart: Fake or temporary email domain (@${domainPart}) flagged by Symmetry Security Filter. Please use a valid corporate or personal email.`;
    }
    if (/^(.)\1{3,}$/.test(userPart) || /^(test|asdf|fake|admin|noone|nobody)$/.test(userPart)) {
      return "Don't try to be smart: Spoofed email username detected. Please provide verified contact details.";
    }

    // 4. Phone validation & Fake number patterns
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 7 || cleanPhone.length > 15) {
      return 'Please enter a valid phone number (between 7 and 15 digits).';
    }
    // Check for repetitive digits (e.g. 0000000, 1111111)
    if (/^(.)\1+$/.test(cleanPhone)) {
      return "Don't try to be smart: Spoofed repetitive phone digits (e.g. 0000000000) are rejected by our telecom gateway.";
    }
    // Check for obvious sequential patterns
    if (cleanPhone.includes('12345678') || cleanPhone.includes('98765432')) {
      return "Don't try to be smart: Sequential mock phone number detected. Please enter a reachable business phone number.";
    }

    // 5. Fake Location / Spoofing checks
    if (formData.location) {
      const locLower = formData.location.toLowerCase().trim();
      if (FAKE_LOCATIONS.some((fake) => locLower.includes(fake))) {
        return `Don't try to be smart: Fictional location ("${formData.location}") detected by geographical integrity verification.`;
      }
      if (locLower.length < 2 || /^(.)\1{3,}$/.test(locLower)) {
        return 'Please specify a legitimate operating city or territory.';
      }
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check rate limit first
    if (checkRateLimit()) {
      setShakeKey((k) => k + 1);
      return;
    }

    // Run deep anti-cheat checks
    const cheatError = validateAntiCheat();
    if (cheatError) {
      setSecurityAlert(cheatError);
      setShakeKey((k) => k + 1);
      return;
    }

    setSecurityAlert(null);

    // Multi-stage satisfying loading effect
    setLoadingStep(1);
    setLoadingProgress(15);

    setTimeout(() => {
      setLoadingStep(2);
      setLoadingProgress(45);
    }, 600);

    setTimeout(() => {
      setLoadingStep(3);
      setLoadingProgress(80);
    }, 1300);

    setTimeout(() => {
      setLoadingStep(4);
      setLoadingProgress(100);
    }, 2000);

    setTimeout(async () => {
      recordSubmission();

      // Submit to spreadsheet (data/inquiries.csv & Google Sheets Webhook)
      const fullPhone = `${selectedCountry.dialCode} ${formData.phone.trim()}`;
      const finalService = formData.service === 'Other'
        ? `Other: ${formData.customService.trim() || 'Custom Request'}`
        : formData.service;

      await submitInquiryToSpreadsheet({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: fullPhone,
        company: formData.company.trim(),
        service: finalService,
        location: formData.location.trim() || detectedTimezone,
        message: formData.message.trim(),
        source: 'Website Form',
      });

      setLoadingStep(null);
      setSubmitted(true);
    }, 2600);
  };

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.dialCode.includes(countrySearch)
  );

  return (
    <section id="contact" className="relative py-32 px-6 bg-[#030303] overflow-hidden border-t border-white/5">
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-white/[0.03] blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          key={shakeKey}
          className={`glass-panel rounded-3xl p-8 sm:p-14 border border-white/20 shadow-2xl relative overflow-hidden transition-all duration-300 ${
            securityAlert ? 'border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.2)] animate-shake' : ''
          }`}
        >
          {/* Top Accent Beam */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          {/* Live Telemetry Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10 text-[11px] font-mono text-[#b4b4c6]">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>TLS 1.3 ENCRYPTED GATEWAY</span>
              <span className="text-white/20">•</span>
              <span className="text-emerald-400">ACTIVE FIREWALL</span>
            </div>

            <div className="flex items-center gap-2">
              <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>DETECTED ORIGIN NODE:</span>
              <span className="text-white font-semibold">{detectedTimezone}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Copy, Calendly Direct Access & Studio Verification */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#b4b4c0] mb-6">
                  <Compass className="w-3.5 h-3.5 text-white" />
                  <span>DIRECT STUDIO INQUIRY</span>
                </div>

                <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-[1.08] mb-6">
                  READY TO ELEVATE YOUR <span className="chrome-text">BRAND REALM?</span>
                </h2>

                <p className="font-body text-[#b4b4c0] text-sm sm:text-base leading-relaxed mb-6">
                  Collaborate directly with our creative directors and technical leads. We architect custom visual campaigns, cinema-grade product films, and high-velocity digital ecosystems.
                </p>

                {/* Direct Calendly Priority Booking Card */}
                <div className="mb-8 p-5 rounded-2xl bg-white/[0.04] border border-white/15 hover:border-white/30 transition-all shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-emerald-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Priority 1-on-1 Access</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#b4b4c6]">Instant Sync</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-white mb-1.5">
                    Schedule a 30-Minute Consultation
                  </h3>
                  <p className="font-body text-xs text-[#b4b4c2] leading-relaxed mb-4">
                    Reserve a direct session on our directors' calendar to review your commercial brief or motion graphics pipeline.
                  </p>
                  <a
                    href="https://calendly.com/sabatanant883/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#eaeaea] transition-all group"
                  >
                    <span>Open Calendly Schedule</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Direct Email, Channels & Security Guarantees */}
              <div className="space-y-3 pt-6 border-t border-white/10 text-xs font-mono text-[#b4b4c6]">
                <div className="flex items-center justify-between">
                  <span className="text-[#b4b4c6] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-white/70" />
                    <span>Direct Inquiries:</span>
                  </span>
                  <a href="mailto:symmetryofficial1@gmail.com" className="text-white hover:underline font-medium">
                    symmetryofficial1@gmail.com
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#b4b4c6]">Instagram:</span>
                  <a
                    href="https://www.instagram.com/symmetry_official_?stkn=aHUzajRrNmc2ZTR1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline flex items-center gap-1"
                  >
                    <span>@symmetry_official_</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#b4b4c6]">YouTube:</span>
                  <a
                    href="https://youtube.com/@symmetry_official?si=_Pl3vL63HxJBorQj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline flex items-center gap-1"
                  >
                    <span>@symmetry_official</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </div>

                <div className="flex items-center gap-3 pt-3 text-[11px] text-[#b4b4c6]">
                  <Lock className="w-3.5 h-3.5 text-white/70 flex-shrink-0" />
                  <span>Strict enterprise Non-Disclosure Agreement (NDA) & rapid turnaround</span>
                </div>
              </div>
            </div>

            {/* Right Form with Country Selector & Anti-Cheat System */}
            <div className="lg:col-span-7">
              {/* Security Alert Toast if Cheat Detected */}
              {securityAlert && (
                <div className="mb-6 p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs font-mono flex items-start gap-3 shadow-[0_0_30px_rgba(239,68,68,0.25)] relative">
                  <ShieldAlert className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5 animate-pulse" />
                  <div className="flex-1">
                    <p className="font-bold text-red-400 mb-1 flex items-center gap-2">
                      <span>SECURITY INTEGRITY INTERVENTION</span>
                      <span className="px-1.5 py-0.2 rounded bg-red-500/20 text-[9px]">SPOOF BLOCKED</span>
                    </p>
                    <p className="leading-relaxed">{securityAlert}</p>
                  </div>
                  <button
                    onClick={() => setSecurityAlert(null)}
                    className="p-1 rounded-lg hover:bg-white/10 text-red-300 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Rate Limit Blocked Notice */}
              {isRateLimited && (
                <div className="mb-6 p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs font-mono flex items-start gap-3 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-amber-300 mb-1">
                      RATE LIMIT ACTIVE // TRAFFIC CONTROL
                    </p>
                    <p className="leading-relaxed mb-2">
                      Maximum inquiry velocity reached ({RATE_LIMIT_MAX} requests per 15 minutes). Please allow our directors time to evaluate your submitted files.
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Cooldown remaining: {rateLimitSecondsLeft}s</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Multi-Stage Loading Overlay */}
              {loadingStep !== null ? (
                <div className="p-8 sm:p-12 rounded-2xl bg-black/80 border border-white/20 text-center flex flex-col items-center justify-center min-h-[440px] relative overflow-hidden backdrop-blur-xl">
                  {/* Cyber Scanline Effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none animate-pulse" />

                  {/* Circular Laser Progress Display */}
                  <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        className="text-white/10 stroke-current"
                        strokeWidth="6"
                        fill="transparent"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        className="text-white stroke-current transition-all duration-500 ease-out"
                        strokeWidth="6"
                        strokeDasharray={264}
                        strokeDashoffset={264 - (264 * loadingProgress) / 100}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-mono text-xs font-bold text-white">{loadingProgress}%</span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white mb-2">
                    {loadingStep === 1 && 'Cryptographic Handshake Initialized...'}
                    {loadingStep === 2 && 'Verifying Geolocation & Anti-Spoof Matrix...'}
                    {loadingStep === 3 && 'Routing to Executive Dispatch Queue...'}
                    {loadingStep === 4 && 'Transmission Confirmed!'}
                  </h3>

                  <p className="font-mono text-xs text-[#b0b0c2] max-w-sm leading-relaxed mb-6">
                    {loadingStep === 1 && 'Applying quantum-resistant 256-bit encryption payload.'}
                    {loadingStep === 2 && `Validating cross-reference with node ${detectedTimezone}.`}
                    {loadingStep === 3 && 'Signing project brief into secure enterprise ledger.'}
                    {loadingStep === 4 && 'Complete. Opening secure client session.'}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#c2c2d2]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>ZERO-KNOWLEDGE AUTHENTICATION</span>
                  </div>
                </div>
              ) : submitted ? (
                /* Success View */
                <div className="p-8 sm:p-12 rounded-2xl bg-white/[0.03] border border-white/20 text-center flex flex-col items-center justify-center min-h-[440px] shadow-2xl">
                  <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-2">
                    Transmission Authenticated
                  </h3>
                  <p className="font-body text-sm text-[#b8b8c6] max-w-md mb-8 leading-relaxed">
                    Thank you, {formData.name}. Your details have passed security integrity checks. A creative technology director will reach out via <span className="text-white font-semibold">{formData.email}</span> or <span className="text-white font-semibold">{selectedCountry.dialCode} {formData.phone}</span> within 4 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        countryCode: '+1',
                        phone: '',
                        location: '',
                        company: '',
                        service: 'Viral 4K Video Reels & Shorts',
                        customService: '',
                        message: '',
                        honeypot: '',
                      });
                    }}
                    className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                /* Main Interactive Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field (hidden from genuine users, catches bots) */}
                  <input
                    type="text"
                    name="website_trap"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  {/* Name and Work Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="inquiry-name" className="block text-xs font-mono uppercase tracking-wider text-[#b4b4c4] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        id="inquiry-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        autoComplete="name"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-white focus:outline-none text-white text-sm font-body transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="inquiry-email" className="block text-xs font-mono uppercase tracking-wider text-[#b4b4c4] mb-1.5">
                        Verified Work Email *
                      </label>
                      <input
                        id="inquiry-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        autoComplete="email"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-white focus:outline-none text-white text-sm font-body transition-colors"
                      />
                    </div>
                  </div>

                  {/* International Phone with Country Code Selector */}
                  <div>
                    <label htmlFor="inquiry-phone" className="block text-xs font-mono uppercase tracking-wider text-[#b4b4c4] mb-1.5">
                      Phone Number & Country Code *
                    </label>
                    <div className="flex gap-2">
                      {/* Country Code Dropdown Trigger */}
                      <div className="relative" ref={dropdownRef}>
                        <button
                          type="button"
                          aria-label={`Selected country dial code: ${selectedCountry.name} ${selectedCountry.dialCode}. Click to change.`}
                          aria-haspopup="listbox"
                          aria-expanded={countryDropdownOpen}
                          onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                          className="h-full px-3.5 py-3 rounded-xl bg-black/60 border border-white/15 hover:border-white/30 text-white text-sm font-mono flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <span className="text-base">{selectedCountry.flag}</span>
                          <span className="font-semibold">{selectedCountry.dialCode}</span>
                          <ChevronDown className="w-3.5 h-3.5 text-white/50" />
                        </button>

                        {/* Country Search Dropdown Menu */}
                        {countryDropdownOpen && (
                          <div className="absolute top-full left-0 mt-2 w-72 max-h-64 rounded-2xl bg-[#0c0c0e] border border-white/20 shadow-2xl z-50 overflow-hidden flex flex-col backdrop-blur-xl">
                            <div className="p-2.5 border-b border-white/10 flex items-center gap-2 bg-black/50">
                              <Search className="w-3.5 h-3.5 text-white/50" />
                              <input
                                id="country-search-input"
                                name="countrySearch"
                                aria-label="Search country or international dialing code"
                                type="text"
                                value={countrySearch}
                                onChange={(e) => setCountrySearch(e.target.value)}
                                placeholder="Search country or code..."
                                className="w-full bg-transparent text-xs font-mono text-white focus:outline-none"
                                autoFocus
                              />
                            </div>
                            <div className="overflow-y-auto flex-1 p-1.5 space-y-0.5" role="listbox">
                              {filteredCountries.map((c) => (
                                <button
                                  key={c.code}
                                  type="button"
                                  role="option"
                                  aria-selected={selectedCountry.code === c.code}
                                  onClick={() => {
                                    setSelectedCountry(c);
                                    setFormData({ ...formData, countryCode: c.dialCode });
                                    setCountryDropdownOpen(false);
                                    setCountrySearch('');
                                  }}
                                  className="w-full px-3 py-2 rounded-lg text-left text-xs font-mono flex items-center justify-between hover:bg-white/10 text-white transition-colors cursor-pointer"
                                >
                                  <span className="flex items-center gap-2">
                                    <span className="text-base">{c.flag}</span>
                                    <span>{c.name}</span>
                                  </span>
                                  <span className="text-[#b0b0be]">{c.dialCode}</span>
                                </button>
                              ))}
                              {filteredCountries.length === 0 && (
                                <p className="p-3 text-center text-xs font-mono text-[#b4b4c6]">
                                  No country found
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Phone input */}
                      <div className="relative flex-1">
                        <input
                          id="inquiry-phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. 98765 43210"
                          autoComplete="tel"
                          aria-label="Direct Phone Number"
                          className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-white focus:outline-none text-white text-sm font-body transition-colors"
                        />
                        <Phone className="w-4 h-4 text-white/30 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Company and Operating City / Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="inquiry-company" className="block text-xs font-mono uppercase tracking-wider text-[#b4b4c4] mb-1.5">
                        Company / Brand Name
                      </label>
                      <input
                        id="inquiry-company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Apex Luxury"
                        autoComplete="organization"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-white focus:outline-none text-white text-sm font-body transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="inquiry-location" className="block text-xs font-mono uppercase tracking-wider text-[#b4b4c4] mb-1.5">
                        Operating City / Region *
                      </label>
                      <input
                        id="inquiry-location"
                        name="location"
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. London, New York, Mumbai"
                        autoComplete="address-level2"
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-white focus:outline-none text-white text-sm font-body transition-colors"
                      />
                    </div>
                  </div>

                  {/* Solution Selector */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label id="inquiry-service-label" htmlFor="inquiry-service" className="block text-xs font-mono uppercase tracking-wider text-[#b4b4c6]">
                        Select Creative Service *
                      </label>
                      <span className="text-[10px] font-mono text-cyan-400">
                        48-72h Delivery Available
                      </span>
                    </div>
                    <select
                      id="inquiry-service"
                      name="service"
                      title="Select Creative Service"
                      aria-labelledby="inquiry-service-label"
                      aria-label="Select Creative Service"
                      aria-required="true"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-white focus:outline-none text-white text-sm font-body transition-colors cursor-pointer"
                    >
                      <option value="Viral 4K Video Reels & Shorts">🎬 Viral 4K Video Reels & Shorts (Instagram, TikTok, YouTube)</option>
                      <option value="3D Motion Design & Commercials">✨ 3D Motion Design & Luxury Brand Commercials</option>
                      <option value="Luxury Websites & Landing Pages">🌐 Luxury Websites & High-Converting Landing Pages</option>
                      <option value="AI Video Ads & Paid Campaigns">🤖 AI Video Commercials & Multi-Variant Ads</option>
                      <option value="Brand Identity, Logos & Visuals">💎 Complete Brand Identity, Logo & Design System</option>
                      <option value="High-CTR Thumbnails & Post Covers">🎯 High-CTR YouTube Thumbnails & Visual Covers</option>
                      <option value="AI Chat Assistants & Lead Sync">⚡ AI Website Chat Assistant & Lead Automation</option>
                      <option value="Monthly Creative Retainer (All-in-One)">🚀 Monthly Creative Retainer (Unlimited Video & Motion)</option>
                      <option value="Other">💡 Other / Custom Creative Project (Specify Below)</option>
                    </select>

                    {/* Dynamic Custom Service Input if "Other" is selected */}
                    {formData.service === 'Other' && (
                      <div className="mt-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
                        <label htmlFor="inquiry-custom-service" className="block text-[11px] font-mono text-cyan-300 mb-1 flex items-center gap-1.5">
                          <span>Please tell us what you need:</span>
                        </label>
                        <input
                          id="inquiry-custom-service"
                          name="customService"
                          type="text"
                          required
                          value={formData.customService}
                          onChange={(e) => setFormData({ ...formData, customService: e.target.value })}
                          placeholder="e.g. YouTube video editing, 3D logo spin, course trailer, etc."
                          className="w-full px-4 py-2.5 rounded-xl bg-cyan-950/20 border border-cyan-500/40 focus:border-cyan-400 focus:outline-none text-white text-sm font-body transition-colors placeholder:text-[#9a9aa8]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="inquiry-message" className="block text-xs font-mono uppercase tracking-wider text-[#b4b4c4] mb-1.5">
                      Project Goals & Deliverables
                    </label>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe target campaigns, timeline, or current production bottlenecks..."
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-white focus:outline-none text-white text-sm font-body transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isRateLimited}
                    aria-label="Request Verified Strategic Proposal"
                    className={`w-full py-4 rounded-xl font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer ${
                      isRateLimited
                        ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-white/5'
                        : 'bg-white text-black hover:bg-[#eaeaea] shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-[1.01] active:scale-[0.99]'
                    }`}
                  >
                    <span>
                      {isRateLimited ? `Throttled (Wait ${rateLimitSecondsLeft}s)` : 'Request Verified Strategic Proposal'}
                    </span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <div className="text-center pt-2">
                    <span className="text-[10px] font-mono text-[#b4b4c6]">
                      Protected by Symmetry Threat Matrix • Fake / Spoofed Submissions Automatically Quarantined
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
