'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Film, 
  Image as ImageIcon, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut 
} from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/[0.08] bg-[#030303]">
      <div className="flex h-full flex-col px-4 py-8">
        {/* Logo */}
        <div className="mb-12 px-4">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden">
              <img src="/assets/logo.png" alt="Logo" className="object-contain" />
            </div>
            <span className="font-heading text-sm uppercase tracking-[0.2em] text-foreground font-bold">
              Studio <span className="text-cinematic-orange">Admin</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <NavItem href="/admin" icon={LayoutDashboard} label="Dashboard" active={pathname === '/admin'} />
          <NavItem href="/admin/portfolio" icon={Film} label="Portfolio Projects" active={pathname.startsWith('/admin/portfolio')} />
          <NavItem href="/admin/services" icon={ImageIcon} label="Services" active={pathname.startsWith('/admin/services')} />
          <NavItem href="/admin/testimonials" icon={Users} label="Testimonials" active={pathname.startsWith('/admin/testimonials')} />
          <NavItem href="/admin/messages" icon={MessageSquare} label="Enquiries" active={pathname.startsWith('/admin/messages')} />
          <NavItem href="/admin/settings" icon={Settings} label="Site Settings" active={pathname.startsWith('/admin/settings')} />
        </nav>

        {/* Logout */}
        <div className="mt-auto pt-8">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-muted-foreground transition-all duration-300 hover:bg-red-500/10 hover:text-red-400 group"
          >
            <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ href, icon: Icon, label, active = false }: { href: string, icon: any, label: string, active?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm transition-all duration-500 ${
        active 
          ? 'bg-cinematic-orange/10 text-cinematic-orange border border-cinematic-orange/20 shadow-[0_0_15px_rgba(212,118,60,0.1)]' 
          : 'text-muted-foreground/60 border border-transparent hover:bg-white/[0.03] hover:text-foreground'
      }`}
    >
      <Icon className={`h-4 w-4 ${active ? 'animate-pulse' : ''}`} />
      <span className={active ? 'font-medium tracking-wide' : 'tracking-wide'}>{label}</span>
    </Link>
  );
}
