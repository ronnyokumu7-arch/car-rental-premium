'use server';

import { z } from 'zod';
import { LOCATIONS, formatFee } from '../../lib/locations';
import {
  AIRPORTS,
  TIME_WINDOWS,
} from '../../lib/airportTransferOptions';

/* ─────────────────────────────────────────────────────────────
   AIRPORT TRANSFER — server action.

   NOTE: option constants (AIRPORTS, TIME_WINDOWS, PASSENGER_OPTIONS,
   TRANSFER_VEHICLES) live in lib/airportTransferOptions.ts, NOT here.
   'use server' files may only export async functions. Constants
   imported by client components must come from a plain lib file.

   TODO (parallel to booking.ts):
     • Persist to DB
     • Send notification email (Resend)
     • Trigger WhatsApp/SMS to the concierge line
     • Send customer confirmation with driver ETA template
   ───────────────────────────────────────────────────────────── */

const transferSchema = z.object({
  direction: z.enum(['arrival', 'departure'], {
    error: 'Choose arrival or departure',
  }),

  airport: z.enum(['jkia', 'wilson'], {
    error: 'Please select an airport',
  }),

  /* Counterpart address — where we drop them (arrival) or
     where we pick them up (departure). Free text. */
  counterpartAddress: z
    .string()
    .trim()
    .min(3, 'Please enter an address or hotel name')
    .max(200, 'Address is too long'),

  transferDate: z
    .string()
    .min(1, 'Please select a transfer date')
    .refine((val) => {
      const picked = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return picked >= today;
    }, 'Transfer date cannot be in the past'),

  timeWindow: z.enum(
    [
      'early-morning',
      'morning',
      'midday',
      'afternoon',
      'evening',
      'night',
    ],
    { error: 'Please choose a time window' }
  ),

  flightNumber: z
    .string()
    .trim()
    .max(20, 'Flight number is too long')
    .optional(),

  passengers: z.string().optional().default('any'),

  vehicleType: z.string().optional().default(''),

  notes: z
    .string()
    .trim()
    .max(500, 'Notes are too long')
    .optional(),
});

export type AirportTransferState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  fields?: Record<string, string>;
};

/* ─────────────────────────────────────────────────────────────
   ACTION
   ───────────────────────────────────────────────────────────── */

export async function submitAirportTransfer(
  _prev: AirportTransferState,
  formData: FormData
): Promise<AirportTransferState> {
  const raw = {
    direction: (formData.get('direction') as string) || '',
    airport: (formData.get('airport') as string) || '',
    counterpartAddress:
      (formData.get('counterpartAddress') as string) || '',
    transferDate: (formData.get('transferDate') as string) || '',
    timeWindow: (formData.get('timeWindow') as string) || '',
    flightNumber: (formData.get('flightNumber') as string) || '',
    passengers: (formData.get('passengers') as string) || 'any',
    vehicleType: (formData.get('vehicleType') as string) || '',
    notes: (formData.get('notes') as string) || '',
  };

  const parsed = transferSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
      fields: raw,
    };
  }

  const data = parsed.data;

  /* ── Resolve labels for the confirmation message ── */
  const airportLabel =
    AIRPORTS.find((a) => a.value === data.airport)?.label ?? data.airport;

  const timeWindowLabel =
    TIME_WINDOWS.find((t) => t.value === data.timeWindow)?.label ??
    data.timeWindow;

  const directionLabel =
    data.direction === 'arrival' ? 'Arrival' : 'Departure';

  /* ── Base fee ──
     Reuses the fee for the matching entry in LOCATIONS.
     jkia → 1500, wilson → 2000. One source of truth. */
  const airportFee = (() => {
    const loc = LOCATIONS.find((l) => l.value === data.airport);
    return loc?.fee ?? 0;
  })();

  /* ─────────────────────────────────────────────────────────────
     TODO: Wire to real backend (see header comment)
     ───────────────────────────────────────────────────────────── */

  await new Promise((resolve) => setTimeout(resolve, 900));

  /* ── Compose confirmation ── */
  const seatLine =
    data.passengers && data.passengers !== 'any'
      ? ` · ${data.passengers} passenger${
          data.passengers === '1' ? '' : 's'
        }`
      : '';

  const vehicleLine = data.vehicleType ? ` · ${data.vehicleType}` : '';

  const flightLine = data.flightNumber
    ? ` Flight ${data.flightNumber.toUpperCase()} noted — we'll track it live.`
    : '';

  const feeLine =
    airportFee > 0
      ? ` Estimated transfer: ${formatFee(airportFee)}.`
      : '';

  return {
    success: true,
    message:
      `${directionLabel} transfer from ${airportLabel} on ${data.transferDate} ` +
      `(${timeWindowLabel})${seatLine}${vehicleLine}.${flightLine}${feeLine} ` +
      `Our concierge will confirm your driver and pickup time within 30 minutes.`,
    fields: raw,
  };
}
