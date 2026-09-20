'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { type Post, formatDate } from '../../lib/posts';

interface CompactPostCardProps {
  post: Post;
  index?: number;
}

export function CompactPostCard({ post, index = 0 }: CompactPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="snap-start shrink-0 w-[85vw] sm:w-[45vw] lg:w-auto"
    >
      <Link
        href={`/updates/${post.slug}`}
        className="group flex flex-row sm:flex-col h-full overflow-hidden rounded-sm border border-charcoal-300/30 bg-porcelain hover:border-accent-500/40 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-500"
      >
        {/* ── Visual ── */}
        <div className="relative shrink-0 w-[120px] sm:w-full sm:aspect-[16/10] aspect-square overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${post.accentFrom} 0%, ${post.accentTo} 100%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-50 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 70% 40%, rgba(201, 162, 39, 0.3) 0%, transparent 60%)',
            }}
          />
          <div className="grain-overlay absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" />

          {/* Category badge — tablet/desktop only */}
          <div className="hidden sm:block absolute top-3 left-3">
            <span className="px-2.5 py-1 bg-porcelain/10 backdrop-blur-sm border border-porcelain/20 rounded-sm text-[10px] font-medium uppercase tracking-widest text-porcelain">
              {post.category}
            </span>
          </div>

          {/* Arrow — tablet/desktop only, shows on hover */}
          <div className="hidden sm:block absolute top-3 right-3">
            <div className="w-9 h-9 rounded-full bg-porcelain/10 backdrop-blur-sm border border-porcelain/20 flex items-center justify-center text-porcelain opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500">
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col flex-1 p-4 sm:p-5 min-w-0">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2 sm:mb-3 text-[10px] uppercase tracking-widest text-charcoal-500">
            <span className="text-accent-600 font-medium sm:hidden">
              {post.category}
            </span>
            <span className="sm:hidden text-charcoal-300">·</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span className="hidden sm:inline text-charcoal-300">·</span>
            <span className="hidden sm:inline">{post.readTime}</span>
          </div>

          {/* Title */}
          <h3 className="font-display text-base sm:text-lg lg:text-xl text-primary-900 leading-snug mb-2 sm:mb-4 group-hover:text-accent-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt — mobile only, 2 lines, hooks the reader */}
          <p className="sm:hidden text-xs text-charcoal-500 leading-relaxed line-clamp-2 mb-3">
            {post.excerpt}
          </p>

          {/* Author */}
          <div className="mt-auto pt-2 sm:pt-3 border-t border-charcoal-300/20">
            <span className="text-[10px] uppercase tracking-widest text-charcoal-500 truncate block">
              {post.author.name}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}