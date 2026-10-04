import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/metadata';

/* ─────────────────────────────────────────────────────────────
   ROBOTS
   Generates /robots.txt.

   Rules:
     • Crawl everything public
     • Block Next.js internals (/api, /_next) — no SEO value
     • Point to the sitemap using SITE_URL (env-aware)
   ───────────────────────────────────────────────────────────── */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
