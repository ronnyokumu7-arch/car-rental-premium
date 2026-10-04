/* ─────────────────────────────────────────────────────────────
   TESTIMONIALS — real customer reviews, mostly Google.

   Rules:
   1. Never edit a quote's substance. You may trim length,
      fix obvious typos, or add emphasis — but the meaning is
      sacred. Fake reviews are a legal and reputational risk.
   2. `role` is a light positioning tag, not a fake title.
      "Verified Customer" is honest. "CEO" is not.
   3. `featured: true` marks the ones shown on the homepage.
      Keep it to 3–5. More dilutes impact.
   ───────────────────────────────────────────────────────────── */

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  /** Short positioning — how they used the service */
  role: string;
  /** Optional trip context (e.g. "Nairobi → Nakuru") */
  location?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  source: 'Google' | 'Direct';
  /** Shown on homepage hero / trust section */
  featured?: boolean;
  /** Optional ISO date — useful for schema.org Review markup */
  datePublished?: string;
}

/* ─────────────────────────────────────────────────────────────
   TESTIMONIALS
   ───────────────────────────────────────────────────────────── */

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'philip-muange',
    quote:
      'Five stars for customer support and after-service. Dropping me home almost 100km after returning the car was just too kind of you. The car was very reliable. Thank you very much for being dependable and keeping your word.',
    name: 'Philip Muange',
    role: 'Verified Customer',
    rating: 5,
    source: 'Google',
    featured: true,
  },
  {
    id: 'simon-kariuki',
    quote:
      'A beautiful experience with this car hire company! The car was sparkling clean and had AC, so when it was pouring we had no issues with the windscreen. I took a seven-seater van, drove from Nairobi to Nakuru and back, and my family loved it. I highly recommend Royride Car Hire Ltd!',
    name: 'Simon Kariuki',
    role: 'Family Road Trip',
    location: 'Nairobi → Nakuru',
    rating: 5,
    source: 'Google',
    featured: true,
  },
  {
    id: 'joseph-maina',
    quote:
      'Ronny is a gentleman who keeps his word and has well-maintained vehicles. Even when all his cars are booked, he goes out of his way to get you an alternative from his business partners. I highly recommend him.',
    name: 'Joseph Maina',
    role: 'Repeat Customer',
    rating: 5,
    source: 'Google',
    featured: true,
  },
  {
    id: 'steve-kwake',
    quote:
      'As a car owner in the industry, dealing with Royride has been seamless. The clientele is well-vetted and responsible. I would highly recommend. Great job!',
    name: 'Steve Kwake',
    role: 'Industry Peer',
    rating: 5,
    source: 'Google',
  },
  {
    id: 'emmanuel-wekesa',
    quote:
      'Best service I ever got. What amazed me was the digitized verification of driver documents, and a new clean car. I recommend anytime.',
    name: 'Emmanuel Wekesa',
    role: 'Verified Customer',
    rating: 5,
    source: 'Google',
  },
  {
    id: 'marticus-daedalus',
    quote:
      'After 27 hours of flights, I rented a car for 48 hours to drive from Ruiru to Maua to meet my fiancé\u2019s parents and declare my intention to marry. They met us to deliver the car, then came to pick it back up when we were done. The price was reasonable, the car was great, and the service was superb. Thank you so much. 10/10, would rent from Royride again.',
    name: 'Marticus Daedalus',
    role: 'Long-Distance Rental',
    location: 'Ruiru → Maua',
    rating: 5,
    source: 'Google',
  },
  {
    id: 'roger-musambai',
    quote:
      'The best for car hire I have encountered — very professional and friendly service. I enjoyed the whole process.',
    name: 'Rodger Musambai',
    role: 'Verified Customer',
    rating: 5,
    source: 'Google',
  },
  {
    id: 'giovanni-gio',
    quote:
      'Five stars for amazing service. Super friendly and efficient staff. Everything was crystal clear, and the terms were transparent. It was a pleasure renting a car from them. I will definitely use and recommend them again.',
    name: 'Giovanni Gio',
    role: 'Verified Customer',
    rating: 5,
    source: 'Google',
  },
];

/* ─────────────────────────────────────────────────────────────
   TRUST STATS — the numbers shown in the trust bar + hero.
   Update these when the actual numbers change. Do not inflate.
   ───────────────────────────────────────────────────────────── */

export const TRUST_STATS = {
  /** Google review average — displayed with a star icon */
  rating: '4.9',
  /** Total Google reviews at time of last sync */
  reviewCount: '120',
  /** Total customer interactions (bookings + enquiries) since founding */
  customerInteractions: '1,055',
  /** Year operations began — used in "Since 20XX" copy */
  founded: '2019',
  /** Human-readable "years in business" — computed at render time */
  get yearsOperating() {
    return new Date().getFullYear() - Number(this.founded);
  },
} as const;

/* ─────────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────────── */

/** Featured testimonials for the homepage. Limit to keep impact. */
export function getFeaturedTestimonials(limit = 3): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.featured).slice(0, limit);
}

/** All testimonials sorted by rating (5-star first), for /about. */
export function getAllTestimonialsSorted(): Testimonial[] {
  return [...TESTIMONIALS].sort((a, b) => b.rating - a.rating);
}

/** Average rating computed from data (should match TRUST_STATS.rating). */
export function getAverageRating(): number {
  if (TESTIMONIALS.length === 0) return 0;
  const sum = TESTIMONIALS.reduce((acc, t) => acc + t.rating, 0);
  return Math.round((sum / TESTIMONIALS.length) * 10) / 10;
}

/** Count by source — useful for "X Google reviews" vs "Y direct" UI. */
export function getReviewCounts(): { google: number; direct: number } {
  return TESTIMONIALS.reduce(
    (acc, t) => {
      if (t.source === 'Google') acc.google += 1;
      else acc.direct += 1;
      return acc;
    },
    { google: 0, direct: 0 }
  );
}
