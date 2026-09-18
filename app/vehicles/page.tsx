import { VehicleGrid } from '../../components/marketing/VehicleGrid';

export const metadata = {
  title: 'Our Fleet — Royride Car Hire',
  description:
    'Browse our curated fleet of SUVs, crossovers, and vans for hire in Nairobi. Self-drive and chauffeured options available.',
};

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
            Every Vehicle,{' '}
            <span className="italic font-light">Ready</span> for the Road
          </h1>
          <p className="type-lead text-porcelain/60 max-w-2xl">
            Handpicked, fully serviced, and available for self-drive or
            chauffeured hire. From executive SUVs to family vans — delivered
            anywhere in Nairobi.
          </p>
        </div>
      </section>

      {/* Grid + Filters */}
      <section className="py-16 lg:py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <VehicleGrid />
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