'use client';

import { useState, useEffect } from 'react';
import { Container, Section } from '@/components/layout';
import {
  Check,
  Loader2,
  AlertCircle,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  MessageSquare
} from 'lucide-react';
import { servicesService } from '@/services/services.service';
import type { Service } from '@/services/services.service';
import { cn } from '@/lib/utils';

export default function ContactPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_interest: '',
    message: '',
  });
  // Honeypot field – invisible to real users, bots auto-fill it
  const [honeypot, setHoneypot] = useState('');

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await servicesService.getServices();
        if (data) setServices(data);
      } catch (err) {
        console.error('Failed to load services:', err);
      }
    }
    loadServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, website: honeypot }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', service_interest: '', message: '' });
    } catch (err: unknown) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/rollixmedia', color: 'hover:text-pink-500' },
    { name: 'WhatsApp', icon: MessageSquare, href: 'https://wa.me/919024675831', color: 'hover:text-green-500' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/rollixmedia', color: 'hover:text-blue-400' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/rollix-media', color: 'hover:text-blue-700' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@rollixmedia', color: 'hover:text-red-600' },
  ];

  return (
    <main className="relative min-h-screen pt-32 sm:pt-40 lg:pt-48">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cinematic-orange/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cinematic-orange/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>

      <Container size="wide" className="relative z-10 mb-20 sm:mb-28 lg:mb-32">
        <div className="mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-cinematic-orange/80">
            <span className="h-[1px] w-6 bg-cinematic-orange/40" />
            Connect
          </span>
        </div>

        <h1 className="font-heading text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-foreground">
          Tell Your <span className="text-gradient-warm italic">Cinematic Story</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          We take on a select number of weddings and luxury brand projects each year to ensure every film receives the cinematic craftsmanship it deserves.
        </p>
      </Container>

      <Section spacing="none" className="relative z-10 pb-32 sm:pb-40">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Contact Form */}
            <div className="rounded-3xl border border-white/[0.06] bg-white/[0.015] p-8 sm:p-12 backdrop-blur-sm">
              {status === 'success' ? (
                <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cinematic-orange/10 text-cinematic-orange">
                    <Check className="h-10 w-10" />
                  </div>
                  <h2 className="font-heading text-3xl text-white">Inquiry Sent</h2>
                  <p className="mt-4 max-w-sm text-muted-foreground">
                    Thank you for reaching out. Our creative team will review your vision and get back to you within 48 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-10 text-[11px] font-bold uppercase tracking-[0.2em] text-cinematic-orange hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                  {/* Honeypot – hidden from real users, catches bots */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="border-b border-white/[0.1] bg-transparent py-2 text-lg text-white transition-all focus:border-cinematic-orange focus:outline-none"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border-b border-white/[0.1] bg-transparent py-2 text-lg text-white transition-all focus:border-cinematic-orange focus:outline-none"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="border-b border-white/[0.1] bg-transparent py-2 text-lg text-white transition-all focus:border-cinematic-orange focus:outline-none"
                        placeholder="+91 00000-00000"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Service of Interest</label>
                      <div className="relative">
                        <select
                          required
                          value={formData.service_interest}
                          onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
                          className="w-full border-b border-white/[0.1] bg-transparent py-2 text-lg text-white transition-all focus:border-cinematic-orange focus:outline-none appearance-none cursor-pointer pr-10"
                        >
                          <option value="" className="bg-[#0a0a0a]">Select a service</option>
                          {services.map(service => (
                            <option key={service.id} value={service.title} className="bg-[#0a0a0a]">
                              {service.title}
                            </option>
                          ))}
                          {services.length === 0 && (
                            <>
                              <option value="Wedding Film" className="bg-[#0a0a0a]">Wedding Film</option>
                              <option value="Commercial Ad" className="bg-[#0a0a0a]">Commercial Ad</option>
                              <option value="Brand Story" className="bg-[#0a0a0a]">Brand Story</option>
                              <option value="Photography" className="bg-[#0a0a0a]">Photography</option>
                            </>
                          )}
                        </select>
                        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-white/40">
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 ml-1">Project Vision</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-[120px] resize-none border-b border-white/[0.1] bg-transparent py-2 text-lg text-white transition-all focus:border-cinematic-orange focus:outline-none"
                      placeholder="Tell us about your cinematic vision..."
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/5 p-4 rounded-xl border border-red-400/10">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <p>{errorMessage}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full border border-cinematic-orange/30 bg-cinematic-orange/10 px-10 text-[11px] font-bold uppercase tracking-[0.3em] text-cinematic-orange transition-all duration-500 hover:bg-cinematic-orange hover:text-black disabled:opacity-50"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Deliver Inquiry'
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-16 lg:pt-12">
              <div className="space-y-10">
                <div>
                  <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-cinematic-orange/80">
                    Location
                  </h3>
                  <p className="text-xl leading-relaxed text-white/70 font-light">
                    Available world wide
                    <br />
                    Bhilwara IN , 311001
                  </p>
                </div>

                <div>
                  <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-cinematic-orange/80">
                    Inquiries
                  </h3>
                  <p className="text-xl leading-relaxed text-white/70 font-light underline-offset-4 decoration-cinematic-orange/30">
                    <a href="mailto:rollixmedia@gmail.com" className="hover:text-white transition-colors">rollixmedia@gmail.com</a><br />
                    <a href="tel:+919024675831" className="hover:text-white transition-colors">+91 9024675831</a><br />
                    <a href="tel:+919351775546" className="hover:text-white transition-colors">+91 93517 75546</a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-cinematic-orange/80">
                  Follow the Story
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "group flex items-center gap-4 text-xl font-light text-white/70 transition-all duration-500",
                        social.color
                      )}
                    >
                      <social.icon className="h-6 w-6 transition-transform duration-500 group-hover:scale-110" />
                      <span className="relative overflow-hidden">
                        {social.name}
                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-500 group-hover:w-full" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
