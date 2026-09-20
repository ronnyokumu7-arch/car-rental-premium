import { BRAND } from '../../lib/constants';
import { CONTACT } from '../../lib/contact';

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    name: 'Royride Car Hire Ltd.',
    image: 'https://royride.com/opengraph-image',
    '@id': 'https://royride.com',
    url: 'https://royride.com',
    telephone: BRAND.phones[0],
    email: BRAND.email,
    priceRange: 'KES 6,500 – KES 14,000 per day',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${CONTACT.address.line1}`,
      addressLocality: 'Nairobi',
      addressRegion: 'Nairobi County',
      addressCountry: 'KE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -1.2776425,
      longitude: 36.9554776,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '119',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://facebook.com/royridecarhire',
      'https://instagram.com/royridecarhire',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Kenya',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}