import Link from 'next/link';
import { Plus, Pencil, Trash2, ExternalLink, Star, Film, ImageIcon } from 'lucide-react';
import { requireAdminOrRedirect } from '@/lib/admin-auth';
import { ProjectStatusToggle } from '@/components/admin/project-status-toggle';
import { DeleteProjectButton } from '@/components/admin/delete-project-button';

export const dynamic = 'force-dynamic';

export default async function AdminPortfolioPage() {
  const { supabase } = await requireAdminOrRedirect();
  
  // Fetch projects from Supabase
  const { data: projects, error } = await supabase
    .from('portfolio_projects')
    .select('*, categories(title)')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.02] border border-white/[0.08] p-8 rounded-3xl backdrop-blur-md">
        <div>
          <h1 className="font-heading text-4xl font-light tracking-tight text-white">
            Portfolio <span className="text-gradient-warm italic font-medium">Vault</span>
          </h1>
          <p className="mt-2 text-muted-foreground font-light tracking-wide">
            You have <span className="text-white font-medium">{projects?.length || 0}</span> published works.
          </p>
        </div>
        <Link 
          href="/admin/portfolio/new"
          className="flex items-center gap-2 rounded-xl bg-cinematic-orange px-6 py-3 text-sm font-bold text-black transition-all hover:shadow-[0_0_20px_rgba(212,118,60,0.3)] hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4" />
          Add New Project
        </Link>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-400">
          <p className="font-bold">System Error:</p>
          <p className="opacity-80">{error.message}</p>
        </div>
      )}

      {/* Projects Grid/Table */}
      <div className="rounded-3xl border border-white/[0.08] bg-white/[0.01] overflow-hidden">
        {projects && projects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-white/[0.03] text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
                <tr>
                  <th className="px-8 py-5 font-bold">Preview</th>
                  <th className="px-8 py-5 font-bold">Project Details</th>
                  <th className="px-8 py-5 font-bold">Category</th>
                  <th className="px-8 py-5 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {projects.map((project) => (
                  <tr key={project.id} className="group transition-all hover:bg-white/[0.03]">
                    <td className="px-8 py-6">
                      <div className="relative h-16 w-24 overflow-hidden rounded-lg border border-white/[0.1] bg-black/40">
                        {project.thumbnail ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img 
                            src={project.thumbnail} 
                            alt={project.title}
                            className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-white/[0.02]">
                            <ImageIcon className="h-4 w-4 text-muted-foreground/20" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-base text-white group-hover:text-cinematic-orange transition-colors">
                          {project.title}
                        </span>
                        {project.featured && (
                          <Star className="h-3 w-3 fill-cinematic-orange text-cinematic-orange" />
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground font-light">
                        <span>{project.slug}</span>
                        <span className="h-1 w-1 rounded-full bg-white/10" />
                        <span>{project.status}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {project.categories?.title || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/portfolio/${project.slug}`}
                          className="p-2 rounded-lg text-muted-foreground hover:bg-white/[0.05] hover:text-white transition-all"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        
                        <ProjectStatusToggle 
                          projectId={project.id} 
                          currentStatus={project.status} 
                        />

                        <DeleteProjectButton 
                          projectId={project.id} 
                          projectTitle={project.title} 
                        />
                        
                        <Link 
                          href={`/portfolio/${project.slug}`} 
                          target="_blank"
                          className="p-2 rounded-lg text-muted-foreground hover:bg-cinematic-orange/10 hover:text-cinematic-orange transition-all"
                        >
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
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 rounded-full bg-white/[0.02] p-6 text-muted-foreground/20 border border-white/[0.05]">
              <Film className="h-12 w-12" />
            </div>
            <h3 className="mb-2 font-heading text-2xl text-white font-light">The Vault is Empty</h3>
            <p className="max-w-sm text-sm text-muted-foreground font-light leading-relaxed">
              You haven&rsquo;t added any cinematic works yet. Start by creating your first showcase project.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
