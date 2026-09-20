import type { Metadata } from 'next';
import { AboutContent } from '../../components/marketing/AboutContent';
import { buildPageMetadata } from '../../lib/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'About Us',
  description:
    "Nairobi's trusted car hire since 2016. 46 vehicles, 17 partner owners, and a fleet ranging from economy saloons to executive SUVs — serving individuals, businesses, and expats across Kenya.",
  path: '/about',
  keywords: [
    'about Royride car hire',
    'car rental company Nairobi',
    'trusted car hire Kenya',
    'car hire since 2016',
    'Royride Car Hire Ltd',
  ],
});

export default function AboutPage() {
  return <AboutContent />;
}