'use client';

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { getPostsSorted, POST_CATEGORIES, type Category } from '../../lib/posts';
import { CompactPostCard } from './CompactPostCard';

/* ─────────────────────────────────────────────────────────────
   UPDATES CONTENT
   The /updates page — an index of all posts with category
   filtering.

   Structure:
     1. Hero — light editorial header
     2. Category filter — sticky chips
     3. Post grid — 3-col on desktop, full-width on mobile

   Does NOT include:
     • FeaturedPost — that's the homepage's job
     • FinalCTA — that's rendered by app/updates/page.tsx

   Data comes from lib/posts.ts — never hardcoded.
   ───────────────────────────────────────────────────────────── */

const ALL_CATEGORIES: readonly Category[] = ['All', ...POST_CATEGORIES];

export function UpdatesContent() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filtered = useMemo(() => {
    const sorted = getPostsSorted();
    if (activeCategory === 'All') return sorted;
    return sorted.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════ */}
      <section className="relative bg-obsidian-950 pt-32 lg:pt-40 pb-20 lg:pb-24 px-6 lg:px-8 overflow-hidden">

        {/* Ambient lighting */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 900px 600px at 75% 25%, rgba(194,112,46,0.18) 0%, transparent 55%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 700px 500px at 5% 100%, rgba(63,63,70,0.30) 0%, transparent 60%)',
          }}
        />

        {/* Grain */}
        <div className="grain-overlay absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" />

        {/* Copper bottom hairline */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/25 to-transparent"
        />

        <div className="relative max-w-5xl mx-auto">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-400 mb-5">
            Updates
          </p>
          <h1 className="font-display text-white leading-[1.02] tracking-[-0.025em] mb-8 text-[clamp(2.5rem,7vw,5rem)] max-w-3xl">
            From the road.{' '}
            <span className="italic font-light text-copper-200">
              Notes from Nairobi.
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-white/65 leading-relaxed font-light max-w-2xl">
            Fleet additions, travel guides, seasonal offers, and the
            occasional story from behind the wheel.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CATEGORY FILTER + GRID
          ═══════════════════════════════════════════════════ */}
      <section className="bg-background pt-12 lg:pt-16 pb-24 lg:pb-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* ── Filter bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center flex-wrap gap-2 mb-12 pb-8 border-b border-border"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-subtle mr-3">
              Filter
            </span>

            {ALL_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const count =
                cat === 'All'
                  ? getPostsSorted().length
                  : getPostsSorted().filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={isActive}
                  className={`group inline-flex items-center gap-2 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] rounded-full border transition-all duration-300 ease-lux focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2 ${
                    isActive
                      ? 'bg-obsidian-900 border-obsidian-900 text-white shadow-[0_4px_12px_rgba(14,14,16,0.15)]'
                      : 'bg-surface border-border text-ink-muted hover:border-copper-500/40 hover:text-ink'
                  }`}
                >
                  {cat}
                  <span
                    className={`text-[10px] tabular-nums ${
                      isActive ? 'text-white/60' : 'text-ink-subtle'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* ── Posts grid ── */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {filtered.map((post, i) => (
                <CompactPostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          ) : (
            <EmptyState
              category={activeCategory}
              onClear={() => setActiveCategory('All')}
            />
          )}
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   EMPTY STATE
   ───────────────────────────────────────────────────────────── */
function EmptyState({
  category,
  onClear,
}: {
  category: Category;
  onClear: () => void;
}) {
  return (
    <div className="py-24 px-8 text-center bg-surface-sunken border border-border rounded-2xl">
      <p className="font-display text-2xl lg:text-3xl text-ink mb-3 tracking-[-0.01em]">
        Nothing in {category} yet.
      </p>
      <p className="text-sm text-ink-muted mb-8 max-w-md mx-auto leading-relaxed font-light">
        Try another category, or check back soon — we publish new stories
        every few weeks.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center justify-center px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink border border-border rounded-full hover:border-copper-500/60 hover:text-copper-600 transition-all duration-300 ease-lux"
      >
        Show all posts
      </button>
    </div>
  );
}
