'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { POSTS } from '../../lib/posts';
import { CompactPostCard } from './CompactPostCard';

export function LatestUpdates() {
  // 3 most recent posts by publishedAt
  const sorted = [...POSTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const latest = sorted.slice(0, 3);

  return (
    <section className="bg-porcelain pt-20 lg:pt-28 pb-8 lg:pb-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <p className="type-caption text-accent-600 mb-3">
              Latest Updates
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-primary-900 leading-tight mb-4">
              News &amp; Insights from the{' '}
              <span className=" font-light">Road</span>
            </h2>
            <p className="type-lead">
              Fleet additions, travel guides, seasonal offers — and the
              occasional story from behind the wheel.
            </p>
          </div>

          <Link
            href="/updates"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-primary-900 hover:text-accent-600 transition-colors group whitespace-nowrap"
          >
            View All Updates
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* Carousel — horizontal scroll on mobile, grid on desktop */}
        <div
          className="
            flex lg:grid lg:grid-cols-3 gap-5 lg:gap-6
            overflow-x-auto lg:overflow-visible
            snap-x snap-mandatory lg:snap-none
            -mx-6 lg:mx-0
            px-6 lg:px-0
            pb-4 lg:pb-0
            scrollbar-hide
          "
        >
          {latest.map((post, i) => (
            <CompactPostCard key={post.id} post={post} index={i} />
          ))}
        </div>

        {/* Mobile CTA — text + arrow, left-aligned */}
        <div className="md:hidden mt-10">
          <Link
            href="/updates"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent-600 hover:text-primary-900 transition-colors group"
          >
            View All Updates
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}