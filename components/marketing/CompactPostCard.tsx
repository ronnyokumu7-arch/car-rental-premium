'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { type Post, formatDate } from '../../lib/posts';
import { getCategoryIcon } from '../../lib/postIcons';

interface CompactPostCardProps {
  post: Post;
  index?: number;
}

export function CompactPostCard({ post, index = 0 }: CompactPostCardProps) {
  const Icon = getCategoryIcon(post.category);

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
      className="snap-start shrink-0 w-[88vw] sm:w-[45vw] lg:w-auto"
    >
      <Link
        href={`/updates/${post.slug}`}
        className="group flex flex-col h-full overflow-hidden rounded-sm border border-charcoal-300/30 bg-porcelain hover:border-accent-500/40 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-500"
      >
        <div className="flex flex-row sm:flex-col flex-1">
          {/* ── Typographic Icon Tile ── */}
          <div className="relative shrink-0 w-[140px] sm:w-full sm:aspect-[16/10] aspect-[4/3] overflow-hidden flex items-center justify-center">
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${post.accentFrom} 0%, ${post.accentTo} 100%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-60 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 50%, rgba(201, 162, 39, 0.3) 0%, transparent 65%)',
              }}
            />
            <div className="grain-overlay absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" />

            <div className="relative flex flex-col items-center gap-2 sm:gap-3">
              <Icon
                size={28}
                strokeWidth={1.25}
                className="text-accent-500 sm:!w-9 sm:!h-9 transition-transform duration-700 group-hover:scale-110"
              />
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-porcelain/80 font-medium">
                {post.category}
              </span>
            </div>

            {/* Arrow — tablet/desktop only */}
            <div className="hidden sm:block absolute top-3 right-3">
              <div className="w-9 h-9 rounded-full bg-porcelain/10 backdrop-blur-sm border border-porcelain/20 flex items-center justify-center text-porcelain opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500">
                <ArrowUpRight size={14} />
              </div>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="flex flex-col flex-1 p-4 sm:p-5 min-w-0">
            <h3 className="font-display text-base sm:text-lg lg:text-xl text-primary-900 leading-snug mb-2 sm:mb-3 group-hover:text-accent-600 transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-xs text-charcoal-500 leading-relaxed line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4">
              {post.excerpt}
            </p>

            <div className="mt-auto pt-3 border-t border-charcoal-300/20">
              {/* Mobile */}
              <div className="sm:hidden flex items-center flex-wrap gap-x-2 gap-y-1 text-[10px] uppercase tracking-widest">
                <span className="text-charcoal-500">
                  {formatDate(post.publishedAt)}
                </span>
                <span className="text-charcoal-300">·</span>
                <span className="text-charcoal-500 truncate">
                  {post.author.name}
                </span>
              </div>

              {/* Tablet/Desktop */}
              <div className="hidden sm:flex items-center justify-between gap-3 text-[10px] uppercase tracking-widest">
                <span className="text-charcoal-500 truncate">
                  {post.author.name}
                </span>
                <span className="text-charcoal-400 shrink-0">
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}