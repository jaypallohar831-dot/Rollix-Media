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
    <div className="space-y-10 pb-20 text-stone-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white border border-stone-200 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xs">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl font-light tracking-tight text-stone-900">
            Agency <span className="text-gradient-warm italic font-medium">Services</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-stone-500 font-light tracking-wide">
            Manage the core offerings of your digital studio.
          </p>
        </div>
        <Link 
          href="/admin/services/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cinematic-orange px-5 py-3 text-xs sm:text-sm font-bold text-white transition-all hover:bg-stone-900 shadow-md hover:scale-[1.02] shrink-0"
        >
          <Plus className="h-4 w-4" />
          Add New Service
        </Link>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          <p className="font-bold">System Error:</p>
          <p className="opacity-80">{error.message}</p>
        </div>
      )}

      {/* Services List */}
      <div className="rounded-3xl border border-stone-200 bg-white shadow-xs overflow-hidden">
        {services && services.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-stone-50 border-b border-stone-200 text-[10px] uppercase tracking-[0.2em] text-stone-500">
                <tr>
                  <th className="px-8 py-5 font-bold">Service</th>
                  <th className="px-8 py-5 font-bold">Status</th>
                  <th className="px-8 py-5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {services.map((service) => (
                  <tr key={service.id} className="group transition-all hover:bg-stone-50/50">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-stone-100 border border-stone-200 text-cinematic-orange">
                          <Zap className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="font-heading text-base text-stone-900 font-semibold block group-hover:text-cinematic-orange transition-colors">
                            {service.title}
                          </span>
                          <span className="text-xs text-stone-500 font-light">{service.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        service.status === 'active' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-stone-100 text-stone-600 border border-stone-200'
                      }`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/services/${service.slug}`} className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition-all inline-block">
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button className="p-2 rounded-lg text-stone-500 hover:bg-red-50 hover:text-red-600 transition-all">
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
            <div className="mb-6 rounded-full bg-stone-100 p-6 text-stone-300 border border-stone-200">
              <Zap className="h-12 w-12" />
            </div>
            <h3 className="mb-2 font-heading text-2xl text-stone-900 font-light">No Services Defined</h3>
            <p className="max-w-sm text-sm text-stone-600 font-light leading-relaxed">
              Define the specialized services your studio provides to clients.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
