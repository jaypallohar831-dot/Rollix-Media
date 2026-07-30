'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/database.types';
import VideoThumbnailPicker from '@/components/admin/video-thumbnail-picker';
import { CrewBuilder, type CrewMember } from '@/components/admin/crew-builder';
import { StrategyBuilder, type ProjectStrategy } from '@/components/admin/strategy-builder';
import { DeliverablesBuilder, type Deliverable } from '@/components/admin/deliverables-builder';
import { 
  Upload, 
  X, 
  Check, 
  Loader2, 
  ChevronLeft,
  Sparkles,
  Plus
} from 'lucide-react';

type Category = Database['public']['Tables']['categories']['Row'];

export default function NewPortfolioPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [draftRestored, setDraftRestored] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category_id: '',
    description: '',
    thumbnail: '',
    gallery_images: [] as string[],
    featured: false,
    status: 'published',
    seo_title: '',
    seo_description: '',
    video_url: '',
    location: '',
    month: '',
    tags: [] as string[],
    crew: [] as CrewMember[],
    client: '',
    duration: '',
    live_url: '',
    strategy: {
      objective: '',
      approach: [],
      tools: [],
      results: []
    } as ProjectStrategy,
    deliverables: [] as Deliverable[]
  });

  const fetchCategories = useCallback(async () => {
    const { data } = await supabase.from('categories').select('*').eq('status', 'active');
    if (data) setCategories(data);
  }, [supabase]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchCategories();
  }, [fetchCategories]);

  // Load draft on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_new_draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
        setDraftRestored(true);
      } catch (e) {
        console.error('Failed to parse draft', e);
      }
    }
  }, []);

  // Save draft on change
  useEffect(() => {
    // Only save if there's actual content to prevent saving empty state
    if (formData.title || formData.slug || formData.description) {
      localStorage.setItem('portfolio_new_draft', JSON.stringify(formData));
    }
  }, [formData]);

  const handleCreateCategory = async () => {
    const title = prompt('Enter new category name (e.g. Wedding Film):');
    if (!title) return;
    const slug = title.toLowerCase().replace(/ /g, '-');
    const { data, error } = await supabase.from('categories').insert([{ title, slug, status: 'active' }]).select().single();
    if (error) {
      alert('Failed to create category: ' + error.message);
    } else if (data) {
      setCategories(prev => [...prev, data]);
      setFormData(prev => ({ ...prev, category_id: data.id }));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'thumbnail' | 'gallery' | 'video') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(type);
    
    try {
      const folder = type === 'video' ? 'videos' : 'portfolio';
      const ext = file.name.split('.').pop();
      const filename = `${folder}/${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;

      const { data, error } = await supabase.storage
        .from('media')
        .upload(filename, file, { cacheControl: '3600', upsert: false });

      if (error) {
        throw new Error(error.message);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(data.path);

      if (type === 'thumbnail') {
        setFormData(prev => ({ ...prev, thumbnail: publicUrl }));
      } else if (type === 'gallery') {
        setFormData(prev => ({ ...prev, gallery_images: [...prev.gallery_images, publicUrl] }));
      } else if (type === 'video') {
        setFormData(prev => ({ ...prev, video_url: publicUrl }));
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setUploading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Strip out fields that do not exist in the Supabase 'portfolio_projects' table schema (video_url doesn't need to be stripped if it exists)
    // Actually, wait, let's make sure we aren't stripping valid fields.
    const { ...submitData } = formData;
    
    // Postgres throws error if empty string is cast to UUID
    const finalData = {
      ...submitData,
      category_id: submitData.category_id || null,
    };

    const { error } = await supabase.from('portfolio_projects').insert([finalData]);

    setLoading(false);
    if (error) {
      alert('Error creating project: ' + error.message);
    } else {
      localStorage.removeItem('portfolio_new_draft');
      router.push('/admin/portfolio');
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
        Back to Projects
      </button>

      <div className="mb-10 bg-white border border-stone-200 p-8 rounded-3xl shadow-xs relative">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-heading text-4xl font-light text-stone-900">
              Create New <span className="text-gradient-warm italic font-medium">Work</span>
            </h1>
            <p className="mt-2 text-stone-500 font-light">Craft a new masterpiece showcase in your digital vault.</p>
          </div>
          {draftRestored && (
            <div className="flex flex-col items-end">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600 border border-emerald-200">
                <Check className="h-3 w-3" /> Draft Restored
              </span>
              <button 
                onClick={() => {
                  if(confirm('Are you sure you want to clear the draft? This will reset all fields.')) {
                    localStorage.removeItem('portfolio_new_draft');
                    window.location.reload();
                  }
                }}
                className="mt-2 text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-red-500 transition-colors"
              >
                Clear Draft
              </button>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <section className="rounded-3xl border border-stone-200 bg-white p-8 space-y-6 shadow-xs">
            <h2 className="font-heading text-lg text-stone-900 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cinematic-orange" />
              Project Essence
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/\s+/g, '-');
                    const cat = categories.find(c => c.id === formData.category_id)?.title || 'Digital Marketing';
                    const loc = formData.location || 'Bhilwara, Rajasthan';
                    const autoSeoTitle = title ? `${title} — Rollix Media Portfolio` : '';
                    const autoSeoDesc = title
                      ? `Watch "${title}" by Rollix Media — a premium ${cat} project in ${loc}. Professional video editing & digital marketing agency in Bhilwara, India.`
                      : '';
                    setFormData(prev => ({
                      ...prev,
                      title,
                      slug,
                      seo_title: autoSeoTitle,
                      seo_description: autoSeoDesc,
                    }));
                  }}
                  className="w-full rounded-xl border border-stone-300 bg-white px-5 py-4 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none transition-all shadow-xs"
                  placeholder="e.g. The Midnight Bloom"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full rounded-xl border border-stone-300 bg-white px-5 py-4 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none transition-all shadow-xs"
                    placeholder="e.g. Udaipur, India"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Date / Month</label>
                  <input
                    type="text"
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                    className="w-full rounded-xl border border-stone-300 bg-white px-5 py-4 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none transition-all shadow-xs"
                    placeholder="e.g. October 2023"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Client (Optional)</label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full rounded-xl border border-stone-300 bg-white px-5 py-4 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none transition-all shadow-xs"
                    placeholder="e.g. Vision Classes"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Duration (Optional)</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full rounded-xl border border-stone-300 bg-white px-5 py-4 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none transition-all shadow-xs"
                    placeholder="e.g. 2 Months"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Social Media Link (Optional)</label>
                <input
                  type="text"
                  value={formData.live_url}
                  onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-white px-5 py-4 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none transition-all shadow-xs"
                  placeholder="https://instagram.com/p/..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Permanent Slug</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full rounded-xl border border-stone-300 bg-white px-5 py-4 text-sm text-stone-700 focus:border-cinematic-orange focus:outline-none transition-all font-mono shadow-xs"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-stone-400 font-mono">/portfolio/</div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Story / Description</label>
                <textarea
                  required
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-white px-5 py-4 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none transition-all leading-relaxed shadow-xs"
                  placeholder="Tell the cinematic story behind this work..."
                />
              </div>
            </div>
          </section>

          <CrewBuilder 
            crew={formData.crew} 
            onChange={(crew) => setFormData(prev => ({ ...prev, crew }))} 
          />

          <StrategyBuilder
            strategy={formData.strategy}
            onChange={(strategy) => setFormData(prev => ({ ...prev, strategy }))}
          />

          <DeliverablesBuilder
            deliverables={formData.deliverables}
            onChange={(d) => setFormData(prev => ({ ...prev, deliverables: d }))}
          />
        </div>

        {/* Sidebar / Settings Area */}
        <div className="space-y-8">
          <section className="rounded-3xl border border-stone-200 bg-white p-8 space-y-6 shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-600">Publish Settings</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600">Category</label>
                  <button type="button" onClick={handleCreateCategory} className="text-[10px] font-bold uppercase tracking-widest text-cinematic-orange hover:text-stone-900 transition-colors flex items-center gap-1">
                    <Plus className="h-3 w-3" /> New
                  </button>
                </div>
                <select
                  required
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3.5 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none shadow-xs"
                >
                  <option value="">{categories.length === 0 ? 'No categories found' : 'Select Category'}</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id} className="text-stone-900 bg-white">{cat.title}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-stone-200 bg-stone-50">
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-stone-900">Featured Project</p>
                  <p className="text-[10px] text-stone-500">Show on homepage</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}
                  className={`w-10 h-5 rounded-full transition-colors relative ${formData.featured ? 'bg-cinematic-orange' : 'bg-stone-300'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${formData.featured ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </section>

          {/* SEO Preview Card */}
          {formData.title && (
            <section className="rounded-3xl border border-emerald-300 bg-emerald-50/50 p-6 space-y-3 shadow-xs">
              <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-800 flex items-center gap-2">
                <span>🔍</span> Google Preview (Auto-Generated)
              </h2>
              <div className="space-y-1">
                <p className="text-[11px] text-blue-600 truncate">{`rollixmedia.vercel.app/portfolio/${formData.slug}`}</p>
                <p className="text-sm font-semibold text-stone-900 leading-tight line-clamp-1">{formData.seo_title}</p>
                <p className="text-[11px] text-stone-600 leading-relaxed line-clamp-2">{formData.seo_description}</p>
              </div>
              <p className="text-[10px] text-stone-400">You can override these in the SEO fields below.</p>
            </section>
          )}

          <section className="rounded-3xl border border-stone-200 bg-white p-8 space-y-6 shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-600">Project Cover</h2>
            
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 group">
              {formData.thumbnail ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={formData.thumbnail} alt="Project cover" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <label className="cursor-pointer p-3 rounded-full bg-white text-stone-900 shadow-md hover:bg-cinematic-orange hover:text-white transition-all">
                       <Upload className="h-5 w-5" />
                       <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'thumbnail')} accept="image/*" />
                     </label>
                  </div>
                </>
              ) : (
                <label className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-stone-50 transition-colors">
                  {uploading === 'thumbnail' ? <Loader2 className="h-6 w-6 animate-spin text-cinematic-orange" /> : <Upload className="h-6 w-6 text-stone-400" />}
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Upload Thumbnail</span>
                  <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'thumbnail')} accept="image/*" />
                </label>
              )}
            </div>
          </section>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-cinematic-orange py-5 text-sm font-bold text-white transition-all hover:bg-stone-900 shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            {loading ? 'Creating...' : 'Publish Project'}
          </button>
        </div>
      </form>
    </div>
  );
}
