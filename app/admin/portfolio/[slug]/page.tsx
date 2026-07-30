'use client';

import { useState, useEffect, use, useMemo } from 'react';
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
  Plus,
  Video
} from 'lucide-react';
import { uploadToSupabaseStorage } from '@/lib/supabase-upload';

type Category = Database['public']['Tables']['categories']['Row'];

export default function EditPortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const slug = decodeURIComponent(resolvedParams.slug);
  const supabase = useMemo(() => createClient(), []);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

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

  useEffect(() => {
    async function loadData() {
      const { data: catData } = await supabase.from('categories').select('*').eq('status', 'active');
      if (catData) setCategories(catData);

      const { data: project } = await supabase.from('portfolio_projects').select('*').eq('slug', slug).single();
      if (project) {
        setFormData({
          title: project.title || '',
          slug: project.slug || '',
          category_id: project.category_id || '',
          description: project.description || '',
          thumbnail: project.thumbnail || '',
          gallery_images: project.gallery_images || [],
          featured: project.featured || false,
          status: project.status || 'published',
          seo_title: project.seo_title || '',
          seo_description: project.seo_description || '',
          video_url: project.video_url || '',
          location: project.location || '',
          month: project.month || '',
          tags: project.tags || [],
          crew: project.crew || [],
          client: project.client || '',
          duration: project.duration || '',
          live_url: project.live_url || '',
          strategy: (project.strategy as ProjectStrategy) || {
            objective: '',
            approach: [],
            tools: [],
            results: []
          },
          deliverables: (project.deliverables as Deliverable[]) || []
        });
      }
      setFetching(false);
    }
    loadData();
  }, [slug, supabase]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'thumbnail' | 'gallery' | 'video') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(type);

    try {
      const folder = type === 'video' ? 'videos' : 'portfolio';
      const ext = file.name.split('.').pop();
      const filename = `${folder}/${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;

      const publicUrl = await uploadToSupabaseStorage(supabase, filename, file);

      if (type === 'thumbnail') {
        setFormData(prev => ({ ...prev, thumbnail: publicUrl }));
      } else if (type === 'video') {
        setFormData(prev => ({ ...prev, video_url: publicUrl }));
      } else {
        setFormData(prev => ({ ...prev, gallery_images: [...prev.gallery_images, publicUrl] }));
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

    const { error } = await supabase
      .from('portfolio_projects')
      .update(formData)
      .eq('slug', slug);

    setLoading(false);
    if (error) {
      alert('Error updating project: ' + error.message);
    } else {
      router.push('/admin/portfolio');
      router.refresh();
    }
  };

  if (fetching) return <div className="flex h-40 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-cinematic-orange" /></div>;

  return (
    <div className="mx-auto max-w-4xl pb-20 text-stone-900">
      <button 
        onClick={() => router.back()}
        className="mb-8 flex items-center gap-2 text-sm font-bold text-stone-600 hover:text-cinematic-orange transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Projects
      </button>

      <div className="mb-10 bg-white border border-stone-200 p-8 rounded-3xl shadow-xs">
        <h1 className="font-heading text-4xl font-light text-stone-900">
          Edit <span className="text-gradient-warm italic font-medium">Work</span>
        </h1>
        <p className="mt-2 text-stone-500 font-light">Update the details for &ldquo;{formData.title}&rdquo;.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                    const cat = categories.find(c => c.id === formData.category_id)?.title || 'Digital Marketing';
                    const loc = formData.location || 'Bhilwara, Rajasthan';
                    const autoSeoTitle = title ? `${title} — Rollix Media Portfolio` : '';
                    const autoSeoDesc = title
                      ? `Watch "${title}" by Rollix Media — a premium ${cat} project in ${loc}. Professional video editing & digital marketing agency in Bhilwara, India.`
                      : '';
                    setFormData(prev => ({
                      ...prev,
                      title,
                      seo_title: prev.seo_title === `${prev.title} — Rollix Media Portfolio` || !prev.seo_title ? autoSeoTitle : prev.seo_title,
                      seo_description: !prev.seo_description ? autoSeoDesc : prev.seo_description,
                    }));
                  }}
                  className="w-full rounded-xl border border-stone-300 bg-white px-5 py-4 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none transition-all shadow-xs"
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
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Live URL (Optional)</label>
                <input
                  type="text"
                  value={formData.live_url}
                  onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-white px-5 py-4 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none transition-all shadow-xs"
                  placeholder="https://client-website.com"
                />
              </div>


              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Story / Description</label>
                <textarea
                  required
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-white px-5 py-4 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none transition-all leading-relaxed shadow-xs"
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

        <div className="space-y-8">
          <section className="rounded-3xl border border-stone-200 bg-white p-8 space-y-6 shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-600">Publish Settings</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Category</label>
                <select
                  required
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3.5 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none shadow-xs"
                >
                  <option value="">Select Category</option>
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

          {formData.title && (
            <section className="rounded-3xl border border-emerald-300 bg-emerald-50/50 p-6 space-y-3 shadow-xs">
              <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-800 flex items-center gap-2">
                <span>🔍</span> Google Preview
              </h2>
              <div className="space-y-1">
                <p className="text-[11px] text-blue-600 truncate">{`rollixmedia.vercel.app/portfolio/${slug}`}</p>
                <p className="text-sm font-semibold text-stone-900 leading-tight line-clamp-1">{formData.seo_title || `${formData.title} — Rollix Media Portfolio`}</p>
                <p className="text-[11px] text-stone-600 leading-relaxed line-clamp-2">{formData.seo_description}</p>
              </div>
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
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
