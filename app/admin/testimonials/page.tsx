import Link from 'next/link';
import { Plus, Pencil, Quote, Star, User } from 'lucide-react';
import { DeleteTestimonialButton } from '@/components/admin/delete-testimonial-button';
import { requireAdminOrRedirect } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export default async function AdminTestimonialsPage() {
  const { supabase } = await requireAdminOrRedirect();
  
  // Fetch testimonials from Supabase
  const { data: testimonials, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.02] border border-white/[0.08] p-8 rounded-3xl backdrop-blur-md">
        <div>
          <h1 className="font-heading text-4xl font-light tracking-tight text-white">
            Client <span className="text-gradient-warm italic font-medium">Voices</span>
          </h1>
          <p className="mt-2 text-stone-300 font-light tracking-wide">
            Manage the praise and stories from your satisfied clients.
          </p>
        </div>
        <Link 
          href="/admin/testimonials/new"
          className="flex items-center gap-2 rounded-xl bg-cinematic-orange px-6 py-3 text-sm font-bold text-black transition-all hover:shadow-[0_0_20px_rgba(212,118,60,0.3)] hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
        </Link>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-400">
          <p className="font-bold">System Error:</p>
          <p className="opacity-80">{error.message}</p>
        </div>
      )}

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials && testimonials.length > 0 ? (
          testimonials.map((item) => (
            <div key={item.id} className="group relative rounded-3xl border border-white/[0.08] bg-white/[0.015] p-8 transition-all hover:bg-white/[0.03]">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/[0.1] bg-black/40">
                    {item.avatar_url ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.avatar_url} alt={item.name} className="h-full w-full object-cover" />
                      </>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-muted-foreground/30">
                        <User className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{item.name}</h3>
                    <p className="text-xs text-orange-300 font-light">{item.role} {item.company ? `@ ${item.company}` : ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < (item.rating || 5) ? 'fill-cinematic-orange text-cinematic-orange' : 'text-white/10'}`} />
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-cinematic-orange/10" />
                <p className="text-sm text-stone-300 leading-relaxed font-light italic pl-4">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.04] flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${item.status === 'published' ? 'text-green-400' : 'text-muted-foreground/40'}`}>
                  {item.status}
                </span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg text-muted-foreground hover:bg-white/[0.05] hover:text-white">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <DeleteTestimonialButton id={item.id} name={item.name} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-24 text-center rounded-3xl border border-white/[0.08] bg-white/[0.01]">
            <div className="mb-6 rounded-full bg-white/[0.02] p-6 text-muted-foreground/20 border border-white/[0.05]">
              <Quote className="h-12 w-12" />
            </div>
            <h3 className="mb-2 font-heading text-2xl text-white font-light">Silent Appreciation</h3>
            <p className="max-w-sm text-sm text-stone-300 font-light leading-relaxed">
              You haven&rsquo;t added any client testimonials yet. Showcase the love from your audience.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
