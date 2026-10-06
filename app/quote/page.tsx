import type { Metadata } from 'next';
import { QuoteWizard } from '../../components/quote/QuoteWizard';
import { buildPageMetadata } from '../../lib/metadata';
import { getFleetSize, getPriceRange, formatPrice } from '../../lib/vehicles';

/* ─────────────────────────────────────────────────────────────
   QUOTE PAGE
   /quote

   The instant-quote flow — a 5-step wizard that lets visitors
   build a quote for a car hire or airport transfer, preview
   the running total, and receive it by email or WhatsApp.

   Not the same as /contact:
     • /contact  → "I have a question"
     • /quote    → "I want a price"

   Renders a single client component that owns all state.
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
      <QuoteWizard />
    </main>
  );
}
