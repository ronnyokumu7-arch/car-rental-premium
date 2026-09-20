'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function AboutSnapshot() {
  return (
    <section className="bg-porcelain py-20 lg:py-28 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <p className="type-caption text-accent-600 mb-3">About Royride</p>
            <h2 className="font-display text-4xl lg:text-5xl text-primary-900 leading-tight mb-6">
              Built on Trust.
              <br />
              <span className="italic font-light">Driven by Detail.</span>
            </h2>
          </motion.div>

          {/* Right content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 space-y-6 text-charcoal-700 leading-relaxed text-lg"
          >
            <p>
              Royride offers convenient, cost-effective car rental to
              individuals, businesses, and expats across Nairobi — with{' '}
              <span className="text-primary-900 font-semibold">
                46 vehicles
              </span>{' '}
              and more coming soon.
            </p>
            <p>
              From economy saloons to executive SUVs — including the Toyota
              Prado, Mazda CX-5, and Honda Stepwgn (7 seater) — every
              vehicle is vetted, insured, and maintained to a standard
              we&apos;d want for our own family.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent-600 hover:text-primary-900 transition-colors group pt-2"
            >
              Read Our Story
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}