'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { type Post, formatDate } from '../../lib/posts';
import { getCategoryIcon } from '../../lib/postIcons';

/* ─────────────────────────────────────────────────────────────
   FEATURED POST
   The lead story on the homepage's "From the road" section.
   Two-column editorial: dark visual panel on the left,
   ivory content panel on the right.

   Used only by LatestUpdates.tsx
   ───────────────────────────────────────────────────────────── */

interface FeaturedPostProps {
  post: Post;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  const Icon = getCategoryIcon(post.category);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/updates/${post.slug}`}
        className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-500 ease-lux hover:border-copper-500/40 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(14,14,16,0.08),0_32px_64px_rgba(14,14,16,0.06)] focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* ═══════════════════════════════════════════
              VISUAL PANEL
              ═══════════════════════════════════════════ */}
          <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[440px] overflow-hidden flex items-center justify-center bg-obsidian-950">

            {/* Post's own gradient */}
            <div
              aria-hidden="true"
              className="absolute inset-0 transition-transform duration-700 ease-lux group-hover:scale-[1.04]"
              style={{
                background: `linear-gradient(135deg, ${post.accentFrom} 0%, ${post.accentTo} 100%)`,
              }}
            />

            {/* Copper ambient glow */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-60 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 45%, rgba(194,112,46,0.35) 0%, transparent 65%)',
              }}
            />

            {/* Grain */}
            <div className="grain-overlay absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none" />

            {/* Bottom gradient for the icon + label legibility */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(7,7,8,0.55) 0%, transparent 40%)',
              }}
            />

            {/* Centered category icon + label */}
            <div className="relative flex flex-col items-center gap-5">
              <Icon
                size={56}
                strokeWidth={1}
                className="text-copper-300 transition-transform duration-700 ease-lux group-hover:scale-110"
              />
              <span className="text-[11px] uppercase tracking-[0.28em] text-white/85 font-semibold">
                {post.category}
              </span>
            </div>

            {/* Featured badge — top left */}
            <div className="absolute top-5 left-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-copper-500 text-obsidian-950 rounded-md text-[10px] font-bold uppercase tracking-[0.16em] shadow-[0_4px_12px_rgba(194,112,46,0.35)]">
                Lead Story
              </span>
            </div>

            {/* Reading time — bottom left */}
            <div className="absolute bottom-5 left-5">
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/55 font-medium">
                {post.readTime}
              </span>
            </div>
          </div>

          {/* ═══════════════════════════════════════════
              CONTENT PANEL
              ═══════════════════════════════════════════ */}
          <div className="flex flex-col justify-center p-8 lg:p-12">

            {/* Date + category meta */}
            <div className="flex items-center gap-3 mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-subtle">
              <span>{formatDate(post.publishedAt)}</span>
              <span
                aria-hidden="true"
                className="w-px h-3 bg-border-strong"
              />
              <span>{post.category}</span>
            </div>

            {/* Title */}
            <h3 className="font-display text-2xl lg:text-3xl xl:text-4xl text-ink leading-[1.15] tracking-[-0.015em] mb-6 transition-colors duration-300 group-hover:text-copper-700">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-base text-ink-muted leading-relaxed font-light mb-8 line-clamp-3">
              {post.excerpt}
            </p>

            {/* Author + CTA */}
            <div className="flex items-center justify-between pt-6 mt-auto border-t border-border gap-4">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink truncate">
                  {post.author.name}
                </p>
                {post.author.role && (
                  <p className="text-[10px] uppercase tracking-[0.16em] text-ink-subtle mt-1 truncate">
                    {post.author.role}
                  </p>
                )}
              </div>

              <span className="shrink-0 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-copper-600 transition-all duration-300 ease-lux group-hover:gap-3">
                Read
                <ArrowRight size={13} strokeWidth={2.5} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
