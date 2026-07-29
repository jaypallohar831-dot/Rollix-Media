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
    <div className="admin-layout flex min-h-screen relative z-10 bg-[#fafafa] text-stone-900">
      {!isLoginPage && (
        <>
          {/* Mobile top bar */}
          <header className="md:hidden flex items-center justify-between px-5 py-4 sticky top-0 z-40 bg-white border-b border-stone-200">
            <div className="flex items-center gap-3">
              <span className="font-heading text-[11px] uppercase tracking-[.25em] font-bold text-stone-900">
                Rollix <span className="text-cinematic-orange">Studio</span>
              </span>
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="h-5 w-5 text-stone-700" /> : <Menu className="h-5 w-5 text-stone-700" />}
            </button>
          </header>

          <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </>
      )}

      {/* Main content - must have relative z-10 to sit above BokehBackground */}
      <main className={`flex-1 overflow-auto min-w-0 bg-[#fafafa] relative z-10 ${isLoginPage ? '' : 'md:ml-[260px]'}`}>
        <div className="p-8 h-full w-full">
          {children}
        </div>
      </main>

      {/* Mobile overlay */}
      {!isLoginPage && sidebarOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
