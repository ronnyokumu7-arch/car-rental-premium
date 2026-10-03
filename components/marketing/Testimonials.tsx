'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { TestimonialCard } from './TestimonialCard';
import { TESTIMONIALS, TRUST_STATS } from '../../lib/testimonials';

const AUTOPLAY_INTERVAL = 6000;

export function Testimonials() {
  const featured = TESTIMONIALS.filter((t) => t.featured);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll on mobile only
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const timer = setInterval(() => {
      // Only auto-scroll if the carousel is horizontally scrollable (mobile)
      const isScrollable = carousel.scrollWidth > carousel.clientWidth;
      if (!isScrollable) return;

      const nextIndex = (activeIndex + 1) % featured.length;
      const cardWidth = carousel.clientWidth;
      carousel.scrollTo({
        left: nextIndex * cardWidth,
        behavior: 'smooth',
      });
      setActiveIndex(nextIndex);
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [activeIndex, featured.length]);

  // Detect scroll position to update active dot
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const cardWidth = carousel.clientWidth;
      const newIndex = Math.round(carousel.scrollLeft / cardWidth);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < featured.length) {
        setActiveIndex(newIndex);
      }
    };

    carousel.addEventListener('scroll', handleScroll, { passive: true });
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [activeIndex, featured.length]);

  const scrollToIndex = (index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const cardWidth = carousel.clientWidth;
    carousel.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  return (
    <section className="relative bg-porcelain pt-20 lg:pt-28 pb-8 lg:pb-12 px-6 lg:px-8 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-3xl">
            <p className="type-caption text-accent-600 mb-3">Testimonials</p>
            <h2 className="type-h1 text-primary-900 mb-4">
              Trusted by Travellers Across Kenya
            </h2>
            <p className="type-lead">
              Real reviews from real customers — business travellers, families,
              and visitors who chose Royride for their journey.
            </p>
          </div>

          <Link
            href="/testimonials"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-primary-900 hover:text-accent-600 transition-colors group whitespace-nowrap"
          >
            Read All {TRUST_STATS.reviewCount}+ Reviews
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Testimonial cards — full-width carousel on mobile, grid on desktop */}
        <div
          ref={carouselRef}
          className="
            flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-6
            overflow-x-auto md:overflow-visible
            snap-x snap-mandatory md:snap-none
            pb-4 md:pb-0
            scrollbar-hide
          "
        >
          {featured.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Gold dot indicators — mobile only */}
        <div className="md:hidden mt-6 flex items-center justify-center gap-2">
          {featured.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Show testimonial ${index + 1}`}
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

        {/* Trust strip */}
        <div className="mt-16 lg:mt-20 pt-12 border-t border-charcoal-300/30">
          <div
            className="
              grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8
              text-center
            "
          >
            <TrustStat
              value={`${TRUST_STATS.rating}/5`}
              label="Average Rating"
              icon={
                <div className="flex justify-center gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-accent-500 text-accent-500"
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
              value={TRUST_STATS.customerInteractions}
              label="Happy Customers"
            />
            <TrustStat
              value={`Since ${TRUST_STATS.founded}`}
              label="Serving Nairobi"
            />
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden mt-10">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent-600 hover:text-primary-900 transition-colors group"
          >
            Read All {TRUST_STATS.reviewCount}+ Reviews
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
      <p className="font-display text-3xl lg:text-4xl text-primary-900 mb-2">
        {value}
      </p>
      <p className="text-[10px] uppercase tracking-widest text-charcoal-500">
        {label}
      </p>
    </div>
  );
}
