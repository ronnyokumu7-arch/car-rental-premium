'use client';

import { motion } from 'motion/react';

const ITEMS = [
  { value: '4.9★', label: 'Google Rating' },
  { value: '46', label: 'Vehicles' },
  { value: '17', label: 'Partner Owners' },
  { value: '2019', label: 'Operating Since' },
  { value: 'JKIA', label: 'Airport Transfers' },
];

export function TrustBar() {
  return (
    <section className="bg-porcelain border-b border-charcoal-300/20 py-8 lg:py-10 px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 lg:gap-x-16 gap-y-4"
      >
        {ITEMS.map((item, i) => (
          <div key={item.label} className="flex items-center gap-4">
            {i > 0 && (
              <span className="hidden md:inline-block w-px h-4 bg-charcoal-300/40" />
            )}
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl lg:text-2xl text-primary-900">
                {item.value}
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-charcoal-500 font-medium">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}