'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFormState } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Plane, X, Star } from 'lucide-react';
import { submitBooking, type BookingState } from '../../app/actions/booking';
import {
  submitAirportTransfer,
  type AirportTransferState,
} from '../../app/actions/airportTransfer';
import { FeedbackBanner, SubmitButton, SummaryBar } from './shared';
import { CarHireTab } from './CarHireTab';
import { AirportTransferTab } from './AirportTransferTab';
import { TRUST_STATS } from '../../lib/testimonials';
import { getFleetSize } from '../../lib/vehicles';

/* ─────────────────────────────────────────────────────────────
   BOOKING BAR — collapsible shell

   Collapsed (default):
     Two service tabs sit below the hero as a picker.
     A compact trust line sits beneath the tabs.

   Expanded:
     Tab strip at top with a close button on the right.
     Form body below. Summary bar at the bottom.

   Purpose:
     Quick availability check — not a booking.
     Detailed enquiry → /quote
     Detailed fleet filter → /vehicles

   Responsive layout:
     • Mobile  — full-bleed edge-to-edge. Tabs use the full
                 width when collapsed. Padding reserved for
                 the close button only when expanded.
     • Desktop — centered card, max-w-6xl, rounded corners.
   ───────────────────────────────────────────────────────────── */

type Tab = 'car-hire' | 'airport-transfer';

const initialState: BookingState = {};
const initialTransferState: AirportTransferState = {};

export function BookingBar() {
  const searchParams = useSearchParams();
  const fleetSize = getFleetSize();

  /* ── Expanded state ── */
  const [expanded, setExpanded] = useState(false);

  /* ── Auto-expand if URL params are present ── */
  useEffect(() => {
    const service = searchParams.get('service');
    const vehicle = searchParams.get('vehicle');
    if (service || vehicle) {
      setExpanded(true);
      if (service === 'airport-transfer') {
        setTab('airport-transfer');
      } else if (service === 'car-hire') {
        setTab('car-hire');
      }
    }
  }, [searchParams]);

  /* ── Tab state ── */
  const [tab, setTab] = useState<Tab>('car-hire');
  const [carHireReady, setCarHireReady] = useState(false);
  const [transferReady, setTransferReady] = useState(false);

  /* ── Stable readiness callbacks ── */
  const handleCarHireReady = useCallback((ready: boolean) => {
    setCarHireReady(ready);
  }, []);

  const handleTransferReady = useCallback((ready: boolean) => {
    setTransferReady(ready);
  }, []);

  /* ── Two server actions, one per tab ── */
  const [carHireState, carHireAction] = useFormState(
    submitBooking,
    initialState
  );
  const [transferState, transferAction] = useFormState(
    submitAirportTransfer,
    initialTransferState
  );

  const isCarHire = tab === 'car-hire';
  const ready = isCarHire ? carHireReady : transferReady;
  const activeState = isCarHire ? carHireState : transferState;
  const activeAction = isCarHire ? carHireAction : transferAction;

  /* ── Tab click — expands + switches ── */
  const handleTabClick = useCallback((newTab: Tab) => {
    setTab(newTab);
    setExpanded(true);
  }, []);

  /* ── Collapse ── */
  const handleClose = useCallback(() => {
    setExpanded(false);
  }, []);

  return (
    <section
      id="booking-widget"
      className={`
        relative z-20 scroll-mt-24
        transition-[margin] duration-500 ease-lux
        ${
          expanded
            ? 'mt-0 lg:-mt-24 mb-12 lg:mb-16'
            : 'mt-0 lg:-mt-16 mb-8 lg:mb-10'
        }
      `}
    >
      <div className="px-0 lg:px-8">
        <div className="max-w-6xl mx-auto">

          <FeedbackBanner
            success={activeState.success}
            message={activeState.message}
          />

          <form
            action={activeAction}
            className="
              bg-surface overflow-hidden
              lg:rounded-2xl
              lg:border lg:border-border
              lg:shadow-[0_24px_64px_rgba(14,14,16,0.12)]
            "
          >
            {/* ═══════════════════════════════════════════
                TAB STRIP
                ═══════════════════════════════════════════ */}
            <div className="relative bg-surface">
              <div
                role="tablist"
                aria-label="Booking mode"
                className={`
                  flex items-stretch gap-2 p-2
                  ${expanded ? 'pr-12 sm:pr-14' : ''}
                `}
              >
                <ServiceTile
                  active={expanded && isCarHire}
                  expanded={expanded}
                  onClick={() => handleTabClick('car-hire')}
                  icon={<Car size={15} strokeWidth={2} />}
                  label="Car Hire"
                />
                <ServiceTile
                  active={expanded && !isCarHire}
                  expanded={expanded}
                  onClick={() => handleTabClick('airport-transfer')}
                  icon={<Plane size={15} strokeWidth={2} />}
                  label="Airport Transfer"
                />
              </div>

              {/* Close button — only when expanded */}
              <AnimatePresence>
                {expanded && (
                  <motion.button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close booking widget"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="
                      absolute top-1/2 -translate-y-1/2 right-3 sm:right-4
                      flex items-center justify-center w-9 h-9 rounded-full
                      text-ink-subtle hover:text-ink hover:bg-surface-sunken
                      transition-colors duration-200
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2
                    "
                  >
                    <X size={16} strokeWidth={2.5} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* ═══════════════════════════════════════════
                TRUST LINE
                Horizontal scroll on mobile (edge-to-edge,
                no wrapping). Centered on desktop.
                ═══════════════════════════════════════════ */}
            <div className="bg-surface border-t border-border">
              {/* Mobile: horizontal scroll */}
              <div className="sm:hidden flex items-center gap-x-4 overflow-x-auto scrollbar-hide px-6 py-3 snap-x snap-mandatory">
                <TrustItem icon={<Star size={10} className="fill-copper-500 text-copper-500" />}>
                  {TRUST_STATS.rating} on Google
                </TrustItem>
                <Divider />
                <TrustItem>{fleetSize} vehicles in fleet</TrustItem>
                <Divider />
                <TrustItem>Since {TRUST_STATS.founded}</TrustItem>
                <Divider />
                <TrustItem>Nairobi · Kenya</TrustItem>
              </div>

              {/* Desktop: centered, no scroll */}
              <div className="hidden sm:flex items-center justify-center gap-x-5 py-3 px-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-subtle">
                <span className="inline-flex items-center gap-1.5">
                  <Star
                    size={10}
                    className="fill-copper-500 text-copper-500"
                  />
                  {TRUST_STATS.rating} on Google
                </span>
                <span
                  aria-hidden="true"
                  className="w-px h-3 bg-border-strong"
                />
                <span>{fleetSize} vehicles in fleet</span>
                <span
                  aria-hidden="true"
                  className="w-px h-3 bg-border-strong"
                />
                <span>Since {TRUST_STATS.founded}</span>
              </div>
            </div>

            {/* ═══════════════════════════════════════════
                COLLAPSIBLE FORM BODY
                ═══════════════════════════════════════════ */}
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  key="form-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border px-6 lg:px-10 py-6 lg:py-8">
                    {isCarHire ? (
                      <CarHireTab onReadyChange={handleCarHireReady} />
                    ) : (
                      <AirportTransferTab
                        onReadyChange={handleTransferReady}
                      />
                    )}
                  </div>

                  <SummaryBar
                    label={
                      isCarHire
                        ? 'Availability check'
                        : 'Airport transfer request'
                    }
                    value={
                      ready
                        ? 'Ready to send'
                        : isCarHire
                          ? 'Add dates to see availability'
                          : 'Complete required fields'
                    }
                  >
                    <SubmitButton
                      ready={ready}
                      label={
                        isCarHire
                          ? 'Check Availability'
                          : 'Request Transfer'
                      }
                    />
                  </SummaryBar>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   TRUST ITEM
   Small inline item used in the mobile scroll strip.
   ───────────────────────────────────────────────────────────── */
function TrustItem({
  icon,
  children,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 shrink-0 snap-start text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-subtle whitespace-nowrap">
      {icon}
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   DIVIDER
   ───────────────────────────────────────────────────────────── */
function Divider() {
  return (
    <span
      aria-hidden="true"
      className="w-px h-3 bg-border-strong shrink-0"
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   SERVICE TILE
   ───────────────────────────────────────────────────────────── */
function ServiceTile({
  active,
  expanded,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  expanded: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`
        group relative flex-1 flex items-center justify-center gap-2
        px-3 sm:px-5
        ${expanded ? 'py-2.5' : 'py-3.5 sm:py-4'}
        rounded-lg border
        text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em]
        transition-all duration-300 ease-lux
        focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2
        ${
          active
            ? 'bg-copper-500/[0.06] border-copper-500/60 text-ink'
            : 'bg-surface border-border text-ink-muted hover:bg-copper-500/[0.03] hover:border-copper-500/40 hover:text-ink'
        }
      `}
    >
      <span
        className={`
          flex items-center justify-center shrink-0 rounded-md transition-all duration-300 ease-lux
          ${expanded ? 'w-6 h-6' : 'w-7 h-7'}
          ${
            active
              ? 'bg-copper-500 text-obsidian-950'
              : 'bg-copper-500/[0.10] border border-copper-500/25 text-copper-600 group-hover:bg-copper-500/[0.15]'
          }
        `}
        aria-hidden="true"
      >
        {icon}
      </span>

      <span className="truncate">{label}</span>
    </button>
  );
}
