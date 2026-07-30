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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white border border-stone-200 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xs">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl font-light tracking-tight text-stone-900">
            Studio <span className="text-gradient-warm italic font-medium">Control</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-stone-500 font-light tracking-wide">
            Connected to Supabase Cluster: <span className="text-cinematic-orange font-medium">Active</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            href="/admin/portfolio/new" 
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cinematic-orange px-5 py-3 text-xs sm:text-sm font-bold text-white transition-all hover:bg-stone-900 shadow-md hover:scale-[1.02] shrink-0"
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
          <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-xs">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50">
                  <Activity className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="font-heading text-xl text-stone-900">Recent Activity</h2>
              </div>
              <Link href="/admin/messages" className="text-xs font-bold uppercase tracking-widest text-cinematic-orange hover:underline">
                View All
              </Link>
            </div>

            {recentLeads && recentLeads.length > 0 ? (
              <div className="space-y-4">
                {recentLeads.map((lead: ContactLead) => (
                  <div key={lead.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:bg-stone-100/80 transition-colors gap-4">
                    <div>
                      <h4 className="text-stone-900 font-semibold">{lead.name}</h4>
                      <p className="text-sm text-stone-600 line-clamp-1 mt-1">{lead.message || "No message provided."}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-medium shrink-0">
                      <span className="text-cinematic-orange font-bold uppercase tracking-wider">{lead.status || 'New'}</span>
                      <span className="text-stone-400">{new Date(lead.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 border border-dashed border-stone-200 rounded-2xl bg-stone-50/50">
                <div className="p-4 rounded-full bg-stone-100 mb-4">
                  <MessageSquare className="h-8 w-8 text-stone-400" />
                </div>
                <p className="text-stone-600 text-sm font-medium">No recent inquiries found.</p>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 mt-2">Database is waiting for first entry</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Management */}
        <div className="space-y-8">
          <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-xs">
            <h2 className="mb-6 font-heading text-lg text-stone-900 flex items-center gap-2">
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
          <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-xs">
            <h2 className="mb-6 font-heading text-sm uppercase tracking-widest text-stone-900">System Status</h2>
            <div className="space-y-4">
              <StatusItem label="Supabase DB" status="Online" color="bg-green-500" />
              <StatusItem label="Supabase Storage" status="Connected" color="bg-green-500" />
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
    <div className={`group relative rounded-3xl border p-8 transition-all duration-300 hover:shadow-md ${
      highlight 
        ? 'border-cinematic-orange/40 bg-cinematic-orange/[0.04]' 
        : 'border-stone-200 bg-white hover:border-stone-300'
    }`}>
      <div className="mb-6 flex items-center justify-between">
        <div className={`p-3 rounded-2xl ${highlight ? 'bg-cinematic-orange/15' : 'bg-stone-100'}`}>
          <Icon className={`h-6 w-6 ${highlight ? 'text-cinematic-orange' : 'text-stone-600'}`} />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 mb-2">{title}</h3>
        <p className="text-4xl font-bold tracking-tight text-stone-900">
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
      className="group flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50/60 px-5 py-4 text-sm text-stone-800 transition-all duration-300 hover:border-cinematic-orange/40 hover:bg-white hover:shadow-xs"
    >
      <span className="font-medium tracking-wide group-hover:text-cinematic-orange transition-colors">{label}</span>
      <ArrowUpRight className="h-4 w-4 text-stone-400 transition-all group-hover:text-cinematic-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

function StatusItem({ label, status, color }: { label: string, status: string, color: string }) {
  return (
    <div className="flex items-center justify-between p-1">
      <span className="text-xs font-medium text-stone-600">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold text-stone-900">{status}</span>
        <div className={`h-2 w-2 rounded-full ${color} animate-pulse`} />
      </div>
    </div>
  );
}
