import type { MetadataRoute } from 'next';
import { getPostsSorted } from '@/lib/posts';
import { STATIC_PAGES } from '@/lib/sitePages';
import { SITE_URL } from '@/lib/metadata';

/* ─────────────────────────────────────────────────────────────
   SITEMAP
   Generates /sitemap.xml.

   Sources:
     • STATIC_PAGES (from lib/sitePages.ts) — curated static routes
     • Posts with content (from lib/posts.ts) — /updates/[slug]

   Rules:
     • SITE_URL comes from env — never hardcode the domain
     • lastModified is per-page where possible (post dates)
     • Static pages omit lastModified — Next.js uses build time
       and Google treats omitted dates better than fake ones
     • Posts without content are excluded (avoid thin content)
   ───────────────────────────────────────────────────────────── */

export default function sitemap(): MetadataRoute.Sitemap {
  /* ── Static pages ── */
  const staticPages: MetadataRoute.Sitemap = STATIC_PAGES.filter(
    (page) => !page.noIndex
  ).map((page) => ({
    url: `${SITE_URL}${page.path === '/' ? '' : page.path}`,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    /* Only include lastModified when the page explicitly provides one.
       Omitted dates are honest — Google prefers them to a fake "now". */
    ...(page.lastModified ? { lastModified: new Date(page.lastModified) } : {}),
  }));

  /* ── Posts with actual content ── */
  const postPages: MetadataRoute.Sitemap = getPostsSorted()
    .filter((post) => post.content && post.content.trim().length > 0)
    .map((post) => ({
      url: `${SITE_URL}/updates/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  return [...staticPages, ...postPages];
}
