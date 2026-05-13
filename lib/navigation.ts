export interface NavItem {
  label: string;
  href: string;
  sectionId: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', sectionId: 'hero' },
  { label: 'Services', href: '/services', sectionId: 'services' },
  { label: 'Portfolio', href: '/portfolio', sectionId: 'portfolio' },
  { label: 'About', href: '/about', sectionId: 'about' },
  { label: 'Contact', href: '/contact', sectionId: 'contact' },
];

export const SITE_NAME = 'Rollix Media';
