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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border border-stone-200 p-8 rounded-3xl shadow-xs">
        <div>
          <h1 className="font-heading text-4xl font-light tracking-tight text-stone-900">
            Client <span className="text-gradient-warm italic font-medium">Voices</span>
          </h1>
          <p className="mt-2 text-stone-500 font-light tracking-wide">
            Manage the praise and stories from your satisfied clients.
          </p>
        </div>
        <Link 
          href="/admin/testimonials/new"
          className="flex items-center gap-2 rounded-xl bg-cinematic-orange px-6 py-3 text-sm font-bold text-white transition-all hover:bg-stone-900 shadow-md hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
        </Link>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          <p className="font-bold">System Error:</p>
          <p className="opacity-80">{error.message}</p>
        </div>
      )}

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials && testimonials.length > 0 ? (
          testimonials.map((item) => (
            <div key={item.id} className="group relative rounded-3xl border border-stone-200 bg-white p-8 transition-all hover:shadow-md">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-stone-200 bg-stone-100">
                    {item.avatar_url ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.avatar_url} alt={item.name} className="h-full w-full object-cover" />
                      </>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-stone-400">
                        <User className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-stone-900 font-semibold">{item.name}</h3>
                    <p className="text-xs text-cinematic-orange font-medium">{item.role} {item.company ? `@ ${item.company}` : ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < (item.rating || 5) ? 'fill-cinematic-orange text-cinematic-orange' : 'text-stone-200'}`} />
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-cinematic-orange/15" />
                <p className="text-sm text-stone-700 leading-relaxed font-light italic pl-4">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${item.status === 'published' ? 'text-green-600' : 'text-stone-400'}`}>
                  {item.status}
                </span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-900">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <DeleteTestimonialButton id={item.id} name={item.name} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-24 text-center rounded-3xl border border-stone-200 bg-white">
            <div className="mb-6 rounded-full bg-stone-100 p-6 text-stone-300 border border-stone-200">
              <Quote className="h-12 w-12" />
            </div>
            <h3 className="mb-2 font-heading text-2xl text-stone-900 font-light">Silent Appreciation</h3>
            <p className="max-w-sm text-sm text-stone-600 font-light leading-relaxed">
              You haven&rsquo;t added any client testimonials yet. Showcase the love from your audience.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
