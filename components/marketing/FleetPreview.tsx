'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { VehicleCardCompact } from './VehicleCardCompact';
import { VEHICLES } from '../../lib/vehicles';

const AUTOPLAY_INTERVAL = 6000;

export function FleetPreview() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll on mobile
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const timer = setInterval(() => {
      const isScrollable = carousel.scrollWidth > carousel.clientWidth;
      if (!isScrollable) return;

      const nextIndex = (activeIndex + 1) % VEHICLES.length;
      carousel.scrollTo({
        left: nextIndex * carousel.clientWidth,
        behavior: 'smooth',
      });
      setActiveIndex(nextIndex);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [activeIndex]);

  // Detect scroll to sync dots
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const newIndex = Math.round(
        carousel.scrollLeft / carousel.clientWidth
      );
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < VEHICLES.length) {
        setActiveIndex(newIndex);
      }
    };

    carousel.addEventListener('scroll', handleScroll, { passive: true });
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  const scrollToIndex = (index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollTo({
      left: index * carousel.clientWidth,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  return (
    <section className="bg-porcelain pt-20 lg:pt-28 pb-8 lg:pb-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <p className="type-caption text-accent-600 mb-3">
              Our Fleet
            </p>
            <h2 className="type-h1 text-primary-900 mb-4">
              Curated for Every Journey
            </h2>
            <p className="type-lead">
              From executive SUVs to family vans — every vehicle maintained,
              inspected, and delivered ready.
            </p>
          </div>

          <Link
            href="/vehicles"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-primary-900 hover:text-accent-600 transition-colors group whitespace-nowrap"
          >
            View Full Fleet
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Cards — carousel on mobile, grid on desktop */}
        <div
          ref={carouselRef}
          className="
            flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-8
            overflow-x-auto md:overflow-visible
            snap-x snap-mandatory md:snap-none
            pb-4 md:pb-0
            scrollbar-hide
          "
        >
          {VEHICLES.map((vehicle) => (
            <div
              key={vehicle.id}
              className="shrink-0 w-full md:w-auto snap-center md:snap-align-none px-0 md:px-0"
            >
              <VehicleCardCompact vehicle={vehicle} />
            </div>
          ))}
        </div>

        {/* Gold dots — mobile only */}
        <div className="md:hidden mt-6 flex items-center justify-center gap-2">
          {VEHICLES.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Show vehicle ${index + 1}`}
              className={`
                h-1 rounded-full transition-all duration-300
                ${
                  index === activeIndex
                    ? 'w-8 bg-accent-500'
                    : 'w-2 bg-charcoal-300 hover:bg-accent-500/60'
                }
              `}
            />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden mt-8">
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent-600 hover:text-primary-900 transition-colors group"
          >
            View Full Fleet
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
