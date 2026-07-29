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
    <div className="mx-auto max-w-4xl pb-20 text-stone-900">
      <button 
        onClick={() => router.back()}
        className="mb-8 flex items-center gap-2 text-sm font-bold text-stone-600 hover:text-cinematic-orange transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Services
      </button>

      <div className="mb-10 bg-white border border-stone-200 p-8 rounded-3xl shadow-xs">
        <h1 className="font-heading text-4xl font-light text-stone-900">
          Add New <span className="text-gradient-warm italic font-medium">Service</span>
        </h1>
        <p className="mt-2 text-stone-500 font-light">Expand your agency&rsquo;s offerings with a new service line.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <section className="rounded-3xl border border-stone-200 bg-white p-8 space-y-6 shadow-xs">
            <h2 className="font-heading text-lg text-stone-900 flex items-center gap-2">
              <Zap className="h-4 w-4 text-cinematic-orange" />
              Service Details
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full rounded-xl border border-stone-300 bg-white px-5 py-4 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none transition-all shadow-xs"
                  placeholder="e.g. Cinematic Wedding Films"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">URL Slug</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-white px-5 py-4 text-sm text-stone-700 focus:border-cinematic-orange focus:outline-none transition-all font-mono shadow-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Service Description</label>
                <textarea
                  required
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-white px-5 py-4 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none transition-all leading-relaxed shadow-xs"
                  placeholder="Describe what makes this service special..."
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-stone-200 bg-white p-8 space-y-6 shadow-xs">
            <h2 className="font-heading text-lg text-stone-900">SEO Optimization</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Meta Title</label>
                <input
                  type="text"
                  value={formData.seo_title}
                  onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none transition-all shadow-xs"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Meta Description</label>
                <textarea
                  rows={3}
                  value={formData.seo_description}
                  onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none transition-all shadow-xs"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <section className="rounded-3xl border border-stone-200 bg-white p-8 space-y-6 shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-600">Configuration</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border border-stone-200 bg-stone-50">
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-stone-900">Featured</p>
                  <p className="text-[10px] text-stone-500">Highlight on Home</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}
                  className={`w-10 h-5 rounded-full transition-colors relative ${formData.featured ? 'bg-cinematic-orange' : 'bg-stone-300'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${formData.featured ? 'left-6' : 'left-1'}`} />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3.5 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none shadow-xs"
                >
                  <option value="active" className="text-stone-900 bg-white">Active</option>
                  <option value="draft" className="text-stone-900 bg-white">Draft</option>
                </select>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-cinematic-orange py-5 text-sm font-bold text-white transition-all hover:bg-stone-900 shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            {loading ? 'Creating...' : 'Deploy Service'}
          </button>
        </div>
      </form>
    </div>
  );
}
