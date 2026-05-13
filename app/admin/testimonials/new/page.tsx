'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { 
  Quote, 
  ChevronLeft,
  Check, 
  Loader2, 
  Star,
  Upload,
  User
} from 'lucide-react';

export default function NewTestimonialPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
    avatar_url: '',
    status: 'published'
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('folder', 'testimonials');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData
      });
      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, avatar_url: data.url }));
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('testimonials').insert([formData]);

    setLoading(false);
    if (error) {
      alert('Error creating testimonial: ' + error.message);
    } else {
      router.push('/admin/testimonials');
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
        Back to Testimonials
      </button>

      <div className="mb-12">
        <h1 className="font-heading text-4xl font-light text-white">
          New <span className="text-gradient-warm italic font-medium">Endorsement</span>
        </h1>
        <p className="mt-2 text-muted-foreground font-light">Add a new success story from your cinematic journey.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 space-y-6 backdrop-blur-md">
            <h2 className="font-heading text-lg text-white flex items-center gap-2">
              <Quote className="h-4 w-4 text-cinematic-orange" />
              Testimonial Content
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Client Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-sm text-white focus:border-cinematic-orange/40 focus:outline-none transition-all"
                  placeholder="e.g. Sarah Jenkins"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Role / Title</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-sm text-white focus:border-cinematic-orange/40 focus:outline-none transition-all"
                    placeholder="e.g. Creative Director"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-sm text-white focus:border-cinematic-orange/40 focus:outline-none transition-all"
                    placeholder="e.g. Netflix"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 ml-1">The Praise (Testimonial Text)</label>
                <textarea
                  required
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-sm text-white focus:border-cinematic-orange/40 focus:outline-none transition-all leading-relaxed"
                  placeholder="What did they say about your work?"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Rating & Status</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 ml-1">Star Rating</label>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="transition-transform active:scale-90"
                    >
                      <Star className={`h-6 w-6 ${star <= formData.rating ? 'fill-cinematic-orange text-cinematic-orange' : 'text-white/10'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 ml-1">Publish Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-sm text-white focus:border-cinematic-orange/40 focus:outline-none appearance-none"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Client Avatar</h2>
            
            <div className="relative h-24 w-24 mx-auto rounded-full overflow-hidden border border-white/[0.08] bg-black/40 group">
              {formData.avatar_url ? (
                <>
                  <img src={formData.avatar_url} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <label className="cursor-pointer p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-cinematic-orange hover:text-black transition-all">
                       <Upload className="h-4 w-4" />
                       <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                     </label>
                  </div>
                </>
              ) : (
                <label className="absolute inset-0 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-white/[0.02] transition-colors">
                  {uploading ? <Loader2 className="h-5 w-5 animate-spin text-cinematic-orange" /> : <User className="h-5 w-5 text-muted-foreground/40" />}
                  <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/40">Upload</span>
                  <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
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
            {loading ? 'Submitting...' : 'Save Endorsement'}
          </button>
        </div>
      </form>
    </div>
  );
}
