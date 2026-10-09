import type { Metadata } from 'next';
import { Suspense } from 'react';
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
      <Suspense fallback={<BookingBarFallback />}>
        <BookingBar />
      </Suspense>
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

/* ─────────────────────────────────────────────────────────────
   FALLBACK
   Rendered while BookingBar hydrates. Preserves the collapsed
   bar's footprint so there's no layout shift.
   ───────────────────────────────────────────────────────────── */
function BookingBarFallback() {
  return (
    <section
      className="
        relative z-20 -mt-12 lg:-mt-14 mb-10 lg:mb-14
        px-6 lg:px-8
      "
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-surface border border-border rounded-2xl shadow-[0_24px_64px_rgba(14,14,16,0.12)] overflow-hidden">
          <div className="bg-surface-sunken border-b border-border">
            <div className="flex items-stretch gap-2 p-2 sm:p-3">
              <div className="flex-1 h-[60px] sm:h-[76px] bg-surface/50 border border-border rounded-xl" />
              <div className="flex-1 h-[60px] sm:h-[76px] bg-surface/50 border border-border rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
