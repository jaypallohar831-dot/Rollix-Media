'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Globe, Sparkles } from 'lucide-react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  isPin?: boolean;
  label?: string;
}

const CITY_PINS = [
  { label: 'Bhilwara (HQ)', lat: 25.3478, lon: 74.6313 },
  { label: 'Jaipur', lat: 26.9124, lon: 75.7873 },
  { label: 'Mumbai', lat: 19.0760, lon: 72.8777 },
  { label: 'Delhi NCR', lat: 28.7041, lon: 77.1025 },
  { label: 'Bengaluru', lat: 12.9716, lon: 77.5946 },
];

export function DottedGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeCity, setActiveCity] = useState<string>('Bhilwara (HQ)');
  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);
  const lastMouseYRef = useRef(0);
  const rotYRef = useRef(0);
  const rotXRef = useRef(0.25);
  const velYRef = useRef(0.0035);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Handle high-DPI crisp rendering
    const dpr = window.devicePixelRatio || 1;
    const size = Math.min(canvas.parentElement?.clientWidth || 500, 560);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const radius = size * 0.38;
    const centerX = size / 2;
    const centerY = size / 2;

    // Generate ~450 Fibonacci sphere dots
    const points: Point3D[] = [];
    const numPoints = 420;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      points.push({
        x: Math.cos(theta) * radiusAtY,
        y: y,
        z: Math.sin(theta) * radiusAtY,
      });
    }

    // Add designated strategic city pins
    CITY_PINS.forEach((city) => {
      const phiRad = (90 - city.lat) * (Math.PI / 180);
      const thetaRad = (city.lon + 180) * (Math.PI / 180);
      points.push({
        x: -(Math.sin(phiRad) * Math.cos(thetaRad)),
        y: Math.cos(phiRad),
        z: Math.sin(phiRad) * Math.sin(thetaRad),
        isPin: true,
        label: city.label,
      });
    });

    // Pause when out of viewport
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    if (containerRef.current) observer.observe(containerRef.current);

    let pulseTime = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, size, size);

      if (!isDraggingRef.current) {
        rotYRef.current += velYRef.current;
      }

      pulseTime += 0.05;

      const cosY = Math.cos(rotYRef.current);
      const sinY = Math.sin(rotYRef.current);
      const cosX = Math.cos(rotXRef.current);
      const sinX = Math.sin(rotXRef.current);

      // Project and sort points by Z (back-to-front rendering)
      const projected = points.map((p) => {
        // Rotate around Y axis
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;

        // Rotate around X axis
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        return {
          screenX: centerX + x1 * radius,
          screenY: centerY + y2 * radius,
          z: z2,
          isPin: p.isPin,
          label: p.label,
        };
      });

      projected.sort((a, b) => a.z - b.z);

      // Draw dots
      projected.forEach((p) => {
        const alpha = Math.max(0.12, (p.z + 1) / 2); // Deeper points fade out
        const dotSize = Math.max(1, ((p.z + 1) / 2) * 2.8);

        if (p.isPin) {
          // Strategic Client Node Pin (Highlighted)
          const isFront = p.z > 0.1;
          if (isFront) {
            ctx.beginPath();
            ctx.arc(p.screenX, p.screenY, dotSize * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = '#A855F7';
            ctx.fill();

            // Animated pulsing halo ring
            ctx.beginPath();
            const ringRadius = (dotSize * 2.5) + Math.sin(pulseTime) * 3;
            ctx.arc(p.screenX, p.screenY, Math.max(2, ringRadius), 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(192, 132, 252, ${Math.max(0, Math.sin(pulseTime) * 0.8)})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Label text if nearest to camera
            if (p.z > 0.5 && p.label) {
              ctx.font = '10px Inter, monospace';
              ctx.fillStyle = '#FFFFFF';
              ctx.fillText(p.label, p.screenX + 8, p.screenY + 3);
            }
          }
        } else {
          // Regular Mesh Dot
          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(221, 214, 254, ${alpha * 0.75})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  // Mouse interaction handlers for interactive spin
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMouseXRef.current = e.clientX;
    lastMouseYRef.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMouseXRef.current;
    const deltaY = e.clientY - lastMouseYRef.current;
    rotYRef.current += deltaX * 0.005;
    rotXRef.current = Math.max(-0.6, Math.min(0.6, rotXRef.current + deltaY * 0.005));
    lastMouseXRef.current = e.clientX;
    lastMouseYRef.current = e.clientY;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative mx-auto mt-16 max-w-5xl overflow-hidden rounded-3xl border border-[#7C3AED]/25 bg-gradient-to-b from-[#160B2C]/90 via-[#0A0614] to-[#160B2C]/90 p-8 sm:p-14 text-center select-none"
    >
      {/* ── ATMOSPHERIC CORONA GLOW (Matches video's radiant bottom rim) ── */}
      <div
        className="pointer-events-none absolute -bottom-36 left-1/2 h-[340px] w-[580px] -translate-x-1/2 rounded-full bg-gradient-to-t from-[#A855F7]/30 via-[#F97316]/20 to-transparent blur-3xl"
        aria-hidden="true"
      />

      {/* Header Tag & Title */}
      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/30 bg-[#241445]/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
          <Globe className="h-3.5 w-3.5 text-[#A855F7]" />
          <span>Pan-India Strategic Delivery</span>
        </div>

        <h3 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Local Roots in Bhilwara.{' '}
          <span className="bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#DDD6FE] bg-clip-text text-transparent">
            Pan-India Impact.
          </span>
        </h3>

        <p className="mt-4 text-base leading-relaxed text-white sm:text-lg">
          From high-converting Rajasthani education funnels to metropolitan e-commerce brand films, our growth pipeline connects directly to modern consumer attention across India.
        </p>
      </div>

      {/* 3D Interactive Canvas */}
      <div
        className="relative z-10 mt-8 flex cursor-grab items-center justify-center active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas ref={canvasRef} className="max-w-full drop-shadow-[0_0_35px_rgba(168,85,247,0.3)]" />
      </div>

      {/* Interactive Location Chips */}
      <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        {CITY_PINS.map((city) => (
          <button
            key={city.label}
            type="button"
            onClick={() => setActiveCity(city.label)}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-mono transition-all duration-300 ${
              activeCity === city.label
                ? 'border border-[#A855F7] bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/40'
                : 'border border-[#7C3AED]/20 bg-[#1A0F33]/80 text-white hover:border-[#7C3AED]/40 hover:bg-[#241445]'
            }`}
          >
            <MapPin className="h-3 w-3 text-[#A855F7]" />
            <span>{city.label}</span>
          </button>
        ))}
      </div>

      {/* Drag Hint */}
      <div className="relative z-10 mt-4 text-[11px] font-mono text-white/60">
        ⇄ Click and drag globe to rotate India delivery nodes
      </div>
    </div>
  );
}

export default DottedGlobe;
