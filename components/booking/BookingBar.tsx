'use client';

import { useState, useMemo } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Range } from 'react-range';
import {
  MapPin,
  Calendar,
  Car,
  Users,
  ArrowRight,
  Check,
  SlidersHorizontal,
  Tag,
} from 'lucide-react';
import { submitBooking, type BookingState } from '../../app/actions/booking';
import {
  LOCATIONS,
  RETURN_OPTIONS,
  DEFAULT_PICKUP_LOCATION,
  DEFAULT_RETURN_LOCATION,
  getPickupFee,
  getReturnFee,
  formatFee,
  requiresQuote,
} from '../../lib/locations';

const initialState: BookingState = {};

const VEHICLE_TYPES = [
  { value: '', label: 'Any vehicle type' },
  { value: 'Sedan', label: 'Executive Sedan' },
  { value: 'SUV', label: 'Luxury SUV' },
  { value: 'Crossover', label: 'Crossover' },
  { value: 'Van', label: 'Van' },
  { value: 'Sports', label: 'Sports Car' },
  { value: 'Economy', label: 'Economy' },
];

const SEAT_OPTIONS = [
  { value: 'any', label: 'Any' },
  { value: '5', label: '5' },
  { value: '7', label: '7' },
  { value: '8', label: '8+' },
];

const PRICE_MIN = 3500;
const PRICE_MAX = 55000;
const PRICE_STEP = 500;

type Tab = 'search' | 'body' | 'fuel';

export function BookingBar() {
  const [state, formAction] = useFormState(submitBooking, initialState);

  const [activeTab, setActiveTab] = useState<Tab>('search');
  const [pickupLocation, setPickupLocation] = useState(DEFAULT_PICKUP_LOCATION);
  const [returnLocation, setReturnLocation] = useState(DEFAULT_RETURN_LOCATION);
  const [seats, setSeats] = useState('any');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    PRICE_MIN,
    PRICE_MAX,
  ]);

  const today = new Date().toISOString().split('T')[0];

  const pickupFee = getPickupFee(pickupLocation);
  const returnFee = getReturnFee(returnLocation, pickupLocation);
  const needsQuote = requiresQuote(pickupLocation, returnLocation);
  const totalFees = pickupFee + returnFee;

  // Body-type tab quick filter maps to vehicle types
  const bodyTypes = useMemo(
    () => [
      { label: 'Any', value: '' },
      { label: 'SUV', value: 'SUV' },
      { label: 'Crossover', value: 'Crossover' },
      { label: 'Van', value: 'Van' },
      { label: 'Sedan', value: 'Sedan' },
    ],
    []
  );

  const fuelTypes = useMemo(
    () => [
      { label: 'Any', value: '' },
      { label: 'Petrol', value: 'Petrol' },
      { label: 'Diesel', value: 'Diesel' },
      { label: 'Hybrid', value: 'Hybrid' },
      { label: 'Electric', value: 'Electric' },
    ],
    []
  );

  return (
    <section
      id="booking-widget"
      className="relative z-20 -mt-24 lg:-mt-28 mb-16 lg:mb-24 px-6 lg:px-8 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* Success / Error banner */}
        {(state.success || state.message) && (
          <div
            className={`mb-4 px-6 py-4 rounded-sm text-sm flex items-start gap-3 ${
              state.success
                ? 'bg-accent-50 border border-accent-500/30 text-accent-700'
                : 'bg-red-50 border border-red-300 text-red-700'
            }`}
          >
            {state.success && <Check size={18} className="mt-0.5 shrink-0" />}
            <p>{state.message}</p>
          </div>
        )}

        {/* Main card */}
        <form
          action={formAction}
          className="bg-porcelain shadow-2xl rounded-sm overflow-hidden"
        >
          {/* ── Tabs ── */}
          <div className="border-b border-charcoal-300/30 px-6 lg:px-10">
            <div className="flex items-center gap-1 -mb-px">
              <button
                type="button"
                onClick={() => setActiveTab('search')}
                className={`booking-tab flex items-center gap-2 ${
                  activeTab === 'search' ? 'booking-tab-active' : ''
                }`}
              >
                <SlidersHorizontal size={14} />
                Car Search
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('body')}
                className={`booking-tab flex items-center gap-2 ${
                  activeTab === 'body' ? 'booking-tab-active' : ''
                }`}
              >
                <Car size={14} />
                Body Types
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('fuel')}
                className={`booking-tab flex items-center gap-2 ${
                  activeTab === 'fuel' ? 'booking-tab-active' : ''
                }`}
              >
                <Tag size={14} />
                Fuel Types
              </button>
            </div>
          </div>

          {/* ── Card body ── */}
          <div className="px-6 lg:px-10 py-6 lg:py-8">
            {/* Tab: Car Search (main form) */}
            {activeTab === 'search' && (
              <>
                {/* Pickup + Return locations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mb-5">
                  <LocationField
                    label="Pickup Location"
                    value={pickupLocation}
                    onChange={setPickupLocation}
                    options={LOCATIONS}
                    fee={pickupFee}
                    showFee
                  />
                  <LocationField
                    label="Return Location"
                    value={returnLocation}
                    onChange={setReturnLocation}
                    options={RETURN_OPTIONS}
                    fee={returnFee}
                    showFee
                  />
                </div>

                {/* Dates + Vehicle type */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 mb-5">
                  <FieldWrapper
                    label="Pickup Date"
                    icon={<Calendar size={14} />}
                  >
                    <input
                      name="pickupDate"
                      type="date"
                      min={today}
                      className="booking-input"
                      required
                    />
                  </FieldWrapper>

                  <FieldWrapper
                    label="Return Date"
                    icon={<Calendar size={14} />}
                  >
                    <input
                      name="dropoffDate"
                      type="date"
                      min={today}
                      className="booking-input"
                      required
                    />
                  </FieldWrapper>

                  <FieldWrapper label="Vehicle Type" icon={<Car size={14} />}>
                    <select
                      name="vehicleType"
                      className="booking-input"
                      defaultValue=""
                    >
                      {VEHICLE_TYPES.map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                          disabled={opt.value === ''}
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </FieldWrapper>
                </div>

                {/* Seats + Price slider */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Seats */}
                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-charcoal-500 mb-3">
                      <Users size={14} className="text-charcoal-400" />
                      Seats
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SEAT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setSeats(opt.value)}
                          className={`seat-pill ${
                            seats === opt.value ? 'seat-pill-active' : ''
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    <input type="hidden" name="seats" value={seats} />
                  </div>

                  {/* Price range */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-charcoal-500">
                        <Tag size={14} className="text-charcoal-400" />
                        Price Range
                      </label>
                      <span className="text-[11px] font-medium text-primary-900">
                        KES {priceRange[0].toLocaleString('en-KE')} –{' '}
                        {priceRange[1].toLocaleString('en-KE')}
                      </span>
                    </div>
                    <div className="px-1 pt-1">
                      <Range
                        values={priceRange}
                        step={PRICE_STEP}
                        min={PRICE_MIN}
                        max={PRICE_MAX}
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
                                left: `${
                                  ((priceRange[0] - PRICE_MIN) /
                                    (PRICE_MAX - PRICE_MIN)) *
                                  100
                                }%`,
                                right: `${
                                  100 -
                                  ((priceRange[1] - PRICE_MIN) /
                                    (PRICE_MAX - PRICE_MIN)) *
                                    100
                                }%`,
                              }}
                            />
                            {children}
                          </div>
                        )}
                        renderThumb={({ props }) => (
                          <div
                            {...props}
                            className="price-range-thumb"
                            style={props.style}
                          />
                        )}
                      />
                    </div>
                    <input
                      type="hidden"
                      name="minPrice"
                      value={priceRange[0]}
                    />
                    <input
                      type="hidden"
                      name="maxPrice"
                      value={priceRange[1]}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Tab: Body Types */}
            {activeTab === 'body' && (
              <div className="py-4">
                <p className="text-[11px] font-medium uppercase tracking-wider text-charcoal-500 mb-4">
                  Choose a body type
                </p>
                <div className="flex flex-wrap gap-2">
                  {bodyTypes.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        // Set the vehicle type and switch to Search tab
                        const select = document.querySelector(
                          'select[name="vehicleType"]'
                        ) as HTMLSelectElement | null;
                        if (select) select.value = opt.value;
                        setActiveTab('search');
                      }}
                      className="seat-pill !min-w-fit !px-5"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Fuel Types */}
            {activeTab === 'fuel' && (
              <div className="py-4">
                <p className="text-[11px] font-medium uppercase tracking-wider text-charcoal-500 mb-4">
                  Choose a fuel type
                </p>
                <div className="flex flex-wrap gap-2">
                  {fuelTypes.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setActiveTab('search')}
                      className="seat-pill !min-w-fit !px-5"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Footer strip ── */}
          <div className="bg-primary-900/5 border-t border-charcoal-300/20 px-6 lg:px-10 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Running total */}
            <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-charcoal-500">
              <span>Pickup &amp; return</span>
              <span className="text-primary-900 font-semibold text-sm normal-case tracking-normal">
                {needsQuote
                  ? 'Quote on request'
                  : totalFees === 0
                    ? 'Free'
                    : `KES ${totalFees.toLocaleString('en-KE')}`}
              </span>
            </div>

            {/* Submit */}
            <SubmitButton />
          </div>
        </form>

        {/* Trust strip */}
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1">
          <p className="type-caption text-charcoal-500">
            ✓ Free cancellation up to 24h before pickup
          </p>
          <p className="type-caption text-charcoal-500">
            ✓ Airport delivery included
          </p>
          <p className="type-caption text-charcoal-500">
            ✓ All vehicles fully insured
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Location select with fee display                            */
/* ─────────────────────────────────────────────────────────── */
function LocationField({
  label,
  value,
  onChange,
  options,
  fee,
  showFee,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; fee: number }[];
  fee: number;
  showFee?: boolean;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-charcoal-500 mb-2">
        <MapPin size={14} className="text-charcoal-400" />
        {label}
      </label>
      <select
        name={label.toLowerCase().includes('pickup') ? 'pickupLocation' : 'returnLocation'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="booking-input"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
            {opt.fee > 0 ? ` (+ KES ${opt.fee.toLocaleString('en-KE')})` : ''}
          </option>
        ))}
      </select>
      {showFee && (
        <p className="mt-1.5 text-[10px] uppercase tracking-widest text-charcoal-500">
          {fee === -1
            ? 'Delivery fee: quote on request'
            : fee === 0
              ? 'No delivery fee'
              : `Delivery fee: KES ${fee.toLocaleString('en-KE')}`}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Field wrapper                                               */
/* ─────────────────────────────────────────────────────────── */
function FieldWrapper({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-charcoal-500 mb-2">
        <span className="text-charcoal-400">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Submit button                                               */
/* ─────────────────────────────────────────────────────────── */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 px-6 lg:px-8 py-3 bg-primary-900 text-porcelain text-xs font-semibold uppercase tracking-widest rounded-sm transition-all duration-300 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-porcelain/30 border-t-porcelain rounded-full animate-spin" />
          Sending…
        </>
      ) : (
        <>
          Check Availability
          <ArrowRight size={14} />
        </>
      )}
    </button>
  );
}
