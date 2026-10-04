'use client';

import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { TRUST_STATS } from '../../lib/testimonials';
import { getFleetSize } from '../../lib/vehicles';

export function Hero() {
  const handleScrollToBooking = () => {
    const target = document.getElementById('booking-widget');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  const fleetSize = getFleetSize();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-obsidian-950 flex items-center">

      {/* ═══════════════════════════════════════════════════════
          LAYER 1 — Base gradient (obsidian → iron)
          ═══════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #070708 0%, #0E0E10 45%, #18181B 100%)',
        }}
      />

      {/* ═══════════════════════════════════════════════════════
          LAYER 2 — Copper ambient glow (upper-center-right)
          Now that the carousel is gone, the warm light pulls
          toward the empty space above the headline.
          ═══════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 1100px 700px at 78% 12%, rgba(194,112,46,0.22) 0%, transparent 58%)',
        }}
      />

      {/* ═══════════════════════════════════════════════════════
          LAYER 3 — Cool counter-glow (lower-left)
          Balanced lighting = cinematic depth
          ═══════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 800px 560px at 8% 88%, rgba(63,63,70,0.38) 0%, transparent 62%)',
        }}
      />

      {/* ═══════════════════════════════════════════════════════
          LAYER 4 — Vignette (focus center, darken edges)
          ═══════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(7,7,8,0.6) 100%)',
        }}
      />

      {/* ═══════════════════════════════════════════════════════
          LAYER 5 — Grain (filmic texture)
          ═══════════════════════════════════════════════════════ */}
      <div className="grain-overlay absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" />

      {/* ═══════════════════════════════════════════════════════
          LAYER 6 — Copper hairline (bottom edge)
          ═══════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/25 to-transparent"
      />

      {/* ═══════════════════════════════════════════════════════
          CONTENT — centered column, single focal point
          ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 pt-32 pb-28 w-full text-center">

        {/* ── Eyebrow ── */}
        <div className="inline-flex items-center gap-3 mb-8">
          <span className="w-8 h-px bg-copper-500/60" aria-hidden="true" />
          <p className="text-[10px] uppercase tracking-[0.32em] text-copper-300 font-semibold">
            Premium Car Hire · Nairobi
          </p>
          <span className="w-8 h-px bg-copper-500/60" aria-hidden="true" />
        </div>

        {/* ── Headline ── */}
        <h1 className="font-display text-white leading-[0.95] mb-8 text-[clamp(2.75rem,8vw,6.5rem)] tracking-[-0.025em]">
          Private, clean,
          <br />
          &amp; reliable cars
          <br />
          <span className="italic font-light text-copper-200">
            for hire in Nairobi.
          </span>
        </h1>

        {/* ── Subhead ── */}
        <p className="text-lg lg:text-xl text-white/65 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          Rent private cars in Nairobi — short-term, long-term, and
          chauffeur-driven. Delivered to your door, anywhere in Kenya.
        </p>

        {/* ── Trust strip ── */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-12 text-[11px] uppercase tracking-[0.16em] text-white/50 font-medium">
          <span className="inline-flex items-center gap-1.5">
            <Star size={11} className="fill-copper-400 text-copper-400" />
            {TRUST_STATS.rating} on Google
          </span>
          <span
            className="w-px h-3 bg-white/15 hidden sm:block"
            aria-hidden="true"
          />
          <span>{fleetSize} vehicles in fleet</span>
          <span
            className="w-px h-3 bg-white/15 hidden sm:block"
            aria-hidden="true"
          />
          <span>Since {TRUST_STATS.founded}</span>
        </div>

        {/* ── CTAs ── */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/vehicles"
            className="group relative inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-obsidian-950 rounded-sm overflow-hidden transition-all duration-300 ease-lux hover:-translate-y-0.5"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #E3A468 0%, #D98A44 45%, #C2702E 100%)',
              boxShadow:
                '0 1px 2px rgba(168,90,34,0.20), 0 8px 28px rgba(194,112,46,0.32)',
            }}
          >
            <span className="relative z-10">Explore the Fleet</span>
            <ArrowRight
              size={14}
              strokeWidth={2.5}
              className="relative z-10 transition-transform duration-300 ease-lux group-hover:translate-x-1"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-lux"
              style={{
                background:
                  'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
              }}
            />
          </Link>

          <Link
            href="/rental-calendar"
            className="group inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white border border-white/20 rounded-sm hover:border-copper-400/70 hover:bg-white/[0.03] transition-all duration-300 ease-lux hover:-translate-y-0.5"
          >
            <span>Rental Calendar</span>
            <ArrowRight
              size={14}
              strokeWidth={2}
              className="text-white/60 transition-all duration-300 ease-lux group-hover:text-copper-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          Scroll cue — bottom center
          ═══════════════════════════════════════════════════════ */}
      <button
        onClick={handleScrollToBooking}
        aria-label="Scroll to booking form"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-white/40 hover:text-white/80 transition-colors duration-300 cursor-pointer group"
      >
        <span className="text-[9px] uppercase tracking-[0.28em] font-medium">
          Scroll
        </span>
        <span className="flex items-center justify-center w-10 h-10 rounded-full border border-white/15 group-hover:border-copper-400/60 group-hover:bg-copper-500/[0.08] transition-all duration-400 ease-lux animate-bounce-soft">
          <svg
            width="12"
            height="16"
            viewBox="0 0 14 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 2v16M1 12l6 6 6-6" />
          </svg>
        </span>
      </button>
    </section>
  );
}
