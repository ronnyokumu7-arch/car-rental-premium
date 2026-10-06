'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { sendQuote, type SendQuoteState } from '../../app/actions/sendQuote';
import {
  buildQuoteBreakdown,
  isContactReady,
  type QuoteService,
  type QuoteDeliveryMethod,
  type QuoteRequest,
  type QuoteContact,
  type Quote,
} from '../../lib/quote';
import {
  DEFAULT_PICKUP_LOCATION,
  DEFAULT_RETURN_LOCATION,
} from '../../lib/locations';
import { QuoteSummaryPanel } from './QuoteSummaryPanel';
import { StepService } from './StepService';
import { StepDetails } from './StepDetails';
import { StepVehicle } from './StepVehicle';
import { StepContact } from './StepContact';
import { StepReview } from './StepReview';

/* ─────────────────────────────────────────────────────────────
   QUOTE WIZARD
   The entire /quote flow.

   Steps:
     1. Service     — car hire or airport transfer
     2. Details     — dates, locations, or flight info
     3. Vehicle     — pick a vehicle (car hire only)
     4. Contact     — name, phone, email, delivery method
     5. Review      — final summary + send CTA

   Layout:
     • Desktop:  two-column — wizard left (7/12), sticky
                 summary panel right (5/12)
     • Mobile:   single column, summary panel renders below

   State:
     All wizard state lives here. Steps are pure presentational
     components that receive slices of state and setters.

   Location defaults:
     Pickup and return locations are pre-filled with the
     DEFAULT_PICKUP_LOCATION and DEFAULT_RETURN_LOCATION from
     lib/locations.ts. Users can change them, but the defaults
     are valid on their own — a user can complete step 2 by
     filling only the two dates.
   ───────────────────────────────────────────────────────────── */

type Step = 1 | 2 | 3 | 4 | 5;

const initialState: SendQuoteState = {};

export function QuoteWizard() {
  /* ── Wizard state ── */
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);

  const [service, setService] = useState<QuoteService | null>(null);

  /* Car-hire — locations default to Utawala collection */
  const [vehicleId, setVehicleId] = useState('');
  const [pickupLocation, setPickupLocation] = useState<string>(
    DEFAULT_PICKUP_LOCATION
  );
  const [returnLocation, setReturnLocation] = useState<string>(
    DEFAULT_RETURN_LOCATION
  );
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');

  /* Airport transfer */
  const [direction, setDirection] = useState<'arrival' | 'departure'>(
    'arrival'
  );
  const [airport, setAirport] = useState<'jkia' | 'wilson'>('jkia');
  const [transferDate, setTransferDate] = useState('');
  const [timeWindow, setTimeWindow] = useState('');
  const [counterpartAddress, setCounterpartAddress] = useState('');
  const [passengers, setPassengers] = useState('any');
  const [flightNumber, setFlightNumber] = useState('');

  /* Contact */
  const [contact, setContact] = useState<QuoteContact>({
    name: '',
    phone: '',
    email: '',
  });
  const [delivery, setDelivery] = useState<QuoteDeliveryMethod>('email');
  const [notes, setNotes] = useState('');

  /* ── Server action ── */
  const [state, formAction] = useFormState(sendQuote, initialState);

  /* ── Server-action side effects ──
     • Reset the submitting flag when a response comes back
     • On error while on step 5, bounce back to step 4 */
  useEffect(() => {
    if (!state.message && !state.success) return;

    setSubmitting(false);

    if (!state.success && step === 5) {
      setStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [state, step]);

  /* ── Live quote request — recomputed on every relevant change ── */
  const request: QuoteRequest = useMemo(
    () => ({
      service: service ?? 'car-hire',
      vehicleId: service === 'car-hire' ? vehicleId : undefined,
      pickupLocation: service === 'car-hire' ? pickupLocation : undefined,
      returnLocation: service === 'car-hire' ? returnLocation : undefined,
      pickupDate: service === 'car-hire' ? pickupDate : undefined,
      dropoffDate: service === 'car-hire' ? dropoffDate : undefined,
      direction: service === 'airport-transfer' ? direction : undefined,
      airport: service === 'airport-transfer' ? airport : undefined,
      transferDate:
        service === 'airport-transfer' ? transferDate : undefined,
      timeWindow:
        service === 'airport-transfer' ? timeWindow : undefined,
      counterpartAddress:
        service === 'airport-transfer' ? counterpartAddress : undefined,
      passengers:
        service === 'airport-transfer' ? passengers : undefined,
      flightNumber:
        service === 'airport-transfer' ? flightNumber : undefined,
      contact,
      delivery,
      notes,
    }),
    [
      service,
      vehicleId,
      pickupLocation,
      returnLocation,
      pickupDate,
      dropoffDate,
      direction,
      airport,
      transferDate,
      timeWindow,
      counterpartAddress,
      passengers,
      flightNumber,
      contact,
      delivery,
      notes,
    ]
  );

  /* ── Live breakdown for the summary panel ── */
  const breakdown = useMemo(
    () => buildQuoteBreakdown(request),
    [request]
  );

  /* ── Step readiness — controls the "Continue" button ── */
  const canAdvance = useMemo(() => {
    switch (step) {
      case 1:
        return service !== null;

      case 2:
        if (service === 'car-hire') {
          return Boolean(
            pickupLocation &&
              returnLocation &&
              pickupDate &&
              dropoffDate
          );
        }
        if (service === 'airport-transfer') {
          return Boolean(
            airport &&
              transferDate &&
              timeWindow &&
              counterpartAddress.trim().length >= 3
          );
        }
        return false;

      case 3:
        return service === 'airport-transfer' || vehicleId !== '';

      case 4:
        return isContactReady(contact, delivery);

      case 5:
        return !submitting;

      default:
        return false;
    }
  }, [
    step,
    service,
    pickupLocation,
    returnLocation,
    pickupDate,
    dropoffDate,
    airport,
    transferDate,
    timeWindow,
    counterpartAddress,
    vehicleId,
    contact,
    delivery,
    submitting,
  ]);

  /* ── Navigation ── */
  const goNext = useCallback(() => {
    setStep((prev) => {
      if (prev === 2 && service === 'airport-transfer') {
        return 4;
      }
      return Math.min(prev + 1, 5) as Step;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [service]);

  const goBack = useCallback(() => {
    setStep((prev) => {
      if (prev === 4 && service === 'airport-transfer') {
        return 2;
      }
      return Math.max(prev - 1, 1) as Step;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [service]);

  /* ── Step labels ── */
  const steps = useMemo(
    () => [
      { n: 1, label: 'Service' },
      { n: 2, label: 'Details' },
      { n: 3, label: 'Vehicle', skipFor: 'airport-transfer' as const },
      { n: 4, label: 'Contact' },
      { n: 5, label: 'Review' },
    ],
    []
  );

  const visibleSteps = steps.filter(
    (s) =>
      !(s.skipFor === 'airport-transfer' && service === 'airport-transfer')
  );

  /* ── Success state — full takeover ── */
  if (state.success && state.quote) {
    return (
      <QuoteSuccess
        quote={state.quote}
        whatsappUrl={state.whatsappUrl}
        delivery={delivery}
      />
    );
  }

  return (
    <div className="relative bg-background">

      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      <section className="relative bg-obsidian-950 pt-32 lg:pt-40 pb-16 lg:pb-20 px-6 lg:px-8 overflow-hidden">

        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 900px 600px at 75% 25%, rgba(194,112,46,0.18) 0%, transparent 55%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 700px 500px at 5% 100%, rgba(63,63,70,0.30) 0%, transparent 60%)',
          }}
        />
        <div className="grain-overlay absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" />

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/25 to-transparent"
        />

        <div className="relative max-w-5xl mx-auto">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-400 mb-5">
            Instant Quote
          </p>
          <h1 className="font-display text-white leading-[1.05] tracking-[-0.025em] mb-6 text-[clamp(2rem,5vw,3.5rem)] max-w-3xl">
            Build your quote{' '}
            <span className="italic font-light text-copper-200">
              in under a minute.
            </span>
          </h1>
          <p className="text-base lg:text-lg text-white/65 leading-relaxed font-light max-w-2xl">
            Choose a service, tell us the details, and receive a full
            estimate by email or WhatsApp.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WIZARD BODY
          ═══════════════════════════════════════════ */}
      <section className="bg-background py-12 lg:py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Progress indicator */}
          <ProgressBar
            steps={visibleSteps}
            current={step}
            onStepClick={(n) => {
              if (n < step) setStep(n as Step);
            }}
          />

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-10 lg:mt-14">

            {/* Wizard main column */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {step === 1 && (
                    <StepService value={service} onChange={setService} />
                  )}

                  {step === 2 && service && (
                    <StepDetails
                      service={service}
                      pickupLocation={pickupLocation}
                      setPickupLocation={setPickupLocation}
                      returnLocation={returnLocation}
                      setReturnLocation={setReturnLocation}
                      pickupDate={pickupDate}
                      setPickupDate={setPickupDate}
                      dropoffDate={dropoffDate}
                      setDropoffDate={setDropoffDate}
                      direction={direction}
                      setDirection={setDirection}
                      airport={airport}
                      setAirport={setAirport}
                      transferDate={transferDate}
                      setTransferDate={setTransferDate}
                      timeWindow={timeWindow}
                      setTimeWindow={setTimeWindow}
                      counterpartAddress={counterpartAddress}
                      setCounterpartAddress={setCounterpartAddress}
                      passengers={passengers}
                      setPassengers={setPassengers}
                      flightNumber={flightNumber}
                      setFlightNumber={setFlightNumber}
                    />
                  )}

                  {step === 3 && service === 'car-hire' && (
                    <StepVehicle
                      value={vehicleId}
                      onChange={setVehicleId}
                      pickupDate={pickupDate}
                      dropoffDate={dropoffDate}
                    />
                  )}

                  {step === 4 && (
                    <StepContact
                      contact={contact}
                      setContact={setContact}
                      delivery={delivery}
                      setDelivery={setDelivery}
                      notes={notes}
                      setNotes={setNotes}
                      errors={state.errors}
                      fields={state.fields}
                    />
                  )}

                  {step === 5 && (
                    <StepReview
                      request={request}
                      breakdown={breakdown}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Error banner — shown when the server action rejects */}
              {state.message && !state.success && (
                <div
                  role="alert"
                  className="mt-6 flex items-start gap-3 px-4 py-3 bg-danger-soft border border-danger/30 rounded-lg text-sm text-danger"
                >
                  <span className="mt-0.5 shrink-0">⚠</span>
                  <p>{state.message}</p>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between gap-4 mt-10 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={step === 1 || submitting}
                  className={`
                    inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] rounded-md transition-all duration-300 ease-lux
                    ${
                      step === 1 || submitting
                        ? 'text-ink-subtle cursor-not-allowed'
                        : 'text-ink border border-border hover:border-copper-500/50 hover:text-copper-600'
                    }
                  `}
                >
                  <ArrowLeft size={14} strokeWidth={2.5} />
                  Back
                </button>

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!canAdvance}
                    className={`
                      group relative inline-flex items-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] rounded-md overflow-hidden transition-all duration-300 ease-lux
                      ${
                        canAdvance
                          ? 'text-obsidian-950 hover:-translate-y-0.5'
                          : 'text-ink-subtle bg-surface-sunken border border-border cursor-not-allowed'
                      }
                    `}
                    style={
                      canAdvance
                        ? {
                            backgroundImage:
                              'linear-gradient(135deg, #E3A468 0%, #D98A44 45%, #C2702E 100%)',
                            boxShadow:
                              '0 1px 2px rgba(168,90,34,0.20), 0 8px 24px rgba(194,112,46,0.28)',
                          }
                        : undefined
                    }
                  >
                    <span className="relative z-10">Continue</span>
                    <ArrowRight
                      size={14}
                      strokeWidth={2.5}
                      className="relative z-10 transition-transform duration-300 ease-lux group-hover:translate-x-0.5"
                    />
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="quote-submit-form"
                    disabled={submitting}
                    onClick={() => setSubmitting(true)}
                    className={`
                      group relative inline-flex items-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-obsidian-950 rounded-md overflow-hidden transition-all duration-300 ease-lux
                      ${
                        submitting
                          ? 'opacity-70 cursor-wait'
                          : 'hover:-translate-y-0.5'
                      }
                    `}
                    style={{
                      backgroundImage:
                        'linear-gradient(135deg, #E3A468 0%, #D98A44 45%, #C2702E 100%)',
                      boxShadow:
                        '0 1px 2px rgba(168,90,34,0.20), 0 8px 24px rgba(194,112,46,0.28)',
                    }}
                  >
                    {submitting ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-obsidian-950/30 border-t-obsidian-950 rounded-full animate-spin" />
                        <span className="relative z-10">Sending…</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Send quote</span>
                        <ArrowRight
                          size={14}
                          strokeWidth={2.5}
                          className="relative z-10 transition-transform duration-300 ease-lux group-hover:translate-x-0.5"
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
                )}
              </div>
            </div>

            {/* Summary panel column */}
            <aside className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
              <QuoteSummaryPanel request={request} breakdown={breakdown} />
            </aside>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HIDDEN SUBMIT FORM
          Owns the server action. The visible send button
          (rendered above) uses `form="quote-submit-form"`
          to submit it without being a child of this form.
          ═══════════════════════════════════════════ */}
      <form
        action={formAction}
        id="quote-submit-form"
        className="hidden"
        aria-hidden="true"
      >
        <input type="hidden" name="service" value={service ?? ''} />
        <input type="hidden" name="vehicleId" value={vehicleId} />
        <input
          type="hidden"
          name="pickupLocation"
          value={pickupLocation}
        />
        <input
          type="hidden"
          name="returnLocation"
          value={returnLocation}
        />
        <input type="hidden" name="pickupDate" value={pickupDate} />
        <input type="hidden" name="dropoffDate" value={dropoffDate} />
        <input type="hidden" name="direction" value={direction} />
        <input type="hidden" name="airport" value={airport} />
        <input type="hidden" name="transferDate" value={transferDate} />
        <input type="hidden" name="timeWindow" value={timeWindow} />
        <input
          type="hidden"
          name="counterpartAddress"
          value={counterpartAddress}
        />
        <input type="hidden" name="passengers" value={passengers} />
        <input type="hidden" name="flightNumber" value={flightNumber} />
        <input type="hidden" name="name" value={contact.name} />
        <input type="hidden" name="phone" value={contact.phone} />
        <input type="hidden" name="email" value={contact.email} />
        <input type="hidden" name="delivery" value={delivery} />
        <input type="hidden" name="notes" value={notes} />
      </form>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROGRESS BAR
   ───────────────────────────────────────────────────────────── */
function ProgressBar({
  steps,
  current,
  onStepClick,
}: {
  steps: { n: number; label: string }[];
  current: number;
  onStepClick: (n: number) => void;
}) {
  return (
    <div className="overflow-x-auto scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
      <ol className="flex items-center gap-1 sm:gap-2 min-w-max">
        {steps.map((s, i) => {
          const isActive = current === s.n;
          const isComplete = current > s.n;
          const isClickable = current > s.n;

          return (
            <li key={s.n} className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => onStepClick(s.n)}
                disabled={!isClickable}
                aria-current={isActive ? 'step' : undefined}
                className={`
                  flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full
                  text-[11px] font-semibold uppercase tracking-[0.14em]
                  transition-all duration-300 ease-lux
                  ${
                    isActive
                      ? 'bg-obsidian-900 text-white shadow-[0_4px_12px_rgba(14,14,16,0.15)]'
                      : isComplete
                        ? 'text-copper-600 hover:bg-copper-500/[0.06] cursor-pointer'
                        : 'text-ink-subtle cursor-not-allowed'
                  }
                `}
              >
                <span
                  className={`
                    flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold tabular-nums
                    ${
                      isActive
                        ? 'bg-copper-500 text-obsidian-950'
                        : isComplete
                          ? 'bg-copper-500/20 text-copper-700'
                          : 'bg-surface-sunken text-ink-subtle'
                    }
                  `}
                >
                  {s.n}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>

              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`w-3 sm:w-6 h-px transition-colors duration-300 ${
                    current > s.n ? 'bg-copper-500/40' : 'bg-border'
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   QUOTE SUCCESS
   ───────────────────────────────────────────────────────────── */
function QuoteSuccess({
  quote,
  whatsappUrl,
  delivery,
}: {
  quote: Quote;
  whatsappUrl?: string;
  delivery: QuoteDeliveryMethod;
}) {
  return (
    <section className="relative bg-obsidian-950 min-h-screen flex items-center justify-center py-24 px-6 lg:px-8 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 900px 600px at 50% 40%, rgba(194,112,46,0.18) 0%, transparent 60%)',
        }}
      />
      <div className="grain-overlay absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" />

      <div className="relative max-w-2xl mx-auto text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-400 mb-4">
          {delivery === 'email' ? 'Sent' : 'Ready'}
        </p>
        <h1 className="font-display text-white leading-[1.05] tracking-[-0.025em] mb-6 text-[clamp(2rem,6vw,3.5rem)]">
          Quote{' '}
          <span className="italic font-light text-copper-200">
            {quote.id}
          </span>
        </h1>
        <p className="text-base lg:text-lg text-white/65 leading-relaxed font-light mb-10 max-w-lg mx-auto">
          {delivery === 'email'
            ? `We've emailed your quote. If it doesn't arrive within a minute, check spam — or send it via WhatsApp below.`
            : `Tap the button below to send your quote via WhatsApp.`}
        </p>

        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-obsidian-950 rounded-md overflow-hidden transition-all duration-300 ease-lux hover:-translate-y-0.5"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #E3A468 0%, #D98A44 45%, #C2702E 100%)',
              boxShadow:
                '0 1px 2px rgba(168,90,34,0.20), 0 8px 24px rgba(194,112,46,0.28)',
            }}
          >
            <span className="relative z-10">
              {delivery === 'email'
                ? 'Also send via WhatsApp'
                : 'Send via WhatsApp'}
            </span>
            <ArrowRight
              size={14}
              strokeWidth={2.5}
              className="relative z-10 transition-transform duration-300 ease-lux group-hover:translate-x-0.5"
            />
          </a>
        )}

        <div className="mt-12 pt-8 border-t border-white/[0.08]">
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/40">
            Need to talk it through?
          </p>
          <a
            href={`tel:+254780957810`}
            className="inline-block mt-3 font-display text-2xl text-white hover:text-copper-200 transition-colors duration-300 tabular-nums"
          >
            +254 780 957 810
          </a>
        </div>
      </div>
    </section>
  );
}
