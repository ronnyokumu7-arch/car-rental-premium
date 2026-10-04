import type { Metadata } from 'next';
import { AboutContent } from '../../components/marketing/AboutContent';
import { buildPageMetadata } from '../../lib/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'About Royride — Car Hire in Nairobi Since 2019',
  description:
    'Meet the team behind Nairobi\'s trusted car hire fleet. Learn how Royride maintains its vehicles, vets its drivers, and has earned 4.9 stars on Google.',
  path: '/about',
  keywords: [
    'Royride Car Hire',
    'about Royride',
    'Nairobi car hire company',
    'trusted car rental Nairobi',
    'car hire since 2019',
  ],
});

export default function AboutPage() {
  return (
    <main id="main" className="relative">
      <AboutContent />
    </main>
  );
}
