import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Bell } from 'lucide-react';
import { BRAND } from '../../lib/constants';
import { CONTACT } from '../../lib/contact';

export const metadata = {
  title: 'Rental Calendar',
  description:
    "Real-time fleet availability coming soon to Royride Car Hire. In the meantime, call or WhatsApp us to check availability and reserve your vehicle.",
};

export default function RentalCalendarPage() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    'Hi Royride, I would like to check vehicle availability for my dates.'
  )}`;

  return (
    <main className="min-h-screen bg-porcelain">
      {/* ── Hero band ── */}
      <section className="relative bg-primary-900 pt-32 pb-24 lg:pb-28 px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 70% 30%, rgba(201, 162, 39, 0.2) 0%, transparent 60%)',
          }}
        />
        <div className="grain-overlay absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <p className="type-caption text-accent-500 mb-4">
            Real-Time Availability
          </p>
          <h1 className="type-display text-porcelain mb-6">
            Rental{' '}
            <span className="italic font-light">Calendar</span>
          </h1>
          <p className="type-lead text-porcelain/60 max-w-2xl mx-auto">
            A live view of our fleet — see which vehicles are available on
            your dates and reserve in seconds. Currently in development.
          </p>
        </div>
      </section>

      {/* ── Coming soon card ── */}
      <section className="pt-20 lg:pt-28 pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-porcelain border border-charcoal-300/30 rounded-sm p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent-500/10 border border-accent-500/30 flex items-center justify-center shrink-0">
                <Calendar size={20} className="text-accent-600" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-accent-600 font-medium">
                Coming Soon
              </p>
            </div>

            <h2 className="font-display text-3xl lg:text-4xl text-primary-900 leading-tight mb-6">
              A Live View of Every Vehicle
            </h2>

            <p className="type-body mb-6">
              We&apos;re building a real-time rental calendar that shows
              exactly which vehicles are available on any given date. No
              waiting for confirmation calls, no guessing — just instant
              availability and one-tap reservation.
            </p>

            <div className="space-y-4 mb-8">
              <Feature
                icon={<Calendar size={16} />}
                title="See Real Availability"
                description="Every vehicle, every date. Free, busy, or blocked — visible at a glance."
              />
              <Feature
                icon={<Clock size={16} />}
                title="Instant Booking"
                description="Reserve your vehicle the moment you see it's free. No back-and-forth."
              />
              <Feature
                icon={<Bell size={16} />}
                title="Notify Me"
                description="Want to know the day it launches? Send us a message and we'll reach out."
              />
            </div>

            <div className="pt-8 border-t border-charcoal-300/30">
              <p className="type-caption text-charcoal-500 mb-4">
                Need a vehicle today?
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  Chat on WhatsApp
                  <ArrowRight size={16} />
                </a>
                <Link
                  href="/vehicles"
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  Browse the Fleet
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Direct contact strip ── */}
      <section className="bg-primary-900 py-16 lg:py-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="type-caption text-accent-500 mb-4">
            Prefer to Speak to a Human?
          </p>
          <h2 className="font-display text-3xl lg:text-4xl text-porcelain leading-tight mb-8">
            We&apos;ll Check Availability For You
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {BRAND.phones.map((phone, index) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, '')}`}
                className={
                  index === 0
                    ? 'btn-primary inline-block'
                    : 'btn-secondary border-porcelain text-porcelain hover:bg-porcelain hover:text-primary-900 inline-block'
                }
              >
                {phone}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─────────────────────────────────────────────── */
function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-accent-500/10 border border-accent-500/30 flex items-center justify-center shrink-0 mt-0.5">
        <span className="text-accent-600">{icon}</span>
      </div>
      <div>
        <p className="text-sm font-medium text-primary-900 mb-1">{title}</p>
        <p className="text-sm text-charcoal-500 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
