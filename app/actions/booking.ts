'use server';

import { z } from 'zod';
import {
  LOCATIONS,
  getPickupFee,
  getReturnFee,
  formatFee,
  requiresQuote,
} from '../../lib/locations';

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
      message: 'Dropoff date must be on or after pickup date',
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
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      fields: raw,
    };
  }

  const data = parsed.data;

  // Look up human-readable location labels + fees
  const pickupLocationLabel =
    LOCATIONS.find((l) => l.value === data.pickupLocation)?.label ??
    data.pickupLocation;

  const returnLocationLabel =
    data.returnLocation === 'same-as-pickup'
      ? 'Same as pickup'
      : LOCATIONS.find((l) => l.value === data.returnLocation)?.label ??
        data.returnLocation;

  const pickupFee = getPickupFee(data.pickupLocation);
  const returnFee = getReturnFee(data.returnLocation, data.pickupLocation);
  const quoteRequired = requiresQuote(
    data.pickupLocation,
    data.returnLocation
  );

  // ─────────────────────────────────────────────────────────────
  // TODO: Wire to real backend
  //   - Save to database (Supabase / Postgres)
  //   - Send notification email (Resend / SendGrid)
  //   - Trigger WhatsApp/SMS to +254 780 957 810
  // ─────────────────────────────────────────────────────────────

  // Simulate network latency for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 900));

  // Compose the success message with details
  const feeLine = quoteRequired
    ? 'Delivery fee: quote on request.'
    : `Delivery: ${formatFee(pickupFee)}${returnFee > 0 ? ` + collection: ${formatFee(returnFee)}` : ''}.`;

  const seatLine =
    data.seats && data.seats !== 'any' ? ` · ${data.seats} seats` : '';

  return {
    success: true,
    message: `Thank you. We've received your request for a ${data.vehicleType.toLowerCase()}${seatLine}. Pickup from ${pickupLocationLabel}, return to ${returnLocationLabel}. ${feeLine} Our team will call you within 2 hours to confirm.`,
    fields: raw,
  };
}
