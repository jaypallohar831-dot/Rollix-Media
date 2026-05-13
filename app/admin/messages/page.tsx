import { createClient } from '@/lib/supabase/server';
import { MessageList } from '@/components/admin/message-list';

export const dynamic = 'force-dynamic';

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  
  // Fetch messages from Supabase
  const { data: messages, error } = await supabase
    .from('contact_leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-400">
        <p className="font-bold">System Error:</p>
        <p className="opacity-80">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <MessageList initialMessages={messages || []} />
    </div>
  );
}

