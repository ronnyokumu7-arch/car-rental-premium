'use client';

import { useMemo } from 'react';
import {
  Calendar,
  MapPin,
  Plane,
  Clock,
  Hash,
  MessageSquare,
  Users,
} from 'lucide-react';
import {
  LOCATIONS,
  buildReturnOptions,
} from '../../lib/locations';
import { AIRPORTS, TIME_WINDOWS } from '../../lib/airportTransferOptions';
import { Select, type SelectOption } from '../ui/Select';
import { FieldWrapper, PillButton } from '../booking/shared';
import type { QuoteService } from '../../lib/quote';

/* ─────────────────────────────────────────────────────────────
   STEP 2 — DETAILS
   Conditional fields based on the service chosen in step 1.

   Car hire:
     • Pickup location + return location
     • Pickup date + return date

   Airport transfer:
     • Direction (arrival / departure)
     • Airport (JKIA / Wilson)
     • Transfer date + time window
     • Counterpart address (where we drop you / pick you up)
     • Flight number (arrival only, optional)
     • Passengers

   This is the biggest step — but it's conditional, so the user
   only sees what's relevant to their choice.
   ───────────────────────────────────────────────────────────── */

const TIME_WINDOW_OPTIONS: SelectOption[] = TIME_WINDOWS.map((t) => ({
  value: t.value,
  label: t.label,
  hint: t.hint,
}));

const AIRPORT_OPTIONS: SelectOption[] = AIRPORTS.map((a) => ({
  value: a.value,
  label: a.label,
}));

const PASSENGER_OPTIONS = [
  { value: 'any', label: 'Any' },
  { value: '1',   label: '1' },
  { value: '2',   label: '2' },
  { value: '4',   label: '4' },
  { value: '6+',  label: '6+' },
] as const;

const DIRECTIONS: { value: 'arrival' | 'departure'; label: string; hint: string }[] = [
  { value: 'arrival',   label: 'Arrival',   hint: 'From airport to address' },
  { value: 'departure', label: 'Departure', hint: 'From address to airport' },
];

interface StepDetailsProps {
  service: QuoteService;

  /* Car hire */
  pickupLocation: string;
  setPickupLocation: (v: string) => void;
  returnLocation: string;
  setReturnLocation: (v: string) => void;
  pickupDate: string;
  setPickupDate: (v: string) => void;
  dropoffDate: string;
  setDropoffDate: (v: string) => void;

  /* Airport transfer */
  direction: 'arrival' | 'departure';
  setDirection: (v: 'arrival' | 'departure') => void;
  airport: 'jkia' | 'wilson';
  setAirport: (v: 'jkia' | 'wilson') => void;
  transferDate: string;
  setTransferDate: (v: string) => void;
  timeWindow: string;
  setTimeWindow: (v: string) => void;
  counterpartAddress: string;
  setCounterpartAddress: (v: string) => void;
  passengers: string;
  setPassengers: (v: string) => void;
  flightNumber: string;
  setFlightNumber: (v: string) => void;
}

export function StepDetails(props: StepDetailsProps) {
  const {
    service,
    pickupLocation,
    setPickupLocation,
    returnLocation,
    setReturnLocation,
    pickupDate,
    setPickupDate,
    dropoffDate,
    setDropoffDate,
    direction,
    setDirection,
    airport,
    setAirport,
    transferDate,
    setTransferDate,
    timeWindow,
    setTimeWindow,
    counterpartAddress,
    setCounterpartAddress,
    passengers,
    setPassengers,
    flightNumber,
    setFlightNumber,
  } = props;

  /* Today's date — stable */
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  /* ── Options for the car-hire location selects ── */
  const pickupOptions: SelectOption[] = useMemo(
    () =>
      LOCATIONS.map((loc) => ({
        value: loc.value,
        label: loc.label,
        hint:
          loc.fee === -1
            ? 'Quote'
            : loc.fee === 0
              ? 'Free'
              : `+ KES ${loc.fee.toLocaleString('en-KE')}`,
      })),
    []
  );

  const returnOptions: SelectOption[] = useMemo(() => {
    const opts = buildReturnOptions(pickupLocation);
    return opts.map((opt) => ({
      value: opt.value,
      label: opt.label,
      hint:
        opt.fee === -1
          ? 'Quote'
          : opt.fee === 0
            ? opt.value === 'same-as-pickup'
              ? undefined
              : 'Free'
            : `+ KES ${opt.fee.toLocaleString('en-KE')}`,
    }));
  }, [pickupLocation]);

  /* ── Derived labels for the transfer counterpart field ── */
  const counterpartLabel =
    direction === 'arrival' ? 'Drop-off address' : 'Pickup address';

  const counterpartHint =
    direction === 'arrival'
      ? 'Hotel, residence, or office — we deliver you there'
      : 'Where should we collect you?';

  return (
    <div>
      {/* ── Section header ── */}
      <header className="mb-8 lg:mb-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-600 mb-3">
          Step 02 — Trip details
        </p>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink leading-[1.1] tracking-[-0.015em] mb-3">
          {service === 'car-hire'
            ? 'When and where?'
            : 'Tell us about your transfer.'}
        </h2>
        <p className="text-sm lg:text-base text-ink-muted leading-relaxed font-light max-w-xl">
          {service === 'car-hire'
            ? 'Choose your dates and pickup location. Everything else is flexible.'
            : 'Details help us time the pickup and assign the right vehicle.'}
        </p>
      </header>

      {/* ═══════════════════════════════════════════
          CAR HIRE
          ═══════════════════════════════════════════ */}
      {service === 'car-hire' && (
        <div className="space-y-6">

          {/* Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            <FieldWrapper label="Pickup location" icon={<MapPin size={14} />}>
              <Select
                name="pickupLocation"
                value={pickupLocation}
                onChange={setPickupLocation}
                options={pickupOptions}
                sheetTitle="Pickup location"
                ariaLabel="Choose a pickup location"
              />
            </FieldWrapper>

            <FieldWrapper label="Return location" icon={<MapPin size={14} />}>
              <Select
                name="returnLocation"
                value={returnLocation}
                onChange={setReturnLocation}
                options={returnOptions}
                sheetTitle="Return location"
                ariaLabel="Choose a return location"
              />
            </FieldWrapper>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            <FieldWrapper label="Pickup date" icon={<Calendar size={14} />}>
              <input
                type="date"
                name="pickupDate"
                min={today}
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="booking-input"
                required
              />
            </FieldWrapper>

            <FieldWrapper label="Return date" icon={<Calendar size={14} />}>
              <input
                type="date"
                name="dropoffDate"
                min={pickupDate || today}
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                className="booking-input"
                required
              />
            </FieldWrapper>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          AIRPORT TRANSFER
          ═══════════════════════════════════════════ */}
      {service === 'airport-transfer' && (
        <div className="space-y-6">

          {/* Direction toggle */}
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-subtle mb-3">
              <Plane size={14} className="text-ink-subtle" />
              Direction
            </label>

            {/* Desktop: two tiles */}
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

            {/* Mobile: pill switch */}
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

            <p className="sm:hidden mt-2 text-[10px] uppercase tracking-widest text-ink-subtle text-center">
              {DIRECTIONS.find((d) => d.value === direction)?.hint}
            </p>
          </div>

          {/* Airport + counterpart address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            <FieldWrapper label="Airport" icon={<Plane size={14} />}>
              <Select
                name="airport"
                value={airport}
                onChange={(v) => setAirport(v as 'jkia' | 'wilson')}
                options={AIRPORT_OPTIONS}
                sheetTitle="Select airport"
                ariaLabel="Choose an airport"
              />
            </FieldWrapper>

            <FieldWrapper
              label={counterpartLabel}
              icon={<MessageSquare size={14} />}
              hint={counterpartHint}
            >
              <input
                type="text"
                name="counterpartAddress"
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

          {/* Date + time window */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            <FieldWrapper label="Transfer date" icon={<Calendar size={14} />}>
              <input
                type="date"
                name="transferDate"
                min={today}
                value={transferDate}
                onChange={(e) => setTransferDate(e.target.value)}
                className="booking-input"
                required
              />
            </FieldWrapper>

            <FieldWrapper label="Time window" icon={<Clock size={14} />}>
              <Select
                name="timeWindow"
                value={timeWindow}
                onChange={setTimeWindow}
                options={TIME_WINDOW_OPTIONS}
                placeholder="Choose a time window"
                sheetTitle="Time window"
                ariaLabel="Choose a pickup time window"
                required
              />
            </FieldWrapper>
          </div>

          {/* Flight number (arrival only) */}
          {direction === 'arrival' && (
            <FieldWrapper
              label="Flight number (optional)"
              icon={<Hash size={14} />}
              hint="We'll track your flight and adjust pickup if it's delayed"
            >
              <input
                type="text"
                name="flightNumber"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                placeholder="e.g. KQ100"
                maxLength={20}
                autoComplete="off"
                className="booking-input"
              />
            </FieldWrapper>
          )}

          {/* Passengers */}
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
          </div>
        </div>
      )}
    </div>
  );
}
