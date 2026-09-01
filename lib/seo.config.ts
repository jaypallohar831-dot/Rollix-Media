/**
 * Central SEO Configuration — Single source of truth
 * All business data, URLs, social profiles, and keywords.
 */

// ── Core Site Constants ─────────────────────────────────────────────────────
export const SITE_URL = 'https://rollixmedia.vercel.app';
export const SITE_NAME = 'Rollix Media';
export const SITE_TAGLINE = 'Premium Digital Marketing Agency';
export const SITE_DESCRIPTION =
  'Rollix Media is a premium digital marketing agency in Bhilwara, India — specializing in video editing, social media marketing, website development, SEO, graphic design, and cinematic wedding videography.';
export const SITE_LOCALE = 'en_IN';
export const SITE_LANGUAGE = 'en';

// ── Business Info (Local SEO) ───────────────────────────────────────────────
export const BUSINESS = {
  name: 'Rollix Media',
  legalName: 'Rollix Media',
  foundingDate: '2026',
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo.png`,
  image: `${SITE_URL}/og-image.jpg`,
  email: 'rollixmedia@gmail.com',
  phone: '+91-9351775546',
  phoneAlt: '+91-9024675831',
  whatsapp: 'https://wa.me/919351775546',
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, UPI, Bank Transfer',
  address: {
    streetAddress: 'Bhilwara',
    addressLocality: 'Bhilwara',
    addressRegion: 'Rajasthan',
    postalCode: '311001',
    addressCountry: 'IN',
  },
  geo: {
    latitude: 25.3478,
    longitude: 74.6313,
  },
  openingHours: 'Mo-Sa 09:00-19:00',
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
export const SOCIAL = {
  instagram: 'https://www.instagram.com/rollixmedia',
  youtube: 'https://youtube.com/@rollixmedia',
  twitter: 'https://twitter.com/rollixmedia',
  linkedin: 'https://linkedin.com/company/rollix-media',
  whatsapp: 'https://wa.me/919351775546',
  twitterHandle: '@rollixmedia',
} as const;

export const SOCIAL_LINKS = [
  SOCIAL.instagram,
  SOCIAL.youtube,
  SOCIAL.twitter,
  SOCIAL.linkedin,
];

// ── Verification Codes ──────────────────────────────────────────────────────
export const VERIFICATION = {
  google: 'google7ae04aa8f91c229b', // existing file-based verification
  bing: '', // Add your Bing Webmaster verification code here
} as const;

// ── OG Image Defaults ───────────────────────────────────────────────────────
export const OG_IMAGE = {
  url: `${SITE_URL}/og-image.jpg`,
  width: 1200,
  height: 630,
  alt: 'Rollix Media — Premium Digital Marketing Agency in Bhilwara, India',
  type: 'image/jpeg',
} as const;

// ── Primary Keywords ────────────────────────────────────────────────────────
export const PRIMARY_KEYWORDS = [
  'digital marketing agency',
  'digital marketing agency in Bhilwara',
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
  'Rollix Media',
] as const;

// ── Per-Page SEO Config ─────────────────────────────────────────────────────
export const PAGE_SEO = {
  home: {
    title: 'Rollix Media | #1 Digital Marketing Agency in Bhilwara, India',
    description:
      'Rollix Media is a premium digital marketing agency in Bhilwara, Rajasthan. Expert services in video editing, social media marketing, website development, SEO, graphic design, and cinematic wedding videography. Get 100% growth-driven results.',
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
    title: 'Our Services — Video Editing, Web Design, SEO, Social Media & More | Rollix Media',
    description:
      'Explore Rollix Media\'s full range of digital marketing services: cinematic video editing, social media marketing, website development, SEO optimization, graphic design, wedding videography, Meta Ads, and Google Ads management in Bhilwara, India.',
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
    title: 'Portfolio — Our Best Work in Video Editing, Web Design & Marketing | Rollix Media',
    description:
      'Browse Rollix Media\'s portfolio of premium video edits, social media campaigns, website designs, and creative projects. See real results from our digital marketing agency in Bhilwara, India.',
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
    title: 'About Rollix Media — Our Story, Mission & Team | Digital Marketing Agency',
    description:
      'Learn about Rollix Media — a premium digital marketing agency founded in 2026 in Bhilwara, Rajasthan. We combine cinematic artistry with data-driven strategy to deliver exponential growth for brands across India.',
    keywords: [
      'about Rollix Media',
      'digital marketing agency Bhilwara',
      'creative agency India',
      'brand strategy agency',
      'Rollix Media team',
    ],
  },
  contact: {
    title: 'Contact Rollix Media — Get a Free Quote for Digital Marketing Services',
    description:
      'Get in touch with Rollix Media for a free consultation. We provide video editing, social media marketing, website development, SEO, and graphic design services in Bhilwara, Rajasthan, India. Call +91-9351775546.',
    keywords: [
      'contact Rollix Media',
      'digital marketing quote',
      'free consultation digital agency',
      'Bhilwara marketing agency contact',
      'hire digital marketing agency',
    ],
  },
  privacyPolicy: {
    title: 'Privacy Policy | Rollix Media',
    description:
      'Read Rollix Media\'s privacy policy — how we collect, use, and protect your personal data when you use our digital marketing services and website.',
  },
  terms: {
    title: 'Terms of Service | Rollix Media',
    description:
      'Review the terms and conditions for using Rollix Media\'s digital marketing services, including payment terms, intellectual property, and cancellation policy.',
  },
  toolsCompress: {
    title: 'Free Online File Compressor — Compress Images, PDFs, Videos & Audio Privately | Rollix Media',
    description:
      'Compress JPG, PNG, WebP images, PDF documents, MP4 videos, and MP3 audio online for free. 100% private, instant client-side file compression with zero server uploads. Fast & easy tool for businesses, schools & creators.',
    keywords: [
      'free image compressor online',
      'compress PDF free online',
      'compress video online free',
      'compress audio mp3 online',
      'reduce file size to 1MB 2MB 5MB',
      'compress JPG PNG WebP MP4',
      'free online file shrinker',
      'batch file compressor',
      'privacy file compressor',
      'Rollix Media free tools',
    ],
  },
} as const;

// ── Service-Specific SEO ────────────────────────────────────────────────────
export const SERVICE_SEO: Record<string, { title: string; description: string; keywords: string[] }> = {
  'wedding-shooting': {
    title: 'Cinematic Wedding Videography & Photography in Bhilwara | Rollix Media',
    description:
      'Premium cinematic wedding videography and photography services in Bhilwara, Rajasthan. Emotional storytelling, drone coverage, and luxury wedding films by Rollix Media. Starting ₹1,50,000.',
    keywords: ['wedding videography Bhilwara', 'cinematic wedding film', 'wedding photographer Rajasthan', 'luxury wedding video India', 'drone wedding coverage'],
  },
  videography: {
    title: 'Professional Videography & Commercial Video Production | Rollix Media',
    description:
      'Professional videography services including commercials, brand films, and event coverage in Bhilwara, India. Cinema-grade equipment and storytelling by Rollix Media.',
    keywords: ['videography services', 'commercial video production', 'brand film production', 'event videography Bhilwara', 'corporate video India'],
  },
  'video-editing': {
    title: 'Professional Video Editing Services — Color Grading, Motion Graphics | Rollix Media',
    description:
      'Expert video editing services including color grading, sound design, motion graphics, and VFX. Fast turnaround with Premiere Pro, After Effects, and DaVinci Resolve. Starting ₹15,000.',
    keywords: ['video editing services', 'professional video editor', 'color grading', 'motion graphics', 'video post production India'],
  },
  'social-media': {
    title: 'Social Media Marketing & Management in Bhilwara | Rollix Media',
    description:
      'Strategic social media marketing services — viral reels, content creation, growth strategy, and community management for Instagram, Facebook, and LinkedIn. Retainers from ₹25,000/month.',
    keywords: ['social media marketing', 'Instagram marketing', 'social media agency Bhilwara', 'content creation', 'social media management India'],
  },
  'web-design': {
    title: 'Professional Website Design & Development — Next.js, React | Rollix Media',
    description:
      'Custom website design and development using Next.js, React, and modern technologies. Fast-loading, SEO-optimized, responsive websites for businesses in India. Starting ₹15,000.',
    keywords: ['website design', 'web development', 'Next.js developer', 'React website', 'responsive web design India', 'website development Bhilwara'],
  },
  'graphic-design': {
    title: 'Graphic Design — Brand Identity, Logos, Marketing Materials | Rollix Media',
    description:
      'Premium graphic design services including brand identity, logo design, social media creatives, marketing materials, and packaging design. Starting ₹10,000.',
    keywords: ['graphic design services', 'brand identity design', 'logo design', 'social media creatives', 'packaging design India'],
  },
  'seo-dominance': {
    title: 'SEO Services — Technical SEO, Keyword Strategy, Link Building | Rollix Media',
    description:
      'Data-driven SEO services to rank your business on Google. Technical audits, keyword strategy, on-page optimization, and link building. Monthly retainers from ₹20,000.',
    keywords: ['SEO services', 'search engine optimization', 'technical SEO', 'keyword research', 'link building', 'SEO agency India', 'Google ranking'],
  },
  'digital-marketing': {
    title: 'Performance Marketing — Meta Ads, Google Ads, PPC Campaigns | Rollix Media',
    description:
      'High-ROI performance marketing campaigns on Meta (Facebook/Instagram) and Google Ads. Strategic ad funnels, A/B testing, and conversion optimization. Management from ₹15,000/month.',
    keywords: ['Meta Ads agency', 'Google Ads management', 'performance marketing', 'PPC campaigns', 'Facebook ads', 'Instagram ads India'],
  },
};

// ── FAQ Data (for schema) ───────────────────────────────────────────────────
export const HOMEPAGE_FAQ = [
  {
    question: 'What services does Rollix Media offer?',
    answer:
      'Rollix Media offers comprehensive digital marketing services including video editing, social media marketing, website design & development, SEO optimization, graphic design, cinematic wedding videography, Meta Ads (Facebook/Instagram), and Google Ads management.',
  },
  {
    question: 'Where is Rollix Media located?',
    answer:
      'Rollix Media is based in Bhilwara, Rajasthan, India (PIN: 311001). We serve clients across Bhilwara, Rajasthan, and all of India, with select international projects.',
  },
  {
    question: 'How much do digital marketing services cost?',
    answer:
      'Our pricing varies by service: Video Editing starts at ₹15,000, Web Design from ₹15,000, Social Media Management from ₹25,000/month, SEO from ₹20,000/month, and Wedding Videography from ₹1,50,000. Contact us for a customized quote.',
  },
  {
    question: 'How can I contact Rollix Media?',
    answer:
      'You can reach us via phone at +91-9351775546, email at rollixmedia@gmail.com, WhatsApp, or through the contact form on our website. Our office hours are Monday–Saturday, 9 AM to 7 PM IST.',
  },
  {
    question: 'Does Rollix Media offer wedding videography?',
    answer:
      'Yes! We specialize in cinematic Indian wedding videography with drone coverage, emotional storytelling, and luxury wedding films. Our packages start at ₹1,50,000 and include teasers, full feature films, and candid photography.',
  },
  {
    question: 'Is Rollix Media the best digital marketing agency in Bhilwara?',
    answer:
      'Rollix Media is rated 4.9/5 stars by 47+ clients and is the leading digital marketing agency in Bhilwara, Rajasthan. We provide data-driven marketing, cinematic video production, and custom web development with measurable ROI for businesses across India.',
  },
  {
    question: 'Does Rollix Media offer free tools?',
    answer:
      'Yes! Rollix Media offers a free online file compressor tool that compresses images (JPG, PNG, WebP), videos (MP4), PDFs, and audio files (MP3) directly in your browser with 100% privacy — no server uploads required.',
  },
  {
    question: 'How long does it take to build a website with Rollix Media?',
    answer:
      'A standard business website takes 2-4 weeks from concept to launch. Complex e-commerce or custom web applications may take 4-8 weeks. We use modern technologies like Next.js, React, and Tailwind CSS for fast, SEO-optimized websites.',
  },
  {
    question: 'Does Rollix Media provide SEO services?',
    answer:
      'Yes! We provide comprehensive SEO services including technical SEO audits, on-page optimization, keyword research & strategy, content optimization, link building, local SEO for Google Maps, and monthly performance reporting. Monthly retainers start at ₹20,000.',
  },
  {
    question: 'What is the best digital marketing company in Rajasthan?',
    answer:
      'Rollix Media is recognized as one of the top digital marketing companies in Rajasthan, offering full-service digital marketing, cinematic video production, and web development from Bhilwara. Our 4.9-star rating and 100+ successful projects make us a trusted choice for businesses across the state.',
  },
  {
    question: 'Can Rollix Media help grow my business on Instagram?',
    answer:
      'Absolutely! Our social media marketing team creates viral reels, strategic content calendars, growth campaigns, and paid ad funnels for Instagram, Facebook, and LinkedIn. We have helped clients grow from 0 to 10K+ followers with organic and paid strategies.',
  },
  {
    question: 'Does Rollix Media offer Google Ads and Meta Ads management?',
    answer:
      'Yes! We manage high-ROI performance marketing campaigns on Google Ads and Meta (Facebook/Instagram) Ads. Our services include strategic ad funnels, A/B testing, conversion optimization, and detailed monthly reporting. Management fees start at ₹15,000/month plus ad spend.',
  },
];

// ── Helper: Generate full URL ───────────────────────────────────────────────
export function getCanonicalUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}
