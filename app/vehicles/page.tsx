import type { Metadata } from 'next';
import { Suspense } from 'react';
import { VehicleGrid } from '../../components/marketing/VehicleGrid';
import { buildPageMetadata } from '../../lib/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Our Fleet',
  description:
    'Browse our curated fleet — Toyota Prado, Mazda CX-5, Honda Stepwgn, and more. Self-drive or chauffeured, from KES 6,500 per day. Delivered anywhere in Nairobi.',
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

function GridSkeleton() {
  return (
    <>
      {/* Category tabs skeleton */}
      <div className="mb-6 border-b border-charcoal-300/30">
        <div className="flex items-stretch gap-1 h-12">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-full w-24 bg-charcoal-300/20 rounded-sm animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* Filter card skeleton */}
      <div className="mb-12 bg-porcelain border border-charcoal-300/30 rounded-sm p-6 lg:p-8">
        <div className="h-4 w-32 bg-charcoal-300/20 rounded-sm animate-pulse mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <div className="h-3 w-20 bg-charcoal-300/20 rounded-sm animate-pulse mb-3" />
              <div className="flex gap-2">
                {[0, 1, 2].map((j) => (
                  <div
                    key={j}
                    className="h-10 w-20 bg-charcoal-300/20 rounded-sm animate-pulse"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="h-4 w-40 bg-charcoal-300/20 rounded-sm animate-pulse" />
      </div>

      {/* Grid of vehicle card skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="bg-porcelain border border-charcoal-300/30 rounded-sm overflow-hidden"
          >
            <div className="aspect-[16/10] bg-charcoal-300/20 animate-pulse" />
            <div className="p-6 space-y-4">
              <div className="h-6 w-40 bg-charcoal-300/20 rounded-sm animate-pulse" />
              <div className="h-3 w-full bg-charcoal-300/20 rounded-sm animate-pulse" />
              <div className="h-3 w-2/3 bg-charcoal-300/20 rounded-sm animate-pulse" />
              <div className="h-10 w-32 bg-charcoal-300/20 rounded-sm animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function VehiclesPage() {
  return (
    <main className="min-h-screen bg-porcelain">
      {/* Page hero */}
      <section className="relative bg-primary-900 pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 70% 30%, rgba(201, 162, 39, 0.2) 0%, transparent 60%)',
          }}
        />
        <div className="grain-overlay absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <p className="type-caption text-accent-500 mb-4">Our Fleet</p>
          <h1 className="type-display text-porcelain mb-6 max-w-3xl">
            Every vehicle,{' '}
            <span className="italic font-light">ready</span> for the Road
          </h1>
          <p className="type-lead text-porcelain/60 max-w-2xl">
            Handpicked, fully serviced, and available for self-drive or
            chauffeured hire. From executive SUVs to family vans — delivered
            anywhere in Nairobi.
          </p>
        </div>
      </section>

      {/* Grid + Filters — wrapped in Suspense for useSearchParams */}
      <section className="py-16 lg:py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<GridSkeleton />}>
            <VehicleGrid />
          </Suspense>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-primary-900 py-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="type-caption text-accent-500 mb-4">
            Can&apos;t Find What You Need?
          </p>
          <h2 className="type-h2 text-porcelain mb-6">
            We&apos;ll Source It For You
          </h2>
          <p className="type-lead text-porcelain/60 mb-8">
            Need a specific model, a longer rental, or a corporate fleet
            arrangement? Tell us what you need — we&apos;ll make it happen.
          </p>
          <a href="/contact" className="btn-primary inline-block">
            Request a Custom Vehicle
          </a>
        </div>
      </section>
    </main>
  );
}
