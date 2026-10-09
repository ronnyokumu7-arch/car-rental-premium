'use client';

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { VehicleCard } from './VehicleCard';
import { getVisibleVehicles } from '../../lib/vehicles';

/* ─────────────────────────────────────────────────────────────
   FEATURED FLEET
   The fleet carousel that sits directly below the booking tabs.

   Purpose:
     • Right below the service picker, show the actual assets
     • Popular first, then cheapest — users see the range
     • Manual swipe on mobile, static grid on desktop
     • Reuses VehicleCard — the flagship card from /vehicles

   No auto-advance. Users control the pace.

   Featured set: popular first, then price ascending, top 6.
   ───────────────────────────────────────────────────────────── */

export function FeaturedFleet() {
  /* ── Featured selection ── */
  const featured = useMemo(() => {
    const list = [...getVisibleVehicles()];
    list.sort((a, b) => {
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return a.dailyRate - b.dailyRate;
    });
    return list.slice(0, 6);
  }, []);

  const totalVisible = useMemo(
    () => getVisibleVehicles().length,
    []
  );

  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ── Sync active index to scroll position ── */
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const newIndex = Math.round(
        carousel.scrollLeft / carousel.clientWidth
      );
      if (newIndex >= 0 && newIndex < featured.length) {
        setActiveIndex(newIndex);
      }
    };

    carousel.addEventListener('scroll', handleScroll, { passive: true });
    return () =>
      carousel.removeEventListener('scroll', handleScroll);
  }, [featured.length]);

  /* ── Manual jump to index (dots) ── */
  const scrollToIndex = useCallback((index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollTo({
      left: index * carousel.clientWidth,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  }, []);

  return (
    <section className="relative bg-background pt-8 lg:pt-12 pb-16 lg:pb-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ═══════════════════════════════════════════
            Section header
            ═══════════════════════════════════════════ */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 lg:mb-10">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-600 mb-3">
              Handpicked
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink leading-[1.1] tracking-[-0.015em]">
              Most popular{' '}
              <span className="italic font-light text-copper-700">
                right now.
              </span>
            </h2>
          </div>

          <Link
            href="/vehicles"
            className="hidden md:inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink hover:text-copper-600 transition-colors duration-300 group whitespace-nowrap"
          >
            View all {totalVisible} vehicles
            <ArrowRight
              size={14}
              strokeWidth={2.5}
              className="transition-transform duration-300 ease-lux group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* ═══════════════════════════════════════════
            Cards — full-width snap on mobile, grid on desktop
            ═══════════════════════════════════════════ */}
        <div
          ref={carouselRef}
          className="
            flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-5 lg:gap-6
            overflow-x-auto md:overflow-visible
            snap-x snap-mandatory md:snap-none
            pb-4 md:pb-0
            scrollbar-hide
            -mx-6 px-6 md:mx-0 md:px-0
          "
        >
          {featured.map((vehicle, i) => (
            <div
              key={vehicle.id}
              className="
                flex-shrink-0 basis-full
                pr-4 last:pr-0
                md:pr-0 md:basis-auto md:w-auto
                snap-start md:snap-align-none
              "
            >
              <VehicleCard vehicle={vehicle} index={i} />
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════
            Dot indicators — mobile only
            ═══════════════════════════════════════════ */}
        <div className="md:hidden mt-6 flex items-center justify-center gap-2">
          {featured.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Show vehicle ${index + 1} of ${featured.length}`}
              aria-current={index === activeIndex}
              className={`
                h-1 rounded-full transition-all duration-300 ease-lux
                ${
                  index === activeIndex
                    ? 'w-8 bg-copper-500'
                    : 'w-2 bg-border-strong hover:bg-copper-500/60'
                }
              `}
            />
          ))}
        </div>

        {/* ═══════════════════════════════════════════
            Mobile CTA
            ═══════════════════════════════════════════ */}
        <div className="md:hidden mt-8 flex justify-center">
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-copper-600 hover:text-copper-700 transition-colors duration-300 group"
          >
            View all {totalVisible} vehicles
            <ArrowRight
              size={14}
              strokeWidth={2.5}
              className="transition-transform duration-300 ease-lux group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
