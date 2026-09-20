export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;              // full body (markdown or plain text) — for detail pages
  category: 'News' | 'Guides' | 'Offers' | 'Fleet';
  publishedAt: string;           // ISO — when originally written
  updatedAt?: string;            // ISO — optional, only if post was revised
  readTime: string;
  author: {
    name: string;
    role?: string;               // "Founder" / "Royride Team" etc.
  };
  featured?: boolean;
  accentFrom: string;
  accentTo: string;
}

export const POSTS: Post[] = [
{
  id: 'new-prado-fleet',
  slug: 'new-prado-fleet',
  title: 'Our Fleet Just Got Bigger — Three New Prados Arrive',
  excerpt:
    "We've added three new Toyota Prado J150s to our fleet, ready for executive travel, safari escapes, and long-distance road trips. Here's what makes the Prado the definitive Nairobi SUV.",
  content: `
The Toyota Prado J150 has always been the definitive Nairobi SUV — commanding presence on the road, all-terrain capability, and comfort for seven. We're excited to announce that three new Prados have joined our fleet, ready for hire immediately.

## Why the Prado

If you've ever driven the Prado, you know. It handles everything from the highway between Nairobi and Naivasha to the rough roads of the Mara. With a 4WD system and a diesel engine built for long distances, it's the vehicle our customers keep requesting.

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
  accentFrom: '#0f2440',
  accentTo: '#1a365d',
},
  {
    id: 'jkia-pickup-guide',
    slug: 'jkia-pickup-guide',
    title: 'The Complete Guide to Smooth JKIA Pickups',
    excerpt:
      'Landing at JKIA after a long flight? Here\'s how our airport transfer service works, why real-time flight tracking matters, and what to expect when you step out of arrivals.',
    category: 'Guides',
    publishedAt: '2026-09-08',
    updatedAt: '2026-09-12',
    readTime: '6 min read',
    author: {
      name: 'Royride Team',
    },
    accentFrom: '#1a1a1a',
    accentTo: '#3d3d3d',
  },
  {
    id: 'weekend-escapes-nairobi',
    slug: 'weekend-escapes-nairobi',
    title: 'Five Weekend Escapes Within Three Hours of Nairobi',
    excerpt:
      'From Naivasha to Nanyuki, these are the drives worth taking — and the vehicles best suited for each. Our team shares their favourite routes.',
    category: 'Guides',
    publishedAt: '2026-08-30',
    readTime: '7 min read',
    author: {
      name: 'Royride Team',
    },
    accentFrom: '#1a365d',
    accentTo: '#3d3d3d',
  },
  {
    id: 'self-drive-vs-chauffeured',
    slug: 'self-drive-vs-chauffeured',
    title: 'Self-Drive vs. Chauffeured: Which Is Right for You?',
    excerpt:
      "Both have their place. Here's an honest breakdown of when self-drive saves you money, and when a chauffeur is worth every shilling.",
    category: 'Guides',
    publishedAt: '2026-08-22',
    readTime: '5 min read',
    author: {
      name: 'Royride Team',
    },
    accentFrom: '#3d3d3d',
    accentTo: '#6b6b6b',
  },
  {
    id: 'long-term-rental-offer',
    slug: 'long-term-rental-offer',
    title: 'Save 15% on Monthly Car Hire',
    excerpt:
      'Need a vehicle for a month or more? Our long-term rental rates now start 15% lower than our standard daily rate. Ideal for expats, contractors, and corporate assignments.',
    category: 'Offers',
    publishedAt: '2026-08-15',
    readTime: '3 min read',
    author: {
      name: 'Royride Team',
    },
    accentFrom: '#a8861f',
    accentTo: '#c9a227',
  },
  {
    id: 'royride-since-2016',
    slug: 'royride-since-2016',
    title: 'Nine Years On: Reflections from the Royride Team',
    excerpt:
      "Since 2016, we've grown from one car to a fleet of 46. A short look back at what we've learned, and what's next for Royride Car Hire.",
    category: 'News',
    publishedAt: '2026-08-01',
    readTime: '4 min read',
    author: {
      name: 'Ronny Okumu',
      role: 'Founder & Managing Director',
    },
    accentFrom: '#081529',
    accentTo: '#1a365d',
  },
];

export const CATEGORIES = ['All', 'News', 'Guides', 'Offers', 'Fleet'] as const;
export type Category = (typeof CATEGORIES)[number];

/* ─────────────────────────────────────────────────── */
/* Date formatters                                     */
/* ─────────────────────────────────────────────────── */

export const formatDate = (isoDate: string): string => {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const formatDateLong = (isoDate: string): string => {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};