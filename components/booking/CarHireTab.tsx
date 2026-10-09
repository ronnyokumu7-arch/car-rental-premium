'use client';

import { useState, useMemo, useEffect } from 'react';
import { Calendar, Car, Tag } from 'lucide-react';
import { Range } from 'react-range';
import {
  DEFAULT_PICKUP_LOCATION,
  DEFAULT_RETURN_LOCATION,
} from '../../lib/locations';
import { getPriceRange } from '../../lib/vehicles';
import { FieldWrapper } from './shared';
import { Select, type SelectOption } from '../ui/Select';

/* ─────────────────────────────────────────────────────────────
   CAR HIRE TAB
   A quick availability check — not a booking form.

   Purpose:
     "Do you have a car for my dates?"
   Not:
     "Let's spec out your booking."

   Fields (visible):
     • Pickup date
     • Return date
     • Vehicle type
     • Price range

   Location defaults are submitted as hidden inputs. The server
   action (submitBooking) requires them, and defaults are valid.
   The customer never sees them.

   Detailed enquiry → /quote
   Detailed fleet filter → /vehicles
   ───────────────────────────────────────────────────────────── */

/* Vehicle type options */
const VEHICLE_TYPE_OPTIONS: SelectOption[] = [
  { value: '',          label: 'Any vehicle type' },
  { value: 'Sedan',     label: 'Sedan' },
  { value: 'SUV',       label: 'SUV' },
  { value: 'Crossover', label: 'Crossover' },
  { value: 'Wagon',     label: 'Wagon' },
  { value: 'Hatchback', label: 'Hatchback' },
  { value: 'Van',       label: 'Van' },
];

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

/* ─────────────────────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────────────────────── */

export function CarHireTab({
  onReadyChange,
}: {
  onReadyChange?: (ready: boolean) => void;
}) {
  /* ── Form state ── */
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    PRICE_RANGE.min,
    PRICE_RANGE.max,
  ]);

  /* Today's date — stable for the session */
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  /* ── Derived readiness ── */
  const days = daysBetween(pickupDate, dropoffDate);
  const ready = Boolean(days);

  /* ── Notify parent ── */
  useEffect(() => {
    onReadyChange?.(ready);
  }, [ready, onReadyChange]);

  /* ── Range track offsets ── */
  const [rangeLeftPct, rangeRightPct] = useMemo(() => {
    const span = PRICE_RANGE.max - PRICE_RANGE.min || 1;
    const left = ((priceRange[0] - PRICE_RANGE.min) / span) * 100;
    const right = 100 - ((priceRange[1] - PRICE_RANGE.min) / span) * 100;
    return [left, right];
  }, [priceRange]);

  return (
    <>
      {/* ═══════════════════════════════════════════
          ROW 1 — Dates + vehicle type
          ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 mb-6">
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

        <FieldWrapper label="Vehicle Type" icon={<Car size={14} />}>
          <Select
            name="vehicleType"
            value={vehicleType}
            onChange={setVehicleType}
            options={VEHICLE_TYPE_OPTIONS}
            sheetTitle="Vehicle type"
            ariaLabel="Choose a vehicle type"
          />
        </FieldWrapper>
      </div>

      {/* ═══════════════════════════════════════════
          ROW 2 — Price range
          ═══════════════════════════════════════════ */}
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

        <div className="px-1 pt-2">
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

      {/* ═══════════════════════════════════════════
          HIDDEN FIELDS
          Location defaults required by submitBooking.
          The user never sees or thinks about these.
          ═══════════════════════════════════════════ */}
      <input
        type="hidden"
        name="pickupLocation"
        value={DEFAULT_PICKUP_LOCATION}
      />
      <input
        type="hidden"
        name="returnLocation"
        value={DEFAULT_RETURN_LOCATION}
      />
      <input type="hidden" name="seats" value="any" />
    </>
  );
}
