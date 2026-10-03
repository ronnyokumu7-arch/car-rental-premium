'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { VEHICLES } from '../../lib/vehicles';

const AUTOPLAY_INTERVAL = 6000;

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % VEHICLES.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const activeVehicle = VEHICLES[activeIndex];

  return (
    <div className="relative">
      {/* Card frame */}
      <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-porcelain/10 bg-primary-900/40 backdrop-blur-sm">
        {/* Cross-fading images */}
        {VEHICLES.map((vehicle, index) => (
          <div
            key={vehicle.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {vehicle.image ? (
              <>
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority={index === 0}
                  quality={80}
                />
                {/* Bottom gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent" />
              </>
            ) : (
              <>
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${vehicle.accentFrom} 0%, ${vehicle.accentTo} 100%)`,
                  }}
                />
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    background:
                      'radial-gradient(ellipse at 70% 40%, rgba(201, 162, 39, 0.35) 0%, transparent 60%)',
                  }}
                />
              </>
            )}
          </div>
        ))}

        {/* Grain overlay */}
        <div className="grain-overlay absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none z-10" />

        {/* Active vehicle info — bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 z-20">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent-500 mb-2">
                {activeVehicle.category}
              </p>
              <h3 className="font-display text-2xl lg:text-3xl text-porcelain leading-tight mb-2 truncate">
                {activeVehicle.name}
              </h3>
              <p className="text-sm text-porcelain/60">
                From{' '}
                <span className="text-porcelain font-medium">
                  KES {activeVehicle.dailyRate.toLocaleString('en-KE')}
                </span>{' '}
                / day
              </p>
            </div>

            <Link
              href={`/vehicles`}
              aria-label={`View ${activeVehicle.name}`}
              className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-accent-500 text-primary-900 transition-transform duration-300 hover:scale-110"
            >
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {VEHICLES.map((vehicle, index) => (
          <button
            key={vehicle.id}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${vehicle.name}`}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'w-8 bg-accent-500'
                : 'w-2 bg-porcelain/30 hover:bg-porcelain/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
