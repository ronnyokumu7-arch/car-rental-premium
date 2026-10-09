'use server';

import { z } from 'zod';
import { LOCATIONS } from '../../lib/locations';

/* ─────────────────────────────────────────────────────────────
   BOOKING — availability check

   NOT a booking. This action captures a quick "do you have a
   car for these dates?" enquiry. The detailed quotation flow
   lives at /quote (submitQuote in app/actions/sendQuote.ts).

   The form sends only:
     • pickupDate    (required)
     • dropoffDate   (required)
     • vehicleType   (required)
     • minPrice/maxPrice (optional, for filtering)
     • pickupLocation / returnLocation / seats (hidden defaults)

   The location fields are invisible to the user but still
   required by the schema — they're populated by hidden inputs
   on the client with Utawala defaults.

   TODO (later):
     • Persist to DB
     • Send notification email
     • Trigger WhatsApp/SMS to concierge

   No simulated latency. The action returns immediately.
   ───────────────────────────────────────────────────────────── */

const bookingSchema = z
  .object({
    pickupLocation: z
      .string()
      .min(1, 'Please select a pickup location'),
    returnLocation: z
      .string()
      .min(1, 'Please select a return location'),
    pickupDate: z
      .string()
      .min(1, 'Please select a pickup date'),
    dropoffDate: z
      .string()
      .min(1, 'Please select a dropoff date'),
    vehicleType: z
      .string()
      .min(1, 'Please select a vehicle type'),
    seats: z
      .string()
      .optional()
      .default('any'),
    minPrice: z.coerce.number().min(0).max(100000).optional(),
    maxPrice: z.coerce.number().min(0).max(100000).optional(),
  })
  .refine(
    (data) => {
      const pickup = new Date(data.pickupDate);
      const dropoff = new Date(data.dropoffDate);
      return dropoff >= pickup;
    },
    {
      message: 'Return date must be on or after pickup date',
      path: ['dropoffDate'],
    }
  );

export type BookingState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  fields?: Record<string, string>;
};

export async function submitBooking(
  _prev: BookingState,
  formData: FormData
): Promise<BookingState> {
  const raw = {
    pickupLocation: formData.get('pickupLocation') as string,
    returnLocation: formData.get('returnLocation') as string,
    pickupDate: formData.get('pickupDate') as string,
    dropoffDate: formData.get('dropoffDate') as string,
    vehicleType: formData.get('vehicleType') as string,
    seats: (formData.get('seats') as string) || 'any',
    minPrice: formData.get('minPrice') as string,
    maxPrice: formData.get('maxPrice') as string,
  };

  const parsed = bookingSchema.safeParse(raw);

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

  /* ── Human-readable pickup label ── */
  const pickupLocationLabel =
    LOCATIONS.find((l) => l.value === data.pickupLocation)?.label ??
    data.pickupLocation;

  /* ─────────────────────────────────────────────────────────────
     TODO: Wire to real backend (see header comment)
     ───────────────────────────────────────────────────────────── */

  /* ── Compose confirmation ── */
  const vehicleLabel = data.vehicleType.toLowerCase();
  const seatLine =
    data.seats && data.seats !== 'any' ? ` · ${data.seats} seats` : '';

  return {
    success: true,
    message: `Thank you. We've received your request for a ${vehicleLabel}${seatLine}, pickup from ${pickupLocationLabel}. Our concierge will call you within 2 hours to confirm availability.`,
    fields: raw,
  };
}
