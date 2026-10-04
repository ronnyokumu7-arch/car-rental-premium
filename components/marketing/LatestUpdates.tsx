'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { getPostsSorted } from '../../lib/posts';
import { FeaturedPost } from './FeaturedPost';
import { UpdateIndex } from './UpdateIndex';

/* ─────────────────────────────────────────────────────────────
   LATEST UPDATES — "From the road"
   Homepage section that presents the newest posts as an
   editorial page, not a card grid.

   Layout:
     Featured post (lead story) + index of the next 3 posts

   Desktop: 7/5 split — featured left, index right
   Mobile:  featured on top, index stacked below
   ───────────────────────────────────────────────────────────── */

export function LatestUpdates() {
  const sorted = getPostsSorted();
  const featured = sorted[0];
  const index = sorted.slice(1, 4);

  /* Nothing to render if no posts */
  if (!featured) return null;

  return (
    <section className="relative bg-background pt-20 lg:pt-28 pb-16 lg:pb-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ═══════════════════════════════════════════
            Section header
            ═══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16"
        >
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-600 mb-4">
              From the Road
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.1] tracking-[-0.015em] mb-5">
              Stories, guides &amp; fleet news.
            </h2>
            <p className="text-base lg:text-lg text-ink-muted leading-relaxed font-light max-w-2xl">
              What we&apos;re adding, where we&apos;re driving, and what
              we&apos;re learning along the way.
            </p>
          </div>

          <Link
            href="/updates"
            className="hidden md:inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink hover:text-copper-600 transition-colors duration-300 group whitespace-nowrap"
          >
            All updates
            <ArrowRight
              size={14}
              strokeWidth={2.5}
              className="transition-transform duration-300 ease-lux group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* ═══════════════════════════════════════════
            Featured + Index
            Desktop: 7/5 grid
            Mobile:  stacked
            ═══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* ── Featured post ── */}
          <div className="lg:col-span-7">
            <FeaturedPost post={featured} />
          </div>

          {/* ── Index of next 3 posts ── */}
          <div className="lg:col-span-5">
            <UpdateIndex posts={index} />
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            Mobile CTA
            ═══════════════════════════════════════════ */}
        <div className="md:hidden mt-10">
          <Link
            href="/updates"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-copper-600 hover:text-copper-700 transition-colors duration-300 group"
          >
            All updates
            <ArrowRight
              size={14}
              strokeWidth={2.5}
              className="transition-transform duration-300 ease-lux group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
