'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Check, AlertCircle, Sparkles } from 'lucide-react';
import { submitContact, type ContactState } from '../../app/actions/contact';
import { SERVICE_OPTIONS } from '../../lib/contact';
import { VEHICLES } from '../../lib/vehicles';

const initialState: ContactState = {};

export function ContactForm() {
  const [state, formAction] = useFormState(submitContact, initialState);
  const searchParams = useSearchParams();
  const preselectedVehicle = searchParams.get('vehicle') || '';
  const preselectedVehicleName =
    VEHICLES.find((v) => v.id === preselectedVehicle)?.name || '';

  /* ── SUCCESS STATE ── */
  if (state.success) {
    return (
      <div className="bg-porcelain border border-charcoal-300/30 rounded-sm overflow-hidden">
        {/* Gold top accent */}
        <div className="h-1 bg-gradient-to-r from-accent-500 via-accent-600 to-accent-500" />

        <div className="p-8 lg:p-14">
          <div className="w-16 h-16 rounded-full bg-accent-50 border border-accent-500/40 flex items-center justify-center mb-8">
            <Check size={28} className="text-accent-600" />
          </div>

          <p className="type-caption text-accent-600 mb-3">
            Enquiry Received
          </p>
          <h3 className="font-display text-4xl lg:text-5xl text-primary-900 mb-6 leading-tight">
            Thank You
          </h3>
          <p className="text-charcoal-700 leading-relaxed mb-8 max-w-lg text-base">
            {state.message}
          </p>

          <div className="pt-6 border-t border-charcoal-300/30">
            <p className="text-[10px] uppercase tracking-widest text-charcoal-500 mb-3">
              Need us sooner?
            </p>
            <a
              href="tel:+254780957810"
              className="inline-flex items-center gap-2 font-display text-2xl text-primary-900 hover:text-accent-600 transition-colors"
            >
              +254 780 957 810
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* ── FORM STATE ── */
  return (
    <div className="bg-porcelain border border-charcoal-300/30 rounded-sm overflow-hidden shadow-sm">
      {/* Gold top accent bar */}
      <div className="h-1 bg-gradient-to-r from-accent-500 via-accent-600 to-accent-500" />

      {/* Header */}
      <div className="px-6 lg:px-12 pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-charcoal-300/20">
        <p className="type-caption text-accent-600 mb-3">
          Send Us a Message
        </p>
        <h3 className="font-display text-3xl lg:text-4xl text-primary-900 leading-tight mb-4">
          How Can We Help?
        </h3>
        <p className="text-sm text-charcoal-500 max-w-md leading-relaxed">
          Tell us your dates, vehicle preference, and any special requests.
          We respond within 2 hours during business hours.
        </p>
      </div>

      {/* Preselected vehicle banner */}
      {preselectedVehicleName && (
        <div className="px-6 lg:px-12 pt-8">
          <div className="flex items-start gap-3 px-4 py-3 bg-accent-50 border border-accent-500/30 rounded-sm">
            <Sparkles size={16} className="text-accent-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-accent-700 mb-1">
                Vehicle of Interest
              </p>
              <p className="text-primary-900 font-medium text-sm">
                {preselectedVehicleName}
              </p>
            </div>
            <input
              type="hidden"
              name="vehicle"
              value={preselectedVehicleName}
            />
          </div>
        </div>
      )}

      {/* Form body */}
      <form action={formAction} className="p-6 lg:p-12">
        {/* Error banner */}
        {state.message && !state.success && (
          <div className="mb-6 flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-300 rounded-sm text-sm text-red-700">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p>{state.message}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Name + Phone side by side on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LightField
              label="Full Name"
              name="name"
              placeholder="e.g. John Kamau"
              required
              error={state.errors?.name?.[0]}
              defaultValue={state.fields?.name}
            />
            <LightField
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+254 7XX XXX XXX"
              required
              error={state.errors?.phone?.[0]}
              defaultValue={state.fields?.phone}
            />
          </div>

          {/* Email */}
          <LightField
            label="Email (Optional)"
            name="email"
            type="email"
            placeholder="you@example.com"
            error={state.errors?.email?.[0]}
            defaultValue={state.fields?.email}
          />

          {/* Service */}
          <div>
            <LightLabel label="Service Required" required />
            <select
              name="service"
              required
              defaultValue={state.fields?.service ?? ''}
              className="booking-input"
            >
              <option value="" disabled>
                Select a service
              </option>
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {state.errors?.service?.[0] && (
              <p className="mt-1.5 text-[11px] text-red-600">
                {state.errors.service[0]}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <LightLabel label="Your Message" required />
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell us about your dates, pickup location, and any specific requirements..."
              defaultValue={state.fields?.message ?? ''}
              className="booking-input !h-auto py-3 resize-none"
            />
            {state.errors?.message?.[0] && (
              <p className="mt-1.5 text-[11px] text-red-600">
                {state.errors.message[0]}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <SubmitButton />
          </div>

          {/* Privacy line */}
          <p className="text-[11px] text-charcoal-500 leading-relaxed">
            By submitting this form you agree to be contacted by Royride Car
            Hire regarding your enquiry. We never share your details.
          </p>
        </div>
      </form>

      {/* Trust strip */}
      <div className="border-t border-charcoal-300/20 px-6 lg:px-12 py-5 bg-porcelain">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-widest text-charcoal-500">
          <span className="flex items-center gap-1.5">
            <span className="text-accent-500">✓</span>
            Response within 2 hours
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-accent-500">✓</span>
            No payment required
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-accent-500">✓</span>
            Your details stay private
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
function LightField({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  error,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <LightLabel label={label} required={required} htmlFor={name} />
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        className="booking-input"
      />
      {error && <p className="mt-1.5 text-[11px] text-red-600">{error}</p>}
    </div>
  );
}

function LightLabel({
  label,
  required,
  htmlFor,
}: {
  label: string;
  required?: boolean;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-charcoal-500 mb-3 font-medium"
    >
      {label}
      {required && <span className="text-accent-600">*</span>}
    </label>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-accent-500 text-primary-900 text-xs font-bold uppercase tracking-[0.15em] rounded-sm transition-all duration-300 hover:bg-accent-600 hover:text-porcelain hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-primary-900/30 border-t-primary-900 rounded-full animate-spin" />
          Sending…
        </>
      ) : (
        <>
          Send Enquiry
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </>
      )}
    </button>
  );
}