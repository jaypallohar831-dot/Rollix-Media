'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { Menu, X } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout flex min-h-screen relative z-10 bg-[var(--admin-bg)] text-[var(--admin-text)]">
      {!isLoginPage && (
        <>
          {/* Mobile top bar */}
          <header className="md:hidden flex items-center justify-between px-5 py-4 sticky top-0 z-40 bg-[var(--admin-sidebar)] border-b border-[var(--admin-border)]">
            <div className="flex items-center gap-3">
              <span className="font-heading text-[11px] uppercase tracking-[.25em] font-bold text-[var(--admin-text)]">
                Ampledia <span className="text-[var(--admin-accent)]">Studio</span>
              </span>
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
              {sidebarOpen ? (
                <X className="h-5 w-5 text-[var(--admin-text-secondary)]" />
              ) : (
                <Menu className="h-5 w-5 text-[var(--admin-text-secondary)]" />
              )}
            </button>
          </header>

          <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </>
      )}

      {/* Main content container */}
      <main className={`flex-1 overflow-auto min-w-0 bg-[var(--admin-bg)] relative z-10 ${isLoginPage ? '' : 'md:ml-[260px]'}`}>
        <div className="p-4 sm:p-6 lg:p-8 h-full w-full">
          {children}
        </div>
      </main>

      {/* Mobile overlay */}
      {!isLoginPage && sidebarOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden bg-black/60 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
