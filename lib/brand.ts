/**
 * Ampledia Brand Constants — Single Source of Truth
 * 
 * Rebrand from Rollix Media -> Ampledia.
 * Governs all site identity, metadata, schemas, and contact info.
 */

export const BRAND = {
  name: 'Ampledia',
  shortName: 'Ampledia',
  formerName: 'Rollix Media',
  tagline: 'Digital | Creative | Growth',
  description:
    'Ampledia is a premium digital agency in Bhilwara, Rajasthan — specializing in strategic performance marketing, high-retention video production, custom web development, SEO, and brand growth.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://ampledia.in',
  email: 'rollixmedia@gmail.com', // Keep current email as instructed (to be changed later)
  phone: '+91-9024675831',         // Keep current phone as instructed
  phoneAlt: '+91-9024675831',
  whatsapp: 'https://wa.me/919024675831',
  foundingYear: '2026',
  founders: [
    { name: 'Rishabh Singh', role: 'Co-Founder' },
    { name: 'Jaypal', role: 'Co-Founder' },
  ],
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
  social: {
    instagram: 'https://www.instagram.com/ampledia',
    youtube: 'https://youtube.com/@ampledia',
    twitter: 'https://twitter.com/ampledia',
    linkedin: 'https://linkedin.com/company/ampledia',
    whatsapp: 'https://wa.me/919024675831',
    twitterHandle: '@ampledia',
  },
} as const;

export const BRAND_SOCIAL_LINKS = [
  BRAND.social.instagram,
  BRAND.social.youtube,
  BRAND.social.twitter,
  BRAND.social.linkedin,
];

export const {
  name: BRAND_NAME,
  tagline: BRAND_TAGLINE,
  shortName: BRAND_SHORT_NAME,
  formerName: BRAND_FORMER_NAME,
  siteUrl: BRAND_SITE_URL,
  email: BRAND_EMAIL,
  phone: BRAND_PHONE,
  whatsapp: BRAND_WHATSAPP,
} = BRAND;

