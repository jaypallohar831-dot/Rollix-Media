'use client';

import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <div className="flex min-h-screen bg-[#050505]">
      {!isLoginPage && <AdminSidebar />}
      <main className={`${isLoginPage ? '' : 'ml-64'} flex-1 p-8 lg:p-12`}>
        {children}
      </main>
    </div>
  );
}

