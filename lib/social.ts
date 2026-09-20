export interface SocialLink {
  name: string;
  href: string;
  /** SVG path data for a 24×24 viewBox. */
  path: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/royridecarhire',
    path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/royridecarhire',
    path: 'M16 3H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5Zm-4 5.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm4.5-.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/royridecarhire',
    path: 'M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.55V9h3.57v11.45z',
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@royridecarhire',
    path: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@royridecarhire',
    path: 'M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.08 0 12 0 12s0 3.92.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z',
  },
];