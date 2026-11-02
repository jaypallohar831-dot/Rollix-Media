'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl =
    'https://wa.me/919024675831?text=Hi%20Ampledia%2C%20I%20would%20like%20to%20discuss%20a%20project%20for%20my%20brand.';

  return (
    <aside
      data-agent-layer="floating-whatsapp"
      data-agent-order="11"
      data-agent-type="button"
      data-agent-label="WhatsApp"
      aria-label="Instant WhatsApp Assistance"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
    >
      {/* Expandable Desktop Tooltip / Pill */}
      <div
        className={`hidden items-center rounded-full border border-[#7C3AED]/30 bg-[#1A0F33]/90 px-4 py-2 text-xs font-semibold text-[#F5F0FF] shadow-xl backdrop-blur-md transition-all duration-300 md:flex ${
          isHovered ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-3 opacity-0'
        }`}
      >
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>Chat directly with Rishabh &amp; Jaypal</span>
        </span>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Ampledia founders on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 transition-all duration-300 hover:scale-110 hover:shadow-[#25D366]/60 focus:outline-none focus:ring-2 focus:ring-[#A855F7] focus:ring-offset-2 focus:ring-offset-[#0A0614]"
      >
        {/* Subtle radial pulse ring */}
        <span
          className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#25D366]/30 animate-ping"
          aria-hidden="true"
        />

        <MessageCircle className="h-7 w-7 transition-transform duration-300 group-hover:scale-105" />
      </a>
    </aside>
  );
}

