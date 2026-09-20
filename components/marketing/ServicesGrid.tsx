'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Car, Users, ArrowRight } from 'lucide-react';

export function ServicesGrid() {
  return (
    <section className="bg-charcoal-900 py-24 lg:py-32 px-6 lg:px-8 relative overflow-hidden">
      <div className="grain-overlay absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <p className="type-caption text-accent-500 mb-3">Our Services</p>
          <h2 className="font-display text-4xl lg:text-5xl text-porcelain leading-tight">
            Two Ways to Drive
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Self-Drive */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="bg-primary-900/50 backdrop-blur-sm border border-porcelain/10 rounded-sm p-8 lg:p-10 hover:border-accent-500/40 transition-all duration-500"
          >
            <div className="w-14 h-14 rounded-full bg-accent-500/15 border border-accent-500/30 flex items-center justify-center mb-6">
              <Car size={22} className="text-accent-500" />
            </div>
            <p className="type-caption text-accent-500 mb-3">Self-Drive Hire</p>
            <h3 className="font-display text-2xl lg:text-3xl text-porcelain mb-4">
              Your Car. Your Schedule.
            </h3>
            <p className="text-porcelain/70 leading-relaxed mb-8">
              Get around on your own terms. No delays, no drivers. Just you,
              your rental car, and your schedule — for city errands, weekend
              gateways, or the daily commute.
            </p>
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent-500 hover:text-porcelain transition-colors group"
            >
              Browse the Fleet
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          {/* Chauffeured */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-primary-900/50 backdrop-blur-sm border border-porcelain/10 rounded-sm p-8 lg:p-10 hover:border-accent-500/40 transition-all duration-500"
          >
            <div className="w-14 h-14 rounded-full bg-accent-500/15 border border-accent-500/30 flex items-center justify-center mb-6">
              <Users size={22} className="text-accent-500" />
            </div>
            <p className="type-caption text-accent-500 mb-3">Chauffeured Hire</p>
            <h3 className="font-display text-2xl lg:text-3xl text-porcelain mb-4">
              Executive Cars. Sharp Drivers.
            </h3>
            <p className="text-porcelain/70 leading-relaxed mb-8">
              Friendly, safe, and professional chauffeurs. From weddings and
              galas to airport pickups and drop-offs — every ride feels
              first-class, every time.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent-500 hover:text-porcelain transition-colors group"
            >
              Book a Chauffeur
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