'use client';

import { useState, useMemo, useEffect } from 'react';
import { Calendar, Car, Tag } from 'lucide-react';
import { Range } from 'react-range';
import {
  LOCATIONS,
  DEFAULT_PICKUP_LOCATION,
  DEFAULT_RETURN_LOCATION,
  getPickupFee,
  getReturnFee,
  requiresQuote,
  buildReturnOptions,
  getPickupLabel,
  getPickupFeeLabel,
  getReturnFeeLabel,
} from '../../lib/locations';
import { getPriceRange } from '../../lib/vehicles';
import {
  FieldWrapper,
  LocationField,
  PillButton,
  ConciergeHeader,
  CarSeatsIcon,
} from './shared';

/* ─────────────────────────────────────────────────────────────
   CAR HIRE TAB
   Default view of the booking bar.

   Layout:
     • Concierge summary (live)
     • Essentials: locations + dates (always visible)
     • Preferences: vehicle type, seats, price (collapsed)
     • Hidden fields for the server action
   ───────────────────────────────────────────────────────────── */

const VEHICLE_TYPES = [
  { value: 'Sedan',     label: 'Sedan' },
  { value: 'SUV',       label: 'SUV' },
  { value: 'Crossover', label: 'Crossover' },
  { value: 'Wagon',     label: 'Wagon' },
  { value: 'Hatchback', label: 'Hatchback' },
  { value: 'Van',       label: 'Van' },
] as const;

const SEAT_OPTIONS = [
  { value: 'any', label: 'Any' },
  { value: '5',   label: '5' },
  { value: '7',   label: '7' },
  { value: '8+',  label: '8+' },
] as const;

/* Computed once at module load — the fleet doesn't change at runtime. */
const PRICE_RANGE = getPriceRange();
const PRICE_STEP = 500;

/* ─────────────────────────────────────────────────────────────
   PURE HELPERS
   ───────────────────────────────────────────────────────────── */

/** Days between two ISO date strings. Returns null for invalid ranges. */
function daysBetween(pickup: string, dropoff: string): number | null {
  if (!pickup || !dropoff) return null;
  const a = new Date(pickup).getTime();
  const b = new Date(dropoff).getTime();
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  const days = Math.round((b - a) / 86_400_000);
  return days > 0 ? days : null;
}

/** Short location name for the concierge header. */
function getShortLocation(value: string, pickupValue?: string): string {
  if (value === 'same-as-pickup') {
    return pickupValue ? getShortLocation(pickupValue) : 'Same as pickup';
  }
  const loc = LOCATIONS.find((l) => l.value === value);
  if (!loc) return value;
  return loc.label.split('|')[0].trim();
}

/* ─────────────────────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────────────────────── */

export function CarHireTab({
  onReadyChange,
}: {
  onReadyChange?: (ready: boolean) => void;
}) {
  /* ── Form state ── */
  const [pickupLocation, setPickupLocation] = useState(DEFAULT_PICKUP_LOCATION);
  const [returnLocation, setReturnLocation] = useState(DEFAULT_RETURN_LOCATION);
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [seats, setSeats] = useState('any');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    PRICE_RANGE.min,
    PRICE_RANGE.max,
  ]);
  const [showPreferences, setShowPreferences] = useState(false);

  /* Today's date — stable for the session */
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  /* ── Derived state ── */
  const returnOptions = useMemo(
    () => buildReturnOptions(pickupLocation),
    [pickupLocation]
  );

  const pickupFee = getPickupFee(pickupLocation);
  const returnFee = getReturnFee(returnLocation, pickupLocation);
  const needsQuote = requiresQuote(pickupLocation, returnLocation);
  const totalFees = pickupFee + returnFee;

  const days = daysBetween(pickupDate, dropoffDate);
  const ready = Boolean(days);

  const hasPreferences =
    Boolean(vehicleType) ||
    seats !== 'any' ||
    priceRange[0] !== PRICE_RANGE.min ||
    priceRange[1] !== PRICE_RANGE.max;

  /* ── Notify parent when readiness changes ── */
  useEffect(() => {
    onReadyChange?.(ready);
  }, [ready, onReadyChange]);

  /* ── Concierge summary segments ── */
  const summarySegments = useMemo(
    () => [
      days ? `${days} day${days === 1 ? '' : 's'}` : null,
      `${getShortLocation(pickupLocation)} → ${getShortLocation(
        returnLocation,
        pickupLocation
      )}`,
      vehicleType || null,
      seats !== 'any' ? `${seats} seats` : null,
    ],
    [days, pickupLocation, returnLocation, vehicleType, seats]
  );

  /* ── Range track offsets (memoized) ── */
  const [rangeLeftPct, rangeRightPct] = useMemo(() => {
    const span = PRICE_RANGE.max - PRICE_RANGE.min || 1;
    const left = ((priceRange[0] - PRICE_RANGE.min) / span) * 100;
    const right = 100 - ((priceRange[1] - PRICE_RANGE.min) / span) * 100;
    return [left, right];
  }, [priceRange]);

  return (
    <>
      {/* ═══════════════════════════════════════════
          Concierge header — live summary
          ═══════════════════════════════════════════ */}
      <ConciergeHeader segments={summarySegments} />

      {/* ═══════════════════════════════════════════
          ESSENTIALS — locations + dates
          ═══════════════════════════════════════════ */}

      {/* Locations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mb-5">
        <LocationField
          label={getPickupLabel(pickupLocation)}
          subLabel={getPickupFeeLabel(pickupLocation)}
          name="pickupLocation"
          value={pickupLocation}
          onChange={setPickupLocation}
          options={LOCATIONS}
        />
        <LocationField
          label="Return Location"
          subLabel={getReturnFeeLabel(returnLocation, pickupLocation)}
          name="returnLocation"
          value={returnLocation}
          onChange={setReturnLocation}
          options={returnOptions}
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mb-5">
        <FieldWrapper label="Pickup Date" icon={<Calendar size={14} />}>
          <input
            name="pickupDate"
            type="date"
            min={today}
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="booking-input"
            required
          />
        </FieldWrapper>

        <FieldWrapper
          label="Return Date"
          icon={<Calendar size={14} />}
          hint={
            pickupDate && !days
              ? 'Return date must be after pickup'
              : undefined
          }
        >
          <input
            name="dropoffDate"
            type="date"
            min={pickupDate || today}
            value={dropoffDate}
            onChange={(e) => setDropoffDate(e.target.value)}
            className="booking-input"
            required
          />
        </FieldWrapper>
      </div>

      {/* ═══════════════════════════════════════════
          PROGRESSIVE DISCLOSURE — Refine your search
          ═══════════════════════════════════════════ */}
      <button
        type="button"
        onClick={() => setShowPreferences((v) => !v)}
        aria-expanded={showPreferences}
        aria-controls="car-hire-preferences"
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
          {showPreferences ? 'Hide preferences' : 'Refine your search'}
        </span>
        {hasPreferences && (
          <span
            className="w-1.5 h-1.5 rounded-full bg-copper-500"
            aria-label="Preferences applied"
          />
        )}
      </button>

      {showPreferences && (
        <div id="car-hire-preferences" className="pb-2">
          {/* Vehicle type + Seats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <FieldWrapper label="Vehicle Type" icon={<Car size={14} />}>
              <select
                name="vehicleType"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="booking-input"
              >
                <option value="">Any vehicle type</option>
                {VEHICLE_TYPES.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </FieldWrapper>

            <div>
              <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-subtle mb-3">
                <CarSeatsIcon size={16} className="text-ink-subtle" />
                Seats
              </label>
              <div className="flex flex-wrap gap-2">
                {SEAT_OPTIONS.map((opt) => (
                  <PillButton
                    key={opt.value}
                    active={seats === opt.value}
                    pressed={seats === opt.value}
                    onClick={() => setSeats(opt.value)}
                  >
                    {opt.label}
                  </PillButton>
                ))}
              </div>
              <input type="hidden" name="seats" value={seats} />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-subtle">
                <Tag size={14} className="text-ink-subtle" />
                Price Range (per day)
              </label>
              <span className="text-[11px] font-semibold text-ink tabular-nums">
                KES {priceRange[0].toLocaleString('en-KE')} –{' '}
                {priceRange[1].toLocaleString('en-KE')}
              </span>
            </div>

            <div className="px-1 pt-3">
              <Range
                values={priceRange}
                step={PRICE_STEP}
                min={PRICE_RANGE.min}
                max={PRICE_RANGE.max}
                onChange={(values) =>
                  setPriceRange([values[0], values[1]])
                }
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    className="price-range-track"
                    style={props.style}
                  >
                    <div
                      className="price-range-track-active"
                      style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: `${rangeLeftPct}%`,
                        right: `${rangeRightPct}%`,
                      }}
                    />
                    {children}
                  </div>
                )}
                renderThumb={({ props, index }) => {
                  const { key, ...rest } = props;
                  return (
                    <div
                      key={key}
                      {...rest}
                      className="price-range-thumb"
                      aria-label={
                        index === 0
                          ? 'Minimum daily price'
                          : 'Maximum daily price'
                      }
                    />
                  );
                }}
              />
            </div>

            <input type="hidden" name="minPrice" value={priceRange[0]} />
            <input type="hidden" name="maxPrice" value={priceRange[1]} />
          </div>
        </div>
      )}

      {/* ── Hidden fields for the server action ── */}
      <input type="hidden" name="pickupFee" value={pickupFee} />
      <input type="hidden" name="returnFee" value={returnFee} />
      <input type="hidden" name="needsQuote" value={String(needsQuote)} />
      <input type="hidden" name="totalFees" value={totalFees} />
    </>
  );
}
