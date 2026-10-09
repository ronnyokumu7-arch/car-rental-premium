'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   HERO
   Full-width editorial statement. Single focal point.

   The trust strip (4.9 · 46 vehicles · Since 2019) now lives
   in the BookingBar, right below the service tabs. The hero
   stays purely editorial.

   CTAs:
     • Primary — Get a Quote (pill, copper gradient, arrow badge)
     • Secondary — Explore the Fleet (ghost pill, hidden on mobile)

   No scroll cue — the tabs below act as the next step.
   ───────────────────────────────────────────────────────────── */

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-obsidian-950 flex items-center">

      {/* LAYER 1 — Base gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #070708 0%, #0E0E10 45%, #18181B 100%)',
        }}
      />

      {/* LAYER 2 — Copper ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 1100px 700px at 78% 12%, rgba(194,112,46,0.22) 0%, transparent 58%)',
        }}
      />

      {/* LAYER 3 — Cool counter-glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 800px 560px at 8% 88%, rgba(63,63,70,0.38) 0%, transparent 62%)',
        }}
      />

      {/* LAYER 4 — Vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(7,7,8,0.6) 100%)',
        }}
      />

      {/* LAYER 5 — Grain */}
      <div className="grain-overlay absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" />

      {/* LAYER 6 — Copper bottom hairline */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/25 to-transparent"
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 pt-32 pb-16 w-full text-center">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-8">
          <span className="w-8 h-px bg-copper-500/60" aria-hidden="true" />
          <p className="text-[10px] uppercase tracking-[0.32em] text-copper-300 font-semibold">
            Premium Car Hire · Nairobi
          </p>
          <span className="w-8 h-px bg-copper-500/60" aria-hidden="true" />
        </div>

        {/* Headline */}
        <h1 className="font-display text-white leading-[0.95] mb-8 text-[clamp(2.75rem,8vw,6.5rem)] tracking-[-0.025em]">
          Private, clean,
          <br />
          &amp; reliable cars
          <br />
          <span className="italic font-light text-copper-200">
            for hire in Nairobi.
          </span>
        </h1>

        {/* Subhead */}
        <p className="text-lg lg:text-xl text-white/65 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          Rent private cars in Nairobi — short-term, long-term, and
          chauffeur-driven. Delivered to your door, anywhere in Kenya.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

          {/* Primary: Get a Quote */}
          <Link
            href="/quote"
            className="
              group relative inline-flex items-center justify-between gap-3
              w-full max-w-xs sm:w-auto sm:max-w-none
              pl-6 pr-2 py-2
              text-[11px] font-semibold uppercase tracking-[0.18em]
              text-obsidian-950 rounded-full
              overflow-hidden
              transition-all duration-400 ease-lux
              hover:-translate-y-0.5
            "
            style={{
              backgroundImage:
                'linear-gradient(135deg, #E3A468 0%, #D98A44 45%, #C2702E 100%)',
              boxShadow:
                '0 1px 2px rgba(168,90,34,0.20), 0 8px 24px rgba(194,112,46,0.28)',
            }}
          >
            <span className="relative z-10 whitespace-nowrap">
              Get a Quote
            </span>
            <span className="relative z-10 inline-flex items-center justify-center w-9 h-9 rounded-full bg-obsidian-950 text-copper-300 transition-all duration-400 ease-lux group-hover:rotate-45 shrink-0">
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-lux"
              style={{
                background:
                  'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
              }}
            />
          </Link>

          {/* Secondary: Explore the Fleet — hidden on mobile */}
          <Link
            href="/vehicles"
            className="
              group relative hidden sm:inline-flex items-center justify-between gap-3
              pl-6 pr-2 py-2
              text-[11px] font-semibold uppercase tracking-[0.18em]
              text-white
              border border-white/20 rounded-full
              transition-all duration-400 ease-lux
              hover:border-copper-400/70 hover:bg-copper-500/[0.05]
              hover:-translate-y-0.5
            "
          >
            <span className="whitespace-nowrap">Explore the Fleet</span>
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-copper-500 text-obsidian-950 transition-all duration-400 ease-lux group-hover:bg-copper-400 group-hover:rotate-45 shrink-0">
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
