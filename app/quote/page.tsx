import type { Metadata } from 'next';
import { Suspense } from 'react';
import { QuoteWizard } from '../../components/quote/QuoteWizard';
import { buildPageMetadata } from '../../lib/metadata';
import { getFleetSize, getPriceRange, formatPrice } from '../../lib/vehicles';

/* ─────────────────────────────────────────────────────────────
   QUOTE PAGE
   /quote

   The instant-quote flow — a 5-step wizard.

   Wrapped in <Suspense> because the wizard uses useSearchParams()
   to read ?service= and ?vehicle= on mount. Without the boundary,
   Next.js can't prerender the page.
   ───────────────────────────────────────────────────────────── */

const PRICE_RANGE = getPriceRange();
const FLEET_SIZE = getFleetSize();

export const metadata: Metadata = buildPageMetadata({
  title: `Get an Instant Quote — ${FLEET_SIZE} Vehicles from ${formatPrice(PRICE_RANGE.min)}/day`,
  description: `Build a quote in under a minute. Choose car hire or airport transfer, pick your vehicle, and receive a full estimate by email or WhatsApp — ${FLEET_SIZE} vehicles from ${formatPrice(PRICE_RANGE.min)} per day.`,
  path: '/quote',
  keywords: [
    'car hire quote Nairobi',
    'car rental quote Kenya',
    'airport transfer quote Nairobi',
    'instant car hire quote',
    'Royride quote',
  ],
});

export default function QuotePage() {
  return (
    <main id="main" className="min-h-screen bg-background">
      <Suspense fallback={<QuoteFallback />}>
        <QuoteWizard />
      </Suspense>
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────
   FALLBACK
   Rendered while the wizard hydrates. Matches the wizard's
   hero so there's no layout shift.
   ───────────────────────────────────────────────────────────── */
function QuoteFallback() {
  return (
    <section className="relative bg-obsidian-950 pt-32 lg:pt-40 pb-16 lg:pb-20 px-6 lg:px-8 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 900px 600px at 75% 25%, rgba(194,112,46,0.18) 0%, transparent 55%)',
        }}
      />
      <div className="relative max-w-5xl mx-auto">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-400 mb-5">
          Instant Quote
        </p>
        <h1 className="font-display text-white leading-[1.05] tracking-[-0.025em] mb-6 text-[clamp(2rem,5vw,3.5rem)] max-w-3xl">
          Build your quote{' '}
          <span className="italic font-light text-copper-200">
            in under a minute.
          </span>
        </h1>
      </div>
    </section>
  );
}
