'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  Layers,
  Star,
  MessageCircle,
  Settings,
  LogOut,
  type LucideIcon,
} from 'lucide-react';

const NAV: { href: string; icon: LucideIcon; label: string }[] = [
  { href: '/admin',              icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/portfolio',    icon: Briefcase,       label: 'Portfolio' },
  { href: '/admin/services',     icon: Layers,          label: 'Services' },
  { href: '/admin/testimonials', icon: Star,            label: 'Testimonials' },
  { href: '/admin/messages',     icon: MessageCircle,   label: 'Enquiries' },
  { href: '/admin/settings',     icon: Settings,        label: 'Settings' },
];

export function AdminSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-[260px] flex flex-col transition-transform duration-300 md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ background: 'var(--admin-sidebar)', borderRight: '1px solid var(--admin-border)' }}
    >
      {/* Brand */}
      <div className="hidden md:flex items-center gap-3 px-7 pt-9 pb-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/logo.png" alt="Logo" className="h-7 w-7 object-contain" />
        <span className="font-heading text-[11px] uppercase tracking-[.25em] font-bold" style={{ color: 'var(--admin-text)' }}>
          Rollix <span style={{ color: 'var(--admin-accent)' }}>Studio</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 mt-6 md:mt-0">
        {NAV.map(({ href, icon: Icon, label }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-medium transition-all duration-200"
              style={
                active
                  ? { background: 'var(--admin-card)', color: 'var(--admin-accent)', boxShadow: '0 1px 4px rgba(200,149,108,.12)', border: '1px solid var(--admin-border)' }
                  : { color: 'var(--admin-text-secondary)', border: '1px solid transparent' }
              }
            >
              <Icon className="h-[18px] w-[18px]" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 pb-8">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[13px] transition-colors"
          style={{ color: 'var(--admin-text-muted)' }}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
