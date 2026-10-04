'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { type Post, formatDate } from '../../lib/posts';
import { getCategoryIcon } from '../../lib/postIcons';

/* ─────────────────────────────────────────────────────────────
   UPDATE INDEX
   Compact numbered list of posts — the "also in this issue"
   column beside the featured post.

   No images. No big cards. Just:
     number · category · title · date · read time · arrow

   Purpose:
     • Compact on mobile (each row ~100px, not ~500px)
     • Editorial feel — reads like a table of contents
     • On desktop, sits beside the FeaturedPost in a 5-col slot

   Used only by LatestUpdates.tsx
   ───────────────────────────────────────────────────────────── */

interface UpdateIndexProps {
  posts: Post[];
}

export function UpdateIndex({ posts }: UpdateIndexProps) {
  if (posts.length === 0) return null;

  return (
    <div className="flex flex-col h-full">

      {/* ── Header label ── */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
        <span
          aria-hidden="true"
          className="w-6 h-px bg-copper-500/50"
        />
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink-subtle">
          Also in this issue
        </p>
      </div>

      {/* ── The list ── */}
      <div className="flex flex-col">
        {posts.map((post, i) => (
          <IndexRow key={post.id} post={post} index={i} />
        ))}
      </div>

      {/* ── Footer hint ── */}
      <p className="mt-auto pt-6 text-[11px] uppercase tracking-[0.16em] text-ink-subtle font-medium">
        More on the updates page
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   INDEX ROW
   One line item. Numbered, compact, hoverable.
   ───────────────────────────────────────────────────────────── */

function IndexRow({ post, index }: { post: Post; index: number }) {
  const Icon = getCategoryIcon(post.category);
  const rowNumber = String(index + 2).padStart(2, '0'); // 02, 03, 04 (01 is the featured post)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.5,
        delay: 0.1 + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/updates/${post.slug}`}
        className="group flex items-start gap-4 py-5 border-b border-border last:border-b-0 transition-colors duration-300 hover:border-copper-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2 rounded-sm"
      >
        {/* ── Row number (mono) ── */}
        <span
          aria-hidden="true"
          className="shrink-0 font-mono text-[11px] tracking-[0.14em] text-ink-subtle tabular-nums pt-1 transition-colors duration-300 group-hover:text-copper-500"
        >
          {rowNumber}
        </span>

        {/* ── Content ── */}
        <div className="flex-1 min-w-0">

          {/* Category row */}
          <div className="flex items-center gap-2 mb-2">
            <Icon
              size={12}
              strokeWidth={2}
              className="text-copper-500 shrink-0"
            />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-subtle">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display text-lg lg:text-xl text-ink leading-snug tracking-[-0.005em] mb-2 transition-colors duration-300 group-hover:text-copper-700">
            {post.title}
          </h3>

          {/* Meta line */}
          <div className="flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.16em] text-ink-subtle">
            <span>{formatDate(post.publishedAt)}</span>
            <span
              aria-hidden="true"
              className="w-1 h-1 rounded-full bg-border-strong"
            />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* ── Arrow ── */}
        <span
          aria-hidden="true"
          className="shrink-0 mt-1 flex items-center justify-center w-8 h-8 rounded-full border border-border transition-all duration-300 ease-lux group-hover:border-copper-500/60 group-hover:bg-copper-500/[0.06]"
        >
          <ArrowUpRight
            size={13}
            strokeWidth={2.5}
            className="text-ink-muted transition-all duration-300 ease-lux group-hover:text-copper-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </Link>
    </motion.div>
  );
}
