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

      router.push('/admin');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 p-6 relative overflow-hidden text-stone-900">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cinematic-orange/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-[420px]">
        {/* Logo/Brand Area */}
        <div className="mb-10 text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white border border-stone-200 shadow-sm mb-2">
            <Sparkles className="w-8 h-8 text-cinematic-orange" />
          </div>
          <h1 className="font-heading text-4xl font-light tracking-tight text-stone-900">
            Portal <span className="text-cinematic-orange italic font-medium">Login</span>
          </h1>
          <p className="text-stone-500 text-sm font-light tracking-wide">
            Enter your credentials to access the studio dashboard.
          </p>
        </div>

        {/* Login Form */}
        <div className="group relative">
          <form 
            onSubmit={handleLogin} 
            className="relative space-y-6 rounded-3xl border border-stone-200 bg-white p-8 shadow-lg"
          >
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-cinematic-orange transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 bg-white pl-12 pr-4 py-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-cinematic-orange focus:outline-none transition-all shadow-xs"
                    placeholder="admin@studio.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-cinematic-orange transition-colors" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 bg-white pl-12 pr-4 py-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-cinematic-orange focus:outline-none transition-all shadow-xs"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full overflow-hidden rounded-xl bg-cinematic-orange px-6 py-4 text-sm font-bold text-white transition-all hover:bg-stone-900 shadow-md disabled:opacity-50"
            >
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
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">
            &copy; 2026 DIGITAL AGENCY CREATIVE STUDIO
          </p>
        </div>
      </div>
    </div>
  );
}
