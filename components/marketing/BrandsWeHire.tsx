'use client';

import { motion } from 'motion/react';

const BRANDS = [
  'Toyota',
  'Nissan',
  'Suzuki',
  'Mazda',
  'Honda',
  'Mercedes-Benz',
  'Volkswagen',
  'Land Rover',
];

export function BrandsWeHire() {
  return (
    <section className="bg-porcelain py-16 lg:py-20 px-6 lg:px-8 border-t border-charcoal-300/20">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center text-[10px] uppercase tracking-[0.2em] text-charcoal-500 mb-8"
        >
          Trusted Brands in Our Fleet
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-x-6 lg:gap-x-10 gap-y-4"
        >
          {BRANDS.map((brand, i) => (
            <span key={brand} className="flex items-center gap-6 lg:gap-10">
              {i > 0 && (
                <span className="hidden md:inline-block w-1 h-1 rounded-full bg-accent-500/50" />
              )}
              <span className="font-display text-base lg:text-lg text-charcoal-500 tracking-[0.15em]">
                {brand}
              </span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}