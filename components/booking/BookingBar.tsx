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

   Desktop (lg+):
     Collapsed by default — two service tabs as a picker.
     Tapping a tab expands the widget AND sets the active tab.
     Close button appears when expanded.

   Mobile (<lg):
     No tabs. The Car Hire form is always expanded.
     Airport transfers are reachable via /quote or dedicated ads.
     No close button — the form is the section.

   Sunken band:
     The bottom of the form (refinements + SummaryBar) sits on
     one continuous sunken surface. There is no white gap between
     the refinements and the action row. The band starts inside
     CarHireTab / AirportTransferTab and continues through the
     SummaryBar below.

   Auto-expand:
     ?service= or ?vehicle= query params open the bar on mount.
     On mobile, the service param determines which tab is active.
   ───────────────────────────────────────────────────────────── */

type Tab = 'car-hire' | 'airport-transfer';

const initialState: BookingState = {};
const initialTransferState: AirportTransferState = {};

export function BookingBar() {
  const searchParams = useSearchParams();
  const fleetSize = getFleetSize();

  /* ── Expanded state ── */
  const [expanded, setExpanded] = useState(false);

  /* ── Auto-expand + service detection ── */
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 1023px)').matches;
    const service = searchParams.get('service');
    const vehicle = searchParams.get('vehicle');

    if (isMobile) {
      setExpanded(true);
      if (service === 'airport-transfer') {
        setTab('airport-transfer');
      } else {
        setTab('car-hire');
      }
      return;
    }

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

  /* ── Tab click — expands + switches (desktop only) ── */
  const handleTabClick = useCallback((newTab: Tab) => {
    setTab(newTab);
    setExpanded(true);
  }, []);

  /* ── Collapse (desktop only) ── */
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
                TAB STRIP — DESKTOP ONLY
                ═══════════════════════════════════════════ */}
            <div className="relative bg-surface hidden lg:block">
              <div
                role="tablist"
                aria-label="Booking mode"
                className={`
                  flex items-stretch gap-2 p-2
                  ${expanded ? 'pr-14' : ''}
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

              {/* Close button */}
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
                      absolute top-1/2 -translate-y-1/2 right-4
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
                ═══════════════════════════════════════════ */}
            <div className="bg-surface">
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-4 px-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-subtle">
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <Star
                    size={10}
                    className="fill-copper-500 text-copper-500 shrink-0"
                  />
                  {TRUST_STATS.rating} on Google
                </span>
                <span
                  aria-hidden="true"
                  className="w-px h-3 bg-border-strong hidden sm:inline-block"
                />
                <span className="whitespace-nowrap">
                  {fleetSize} vehicles in fleet
                </span>
                <span
                  aria-hidden="true"
                  className="w-px h-3 bg-border-strong hidden sm:inline-block"
                />
                <span className="whitespace-nowrap">
                  Since {TRUST_STATS.founded}
                </span>
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
                  {/* ── Top: white surface — dates row for car hire,
                        form fields for airport transfer ── */}
                  <div className="border-t border-border px-6 lg:px-10 pt-6 lg:pt-8 pb-6 lg:pb-8">
                    {isCarHire ? (
                      <CarHireTab onReadyChange={handleCarHireReady} />
                    ) : (
                      <AirportTransferTab
                        onReadyChange={handleTransferReady}
                      />
                    )}
                  </div>

                  {/* ── Bottom: sunken band — summary bar ── */}
                  <div className="bg-surface-sunken border-t border-border">
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
                  </div>
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
   SERVICE TILE — desktop only
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
        px-5
        ${expanded ? 'py-2.5' : 'py-4'}
        rounded-lg border
        text-[11px] font-semibold uppercase tracking-[0.16em]
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
