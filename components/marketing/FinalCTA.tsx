'use client';

import Link from 'next/link';
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

export function FinalCTA() {
  return (
    <section className="bg-charcoal-900 relative overflow-hidden">
      {/* Grain texture */}
      <div className="grain-overlay absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" />

      {/* ── Brands banner — top band ── */}
      <div className="relative border-b border-porcelain/10 py-12 lg:py-14 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="text-center text-[10px] uppercase tracking-[0.2em] text-porcelain/40 mb-8"
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
                  <span className="hidden md:inline-block w-1 h-1 rounded-full bg-accent-500/40" />
                )}
                <span className="font-display text-base lg:text-lg text-porcelain/70 tracking-[0.15em]">
                  {brand}
                </span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── CTA content ── */}
      <div className="relative py-24 lg:py-32 px-6 lg:px-8">
        {/* Gold radial glow */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(201, 162, 39, 0.2) 0%, transparent 60%)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <p className="type-caption text-accent-500 mb-4">
            Ready When You Are
          </p>
          <h2 className="font-display text-4xl lg:text-5xl text-porcelain leading-tight mb-6">
            Let&apos;s Get You on the{' '}
            <span className="italic font-light">Road</span>
          </h2>
          <p className="text-porcelain/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Browse the fleet, book a chauffeur, or send us an enquiry. We
            respond within two hours during business hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/vehicles" className="btn-primary inline-block">
              Explore the Fleet
            </Link>
            <Link
              href="/contact"
              className="btn-secondary border-porcelain text-porcelain hover:bg-porcelain hover:text-primary-900 inline-block"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}