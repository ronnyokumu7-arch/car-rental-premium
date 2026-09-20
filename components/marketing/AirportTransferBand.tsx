'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';

const BENEFITS = [
  'Real-time flight tracking',
  'Punctual airport pickups',
  'Clean, comfortable vehicles',
  'Direct drop-offs to hotel or residence',
];

export function AirportTransferBand() {
  return (
    <section className="bg-primary-900 py-20 lg:py-28 px-6 lg:px-8 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 80% 50%, rgba(201, 162, 39, 0.25) 0%, transparent 60%)',
        }}
      />
      <div className="grain-overlay absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="type-caption text-accent-500 mb-3">
              Airport Transfers
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-porcelain leading-tight mb-6">
              Arriving Soon at{' '}
              <span className="italic font-light">JKIA?</span>
            </h2>
            <p className="text-porcelain/70 leading-relaxed mb-6">
              Your chauffeur will meet you on arrival, help with the
              baggage, and transport you safely to your hotel, residence, or
              office.
            </p>
            <ul className="space-y-3">
              {BENEFITS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-porcelain/70 text-sm"
                >
                  <Check
                    size={16}
                    className="text-accent-500 shrink-0 mt-0.5"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right pricing card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-porcelain/5 backdrop-blur-sm border border-porcelain/10 rounded-sm p-8 lg:p-10"
          >
            <p className="text-[10px] uppercase tracking-widest text-accent-500 mb-3">
              Starting From
            </p>
            <p className="font-display text-5xl lg:text-6xl text-porcelain leading-none mb-4">
              USD 50
            </p>
            <p className="text-porcelain/60 text-sm leading-relaxed mb-8">
              JKIA to any hotel or residence within Nairobi. VIP transfers
              from USD 50.
            </p>
            <Link
              href="/contact?service=Airport+Transfer"
              className="btn-primary inline-flex items-center justify-center gap-2 w-full"
            >
              Schedule a Transfer
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}