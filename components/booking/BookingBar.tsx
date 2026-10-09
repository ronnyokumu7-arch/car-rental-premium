'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFormState } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Car, Plane, X } from 'lucide-react';
import { submitBooking, type BookingState } from '../../app/actions/booking';
import {
  submitAirportTransfer,
  type AirportTransferState,
} from '../../app/actions/airportTransfer';
import { FeedbackBanner, SubmitButton, SummaryBar } from './shared';
import { CarHireTab } from './CarHireTab';
import { AirportTransferTab } from './AirportTransferTab';

/* ─────────────────────────────────────────────────────────────
   BOOKING BAR — collapsible shell

   Collapsed (default):
     Two service tabs sit below the hero as a picker.
     Tapping a tab expands the widget AND sets the active tab.

   Expanded:
     Tab strip stays at the top with a close button on the right.
     Form body appears below. Summary bar at the bottom.

   Auto-expand:
     ?service= or ?vehicle= query params open the bar on mount.

   Responsive layout:
     • Mobile  — full-bleed edge-to-edge. No card chrome.
     • Desktop — centered card, max-w-6xl, rounded corners,
                 overlaps the hero's bottom edge.

   Design:
     • Compact tabs (56px collapsed, ~44px expanded)
     • Soft rounded corners
     • No hard dividers — tabs flow into the section below
     • TrustStrip removed (redundant with hero + FeaturedFleet)
   ───────────────────────────────────────────────────────────── */

type Tab = 'car-hire' | 'airport-transfer';

const initialState: BookingState = {};
const initialTransferState: AirportTransferState = {};

export function BookingBar() {
  const searchParams = useSearchParams();

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
      {/* Padding: 0 on mobile (edge-to-edge), 8 on desktop */}
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
                No bottom border — flows into the form body
                when expanded, flows into the section below
                when collapsed.
                ═══════════════════════════════════════════ */}
            <div className="relative bg-surface">
              <div
                role="tablist"
                aria-label="Booking mode"
                className="flex items-stretch gap-2 p-2 pr-12 sm:p-2.5 sm:pr-14"
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
                        ? 'Car hire request'
                        : 'Airport transfer request'
                    }
                    value={
                      ready ? 'Ready to send' : 'Complete required fields'
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
   SERVICE TILE
   Compact tabs. Two sizes:
     • Collapsed — 56px (inviting, spacious)
     • Expanded  — ~44px (compact, functional)
   Active state:
     • Copper border + soft copper tint
     • Icon badge becomes filled copper
   Inactive hover:
     • Warms toward copper
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
      {/* Icon badge */}
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
