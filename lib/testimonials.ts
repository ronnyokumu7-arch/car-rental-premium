export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  location?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  source: 'Google' | 'Direct';
  featured?: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'philip-muange',
    quote:
      'Five stars for Customer support and after service, dropping me home almost 100kms after returning the car was just too kind of you. The car was very reliable. Thank you very much for being dependable and keeping your word.',
    name: 'Philip Muange',
    role: 'Verified Customer',
    rating: 5,
    source: 'Google',
    featured: true,
  },
  {
    id: 'simon-kariuki',
    quote:
      "A beautiful experience with this car hire company!! Car was sparkling clean, had ac so when it was pouring, we didn't have any issues with windscreen. I took a seven - seater van, drove from Nairobi to Nakuru and back, and my family loved it! I highly recommend Royride Car Hire Ltd!",
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
      'Ronny is a gentleman who keeps his word and has well maintained vehicles. Even where his cars are all booked, he will go out of his way to get you an alternative from his business partners. I highly recommend him.',
    name: 'Joseph Maina',
    role: 'Repeat Customer',
    rating: 5,
    source: 'Google',
    featured: true,
  },
  {
    id: 'steve-kwake',
    quote:
      'As a car owner in the industry, dealing with Royride has been seamless . Clientele are well vetted and responsible. I would highly recommend ..Great job!',
    name: 'Steve Kwake',
    role: 'Industry Peer',
    rating: 5,
    source: 'Google',
  },
  {
    id: 'emmanuel-wekesa',
    quote:
      'Best service I ever got. What amazed me was the digitalized verification of driver documents, and a new clean car. I recommend anytime.',
    name: 'Emmanuel Wekesa',
    role: 'Verified Customer',
    rating: 5,
    source: 'Google',
  },
  {
    id: 'marticus-daedalus',
    quote:
      "After 27 hours of flights, I rented a car for 48 hours to drive from Ruiru to Maua to meet my fiancé's parents and declare my intention to marry. They met us to deliver the car, then came to pick it back up when we were done. The price was reasonable. The car was great. The service was superb. Thank you so much! 10/10 Would rent from Royride again.",
    name: 'Marticus Daedalus',
    role: 'Long-Distance Rental',
    location: 'Ruiru → Maua',
    rating: 5,
    source: 'Google',
  },
  {
    id: 'roger-musambai',
    quote:
      'The best for car hire i have encountered, very professional and friendly services. I enjoyed the whole process.',
    name: 'Rodger Musambai',
    role: 'Verified Customer',
    rating: 5,
    source: 'Google',
  },
  {
    id: 'giovanni-gio',
    quote:
      'Five stars for amazing service.Super friendly and efficient staff. Everything was crystal clear, and the terms were transparent. It was a pleasure renting a car from them. I will definitely use and recommend them again.',
    name: 'giovanni gio',
    role: 'Verified Customer',
    rating: 5,
    source: 'Google',
  },
];

export const TRUST_STATS = {
  rating: '4.9',
  reviewCount: '119',
  customerInteractions: '1,055',
  founded: '2019',       // ← confirm actual founding year
} as const;