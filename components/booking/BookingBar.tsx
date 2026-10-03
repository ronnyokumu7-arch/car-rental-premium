'use client';

import { useState, useMemo } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Range } from 'react-range';
import {
  MapPin,
  Calendar,
  Car,
  ArrowRight,
  Check,
  SlidersHorizontal,
  Tag,
  Fuel,
  ShieldCheck,
  Plane,
  Clock,
} from 'lucide-react';
import { submitBooking, type BookingState } from '../../app/actions/booking';
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

  const returnOptions = useMemo(
    () => buildReturnOptions(pickupLocation),
    [pickupLocation]
  );

  const pickupFee = getPickupFee(pickupLocation);
  const returnFee = getReturnFee(returnLocation, pickupLocation);
  const needsQuote = requiresQuote(pickupLocation, returnLocation);
  const totalFees = pickupFee + returnFee;

  const bodyTypes = [
    { label: 'Any', value: '' },
    { label: 'SUV', value: 'SUV' },
    { label: 'Crossover', value: 'Crossover' },
    { label: 'Van', value: 'Van' },
    { label: 'Sedan', value: 'Sedan' },
  ];

  const fuelTypes = [
    { label: 'Any', value: '' },
    { label: 'Petrol', value: 'Petrol' },
    { label: 'Diesel', value: 'Diesel' },
    { label: 'Hybrid', value: 'Hybrid' },
    { label: 'Electric', value: 'Electric' },
  ];

  return (
    <section
      id="booking-widget"
      className="relative z-20 -mt-24 lg:-mt-28 mb-16 lg:mb-24 px-6 lg:px-8 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
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

        <form
          action={formAction}
          className="bg-porcelain shadow-2xl rounded-sm overflow-hidden"
        >
          {/* ── Tabs ── */}
          <div className="border-b border-charcoal-300/30 px-4 sm:px-6 lg:px-10">
            <div className="flex items-stretch -mb-px overflow-x-auto scrollbar-hide">
              <button
                type="button"
                onClick={() => setActiveTab('search')}
                className={`booking-tab ${
                  activeTab === 'search' ? 'booking-tab-active' : ''
                }`}
              >
                <SlidersHorizontal size={14} />
                <span>Car Search</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('body')}
                className={`booking-tab ${
                  activeTab === 'body' ? 'booking-tab-active' : ''
                }`}
              >
                <Car size={14} />
                <span>Body Types</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('fuel')}
                className={`booking-tab ${
                  activeTab === 'fuel' ? 'booking-tab-active' : ''
                }`}
              >
                <Fuel size={14} />
                <span>Fuel Types</span>
              </button>
            </div>
          </div>

          {/* ── Card body ── */}
          <div className="px-6 lg:px-10 py-6 lg:py-8">
            {activeTab === 'search' && (
              <>
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
                    subLabel={getReturnFeeLabel(
                      returnLocation,
                      pickupLocation
                    )}
                    name="returnLocation"
                    value={returnLocation}
                    onChange={setReturnLocation}
                    options={returnOptions}
                  />
                </div>

                {/* Dates + Vehicle type */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 mb-5">
                  <FieldWrapper label="Pickup Date" icon={<Calendar size={14} />}>
                    <input
                      name="pickupDate"
                      type="date"
                      min={today}
                      className="booking-input"
                      required
                    />
                  </FieldWrapper>

                  <FieldWrapper label="Return Date" icon={<Calendar size={14} />}>
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

                {/* Seats + Price */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-charcoal-500 mb-3">
                      <CarSeatsIcon size={16} className="text-charcoal-400" />
                      Seats
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SEAT_OPTIONS.map((opt) => {
                        const isActive = seats === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setSeats(opt.value)}
                            aria-pressed={isActive}
                            className={`
                              inline-flex items-center justify-center
                              min-w-[48px] h-[46px] px-4
                              text-sm font-medium
                              rounded-sm
                              border
                              transition-colors duration-200
                              focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2
                              ${
                                isActive
                                  ? 'bg-primary-900 border-primary-900 text-porcelain'
                                  : 'bg-white border-charcoal-300/50 text-charcoal-700 hover:border-primary-900/50 hover:text-primary-900'
                              }
                            `}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                    <input type="hidden" name="seats" value={seats} />
                  </div>

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
                    <input type="hidden" name="minPrice" value={priceRange[0]} />
                    <input type="hidden" name="maxPrice" value={priceRange[1]} />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'body' && (
              <div className="py-4">
                <p className="text-[11px] font-medium uppercase tracking-wider text-charcoal-500 mb-4">
                  Choose a body type
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {bodyTypes.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        const select = document.querySelector(
                          'select[name="vehicleType"]'
                        ) as HTMLSelectElement | null;
                        if (select) select.value = opt.value;
                        setActiveTab('search');
                      }}
                      className={`
                        inline-flex items-center justify-center
                        h-[46px] px-3
                        text-[13px] sm:text-sm font-medium
                        rounded-sm
                        border
                        transition-colors duration-200
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2
                        bg-white border-charcoal-300/50 text-charcoal-700 hover:border-primary-900/50 hover:text-primary-900
                      `}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'fuel' && (
              <div className="py-4">
                <p className="text-[11px] font-medium uppercase tracking-wider text-charcoal-500 mb-4">
                  Choose a fuel type
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {fuelTypes.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setActiveTab('search')}
                      className={`
                        inline-flex items-center justify-center
                        h-[46px] px-3
                        text-[13px] sm:text-sm font-medium
                        rounded-sm
                        border
                        transition-colors duration-200
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2
                        bg-white border-charcoal-300/50 text-charcoal-700 hover:border-primary-900/50 hover:text-primary-900
                      `}
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

            <SubmitButton />
          </div>
        </form>

        {/* ── Premium trust strip ── */}
        <TrustStrip />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Custom dual-car-seat icon (side profile)                    */
/* ─────────────────────────────────────────────────────────── */
function CarSeatsIcon({
  size = 16,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Front seat — side profile */}
      <path d="M5.5 18.5c-.8 0-1.5-.7-1.5-1.5 0-.6.3-1.1.8-1.4L6 14.5V6c0-1.1.9-2 2-2s2 .9 2 2v6.5l-.5 1.5" />
      <path d="M5.5 18.5H8" />
      <path d="M10 12.5c.8.3 1.5 1 1.5 2s-.7 1.7-1.5 2" />

      {/* Rear seat — side profile */}
      <path d="M14.5 18.5c-.8 0-1.5-.7-1.5-1.5 0-.6.3-1.1.8-1.4L15 14.5V6c0-1.1.9-2 2-2s2 .9 2 2v6.5l-.5 1.5" />
      <path d="M14.5 18.5H17" />
      <path d="M19 12.5c.8.3 1.5 1 1.5 2s-.7 1.7-1.5 2" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Location select with smart label + subtext                  */
/* ─────────────────────────────────────────────────────────── */
function LocationField({
  label,
  subLabel,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  subLabel: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; fee: number }[];
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-charcoal-500 mb-2">
        <MapPin size={14} className="text-charcoal-400" />
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="booking-input"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
            {opt.fee > 0 && !opt.label.includes('KES')
              ? ` (+ KES ${opt.fee.toLocaleString('en-KE')})`
              : ''}
          </option>
        ))}
      </select>
      <p className="mt-1.5 text-[10px] uppercase tracking-widest text-charcoal-500">
        {subLabel}
      </p>
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

/* ─────────────────────────────────────────────────────────── */
/* Trust strip — carousel on mobile, grid on desktop           */
/* ─────────────────────────────────────────────────────────── */
function TrustStrip() {
  const items = [
    {
      icon: <ShieldCheck size={18} />,
      title: 'Fully Insured',
      description: 'All vehicles comprehensively covered',
    },
    {
      icon: <Plane size={18} />,
      title: 'Airport Delivery',
      description: 'Free drop-off and pickup at JKIA',
    },
    {
      icon: <Clock size={18} />,
      title: 'Free Cancellation',
      description: 'Up to 24 hours before pickup',
    },
  ];

  return (
    <div
      className="
        mt-6
        flex sm:grid sm:grid-cols-3 gap-4
        overflow-x-auto sm:overflow-visible
        snap-x snap-mandatory sm:snap-none
        -mx-6 sm:mx-0
        px-6 sm:px-0
        pb-2 sm:pb-0
        scrollbar-hide
      "
    >
      {items.map((item) => (
        <div
          key={item.title}
          className="
            snap-start shrink-0
            w-[85%] sm:w-auto
            flex items-start gap-3 p-4 sm:p-5
            bg-porcelain border border-charcoal-300/30 rounded-sm
          "
        >
          <div className="w-10 h-10 rounded-full bg-accent-500/10 border border-accent-500/30 flex items-center justify-center shrink-0 text-accent-600">
            {item.icon}
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary-900 mb-1">
              {item.title}
            </p>
            <p className="text-xs text-charcoal-500 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
