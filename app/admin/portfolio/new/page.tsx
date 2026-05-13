'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { 
  Upload, 
  X, 
  Check, 
  Loader2, 
  Image as ImageIcon, 
  ChevronLeft,
  Sparkles,
  Search,
  Plus
} from 'lucide-react';

export default function NewPortfolioPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null); // 'thumbnail' or 'gallery'
  const [categories, setCategories] = useState<any[]>([]);

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
    tags: [] as string[]
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*').eq('status', 'active');
    if (data) setCategories(data);
  }

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
    
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('folder', type === 'video' ? 'videos' : 'portfolio');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData
      });
      const data = await res.json();

      if (data.success) {
        if (type === 'thumbnail') {
          setFormData(prev => ({ ...prev, thumbnail: data.url }));
        } else if (type === 'gallery') {
          setFormData(prev => ({ ...prev, gallery_images: [...prev.gallery_images, data.url] }));
        } else if (type === 'video') {
          setFormData(prev => ({ ...prev, video_url: data.url }));
        }
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('portfolio_projects').insert([formData]);

    setLoading(false);
    if (error) {
      alert('Error creating project: ' + error.message);
    } else {
      router.push('/admin/portfolio');
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
        Back to Projects
      </button>

      <div className="mb-12">
        <h1 className="font-heading text-4xl font-light text-white">
          Create New <span className="text-gradient-warm italic font-medium">Work</span>
        </h1>
        <p className="mt-2 text-muted-foreground font-light">Craft a new masterpiece showcase in your digital vault.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 space-y-6 backdrop-blur-md">
            <h2 className="font-heading text-lg text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cinematic-orange" />
              Project Essence
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-sm text-white focus:border-cinematic-orange/40 focus:outline-none transition-all"
                  placeholder="e.g. The Midnight Bloom"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-sm text-white focus:border-cinematic-orange/40 focus:outline-none transition-all"
                  placeholder="e.g. Udaipur, India"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Video File (Optional)</label>
                <div className="flex gap-4 items-center">
                  <input
                    type="text"
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-sm text-white focus:border-cinematic-orange/40 focus:outline-none transition-all"
                    placeholder="https://vimeo.com/... or upload mp4 ->"
                  />
                  <label className="shrink-0 flex items-center justify-center h-12 px-6 rounded-xl bg-white/[0.05] hover:bg-cinematic-orange/20 hover:text-cinematic-orange border border-white/[0.1] hover:border-cinematic-orange/30 cursor-pointer transition-all">
                    {uploading === 'video' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                    <span className="text-xs font-bold uppercase tracking-wider">{uploading === 'video' ? 'Uploading...' : 'Upload Video'}</span>
                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'video')} accept="video/*" />
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Permanent Slug</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-sm text-white/50 focus:border-cinematic-orange/40 focus:outline-none transition-all font-mono"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground/40 font-mono">/portfolio/</div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Story / Description</label>
                <textarea
                  required
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-sm text-white focus:border-cinematic-orange/40 focus:outline-none transition-all leading-relaxed"
                  placeholder="Tell the cinematic story behind this work..."
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 space-y-6">
            <h2 className="font-heading text-lg text-white">Gallery Showcase</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {formData.gallery_images.map((img, idx) => (
                <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-white/[0.1] group">
                  <img src={img} className="h-full w-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, gallery_images: prev.gallery_images.filter((_, i) => i !== idx) }))}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              
              <label className="aspect-video rounded-xl border-2 border-dashed border-white/[0.05] hover:border-cinematic-orange/30 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer bg-white/[0.01] hover:bg-cinematic-orange/[0.02]">
                {uploading === 'gallery' ? <Loader2 className="h-5 w-5 animate-spin text-cinematic-orange" /> : <Plus className="h-5 w-5 text-muted-foreground" />}
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Add Image</span>
                <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'gallery')} accept="image/*" />
              </label>
            </div>
          </section>
        </div>

        {/* Sidebar / Settings Area */}
        <div className="space-y-8">
          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Publish Settings</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">Category</label>
                  <button type="button" onClick={handleCreateCategory} className="text-[10px] font-bold uppercase tracking-widest text-cinematic-orange hover:text-white transition-colors flex items-center gap-1">
                    <Plus className="h-3 w-3" /> New
                  </button>
                </div>
                <select
                  required
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-sm text-white focus:border-cinematic-orange/40 focus:outline-none appearance-none"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-white/[0.04] bg-white/[0.01]">
                <div className="space-y-0.5">
                  <p className="text-xs font-medium text-white">Featured Project</p>
                  <p className="text-[10px] text-muted-foreground">Show on homepage</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}
                  className={`w-10 h-5 rounded-full transition-colors relative ${formData.featured ? 'bg-cinematic-orange' : 'bg-white/10'}`}
                >
                  <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${formData.featured ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Project Cover</h2>
            
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.08] bg-black/40 group">
              {formData.thumbnail ? (
                <>
                  <img src={formData.thumbnail} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <label className="cursor-pointer p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-cinematic-orange hover:text-black transition-all">
                       <Upload className="h-5 w-5" />
                       <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'thumbnail')} accept="image/*" />
                     </label>
                  </div>
                </>
              ) : (
                <label className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white/[0.02] transition-colors">
                  {uploading === 'thumbnail' ? <Loader2 className="h-6 w-6 animate-spin text-cinematic-orange" /> : <Upload className="h-6 w-6 text-muted-foreground/40" />}
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">Upload Thumbnail</span>
                  <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'thumbnail')} accept="image/*" />
                </label>
              )}
            </div>
          </section>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-cinematic-orange py-5 text-sm font-bold text-black transition-all hover:shadow-[0_0_30px_rgba(212,118,60,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            {loading ? 'Archiving...' : 'Publish to Vault'}
          </button>
        </div>
      </form>
    </div>
  );
}
