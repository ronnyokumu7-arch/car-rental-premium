import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Hero } from '../components/marketing/Hero';
import { BookingBar } from '../components/booking/BookingBar';
import { FeaturedFleet } from '../components/marketing/FeaturedFleet';
import { AboutSnapshot } from '../components/marketing/AboutSnapshot';
import { LatestUpdates } from '../components/marketing/LatestUpdates';
import { ServicesGrid } from '../components/marketing/ServicesGrid';
import { AirportTransferBand } from '../components/marketing/AirportTransferBand';
import { Testimonials } from '../components/marketing/Testimonials';
import { FinalCTA } from '../components/marketing/FinalCTA';
import { buildPageMetadata } from '../lib/metadata';

/* ─────────────────────────────────────────────────────────────
   HOMEPAGE
   The full marketing narrative.

   Flow:
     1.  Hero             — statement
     2.  BookingBar       — service picker (tabs)
     3.  FeaturedFleet    — what you can hire
     4.  AboutSnapshot    — who we are
     5.  LatestUpdates    — editorial voice
     6.  ServicesGrid     — the process (Journey)
     7.  AirportTransfer  — specialized service
     8.  Testimonials     — social proof
     9.  FinalCTA         — two ways + concierge line

   Removed:
     • TrustBar — redundant with hero + featured fleet
     • FleetPreview — replaced by FeaturedFleet right after tabs
   ───────────────────────────────────────────────────────────── */

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

      <FeaturedFleet />
      <AboutSnapshot />
      <LatestUpdates />
      <ServicesGrid />
      <AirportTransferBand />
      <Testimonials />
      <FinalCTA />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   BOOKING BAR FALLBACK
   Renders while the real BookingBar hydrates. Preserves the
   collapsed footprint so there's no layout shift.
   ───────────────────────────────────────────────────────────── */
function BookingBarFallback() {
  return (
    <section
      className="
        relative z-20 mt-0 lg:-mt-16 mb-8 lg:mb-10
        px-0 lg:px-8
      "
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-surface overflow-hidden lg:rounded-2xl lg:border lg:border-border lg:shadow-[0_24px_64px_rgba(14,14,16,0.12)]">
          <div className="bg-surface">
            <div className="flex items-stretch gap-2 p-2 pr-12 sm:p-2.5 sm:pr-14">
              <div className="flex-1 h-[56px] rounded-lg border border-border" />
              <div className="flex-1 h-[56px] rounded-lg border border-border" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
