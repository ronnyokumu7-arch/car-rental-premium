'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { type Post, formatDate } from '../../lib/posts';
import { getCategoryIcon } from '../../lib/postIcons';

interface FeaturedPostProps {
  post: Post;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  const Icon = getCategoryIcon(post.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link
        href={`/updates/${post.slug}`}
        className="group block overflow-hidden rounded-sm border border-charcoal-300/30 hover:border-accent-500/40 transition-all duration-500"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Visual */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[440px] overflow-hidden flex items-center justify-center">
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
                  'radial-gradient(ellipse at 50% 50%, rgba(201, 162, 39, 0.35) 0%, transparent 65%)',
              }}
            />
            <div className="grain-overlay absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" />

            {/* Centered icon + category */}
            <div className="relative flex flex-col items-center gap-4">
              <Icon
                size={56}
                strokeWidth={1}
                className="text-accent-500 transition-transform duration-700 group-hover:scale-110"
              />
              <span className="text-[11px] uppercase tracking-[0.25em] text-porcelain/80 font-medium">
                {post.category}
              </span>
            </div>

            {/* Featured badge — top left */}
            <div className="absolute top-6 left-6">
              <span className="px-3 py-1 bg-accent-500 text-primary-900 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                Featured
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-8 lg:p-14 bg-porcelain">
            <div className="flex items-center gap-3 mb-5 text-[11px] uppercase tracking-widest text-charcoal-500">
              <span>{formatDate(post.publishedAt)}</span>
              <span className="text-charcoal-300">·</span>
              <span>{post.readTime}</span>
            </div>

            <h2 className="font-display text-3xl lg:text-4xl text-primary-900 leading-tight mb-6 group-hover:text-accent-600 transition-colors">
              {post.title}
            </h2>

            <p className="text-charcoal-700 leading-relaxed mb-8 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-charcoal-300/30 gap-3">
              <span className="text-xs uppercase tracking-widest text-charcoal-500 truncate">
                {post.author.name}
                {post.author.role && (
                  <span className="text-charcoal-400 block text-[10px] mt-0.5 normal-case tracking-normal">
                    {post.author.role}
                  </span>
                )}
              </span>
              <span className="shrink-0 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent-600 font-medium group-hover:gap-3 transition-all">
                Read the Story
                <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}