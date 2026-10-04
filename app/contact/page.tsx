import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Phone, ArrowUpRight } from 'lucide-react';
import { ContactForm } from '../../components/contact/ContactForm';
import { ContactInfo } from '../../components/contact/ContactInfo';
import { ContactMap } from '../../components/contact/ContactMap';
import { BRAND } from '../../lib/constants';
import { CONTACT } from '../../lib/contact';
import { buildPageMetadata } from '../../lib/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with Royride Car Hire in Utawala, Nairobi. Call, WhatsApp, or send an enquiry — we respond within 2 hours during business hours.',
  path: '/contact',
  keywords: [
    'contact Royride car hire',
    'car hire Nairobi contact',
    'rent a car Nairobi phone',
    'Royride Utawala location',
    'WhatsApp car hire Nairobi',
  ],
});

/* ─────────────────────────────────────────────────────────────
   CONTACT PAGE
   Structure:
     1. Hero          — dark, cinematic
     2. Form + Info   — 60/40 split (form larger)
     3. Map + Address — 33/66 split (map larger)
     4. Call strip    — dark, phone numbers as buttons
   ───────────────────────────────────────────────────────────── */

export default function ContactPage() {
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

        <div className="relative max-w-5xl mx-auto">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-400 mb-5">
            Get in Touch
          </p>

          <h1 className="font-display text-white leading-[1.02] tracking-[-0.025em] mb-8 text-[clamp(2.5rem,7vw,5rem)] max-w-3xl">
            Let&apos;s get you{' '}
            <span className="italic font-light text-copper-200">
              moving.
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-white/65 leading-relaxed font-light max-w-2xl">
            Call, WhatsApp, or send us an enquiry. We respond within two
            hours during business hours — often much faster.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FORM + INFO
          ══════════════════════════════════════════════════════ */}
      <section className="bg-background py-16 lg:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

            {/* Form (60%) */}
            <div className="lg:col-span-3">
              <Suspense
                fallback={
                  <div className="bg-surface border border-border rounded-2xl p-10 text-center text-sm text-ink-muted">
                    Loading form…
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </div>

            {/* Info (40%) */}
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MAP + ADDRESS
          ══════════════════════════════════════════════════════ */}
      <section className="bg-background pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            {/* Left column — address + CTA */}
            <div className="lg:col-span-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-600 mb-4">
                Find Us
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-ink leading-[1.1] tracking-[-0.015em] mb-8">
                Our location.
              </h2>

              {/* Address block */}
              <div className="space-y-1 mb-6">
                <p className="text-ink font-medium">
                  {BRAND.fullName}
                </p>
                <p className="text-ink-muted font-light">
                  {CONTACT.address.line1}
                </p>
                <p className="text-ink-muted font-light">
                  {CONTACT.address.city}
                </p>
              </div>

              {/* Landmark */}
              <div className="pt-5 border-t border-border mb-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-subtle mb-2">
                  Landmark
                </p>
                <p className="text-sm text-ink-muted font-light">
                  {CONTACT.address.landmark}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <a
                  href={CONTACT.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 w-full px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-obsidian-950 rounded-lg overflow-hidden transition-all duration-300 ease-lux hover:-translate-y-0.5"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg, #E3A468 0%, #D98A44 45%, #C2702E 100%)',
                    boxShadow:
                      '0 1px 2px rgba(168,90,34,0.20), 0 8px 24px rgba(194,112,46,0.28)',
                  }}
                >
                  <span className="relative z-10">Get directions</span>
                  <ArrowUpRight
                    size={14}
                    strokeWidth={2.5}
                    className="relative z-10 transition-transform duration-300 ease-lux group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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

                <a
                  href={CONTACT.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 w-full px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted hover:text-copper-600 transition-colors duration-300"
                >
                  <span>View on Google Maps</span>
                  <ArrowUpRight
                    size={12}
                    strokeWidth={2.5}
                    className="transition-transform duration-300 ease-lux group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>

            {/* Right column — map */}
            <div className="lg:col-span-2">
              <ContactMap />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CALL NOW STRIP
          ══════════════════════════════════════════════════════ */}
      <section className="relative bg-obsidian-950 py-20 lg:py-24 px-6 lg:px-8 overflow-hidden">

        {/* Ambient copper glow centered */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 700px 400px at 50% 50%, rgba(194,112,46,0.16) 0%, transparent 60%)',
          }}
        />

        {/* Grain */}
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
              Prefer to Talk?
            </p>
          </div>

          {/* Headline */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.1] tracking-[-0.015em] mb-6">
            Call us now.
          </h2>

          {/* Subhead */}
          <p className="text-base lg:text-lg text-white/65 leading-relaxed font-light mb-10 max-w-xl mx-auto">
            Our team is available Monday through Saturday, 8 AM to 6 PM.
          </p>

          {/* Phone buttons */}
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
