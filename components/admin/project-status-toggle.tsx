'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface ProjectStatusToggleProps {
  projectId: string;
  currentStatus: string;
}

export function ProjectStatusToggle({ projectId, currentStatus }: ProjectStatusToggleProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  
  const isLive = currentStatus === 'published';

  const handleToggle = async () => {
    setLoading(true);
    const newStatus = isLive ? 'draft' : 'published';
    
    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .update({ status: newStatus })
        .eq('id', projectId);

      if (error) {
        alert('Failed to update status: ' + error.message);
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error('Status update error:', err);
      alert('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleToggle}
      disabled={loading}
      className={`p-2 rounded-lg transition-all disabled:opacity-50 ${
        isLive 
          ? 'text-cinematic-orange hover:bg-cinematic-orange/10' 
          : 'text-stone-400 hover:bg-white/[0.05]'
      }`}
      title={isLive ? 'Set to Draft' : 'Set to Live'}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isLive ? (
        <Eye className="h-4 w-4" />
      ) : (
        <EyeOff className="h-4 w-4" />
      )}
    </button>
  );
}
