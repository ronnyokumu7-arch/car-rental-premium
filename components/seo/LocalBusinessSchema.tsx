import { BRAND } from '../../lib/constants';
import { CONTACT } from '../../lib/contact';

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    '@id': 'https://royride.com/#organization',
    name: 'Royride Car Hire Ltd.',
    alternateName: 'Royride',
    url: 'https://royride.com',
    logo: 'https://royride.com/icon',
    image: 'https://royride.com/opengraph-image',
    description:
      'Private car hire in Nairobi — self-drive and chauffeured. Short-term and long-term rentals, airport transfers from JKIA, and concierge delivery across Kenya.',
    telephone: BRAND.phones[0].replace(/\s/g, ''),
    email: 'sales@royride.com',
    priceRange: 'KES 6,500 – KES 14,000 per day',
    paymentAccepted: 'Cash, M-PESA, Bank Transfer',
    currenciesAccepted: 'KES, USD',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kibiku Road, Off Eastern Bypass, Utawala',
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
      ratingValue: '4.9',
      reviewCount: '119',
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
          'Executive car hire with professional chauffeurs. Ideal for weddings, business travel, and special occasions.',
      },
      {
        '@type': 'Offer',
        name: 'Airport Transfers',
        description:
          'Real-time flight tracking and punctual pickups from JKIA. From USD 50 to any hotel or residence in Nairobi.',
      },
      {
        '@type': 'Offer',
        name: 'Long-Term Car Rental',
        description:
          'Monthly car hire with a 15% discount on standard daily rates.',
      },
    ],
    sameAs: [
      'https://facebook.com/royridecarhire',
      'https://instagram.com/royridecarhire',
      'https://linkedin.com/company/royridecarhire',
      'https://tiktok.com/@royridecarhire',
      'https://youtube.com/@royridecarhire',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}