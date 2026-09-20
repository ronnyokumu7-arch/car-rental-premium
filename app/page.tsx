import type { Metadata } from 'next';
import { Hero } from '../components/marketing/Hero';
import { BookingBar } from '../components/booking/BookingBar';
import { TrustBar } from '../components/marketing/TrustBar';
import { AboutSnapshot } from '../components/marketing/AboutSnapshot';
import { LatestUpdates } from '../components/marketing/LatestUpdates';
import { FleetPreview } from '../components/marketing/FleetPreview';
import { ServicesGrid } from '../components/marketing/ServicesGrid';
import { AirportTransferBand } from '../components/marketing/AirportTransferBand';
import { Testimonials } from '../components/marketing/Testimonials';
import { FinalCTA } from '../components/marketing/FinalCTA';
import { buildPageMetadata } from '../lib/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Rental Cars for Short-Term Use',
  description:
    'Private car hire in Nairobi — short-term and long-term rentals. Self-drive and chauffeured vehicles, airport transfers from JKIA, and concierge delivery across Kenya.',
  path: '/',
  keywords: [
    'car hire Nairobi',
    'car rental Nairobi',
    'private car hire Kenya',
    'self-drive car hire Nairobi',
    'chauffeured car hire Kenya',
    'JKIA airport transfers',
    'rent a car Nairobi',
    'Royride',
  ],
});

export default function Home() {
  return (
    <>
      <Hero />
      <BookingBar />
      <TrustBar />
      <AboutSnapshot />
      <LatestUpdates />
      <FleetPreview />
      <ServicesGrid />
      <AirportTransferBand />
      <Testimonials />
      <FinalCTA />
    </>
  );
}