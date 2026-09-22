'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Star, ArrowRight } from 'lucide-react';
import { TestimonialCard } from './TestimonialCard';
import { TESTIMONIALS, TRUST_STATS } from '../../lib/testimonials';

export function Testimonials() {
  const featured = TESTIMONIALS.filter((t) => t.featured);

  return (
    <section className="relative bg-porcelain py-20 lg:py-28 px-6 lg:px-8 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <p className="type-caption text-accent-600 mb-3">Testimonials</p>
          <h2 className="type-h1 text-primary-900 mb-6">
            Trusted by Travellers Across Kenya
          </h2>
          <p className="type-lead">
            Real reviews from real customers — business travellers, families,
            and visitors who chose Royride for their journey.
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 pt-12 border-t border-charcoal-300/30"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <TrustStat
              value={`${TRUST_STATS.rating}/5`}
              label="Average Rating"
              icon={
                <div className="flex justify-center gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      size={12}
                      className="fill-accent-500 text-accent-500"
                    />
                  ))}
                </div>
              }
            />
            <TrustStat
              value={`${TRUST_STATS.reviewCount}+`}
              label="Google Reviews"
            />
            <TrustStat
              value={TRUST_STATS.customerInteractions}
              label="Happy Customers"
            />
            <TrustStat
              value={`Since ${TRUST_STATS.founded}`}
              label="Serving Nairobi"
            />
          </div>
        </motion.div>

        {/* CTA link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-accent-600 hover:text-primary-900 transition-colors group"
          >
            Read All 119+ Reviews
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function TrustStat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      {icon && <div className="mb-2">{icon}</div>}
      <p className="font-display text-3xl lg:text-4xl text-primary-900 mb-2">
        {value}
      </p>
      <p className="text-[10px] uppercase tracking-widest text-charcoal-500">
        {label}
      </p>
    </div>
  );
}