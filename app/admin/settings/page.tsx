'use client';

import { useState } from 'react';
import { Globe, Mail, Shield, Lock } from 'lucide-react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'email' | 'security'>('general');

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.02] border border-white/[0.08] p-8 rounded-3xl backdrop-blur-md">
        <div>
          <h1 className="font-heading text-4xl font-light tracking-tight text-white">
            Site <span className="text-gradient-warm italic font-medium">Settings</span>
          </h1>
          <p className="mt-2 text-muted-foreground font-light tracking-wide">
            Manage your studio&rsquo;s global configuration and preferences.
          </p>
        </div>
        <button 
          type="button"
          disabled
          className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 py-3 text-sm font-bold text-white/50"
        >
          <Lock className="h-4 w-4" />
          Read Only
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Navigation / Sections */}
        <div className="lg:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('general')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'general' ? 'bg-white/[0.05] border border-white/[0.1] text-white' : 'hover:bg-white/[0.02] text-muted-foreground hover:text-white border border-transparent'}`}
          >
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">General Information</span>
          </button>
          <button 
            onClick={() => setActiveTab('email')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'email' ? 'bg-white/[0.05] border border-white/[0.1] text-white' : 'hover:bg-white/[0.02] text-muted-foreground hover:text-white border border-transparent'}`}
          >
            <Mail className="h-4 w-4" />
            <span className="text-sm">Email & Notifications</span>
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'security' ? 'bg-white/[0.05] border border-white/[0.1] text-white' : 'hover:bg-white/[0.02] text-muted-foreground hover:text-white border border-transparent'}`}
          >
            <Shield className="h-4 w-4" />
            <span className="text-sm">Security & Access</span>
          </button>
        </div>

        {/* Settings Form */}
        <div className="lg:col-span-2 space-y-8">
          
          {activeTab === 'general' && (
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.01] p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-heading text-2xl text-white mb-6">General Information</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Studio Name</label>
                  <input 
                    type="text" 
                    defaultValue="Rollix Media"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-white placeholder-white/20 outline-none transition-all focus:border-cinematic-orange/50 focus:bg-white/[0.05]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Contact Email</label>
                  <input 
                    type="email" 
                    defaultValue="jaypallohar831@gmail.com"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-white placeholder-white/20 outline-none transition-all focus:border-cinematic-orange/50 focus:bg-white/[0.05]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Contact Phone</label>
                  <input 
                    type="tel" 
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-white placeholder-white/20 outline-none transition-all focus:border-cinematic-orange/50 focus:bg-white/[0.05]"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">SEO Description</label>
                  <textarea 
                    rows={4}
                    defaultValue="Premium cinematic wedding films and visual storytelling."
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-white placeholder-white/20 outline-none transition-all focus:border-cinematic-orange/50 focus:bg-white/[0.05] resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.01] p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-heading text-2xl text-white mb-6">Email & Notifications</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">SMTP Host</label>
                  <input type="text" placeholder="smtp.gmail.com" className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-white placeholder-white/20 outline-none focus:border-cinematic-orange/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">SMTP Port</label>
                  <input type="text" placeholder="587" className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-white placeholder-white/20 outline-none focus:border-cinematic-orange/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Notification Email Addresses</label>
                  <input type="text" defaultValue="jaypallohar831@gmail.com" className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-white placeholder-white/20 outline-none focus:border-cinematic-orange/50" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border border-white/[0.04] bg-white/[0.01]">
                  <div>
                    <p className="text-sm font-medium text-white">Receive Enquiry Alerts</p>
                    <p className="text-xs text-muted-foreground">Get notified when someone fills the contact form</p>
                  </div>
                  <button className="w-10 h-5 rounded-full bg-cinematic-orange relative">
                    <div className="absolute top-1 left-6 w-3 h-3 rounded-full bg-white" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.01] p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-heading text-2xl text-white mb-6">Security & Access</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Admin Password</label>
                  <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-white placeholder-white/20 outline-none focus:border-cinematic-orange/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-white placeholder-white/20 outline-none focus:border-cinematic-orange/50" />
                </div>
                <div className="pt-4 border-t border-white/[0.08]">
                  <p className="text-sm text-muted-foreground mb-4">Password and two-factor changes are managed through Supabase authentication.</p>
                  <button disabled className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm text-white/40">
                    Two-Factor Controls Unavailable
                  </button>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
