/**
 * Site Footer — Local SEO, internal links, social profiles, business info.
 * Semantic HTML with <footer>, <nav>, <address> elements.
 * Styled following Ampledia DESIGN.md tokens.
 */
import Link from 'next/link';
import { SITE_NAME, BUSINESS, SOCIAL } from '@/lib/seo.config';
import { Instagram, MessageCircle, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const NAV_GROUPS = [
  {
    title: 'Services',
    links: [
      { label: 'Videography & Commercials', href: '/services/videography' },
      { label: 'Video Editing & Motion', href: '/services/video-editing' },
      { label: 'Social Media Growth', href: '/services/social-media' },
      { label: 'Meta & Google Ads', href: '/services/digital-marketing' },
      { label: 'Web Design & Dev', href: '/services/web-design' },
      { label: 'SEO & Organic Growth', href: '/services/seo-dominance' },
      { label: 'Brand & Graphic Design', href: '/services/graphic-design' },
      { label: 'Wedding Cinematography', href: '/services/wedding-shooting' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Portfolio Archive', href: '/portfolio' },
      { label: 'Case Study: Vision Classes', href: '/portfolio/vision-classes-bhilwara' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

const SOCIAL_ITEMS = [
  { name: 'Instagram', icon: Instagram, href: SOCIAL.instagram, label: `Follow ${SITE_NAME} on Instagram` },
  { name: 'WhatsApp', icon: MessageCircle, href: SOCIAL.whatsapp, label: `Chat with ${SITE_NAME} on WhatsApp` },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#0A0614] border-t border-[#7C3AED]/20 text-[#B7A9D6]" role="contentinfo">
      {/* Top subtle hairline divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/30 to-transparent" />

      <div className="mx-auto max-w-[1360px] px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand + Contact Info */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block" aria-label={`${SITE_NAME} — Home`}>
              <span className="font-heading text-2xl font-bold tracking-tight text-[#F5F0FF]">
                {SITE_NAME}
              </span>
            </Link>

            <p className="mt-3 max-w-xs text-xs sm:text-sm leading-relaxed text-[#B7A9D6]">
              Digital marketing and cinematic creative agency integrating 4K video production, high-retention editing, and precision Meta ad funnels.
            </p>

            {/* Business Contact */}
            <address className="mt-6 not-italic space-y-2.5 text-xs sm:text-sm">
              <a
                href={`tel:${BUSINESS.phone}`}
                className="flex items-center gap-2.5 text-[#B7A9D6] transition-colors hover:text-[#A855F7]"
                aria-label={`Call ${SITE_NAME} at ${BUSINESS.phone}`}
              >
                <Phone className="h-4 w-4 shrink-0 text-[#A855F7]" aria-hidden="true" />
                {BUSINESS.phone}
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="flex items-center gap-2.5 text-[#B7A9D6] transition-colors hover:text-[#A855F7]"
                aria-label={`Email ${SITE_NAME} at ${BUSINESS.email}`}
              >
                <Mail className="h-4 w-4 shrink-0 text-[#A855F7]" aria-hidden="true" />
                {BUSINESS.email}
              </a>
              <span className="flex items-start gap-2.5 text-[#B7A9D6]">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-[#A855F7]" aria-hidden="true" />
                <span>
                  {BUSINESS.address.streetAddress}, {BUSINESS.address.addressRegion},{' '}
                  {BUSINESS.address.postalCode}, India
                </span>
              </span>
            </address>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_ITEMS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#7C3AED]/30 bg-[#1A0F33] text-[#C4B5FD] transition-all duration-300 hover:border-[#A855F7] hover:bg-[#7C3AED] hover:text-white"
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Groups */}
          {NAV_GROUPS.map((group) => (
            <nav
              key={group.title}
              aria-label={`${group.title} navigation`}
              className="lg:col-span-2 lg:col-start-auto"
            >
              <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-[#F5F0FF]">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-[#B7A9D6] transition-colors duration-200 hover:text-[#A855F7]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Business Hours & Quick CTA */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-[#F5F0FF]">
              Studio Hours
            </h3>
            <dl className="space-y-2 text-xs sm:text-sm text-[#B7A9D6]">
              <div className="flex justify-between gap-4">
                <dt>Mon – Sat</dt>
                <dd className="font-mono text-[#F5F0FF]">9:00 AM – 7:00 PM</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Sunday</dt>
                <dd className="text-[#A855F7]">Closed</dd>
              </div>
            </dl>

            <div className="mt-6">
              <a
                href="https://wa.me/919024675831?text=Hi%20Ampledia%2C%20I%20would%20like%20to%20discuss%20a%20project%20for%20my%20brand."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#7C3AED] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-[#7C3AED]/25 transition-all duration-300 hover:bg-[#6D28D9]"
              >
                <span>Let&apos;s Build Together</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#7C3AED]/15 pt-8 text-xs sm:flex-row text-[#B7A9D6]">
          <p>
            &copy; {currentYear} {SITE_NAME} (formerly Rollix Media). All rights reserved.
          </p>

          <p>
            Founded by{' '}
            <span className="text-[#F5F0FF] font-medium">Jaypal</span>
          </p>

          <p>
            Bhilwara, Rajasthan • Serving Pan-India
          </p>
        </div>
      </div>
    </footer>
  );
}
