import type { Metadata } from 'next';
import { Suspense } from 'react';
import { VehicleGrid } from '../../components/marketing/VehicleGrid';
import { FinalCTA } from '../../components/marketing/FinalCTA';
import { buildPageMetadata } from '../../lib/metadata';
import { getPriceRange, formatPrice, getFleetSize } from '../../lib/vehicles';

/* ─────────────────────────────────────────────────────────────
   VEHICLES PAGE
   /vehicles

   Structure:
     1. Hero — dark, editorial
     2. Grid + Filters — Suspense-wrapped (uses useSearchParams)
     3. FinalCTA — the real one

   Metadata pulls live numbers from lib/vehicles.
   ───────────────────────────────────────────────────────────── */

const PRICE_RANGE = getPriceRange();
const FLEET_SIZE = getFleetSize();

export const metadata: Metadata = buildPageMetadata({
  title: 'Our Fleet — Vehicles for Hire in Nairobi',
  description: `${FLEET_SIZE} vehicles for hire in Nairobi — from ${formatPrice(
    PRICE_RANGE.min
  )} per day. Self-drive and chauffeured options, delivered anywhere in Kenya.`,
  path: '/vehicles',
  keywords: [
    'car hire fleet Nairobi',
    'Toyota Prado hire Kenya',
    'Mazda CX-5 hire Nairobi',
    'Honda Stepwgn rental',
    'self-drive cars Nairobi',
    'chauffeur car hire Kenya',
    'car rental prices Nairobi',
  ],
});

export default function VehiclesPage() {
  return (
    <main className="min-h-screen bg-background">

      {/* ══════════════════════════════════════════════════════
          HERO
          ══════════════════════════════════════════════════════ */}
      <section className="relative bg-obsidian-950 pt-32 lg:pt-40 pb-20 lg:pb-24 px-6 lg:px-8 overflow-hidden">

        {/* Ambient lighting */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 900px 600px at 75% 25%, rgba(194,112,46,0.18) 0%, transparent 55%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 700px 500px at 5% 100%, rgba(63,63,70,0.30) 0%, transparent 60%)',
          }}
        />

        {/* Grain */}
        <div className="grain-overlay absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" />

        {/* Copper bottom hairline */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/25 to-transparent"
        />

        <div className="relative max-w-5xl mx-auto">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-400 mb-5">
            Our Fleet
          </p>

          <h1 className="font-display text-white leading-[1.02] tracking-[-0.025em] mb-8 text-[clamp(2.5rem,7vw,5rem)] max-w-4xl">
            Every vehicle,{' '}
            <span className="italic font-light text-copper-200">
              ready for the road.
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-white/65 leading-relaxed font-light max-w-2xl">
            Handpicked, fully serviced, and available for self-drive or
            chauffeured hire. From executive SUVs to family vans — delivered
            anywhere in Nairobi.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          GRID + FILTERS
          ══════════════════════════════════════════════════════ */}
      <section className="bg-background py-16 lg:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<GridSkeleton />}>
            <VehicleGrid />
          </Suspense>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FINAL CTA — the real one
          ══════════════════════════════════════════════════════ */}
      <FinalCTA />
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────
   GRID SKELETON
   Matches the real layout (category tabs + filter card + 3 cards).
   Uses the new palette.
   ───────────────────────────────────────────────────────────── */
function GridSkeleton() {
  return (
    <>

      {/* Category tabs skeleton */}
      <div className="mb-6 border-b border-border">
        <div className="flex items-stretch gap-1 h-12">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-full w-24 bg-surface-sunken rounded-md animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* Filter card skeleton */}
      <div className="mb-12 bg-surface border border-border rounded-2xl p-6 lg:p-8">
        <div className="h-4 w-32 bg-surface-sunken rounded-md animate-pulse mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <div className="h-3 w-20 bg-surface-sunken rounded-md animate-pulse mb-3" />
              <div className="flex gap-2">
                {[0, 1, 2].map((j) => (
                  <div
                    key={j}
                    className="h-10 w-20 bg-surface-sunken rounded-md animate-pulse"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="h-4 w-40 bg-surface-sunken rounded-md animate-pulse" />
      </div>

      {/* Grid of vehicle card skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-2xl overflow-hidden"
          >
            <div className="aspect-[16/10] bg-obsidian-950 animate-pulse" />
            <div className="p-6 space-y-4">
              <div className="h-6 w-40 bg-surface-sunken rounded-md animate-pulse" />
              <div className="h-3 w-full bg-surface-sunken rounded-md animate-pulse" />
              <div className="h-3 w-2/3 bg-surface-sunken rounded-md animate-pulse" />
              <div className="h-10 w-32 bg-surface-sunken rounded-md animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
