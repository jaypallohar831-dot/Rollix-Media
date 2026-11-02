/**
 * Central SEO Configuration — Single source of truth
 * Rebranded for Ampledia (formerly Rollix Media)
 */
import { BRAND, BRAND_SOCIAL_LINKS } from './brand';

// ── Core Site Constants ─────────────────────────────────────────────────────
export const SITE_URL = BRAND.siteUrl;
export const SITE_NAME = BRAND.name;
export const SITE_TAGLINE = BRAND.tagline;
export const SITE_DESCRIPTION = BRAND.description;
export const SITE_LOCALE = 'en_IN';
export const SITE_LANGUAGE = 'en';

// ── Business Info (Local SEO) ───────────────────────────────────────────────
export const BUSINESS = {
  name: BRAND.name,
  legalName: BRAND.name,
  formerName: BRAND.formerName,
  foundingDate: BRAND.foundingYear,
  description: BRAND.description,
  url: BRAND.siteUrl,
  logo: `${BRAND.siteUrl}/assets/logo.png`,
  image: `${BRAND.siteUrl}/og-image.jpg`,
  email: BRAND.email,
  phone: BRAND.phone,
  phoneAlt: BRAND.phoneAlt,
  whatsapp: BRAND.whatsapp,
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, UPI, Bank Transfer',
  founders: BRAND.founders,
  address: BRAND.address,
  geo: BRAND.geo,
  openingHours: BRAND.openingHours,
  openingHoursSpecification: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  areaServed: [
    { type: 'City', name: 'Bhilwara' },
    { type: 'State', name: 'Rajasthan' },
    { type: 'Country', name: 'India' },
  ],
} as const;

// ── Social Profiles ─────────────────────────────────────────────────────────
export const SOCIAL = BRAND.social;
export const SOCIAL_LINKS = BRAND_SOCIAL_LINKS;

// ── Verification Codes ──────────────────────────────────────────────────────
export const VERIFICATION = {
  google: 'google7ae04aa8f91c229b',
  bing: '',
} as const;

// ── OG Image Defaults ───────────────────────────────────────────────────────
export const OG_IMAGE = {
  url: `${BRAND.siteUrl}/og-image.jpg`,
  width: 1200,
  height: 630,
  alt: 'Ampledia — Digital | Creative | Growth Agency in Bhilwara, India',
  type: 'image/jpeg',
} as const;

// ── Primary Keywords ────────────────────────────────────────────────────────
export const PRIMARY_KEYWORDS = [
  // English core
  'digital marketing agency',
  'digital marketing agency in Bhilwara',
  'growth marketing agency',
  'SEO agency',
  'web design company',
  'website development',
  'video editing services',
  'wedding videography',
  'Meta ads agency',
  'Google Ads',
  'graphic design',
  'social media marketing',
  'branding agency',
  'digital growth',
  'performance marketing',
  'Ampledia',
  'Ampledia Bhilwara',
  // Long-tail keywords
  'best digital marketing agency near me',
  'affordable website design in Rajasthan',
  'digital marketing company in Rajasthan 2026',
  'social media marketing agency Bhilwara',
  'video editing company near me',
  'top SEO company Bhilwara Rajasthan',
  // Hindi-English mix
  'digital marketing agency Bhilwara Rajasthan',
  'website banane ki company',
  'video editing services India',
  'social media marketing Rajasthan',
] as const;

// ── Per-Page SEO Config ─────────────────────────────────────────────────────
export const PAGE_SEO = {
  home: {
    title: 'Ampledia | #1 Digital Marketing & Creative Agency in Bhilwara, India',
    description:
      'Ampledia is a premium digital agency in Bhilwara, Rajasthan. Expert services in video production, social media marketing, website development, SEO, graphic design, and Meta & Google ads. Scale your brand with measurable ROI.',
    keywords: [
      'digital marketing agency Bhilwara',
      'best digital marketing company Rajasthan',
      'video editing services India',
      'social media marketing Bhilwara',
      'website development agency',
      'SEO services Bhilwara',
      'wedding videography Rajasthan',
      ...PRIMARY_KEYWORDS,
    ],
  },
  services: {
    title: 'Our Services — Video Production, Web Design, SEO & Performance Marketing | Ampledia',
    description:
      'Explore Ampledia\'s full range of services: cinematic video editing, social media marketing, custom website development, SEO optimization, graphic design, Meta Ads, and Google Ads management in Bhilwara, India.',
    keywords: [
      'digital marketing services',
      'video editing services',
      'social media management',
      'website development services',
      'SEO services India',
      'graphic design agency',
      'wedding videography services',
      'Google Ads management',
      'Meta Ads agency',
    ],
  },
  portfolio: {
    title: 'Portfolio — Our Best Work in Video Production, Web Design & Growth | Ampledia',
    description:
      'Browse Ampledia\'s portfolio of high-impact video edits, social media campaigns, modern web designs, and creative growth projects. See real client results in Bhilwara, India.',
    keywords: [
      'digital marketing portfolio',
      'video editing portfolio',
      'web design portfolio',
      'social media campaigns',
      'creative agency work',
      'Bhilwara digital agency portfolio',
    ],
  },
  about: {
    title: 'About Ampledia — Our Story, Mission & Leadership | Digital Agency',
    description:
      'Learn about Ampledia — a premier digital agency co-founded by Rishabh Singh and Jaypal in Bhilwara, Rajasthan. We blend bold creativity with data-driven strategy to deliver exponential growth for modern brands.',
    keywords: [
      'about Ampledia',
      'digital marketing agency Bhilwara',
      'creative agency India',
      'brand strategy agency',
      'Ampledia team',
    ],
  },
  contact: {
    title: 'Contact Ampledia — Get a Free Strategy Consultation',
    description:
      'Get in touch with Ampledia for a free consultation. We provide video editing, social media marketing, website development, SEO, and paid performance advertising in Bhilwara, Rajasthan, India. Call +91-9024675831.',
    keywords: [
      'contact Ampledia',
      'digital marketing quote',
      'free consultation digital agency',
      'Bhilwara marketing agency contact',
      'hire digital marketing agency',
    ],
  },
  privacyPolicy: {
    title: 'Privacy Policy | Ampledia',
    description:
      'Read Ampledia\'s privacy policy — how we collect, use, and protect your personal data when you use our digital marketing services and website.',
  },
  terms: {
    title: 'Terms of Service | Ampledia',
    description:
      'Review the terms and conditions for using Ampledia\'s digital marketing services, including payment terms, intellectual property, and cancellation policy.',
  },
  toolsCompress: {
    title: 'Free Online File Compressor — Compress Images, PDFs, Videos & Audio Privately | Ampledia',
    description:
      'Compress JPG, PNG, WebP images, PDF documents, MP4 videos, and MP3 audio online for free. 100% private, instant client-side file compression with zero server uploads.',
    keywords: [
      'free image compressor online',
      'compress PDF free online',
      'compress video online free',
      'compress audio mp3 online',
      'Ampledia free tools',
    ],
  },
  caseStudies: {
    title: 'Case Studies — Real Digital Marketing Results & ROI Proof | Ampledia',
    description:
      'Explore real digital marketing case studies by Ampledia. See how we delivered 129K+ views, 40-60 qualified student leads, and measurable growth for Vision Classes Bhilwara.',
    keywords: [
      'digital marketing case study',
      'Instagram ad campaign results',
      'Ampledia results',
      'social media marketing success story',
      'ad campaign Bhilwara',
    ],
  },
} as const;

// ── Service-Specific SEO ────────────────────────────────────────────────────
export const SERVICE_SEO: Record<string, { title: string; description: string; keywords: string[] }> = {
  'wedding-shooting': {
    title: 'Cinematic Wedding Videography & Photography in Bhilwara | Ampledia',
    description:
      'Premium cinematic wedding videography and photography services in Bhilwara, Rajasthan. Emotional storytelling, drone coverage, and luxury wedding films by Ampledia. Starting ₹1,50,000.',
    keywords: ['wedding videography Bhilwara', 'cinematic wedding film', 'wedding photographer Rajasthan', 'luxury wedding video India', 'drone wedding coverage'],
  },
  videography: {
    title: 'Professional Videography & Commercial Video Production | Ampledia',
    description:
      'Professional videography services including commercials, brand films, and event coverage in Bhilwara, India. Cinema-grade equipment and storytelling by Ampledia.',
    keywords: ['videography services', 'commercial video production', 'brand film production', 'event videography Bhilwara', 'corporate video India'],
  },
  'video-editing': {
    title: 'Professional Video Editing Services — Color Grading, Motion Graphics | Ampledia',
    description:
      'Expert video editing services including color grading, sound design, motion graphics, and VFX. Fast turnaround with Premiere Pro, After Effects, and DaVinci Resolve. Starting ₹15,000.',
    keywords: ['video editing services', 'professional video editor', 'color grading', 'motion graphics', 'video post production India'],
  },
  'social-media': {
    title: 'Social Media Marketing & Management in Bhilwara | Ampledia',
    description:
      'Strategic social media marketing services — viral reels, content creation, growth strategy, and community management for Instagram, Facebook, and LinkedIn. Retainers from ₹25,000/month.',
    keywords: ['social media marketing', 'Instagram marketing', 'social media agency Bhilwara', 'content creation', 'social media management India'],
  },
  'web-design': {
    title: 'Professional Website Design & Development — Next.js, React | Ampledia',
    description:
      'Custom website design and development using Next.js, React, and modern technologies. Fast-loading, SEO-optimized, responsive websites for businesses in India. Starting ₹15,000.',
    keywords: ['website design', 'web development', 'Next.js developer', 'React website', 'responsive web design India', 'website development Bhilwara'],
  },
  'graphic-design': {
    title: 'Graphic Design — Brand Identity, Logos, Marketing Materials | Ampledia',
    description:
      'Premium graphic design services including brand identity, logo design, social media creatives, marketing materials, and packaging design. Starting ₹10,000.',
    keywords: ['graphic design services', 'brand identity design', 'logo design', 'social media creatives', 'packaging design India'],
  },
  'seo-dominance': {
    title: 'SEO Services — Technical SEO, Keyword Strategy, Link Building | Ampledia',
    description:
      'Data-driven SEO services to rank your business on Google. Technical audits, keyword strategy, on-page optimization, and link building. Monthly retainers from ₹20,000.',
    keywords: ['SEO services', 'search engine optimization', 'technical SEO', 'keyword research', 'link building', 'SEO agency India', 'Google ranking'],
  },
  'digital-marketing': {
    title: 'Performance Marketing — Meta Ads, Google Ads, PPC Campaigns | Ampledia',
    description:
      'High-ROI performance marketing campaigns on Meta (Facebook/Instagram) and Google Ads. Strategic ad funnels, A/B testing, and conversion optimization. Management from ₹15,000/month.',
    keywords: ['Meta Ads agency', 'Google Ads management', 'performance marketing', 'PPC campaigns', 'Facebook ads', 'Instagram ads India'],
  },
};

// ── FAQ Data (for schema & UI) ─────────────────────────────────────────────
export const HOMEPAGE_FAQ = [
  {
    question: 'How quickly can we expect measurable results from Ampledia?',
    answer:
      'Campaign setup and creative production typically launch within 5–7 days. For Meta Ads and local growth funnels, qualified inquiries usually begin within the first 48–72 hours of campaign activation, as demonstrated by our Vision Classes Bhilwara case study (40–60 qualified leads in 30 days).',
  },
  {
    question: 'Why choose Ampledia over traditional agencies or freelancers?',
    answer:
      'Traditional agencies outsource video production and charge bloated retainers without direct accountability. Freelancers lack full-stack execution. Ampledia integrates cinema-grade 4K filming, dynamic retention editing, performance Meta ad funnels, and modern web development under one roof with direct founder access (Rishabh & Jaypal).',
  },
  {
    question: 'Are there any long-term lock-in contracts?',
    answer:
      'No. We believe results drive retention. Our performance ad management and social media growth retainers operate on flexible monthly cycles so you stay because you are seeing profitable pipeline growth, not because you are bound by paperwork.',
  },
  {
    question: 'What ad budget is required to start testing profitably?',
    answer:
      'You do not need massive budgets to validate. In our Vision Classes Bhilwara campaign, we generated 40–60 qualified student leads and 129K+ views from a modest ₹6,000 ad budget (~₹100–150 per lead). We tailor campaign structure to maximize ROI at your current scale.',
  },
  {
    question: 'Does Ampledia work with clients outside Bhilwara?',
    answer:
      'Yes! While our headquarters and studio are located in Bhilwara, Rajasthan, we manage digital marketing, video editing, Meta ads, and Next.js web development for clients across Rajasthan, pan-India, and select international brands remotely.',
  },
  {
    question: 'How do we get started with Ampledia?',
    answer:
      'Simply click "Let\'s Build Together" or message us on WhatsApp at +91-9024675831. We will schedule a direct 15-minute discovery audit of your brand, identify conversion bottlenecks, and provide a clear execution blueprint tailored to your goals.',
  },
  {
    question: 'What is the best digital marketing company in Rajasthan?',
    answer:
      'Ampledia is recognized as one of the top digital marketing companies in Rajasthan, offering full-service digital marketing, cinematic video production, and web development from Bhilwara. Our 4.9-star rating and 100+ successful projects make us a trusted choice for businesses across the state.',
  },
  {
    question: 'Can Ampledia help grow my business on Instagram?',
    answer:
      'Absolutely! Our social media marketing team creates viral reels, strategic content calendars, growth campaigns, and paid ad funnels for Instagram, Facebook, and LinkedIn. We have helped clients grow from 0 to 10K+ followers with organic and paid strategies.',
  },
  {
    question: 'Does Ampledia offer Google Ads and Meta Ads management?',
    answer:
      'Yes! We manage high-ROI performance marketing campaigns on Google Ads and Meta (Facebook/Instagram) Ads. Our services include strategic ad funnels, A/B testing, conversion optimization, and detailed monthly reporting. Management fees start at ₹15,000/month plus ad spend.',
  },
];

// ── Helper: Generate full URL ───────────────────────────────────────────────
export function getCanonicalUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}
