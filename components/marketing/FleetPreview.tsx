'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { VehicleCard } from './VehicleCard';
import { VEHICLES } from '../../lib/vehicles';

export function FleetPreview() {
  return (
    <section className="bg-porcelain py-24 lg:py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div className="max-w-2xl">
            <p className="type-caption text-accent-600 mb-3">
              Our Fleet
            </p>
            <h2 className="type-h1 text-primary-900 mb-4">
              Curated for Every Journey
            </h2>
            <p className="type-lead">
              From executive SUVs to family vans — every vehicle maintained, 
              inspected, and delivered ready.
            </p>
          </div>

          <Link
            href="/vehicles"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-primary-900 hover:text-accent-500 transition-colors group"
          >
            View Full Fleet
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {VEHICLES.map((vehicle, index) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
          ))}
        </div>

        {/* ── Mobile CTA ── */}
        <div className="mt-12 md:hidden text-center">
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 btn-primary"
          >
            View Full Fleet
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}