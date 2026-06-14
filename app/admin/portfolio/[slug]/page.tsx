'use client';

import { useState, useEffect, use, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/database.types';
import VideoThumbnailPicker from '@/components/admin/video-thumbnail-picker';
import { CrewBuilder, type CrewMember } from '@/components/admin/crew-builder';
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
    crew: [] as CrewMember[]
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
          crew: project.crew || []
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
      const sigRes = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder: type === 'video' ? 'videos' : 'portfolio' })
      });
      const sigData = await sigRes.json();
      
      if (!sigData.success) {
        throw new Error(sigData.error || 'Failed to get upload signature');
      }

      const uploadData = new FormData();
      uploadData.append('api_key', sigData.apiKey);
      uploadData.append('timestamp', sigData.timestamp);
      uploadData.append('signature', sigData.signature);
      uploadData.append('folder', sigData.folder);
      uploadData.append('file', file);

      const resourceType = type === 'video' ? 'video' : 'auto';
      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${sigData.cloudName}/${resourceType}/upload`, {
        method: 'POST',
        body: uploadData
      });
      const uploadResult = await uploadRes.json();

      if (uploadResult.error) {
        throw new Error(uploadResult.error.message || 'Cloudinary upload failed');
      }

      if (uploadResult.secure_url) {
        let finalUrl = uploadResult.secure_url;
        
        // Apply Rollix Media watermark and Project Title in the center for videos
        if (type === 'video') {
          const safeTitle = encodeURIComponent(formData.title || 'Rollix Media Project')
            .replace(/%2C/gi, '%252C')
            .replace(/%2F/gi, '%252F');
          const watermarkTransform = `l_rollix_logo/c_scale,w_300/fl_layer_apply,g_center,y_-35/l_text:Playfair%20Display_50_bold_center:${safeTitle},c_fit,w_300,co_white/fl_layer_apply,g_center,y_105`;
          finalUrl = finalUrl.replace('/upload/', `/upload/${watermarkTransform}/`);
        }

        if (type === 'thumbnail') {
          setFormData(prev => ({ ...prev, thumbnail: finalUrl }));
        } else if (type === 'video') {
          setFormData(prev => ({ ...prev, video_url: finalUrl }));
        } else {
          setFormData(prev => ({ ...prev, gallery_images: [...prev.gallery_images, finalUrl] }));
        }
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
          Edit <span className="text-gradient-warm italic font-medium">Work</span>
        </h1>
        <p className="mt-2 text-muted-foreground font-light">Update the details for &ldquo;{formData.title}&rdquo;.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                      // Only auto-update if field is empty or was previously auto-generated
                      seo_title: prev.seo_title === `${prev.title} — Rollix Media Portfolio` || !prev.seo_title ? autoSeoTitle : prev.seo_title,
                      seo_description: !prev.seo_description ? autoSeoDesc : prev.seo_description,
                    }));
                  }}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-sm text-white focus:border-cinematic-orange/40 focus:outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Date / Month</label>
                  <input
                    type="text"
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-sm text-white focus:border-cinematic-orange/40 focus:outline-none transition-all"
                    placeholder="e.g. October 2023"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Video Source</label>
                <div className="flex gap-4 items-center">
                  <div className="relative flex-1">
                    <Video className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                    <input
                      type="text"
                      value={formData.video_url}
                      onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-5 py-4 text-sm text-white focus:border-cinematic-orange/40 focus:outline-none transition-all"
                      placeholder="Cloudinary URL or /assets/... mp4"
                    />
                  </div>
                  <label className="shrink-0 flex items-center justify-center h-12 px-6 rounded-xl bg-white/[0.05] hover:bg-cinematic-orange/20 hover:text-cinematic-orange border border-white/[0.1] hover:border-cinematic-orange/30 cursor-pointer transition-all">
                    {uploading === 'video' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                    <span className="text-xs font-bold uppercase tracking-wider">{uploading === 'video' ? 'Uploading...' : 'Upload Video'}</span>
                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'video')} accept="video/*" />
                  </label>
                </div>
                {formData.video_url && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-white/[0.1] bg-black aspect-video max-w-sm">
                    <video 
                      src={formData.video_url} 
                      className="h-full w-full object-cover"
                      controls
                      muted
                    />
                  </div>
                )}
              </div>

              {/* Video Thumbnail Picker — appears when video URL is set */}
              {formData.video_url && (
                <VideoThumbnailPicker
                  videoUrl={formData.video_url}
                  onThumbnailCaptured={(url) => setFormData(prev => ({ ...prev, thumbnail: url }))}
                />
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Story / Description</label>
                <textarea
                  required
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-sm text-white focus:border-cinematic-orange/40 focus:outline-none transition-all leading-relaxed"
                />
              </div>
            </div>
          </section>

          <CrewBuilder 
            crew={formData.crew} 
            onChange={(crew) => setFormData(prev => ({ ...prev, crew }))} 
          />

          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 space-y-6">
            <h2 className="font-heading text-lg text-white">Gallery Showcase</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
{formData.gallery_images.map((img, idx) => (
                 <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-white/[0.1] group">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src={img} alt={`Gallery image ${idx + 1}`} className="h-full w-full object-cover" />
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

        <div className="space-y-8">
          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Publish Settings</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 ml-1">Category</label>
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

          {/* SEO Preview Card */}
          {formData.title && (
            <section className="rounded-3xl border border-green-500/20 bg-green-500/[0.03] p-6 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-green-400/70 flex items-center gap-2">
                <span>🔍</span> Google Preview
              </h2>
              <div className="space-y-1">
                <p className="text-[11px] text-blue-400 truncate">{`rollixmedia.vercel.app/portfolio/${slug}`}</p>
                <p className="text-sm font-medium text-white leading-tight line-clamp-1">{formData.seo_title || `${formData.title} — Rollix Media Portfolio`}</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{formData.seo_description}</p>
              </div>
            </section>
          )}

          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Project Cover</h2>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.08] bg-black/40 group">
              {formData.thumbnail ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={formData.thumbnail} alt="Project cover" className="h-full w-full object-cover" />
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
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
