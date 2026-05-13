import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#050505]">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8 lg:p-12">
        {children}
      </main>
    </div>
  );
}
