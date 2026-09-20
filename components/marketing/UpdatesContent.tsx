'use client';

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { POSTS, CATEGORIES, type Category } from '../../lib/posts';
import { FeaturedPost } from './FeaturedPost';
import { PostCard } from './PostCard';

export function UpdatesContent() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const featured = useMemo(
    () => POSTS.find((p) => p.featured) ?? null,
    []
  );

  const filtered = useMemo(() => {
    const list =
      activeCategory === 'All'
        ? POSTS.filter((p) => !p.featured)
        : POSTS.filter(
            (p) => !p.featured && p.category === activeCategory
          );
    return list;
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-porcelain">
      {/* ═══════════════════════════════════════════════════
          Hero
          ═══════════════════════════════════════════════════ */}
      <section className="relative bg-primary-900 pt-32 pb-20 lg:pb-24 px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 70% 30%, rgba(201, 162, 39, 0.2) 0%, transparent 60%)',
          }}
        />
        <div className="grain-overlay absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <p className="type-caption text-accent-500 mb-4">Updates</p>
          <h1 className="type-display text-porcelain mb-6 max-w-3xl">
            News & Insights from the{' '}
            <span className="italic font-light">Road</span>
          </h1>
          <p className="type-lead text-porcelain/60 max-w-2xl">
            Fleet additions, travel guides, seasonal offers, and the
            occasional story from behind the wheel.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          Featured Post
          ═══════════════════════════════════════════════════ */}
      {featured && (
        <section className="py-16 lg:py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <FeaturedPost post={featured} />
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          Category Filter + Grid
          ═══════════════════════════════════════════════════ */}
      <section className="pb-24 lg:pb-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-2 mb-10 pb-8 border-b border-charcoal-300/30"
          >
            <span className="text-[10px] uppercase tracking-widest text-charcoal-500 font-medium mr-2">
              Filter
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[11px] font-medium uppercase tracking-wider rounded-sm border transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-primary-900 text-porcelain border-primary-900'
                    : 'bg-transparent text-charcoal-700 border-charcoal-300/40 hover:border-primary-900/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filtered.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="font-display text-2xl text-primary-900 mb-3">
                No posts in this category yet
              </p>
              <p className="text-sm text-charcoal-500 mb-6">
                Try another category, or check back soon.
              </p>
              <button
                onClick={() => setActiveCategory('All')}
                className="btn-primary"
              >
                Show All Posts
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          Bottom CTA
          ═══════════════════════════════════════════════════ */}
      <section className="bg-charcoal-900 py-24 lg:py-28 px-6 lg:px-8 relative overflow-hidden">
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
            Have a Question?
          </p>
          <h2 className="font-display text-4xl lg:text-5xl text-porcelain leading-tight mb-6">
            We&apos;re Here to Help
          </h2>
          <p className="text-porcelain/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Can&apos;t find what you&apos;re looking for? Send us an enquiry
            — we respond within two hours during business hours.
          </p>
          <a
            href="/contact"
            className="btn-primary inline-block"
          >
            Get in Touch
          </a>
        </motion.div>
      </section>
    </main>
  );
}