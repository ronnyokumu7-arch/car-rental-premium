'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-primary-900 flex items-center justify-center">
      {/* Layered gradient background — mimics a dark cinematic image */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-700 to-charcoal-900" />

      {/* Radial glow — warm accent light source top-right */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 75% 25%, rgba(201, 162, 39, 0.25) 0%, transparent 55%)',
        }}
      />

      {/* Radial vignette — darkens edges for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(8, 21, 41, 0.75) 100%)',
        }}
      />

      {/* Grain texture overlay */}
      <div className="grain-overlay absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" />

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center pt-24 pb-32">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="type-caption text-accent-500 mb-6"
        >
          Premium Car Hire · Nairobi
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="type-display text-porcelain mb-8"
        >
          Drive the{' '}
          <span className="italic font-light">Extraordinary</span>
        </motion.h1>

        {/* Lead paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="type-lead text-porcelain/70 max-w-xl mx-auto mb-12"
        >
          Curated vehicles. Concierge service. Delivered to your door.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/vehicles" className="btn-primary">
            Explore the Fleet
          </Link>
          <Link
            href="/contact"
            className="btn-secondary border-porcelain text-porcelain hover:bg-porcelain hover:text-primary-900"
          >
            Book a Consultation
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-porcelain/40"
        >
          <span className="type-caption text-porcelain/40">Scroll</span>
          <svg
            width="14"
            height="20"
            viewBox="0 0 14 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 2v16M1 12l6 6 6-6" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}