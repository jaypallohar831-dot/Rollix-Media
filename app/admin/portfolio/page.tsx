import Link from 'next/link';
import { Plus, Pencil, ExternalLink, Star, Film, ImageIcon } from 'lucide-react';
import { requireAdminOrRedirect } from '@/lib/admin-auth';
import { ProjectStatusToggle } from '@/components/admin/project-status-toggle';
import { DeleteProjectButton } from '@/components/admin/delete-project-button';

export const dynamic = 'force-dynamic';

export default async function AdminPortfolioPage() {
  const { supabase } = await requireAdminOrRedirect();
  const { data: projects, error } = await supabase
    .from('portfolio_projects')
    .select('*, categories(title)')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-10 pb-20 text-stone-900">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white border border-stone-200 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xs">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl font-light tracking-tight text-stone-900">
            Portfolio <span className="text-gradient-warm italic font-medium">Vault</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-stone-500 font-light tracking-wide">
            You have{' '}
            <span className="text-stone-900 font-semibold">{projects?.length ?? 0}</span>
            {' '}published works.
          </p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cinematic-orange px-5 py-3 text-xs sm:text-sm font-bold text-white transition-all hover:bg-stone-900 shadow-md hover:scale-[1.02] shrink-0"
        >
          <Plus className="h-4 w-4" />
          Add New Project
        </Link>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          <strong>Error:</strong> {error.message}
        </div>
      )}

      <div className="rounded-2xl sm:rounded-3xl border border-stone-200 bg-white shadow-xs overflow-hidden">
        {projects && projects.length > 0 ? (
          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-stone-500">Preview</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-stone-500">Project Details</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-stone-500">Category</th>
                <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-wider text-stone-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-stone-50/50 transition-colors">

                  <td className="px-6 py-4">
                    <div className="h-14 w-20 rounded-lg overflow-hidden border border-stone-200 bg-stone-100 relative">
                      {project.thumbnail ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={project.thumbnail} alt={project.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-stone-400">
                          <ImageIcon className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/portfolio/${project.slug}`} className="font-semibold text-stone-900 text-base hover:text-cinematic-orange transition-colors">
                        {project.title}
                      </Link>
                      {project.featured && (
                        <Star className="h-3.5 w-3.5 fill-cinematic-orange text-cinematic-orange" />
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs text-cinematic-orange font-medium">{project.slug}</span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${project.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {project.status}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      {project.categories?.title || 'Uncategorized'}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/portfolio/${project.slug}`} className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition-colors">
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <ProjectStatusToggle projectId={project.id} currentStatus={project.status} />
                      <DeleteProjectButton projectId={project.id} projectTitle={project.title} />
                      <Link href={`/portfolio/${project.slug}`} target="_blank" className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Film className="h-12 w-12 text-stone-300 mb-4" />
            <h3 className="text-stone-900 font-heading text-xl mb-1">Vault is Empty</h3>
            <p className="text-stone-500 text-sm">No projects yet.</p>
          </div>
        )}
      </div>

    </div>
  );
}
