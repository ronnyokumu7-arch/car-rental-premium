'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Calendar,
  Plane,
  Users,
  Clock,
  Hash,
  MessageSquare,
} from 'lucide-react';
import {
  AIRPORTS,
  TIME_WINDOWS,
  PASSENGER_OPTIONS,
  TRANSFER_VEHICLES,
} from '../../lib/airportTransferOptions';
import {
  FieldWrapper,
  PillButton,
  ConciergeHeader,
  CarSeatsIcon,
} from './shared';

/* ─────────────────────────────────────────────────────────────
   AIRPORT TRANSFER TAB
   Precision-focused counterpart to Car Hire.

   Flow:
     • Concierge summary (live)
     • Direction toggle (Arrival / Departure)
     • Airport + counterpart address
     • Date + time window
     • Progressive disclosure: flight number, passengers,
       vehicle preference, notes
   ───────────────────────────────────────────────────────────── */

type Direction = 'arrival' | 'departure';

const DIRECTIONS: { value: Direction; label: string; hint: string }[] = [
  {
    value: 'arrival',
    label: 'Arrival',
    hint: 'From airport to address',
  },
  {
    value: 'departure',
    label: 'Departure',
    hint: 'From address to airport',
  },
];

/* ─────────────────────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────────────────────── */

export function AirportTransferTab({
  onReadyChange,
}: {
  onReadyChange?: (ready: boolean) => void;
}) {
  /* ── Form state ── */
  const [direction, setDirection] = useState<Direction>('arrival');
  const [airport, setAirport] = useState('jkia');
  const [counterpartAddress, setCounterpartAddress] = useState('');
  const [transferDate, setTransferDate] = useState('');
  const [timeWindow, setTimeWindow] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [passengers, setPassengers] = useState('any');
  const [vehicleType, setVehicleType] = useState('');
  const [notes, setNotes] = useState('');
  const [showPreferences, setShowPreferences] = useState(false);

  /* Today's date — stable for the session */
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  /* ── Derived state ── */
  const ready = Boolean(
    counterpartAddress.trim().length >= 3 && transferDate && timeWindow
  );

  const hasPreferences =
    Boolean(flightNumber.trim()) ||
    passengers !== 'any' ||
    Boolean(vehicleType) ||
    Boolean(notes.trim());

  /* ── Notify parent when readiness changes ── */
  useEffect(() => {
    onReadyChange?.(ready);
  }, [ready, onReadyChange]);

  /* ── Concierge summary segments ── */
  const summarySegments = useMemo(() => {
    const airportShort =
      airport === 'jkia' ? 'JKIA' : airport === 'wilson' ? 'Wilson' : null;
    const directionWord = direction === 'arrival' ? 'Arrival' : 'Departure';
    const window = TIME_WINDOWS.find((t) => t.value === timeWindow)?.label;

    return [
      directionWord,
      airportShort,
      transferDate || null,
      window || null,
      passengers !== 'any' ? `${passengers} pax` : null,
    ];
  }, [direction, airport, transferDate, timeWindow, passengers]);

  /* ── Active hint for the mobile toggle ── */
  const activeHint = DIRECTIONS.find((d) => d.value === direction)?.hint;

  /* ── Counterpart field labels (swap based on direction) ── */
  const counterpartLabel =
    direction === 'arrival' ? 'Drop-off Address' : 'Pickup Address';

  const counterpartHint =
    direction === 'arrival'
      ? 'Hotel, residence, or office — we deliver you there'
      : 'Where should we collect you?';

  return (
    <>
      {/* ═══════════════════════════════════════════
          Concierge header — live summary
          ═══════════════════════════════════════════ */}
      <ConciergeHeader segments={summarySegments} />

      {/* ═══════════════════════════════════════════
          DIRECTION TOGGLE
          Mobile: compact pill switch (label only)
          Desktop: two-up tiles with hints
          ═══════════════════════════════════════════ */}
      <div className="mb-5">
        <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-subtle mb-3">
          <Plane size={14} className="text-ink-subtle" />
          Transfer Direction
        </label>

        {/* ── Mobile: compact pill switch ── */}
        <div className="sm:hidden inline-flex items-center p-1 bg-surface-sunken border border-border rounded-full">
          {DIRECTIONS.map((d) => {
            const isActive = direction === d.value;
            return (
              <button
                key={d.value}
                type="button"
                onClick={() => setDirection(d.value)}
                aria-pressed={isActive}
                className={`
                  px-5 py-2 text-sm font-semibold rounded-full
                  transition-all duration-300 ease-lux
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2
                  ${
                    isActive
                      ? 'bg-obsidian-900 text-white shadow-[0_2px_8px_rgba(14,14,16,0.20)]'
                      : 'text-ink-muted hover:text-ink'
                  }
                `}
              >
                {d.label}
              </button>
            );
          })}
        </div>

        {/* ── Desktop: two-up tiles with hints ── */}
        <div className="hidden sm:grid grid-cols-2 gap-2">
          {DIRECTIONS.map((d) => {
            const isActive = direction === d.value;
            return (
              <button
                key={d.value}
                type="button"
                onClick={() => setDirection(d.value)}
                aria-pressed={isActive}
                className={`
                  group relative flex flex-col items-start text-left
                  px-4 py-3 rounded-md border
                  transition-all duration-200 ease-lux
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2
                  ${
                    isActive
                      ? 'bg-obsidian-900 border-obsidian-900 text-white shadow-[0_4px_12px_rgba(14,14,16,0.15)]'
                      : 'bg-surface border-border text-ink-muted hover:border-obsidian-900/40 hover:text-ink'
                  }
                `}
              >
                <span className="text-sm font-semibold">{d.label}</span>
                <span
                  className={`text-[10px] uppercase tracking-widest mt-1 ${
                    isActive ? 'text-white/60' : 'text-ink-subtle'
                  }`}
                >
                  {d.hint}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Active hint — mobile only, below the switch ── */}
        <p className="sm:hidden mt-2 text-[10px] uppercase tracking-widest text-ink-subtle text-center">
          {activeHint}
        </p>

        <input type="hidden" name="direction" value={direction} />
      </div>

      {/* ═══════════════════════════════════════════
          AIRPORT + COUNTERPART ADDRESS
          ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mb-5">
        <FieldWrapper label="Airport" icon={<Plane size={14} />}>
          <select
            name="airport"
            value={airport}
            onChange={(e) => setAirport(e.target.value)}
            className="booking-input"
          >
            {AIRPORTS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FieldWrapper>

        <FieldWrapper
          label={counterpartLabel}
          icon={<MessageSquare size={14} />}
          hint={counterpartHint}
        >
          <input
            name="counterpartAddress"
            type="text"
            value={counterpartAddress}
            onChange={(e) => setCounterpartAddress(e.target.value)}
            placeholder={
              direction === 'arrival'
                ? 'e.g. Hemingways Nairobi, Karen'
                : 'e.g. Sarova Stanley, CBD'
            }
            maxLength={200}
            autoComplete="street-address"
            className="booking-input"
            required
          />
        </FieldWrapper>
      </div>

      {/* ═══════════════════════════════════════════
          DATE + TIME WINDOW
          ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mb-6">
        <FieldWrapper label="Transfer Date" icon={<Calendar size={14} />}>
          <input
            name="transferDate"
            type="date"
            min={today}
            value={transferDate}
            onChange={(e) => setTransferDate(e.target.value)}
            className="booking-input"
            required
          />
        </FieldWrapper>

        <FieldWrapper label="Time Window" icon={<Clock size={14} />}>
          <select
            name="timeWindow"
            value={timeWindow}
            onChange={(e) => setTimeWindow(e.target.value)}
            className="booking-input"
            required
          >
            <option value="">Choose a time window…</option>
            {TIME_WINDOWS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} · {opt.hint}
              </option>
            ))}
          </select>
        </FieldWrapper>
      </div>

      {/* ═══════════════════════════════════════════
          PROGRESSIVE DISCLOSURE — Add details
          ═══════════════════════════════════════════ */}
      <button
        type="button"
        onClick={() => setShowPreferences((v) => !v)}
        aria-expanded={showPreferences}
        aria-controls="airport-transfer-details"
        className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-subtle hover:text-copper-600 transition-colors duration-300 mb-6"
      >
        <span
          className={`inline-block transition-transform duration-300 ease-lux ${
            showPreferences ? 'rotate-90' : ''
          }`}
          aria-hidden="true"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 2l4 4-4 4" />
          </svg>
        </span>
        <span>
          {showPreferences ? 'Hide details' : 'Add flight & preferences'}
        </span>
        {hasPreferences && (
          <span
            className="w-1.5 h-1.5 rounded-full bg-copper-500"
            aria-label="Details added"
          />
        )}
      </button>

      {showPreferences && (
        <div id="airport-transfer-details" className="pb-2">
          {/* Flight number — only meaningful for arrivals */}
          {direction === 'arrival' && (
            <div className="mb-6">
              <FieldWrapper
                label="Flight Number"
                icon={<Hash size={14} />}
                hint="We'll track your flight and adjust pickup if it's delayed"
              >
                <input
                  name="flightNumber"
                  type="text"
                  value={flightNumber}
                  onChange={(e) =>
                    setFlightNumber(e.target.value.toUpperCase())
                  }
                  placeholder="e.g. KQ100"
                  maxLength={20}
                  autoComplete="off"
                  className="booking-input"
                />
              </FieldWrapper>
            </div>
          )}

          {/* Passengers + vehicle preference */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-subtle mb-3">
                <Users size={14} className="text-ink-subtle" />
                Passengers
              </label>
              <div className="flex flex-wrap gap-2">
                {PASSENGER_OPTIONS.map((opt) => (
                  <PillButton
                    key={opt.value}
                    active={passengers === opt.value}
                    pressed={passengers === opt.value}
                    onClick={() => setPassengers(opt.value)}
                  >
                    {opt.label}
                  </PillButton>
                ))}
              </div>
              <input
                type="hidden"
                name="passengers"
                value={passengers}
              />
            </div>

            <FieldWrapper
              label="Vehicle Preference"
              icon={<CarSeatsIcon size={16} className="text-ink-subtle" />}
            >
              <select
                name="vehicleType"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="booking-input"
              >
                {TRANSFER_VEHICLES.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </FieldWrapper>
          </div>

          {/* Notes */}
          <FieldWrapper
            label="Special Requests"
            icon={<MessageSquare size={14} />}
            hint="Signage, extra luggage, meet at gate — anything we should know"
          >
            <textarea
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Please meet at Arrivals Gate 3 with a name placard"
              maxLength={500}
              rows={3}
              className="booking-input h-auto py-3 resize-none"
            />
          </FieldWrapper>
        </div>
      )}
    </>
  );
}
