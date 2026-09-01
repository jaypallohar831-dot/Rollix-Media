'use client';

import { useState, useEffect } from 'react';
import { Container, Section } from '@/components/layout';
import {
  Check,
  Loader2,
  AlertCircle,
  Instagram,
  MessageSquare
} from 'lucide-react';
import { servicesService } from '@/services/services.service';
import type { Service } from '@/services/services.service';
import { cn } from '@/lib/utils';

export function ContactForm() {
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
    { name: 'WhatsApp', icon: MessageSquare, href: 'https://wa.me/919351775546', color: 'hover:text-green-500' },
  ];

  return (
    <>
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
          Get a Free <span className="text-gradient-warm italic">Consultation</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Tell us about your project and we&rsquo;ll craft a tailored digital marketing strategy to accelerate your brand&rsquo;s growth. We respond within 24 hours.
        </p>
      </Container>

      <Section spacing="none" className="relative z-10 pb-32 sm:pb-40">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Contact Form */}
            <div className="rounded-3xl border border-border bg-card p-8 sm:p-12 backdrop-blur-sm">
              {status === 'success' ? (
                <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cinematic-orange/10 text-cinematic-orange">
                    <Check className="h-10 w-10" />
                  </div>
                  <h2 className="font-heading text-3xl text-foreground">Inquiry Sent</h2>
                  <p className="mt-4 max-w-sm text-muted-foreground">
                    Thank you for reaching out. Our team will review your requirements and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-10 text-[11px] font-bold uppercase tracking-[0.2em] text-cinematic-orange hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-10" aria-label="Contact form">
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
                      <label htmlFor="contact-name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Your Name</label>
                      <input
                        type="text"
                        id="contact-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="border-b border-border bg-transparent py-2 text-lg text-foreground transition-all focus:border-cinematic-orange focus:outline-none"
                        placeholder="Jane Doe"
                        autoComplete="name"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Email Address</label>
                      <input
                        type="email"
                        id="contact-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border-b border-border bg-transparent py-2 text-lg text-foreground transition-all focus:border-cinematic-orange focus:outline-none"
                        placeholder="jane@example.com"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-phone" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Phone Number</label>
                      <input
                        type="tel"
                        id="contact-phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="border-b border-border bg-transparent py-2 text-lg text-foreground transition-all focus:border-cinematic-orange focus:outline-none"
                        placeholder="+91 00000-00000"
                        autoComplete="tel"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-service" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Service of Interest</label>
                      <div className="relative">
                        <select
                          id="contact-service"
                          required
                          value={formData.service_interest}
                          onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
                          className="w-full border-b border-border bg-transparent py-2 text-lg text-foreground transition-all focus:border-cinematic-orange focus:outline-none appearance-none cursor-pointer pr-10"
                        >
                          <option value="" className="bg-background">Select a service</option>
                          {services.map(service => (
                            <option key={service.id} value={service.title} className="bg-background">
                              {service.title}
                            </option>
                          ))}
                          {services.length === 0 && (
                            <>
                              <option value="Video Editing" className="bg-background">Video Editing</option>
                              <option value="Social Media Marketing" className="bg-background">Social Media Marketing</option>
                              <option value="Website Development" className="bg-background">Website Development</option>
                              <option value="SEO Optimization" className="bg-background">SEO Optimization</option>
                              <option value="Graphic Design" className="bg-background">Graphic Design</option>
                              <option value="Wedding Videography" className="bg-background">Wedding Videography</option>
                              <option value="Meta/Google Ads" className="bg-background">Meta/Google Ads</option>
                            </>
                          )}
                        </select>
                        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-message" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground ml-1">Project Details</label>
                    <textarea
                      id="contact-message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-[120px] resize-none border-b border-border bg-transparent py-2 text-lg text-foreground transition-all focus:border-cinematic-orange focus:outline-none"
                      placeholder="Tell us about your project goals and requirements..."
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/5 p-4 rounded-xl border border-red-400/10" role="alert">
                      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
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
                        'Send Inquiry'
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <aside className="flex flex-col gap-16 lg:pt-12">
              <div className="space-y-10">
                <div>
                  <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-cinematic-orange/80">
                    Location
                  </h2>
                  <p className="text-xl leading-relaxed text-muted-foreground font-light">
                    Available worldwide
                    <br />
                    Bhilwara, Rajasthan, India — 311001
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-cinematic-orange/80">
                    Direct Contact
                  </h2>
                  <p className="text-xl leading-relaxed text-muted-foreground font-light underline-offset-4 decoration-cinematic-orange/30">
                    <a href="mailto:rollixmedia@gmail.com" className="hover:text-foreground transition-colors">rollixmedia@gmail.com</a><br />
                    <a href="tel:+919351775546" className="hover:text-foreground transition-colors">+91 9351775546</a><br />
                    <a href="tel:+919024675831" className="hover:text-foreground transition-colors">+91 9024675831</a>
                  </p>
                </div>

                <div>
                  <h2 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-cinematic-orange/80">
                    Business Hours
                  </h2>
                  <p className="text-xl leading-relaxed text-muted-foreground font-light">
                    Monday – Saturday: 9 AM – 7 PM IST<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              <nav aria-label="Social media links">
                <h2 className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-cinematic-orange/80">
                  Follow Us
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow Rollix Media on ${social.name}`}
                      className={cn(
                        "group flex items-center gap-4 text-xl font-light text-muted-foreground transition-all duration-500",
                        social.color
                      )}
                    >
                      <social.icon className="h-6 w-6 transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
                      <span className="relative overflow-hidden">
                        {social.name}
                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-500 group-hover:w-full" />
                      </span>
                    </a>
                  ))}
                </div>
              </nav>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
