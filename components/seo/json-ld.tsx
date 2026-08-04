/**
 * JSON-LD Structured Data Components
 * Reusable schema.org components for rich results.
 */
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  BUSINESS,
  SOCIAL_LINKS,
  SOCIAL,
  OG_IMAGE,
  type HOMEPAGE_FAQ,
} from '@/lib/seo.config';

// ── Helper to render JSON-LD ────────────────────────────────────────────────
function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 0) }}
    />
  );
}

// ── Organization Schema ─────────────────────────────────────────────────────
export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: BUSINESS.logo,
      width: 512,
      height: 512,
    },
    image: OG_IMAGE.url,
    description: BUSINESS.description,
    foundingDate: BUSINESS.foundingDate,
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    address: {
      '@type': 'PostalAddress',
      ...BUSINESS.address,
    },
    sameAs: SOCIAL_LINKS,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS.phone,
        contactType: 'customer service',
        email: BUSINESS.email,
        availableLanguage: ['English', 'Hindi'],
        areaServed: 'IN',
      },
    ],
  };
  return <JsonLd data={data} />;
}

// ── LocalBusiness Schema ────────────────────────────────────────────────────
export function LocalBusinessSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${SITE_URL}/#localbusiness`,
    name: BUSINESS.name,
    description: BUSINESS.description,
    url: SITE_URL,
    logo: BUSINESS.logo,
    image: OG_IMAGE.url,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    currenciesAccepted: BUSINESS.currenciesAccepted,
    paymentAccepted: BUSINESS.paymentAccepted,
    address: {
      '@type': 'PostalAddress',
      ...BUSINESS.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    areaServed: BUSINESS.areaServed.map((a) => ({
      '@type': a.type,
      name: a.name,
    })),
    openingHoursSpecification: BUSINESS.openingHoursSpecification.map((spec) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: spec.dayOfWeek,
      opens: spec.opens,
      closes: spec.closes,
    })),
    sameAs: SOCIAL_LINKS,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Marketing Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Video Editing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Marketing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO Optimization' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Graphic Design' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wedding Videography' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Meta Ads Management' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Ads Management' } },
      ],
    },
  };
  return <JsonLd data={data} />;
}

// ── WebSite Schema (with SearchAction) ──────────────────────────────────────
export function WebSiteSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: SITE_LOCALE,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/portfolio?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
  return <JsonLd data={data} />;
}

// ── WebPage Schema ──────────────────────────────────────────────────────────
export function WebPageSchema({
  name,
  description,
  url,
  type = 'WebPage',
  breadcrumb,
}: {
  name: string;
  description: string;
  url: string;
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'ItemPage';
  breadcrumb?: { name: string; url: string }[];
}) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    inLanguage: SITE_LOCALE,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  };

  if (breadcrumb && breadcrumb.length > 0) {
    data.breadcrumb = {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumb.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: item.url,
      })),
    };
  }

  return <JsonLd data={data} />;
}

// ── Breadcrumb Schema ───────────────────────────────────────────────────────
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <JsonLd data={data} />;
}

// ── Service Schema ──────────────────────────────────────────────────────────
export function ServiceSchema({
  name,
  description,
  url,
  image,
  priceRange,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
  priceRange?: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    image: image || OG_IMAGE.url,
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    areaServed: BUSINESS.areaServed.map((a) => ({
      '@type': a.type,
      name: a.name,
    })),
    ...(priceRange && { priceRange }),
  };
  return <JsonLd data={data} />;
}

// ── FAQ Schema ──────────────────────────────────────────────────────────────
export function FAQSchema({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
  return <JsonLd data={data} />;
}

// ── VideoObject Schema ──────────────────────────────────────────────────────
export function VideoObjectSchema({
  name,
  description,
  thumbnailUrl,
  contentUrl,
  uploadDate,
  duration,
  embedUrl,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl?: string;
  uploadDate: string;
  duration?: string;
  embedUrl?: string;
}) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  };
  if (contentUrl) data.contentUrl = contentUrl;
  if (duration) data.duration = duration;
  if (embedUrl) data.embedUrl = embedUrl;
  return <JsonLd data={data} />;
}

// ── AggregateRating Schema ──────────────────────────────────────────────────
export function AggregateRatingSchema({
  ratingValue,
  reviewCount,
  bestRating = 5,
}: {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: BUSINESS.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      reviewCount,
      bestRating,
      worstRating: 1,
    },
  };
  return <JsonLd data={data} />;
}

// ── Review Schema ───────────────────────────────────────────────────────────
export function ReviewSchema({
  reviews,
}: {
  reviews: {
    author: string;
    ratingValue: number;
    reviewBody: string;
    datePublished?: string;
  }[];
}) {
  const data = reviews.map((review) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.ratingValue,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: review.reviewBody,
    itemReviewed: {
      '@id': `${SITE_URL}/#localbusiness`,
    },
    ...(review.datePublished && { datePublished: review.datePublished }),
  }));
  return <JsonLd data={data} />;
}

// ── Service List Schema ─────────────────────────────────────────────────────
export function ServiceListSchema({
  services,
}: {
  services: { name: string; description: string; url: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Digital Marketing Services by Rollix Media',
    itemListElement: services.map((service, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        url: service.url,
        provider: {
          '@id': `${SITE_URL}/#organization`,
        },
      },
    })),
  };
  return <JsonLd data={data} />;
}

// ── Article Schema (for case studies) ───────────────────────────────────────
export function ArticleSchema({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    image: image || OG_IMAGE.url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@id': `${SITE_URL}/#organization`,
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  };
  return <JsonLd data={data} />;
}
