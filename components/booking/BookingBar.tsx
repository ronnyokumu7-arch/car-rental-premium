'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Calendar, Clock, MapPin, Car, ArrowRight, Check } from 'lucide-react';
import { submitBooking, type BookingState } from '../../app/actions/booking';

const initialState: BookingState = {};

const VEHICLE_TYPES = [
  { value: '', label: 'Vehicle Type' },
  { value: 'Sedan', label: 'Executive Sedan' },
  { value: 'SUV', label: 'Luxury SUV' },
  { value: 'Van', label: 'Chauffeur Van' },
  { value: 'Sports', label: 'Sports Car' },
  { value: 'Economy', label: 'Economy' },
];

export function BookingBar() {
  const [state, formAction] = useFormState(submitBooking, initialState);

  const today = new Date().toISOString().split('T')[0];

  return (
    <section className="relative z-20 -mt-24 lg:-mt-28 mb-16 lg:mb-24 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Success / Error Banner */}
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

        {/* Main Card */}
        <form
          action={formAction}
          className="bg-porcelain shadow-2xl rounded-sm overflow-hidden"
        >
          <div className="px-6 lg:px-10 py-6 lg:py-8">
            {/* Card header */}
            <div className="flex items-center justify-between mb-6 pb-5 border-b border-charcoal-300/30">
              <div>
                <p className="type-caption text-accent-600 mb-1">
                  Reserve Your Vehicle
                </p>
                <h2 className="type-h3 text-primary-900">
                  Check Availability
                </h2>
              </div>
              <p className="hidden md:block type-small text-charcoal-500 max-w-xs text-right">
                Confirmation within 2 hours. No payment required to reserve.
              </p>
            </div>

            {/* Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-3">
              {/* Pickup Location */}
              <FieldWrapper
                label="Pickup Location"
                icon={<MapPin size={14} />}
                className="lg:col-span-3"
                error={state.errors?.pickupLocation?.[0]}
              >
                <input
                  name="pickupLocation"
                  type="text"
                  placeholder="Nairobi, JKIA, or custom"
                  defaultValue={state.fields?.pickupLocation ?? ''}
                  className="booking-input"
                  required
                />
              </FieldWrapper>

              {/* Pickup Date */}
              <FieldWrapper
                label="Pickup Date"
                icon={<Calendar size={14} />}
                className="lg:col-span-2"
                error={state.errors?.pickupDate?.[0]}
              >
                <input
                  name="pickupDate"
                  type="date"
                  min={today}
                  defaultValue={state.fields?.pickupDate ?? ''}
                  className="booking-input"
                  required
                />
              </FieldWrapper>

              {/* Pickup Time */}
              <FieldWrapper
                label="Time"
                icon={<Clock size={14} />}
                className="lg:col-span-1"
                error={state.errors?.pickupTime?.[0]}
              >
                <input
                  name="pickupTime"
                  type="time"
                  defaultValue={state.fields?.pickupTime ?? '09:00'}
                  className="booking-input"
                  required
                />
              </FieldWrapper>

              {/* Dropoff Date */}
              <FieldWrapper
                label="Dropoff Date"
                icon={<Calendar size={14} />}
                className="lg:col-span-2"
                error={state.errors?.dropoffDate?.[0]}
              >
                <input
                  name="dropoffDate"
                  type="date"
                  min={today}
                  defaultValue={state.fields?.dropoffDate ?? ''}
                  className="booking-input"
                  required
                />
              </FieldWrapper>

              {/* Dropoff Time */}
              <FieldWrapper
                label="Time"
                icon={<Clock size={14} />}
                className="lg:col-span-1"
                error={state.errors?.dropoffTime?.[0]}
              >
                <input
                  name="dropoffTime"
                  type="time"
                  defaultValue={state.fields?.dropoffTime ?? '09:00'}
                  className="booking-input"
                  required
                />
              </FieldWrapper>

              {/* Vehicle Type */}
              <FieldWrapper
                label="Vehicle Type"
                icon={<Car size={14} />}
                className="lg:col-span-2"
                error={state.errors?.vehicleType?.[0]}
              >
                <select
                  name="vehicleType"
                  defaultValue={state.fields?.vehicleType ?? ''}
                  className="booking-input"
                  required
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

              {/* Submit */}
              <div className="lg:col-span-1 flex items-end">
                <SubmitButton />
              </div>
            </div>
          </div>

          {/* Card footer strip */}
          <div className="bg-primary-900/5 border-t border-charcoal-300/20 px-6 lg:px-10 py-3 flex flex-wrap items-center gap-x-6 gap-y-1">
            <p className="type-caption text-charcoal-500">
              ✓ Free cancellation
            </p>
            <p className="type-caption text-charcoal-500">
              ✓ Airport delivery included
            </p>
            <p className="type-caption text-charcoal-500">
              ✓ All vehicles fully insured
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Submit button — must be a child of <form> to use useFormStatus */
/* ─────────────────────────────────────────────────────────── */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-label="Check availability"
      className="w-full h-[46px] flex items-center justify-center bg-primary-900 text-porcelain rounded-sm transition-all duration-300 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? (
        <span className="inline-block w-4 h-4 border-2 border-porcelain/30 border-t-porcelain rounded-full animate-spin" />
      ) : (
        <ArrowRight size={18} />
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Small helper for consistent field labels + icons            */
/* ─────────────────────────────────────────────────────────── */
function FieldWrapper({
  label,
  icon,
  error,
  className = '',
  children,
}: {
  label: string;
  icon: React.ReactNode;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-charcoal-500 mb-2">
        <span className="text-charcoal-400">{icon}</span>
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-[11px] text-red-600">{error}</p>}
    </div>
  );
}