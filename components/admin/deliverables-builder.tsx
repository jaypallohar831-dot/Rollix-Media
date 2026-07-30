'use client';

import { useState } from 'react';
import { Plus, Trash2, Video, ImageIcon, File, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export type Deliverable = {
  id: string;
  title: string;
  type: 'video' | 'image' | 'document';
  url: string;
  thinking?: string;
  result?: string;
  resultImage?: string;
};

interface DeliverablesBuilderProps {
  deliverables: Deliverable[];
  onChange: (deliverables: Deliverable[]) => void;
}

export function DeliverablesBuilder({ deliverables, onChange }: DeliverablesBuilderProps) {
  const [uploading, setUploading] = useState<boolean>(false);
  const supabase = createClient();

  const handleAdd = () => {
    onChange([
      ...deliverables,
      { id: crypto.randomUUID(), title: '', type: 'video', url: '' },
    ]);
  };

  const handleRemove = (id: string) => {
    onChange(deliverables.filter((d) => d.id !== id));
  };

  const handleUpdate = (id: string, field: keyof Deliverable, value: string) => {
    onChange(
      deliverables.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const folder = 'deliverables';
      const ext = file.name.split('.').pop();
      const filename = `${folder}/${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;

      const { data, error } = await supabase.storage
        .from('media')
        .upload(filename, file, { cacheControl: '3600', upsert: false });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(data.path);

      let type: 'video' | 'image' | 'document' = 'document';
      if (file.type.startsWith('video/')) type = 'video';
      else if (file.type.startsWith('image/')) type = 'image';

      onChange(
        deliverables.map((d) =>
          d.id === id ? { ...d, url: publicUrl, type, title: d.title || file.name.split('.')[0] } : d
        )
      );
    } catch (error: any) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleResultImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const folder = 'deliverables/results';
      const ext = file.name.split('.').pop();
      const filename = `${folder}/${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;

      const { data, error } = await supabase.storage
        .from('media')
        .upload(filename, file, { cacheControl: '3600', upsert: false });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(data.path);

      onChange(
        deliverables.map((d) =>
          d.id === id ? { ...d, resultImage: publicUrl } : d
        )
      );
    } catch (error: any) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const getIcon = (type: string) => {
    if (type === 'video') return <Video className="h-4 w-4 text-blue-500" />;
    if (type === 'image') return <ImageIcon className="h-4 w-4 text-emerald-500" />;
    return <File className="h-4 w-4 text-stone-500" />;
  };

  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-8 space-y-6 shadow-xs">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg text-stone-900 flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-cinematic-orange" />
          Deliverables & Materials
        </h2>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 rounded-lg bg-stone-100 hover:bg-cinematic-orange hover:text-white border border-stone-300 hover:border-cinematic-orange px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-stone-700 transition-all"
        >
          <Plus className="h-3 w-3" />
          Add Item
        </button>
      </div>
      <p className="text-xs text-stone-500 -mt-4">
        Upload multiple videos, images, and graphics produced for this brand.
      </p>

      <div className="space-y-4">
        {deliverables.length === 0 ? (
          <div className="text-center py-8 text-sm text-stone-500 italic border border-dashed border-stone-200 rounded-xl bg-stone-50">
            No deliverables added yet. Start adding materials for this brand.
          </div>
        ) : (
          deliverables.map((item, idx) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-4 bg-stone-50 border border-stone-200 p-4 rounded-xl">
              
              {/* Type Select & File Upload */}
              <div className="flex flex-col gap-3 sm:w-48 shrink-0">
                <div className="flex items-center gap-2">
                  {getIcon(item.type)}
                  <select
                    value={item.type}
                    onChange={(e) => handleUpdate(item.id, 'type', e.target.value)}
                    className="flex-1 bg-transparent text-sm font-semibold text-stone-700 focus:outline-none"
                  >
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                    <option value="document">Document</option>
                  </select>
                </div>
                
                {item.url ? (
                  item.type === 'image' ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={item.url} alt="Preview" className="h-20 w-full object-cover rounded-lg border border-stone-200" />
                  ) : item.type === 'video' ? (
                    <video src={item.url} className="h-20 w-full object-cover rounded-lg border border-stone-200" />
                  ) : (
                    <div className="h-20 w-full flex items-center justify-center bg-stone-100 rounded-lg border border-stone-200">
                      <File className="h-6 w-6 text-stone-400" />
                    </div>
                  )
                ) : (
                  <label className="flex h-20 w-full flex-col items-center justify-center gap-1 cursor-pointer rounded-lg border border-dashed border-stone-300 hover:border-cinematic-orange hover:bg-cinematic-orange/5 transition-colors">
                    {uploading ? <Loader2 className="h-4 w-4 animate-spin text-cinematic-orange" /> : <Plus className="h-4 w-4 text-stone-400" />}
                    <span className="text-[10px] font-bold uppercase text-stone-500">Upload File</span>
                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, item.id)} />
                  </label>
                )}
              </div>

              {/* Details & Actions */}
              <div className="flex-1 flex flex-col gap-3 justify-center">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleUpdate(item.id, 'title', e.target.value)}
                    placeholder="e.g. Stop-Motion Collection Reel"
                    className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none transition-all shadow-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">File URL</label>
                  <input
                    type="text"
                    value={item.url}
                    onChange={(e) => handleUpdate(item.id, 'url', e.target.value)}
                    placeholder="URL (auto-filled on upload)"
                    className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none transition-all shadow-xs"
                  />
                </div>
                
                {/* Advanced Deliverable Strategy Fields (Videos Only) */}
                {item.type === 'video' && (
                  <div className="mt-4 pt-4 border-t border-stone-200/60 grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Behind the Edit / Thinking</label>
                      <textarea
                        value={item.thinking || ''}
                        onChange={(e) => handleUpdate(item.id, 'thinking', e.target.value)}
                        placeholder="e.g. We chose a fast-paced cut to align with Gen-Z attention spans..."
                        className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none transition-all shadow-xs min-h-[60px]"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Result / Impact</label>
                        <input
                          type="text"
                          value={item.result || ''}
                          onChange={(e) => handleUpdate(item.id, 'result', e.target.value)}
                          placeholder="e.g. 50K Views in 24 Hours"
                          className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-stone-900 focus:border-cinematic-orange focus:outline-none transition-all shadow-xs"
                        />
                      </div>
                      
                      <div className="space-y-1 flex flex-col">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone-600 ml-1">Result Photo</label>
                        <div className="flex items-center gap-2 mt-1">
                          {item.resultImage ? (
                            <div className="relative group rounded-lg overflow-hidden border border-stone-200">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={item.resultImage} alt="Result" className="h-10 w-16 object-cover" />
                              <button
                                type="button"
                                onClick={() => handleUpdate(item.id, 'resultImage', '')}
                                className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          ) : (
                            <label className="flex h-10 px-4 items-center justify-center gap-2 cursor-pointer rounded-lg border border-dashed border-stone-300 hover:border-cinematic-orange hover:bg-cinematic-orange/5 bg-white transition-colors w-full sm:w-auto">
                              {uploading ? <Loader2 className="h-3 w-3 animate-spin text-cinematic-orange" /> : <ImageIcon className="h-3 w-3 text-stone-400" />}
                              <span className="text-[10px] font-bold uppercase text-stone-500 whitespace-nowrap">Upload Result Photo</span>
                              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleResultImageUpload(e, item.id)} />
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Remove */}
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  className="p-2.5 rounded-lg text-stone-400 hover:bg-red-50 hover:text-red-600 transition-all"
                  title="Remove Item"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </section>
  );
}
