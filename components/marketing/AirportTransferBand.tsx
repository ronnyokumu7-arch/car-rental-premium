'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Check, ArrowRight, Plane } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   AIRPORT TRANSFER BAND
   Dedicated homepage section for the airport transfer service.

   Structure:
     • Left:  headline + benefits list
     • Right: pricing card with "starting from" and CTA

   Design language: obsidian surface, copper accents.
   Same family as FinalCTA and Testimonials.
   ───────────────────────────────────────────────────────────── */

const BENEFITS = [
  'Real-time flight tracking',
  'Punctual airport pickups',
  'Clean, comfortable vehicles',
  'Direct drop-off to hotel or residence',
] as const;

export function AirportTransferBand() {
  return (
    <section className="relative bg-obsidian-950 py-20 lg:py-28 px-6 lg:px-8 overflow-hidden">

      {/* ── Ambient lighting ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 900px 600px at 75% 30%, rgba(194,112,46,0.16) 0%, transparent 55%)',
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

      {/* Copper top + bottom hairlines */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/25 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/25 to-transparent"
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ═══════════════════════════════════════════
              LEFT — Content
              ═══════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            {/* Eyebrow with plane icon */}
            <div className="inline-flex items-center gap-2.5 mb-6">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-copper-500/[0.12] border border-copper-500/25">
                <Plane size={12} strokeWidth={2.5} className="text-copper-300" />
              </span>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-400">
                Airport Transfers
              </p>
            </div>

            {/* Headline */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] tracking-[-0.02em] mb-6 max-w-2xl">
              Landing at{' '}
              <span className="italic font-light text-copper-200">JKIA?</span>
            </h2>

            {/* Subhead */}
            <p className="text-base lg:text-lg text-white/65 leading-relaxed font-light mb-8 max-w-xl">
              Your chauffeur meets you on arrival, helps with the baggage,
              and drives you straight to your hotel, residence, or office.
            </p>

            {/* Benefits */}
            <ul className="space-y-3.5">
              {BENEFITS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-white/75 text-sm lg:text-base"
                >
                  <Check
                    size={14}
                    strokeWidth={3}
                    className="text-copper-400 shrink-0 mt-1"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ═══════════════════════════════════════════
              RIGHT — Pricing card
              ═══════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient copper glow behind the card */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(194,112,46,0.16) 0%, transparent 70%)',
              }}
            />

            <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.10] rounded-2xl p-8 lg:p-10 overflow-hidden">
              {/* Copper top hairline inside card */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/40 to-transparent"
              />

              {/* Label */}
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-400 mb-5">
                Starting From
              </p>

              {/* Price */}
              <p className="font-display text-5xl lg:text-6xl text-white leading-none mb-4 tabular-nums tracking-[-0.02em]">
                USD 50
              </p>

              {/* Description */}
              <p className="text-white/55 text-sm leading-relaxed mb-8 font-light">
                JKIA to any hotel or residence within Nairobi. VIP and
                group transfers available on request.
              </p>

              {/* CTA */}
              <Link
                href="/quote?service=airport-transfer"
                className="group relative flex items-center justify-center gap-2 w-full px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-obsidian-950 rounded-lg overflow-hidden transition-all duration-300 ease-lux hover:-translate-y-0.5"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #E3A468 0%, #D98A44 45%, #C2702E 100%)',
                  boxShadow:
                    '0 1px 2px rgba(168,90,34,0.20), 0 8px 24px rgba(194,112,46,0.28)',
                }}
              >
                <span className="relative z-10">Schedule a Transfer</span>
                <ArrowRight
                  size={14}
                  strokeWidth={2.5}
                  className="relative z-10 transition-transform duration-300 ease-lux group-hover:translate-x-0.5"
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
