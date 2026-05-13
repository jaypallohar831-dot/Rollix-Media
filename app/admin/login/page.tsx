'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Authentication failed');
      }

      // Success
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030303] p-6 relative overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cinematic-orange/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-[420px]">
        {/* Logo/Brand Area */}
        <div className="mb-10 text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl mb-4 group transition-all hover:border-cinematic-orange/30">
            <Sparkles className="w-8 h-8 text-cinematic-orange group-hover:scale-110 transition-transform" />
          </div>
          <h1 className="font-heading text-4xl font-light tracking-tight text-white">
            Portal <span className="text-cinematic-orange italic">Login</span>
          </h1>
          <p className="text-muted-foreground text-sm font-light tracking-wide">
            Enter your credentials to access the studio dashboard.
          </p>
        </div>

        {/* Login Form */}
        <div className="group relative">
          {/* Subtle Glow behind the form */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cinematic-orange/20 to-transparent rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          
          <form 
            onSubmit={handleLogin} 
            className="relative space-y-6 rounded-3xl border border-white/[0.1] bg-black/40 p-8 backdrop-blur-2xl shadow-2xl"
          >
            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-medium text-red-400 animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-cinematic-orange transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-12 pr-4 py-4 text-sm text-white placeholder:text-muted-foreground/40 focus:border-cinematic-orange/40 focus:bg-white/[0.05] focus:outline-none transition-all"
                    placeholder="admin@studio.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-cinematic-orange transition-colors" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-12 pr-4 py-4 text-sm text-white placeholder:text-muted-foreground/40 focus:border-cinematic-orange/40 focus:bg-white/[0.05] focus:outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full group overflow-hidden rounded-xl bg-cinematic-orange px-6 py-4 text-sm font-bold text-black transition-all hover:shadow-[0_0_20px_rgba(212,118,60,0.4)] disabled:opacity-50"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  'Authorize Access'
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40">
            &copy; 2026 DIGITAL AGENCY CREATIVE STUDIO
          </p>
        </div>
      </div>
    </div>
  );
}
