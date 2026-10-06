'use client';

import { Check, ShieldCheck, Clock, Phone, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import {
  formatKES,
  daysBetween,
  type QuoteRequest,
  type QuoteBreakdown,
} from '../../lib/quote';
import { getVehicle } from '../../lib/vehicles';
import { LOCATIONS } from '../../lib/locations';
import { BRAND } from '../../lib/constants';

/* ─────────────────────────────────────────────────────────────
   STEP 5 — REVIEW
   The final check before sending.

   Shows a plain-language summary of everything the user chose,
   so they can confirm before we email or WhatsApp the quote.

   Content order:
     1. What you're quoting (vehicle / transfer headline)
     2. Trip details (dates, location, passengers, etc.)
     3. Contact (who and where it's going)
     4. Full price breakdown
     5. Trust reassurances
     6. A "what happens next" note

   The actual send button lives in the wizard shell — this file
   is presentation only.
   ───────────────────────────────────────────────────────────── */

interface StepReviewProps {
  request: QuoteRequest;
  breakdown: QuoteBreakdown;
}

export function StepReview({ request, breakdown }: StepReviewProps) {
  const vehicle = request.vehicleId
    ? getVehicle(request.vehicleId)
    : null;

  const pickupLabel = LOCATIONS.find(
    (l) => l.value === request.pickupLocation
  )?.label;

  const returnLabel =
    request.returnLocation === 'same-as-pickup'
      ? 'Same as pickup'
      : LOCATIONS.find((l) => l.value === request.returnLocation)?.label;

  const days = daysBetween(request.pickupDate, request.dropoffDate);

  /* Headline — the thing they're quoting */
  const headline = (() => {
    if (request.service === 'car-hire' && vehicle) {
      return vehicle.name;
    }
    if (request.service === 'airport-transfer' && request.airport) {
      return request.direction === 'departure'
        ? 'Departure transfer'
        : 'Arrival transfer';
    }
    return 'Your quote';
  })();

  const headlineSub = (() => {
    if (request.service === 'car-hire' && vehicle) {
      return `${vehicle.category} · ${vehicle.seats} seats · ${vehicle.transmission}`;
    }
    if (request.service === 'airport-transfer' && request.airport) {
      return `${request.airport.toUpperCase()} · ${
        request.direction === 'arrival' ? 'Arrival' : 'Departure'
      }`;
    }
    return '';
  })();

  return (
    <div>
      {/* ── Section header ── */}
      <header className="mb-8 lg:mb-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-600 mb-3">
          Step 05 — Review
        </p>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink leading-[1.1] tracking-[-0.015em] mb-3">
          One last look.
        </h2>
        <p className="text-sm lg:text-base text-ink-muted leading-relaxed font-light max-w-xl">
          Confirm the details below, then we&apos;ll send your estimate.
        </p>
      </header>

      <div className="space-y-6">

        {/* ═══════════════════════════════════════════
            WHAT YOU'RE QUOTING
            ═══════════════════════════════════════════ */}
        <ReviewCard>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-copper-600 mb-2">
                {request.service === 'car-hire' ? 'Vehicle' : 'Transfer'}
              </p>
              <h3 className="font-display text-xl lg:text-2xl text-ink leading-tight tracking-[-0.01em] mb-1.5">
                {headline}
              </h3>
              {headlineSub && (
                <p className="text-sm text-ink-muted font-light">
                  {headlineSub}
                </p>
              )}
            </div>

            <div className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-copper-500/[0.10] border border-copper-500/25 text-copper-600">
              <Check size={18} strokeWidth={2.5} />
            </div>
          </div>
        </ReviewCard>

        {/* ═══════════════════════════════════════════
            TRIP DETAILS
            ═══════════════════════════════════════════ */}
        <ReviewCard>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-copper-600 mb-5">
            Trip details
          </p>

          {request.service === 'car-hire' ? (
            <dl className="space-y-4">
              {pickupLabel && (
                <ReviewRow label="Pickup" value={pickupLabel} />
              )}
              {returnLabel && (
                <ReviewRow label="Return" value={returnLabel} />
              )}
              {request.pickupDate && (
                <ReviewRow label="From" value={formatDateLong(request.pickupDate)} />
              )}
              {request.dropoffDate && (
                <ReviewRow label="To" value={formatDateLong(request.dropoffDate)} />
              )}
              {days && (
                <ReviewRow
                  label="Duration"
                  value={`${days} day${days === 1 ? '' : 's'}`}
                />
              )}
            </dl>
          ) : (
            <dl className="space-y-4">
              {request.airport && (
                <ReviewRow
                  label="Airport"
                  value={request.airport === 'jkia' ? 'JKIA Airport' : 'Wilson Airport'}
                />
              )}
              {request.direction && (
                <ReviewRow
                  label="Direction"
                  value={request.direction === 'arrival' ? 'Arrival' : 'Departure'}
                />
              )}
              {request.transferDate && (
                <ReviewRow
                  label="Date"
                  value={formatDateLong(request.transferDate)}
                />
              )}
              {request.timeWindow && (
                <ReviewRow label="Time" value={request.timeWindow} />
              )}
              {request.counterpartAddress && (
                <ReviewRow
                  label={
                    request.direction === 'arrival'
                      ? 'Drop-off'
                      : 'Pickup'
                  }
                  value={request.counterpartAddress}
                />
              )}
              {request.flightNumber && (
                <ReviewRow label="Flight" value={request.flightNumber} />
              )}
              {request.passengers && request.passengers !== 'any' && (
                <ReviewRow
                  label="Passengers"
                  value={request.passengers}
                />
              )}
            </dl>
          )}
        </ReviewCard>

        {/* ═══════════════════════════════════════════
            CONTACT + DELIVERY
            ═══════════════════════════════════════════ */}
        <ReviewCard>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-copper-600 mb-5">
            Send to
          </p>

          <div className="space-y-3.5">
            <div className="flex items-center gap-3">
              <Check size={14} strokeWidth={3} className="text-copper-500 shrink-0" />
              <span className="text-sm text-ink">{request.contact.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={14} className="text-copper-500 shrink-0" />
              <span className="text-sm text-ink tabular-nums">
                {request.contact.phone}
              </span>
            </div>
            {request.contact.email && (
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-copper-500 shrink-0" />
                <span className="text-sm text-ink break-all">
                  {request.contact.email}
                </span>
              </div>
            )}
          </div>

          <div className="mt-5 pt-5 border-t border-border">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-subtle mb-2">
              Via
            </p>
            <p className="text-sm text-ink">
              {request.delivery === 'email'
                ? 'Email'
                : 'WhatsApp — you tap to send it'}
            </p>
          </div>

          {request.notes && (
            <div className="mt-5 pt-5 border-t border-border">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-subtle mb-2">
                Notes
              </p>
              <p className="text-sm text-ink-muted leading-relaxed font-light">
                {request.notes}
              </p>
            </div>
          )}
        </ReviewCard>

        {/* ═══════════════════════════════════════════
            PRICE BREAKDOWN
            ═══════════════════════════════════════════ */}
        <ReviewCard>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-copper-600 mb-5">
            Price breakdown
          </p>

          {breakdown.items.length > 0 ? (
            <ul className="space-y-3.5 mb-5">
              {breakdown.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-ink leading-tight">
                      {item.label}
                    </p>
                    {item.detail && (
                      <p className="text-[11px] text-ink-subtle mt-0.5 leading-snug">
                        {item.detail}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 text-sm text-ink tabular-nums">
                    {item.amount > 0 ? formatKES(item.amount) : '—'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-subtle italic mb-5">
              No priced items yet.
            </p>
          )}

          {/* Total */}
          <div className="border-t border-border pt-5 flex items-baseline justify-between gap-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-subtle">
              Estimated total
            </span>
            <span className="font-display text-2xl lg:text-3xl text-ink leading-none tabular-nums tracking-[-0.015em]">
              {breakdown.total > 0 ? formatKES(breakdown.total) : '—'}
            </span>
          </div>

          {breakdown.requiresManualQuote && (
            <p className="text-[11px] text-copper-700 leading-relaxed mt-4 px-3.5 py-3 bg-copper-500/[0.06] border border-copper-500/25 rounded-lg">
              One item needs a custom quote. We&apos;ll confirm it when we
              reply.
            </p>
          )}
        </ReviewCard>

        {/* ═══════════════════════════════════════════
            WHAT HAPPENS NEXT + TRUST
            ═══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-obsidian-950 rounded-2xl p-6 lg:p-7 overflow-hidden"
        >
          {/* Ambient copper glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 500px 300px at 90% 20%, rgba(194,112,46,0.14) 0%, transparent 60%)',
            }}
          />

          {/* Copper top hairline */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent"
          />

          <div className="relative">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-400 mb-4">
              What happens next
            </p>
            <p className="font-display text-xl lg:text-2xl text-white leading-[1.25] tracking-[-0.01em] mb-5 max-w-xl">
              {request.delivery === 'email'
                ? "We'll email you the estimate, then call to confirm."
                : "We'll open WhatsApp with your estimate ready to send."}
            </p>

            <div className="space-y-2.5">
              <TrustLine
                icon={<ShieldCheck size={12} strokeWidth={2.5} />}
                text="No hidden fees — what you see is what you pay"
              />
              <TrustLine
                icon={<Clock size={12} strokeWidth={2.5} />}
                text="Estimate valid for 48 hours"
              />
              <TrustLine
                icon={<Phone size={12} strokeWidth={2.5} />}
                text={`Prefer to talk? Call ${BRAND.phones[0]}`}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   REVIEW CARD
   Ivory surface container.
   ───────────────────────────────────────────────────────────── */

function ReviewCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-surface border border-border rounded-2xl p-6 lg:p-7"
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   REVIEW ROW
   Two-column label/value pair.
   ───────────────────────────────────────────────────────────── */

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <dt className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-subtle pt-0.5">
        {label}
      </dt>
      <dd className="text-sm text-ink text-right leading-snug">{value}</dd>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TRUST LINE
   ───────────────────────────────────────────────────────────── */

function TrustLine({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-start gap-2.5 text-white/70">
      <span className="shrink-0 text-copper-400 mt-0.5">{icon}</span>
      <span className="text-xs leading-relaxed">{text}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DATE HELPER
   Long-form date for display. Matches the formatter used on
   post pages.
   ───────────────────────────────────────────────────────────── */

function formatDateLong(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
