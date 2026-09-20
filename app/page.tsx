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