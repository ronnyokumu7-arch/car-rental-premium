/* ─────────────────────────────────────────────────────────────
   POSTS — /updates content.

   Two things to keep clean:
   1. `content` is markdown. Detail pages render it via a
      markdown renderer. Keep it portable — no MDX-only syntax.
   2. `publishedAt` and `updatedAt` are ISO strings. Never
      generate them at render time — hardcode so the sitemap
      and schema.org dates stay stable across builds.
   ───────────────────────────────────────────────────────────── */

export interface Post {
  id: string;
  slug: string;
  title: string;
  /** Short punchy line for the hero — appears under the title on detail pages */
  heroHook?: string;
  excerpt: string;
  /** Full body (markdown). Optional — posts without content are teasers. */
  content?: string;
  category: PostCategory;
  /** ISO date — when originally written */
  publishedAt: string;
  /** ISO date — only if post was revised after publishing */
  updatedAt?: string;
  /** Human-readable read time, e.g. "4 min read" */
  readTime: string;
  author: {
    name: string;
    role?: string;
  };
  /** Shown on /updates hero + homepage */
  featured?: boolean;
  /** Fallback gradient for the card's SVG panel */
  accentFrom: string;
  accentTo: string;
}

export const POST_CATEGORIES = [
  'News',
  'Guides',
  'Offers',
  'Fleet',
] as const;
export type PostCategory = (typeof POST_CATEGORIES)[number];

/** Filter chips on /updates — "All" is a UI concern, added in component */
export const CATEGORIES = ['All', ...POST_CATEGORIES] as const;
export type Category = (typeof CATEGORIES)[number];

/* ─────────────────────────────────────────────────────────────
   ACCENT PALETTE
   Keep gradients in the DARK spectrum — obsidian & copper family.
   Bright colors break the premium dark-card aesthetic.

   Reference (matching tailwind.config.ts tokens):
     Obsidian:  #0E0E10 → #3F3F46
     Iron:      #18181B → #52525B
     Copper-lo: #472410 → #87461B   ← Used for Offers
     Midnight:  #070708 → #27272A
   ───────────────────────────────────────────────────────────── */

export const POSTS: Post[] = [
  {
    id: 'new-prado-fleet',
    slug: 'new-prado-fleet',
    title: 'Our Fleet Just Got Bigger — 3 New Prados Arrive',
    heroHook:
      'Commanding presence on the road, all-terrain capability, and comfort for seven.',
    excerpt:
      "We've added three new Toyota Prado J150s to our fleet, ready for executive travel, safari escapes, and long-distance road trips. Here's what makes the Prado the definitive Nairobi SUV.",
    content: `
We're excited to announce that three new Prados have joined our fleet, ready for hire immediately.

## Why the Prado

The Toyota Prado J150 has always been the definitive Nairobi SUV — commanding presence on the road, all-terrain capability, and comfort for seven. If you've ever driven the Prado, you know.

This vehicle handles everything from the highway between Nairobi and Naivasha to the rough roads of the Mara. With a 4WD system and a diesel engine built for long distances, it's the vehicle our customers keep requesting.

Some of the highlights:

- 7-seat capacity with leather interior
- 4WD with differential lock
- Full AC and Bluetooth connectivity
- Reverse camera and roof rails

## Who It's For

The Prado works for:

**Executive travel.** Nothing says "arrived" quite like stepping out of a Prado at a business meeting.

**Family safaris.** Seven seats means the whole family, plus luggage, without compromise.

**Long-distance trips.** From Nairobi to Mombasa or Kisumu, the Prado makes the journey comfortable.

## Booking

The new Prados are available now at **KES 14,000 per day** — the same rate as our existing fleet. Self-drive and chauffeured options are both available.

Ready to book? [Get in touch](/contact) with your dates and pickup location.
    `.trim(),
    category: 'Fleet',
    publishedAt: '2026-09-15',
    readTime: '4 min read',
    author: { name: 'Royride Team' },
    featured: true,
    accentFrom: '#0E0E10',
    accentTo: '#3F3F46',
  },
  {
    id: 'jkia-pickup-guide',
    slug: 'jkia-pickup-guide',
    title: 'The Complete Guide to Smooth JKIA Pickups',
    heroHook:
      'Real-time flight tracking, punctual pickups, and what to expect the moment you step out of arrivals.',
    excerpt:
      "Landing at JKIA after a long flight? Here's how our airport transfer service works, why real-time flight tracking matters, and what to expect when you step out of arrivals.",
    category: 'Guides',
    publishedAt: '2026-09-08',
    updatedAt: '2026-09-12',
    readTime: '6 min read',
    author: { name: 'Royride Team' },
    accentFrom: '#18181B',
    accentTo: '#52525B',
  },
  {
    id: 'weekend-escapes-nairobi',
    slug: 'weekend-escapes-nairobi',
    title: 'Five Weekend Escapes Within Three Hours of Nairobi',
    heroHook:
      'From Naivasha to Nanyuki — the drives worth taking, and the vehicles best suited for each.',
    excerpt:
      'From Naivasha to Nanyuki, these are the drives worth taking — and the vehicles best suited for each. Our team shares their favourite routes.',
    category: 'Guides',
    publishedAt: '2026-08-30',
    readTime: '7 min read',
    author: { name: 'Royride Team' },
    accentFrom: '#27272A',
    accentTo: '#52525B',
  },
  {
    id: 'self-drive-vs-chauffeured',
    slug: 'self-drive-vs-chauffeured',
    title: 'Self-Drive vs. Chauffeured: Which Is Right for You?',
    heroHook:
      'An honest breakdown of when self-drive saves you money, and when a chauffeur is worth every shilling.',
    excerpt:
      "Both have their place. Here's an honest breakdown of when self-drive saves you money, and when a chauffeur is worth every shilling.",
    category: 'Guides',
    publishedAt: '2026-08-22',
    readTime: '5 min read',
    author: { name: 'Royride Team' },
    accentFrom: '#3F3F46',
    accentTo: '#71717A',
  },
  {
    id: 'long-term-rental-offer',
    slug: 'long-term-rental-offer',
    title: 'Save 15% on Monthly Car Hire',
    heroHook:
      'Long-term rental rates, now 15% lower — ideal for expats, contractors, and corporate assignments.',
    excerpt:
      'Need a vehicle for a month or more? Our long-term rental rates now start 15% lower than our standard daily rate. Ideal for expats, contractors, and corporate assignments.',
    category: 'Offers',
    publishedAt: '2026-08-15',
    readTime: '3 min read',
    author: { name: 'Royride Team' },
    accentFrom: '#472410',
    accentTo: '#87461B',
  },
  {
    id: 'royride-since-2019',
    slug: 'royride-since-2019',
    title: 'Nine Years On: Reflections from the Royride Team',
    heroHook:
      'From one car to a fleet of 46 — a short look back at what we have learned, and what is next.',
    excerpt:
      "Since 2019, we've grown from one car to a fleet of 46. A short look back at what we've learned, and what's next for Royride Car Hire.",
    category: 'News',
    publishedAt: '2026-08-01',
    readTime: '4 min read',
    author: {
      name: 'Ronny Okumu',
      role: 'Founder & Managing Director',
    },
    accentFrom: '#070708',
    accentTo: '#27272A',
  },
];

/* ─────────────────────────────────────────────────────────────
   DERIVED HELPERS
   ───────────────────────────────────────────────────────────── */

export function getPostsSorted(): Post[] {
  return [...POSTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getFeaturedPosts(limit = 3): Post[] {
  return getPostsSorted().filter((p) => p.featured).slice(0, limit);
}

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}

export function getPostsByCategory(category: Category): Post[] {
  const sorted = getPostsSorted();
  if (category === 'All') return sorted;
  return sorted.filter((p) => p.category === category);
}

export function getCategoryCounts(): Record<PostCategory, number> {
  const counts = POST_CATEGORIES.reduce(
    (acc, cat) => ({ ...acc, [cat]: 0 }),
    {} as Record<PostCategory, number>
  );
  POSTS.forEach((p) => {
    counts[p.category] += 1;
  });
  return counts;
}

/* ─────────────────────────────────────────────────────────────
   DATE FORMATTERS
   ───────────────────────────────────────────────────────────── */

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateLong(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
