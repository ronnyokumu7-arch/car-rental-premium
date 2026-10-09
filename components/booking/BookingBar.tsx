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
import {
  FeedbackBanner,
  SubmitButton,
  SummaryBar,
  TrustStrip,
} from './shared';
import { CarHireTab } from './CarHireTab';
import { AirportTransferTab } from './AirportTransferTab';

/* ─────────────────────────────────────────────────────────────
   BOOKING BAR — collapsible shell

   Collapsed (default):
     Two service tabs sit over the hero edge as a picker.
     Tapping a tab expands the widget AND sets the active tab.

   Expanded:
     Tab strip stays at the top with a close button on the right.
     Form body appears below. Summary bar at the bottom.
     TrustStrip below the card.

   Auto-expand:
     ?service= or ?vehicle= query params open the bar on mount.

   Contracts:
     • Two server actions, one per tab
     • Only the active tab's action is wired to the form
     • body[data-modal-open] pattern not used here (bar isn't a modal)
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
        relative z-20 px-6 lg:px-8 scroll-mt-24
        ${expanded ? '-mt-24 lg:-mt-28 mb-16 lg:mb-24' : '-mt-12 lg:-mt-14 mb-10 lg:mb-14'}
        transition-[margin] duration-500 ease-lux
      `}
    >
      <div className="max-w-6xl mx-auto">

        <FeedbackBanner
          success={activeState.success}
          message={activeState.message}
        />

        <form
          action={activeAction}
          className="bg-surface border border-border rounded-2xl shadow-[0_24px_64px_rgba(14,14,16,0.12)] overflow-hidden"
        >
          {/* ═══════════════════════════════════════════
              TAB STRIP
              Same tiles in both states. Active state
              differs. Close button appears when expanded.
              ═══════════════════════════════════════════ */}
          <div className="relative bg-surface-sunken border-b border-border">
            <div
              role="tablist"
              aria-label="Booking mode"
              className="flex items-stretch gap-2 p-2 sm:p-3 pr-12 sm:pr-14"
            >
              <ServiceTile
                active={expanded && isCarHire}
                expanded={expanded}
                onClick={() => handleTabClick('car-hire')}
                icon={<Car size={16} strokeWidth={2} />}
                label="Car Hire"
              />
              <ServiceTile
                active={expanded && !isCarHire}
                expanded={expanded}
                onClick={() => handleTabClick('airport-transfer')}
                icon={<Plane size={16} strokeWidth={2} />}
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
                    text-ink-subtle hover:text-ink hover:bg-surface
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
                <div className="px-6 lg:px-10 py-6 lg:py-8">
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
                  value={ready ? 'Ready to send' : 'Complete required fields'}
                >
                  <SubmitButton
                    ready={ready}
                    label={isCarHire ? 'Check Availability' : 'Request Transfer'}
                  />
                </SummaryBar>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* ═══════════════════════════════════════════
            TRUST STRIP — visible only when expanded
            ═══════════════════════════════════════════ */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="trust-strip"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <TrustStrip />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SERVICE TILE
   Used both as a collapsed picker and as the expanded tab.
   Same shape in both states — only the active/hover styling
   changes based on `expanded`.
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
        group relative flex-1 flex items-center justify-center gap-2.5
        px-4 sm:px-6
        ${expanded ? 'py-3' : 'py-5 sm:py-6'}
        rounded-xl border
        text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em]
        transition-all duration-300 ease-lux
        focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2
        ${
          active
            ? 'bg-surface border-copper-500 text-ink shadow-[0_4px_16px_rgba(194,112,46,0.15)]'
            : 'bg-surface/50 border-border text-ink-muted hover:bg-surface hover:border-copper-500/40 hover:text-ink'
        }
      `}
    >
      {/* Icon in a small copper-tinted circle */}
      <span
        className={`
          flex items-center justify-center shrink-0 rounded-full transition-all duration-300 ease-lux
          ${
            active
              ? 'w-8 h-8 bg-copper-500 text-obsidian-950'
              : 'w-8 h-8 bg-copper-500/[0.10] border border-copper-500/25 text-copper-600 group-hover:scale-105'
          }
        `}
        aria-hidden="true"
      >
        {icon}
      </span>

      <span className="truncate">{label}</span>

      {/* Active underline — only when expanded */}
      {active && expanded && (
        <span
          aria-hidden="true"
          className="absolute -bottom-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-copper-500/60 to-transparent"
        />
      )}
    </button>
  );
}
