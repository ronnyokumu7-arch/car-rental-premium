/* ─────────────────────────────────────────────────────────────
   BRAND — single source of truth.
   Never hardcode "ROYRIDE", phone numbers, or the tagline
   anywhere else in the codebase. Import from here.
   ───────────────────────────────────────────────────────────── */
export const BRAND = {
  /** Short mark — used in Navbar, Footer signature */
  name: 'ROYRIDE',
  /** Full legal/marketing name — used in metadata, schema, copyright */
  fullName: 'Royride Car Hire',
  /** One-line positioning — used in meta description, hero, footer */
  tagline: 'Premium Car Hire in Nairobi',
  /** Long-form description — used in schema.org, about page */
  description:
    'Concierge car hire in Nairobi — a curated fleet of self-drive and chauffeured vehicles, delivered anywhere in Kenya.',
  /** Human-readable location — used in footer, contact */
  location: 'Utawala, Nairobi, Kenya',
  /** Primary contact numbers — index 0 is the hero/concierge line */
  phones: ['+254 780 957 810', '+254 791 174 592'] as const,
  email: 'carhire@royride.com',
} as const;

/* ─────────────────────────────────────────────────────────────
   NAVIGATION — drives Navbar, Footer "Explore", mobile drawer.
   Order matters. Changing order here changes it everywhere.
   ───────────────────────────────────────────────────────────── */
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Vehicles', href: '/vehicles' },
  { label: 'Updates', href: '/updates' },
  { label: 'Contact', href: '/contact' },
] as const;

/* ─────────────────────────────────────────────────────────────
   TYPES — derived from the consts, so they're always in sync
   ───────────────────────────────────────────────────────────── */
export type NavLink = (typeof NAV_LINKS)[number];
export type Brand = typeof BRAND;
