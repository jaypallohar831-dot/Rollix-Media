'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Mail, Phone, Calendar, MessageSquare, Trash2, CheckCircle2, Loader2, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service_interest?: string;
  message: string;
  status: string;
  created_at: string;
}

export function MessageList({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [loading, setLoading] = useState<string | null>(null); // message.id if loading an action
  const [refreshing, setRefreshing] = useState(false);
  const supabase = createClient();

  const handleRefresh = async () => {
    setRefreshing(true);
    const { data } = await supabase
      .from('contact_leads')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setMessages(data);
    setRefreshing(false);
  };

  const markAsRead = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'read' ? 'new' : 'read';
    setLoading(id);
    
    const { error } = await supabase
      .from('contact_leads')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
    } else {
      alert('Failed to update status: ' + error.message);
    }
    setLoading(null);
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) return;
    
    setLoading(id);
    const { error } = await supabase
      .from('contact_leads')
      .delete()
      .eq('id', id);

    if (!error) {
      setMessages(prev => prev.filter(m => m.id !== id));
    } else {
      alert('Failed to delete message: ' + error.message);
    }
    setLoading(null);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.02] border border-white/[0.08] p-8 rounded-3xl backdrop-blur-md">
        <div>
          <h1 className="font-heading text-4xl font-light tracking-tight text-white">
            Client <span className="text-gradient-warm italic font-medium">Enquiries</span>
          </h1>
          <p className="mt-2 text-stone-300 font-light tracking-wide">
            You have <span className="text-white font-medium">{messages.length}</span> messages from potential clients.
          </p>
        </div>
        <button 
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 rounded-xl bg-white/[0.05] border border-white/[0.1] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/[0.1] disabled:opacity-50"
        >
          <RefreshCcw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <motion.div 
                layout
                key={msg.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`relative rounded-3xl border transition-all duration-300 p-6 sm:p-8 ${
                  msg.status === 'read' 
                    ? 'border-white/[0.04] bg-white/[0.005] opacity-70 hover:opacity-100' 
                    : 'border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex flex-col lg:flex-row gap-8 justify-between">
                  
                  {/* Client Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between lg:justify-start gap-4">
                      <h3 className="font-heading text-2xl text-white">{msg.name}</h3>
                      <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                        msg.status === 'read'
                          ? 'border-white/10 bg-white/5 text-white/40'
                          : 'border-cinematic-orange/30 bg-cinematic-orange/10 text-cinematic-orange'
                      }`}>
                        {msg.status || 'New'}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 opacity-50" />
                        <a href={`mailto:${msg.email}`} className="hover:text-white transition-colors">{msg.email}</a>
                      </div>
                      {msg.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 opacity-50" />
                          <a href={`tel:${msg.phone}`} className="hover:text-white transition-colors">{msg.phone}</a>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 opacity-50" />
                        <span className="text-stone-400">{new Date(msg.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.05]">
                      <div className="mb-2 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                        Service Interest: <span className="text-white/80">{msg.service_interest || 'General'}</span>
                      </div>
                      <p className="text-stone-300 leading-relaxed font-light whitespace-pre-wrap">
                        {msg.message || "No message provided."}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-3 justify-end items-end border-t border-white/[0.05] lg:border-t-0 lg:border-l lg:pl-8 pt-6 lg:pt-0 min-w-[140px]">
                    <button 
                      onClick={() => markAsRead(msg.id, msg.status)}
                      disabled={loading === msg.id}
                      className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm transition-all w-full justify-center disabled:opacity-50 ${
                        msg.status === 'read'
                          ? 'border-white/[0.1] bg-white/[0.02] text-white/40 hover:text-white'
                          : 'border-white/[0.08] bg-white/[0.02] text-white/70 hover:bg-white/[0.06] hover:text-white'
                      }`}
                    >
                      {loading === msg.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                      <span className="hidden sm:inline">{msg.status === 'read' ? 'Mark Unread' : 'Mark Read'}</span>
                    </button>
                    <button 
                      onClick={() => deleteMessage(msg.id)}
                      disabled={loading === msg.id}
                      className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all w-full justify-center disabled:opacity-50"
                    >
                      {loading === msg.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                  
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center rounded-3xl border border-white/[0.08] bg-white/[0.01]"
            >
              <div className="mb-6 rounded-full bg-white/[0.02] p-6 text-muted-foreground/20 border border-white/[0.05]">
                <MessageSquare className="h-12 w-12" />
              </div>
              <h3 className="mb-2 font-heading text-2xl text-white font-light">No Enquiries Yet</h3>
              <p className="max-w-sm text-sm text-muted-foreground font-light leading-relaxed">
                When clients submit the contact form on your website, their messages will appear here.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
