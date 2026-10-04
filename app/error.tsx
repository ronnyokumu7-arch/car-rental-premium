'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, RefreshCw, Home, Phone } from 'lucide-react';
import { BRAND } from '../lib/constants';

/* ─────────────────────────────────────────────────────────────
   ERROR BOUNDARY
   Catches runtime errors in any page below the root layout.

   Contracts:
     • Client component ('use client') — required by Next.js
     • Receives `error` (Error + optional digest) and `reset`
     • Logs to console in dev (Sentry in prod — flagged for later)
     • Never exposes the raw error message to the user
     • Same visual language as not-found.tsx — dark, branded

   Does NOT catch:
     • Errors in the root layout (needs global-error.tsx)
     • Server-side errors during rendering (those hit not-found
       or a 500 page automatically)
   ───────────────────────────────────────────────────────────── */

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  /* ── Log for debugging ──
     console.error fires in both dev and prod. When we wire
     observability later, this becomes Sentry.captureException. */
  useEffect(() => {
    console.error('Runtime error:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-obsidian-950 flex items-center justify-center px-6 lg:px-8 py-24 overflow-hidden relative">

      {/* Ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 900px 600px at 50% 40%, rgba(194,112,46,0.16) 0%, transparent 60%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 700px 500px at 5% 100%, rgba(63,63,70,0.30) 0%, transparent 60%)',
        }}
      />

      {/* Grain */}
      <div className="grain-overlay absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" />

      <div className="relative max-w-2xl mx-auto text-center">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-8">
          <span
            aria-hidden="true"
            className="w-8 h-px bg-copper-500/60"
          />
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-400">
            Something Went Wrong
          </p>
          <span
            aria-hidden="true"
            className="w-8 h-px bg-copper-500/60"
          />
        </div>

        {/* Headline */}
        <h1 className="font-display text-white leading-[1.05] tracking-[-0.02em] mb-6 text-[clamp(2.5rem,6vw,4rem)]">
          We hit a{' '}
          <span className="italic font-light text-copper-200">
            detour.
          </span>
        </h1>

        {/* Subhead */}
        <p className="text-lg text-white/65 leading-relaxed font-light mb-12 max-w-lg mx-auto">
          An unexpected error interrupted this page. Try again — and if it
          keeps happening, get in touch and we&apos;ll sort it out.
        </p>

        {/* Primary actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch max-w-md mx-auto mb-10">

          {/* Try again — triggers Next.js reset */}
          <button
            type="button"
            onClick={reset}
            className="group relative flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-obsidian-950 rounded-lg overflow-hidden transition-all duration-300 ease-lux hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #E3A468 0%, #D98A44 45%, #C2702E 100%)',
              boxShadow:
                '0 1px 2px rgba(168,90,34,0.20), 0 8px 28px rgba(194,112,46,0.32)',
            }}
          >
            <RefreshCw
              size={14}
              strokeWidth={2.5}
              className="relative z-10 transition-transform duration-500 ease-lux group-hover:rotate-180"
            />
            <span className="relative z-10">Try again</span>
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-lux"
              style={{
                background:
                  'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
              }}
            />
          </button>

          {/* Go home */}
          <Link
            href="/"
            className="group flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white border border-white/20 rounded-lg hover:border-copper-400/70 hover:bg-white/[0.03] transition-all duration-300 ease-lux hover:-translate-y-0.5"
          >
            <Home
              size={14}
              strokeWidth={2.5}
              className="text-copper-400 transition-colors duration-300 group-hover:text-copper-300"
            />
            <span>Go home</span>
          </Link>
        </div>

        {/* Secondary links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50 mb-12">
          <Link
            href="/vehicles"
            className="group inline-flex items-center gap-1.5 hover:text-copper-300 transition-colors duration-300"
          >
            <span>Browse the fleet</span>
            <ArrowRight
              size={11}
              strokeWidth={2.5}
              className="transition-transform duration-300 ease-lux group-hover:translate-x-0.5"
            />
          </Link>

          <span
            aria-hidden="true"
            className="w-1 h-1 rounded-full bg-white/20"
          />

          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 hover:text-copper-300 transition-colors duration-300"
          >
            <span>Contact us</span>
            <ArrowRight
              size={11}
              strokeWidth={2.5}
              className="transition-transform duration-300 ease-lux group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Phone fallback */}
        <div className="pt-8 border-t border-white/[0.08]">
          <div className="inline-flex items-center gap-2.5 mb-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-copper-500/[0.12] border border-copper-500/25">
              <Phone size={11} strokeWidth={2.5} className="text-copper-300" />
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
              Prefer to call?
            </p>
          </div>
          <a
            href={`tel:${BRAND.phones[0].replace(/\s/g, '')}`}
            className="font-display text-xl lg:text-2xl text-white hover:text-copper-200 transition-colors duration-300 tabular-nums"
          >
            {BRAND.phones[0]}
          </a>
        </div>
      </div>
    </main>
  );
}
