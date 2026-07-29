'use client';

import { useState } from 'react';
import { Globe, Mail, Shield, Lock } from 'lucide-react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'email' | 'security'>('general');

  return (
    <div className="space-y-10 pb-20 text-stone-900">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border border-stone-200 p-8 rounded-3xl shadow-xs">
        <div>
          <h1 className="font-heading text-4xl font-light tracking-tight text-stone-900">
            Site <span className="text-gradient-warm italic font-medium">Settings</span>
          </h1>
          <p className="mt-2 text-stone-500 font-light tracking-wide">
            Manage your studio&rsquo;s global configuration and preferences.
          </p>
        </div>
        <button 
          type="button"
          disabled
          className="flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-100 px-6 py-3 text-sm font-bold text-stone-500 cursor-not-allowed"
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
            className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-medium transition-all ${activeTab === 'general' ? 'bg-white border border-stone-200 text-stone-900 shadow-xs font-semibold' : 'hover:bg-white/60 text-stone-600 border border-transparent'}`}
          >
            <Globe className="h-4 w-4 text-cinematic-orange" />
            <span className="text-sm font-medium">General Information</span>
          </button>
          <button 
            onClick={() => setActiveTab('email')}
            className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-medium transition-all ${activeTab === 'email' ? 'bg-white border border-stone-200 text-stone-900 shadow-xs font-semibold' : 'hover:bg-white/60 text-stone-600 border border-transparent'}`}
          >
            <Mail className="h-4 w-4 text-cinematic-orange" />
            <span className="text-sm">Email & Notifications</span>
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-medium transition-all ${activeTab === 'security' ? 'bg-white border border-stone-200 text-stone-900 shadow-xs font-semibold' : 'hover:bg-white/60 text-stone-600 border border-transparent'}`}
          >
            <Shield className="h-4 w-4 text-cinematic-orange" />
            <span className="text-sm">Security & Access</span>
          </button>
        </div>

        {/* Settings Form */}
        <div className="lg:col-span-2 space-y-8">
          
          {activeTab === 'general' && (
            <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-xs animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-heading text-2xl text-stone-900 mb-6">General Information</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 ml-1">Studio Name</label>
                  <input 
                    type="text" 
                    defaultValue="Rollix Media"
                    className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3.5 text-stone-900 outline-none transition-all focus:border-cinematic-orange shadow-xs"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 ml-1">Contact Email</label>
                  <input 
                    type="email" 
                    defaultValue="jaypallohar831@gmail.com"
                    className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3.5 text-stone-900 outline-none transition-all focus:border-cinematic-orange shadow-xs"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 ml-1">Contact Phone</label>
                  <input 
                    type="tel" 
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3.5 text-stone-900 outline-none transition-all focus:border-cinematic-orange shadow-xs"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 ml-1">SEO Description</label>
                  <textarea 
                    rows={4}
                    defaultValue="Premium cinematic wedding films and visual storytelling."
                    className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3.5 text-stone-900 outline-none transition-all focus:border-cinematic-orange resize-none shadow-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-xs animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-heading text-2xl text-stone-900 mb-6">Email & Notifications</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 ml-1">SMTP Host</label>
                  <input type="text" placeholder="smtp.gmail.com" className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3.5 text-stone-900 outline-none focus:border-cinematic-orange shadow-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 ml-1">SMTP Port</label>
                  <input type="text" placeholder="587" className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3.5 text-stone-900 outline-none focus:border-cinematic-orange shadow-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 ml-1">Notification Email Addresses</label>
                  <input type="text" defaultValue="jaypallohar831@gmail.com" className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3.5 text-stone-900 outline-none focus:border-cinematic-orange shadow-xs" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border border-stone-200 bg-stone-50">
                  <div>
                    <p className="text-sm font-semibold text-stone-900">Receive Enquiry Alerts</p>
                    <p className="text-xs text-stone-500">Get notified when someone fills the contact form</p>
                  </div>
                  <button className="w-10 h-5 rounded-full bg-cinematic-orange relative">
                    <div className="absolute top-1 left-6 w-3 h-3 rounded-full bg-white" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-xs animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-heading text-2xl text-stone-900 mb-6">Security & Access</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 ml-1">Admin Password</label>
                  <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3.5 text-stone-900 outline-none focus:border-cinematic-orange shadow-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 ml-1">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3.5 text-stone-900 outline-none focus:border-cinematic-orange shadow-xs" />
                </div>
                <div className="pt-4 border-t border-stone-200">
                  <p className="text-sm text-stone-500 mb-4">Password and two-factor changes are managed through Supabase authentication.</p>
                  <button disabled className="rounded-xl border border-stone-200 bg-stone-100 px-4 py-2 text-sm text-stone-400 font-medium">
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
