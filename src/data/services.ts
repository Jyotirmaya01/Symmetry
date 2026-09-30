// ─────────────────────────────────────────────
// SYMMETRY — Service Data & Solutions Matrix
// Client-First, Clear, Jargon-Free Creative Services
// ─────────────────────────────────────────────

export interface ServiceItem {
  id: string;
  title: string;
  category: 'Video & Reels' | '3D & Commercials' | 'Web & Landing Pages' | 'Branding & Automation';
  badge: string;
  shortDesc: string;
  fullDesc: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  icon: string;
  featured?: boolean;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'viral-video-reels',
    title: 'Viral 4K Video Reels & Shorts',
    category: 'Video & Reels',
    badge: 'Most Popular',
    shortDesc: 'Scroll-stopping vertical videos tailored for Instagram Reels, YouTube Shorts, and TikTok to grow your audience fast.',
    fullDesc: 'We turn your raw footage, ideas, or products into high-energy, cinematic short-form videos with custom sound effects, dynamic animated captions, and psychological hooks that keep viewers watching until the last second.',
    metric: '48-72 Hours',
    metricLabel: 'Project Delivery Window',
    tags: [
      '4K 9:16 Vertical Video',
      'Kinetic Animated Subtitles',
      'Custom Sound Design & Music',
      'Hook Retention Editing',
    ],
    icon: 'Video',
    featured: true,
  },
  {
    id: '3d-motion-commercials',
    title: '3D Motion Design & Commercials',
    category: '3D & Commercials',
    badge: 'Luxury Caliber',
    shortDesc: 'Stunning 3D product animations, liquid chrome visual effects, and cinema-grade commercial films that build prestige.',
    fullDesc: 'Elevate your brand with photorealistic 3D visuals that look like a multi-million-dollar tech launch. We model, light, and animate your product or logo in ultra-detailed 3D space with cinematic camera moves and lighting.',
    metric: 'Cinema 4K',
    metricLabel: 'ProRes 4444 Master Quality',
    tags: [
      'Photorealistic 3D Modeling',
      'Luxury Lighting & Textures',
      'Commercial Broadcast Licensing',
      '16:9 & 9:16 Multi-Format Exports',
    ],
    icon: 'Diamond',
    featured: true,
  },
  {
    id: 'luxury-website-development',
    title: 'Luxury Websites & Landing Pages',
    category: 'Web & Landing Pages',
    badge: 'High Conversion',
    shortDesc: 'Modern, ultra-fast websites with silky smooth scroll animations that turn visitors into high-paying clients.',
    fullDesc: 'We design and code bespoke web applications that load in milliseconds, look breathtaking on mobile and desktop, and feature interactive lead forms that sync inquiries directly into your spreadsheet and CRM.',
    metric: '99/100',
    metricLabel: 'Google PageSpeed Score',
    tags: [
      'Bespoke Mobile-First Design',
      'Smooth Kinetic Scroll Effects',
      'Lead Capture & Spreadsheet Sync',
      'Built-In SEO & Zero Lag',
    ],
    icon: 'Code2',
    featured: true,
  },
  {
    id: 'ai-video-ads',
    title: 'AI Video Ads & Paid Campaigns',
    category: 'Video & Reels',
    badge: 'ROI Focused',
    shortDesc: 'Eye-catching video ad variations created with frontier AI models to lower your ad costs and boost sales.',
    fullDesc: 'We test multiple creative hooks, voiceovers, and visual styles to find the winning ad that converts best for your Meta, TikTok, or Google Ads campaigns—without the expense of massive film production crews.',
    metric: 'A/B Testing',
    metricLabel: 'Multi-Variant Ad Creatives',
    tags: [
      'Multiple Hook Variations',
      'Platform Ready (16:9, 9:16, 1:1)',
      'Sales Copy & Call-to-Actions',
      'Direct-Response Optimized',
    ],
    icon: 'Activity',
    featured: true,
  },
  {
    id: 'brand-identity-systems',
    title: 'Brand Identity, Logos & Visuals',
    category: 'Branding & Automation',
    badge: 'Complete Suite',
    shortDesc: 'Distinctive, memorable logos, typography, and color systems that give your business instant authority.',
    fullDesc: 'From iconic 3D logo marks to full social media design templates and brand guidelines, we build a cohesive visual universe that makes your company stand out from competitors in any market.',
    metric: '360° Identity',
    metricLabel: 'Full Brand Architecture',
    tags: [
      'Vector & 3D Animated Logo',
      'Brand Color Palette & Fonts',
      'Social Media Template Pack',
      'Complete Brand Style Guide',
    ],
    icon: 'Palette',
  },
  {
    id: 'high-ctr-thumbnails',
    title: 'High-CTR Thumbnails & Post Covers',
    category: 'Video & Reels',
    badge: 'Higher Views',
    shortDesc: 'Click-worthy YouTube thumbnails and Instagram covers engineered to get your videos clicked and watched.',
    fullDesc: 'Great videos fail if nobody clicks. We design high-contrast visual covers using color theory, expressive typography, and clear focal points that maximize your click-through rate across YouTube, Instagram, and LinkedIn.',
    metric: '+45% CTR',
    metricLabel: 'Average Click-Through Boost',
    tags: [
      'High-Resolution YouTube Covers',
      'Instagram Grid Covers',
      'A/B Testing Thumbnail Sets',
      'Layered Source Files Included',
    ],
    icon: 'Image',
  },
  {
    id: 'ai-lead-automation',
    title: 'AI Chat Assistants & Lead Sync',
    category: 'Branding & Automation',
    badge: 'Zero Monthly Fee',
    shortDesc: 'Smart website bots (like AJ) that answer customer questions 24/7 and auto-log leads into your spreadsheet.',
    fullDesc: 'Never miss a potential client again. We build and integrate custom AI assistants trained on your business that qualify leads, answer FAQs, and book meetings directly into your Google Sheets and Calendly automatically.',
    metric: '24/7 Live',
    metricLabel: 'Always-On Lead Capture',
    tags: [
      'Autonomous Website Assistant',
      'Google Sheets Real-Time Sync',
      '1-Click Calendly Integration',
      'Zero Subscription / Free Tier',
    ],
    icon: 'Workflow',
    featured: true,
  },
  {
    id: 'custom-creative-request',
    title: 'Other / Custom Creative Projects',
    category: '3D & Commercials',
    badge: '100% Bespoke',
    shortDesc: 'Have a unique vision, podcast animation, presentation deck, or specific requirement? We will build it for you.',
    fullDesc: 'If your project does not fit standard boxes, the Symmetry team will work directly with you to design a tailored production plan, timeline, and scope that matches your exact goals and budget.',
    metric: 'Custom Scope',
    metricLabel: 'Direct Symmetry Team Service',
    tags: [
      'Direct Symmetry Team Collaboration',
      'Flexible Milestones & Formats',
      'All Raw Project Files Provided',
      'Direct WhatsApp & Priority Support',
    ],
    icon: 'TrendingUp',
    featured: true,
  },
];
