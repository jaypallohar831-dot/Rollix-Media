'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

interface DeleteTestimonialButtonProps {
  id: string;
  name: string;
}

export function DeleteTestimonialButton({ id, name }: DeleteTestimonialButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the testimonial from "${name}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete testimonial');
      }

      router.refresh();
    } catch (error) {
      console.error('Delete error:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete testimonial');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 rounded-lg text-muted-foreground hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
      title="Delete testimonial"
    >
      <Trash2 className={`h-4 w-4 ${isDeleting ? 'animate-pulse' : ''}`} />
    </button>
  );
}
