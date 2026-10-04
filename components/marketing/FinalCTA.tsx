'use client';

import Link from 'next/link';
import { ArrowRight, Phone, MessageCircle, Key, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { BRAND } from '../../lib/constants';
import { CONTACT } from '../../lib/contact';

/* ─────────────────────────────────────────────────────────────
   FINAL CTA — "The Two Desks"
   The last 20 seconds with a visitor. Two paths, one number.

   Structure:
     1. Headline — one line, declarative
     2. Two-path fork — self-drive OR chauffeured
     3. Concierge line — "or simply call" with number at scale

   No brand strip. By the time they're here, they know the fleet.
   ───────────────────────────────────────────────────────────── */

const PATHS = [
  {
    key: 'self-drive',
    icon: Key,
    eyebrow: 'I want to drive',
    title: 'Self-drive hire',
    description:
      'Full control, delivered to your door. Keys in hand, no middleman.',
    cta: 'Explore the fleet',
    href: '/vehicles',
    mode: 'primary' as const,
  },
  {
    key: 'chauffeured',
    icon: UserCheck,
    eyebrow: 'I want a chauffeur',
    title: 'Chauffeur-driven',
    description:
      'Airport transfers, corporate travel, events. Sit back — we drive.',
    cta: 'Request a quote',
    href: '/contact?service=chauffeured',
    mode: 'secondary' as const,
  },
];

export function FinalCTA() {
  return (
    <section className="relative bg-obsidian-950 overflow-hidden">

      {/* ═══════════════════════════════════════════
          Ambient lighting
          ═══════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 1000px 700px at 50% 0%, rgba(194,112,46,0.16) 0%, transparent 55%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 700px 500px at 100% 100%, rgba(63,63,70,0.32) 0%, transparent 60%)',
        }}
      />

      {/* Grain */}
      <div className="grain-overlay absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" />

      {/* Copper top hairline */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent"
      />

      {/* ═══════════════════════════════════════════
          CONTENT
          ═══════════════════════════════════════════ */}
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-24 lg:py-32">

        {/* ── Headline block ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 lg:mb-20"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-400 mb-5">
            Ready when you are
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] tracking-[-0.02em] max-w-3xl mx-auto">
            Two ways to{' '}
            <span className="italic font-light text-copper-200">
              drive away.
            </span>
          </h2>
        </motion.div>

        {/* ═══════════════════════════════════════════
            THE FORK — two paths
            ═══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-16 lg:mb-20">
          {PATHS.map((path, i) => (
            <PathCard key={path.key} path={path} index={i} />
          ))}
        </div>

        {/* ═══════════════════════════════════════════
            CONCIERGE LINE — "or simply call"
            ═══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative max-w-2xl mx-auto text-center"
        >
          {/* Label */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span
              aria-hidden="true"
              className="w-8 h-px bg-copper-500/40"
            />
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">
              Or simply call
            </p>
            <span
              aria-hidden="true"
              className="w-8 h-px bg-copper-500/40"
            />
          </div>

          {/* Phone — big, tappable, the hero of this block */}
          <a
            href={`tel:${BRAND.phones[0].replace(/\s/g, '')}`}
            className="group inline-block font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-none tracking-[-0.01em] hover:text-copper-200 transition-colors duration-400 ease-lux tabular-nums"
          >
            {BRAND.phones[0]}
          </a>

          {/* Hours + WhatsApp */}
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/40 mt-5 mb-6">
            Mon–Sat · 8am – 6pm · Concierge on standby
          </p>

          <a
            href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
              CONTACT.whatsappMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white border border-white/15 rounded-full hover:border-copper-400/70 hover:bg-copper-500/[0.06] transition-all duration-300 ease-lux"
          >
            <MessageCircle
              size={13}
              strokeWidth={2.5}
              className="text-copper-400"
            />
            <span>Prefer WhatsApp</span>
            <ArrowRight
              size={12}
              strokeWidth={2.5}
              className="text-white/50 transition-all duration-300 ease-lux group-hover:text-copper-300 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PATH CARD
   Two-up fork. Primary (self-drive) gets the copper CTA.
   Secondary (chauffeur) gets a ghost CTA.
   ───────────────────────────────────────────────────────────── */

function PathCard({
  path,
  index,
}: {
  path: (typeof PATHS)[number];
  index: number;
}) {
  const Icon = path.icon;
  const isPrimary = path.mode === 'primary';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group relative flex flex-col
        bg-white/[0.02] backdrop-blur-sm
        border border-white/[0.08] rounded-2xl
        p-8 lg:p-10
        transition-all duration-500 ease-lux
        hover:border-copper-500/30 hover:-translate-y-1
        hover:bg-white/[0.03]
      "
    >
      {/* Icon */}
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-copper-500/[0.10] border border-copper-500/25 text-copper-300">
          <Icon size={20} strokeWidth={2} />
        </div>
      </div>

      {/* Eyebrow */}
      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-400 mb-3">
        {path.eyebrow}
      </p>

      {/* Title */}
      <h3 className="font-display text-2xl lg:text-3xl text-white leading-tight tracking-[-0.01em] mb-3">
        {path.title}
      </h3>

      {/* Description */}
      <p className="text-sm lg:text-base text-white/60 leading-relaxed font-light mb-8 flex-1">
        {path.description}
      </p>

      {/* CTA */}
      <Link
        href={path.href}
        className={
          isPrimary
            ? 'group/cta relative inline-flex items-center justify-center gap-2 w-full px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-obsidian-950 rounded-lg overflow-hidden transition-all duration-300 ease-lux hover:-translate-y-0.5'
            : 'group/cta inline-flex items-center justify-center gap-2 w-full px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white border border-white/15 rounded-lg hover:border-copper-400/60 hover:bg-copper-500/[0.05] transition-all duration-300 ease-lux hover:-translate-y-0.5'
        }
        style={
          isPrimary
            ? {
                backgroundImage:
                  'linear-gradient(135deg, #E3A468 0%, #D98A44 45%, #C2702E 100%)',
                boxShadow:
                  '0 1px 2px rgba(168,90,34,0.20), 0 8px 24px rgba(194,112,46,0.28)',
              }
            : undefined
        }
      >
        <span className="relative z-10">{path.cta}</span>
        <ArrowRight
          size={14}
          strokeWidth={2.5}
          className={
            isPrimary
              ? 'relative z-10 transition-transform duration-300 ease-lux group-hover/cta:translate-x-1'
              : 'text-white/60 transition-all duration-300 ease-lux group-hover/cta:text-copper-300 group-hover/cta:translate-x-0.5'
          }
        />
        {isPrimary && (
          <span
            aria-hidden="true"
            className="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700 ease-lux"
            style={{
              background:
                'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
            }}
          />
        )}
      </Link>
    </motion.div>
  );
}
