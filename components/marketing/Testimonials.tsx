'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { TestimonialCard } from './TestimonialCard';
import { getFeaturedTestimonials, TRUST_STATS } from '../../lib/testimonials';

/* ─────────────────────────────────────────────────────────────
   TESTIMONIALS
   Social proof section — used on homepage and /about.

   Layout:
     • Mobile:  one full-width card per view, snap carousel
     • Desktop: static 3-column grid

   Data comes from lib/testimonials.ts — never hardcoded here.
   ───────────────────────────────────────────────────────────── */

const AUTOPLAY_INTERVAL = 6000;

export function Testimonials() {
  const featured = getFeaturedTestimonials(6);
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
    <section className="relative bg-background pt-20 lg:pt-28 pb-16 lg:pb-24 px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">

        {/* ═══ Section header ═══ */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-600 mb-4">
              Testimonials
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.1] tracking-[-0.015em] mb-5">
              Trusted by travellers across Kenya.
            </h2>
            <p className="text-base lg:text-lg text-ink-muted leading-relaxed font-light max-w-2xl">
              Real reviews from real customers — business travellers,
              families, and visitors who chose Royride for their journey.
            </p>
          </div>

          <Link
            href="/testimonials"
            className="hidden md:inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink hover:text-copper-600 transition-colors duration-300 group whitespace-nowrap"
          >
            Read all {TRUST_STATS.reviewCount} reviews
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
            flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-6
            overflow-x-auto md:overflow-visible
            snap-x snap-mandatory md:snap-none
            pb-4 md:pb-0
            scrollbar-hide
            -mx-6 px-6 md:mx-0 md:px-0
          "
        >
          {featured.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="
                flex-shrink-0 basis-full
                pr-4 last:pr-0
                md:pr-0 md:basis-auto md:w-auto
                snap-start md:snap-align-none
              "
            >
              <TestimonialCard
                testimonial={testimonial}
                index={index}
              />
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
              aria-label={`Show testimonial ${index + 1} of ${featured.length}`}
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

        {/* ═══ Trust strip ═══ */}
        <div className="mt-16 lg:mt-20 pt-12 border-t border-border">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 text-center">
            <TrustStat
              value={`${TRUST_STATS.rating}/5`}
              label="Average Rating"
              icon={
                <div className="flex justify-center gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-copper-500 text-copper-500"
                    />
                  ))}
                </div>
              }
            />
            <TrustStat
              value={`${TRUST_STATS.reviewCount}+`}
              label="Google Reviews"
            />
            <TrustStat
              value={`Since ${TRUST_STATS.founded}`}
              label="Serving Nairobi"
            />
            <TrustStat
              value={`${TRUST_STATS.yearsOperating} yrs`}
              label="On the Road"
            />
          </div>
        </div>

        {/* ═══ Mobile CTA ═══ */}
        <div className="md:hidden mt-10">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-copper-600 hover:text-copper-700 transition-colors duration-300 group"
          >
            Read all {TRUST_STATS.reviewCount} reviews
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

/* ═══ TrustStat ═══ */
function TrustStat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      {icon && <div className="mb-2">{icon}</div>}
      <p className="font-display text-3xl lg:text-4xl text-ink leading-none mb-2 tabular-nums">
        {value}
      </p>
      <p className="text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
        {label}
      </p>
    </div>
  );
}
