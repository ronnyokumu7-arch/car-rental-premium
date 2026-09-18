import { Hero } from '../components/marketing/Hero';
import { BookingBar } from '../components/booking/BookingBar';
import { FleetPreview } from '../components/marketing/FleetPreview';
import { Testimonials } from '../components/marketing/Testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <BookingBar />
      <FleetPreview />
      <Testimonials />
    </>
  );
}