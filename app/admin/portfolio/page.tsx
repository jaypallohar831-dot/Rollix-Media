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
    <div style={{color:'#fff'}} className="space-y-10 pb-20">

      <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'1.5rem',padding:'2rem',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem'}}>
        <div>
          <h1 style={{fontSize:'2rem',fontWeight:300,color:'#ffffff',margin:0}}>
            Portfolio <span style={{color:'#d4763c',fontStyle:'italic'}}>Vault</span>
          </h1>
          <p style={{marginTop:'0.5rem',color:'#a8a29e',margin:'0.5rem 0 0'}}>
            You have{' '}
            <span style={{color:'#fff',fontWeight:600}}>{projects?.length ?? 0}</span>
            {' '}published works.
          </p>
        </div>
        <Link
          href="/admin/portfolio/new"
          style={{display:'flex',alignItems:'center',gap:'0.5rem',background:'#d4763c',color:'#000',padding:'0.75rem 1.5rem',borderRadius:'0.75rem',fontWeight:700,fontSize:'0.875rem',textDecoration:'none'}}
        >
          <Plus style={{width:'1rem',height:'1rem'}} />
          Add New Project
        </Link>
      </div>

      {error && (
        <div style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.3)',borderRadius:'1rem',padding:'1.5rem',color:'#f87171'}}>
          <strong>Error:</strong> {error.message}
        </div>
      )}

      <div style={{borderRadius:'1.5rem',border:'1px solid rgba(255,255,255,0.1)',overflow:'hidden'}}>
        {projects && projects.length > 0 ? (
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'rgba(255,255,255,0.04)'}}>
                <th style={{padding:'1rem 1.5rem',textAlign:'left',color:'#78716c',fontSize:'0.7rem',textTransform:'uppercase',letterSpacing:'0.1em'}}>Preview</th>
                <th style={{padding:'1rem 1.5rem',textAlign:'left',color:'#78716c',fontSize:'0.7rem',textTransform:'uppercase',letterSpacing:'0.1em'}}>Project Details</th>
                <th style={{padding:'1rem 1.5rem',textAlign:'left',color:'#78716c',fontSize:'0.7rem',textTransform:'uppercase',letterSpacing:'0.1em'}}>Category</th>
                <th style={{padding:'1rem 1.5rem',textAlign:'right',color:'#78716c',fontSize:'0.7rem',textTransform:'uppercase',letterSpacing:'0.1em'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} style={{borderTop:'1px solid rgba(255,255,255,0.06)'}}>

                  <td style={{padding:'1.25rem 1.5rem'}}>
                    <div style={{width:'5rem',height:'3.5rem',borderRadius:'0.5rem',overflow:'hidden',border:'1px solid rgba(255,255,255,0.1)',background:'#111'}}>
                      {project.thumbnail ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={project.thumbnail} alt={project.title} style={{width:'100%',height:'100%',objectFit:'cover'}} />
                      ) : (
                        <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}>
                          <ImageIcon style={{width:'1rem',height:'1rem',color:'#57534e'}} />
                        </div>
                      )}
                    </div>
                  </td>

                  <td style={{padding:'1.25rem 1.5rem'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
                      <span style={{color:'#ffffff',fontWeight:600,fontSize:'1rem'}}>{project.title}</span>
                      {project.featured && (
                        <Star style={{width:'0.75rem',height:'0.75rem',fill:'#d4763c',color:'#d4763c'}} />
                      )}
                    </div>
                    <div style={{marginTop:'0.3rem',display:'flex',alignItems:'center',gap:'0.5rem'}}>
                      <span style={{color:'#fb923c',fontSize:'0.8rem'}}>{project.slug}</span>
                      <span style={{color: project.status === 'published' ? '#4ade80' : '#facc15',fontSize:'0.75rem',background: project.status === 'published' ? 'rgba(20,83,45,0.4)' : 'rgba(113,63,18,0.4)',padding:'0.1rem 0.5rem',borderRadius:'0.25rem'}}>
                        {project.status}
                      </span>
                    </div>
                  </td>

                  <td style={{padding:'1.25rem 1.5rem'}}>
                    <span style={{color:'#a8a29e',fontSize:'0.75rem',textTransform:'uppercase',letterSpacing:'0.05em'}}>
                      {project.categories?.title || 'Uncategorized'}
                    </span>
                  </td>

                  <td style={{padding:'1.25rem 1.5rem',textAlign:'right'}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',gap:'0.25rem'}}>
                      <Link href={`/admin/portfolio/${project.slug}`} style={{padding:'0.5rem',borderRadius:'0.5rem',color:'#a8a29e',display:'inline-flex'}}>
                        <Pencil style={{width:'1rem',height:'1rem'}} />
                      </Link>
                      <ProjectStatusToggle projectId={project.id} currentStatus={project.status} />
                      <DeleteProjectButton projectId={project.id} projectTitle={project.title} />
                      <Link href={`/portfolio/${project.slug}`} target="_blank" style={{padding:'0.5rem',borderRadius:'0.5rem',color:'#a8a29e',display:'inline-flex'}}>
                        <ExternalLink style={{width:'1rem',height:'1rem'}} />
                      </Link>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'5rem',textAlign:'center'}}>
            <Film style={{width:'3rem',height:'3rem',color:'#57534e',marginBottom:'1rem'}} />
            <h3 style={{color:'#ffffff',margin:'0 0 0.5rem'}}>Vault is Empty</h3>
            <p style={{color:'#a8a29e',margin:0}}>No projects yet.</p>
          </div>
        )}
      </div>

    </div>
  );
}
