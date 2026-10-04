import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import type { Metadata } from 'next';
import {
  POSTS,
  getPostBySlug,
  getAllPostSlugs,
  formatDateLong,
} from '../../../lib/posts';
import { PostBody } from '../../../components/marketing/PostBody';
import { CompactPostCard } from '../../../components/marketing/CompactPostCard';
import { UpdateIndex } from '../../../components/marketing/UpdateIndex';
import { FinalCTA } from '../../../components/marketing/FinalCTA';
import { SITE_URL } from '../../../lib/metadata';

/* ─────────────────────────────────────────────────────────────
   POST DETAIL PAGE
   /updates/[slug]
   ───────────────────────────────────────────────────────────── */

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const url = `${SITE_URL}/updates/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/updates/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function PostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const sameCategory = POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  ).slice(0, 3);

  const fallback = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const relatedPosts = sameCategory.length > 0 ? sameCategory : fallback;

  return (
    <main className="min-h-screen bg-background">

      {/* ══════════════════════════════════════════════════════
          HERO
          ══════════════════════════════════════════════════════ */}
      <section className="relative bg-obsidian-950 pt-28 lg:pt-36 pb-20 lg:pb-24 px-6 lg:px-8 overflow-hidden">

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${post.accentFrom} 0%, ${post.accentTo} 100%)`,
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 900px 600px at 75% 25%, rgba(194,112,46,0.22) 0%, transparent 60%)',
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

        <div className="grain-overlay absolute inset-0 opacity-[0.10] mix-blend-overlay pointer-events-none" />

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent"
        />

        <div className="relative max-w-4xl mx-auto">

          <Link
            href="/updates"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60 hover:text-white transition-colors duration-300 mb-10"
          >
            <ArrowLeft
              size={13}
              strokeWidth={2.5}
              className="transition-transform duration-300 ease-lux group-hover:-translate-x-1"
            />
            Back to updates
          </Link>

          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-copper-500 text-obsidian-950 rounded-md text-[10px] font-bold uppercase tracking-[0.16em] shadow-[0_4px_12px_rgba(194,112,46,0.35)]">
              {post.category}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white leading-[1.05] tracking-[-0.025em] mb-8 max-w-4xl">
            {post.title}
          </h1>

          {post.heroHook && (
            <p className="font-display text-lg lg:text-xl text-white/85 italic leading-relaxed max-w-2xl mb-10 border-l-2 border-copper-500/60 pl-5 tracking-[-0.005em]">
              {post.heroHook}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
            <span>{formatDateLong(post.publishedAt)}</span>
            <span
              aria-hidden="true"
              className="w-1 h-1 rounded-full bg-white/25"
            />
            <span className="inline-flex items-center gap-1.5">
              <Clock size={11} strokeWidth={2.5} />
              {post.readTime}
            </span>
            <span
              aria-hidden="true"
              className="w-1 h-1 rounded-full bg-white/25"
            />
            <span>
              By{' '}
              <span className="text-white/90">{post.author.name}</span>
              {post.author.role && (
                <span className="text-white/45">
                  {' '}
                  · {post.author.role}
                </span>
              )}
            </span>
          </div>

          {post.updatedAt && (
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-copper-400">
                Last updated {formatDateLong(post.updatedAt)}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ARTICLE BODY
          ══════════════════════════════════════════════════════ */}
<article className="bg-background py-16 lg:py-24 px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    {post.content ? (
      <PostBody content={post.content} />
    ) : (
            <div className="text-center py-16">
              <p className="font-display text-2xl lg:text-3xl text-ink mb-3 tracking-[-0.01em]">
                Full story coming soon.
              </p>
              <p className="text-ink-muted mb-8 font-light">
                We&apos;re still writing this one up. In the meantime, reach
                out to us directly.
              </p>
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-obsidian-950 rounded-lg overflow-hidden transition-all duration-300 ease-lux hover:-translate-y-0.5"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #E3A468 0%, #D98A44 45%, #C2702E 100%)',
                  boxShadow:
                    '0 1px 2px rgba(168,90,34,0.20), 0 8px 28px rgba(194,112,46,0.32)',
                }}
              >
                <span className="relative z-10">Get in touch</span>
                <ArrowRight
                  size={14}
                  strokeWidth={2.5}
                  className="relative z-10 transition-transform duration-300 ease-lux group-hover:translate-x-1"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-lux"
                  style={{
                    background:
                      'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
                  }}
                />
              </Link>
            </div>
          )}
        </div>
      </article>

      {/* ══════════════════════════════════════════════════════
          AUTHOR BLOCK
          ══════════════════════════════════════════════════════ */}
      <section className="bg-background pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="pt-12 border-t border-border">
            <div className="flex items-start gap-5">
              <div className="shrink-0 w-16 h-16 rounded-full bg-obsidian-950 flex items-center justify-center text-white font-display text-xl tracking-[-0.01em]">
                {post.author.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-subtle mb-2">
                  Written by
                </p>
                <p className="font-display text-xl text-ink tracking-[-0.005em] leading-tight">
                  {post.author.name}
                </p>
                {post.author.role && (
                  <p className="text-sm text-ink-muted mt-1 font-light">
                    {post.author.role}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          RELATED POSTS
          Mobile:  UpdateIndex list (typographic, no cards)
          Desktop: CompactPostCard grid (3-column)
          ══════════════════════════════════════════════════════ */}
      {relatedPosts.length > 0 && (
        <section className="relative bg-obsidian-950 py-20 lg:py-24 px-6 lg:px-8 overflow-hidden">

          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 900px 500px at 50% 50%, rgba(194,112,46,0.14) 0%, transparent 60%)',
            }}
          />
          <div className="grain-overlay absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" />

          <div
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/25 to-transparent"
          />

          <div className="relative max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-400 mb-4">
                  Keep Reading
                </p>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.1] tracking-[-0.015em]">
                  More from the road.
                </h2>
              </div>

              <Link
                href="/updates"
                className="hidden md:inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white hover:text-copper-300 transition-colors duration-300 group whitespace-nowrap"
              >
                View all updates
                <ArrowRight
                  size={14}
                  strokeWidth={2.5}
                  className="transition-transform duration-300 ease-lux group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* ── Mobile: typographic index ── */}
            <div className="sm:hidden">
              <UpdateIndex
                posts={relatedPosts}
                variant="dark"
                header="Also in this issue"
                footer={null}
              />
            </div>

            {/* ── Desktop: card grid ── */}
            <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {relatedPosts.map((p, i) => (
                <CompactPostCard key={p.id} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          FINAL CTA
          ══════════════════════════════════════════════════════ */}
      <FinalCTA />
    </main>
  );
}
