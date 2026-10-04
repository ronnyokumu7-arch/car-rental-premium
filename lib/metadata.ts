import type { Metadata } from 'next';
import { BRAND } from './constants';

/* ─────────────────────────────────────────────────────────────
   SITE CONSTANTS
   SITE_URL prefers env var (Vercel preview vs prod), falls back
   to the canonical domain. Never hardcode the domain elsewhere.
   ───────────────────────────────────────────────────────────── */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://royride.com';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`;

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */
interface PageMetadataOptions {
  title: string;
  description: string;
  /** Path relative to site root — must start with '/' (e.g. '/vehicles') */
  path: string;
  keywords?: string[];
  /** Override the default OG image. Pass an absolute URL or a path. */
  ogImage?: string;
  /** Set to true for pages that should not appear in search results */
  noIndex?: boolean;
  /** For /updates/[slug] — the ISO publish date */
  publishedTime?: string;
  /** For /updates/[slug] — article type triggers Twitter/OG rich cards */
  type?: 'website' | 'article';
}

/* ─────────────────────────────────────────────────────────────
   BUILD PAGE METADATA
   Single source of truth for per-page SEO.
   Every page calls this. Nothing else writes <meta> tags.
   ───────────────────────────────────────────────────────────── */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
  publishedTime,
  type = 'website',
}: PageMetadataOptions): Metadata {
  /* Normalize path — always starts with '/' */
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${SITE_URL}${normalizedPath === '/' ? '' : normalizedPath}`;

  /* Resolve OG image — accept absolute URLs or site-relative paths */
  const resolvedOgImage = ogImage.startsWith('http')
    ? ogImage
    : `${SITE_URL}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;

  const ogTitle = `${title} — ${BRAND.fullName}`;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,

    alternates: {
      canonical: normalizedPath,
    },

    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },

    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: BRAND.fullName,
      locale: 'en_KE',
      type,
      ...(publishedTime && type === 'article'
        ? { publishedTime }
        : {}),
      images: [
        {
          url: resolvedOgImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [resolvedOgImage],
    },
  };
}
