'use client';

import { motion } from 'motion/react';
import {
  Shield,
  FileCheck,
  Award,
  Check,
  ArrowRight,
  Sparkles,
  MapPin,
  Star,
} from 'lucide-react';
import { getFleetSize } from '../../lib/vehicles';
import { TRUST_STATS } from '../../lib/testimonials';
import { BRAND } from '../../lib/constants';
import { CONTACT } from '../../lib/contact';

/* ─────────────────────────────────────────────────────────────
   ABOUT CONTENT
   The About page — six sections, each doing "About" work only.

   Sections:
     1. Hero           — identity statement
     2. Our Story      — how Royride started and what it stands for
     3. Mission        — one quote, one line
     4. What Sets Us Apart — 4 real differentiators
     5. Our Standards  — what happens between hires
     6. By the Numbers — verified stats
     7. Where to Find Us — handshake close, no sales pitch

   NOT in this file:
     • Services / Two Ways to Drive — that's a homepage job
     • Airport Transfer Band        — also homepage
     • Final CTA                    — also homepage

   Every number comes from lib/ — never hardcoded.
   ───────────────────────────────────────────────────────────── */

export function AboutContent() {
  const fleetSize = getFleetSize();
  const yearsOperating = TRUST_STATS.yearsOperating;

  return (
    <>

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — Hero
          ══════════════════════════════════════════════════════ */}
      <section className="relative bg-obsidian-950 pt-32 lg:pt-40 pb-24 lg:pb-32 px-6 lg:px-8 overflow-hidden">

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
            About Royride
          </p>

          <h1 className="font-display text-white leading-[1.02] tracking-[-0.025em] mb-8 text-[clamp(2.5rem,7vw,5rem)] max-w-4xl">
            Nairobi&apos;s trusted fleet,{' '}
            <span className="italic font-light text-copper-200">
              since {TRUST_STATS.founded}.
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-white/65 leading-relaxed font-light max-w-2xl">
            Reliable, cost-effective car hire for individuals, businesses,
            and expats — delivering value and top-notch customer experience
            across Kenya.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — Our Story
          ══════════════════════════════════════════════════════ */}
      <section className="bg-background pt-20 lg:pt-28 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* Left — sticky headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 lg:sticky lg:top-32"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-600 mb-4">
                Our Story
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.1] tracking-[-0.015em]">
                Built on trust.
                <br />
                <span className="italic font-light text-copper-700">
                  Driven by detail.
                </span>
              </h2>
            </motion.div>

            {/* Right — story */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.6,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="lg:col-span-8 space-y-6"
            >
              <p className="text-lg lg:text-xl text-ink-muted leading-relaxed font-light">
                Royride Car Hire began in {TRUST_STATS.founded} with a simple
                promise: give people in Nairobi a car hire experience they
                could actually trust. No hidden fees. No last-minute
                surprises. Just reliable vehicles and honest service.
              </p>

              <p className="text-base lg:text-lg text-ink-muted leading-relaxed font-light">
                {yearsOperating} years later, that promise has grown into a
                fleet of{' '}
                <span className="text-ink font-normal">
                  {fleetSize} vehicles
                </span>{' '}
                — from executive SUVs and family vans to economy saloons —
                serving individuals, businesses, and expats across Kenya.
              </p>

              <p className="text-base lg:text-lg text-ink-muted leading-relaxed font-light">
                Every car in our fleet is vetted, insured, and maintained to
                the same standard we&apos;d want for our own family. Partner
                owners trust us to manage and rent their vehicles; customers
                trust us to deliver them on time.
              </p>

              <p className="font-display text-xl lg:text-2xl text-ink leading-snug tracking-[-0.005em] pt-4 max-w-2xl">
                The result: a fleet you can rely on, at prices you can trust,
                with service that keeps people coming back.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — Mission
          ══════════════════════════════════════════════════════ */}
      <section className="relative bg-obsidian-950 py-24 lg:py-32 px-6 lg:px-8 overflow-hidden">

        {/* Ambient copper glow centered */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 800px 500px at 50% 50%, rgba(194,112,46,0.16) 0%, transparent 60%)',
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-400 mb-6">
            Our Mission
          </p>

          <blockquote className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.15] tracking-[-0.015em] mb-10 max-w-3xl mx-auto">
            &ldquo;To become a top-rated car rental agency in Nairobi,
            delivering value and top-notch customer service and
            experience.&rdquo;
          </blockquote>

          <div
            aria-hidden="true"
            className="w-16 h-px bg-copper-500 mx-auto"
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — What Sets Us Apart
          ══════════════════════════════════════════════════════ */}
      <section className="bg-background pt-20 lg:pt-28 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mb-16 lg:mb-20"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-600 mb-4">
              What Sets Us Apart
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.1] tracking-[-0.015em] mb-5">
              Committed to the details.
            </h2>
            <p className="text-base lg:text-lg text-ink-muted leading-relaxed font-light max-w-2xl">
              From a fleet of reliable vehicles to a simple booking process,
              we make every aspect of your rental experience as smooth as it
              can be.
            </p>
          </motion.div>

          {/* Differentiators grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <Differentiator
              icon={<Shield size={20} />}
              title="Vetted Fleet"
              description="Every vehicle is inspected, insured, and road-ready before every hire."
              index={0}
            />
            <Differentiator
              icon={<FileCheck size={20} />}
              title="Verified Documents"
              description="Digital verification for faster handover — no paperwork delays."
              index={1}
            />
            <Differentiator
              icon={<Sparkles size={20} />}
              title="Concierge Delivery"
              description="We bring the car to you — free delivery across Nairobi."
              index={2}
            />
            <Differentiator
              icon={<Award size={20} />}
              title={`Since ${TRUST_STATS.founded}`}
              description={`${yearsOperating} years of trust built on repeat customers and referrals.`}
              index={3}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — Our Standards
          What actually happens between hires.
          ══════════════════════════════════════════════════════ */}
      <section className="bg-background pt-8 lg:pt-12 pb-20 lg:pb-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Sunken panel — visually distinct from section 4 */}
          <div className="relative bg-surface-sunken border border-border rounded-2xl p-8 lg:p-14 overflow-hidden">

            {/* Copper hairline inside top */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

              {/* Left — label + headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-4"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-600 mb-4">
                  Our Standards
                </p>
                <h2 className="font-display text-3xl sm:text-4xl text-ink leading-[1.1] tracking-[-0.015em] mb-5">
                  What happens{' '}
                  <span className="italic font-light text-copper-700">
                    between hires.
                  </span>
                </h2>
                <p className="text-sm text-ink-muted leading-relaxed font-light max-w-md">
                  Every vehicle passes the same checklist we&apos;d use on
                  our own family car — before every single hire.
                </p>
              </motion.div>

              {/* Right — standards list */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.6,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5"
              >
                <Standard
                  title="Inspected before every hire"
                  description="Full mechanical and safety check."
                />
                <Standard
                  title="Comprehensively insured"
                  description="Every vehicle, every hire — no gaps."
                />
                <Standard
                  title="Detailed clean every time"
                  description="Interior and exterior, no exceptions."
                />
                <Standard
                  title="Concierge on call"
                  description="Reach a real person — day or night."
                />
                <Standard
                  title="Fuel-ready delivery"
                  description="Arrives with a full tank, ready to drive."
                />
                <Standard
                  title="Documented handover"
                  description="Photos, mileage, condition — on record."
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — By the Numbers
          ══════════════════════════════════════════════════════ */}
      <section className="bg-background pt-8 lg:pt-12 pb-20 lg:pb-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mb-16 lg:mb-20"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-600 mb-4">
              By the Numbers
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.1] tracking-[-0.015em]">
              Trust, measured.
            </h2>
          </motion.div>

          {/* Stats grid — 3 items now */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-16">
            <Stat
              value={`${fleetSize}`}
              label="Vehicles Available"
              sublabel="And growing"
              index={0}
            />
            <Stat
              value={`${TRUST_STATS.rating}`}
              label="Google Rating"
              sublabel={`${TRUST_STATS.reviewCount}+ reviews`}
              stars
              index={1}
            />
            <Stat
              value={`${yearsOperating}`}
              label="Years Operating"
              sublabel={`Since ${TRUST_STATS.founded}`}
              index={2}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — Where to Find Us (handshake close)
          ══════════════════════════════════════════════════════ */}
      <section className="bg-background pb-24 lg:pb-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-surface border border-border rounded-2xl p-8 lg:p-14 overflow-hidden">

            {/* Ambient glow */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 500px 300px at 90% 20%, rgba(194,112,46,0.10) 0%, transparent 60%)',
              }}
            />

            {/* Copper top hairline */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent"
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

              {/* Left — invitation */}
              <div className="lg:col-span-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-600 mb-4">
                  Visit or Call
                </p>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.1] tracking-[-0.015em] mb-5">
                  Come see the{' '}
                  <span className="italic font-light text-copper-700">
                    fleet.
                  </span>
                </h2>
                <p className="text-base lg:text-lg text-ink-muted leading-relaxed font-light max-w-xl mb-8">
                  Our office is in Utawala, Nairobi. Stop by to view a
                  vehicle in person, or call ahead and we&apos;ll have it
                  waiting.
                </p>

                {/* Address lines */}
                <div className="flex items-start gap-3 text-sm">
                  <MapPin
                    size={16}
                    className="text-copper-500 shrink-0 mt-0.5"
                  />
                  <div className="space-y-0.5">
                    <p className="text-ink font-medium">
                      {CONTACT.address.line1}
                    </p>
                    <p className="text-ink-muted">
                      {CONTACT.address.landmark}
                    </p>
                    <p className="text-ink-muted">
                      {CONTACT.address.city}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right — actions */}
              <div className="lg:col-span-5 flex flex-col gap-3">
                <a
                  href={`tel:${BRAND.phones[0].replace(/\s/g, '')}`}
                  className="group flex items-center justify-between gap-4 px-6 py-5 bg-obsidian-950 rounded-lg transition-all duration-300 ease-lux hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(14,14,16,0.20)]"
                >
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-copper-400 mb-1">
                      Call Us
                    </p>
                    <p className="font-display text-xl text-white leading-none tabular-nums">
                      {BRAND.phones[0]}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    strokeWidth={2.5}
                    className="text-white/40 transition-all duration-300 ease-lux group-hover:text-copper-300 group-hover:translate-x-0.5"
                  />
                </a>

                <a
                  href={CONTACT.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-between gap-4 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink border border-border rounded-lg hover:border-copper-500/50 hover:bg-copper-500/[0.04] transition-all duration-300 ease-lux"
                >
                  <span>Get directions</span>
                  <ArrowRight
                    size={14}
                    strokeWidth={2.5}
                    className="text-ink-subtle transition-all duration-300 ease-lux group-hover:text-copper-600 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   DIFFERENTIATOR
   4-tile grid item in section 4.
   ───────────────────────────────────────────────────────────── */
function Differentiator({
  icon,
  title,
  description,
  index = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group bg-surface border border-border rounded-2xl p-6 transition-all duration-500 ease-lux hover:border-copper-500/40 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(14,14,16,0.08)]"
    >
      <div className="w-11 h-11 rounded-xl bg-copper-500/[0.10] border border-copper-500/25 flex items-center justify-center mb-5 text-copper-600 transition-transform duration-500 ease-lux group-hover:scale-105">
        {icon}
      </div>
      <h3 className="font-display text-lg text-ink mb-2 leading-tight tracking-[-0.005em]">
        {title}
      </h3>
      <p className="text-sm text-ink-muted leading-relaxed font-light">
        {description}
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STANDARD
   Checklist item in section 5.
   ───────────────────────────────────────────────────────────── */
function Standard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="shrink-0 mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-copper-500/[0.12] border border-copper-500/30">
        <Check
          size={11}
          strokeWidth={3}
          className="text-copper-600"
        />
      </span>
      <div>
        <p className="text-sm font-medium text-ink leading-tight mb-1">
          {title}
        </p>
        <p className="text-xs text-ink-muted leading-relaxed font-light">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STAT
   Big number in section 6.
   ───────────────────────────────────────────────────────────── */
function Stat({
  value,
  label,
  sublabel,
  stars,
  index = 0,
}: {
  value: string;
  label: string;
  sublabel?: string;
  stars?: boolean;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {stars && (
        <div className="flex gap-0.5 mb-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star
              key={i}
              size={14}
              className="fill-copper-500 text-copper-500"
            />
          ))}
        </div>
      )}
      <p className="font-display text-5xl lg:text-6xl text-ink leading-none mb-3 tabular-nums tracking-[-0.02em]">
        {value}
      </p>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-subtle mb-1">
        {label}
      </p>
      {sublabel && (
        <p className="text-xs text-ink-muted font-light">{sublabel}</p>
      )}
    </motion.div>
  );
}
