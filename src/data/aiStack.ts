// ─────────────────────────────────────────────
// SYMMETRY — Curated AI Production Stack & Partner Arsenal
// ─────────────────────────────────────────────

export interface AiTool {
  id: string;
  name: string;
  category: 'All' | 'Audio & Voice' | 'AI Video & Motion' | 'Concept & Visuals' | '3D & Spatial' | 'Compute & Code';
  tagline: string;
  description: string;
  badge?: string;
  dealBadge?: string;
  affiliateUrl: string;
  featured?: boolean;
  metrics: string;
  keyFeatures: string[];
}

export const AI_STACK_CATEGORIES = [
  'All',
  'Audio & Voice',
  'AI Video & Motion',
  'Concept & Visuals',
  '3D & Spatial',
  'Compute & Code',
] as const;

export const AI_TOOLS: AiTool[] = [
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    category: 'Audio & Voice',
    tagline: 'Human-Parity Neural Voice Synthesis & Procedural SFX',
    description:
      'Our primary production engine for multilingual voiceovers, hyper-realistic emotional acting, and studio-grade procedural sound effects in all commercial videos.',
    badge: 'Official Studio Partner',
    dealBadge: 'Free Tier + Bonus Starter Credits',
    affiliateUrl: 'https://try.elevenlabs.io/wvovc6eu0tnv',
    featured: true,
    metrics: 'Powers 100% of our voice design pipelines',
    keyFeatures: [
      'Zero-Shot Voice Cloning',
      'Dynamic Emotional Intonation',
      'Procedural Cinematic SFX',
      '32+ Languages Parity',
    ],
  },
  {
    id: 'runway',
    name: 'Runway Gen-3 Alpha',
    category: 'AI Video & Motion',
    tagline: 'High-Fidelity Temporal World & Video Diffusion',
    description:
      'Pioneering diffusion models enabling cinematic camera choreography, physics-consistent motion brush control, and ultra-high-definition video rendering.',
    badge: 'Core Video Pipeline',
    dealBadge: 'Free Generation Credits',
    affiliateUrl: 'https://runwayml.com',
    featured: true,
    metrics: 'Over 10M frames rendered across client spots',
    keyFeatures: [
      'Precise Camera Controls (Pan, Tilt, Zoom)',
      'Multi-Area Motion Brush',
      'High-Motion Coherence',
      'Sub-Second Temporal Stability',
    ],
  },
  {
    id: 'topaz',
    name: 'Topaz Video AI',
    category: 'AI Video & Motion',
    tagline: 'Neural 4K/8K Upscaling & Cinema Frame Interpolation',
    description:
      'Professional post-production neural enhancement that upgrades AI outputs to crisp 4K/8K resolution with buttery smooth 60fps optical flow blending.',
    badge: 'Cinema Mastering',
    dealBadge: '30-Day Money Back Guarantee',
    affiliateUrl: 'https://www.topazlabs.com/topaz-video-ai',
    metrics: 'Standard for all 4K commercial exports',
    keyFeatures: [
      'Iris & Proteus Neural Upscaling',
      'Apollo Slow-Motion & 60fps',
      'Motion Deblur & Detail Recovery',
      'Zero Cloud Compression Artifacts',
    ],
  },
  {
    id: 'midjourney',
    name: 'Midjourney v6',
    category: 'Concept & Visuals',
    tagline: 'Art Direction, Mood Boards & Photographic Keyframes',
    description:
      'The foundational creative catalyst for establishing cinematic lighting, textural depth, and art-directed mood boards before video synthesis begins.',
    badge: 'Art Direction Standard',
    affiliateUrl: 'https://www.midjourney.com',
    metrics: 'Benchmark for lighting & scene composition',
    keyFeatures: [
      'Photorealistic Volumetric Lighting',
      'Style Reference (--sref) Matching',
      'Consistent Character Seeds',
      'High-Dynamic-Range Texturing',
    ],
  },
  {
    id: 'spline',
    name: 'Spline 3D',
    category: '3D & Spatial',
    tagline: 'Real-Time Interactive 3D & WebGL Experiences',
    description:
      'Allows our spatial designers to sculpt, animate, and deploy high-performance 3D models and interactive physics directly into responsive web layouts.',
    badge: 'Interactive Web3D',
    dealBadge: 'Free Studio Tier Available',
    affiliateUrl: 'https://spline.design',
    metrics: 'GPU-accelerated 60fps WebGL rendering',
    keyFeatures: [
      'Interactive Collision Physics',
      'Direct React & Three.js Export',
      'Real-Time Dynamic Lighting',
      'Responsive Mobile Gestures',
    ],
  },
  {
    id: 'vercel',
    name: 'Vercel Edge Platform',
    category: 'Compute & Code',
    tagline: 'Sub-50ms Global Edge Infrastructure & Serverless Streaming',
    description:
      'The cloud foundation powering Symmetry. Distributes our rich 3D web media and serverless AI endpoints across 100+ global edge points of presence.',
    badge: 'Cloud Backbone',
    dealBadge: 'Deploy Free Hobby Project',
    affiliateUrl: 'https://vercel.com',
    metrics: 'Global Sub-50ms Time to First Byte',
    keyFeatures: [
      'Global Edge Network Distribution',
      'Automated Git CI/CD Pipelines',
      'Ultra-Fast Asset Optimization',
      'Enterprise DDoS & SSL Security',
    ],
  },
  {
    id: 'claude',
    name: 'Claude 3.5 Sonnet',
    category: 'Compute & Code',
    tagline: 'Creative Screenwriting & Algorithmic Design Architecture',
    description:
      'The intelligence engine used to write narrative scripts, structure commercial hooks, and architect performant frontend code.',
    badge: 'Studio Intelligence',
    affiliateUrl: 'https://claude.ai',
    metrics: 'Powers narrative structure and logic',
    keyFeatures: [
      '200,000 Token Narrative Depth',
      'Nuanced Dialogue & Voice Tone',
      'Clean Code & Shader Synthesis',
      'Rapid Script Iteration',
    ],
  },
];
