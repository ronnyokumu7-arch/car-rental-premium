/* ─────────────────────────────────────────────────────────────
   SITE PAGES — the sitemap's source of truth.

   Every page that should appear in /sitemap.xml lives here.
   Pages with `noIndex: true` are excluded.

   Dynamic routes (e.g. /vehicles/[slug], /updates/[slug]) are
   NOT listed here — they're appended in app/sitemap.ts from
   their respective data sources (VEHICLES, POSTS).
   ───────────────────────────────────────────────────────────── */

export interface SitePage {
  /** Path relative to site root. Must start with '/'. */
  path: string;
  /** 0.0 – 1.0 — sitemap priority hint for crawlers */
  priority: number;
  changeFrequency:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  /** Exclude from sitemap (thank-you pages, confirmations, etc.) */
  noIndex?: boolean;
  /** Optional ISO date — overrides "today" in sitemap lastmod */
  lastModified?: string;
}

/* ─────────────────────────────────────────────────────────────
   STATIC PAGES
   Order is for readability, not significance. Sitemaps don't
   care about order.

   Priority guide:
     1.0 → Homepage (only)
     0.9 → Primary conversion surface (fleet)
     0.8 → High-value secondary (contact, updates index)
     0.7 → Trust pages (about)
     0.6 → Feature pages (rental calendar)
     0.5 → Legal / utility (privacy, terms)
   ───────────────────────────────────────────────────────────── */

export const STATIC_PAGES: SitePage[] = [
  { path: '/',                priority: 1.0, changeFrequency: 'weekly' },
  { path: '/vehicles',        priority: 0.9, changeFrequency: 'weekly' },
  { path: '/contact',         priority: 0.8, changeFrequency: 'monthly' },
  { path: '/updates',         priority: 0.8, changeFrequency: 'weekly' },
  { path: '/about',           priority: 0.7, changeFrequency: 'monthly' },
  { path: '/rental-calendar', priority: 0.6, changeFrequency: 'monthly' },

  /* ─── Reserved for later — uncomment when the pages exist ─── */
  // { path: '/list-your-car', priority: 0.7, changeFrequency: 'monthly' },
  // { path: '/privacy',       priority: 0.3, changeFrequency: 'yearly' },
  // { path: '/terms',         priority: 0.3, changeFrequency: 'yearly' },
];

/* ─────────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────────── */

/** Pages that should appear in /sitemap.xml */
export function getIndexablePages(): SitePage[] {
  return STATIC_PAGES.filter((p) => !p.noIndex);
}

/** Look up a page entry by path — useful for breadcrumbs or per-page tweaks. */
export function getPageByPath(path: string): SitePage | undefined {
  return STATIC_PAGES.find((p) => p.path === path);
}
