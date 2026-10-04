import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Calendar, Clock, Bell, Phone } from 'lucide-react';
import { BRAND } from '../../lib/constants';
import { CONTACT } from '../../lib/contact';
import { buildPageMetadata } from '../../lib/metadata';

/* ─────────────────────────────────────────────────────────────
   RENTAL CALENDAR — placeholder page
   A "coming soon" landing for the real-time availability
   feature. Honest about status, useful about alternatives.

   When the real calendar ships, this whole file gets replaced
   with the live feature.
   ───────────────────────────────────────────────────────────── */

export const metadata: Metadata = buildPageMetadata({
  title: 'Rental Calendar — Real-Time Availability Coming Soon',
  description:
    'Real-time fleet availability is coming soon to Royride Car Hire. In the meantime, call, WhatsApp, or browse the fleet to reserve your vehicle.',
  path: '/rental-calendar',
  keywords: [
    'car hire availability Nairobi',
    'rental calendar Kenya',
    'real-time car rental Nairobi',
    'book car hire Kenya',
  ],
});

export default function RentalCalendarPage() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    'Hi Royride, I would like to check vehicle availability for my dates.'
  )}`;

  return (
    <main className="min-h-screen bg-background">

      {/* ══════════════════════════════════════════════════════
          HERO
          ══════════════════════════════════════════════════════ */}
      <section className="relative bg-obsidian-950 pt-32 lg:pt-40 pb-20 lg:pb-24 px-6 lg:px-8 overflow-hidden">

        {/* Ambient lighting */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 900px 600px at 75% 25%, rgba(194,112,46,0.18) 0%, transparent 55%)',
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

        {/* Copper bottom hairline */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/25 to-transparent"
        />

        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-400 mb-5">
            Real-Time Availability
          </p>

          <h1 className="font-display text-white leading-[1.02] tracking-[-0.025em] mb-8 text-[clamp(2.5rem,7vw,5rem)]">
            Rental{' '}
            <span className="italic font-light text-copper-200">
              calendar.
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-white/65 leading-relaxed font-light max-w-2xl mx-auto">
            A live view of our fleet — see which vehicles are available on
            your dates and reserve in seconds. Currently in development.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          COMING SOON CARD
          ══════════════════════════════════════════════════════ */}
      <section className="bg-background py-16 lg:py-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-surface border border-border rounded-2xl p-8 lg:p-12 overflow-hidden">

            {/* Copper top hairline inside card */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent"
            />

            {/* ── Header ── */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-copper-500/[0.10] border border-copper-500/30 flex items-center justify-center shrink-0">
                <Calendar size={20} strokeWidth={2} className="text-copper-600" />
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-copper-600">
                Coming Soon
              </p>
            </div>

            {/* ── Headline ── */}
            <h2 className="font-display text-3xl sm:text-4xl text-ink leading-[1.1] tracking-[-0.015em] mb-6">
              A live view of every vehicle.
            </h2>

            {/* ── Body ── */}
            <p className="text-base lg:text-lg text-ink-muted leading-relaxed font-light mb-10">
              We&apos;re building a real-time rental calendar that shows
              exactly which vehicles are available on any given date. No
              waiting for confirmation calls, no guessing — just instant
              availability and one-tap reservation.
            </p>

            {/* ── Features ── */}
            <div className="space-y-6 mb-10">
              <Feature
                icon={<Calendar size={16} />}
                title="See real availability"
                description="Every vehicle, every date. Free, busy, or blocked — visible at a glance."
              />
              <Feature
                icon={<Clock size={16} />}
                title="Instant booking"
                description="Reserve your vehicle the moment you see it's free. No back-and-forth."
              />
              <Feature
                icon={<Bell size={16} />}
                title="Notify me"
                description="Want to know the day it launches? Send us a message and we'll reach out."
              />
            </div>

            {/* ── Alternatives ── */}
            <div className="pt-8 border-t border-border">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-subtle mb-5">
                Need a vehicle today?
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 flex-1 px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-obsidian-950 rounded-lg overflow-hidden transition-all duration-300 ease-lux hover:-translate-y-0.5"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg, #E3A468 0%, #D98A44 45%, #C2702E 100%)',
                    boxShadow:
                      '0 1px 2px rgba(168,90,34,0.20), 0 8px 24px rgba(194,112,46,0.28)',
                  }}
                >
                  <span className="relative z-10">Chat on WhatsApp</span>
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
                </a>

                <Link
                  href="/vehicles"
                  className="group inline-flex items-center justify-center gap-2 flex-1 px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-ink border border-border rounded-lg hover:border-copper-500/50 hover:bg-copper-500/[0.04] transition-all duration-300 ease-lux hover:-translate-y-0.5"
                >
                  <span>Browse the fleet</span>
                  <ArrowRight
                    size={14}
                    strokeWidth={2.5}
                    className="text-ink-subtle transition-all duration-300 ease-lux group-hover:text-copper-600 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CALL STRIP
          ══════════════════════════════════════════════════════ */}
      <section className="relative bg-obsidian-950 py-20 lg:py-24 px-6 lg:px-8 overflow-hidden">

        {/* Ambient copper glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 700px 400px at 50% 50%, rgba(194,112,46,0.16) 0%, transparent 60%)',
          }}
        />
        <div className="grain-overlay absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" />

        {/* Copper top hairline */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/25 to-transparent"
        />

        <div className="relative max-w-3xl mx-auto text-center">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 mb-6">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-copper-500/[0.12] border border-copper-500/25">
              <Phone size={12} strokeWidth={2.5} className="text-copper-300" />
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-400">
              Prefer to Speak to a Human?
            </p>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.1] tracking-[-0.015em] mb-10">
            We&apos;ll check availability for you.
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch max-w-2xl mx-auto">
            {BRAND.phones.map((phone, index) => {
              const isPrimary = index === 0;
              return (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className={
                    isPrimary
                      ? 'group relative flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-obsidian-950 rounded-lg overflow-hidden transition-all duration-300 ease-lux hover:-translate-y-0.5'
                      : 'group flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white border border-white/20 rounded-lg hover:border-copper-400/70 hover:bg-white/[0.03] transition-all duration-300 ease-lux hover:-translate-y-0.5'
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
                  <Phone
                    size={13}
                    strokeWidth={2.5}
                    className={
                      isPrimary
                        ? 'relative z-10'
                        : 'text-copper-400 transition-colors duration-300 group-hover:text-copper-300'
                    }
                  />
                  <span className="relative z-10 tabular-nums">{phone}</span>
                  {isPrimary && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-lux"
                      style={{
                        background:
                          'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────
   FEATURE
   Icon + title + description row inside the coming-soon card.
   ───────────────────────────────────────────────────────────── */
function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-copper-500/[0.10] border border-copper-500/25 flex items-center justify-center shrink-0 text-copper-600">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-ink mb-1 leading-tight">
          {title}
        </p>
        <p className="text-sm text-ink-muted leading-relaxed font-light">
          {description}
        </p>
      </div>
    </div>
  );
}
