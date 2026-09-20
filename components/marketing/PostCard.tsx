'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { type Post, formatDate } from '../../lib/posts';
import { getCategoryIcon } from '../../lib/postIcons';

interface PostCardProps {
  post: Post;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  const Icon = getCategoryIcon(post.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Link
        href={`/updates/${post.slug}`}
        className="group flex flex-col h-full overflow-hidden rounded-sm border border-charcoal-300/30 bg-porcelain hover:border-accent-500/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
      >
        {/* Visual — with centered icon */}
        <div className="relative aspect-[16/10] overflow-hidden flex items-center justify-center">
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
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

          {/* Centered icon + category */}
          <div className="relative flex flex-col items-center gap-3">
            <Icon
              size={36}
              strokeWidth={1.25}
              className="text-accent-500 transition-transform duration-700 group-hover:scale-110"
            />
            <span className="text-[10px] uppercase tracking-[0.2em] text-porcelain/80 font-medium">
              {post.category}
            </span>
          </div>

          {/* Arrow button — top right, on hover */}
          <div className="absolute top-4 right-4">
            <div className="w-10 h-10 rounded-full bg-porcelain/10 backdrop-blur-sm border border-porcelain/20 flex items-center justify-center text-porcelain opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500">
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          <div className="flex items-center gap-3 mb-4 text-[10px] uppercase tracking-widest text-charcoal-500">
            <span>{formatDate(post.publishedAt)}</span>
            <span className="text-charcoal-300">·</span>
            <span>{post.readTime}</span>
          </div>

          <h3 className="font-display text-xl lg:text-2xl text-primary-900 leading-snug mb-3 group-hover:text-accent-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-sm text-charcoal-500 leading-relaxed line-clamp-3 mb-6">
            {post.excerpt}
          </p>

          <div className="mt-auto pt-4 border-t border-charcoal-300/20 flex items-center justify-between gap-3">
            <span className="text-[10px] uppercase tracking-widest text-charcoal-500 truncate">
              {post.author.name}
            </span>
            {post.updatedAt && (
              <span className="shrink-0 text-[10px] uppercase tracking-widest text-accent-600 font-medium">
                Updated
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}