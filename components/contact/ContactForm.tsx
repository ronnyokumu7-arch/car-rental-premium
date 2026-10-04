'use client';

import { useState, useMemo } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  Check,
  AlertCircle,
  Sparkles,
  Phone,
} from 'lucide-react';
import { submitContact, type ContactState } from '../../app/actions/contact';
import { SERVICE_OPTIONS } from '../../lib/contact';
import { VEHICLES } from '../../lib/vehicles';
import { BRAND } from '../../lib/constants';
import { Select, type SelectOption } from '../ui/Select';

const initialState: ContactState = {};

/* ─────────────────────────────────────────────────────────────
   CONTACT FORM
   Primary enquiry surface. Handles three input modes:

     1. Blank       — user arrives at /contact directly
     2. ?vehicle=X  — user clicked "Reserve" on a vehicle
     3. ?service=Y  — user clicked a service CTA (chauffeured,
                      airport transfer, etc.)

   Query params pre-fill the corresponding field. Never
   auto-submit — always let the user review.

   Contracts:
     • Server action: submitContact (app/actions/contact.ts)
     • Service field is controlled (needed for the custom Select)
     • Success state replaces the entire form (no dialog)
   ───────────────────────────────────────────────────────────── */

export function ContactForm() {
  const [state, formAction] = useFormState(submitContact, initialState);
  const searchParams = useSearchParams();

  /* ── Query params ── */
  const vehicleParam = searchParams.get('vehicle') || '';
  const serviceParam = searchParams.get('service') || '';

  /* ── Resolve vehicle name ── */
  const preselectedVehicleName = useMemo(
    () => VEHICLES.find((v) => v.id === vehicleParam)?.name || '',
    [vehicleParam]
  );

  /* ── Normalize service param → must match SERVICE_OPTIONS ── */
  const normalizedService = useMemo(() => {
    if (!serviceParam) return '';
    const needle = serviceParam.toLowerCase();
    return (
      SERVICE_OPTIONS.find((opt) => opt.toLowerCase() === needle) ??
      SERVICE_OPTIONS.find((opt) =>
        opt.toLowerCase().includes(needle.split('+').join(' '))
      ) ??
      ''
    );
  }, [serviceParam]);

  /* ── Controlled service field ──
     Priority: server-returned value → query param → empty */
  const [service, setService] = useState<string>(
    state.fields?.service || normalizedService || ''
  );

  /* ── Service options for the Select ── */
  const serviceOptions: SelectOption[] = useMemo(
    () =>
      SERVICE_OPTIONS.map((opt) => ({
        value: opt,
        label: opt,
      })),
    []
  );

  /* ── Success state ── */
  if (state.success) {
    return (
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-[0_12px_32px_rgba(14,14,16,0.08)]">
        <div className="h-1 bg-gradient-to-r from-copper-500 via-copper-400 to-copper-500" />

        <div className="p-8 lg:p-14">
          <div className="w-16 h-16 rounded-full bg-copper-500/[0.10] border border-copper-500/30 flex items-center justify-center mb-8">
            <Check size={28} strokeWidth={2.5} className="text-copper-600" />
          </div>

          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-600 mb-3">
            Enquiry Received
          </p>

          <h3 className="font-display text-3xl lg:text-4xl text-ink mb-6 leading-[1.1] tracking-[-0.015em]">
            Thank you.
          </h3>

          <p className="text-ink-muted leading-relaxed mb-8 max-w-lg text-base font-light">
            {state.message}
          </p>

          <div className="pt-6 border-t border-border">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ink-subtle mb-4">
              Need us sooner?
            </p>
            <a
              href={`tel:${BRAND.phones[0].replace(/\s/g, '')}`}
              className="group inline-flex items-center gap-3 font-display text-2xl text-ink hover:text-copper-600 transition-colors duration-300"
            >
              <Phone size={18} className="text-copper-500" />
              <span className="tabular-nums">{BRAND.phones[0]}</span>
              <ArrowRight
                size={16}
                className="text-ink-subtle transition-transform duration-300 ease-lux group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* ── Form state ── */
  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-[0_12px_32px_rgba(14,14,16,0.08)]">

      {/* Copper accent bar */}
      <div className="h-1 bg-gradient-to-r from-copper-500 via-copper-400 to-copper-500" />

      {/* Header */}
      <div className="px-6 lg:px-12 pt-10 lg:pt-12 pb-8 border-b border-border">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-600 mb-4">
          Send Us a Message
        </p>
        <h3 className="font-display text-3xl lg:text-4xl text-ink leading-[1.1] tracking-[-0.015em] mb-4">
          How can we help?
        </h3>
        <p className="text-sm text-ink-muted max-w-md leading-relaxed font-light">
          Tell us your dates, vehicle preference, and any special requests.
          We respond within 2 hours during business hours.
        </p>
      </div>

      {/* ── Preselected context banner ── */}
      {(preselectedVehicleName || normalizedService) && (
        <div className="px-6 lg:px-12 pt-8">
          <div className="flex items-start gap-3 px-4 py-4 bg-copper-500/[0.06] border border-copper-500/25 rounded-lg">
            <Sparkles
              size={16}
              strokeWidth={2.5}
              className="text-copper-600 mt-0.5 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-copper-700 mb-1">
                {preselectedVehicleName
                  ? 'Vehicle of Interest'
                  : 'Service of Interest'}
              </p>
              <p className="text-ink font-medium text-sm">
                {preselectedVehicleName || normalizedService}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Hidden field: submit resolved vehicle ── */}
      {preselectedVehicleName && (
        <input
          type="hidden"
          name="vehicle"
          value={preselectedVehicleName}
        />
      )}

      {/* ── Form body ── */}
      <form action={formAction} className="p-6 lg:p-12">
        {/* Error banner */}
        {state.message && !state.success && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 px-4 py-3 bg-danger-soft border border-danger/30 rounded-lg text-sm text-danger"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p>{state.message}</p>
          </div>
        )}

        <div className="space-y-6">

          {/* Name + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Full Name"
              name="name"
              placeholder="e.g. John Kamau"
              required
              error={state.errors?.name?.[0]}
              defaultValue={state.fields?.name}
              autoComplete="name"
            />
            <FormField
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+254 7XX XXX XXX"
              required
              error={state.errors?.phone?.[0]}
              defaultValue={state.fields?.phone}
              autoComplete="tel"
            />
          </div>

          {/* Email */}
          <FormField
            label="Email (Optional)"
            name="email"
            type="email"
            placeholder="you@example.com"
            error={state.errors?.email?.[0]}
            defaultValue={state.fields?.email}
            autoComplete="email"
          />

          {/* Service — now a controlled Select */}
          <div>
            <FormLabel label="Service Required" required htmlFor="service" />
            <Select
              id="service"
              name="service"
              value={service}
              onChange={setService}
              options={serviceOptions}
              placeholder="Select a service"
              sheetTitle="Service required"
              ariaLabel="Select the service you require"
              required
            />
            {state.errors?.service?.[0] && (
              <p className="mt-1.5 text-[11px] text-danger">
                {state.errors.service[0]}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <FormLabel label="Your Message" required htmlFor="message" />
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell us about your dates, pickup location, and any specific requirements..."
              defaultValue={state.fields?.message ?? ''}
              className="booking-input !h-auto py-3 resize-none"
            />
            {state.errors?.message?.[0] && (
              <p className="mt-1.5 text-[11px] text-danger">
                {state.errors.message[0]}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">
            <SubmitButton />
          </div>

          {/* Privacy line */}
          <p className="text-[11px] text-ink-subtle leading-relaxed">
            By submitting this form you agree to be contacted by{' '}
            {BRAND.fullName} regarding your enquiry. We never share your
            details.
          </p>
        </div>
      </form>

      {/* ── Trust strip ── */}
      <div className="border-t border-border px-6 lg:px-12 py-5 bg-surface-sunken">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-subtle">
          <span className="flex items-center gap-1.5">
            <Check size={11} strokeWidth={3} className="text-copper-500" />
            Response within 2 hours
          </span>
          <span className="flex items-center gap-1.5">
            <Check size={11} strokeWidth={3} className="text-copper-500" />
            No payment required
          </span>
          <span className="flex items-center gap-1.5">
            <Check size={11} strokeWidth={3} className="text-copper-500" />
            Your details stay private
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FORM FIELD
   ───────────────────────────────────────────────────────────── */
function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  error,
  defaultValue,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  defaultValue?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <FormLabel label={label} required={required} htmlFor={name} />
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        className="booking-input"
      />
      {error && <p className="mt-1.5 text-[11px] text-danger">{error}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FORM LABEL
   ───────────────────────────────────────────────────────────── */
function FormLabel({
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
      className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-subtle mb-3"
    >
      {label}
      {required && <span className="text-copper-600">*</span>}
    </label>
  );
}

/* ─────────────────────────────────────────────────────────────
   SUBMIT BUTTON
   ───────────────────────────────────────────────────────────── */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative w-full inline-flex items-center justify-center gap-3 px-8 py-5 text-xs font-semibold uppercase tracking-[0.16em] text-obsidian-950 rounded-lg overflow-hidden transition-all duration-300 ease-lux hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      style={{
        backgroundImage:
          'linear-gradient(135deg, #E3A468 0%, #D98A44 45%, #C2702E 100%)',
        boxShadow:
          '0 1px 2px rgba(168,90,34,0.20), 0 8px 24px rgba(194,112,46,0.28)',
      }}
    >
      {pending ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-obsidian-950/30 border-t-obsidian-950 rounded-full animate-spin" />
          <span className="relative z-10">Sending…</span>
        </>
      ) : (
        <>
          <span className="relative z-10">Send Enquiry</span>
          <ArrowRight
            size={16}
            strokeWidth={2.5}
            className="relative z-10 transition-transform duration-300 ease-lux group-hover:translate-x-1"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-lux"
            style={{
              background:
                'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
            }}
          />
        </>
      )}
    </button>
  );
}
