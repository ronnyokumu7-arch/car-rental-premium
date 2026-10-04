'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { type Post, formatDate } from '../../lib/posts';
import { getCategoryIcon } from '../../lib/postIcons';

/* ─────────────────────────────────────────────────────────────
   COMPACT POST CARD
   Mid-size post card — used in grids where FeaturedPost is too
   large and UpdateIndex rows are too small.

   Layout:
     • Mobile:  horizontal — small visual tile on the left,
                content on the right (~140px total height)
     • Desktop: vertical — visual on top, content below

   Used by: PostCard.tsx consumers, /updates grid fallback
   ───────────────────────────────────────────────────────────── */

interface CompactPostCardProps {
  post: Post;
  index?: number;
}

export function CompactPostCard({ post, index = 0 }: CompactPostCardProps) {
  const Icon = getCategoryIcon(post.category);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <Link
        href={`/updates/${post.slug}`}
        className="group flex flex-col h-full overflow-hidden rounded-2xl border border-border bg-surface hover:border-copper-500/40 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(14,14,16,0.08),0_32px_64px_rgba(14,14,16,0.06)] transition-all duration-500 ease-lux focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2"
      >
        <div className="flex flex-row sm:flex-col flex-1">

          {/* ═══════════════════════════════════════════
              VISUAL PANEL
              Mobile:  narrow column on the left
              Desktop: full-width banner on top
              ═══════════════════════════════════════════ */}
          <div className="relative shrink-0 w-[120px] sm:w-full sm:aspect-[16/10] aspect-[3/4] overflow-hidden flex items-center justify-center bg-obsidian-950">

            {/* Post gradient */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
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
                  'radial-gradient(ellipse at 50% 50%, rgba(194,112,46,0.30) 0%, transparent 65%)',
              }}
            />

            {/* Grain */}
            <div className="grain-overlay absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none" />

            {/* Icon + category */}
            <div className="relative flex flex-col items-center gap-2 sm:gap-3">
              <Icon
                size={24}
                strokeWidth={1.25}
                className="text-copper-300 sm:w-9 sm:h-9 transition-transform duration-700 ease-lux group-hover:scale-110"
              />
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.20em] text-white/80 font-semibold">
                {post.category}
              </span>
            </div>

            {/* Hover action — desktop only */}
            <div className="hidden sm:block absolute top-3 right-3">
              <div className="w-9 h-9 rounded-full bg-obsidian-950/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 ease-lux">
                <ArrowUpRight size={14} strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════
              CONTENT
              ═══════════════════════════════════════════ */}
          <div className="flex flex-col flex-1 p-4 sm:p-5 min-w-0">

            {/* Title */}
            <h3 className="font-display text-base sm:text-lg lg:text-xl text-ink leading-snug tracking-[-0.005em] mb-2 sm:mb-3 group-hover:text-copper-700 transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-xs text-ink-muted leading-relaxed font-light line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4">
              {post.excerpt}
            </p>

            {/* Meta footer */}
            <div className="mt-auto pt-3 border-t border-border">

              {/* Mobile — compact single line */}
              <div className="sm:hidden flex items-center flex-wrap gap-x-2 gap-y-1 text-[10px] font-medium uppercase tracking-[0.16em]">
                <span className="text-ink-subtle">
                  {formatDate(post.publishedAt)}
                </span>
                <span
                  aria-hidden="true"
                  className="text-border-strong"
                >
                  ·
                </span>
                <span className="text-ink-subtle truncate">
                  {post.author.name}
                </span>
              </div>

              {/* Desktop — author + read time */}
              <div className="hidden sm:flex items-center justify-between gap-3 text-[10px] font-medium uppercase tracking-[0.16em]">
                <span className="text-ink-subtle truncate">
                  {post.author.name}
                </span>
                <span className="text-ink-subtle shrink-0">
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
