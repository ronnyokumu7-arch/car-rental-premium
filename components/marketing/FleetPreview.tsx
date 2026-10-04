'use client';

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { VehicleCard } from './VehicleCard';
import { getPopularVehicles } from '../../lib/vehicles';

/* ─────────────────────────────────────────────────────────────
   FLEET PREVIEW
   Homepage section — shows popular vehicles for quick browsing.

   Layout:
     • Mobile:  one full-width card per view, snap carousel
     • Desktop: 3-column grid

   Shows only popular vehicles (curated).
   Full fleet lives at /vehicles.
   ───────────────────────────────────────────────────────────── */

const AUTOPLAY_INTERVAL = 6000;

export function FleetPreview() {
  const featured = useMemo(
    () => getPopularVehicles().slice(0, 6),
    []
  );
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ── Auto-advance on mobile only ── */
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const timer = window.setInterval(() => {
      const isScrollable = carousel.scrollWidth > carousel.clientWidth;
      if (!isScrollable) return;

      setActiveIndex((prev) => {
        const next = (prev + 1) % featured.length;
        carousel.scrollTo({
          left: next * carousel.clientWidth,
          behavior: 'smooth',
        });
        return next;
      });
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(timer);
  }, [featured.length]);

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
    <section className="bg-background pt-20 lg:pt-28 pb-16 lg:pb-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* ═══ Section header ═══ */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-600 mb-4">
              Our Fleet
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.1] tracking-[-0.015em] mb-5">
              Curated for every journey.
            </h2>
            <p className="text-base lg:text-lg text-ink-muted leading-relaxed font-light max-w-2xl">
              From executive SUVs to family vans — every vehicle maintained,
              inspected, and delivered ready.
            </p>
          </div>

          <Link
            href="/vehicles"
            className="hidden md:inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink hover:text-copper-600 transition-colors duration-300 group whitespace-nowrap"
          >
            View full fleet
            <ArrowRight
              size={14}
              strokeWidth={2.5}
              className="transition-transform duration-300 ease-lux group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* ═══ Cards — full-width snap on mobile, grid on desktop ═══ */}
        <div
          ref={carouselRef}
          className="
            flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-6 lg:gap-8
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

        {/* ═══ Dot indicators — mobile only ═══ */}
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

        {/* ═══ Mobile CTA ═══ */}
        <div className="md:hidden mt-10">
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-copper-600 hover:text-copper-700 transition-colors duration-300 group"
          >
            View full fleet
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
