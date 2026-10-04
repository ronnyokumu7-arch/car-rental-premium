'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { getFleetSize } from '../../lib/vehicles';

/* ─────────────────────────────────────────────────────────────
   ABOUT SNAPSHOT
   Short "who we are" section — homepage only.

   Two-column editorial:
     • Left:  label + headline
     • Right: 2 paragraphs + CTA

   Data-driven: fleet count and founding year come from lib/.
   ───────────────────────────────────────────────────────────── */

export function AboutSnapshot() {
  const fleetSize = getFleetSize();

  return (
    <section className="relative bg-background pt-20 lg:pt-28 pb-16 lg:pb-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* ═══════════════════════════════════════════
              LEFT — Label + headline
              ═══════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-600 mb-4">
              About Royride
            </p>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.1] tracking-[-0.015em]">
              Built on trust.
              <br />
              <span className="italic font-light text-copper-700">
                Driven by detail.
              </span>
            </h2>
          </motion.div>

          {/* ═══════════════════════════════════════════
              RIGHT — Content
              ═══════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-7 space-y-6"
          >
            <p className="text-lg lg:text-xl text-ink-muted leading-relaxed font-light">
              Royride offers convenient, cost-effective car rental to
              individuals, businesses, and expats across Nairobi — with{' '}
              <span className="text-ink font-normal not-italic">
                {fleetSize} vehicles
              </span>{' '}
              and more coming soon.
            </p>

            <p className="text-base lg:text-lg text-ink-muted leading-relaxed font-light">
              From economy saloons to executive SUVs — including the Toyota
              Prado, Mazda CX-5, Nissan X-Trail, and Honda Stepwgn (7-seater
              van) — every vehicle is vetted, insured, and maintained to a
              standard we&apos;d want for our own family.
            </p>

            {/* ── CTA ── */}
            <div className="pt-2">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink hover:text-copper-600 transition-colors duration-300"
              >
                Read our story
                <ArrowRight
                  size={14}
                  strokeWidth={2.5}
                  className="transition-transform duration-300 ease-lux group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
