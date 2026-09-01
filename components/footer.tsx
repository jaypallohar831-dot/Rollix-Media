/**
 * Site Footer — Local SEO, internal links, social profiles, business info.
 * Semantic HTML with <footer>, <nav>, <address> elements.
 */
import Link from 'next/link';
import { SITE_NAME, BUSINESS, SOCIAL, SITE_URL } from '@/lib/seo.config';
import { Instagram, MessageSquare, Mail, Phone, MapPin } from 'lucide-react';

const NAV_GROUPS = [
  {
    title: 'Services',
    links: [
      { label: 'Wedding Videography', href: '/services/wedding-shooting' },
      { label: 'Video Editing', href: '/services/video-editing' },
      { label: 'Social Media Marketing', href: '/services/social-media' },
      { label: 'Web Design', href: '/services/web-design' },
      { label: 'Graphic Design', href: '/services/graphic-design' },
      { label: 'SEO Optimization', href: '/services/seo-dominance' },
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
      { label: 'Videography', href: '/services/videography' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Free File Compressor', href: '/tools/compress' },
      { label: 'Case Studies', href: '/case-studies/vision-classes-bhilwara' },
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
  { name: 'Instagram', icon: Instagram, href: SOCIAL.instagram, label: 'Follow Rollix Media on Instagram' },
  { name: 'WhatsApp', icon: MessageSquare, href: SOCIAL.whatsapp, label: 'Chat with Rollix Media on WhatsApp' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-[#FAFAFA]" role="contentinfo">
      <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand + Contact Info */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block" aria-label={`${SITE_NAME} — Home`}>
              <span className="font-heading text-2xl font-light tracking-[-0.02em] text-foreground">
                {SITE_NAME}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Premium digital marketing agency blending cinematic artistry with data-driven strategy to accelerate your brand&rsquo;s growth.
            </p>

            {/* Business Contact */}
            <address className="mt-8 not-italic space-y-3">
              <a
                href={`tel:${BUSINESS.phone}`}
                className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-cinematic-orange"
                aria-label={`Call Rollix Media at ${BUSINESS.phone}`}
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                {BUSINESS.phone}
              </a>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-cinematic-orange"
                aria-label={`Email Rollix Media at ${BUSINESS.email}`}
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {BUSINESS.email}
              </a>
              <span className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  {BUSINESS.address.streetAddress}, {BUSINESS.address.addressRegion},{' '}
                  {BUSINESS.address.postalCode}, India
                </span>
              </span>
            </address>

            {/* Social Links */}
            <div className="mt-8 flex items-center gap-3">
              {SOCIAL_ITEMS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:border-cinematic-orange hover:text-cinematic-orange"
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
              <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors duration-300 hover:text-cinematic-orange"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Business Hours */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">
              Business Hours
            </h3>
            <dl className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between gap-4">
                <dt>Mon – Sat</dt>
                <dd>9:00 AM – 7:00 PM</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Sunday</dt>
                <dd>Closed</dd>
              </div>
            </dl>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-cinematic-orange/30 bg-cinematic-orange/10 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-cinematic-orange transition-all duration-300 hover:bg-cinematic-orange hover:text-white"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Founded by{' '}
            <span className="text-foreground font-medium">Rishabh Singh</span>
            {' '}&amp;{' '}
            <span className="text-foreground font-medium">Jaypal</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Designed &amp; Developed by{' '}
            <Link href="/" className="text-cinematic-orange hover:underline">
              {SITE_NAME}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
