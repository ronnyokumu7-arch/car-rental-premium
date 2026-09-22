import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { POSTS, formatDateLong } from '../../../lib/posts';
import { PostBody } from '../../../components/marketing/PostBody';
import { PostCard } from '../../../components/marketing/PostCard';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function PostPage({ params }: PageProps) {
  const post = POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Related posts — other posts in same category, or most recent others
  const related = POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  ).slice(0, 3);

  const fallbackRelated = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const relatedPosts = related.length > 0 ? related : fallbackRelated;

  return (
    <main className="min-h-screen bg-porcelain">
      {/* ══════════════════════════════════════════════════════
          Hero — visual banner with category badge + pull-quote hook
          ══════════════════════════════════════════════════════ */}
      <section className="relative bg-primary-900 pt-28 pb-20 lg:pt-32 lg:pb-28 px-6 lg:px-8 overflow-hidden">
        {/* Background layers */}
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${post.accentFrom} 0%, ${post.accentTo} 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 70% 30%, rgba(201, 162, 39, 0.25) 0%, transparent 60%)',
          }}
        />
        <div className="grain-overlay absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/updates"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-porcelain/60 hover:text-porcelain transition-colors mb-10 group"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Updates
          </Link>

          {/* Category badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 bg-accent-500 text-primary-900 rounded-sm text-[10px] font-bold uppercase tracking-widest">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl text-porcelain leading-tight mb-6">
            {post.title}
          </h1>

          {/* Hero hook — editorial pull-quote */}
          {post.heroHook && (
            <p className="font-display text-lg lg:text-xl text-porcelain/80  leading-relaxed max-w-2xl mb-8 border-l-2 border-accent-500/50 pl-5">
              {post.heroHook}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs uppercase tracking-widest text-porcelain/60">
            <span>{formatDateLong(post.publishedAt)}</span>
            <span className="text-porcelain/30">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={12} />
              {post.readTime}
            </span>
            <span className="text-porcelain/30">·</span>
            <span>
              By{' '}
              <span className="text-porcelain/90 font-medium">
                {post.author.name}
              </span>
              {post.author.role && (
                <span className="text-porcelain/50 normal-case tracking-normal">
                  {' '}
                  — {post.author.role}
                </span>
              )}
            </span>
          </div>

          {/* Updated notice — only if applicable */}
          {post.updatedAt && (
            <div className="mt-6 pt-6 border-t border-porcelain/10">
              <p className="text-[11px] uppercase tracking-widest text-accent-500">
                Last updated {formatDateLong(post.updatedAt)}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          Article body
          ══════════════════════════════════════════════════════ */}
      <article className="py-16 lg:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {post.content ? (
            <PostBody content={post.content} />
          ) : (
            <div className="max-w-3xl mx-auto text-center py-16">
              <p className="font-display text-2xl text-primary-900 mb-3">
                Full Story Coming Soon
              </p>
              <p className="text-charcoal-500 mb-8">
                We&apos;re still writing this one up. In the meantime, reach
                out to us directly.
              </p>
              <Link href="/contact" className="btn-primary inline-block">
                Get in Touch
              </Link>
            </div>
          )}
        </div>
      </article>

      {/* ══════════════════════════════════════════════════════
          Divider + Author card
          ══════════════════════════════════════════════════════ */}
      <section className="pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="pt-12 border-t border-charcoal-300/30">
            <div className="flex items-start gap-5">
              <div className="shrink-0 w-16 h-16 rounded-full bg-primary-900 flex items-center justify-center text-porcelain font-display text-xl">
                {post.author.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-charcoal-500 mb-1">
                  Written by
                </p>
                <p className="font-display text-xl text-primary-900">
                  {post.author.name}
                </p>
                {post.author.role && (
                  <p className="text-sm text-charcoal-500 mt-0.5">
                    {post.author.role}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          Related posts
          ══════════════════════════════════════════════════════ */}
      {relatedPosts.length > 0 && (
        <section className="bg-charcoal-900 py-20 lg:py-24 px-6 lg:px-8 relative overflow-hidden">
          <div className="grain-overlay absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" />
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(201, 162, 39, 0.15) 0%, transparent 60%)',
            }}
          />

          <div className="relative max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="type-caption text-accent-500 mb-3">
                  Keep Reading
                </p>
                <h2 className="font-display text-3xl lg:text-4xl text-porcelain leading-tight">
                  Read more from the Updates
                </h2>
              </div>
              <Link
                href="/updates"
                className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent-500 hover:text-porcelain transition-colors group"
              >
                View All
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((p, i) => (
                <PostCard key={p.id} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          Final CTA
          ══════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="type-caption text-accent-600 mb-4">
            Ready to Drive?
          </p>
          <h2 className="font-display text-3xl lg:text-4xl text-primary-900 leading-tight mb-6">
            Browse the Fleet or Get in Touch
          </h2>
          <p className="text-charcoal-700 leading-relaxed mb-10 max-w-xl mx-auto">
            We respond within two hours during business hours. Whether it&apos;s
            a self-drive hire, a chauffeured booking, or an airport transfer —
            we&apos;ll make it happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/vehicles" className="btn-primary inline-block">
              Explore the Fleet
            </Link>
            <Link href="/contact" className="btn-secondary inline-block">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}