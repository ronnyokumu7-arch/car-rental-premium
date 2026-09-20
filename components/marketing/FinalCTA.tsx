'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

export function FinalCTA() {
  return (
    <section className="bg-charcoal-900 py-24 lg:py-32 px-6 lg:px-8 relative overflow-hidden">
      <div className="grain-overlay absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" />
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
          Let&apos;s get you on the{' '}
          <span className="font-light">road</span>
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
    </section>
  );
}