'use client';

import { useState, useCallback } from 'react';
import { useFormState } from 'react-dom';
import { Car, Plane } from 'lucide-react';
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
   BOOKING BAR — shell

   Two modes:
     • Car Hire          → submitBooking
     • Airport Transfer  → submitAirportTransfer

   The shell:
     • Renders tabs
     • Mounts the active tab
     • Tracks per-tab readiness (drives the glowing submit)
     • Wires the correct server action per tab
     • Shows feedback, summary bar, and trust strip

   Fee display lives inside CarHireTab (it owns the location
   state). The shell stays generic so it never duplicates data.
   ───────────────────────────────────────────────────────────── */

type Tab = 'car-hire' | 'airport-transfer';

const initialState: BookingState = {};
const initialTransferState: AirportTransferState = {};

export function BookingBar() {
  const [tab, setTab] = useState<Tab>('car-hire');
  const [carHireReady, setCarHireReady] = useState(false);
  const [transferReady, setTransferReady] = useState(false);

  /* ── Stable callbacks — required so children's effects
        fire only when readiness actually changes. ── */
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

  return (
    <section
      id="booking-widget"
      className="relative z-20 -mt-24 lg:-mt-28 mb-16 lg:mb-24 px-6 lg:px-8 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* ═══════════════════════════════════════════
            Feedback banner
            ═══════════════════════════════════════════ */}
        <FeedbackBanner
          success={activeState.success}
          message={activeState.message}
        />

        <form
          action={activeAction}
          className="bg-surface border border-border rounded-lg shadow-[0_24px_64px_rgba(14,14,16,0.12)] overflow-hidden"
        >
          {/* ═══════════════════════════════════════════
              TABS
              ═══════════════════════════════════════════ */}
          <div className="border-b border-border px-4 sm:px-6 lg:px-10 bg-surface-sunken">
            <div
              role="tablist"
              aria-label="Booking mode"
              className="flex items-stretch -mb-px overflow-x-auto scrollbar-hide"
            >
              <TabButton
                active={isCarHire}
                onClick={() => setTab('car-hire')}
                icon={<Car size={14} />}
                label="Car Hire"
              />
              <TabButton
                active={!isCarHire}
                onClick={() => setTab('airport-transfer')}
                icon={<Plane size={14} />}
                label="Airport Transfer"
              />
            </div>
          </div>

          {/* ═══════════════════════════════════════════
              ACTIVE TAB PANEL
              ═══════════════════════════════════════════ */}
          <div className="px-6 lg:px-10 py-6 lg:py-8">
            {isCarHire ? (
              <CarHireTab onReadyChange={handleCarHireReady} />
            ) : (
              <AirportTransferTab onReadyChange={handleTransferReady} />
            )}
          </div>

          {/* ═══════════════════════════════════════════
              SUMMARY BAR — state + submit
              ═══════════════════════════════════════════ */}
          <SummaryBar
            label={isCarHire ? 'Car hire request' : 'Airport transfer request'}
            value={ready ? 'Ready to send' : 'Complete required fields'}
          >
            <SubmitButton
              ready={ready}
              label={isCarHire ? 'Check Availability' : 'Request Transfer'}
            />
          </SummaryBar>
        </form>

        {/* ═══════════════════════════════════════════
            TRUST STRIP
            ═══════════════════════════════════════════ */}
        <TrustStrip />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   TAB BUTTON — local to the shell
   ═══════════════════════════════════════════════════════ */
function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
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
      className={`booking-tab ${active ? 'booking-tab-active' : ''}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
