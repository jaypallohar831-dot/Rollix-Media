'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { 
  Zap, 
  ChevronLeft,
  Check, 
  Loader2
} from 'lucide-react';

export default function NewServicePage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    icon: 'Zap',
    featured: false,
    status: 'active',
    seo_title: '',
    seo_description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('services').insert([formData]);

    setLoading(false);
    if (error) {
      alert('Error creating service: ' + error.message);
    } else {
      router.push('/admin/services');
      router.refresh();
    }
  };

  return (
    <div className="mx-auto max-w-4xl pb-20">
      <button 
        onClick={() => router.back()}
        className="mb-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Services
      </button>

      <div className="mb-12">
        <h1 className="font-heading text-4xl font-light text-white">
          Add New <span className="text-gradient-warm italic font-medium">Service</span>
        </h1>
        <p className="mt-2 text-muted-foreground font-light">Expand your agency&rsquo;s offerings with a new service line.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 space-y-6 backdrop-blur-md">
            <h2 className="font-heading text-lg text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-cinematic-orange" />
              Service Details
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-sm text-white focus:border-cinematic-orange/40 focus:outline-none transition-all"
                  placeholder="e.g. Cinematic Wedding Films"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">URL Slug</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-sm text-white/50 focus:border-cinematic-orange/40 focus:outline-none transition-all font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Service Description</label>
                <textarea
                  required
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-sm text-white focus:border-cinematic-orange/40 focus:outline-none transition-all leading-relaxed"
                  placeholder="Describe what makes this service special..."
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 space-y-6">
            <h2 className="font-heading text-lg text-white">SEO Optimization</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Meta Title</label>
                <input
                  type="text"
                  value={formData.seo_title}
                  onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-sm text-white focus:border-cinematic-orange/40 focus:outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Meta Description</label>
                <textarea
                  rows={3}
                  value={formData.seo_description}
                  onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-sm text-white focus:border-cinematic-orange/40 focus:outline-none transition-all"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Configuration</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-white/[0.04] bg-white/[0.01]">
                <div className="space-y-0.5">
                  <p className="text-xs font-medium text-white">Featured</p>
                  <p className="text-[10px] text-muted-foreground">Highlight on Home</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}
                  className={`w-10 h-5 rounded-full transition-colors relative ${formData.featured ? 'bg-cinematic-orange' : 'bg-white/10'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${formData.featured ? 'left-6' : 'left-1'}`} />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 ml-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-sm text-white focus:border-cinematic-orange/40 focus:outline-none appearance-none"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-cinematic-orange py-5 text-sm font-bold text-black transition-all hover:shadow-[0_0_30px_rgba(212,118,60,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            {loading ? 'Creating...' : 'Deploy Service'}
          </button>
        </div>
      </form>
    </div>
  );
}
