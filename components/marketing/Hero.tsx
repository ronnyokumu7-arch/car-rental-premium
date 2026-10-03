'use client';

import Link from 'next/link';
import { HeroCarousel } from './HeroCarousel';

export function Hero() {
  const handleScrollToBooking = () => {
    const target = document.getElementById('booking-widget');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-primary-900 flex items-center justify-center">
      {/* Layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-700 to-charcoal-900" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 75% 25%, rgba(201, 162, 39, 0.25) 0%, transparent 55%)',
        }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(8, 21, 41, 0.75) 100%)',
        }}
      />

      {/* Grain texture overlay */}
      <div className="grain-overlay absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" />

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <p className="type-caption text-accent-500 mb-6">
              Premium Car Hire · Nairobi
            </p>

            <h1 className="type-display text-porcelain mb-8">
              Private, clean, &amp; reliable cars for hire{' '}
              <span className="italic font-light">in Nairobi</span>
            </h1>

            <p className="type-lead text-porcelain/70 max-w-xl mx-auto lg:mx-0 mb-12">
              Rent private cars in Nairobi, available for short-term and
              long-term rental.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Link href="/vehicles" className="btn-primary">
                Explore the Fleet
              </Link>
              <Link
                href="/rental-calendar"
                className="btn-secondary border-porcelain text-porcelain hover:bg-porcelain hover:text-primary-900"
              >
                Rental Calendar
              </Link>
            </div>
          </div>

          {/* Right — Vehicle carousel (hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-5">
            <HeroCarousel />
          </div>
        </div>
      </div>

      {/* Scroll indicator — hidden on mobile since carousel is hidden there too */}
      <button
        onClick={handleScrollToBooking}
        aria-label="Scroll to booking form"
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 group flex-col items-center gap-3 text-porcelain/50 hover:text-porcelain transition-colors cursor-pointer"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
          Book a Car
        </span>
        <span className="flex items-center justify-center w-10 h-10 rounded-full border border-porcelain/25 group-hover:border-accent-500/70 group-hover:bg-accent-500/10 transition-all duration-300 animate-bounce-soft">
          <svg
            width="14"
            height="18"
            viewBox="0 0 14 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 2v16M1 12l6 6 6-6" />
          </svg>
        </span>
      </button>
    </section>
  );
}
