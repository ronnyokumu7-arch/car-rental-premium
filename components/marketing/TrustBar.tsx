'use client';

import { motion } from 'motion/react';
import { TRUST_STATS } from '../../lib/testimonials';
import { getFleetSize } from '../../lib/vehicles';

/* ─────────────────────────────────────────────────────────────
   TRUST BAR
   Compact horizontal strip of verified facts.
   Sits between hero and content on the homepage.

   Every number comes from lib/ — never hardcode.
   Every claim must be provable.
   ───────────────────────────────────────────────────────────── */

const fleetSize = getFleetSize();

const ITEMS = [
  { value: `${TRUST_STATS.rating}★`, label: 'Google Rating' },
  { value: `${fleetSize}`,           label: 'Vehicles' },
  { value: `${TRUST_STATS.yearsOperating}`, label: 'Years Operating' },
  { value: TRUST_STATS.founded,      label: 'Since' },
  { value: 'JKIA',                   label: 'Airport Transfers' },
] as const;

export function TrustBar() {
  return (
    <section className="bg-background border-b border-border py-8 lg:py-10 px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 lg:gap-x-16 gap-y-4"
      >
        {ITEMS.map((item, i) => (
          <div key={item.label} className="flex items-center gap-4">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="hidden md:inline-block w-px h-4 bg-border-strong"
              />
            )}
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl lg:text-2xl text-ink tabular-nums">
                {item.value}
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-ink-subtle font-medium">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
