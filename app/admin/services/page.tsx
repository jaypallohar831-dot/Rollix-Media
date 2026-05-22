import Link from 'next/link';
import { Plus, Pencil, Trash2, Zap } from 'lucide-react';
import { requireAdminOrRedirect } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export default async function AdminServicesPage() {
  const { supabase } = await requireAdminOrRedirect();
  
  // Fetch services from Supabase
  const { data: services, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.02] border border-white/[0.08] p-8 rounded-3xl backdrop-blur-md">
        <div>
          <h1 className="font-heading text-4xl font-light tracking-tight text-white">
            Agency <span className="text-gradient-warm italic font-medium">Services</span>
          </h1>
          <p className="mt-2 text-stone-300 font-light tracking-wide">
            Manage the core offerings of your digital studio.
          </p>
        </div>
        <Link 
          href="/admin/services/new"
          className="flex items-center gap-2 rounded-xl bg-cinematic-orange px-6 py-3 text-sm font-bold text-black transition-all hover:shadow-[0_0_20px_rgba(212,118,60,0.3)] hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4" />
          Add New Service
        </Link>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-400">
          <p className="font-bold">System Error:</p>
          <p className="opacity-80">{error.message}</p>
        </div>
      )}

      {/* Services List */}
      <div className="rounded-3xl border border-white/[0.08] bg-white/[0.01] overflow-hidden">
        {services && services.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-white/[0.03] text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
                <tr>
                  <th className="px-8 py-5 font-bold">Service</th>
                  <th className="px-8 py-5 font-bold">Status</th>
                  <th className="px-8 py-5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {services.map((service) => (
                  <tr key={service.id} className="group transition-all hover:bg-white/[0.03]">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-cinematic-orange">
                          <Zap className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="font-heading text-base text-white font-semibold block group-hover:text-cinematic-orange transition-colors">
                            {service.title}
                          </span>
                          <span className="text-xs text-muted-foreground font-light">{service.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        service.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-white/5 text-muted-foreground border border-white/10'
                      }`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg text-muted-foreground hover:bg-white/[0.05] hover:text-white transition-all">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button className="p-2 rounded-lg text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-all">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 rounded-full bg-white/[0.02] p-6 text-muted-foreground/20 border border-white/[0.05]">
              <Zap className="h-12 w-12" />
            </div>
            <h3 className="mb-2 font-heading text-2xl text-white font-light">No Services Defined</h3>
            <p className="max-w-sm text-sm text-stone-300 font-light leading-relaxed">
              Define the specialized services your studio provides to clients.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
