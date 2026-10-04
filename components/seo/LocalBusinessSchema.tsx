import { BRAND } from '../../lib/constants';
import { CONTACT } from '../../lib/contact';
import { SITE_URL } from '../../lib/metadata';
import { getSocialUrls } from '../../lib/social';
import { TRUST_STATS } from '../../lib/testimonials';
import { getPriceRange, formatPrice } from '../../lib/vehicles';

/* ─────────────────────────────────────────────────────────────
   LOCAL BUSINESS SCHEMA (schema.org / AutoRental)
   Injected once in the root layout. Feeds Google:
     • Knowledge Panel
     • Local business map pack
     • Rich results for reviews & offerings
   All values are derived from lib/ constants — never hardcoded
   here. If a phone number changes, one file changes.
   ───────────────────────────────────────────────────────────── */

export function LocalBusinessSchema() {
  const priceRange = getPriceRange();
  const phoneDigits = BRAND.phones[0].replace(/\s/g, '');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    '@id': `${SITE_URL}/#organization`,

    name: BRAND.fullName,
    alternateName: BRAND.name,
    url: SITE_URL,
    logo: `${SITE_URL}/icon`,
    image: `${SITE_URL}/opengraph-image`,
    description: BRAND.description,

    telephone: `+${phoneDigits.replace(/^\+/, '')}`,
    email: CONTACT.email,

    priceRange: `${formatPrice(priceRange.min)} – ${formatPrice(
      priceRange.max
    )} per day`,
    paymentAccepted: 'Cash, M-PESA, Bank Transfer',
    currenciesAccepted: 'KES, USD',

    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address.full,
      addressLocality: 'Nairobi',
      addressRegion: 'Nairobi County',
      postalCode: '00100',
      addressCountry: 'KE',
    },

    geo: {
      '@type': 'GeoCoordinates',
      latitude: -1.2776425,
      longitude: 36.9554776,
    },

    hasMap: CONTACT.shareUrl,

    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '08:00',
        closes: '18:00',
      },
    ],

    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: TRUST_STATS.rating,
      reviewCount: TRUST_STATS.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },

    areaServed: [
      { '@type': 'City', name: 'Nairobi' },
      { '@type': 'City', name: 'Mombasa' },
      { '@type': 'City', name: 'Kisumu' },
      { '@type': 'City', name: 'Nakuru' },
      { '@type': 'AdministrativeArea', name: 'Nairobi County' },
    ],

    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: -1.2776425,
        longitude: 36.9554776,
      },
      geoRadius: '200000',
    },

    makesOffer: [
      {
        '@type': 'Offer',
        name: 'Self-Drive Car Hire',
        description:
          'Rent a private car in Nairobi and drive on your own terms. Available for short-term and long-term hire.',
      },
      {
        '@type': 'Offer',
        name: 'Chauffeured Car Hire',
        description:
          'Executive car hire with professional chauffeurs. Contact us for a tailored quotation.',
      },
      {
        '@type': 'Offer',
        name: 'Airport Transfers',
        description:
          'Real-time flight tracking and punctual pickups from JKIA — delivered to any hotel or residence in Nairobi.',
      },
      {
        '@type': 'Offer',
        name: 'Long-Term Car Rental',
        description:
          'Monthly car hire with a 15% discount on standard daily rates.',
      },
    ],

    sameAs: getSocialUrls(),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
