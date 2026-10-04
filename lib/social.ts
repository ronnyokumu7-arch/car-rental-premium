/* ─────────────────────────────────────────────────────────────
   SOCIAL LINKS
   Single source of truth for social profiles.
   Used by: SocialLinks, Footer, LocalBusinessSchema (sameAs),
   and the /contact page.

   Rule: only list platforms with REAL, working profiles.
   A dead link or a link to a platform homepage looks broken
   and undermines trust. Add a platform the day it goes live.
   ───────────────────────────────────────────────────────────── */

export interface SocialLink {
  /** Display name — also used for aria-label */
  name: string;
  href: string;
  /** SVG path data for a 24×24 viewBox */
  path: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/mycarsforhire',
    path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/royride_cars',
    path: 'M16 3H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5Zm-4 5.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm4.5-.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@royride_car_hire',
    path: 'M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.08 0 12 0 12s0 3.92.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z',
  },
];

/* ─────────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────────── */

/** Get a single social link by name (case-insensitive). */
export function getSocialLink(name: string): SocialLink | undefined {
  return SOCIAL_LINKS.find(
    (s) => s.name.toLowerCase() === name.toLowerCase()
  );
}

/**
 * All social URLs as a flat string array.
 * Used by schema.org `sameAs` field in LocalBusinessSchema.
 */
export function getSocialUrls(): string[] {
  return SOCIAL_LINKS.map((s) => s.href);
}
