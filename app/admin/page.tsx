import { 
  Film, 
  Users, 
  MessageSquare, 
  ArrowUpRight, 
  Plus,
  TrendingUp,
  Activity,
  Zap,
  type LucideIcon
} from 'lucide-react';
import Link from 'next/link';
import { requireAdminOrRedirect } from '@/lib/admin-auth';
import type { Database } from '@/types/database.types';

type ContactLead = Database['public']['Tables']['contact_leads']['Row'];

export default async function AdminDashboardPage() {
  const { supabase } = await requireAdminOrRedirect();

  const [
    { count: projectsCount },
    { count: servicesCount },
    { count: testimonialsCount },
    { count: leadsCount },
    { data: recentLeads }
  ] = await Promise.all([
    supabase.from('portfolio_projects').select('*', { count: 'exact', head: true }),
    supabase.from('services').select('*', { count: 'exact', head: true }),
    supabase.from('testimonials').select('*', { count: 'exact', head: true }),
    supabase.from('contact_leads').select('*', { count: 'exact', head: true }),
    supabase.from('contact_leads').select('*').order('created_at', { ascending: false }).limit(4)
  ]);

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.02] border border-white/[0.08] p-8 rounded-3xl backdrop-blur-md">
        <div>
          <h1 className="font-heading text-4xl font-light tracking-tight text-white">
            Studio <span className="text-gradient-warm italic font-medium">Control</span>
          </h1>
          <p className="mt-2 text-stone-300 font-light tracking-wide">
            Connected to Supabase Cluster: <span className="text-cinematic-orange/80">Active</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            href="/admin/portfolio/new" 
            className="flex items-center gap-2 rounded-xl bg-cinematic-orange px-6 py-3 text-sm font-bold text-black transition-all hover:shadow-[0_0_20px_rgba(212,118,60,0.3)] hover:scale-[1.02]"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Link>
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Projects" value={projectsCount?.toString() || "0"} icon={Film} trend="+0%" />
        <StatCard title="Services" value={servicesCount?.toString() || "0"} icon={Zap} />
        <StatCard title="Client Base" value={testimonialsCount?.toString() || "0"} icon={Users} />
        <StatCard title="New Leads" value={leadsCount?.toString() || "0"} icon={MessageSquare} highlight />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Recent Inquiries List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Activity className="h-5 w-5 text-blue-400" />
                </div>
                <h2 className="font-heading text-xl text-white">Recent Activity</h2>
              </div>
              <Link href="/admin/messages" className="text-xs font-bold uppercase tracking-widest text-cinematic-orange hover:underline">
                View All
              </Link>
            </div>

            {recentLeads && recentLeads.length > 0 ? (
              <div className="space-y-4">
                {recentLeads.map((lead: ContactLead) => (
                  <div key={lead.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors gap-4">
                    <div>
                      <h4 className="text-white font-medium">{lead.name}</h4>
                      <p className="text-sm text-stone-300 line-clamp-1 mt-1">{lead.message || "No message provided."}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-medium shrink-0">
                      <span className="text-cinematic-orange uppercase tracking-wider">{lead.status || 'New'}</span>
                      <span className="text-muted-foreground/50">{new Date(lead.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/[0.1] rounded-2xl bg-white/[0.01]">
                <div className="p-4 rounded-full bg-white/[0.03] mb-4">
                  <MessageSquare className="h-8 w-8 text-muted-foreground/40" />
                </div>
                <p className="text-stone-300 text-sm font-light">No recent inquiries found.</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground/30 mt-2">Database is waiting for first entry</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Management */}
        <div className="space-y-8">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8">
            <h2 className="mb-6 font-heading text-lg text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-cinematic-orange" />
              Quick Actions
            </h2>
            <div className="space-y-4">
              <QuickAction href="/admin/portfolio" label="Manage Portfolio" />
              <QuickAction href="/admin/services" label="Service Catalog" />
              <QuickAction href="/admin/testimonials" label="Client Reviews" />
              <QuickAction href="/admin/settings" label="Site Configuration" />
            </div>
          </div>

          {/* System Health */}
          <div className="rounded-3xl border border-white/[0.08] bg-black/40 p-8">
            <h2 className="mb-6 font-heading text-sm uppercase tracking-widest text-white">System Status</h2>
            <div className="space-y-4">
              <StatusItem label="Supabase DB" status="Online" color="bg-green-500" />
              <StatusItem label="Cloudinary API" status="Configured" color="bg-cinematic-orange" />
              <StatusItem label="Edge Runtime" status="Stable" color="bg-blue-500" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, highlight = false, trend }: { title: string, value: string, icon: LucideIcon, highlight?: boolean, trend?: string }) {
  return (
    <div className={`group relative rounded-3xl border p-8 transition-all duration-500 hover:scale-[1.02] ${
      highlight 
        ? 'border-cinematic-orange/30 bg-cinematic-orange/[0.03] shadow-[0_0_30px_rgba(212,118,60,0.05)]' 
        : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04]'
    }`}>
      <div className="mb-6 flex items-center justify-between">
        <div className={`p-3 rounded-2xl ${highlight ? 'bg-cinematic-orange/10' : 'bg-white/[0.05]'}`}>
          <Icon className={`h-6 w-6 ${highlight ? 'text-cinematic-orange' : 'text-muted-foreground/60'}`} />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">{title}</h3>
        <p className="text-4xl font-bold tracking-tight text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

function QuickAction({ href, label }: { href: string, label: string }) {
  return (
    <Link 
      href={href}
      className="group flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.02] px-5 py-4 text-sm text-foreground transition-all duration-300 hover:border-cinematic-orange/30 hover:bg-cinematic-orange/[0.02]"
    >
      <span className="font-light tracking-wide group-hover:text-white transition-colors">{label}</span>
      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-cinematic-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

function StatusItem({ label, status, color }: { label: string, status: string, color: string }) {
  return (
    <div className="flex items-center justify-between p-1">
      <span className="text-xs text-muted-foreground/80">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-medium text-white/90">{status}</span>
        <div className={`h-1.5 w-1.5 rounded-full ${color} animate-pulse shadow-[0_0_8px_currentColor]`} />
      </div>
    </div>
  );
}
