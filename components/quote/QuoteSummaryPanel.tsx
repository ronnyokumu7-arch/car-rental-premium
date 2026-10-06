'use client';

import { Receipt, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import {
  formatKES,
  daysBetween,
  type QuoteRequest,
  type QuoteBreakdown,
} from '../../lib/quote';
import { getVehicle } from '../../lib/vehicles';
import { LOCATIONS } from '../../lib/locations';

/* ─────────────────────────────────────────────────────────────
   QUOTE SUMMARY PANEL
   Sticky live-preview beside the wizard.

   Desktop:  full panel, always visible, updates as the user
             makes choices
   Mobile:   collapsed into a compact bar showing just the total
             (the wizard is the focus)

   Content:
     • Line items (as the breakdown computes them)
     • Total
     • Empty state before there's anything to show
     • Trust signals (validity, no hidden fees)
   ───────────────────────────────────────────────────────────── */

export function QuoteSummaryPanel({
  request,
  breakdown,
}: {
  request: QuoteRequest;
  breakdown: QuoteBreakdown;
}) {
  const vehicle = request.vehicleId
    ? getVehicle(request.vehicleId)
    : null;

  const pickupLabel = LOCATIONS.find(
    (l) => l.value === request.pickupLocation
  )?.label;

  const days = daysBetween(request.pickupDate, request.dropoffDate);

  const hasItems = breakdown.items.length > 0;

  return (
    <div className="relative bg-surface border border-border rounded-2xl overflow-hidden shadow-[0_12px_32px_rgba(14,14,16,0.06)]">

      {/* Copper top hairline */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent"
      />

      {/* ── Header ── */}
      <div className="px-6 lg:px-7 pt-6 lg:pt-7 pb-5 border-b border-border">
        <div className="flex items-center gap-2.5 mb-1.5">
          <Receipt size={14} strokeWidth={2} className="text-copper-500" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-copper-600">
            Your estimate
          </p>
        </div>
        <p className="text-xs text-ink-muted font-light leading-relaxed">
          Updates as you make choices.
        </p>
      </div>

      {/* ═══════════════════════════════════════════
          CONTENT
          ═══════════════════════════════════════════ */}
      <div className="px-6 lg:px-7 py-6">

        {/* Empty state */}
        {!hasItems && (
          <div className="py-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-surface-sunken border border-border mb-4">
              <Sparkles
                size={18}
                strokeWidth={1.8}
                className="text-ink-subtle"
              />
            </div>
            <p className="text-sm text-ink-muted leading-relaxed font-light max-w-xs mx-auto">
              Your estimate will appear here as you make choices.
            </p>
          </div>
        )}

        {/* Trip summary (when we have something) */}
        {hasItems && (
          <>
            {/* ── Trip block ── */}
            <div className="mb-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-subtle mb-3">
                Trip
              </p>

              {vehicle && (
                <p className="font-display text-lg text-ink leading-tight tracking-[-0.01em] mb-1">
                  {vehicle.name}
                </p>
              )}

              {request.service === 'car-hire' && (
                <div className="text-xs text-ink-muted leading-relaxed space-y-0.5">
                  {days && (
                    <p>
                      {days} day{days === 1 ? '' : 's'}
                    </p>
                  )}
                  {pickupLabel && <p>From {pickupLabel}</p>}
                </div>
              )}

              {request.service === 'airport-transfer' && (
                <div className="text-xs text-ink-muted leading-relaxed space-y-0.5">
                  {request.direction && request.airport && (
                    <p>
                      {request.direction === 'arrival'
                        ? 'Arrival at'
                        : 'Departure from'}{' '}
                      {request.airport.toUpperCase()}
                    </p>
                  )}
                  {request.transferDate && <p>{request.transferDate}</p>}
                </div>
              )}
            </div>

            {/* ── Line items ── */}
            <div className="border-t border-border pt-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-subtle mb-4">
                Breakdown
              </p>

              <ul className="space-y-3.5">
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
            </div>
          </>
        )}
      </div>

      {/* ═══════════════════════════════════════════
          TOTAL
          ═══════════════════════════════════════════ */}
      <div className="border-t border-border bg-surface-sunken px-6 lg:px-7 py-5">
        <div className="flex items-baseline justify-between gap-4 mb-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-subtle">
            Estimated total
          </span>
          <span className="font-display text-2xl lg:text-3xl text-ink leading-none tabular-nums tracking-[-0.015em]">
            {breakdown.total > 0
              ? formatKES(breakdown.total)
              : '—'}
          </span>
        </div>
        <p className="text-[10px] text-ink-subtle font-medium uppercase tracking-[0.16em] mt-2">
          Confirmed by concierge
        </p>
      </div>

      {/* ═══════════════════════════════════════════
          TRUST FOOTER
          ═══════════════════════════════════════════ */}
      <div className="border-t border-border px-6 lg:px-7 py-4 space-y-2.5">
        <TrustLine
          icon={<ShieldCheck size={12} strokeWidth={2.5} />}
          text="No hidden fees"
        />
        <TrustLine
          icon={<Clock size={12} strokeWidth={2.5} />}
          text="Estimate valid for 48 hours"
        />
      </div>

      {/* ═══════════════════════════════════════════
          Manual quote note
          ═══════════════════════════════════════════ */}
      {breakdown.requiresManualQuote && (
        <div className="px-6 lg:px-7 pb-6 pt-1">
          <div className="flex items-start gap-2.5 px-3.5 py-3 bg-copper-500/[0.06] border border-copper-500/25 rounded-lg">
            <Sparkles
              size={13}
              strokeWidth={2.5}
              className="text-copper-600 mt-0.5 shrink-0"
            />
            <p className="text-[11px] text-copper-700 leading-relaxed">
              One item needs a custom quote. We&apos;ll confirm it when we
              reply.
            </p>
          </div>
        </div>
      )}
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
    <div className="flex items-center gap-2 text-ink-subtle">
      <span className="text-copper-500 shrink-0">{icon}</span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
        {text}
      </span>
    </div>
  );
}
