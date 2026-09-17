'use server';

import { z } from 'zod';

const bookingSchema = z
  .object({
    pickupLocation: z
      .string()
      .min(2, 'Please enter a pickup location'),
    pickupDate: z
      .string()
      .min(1, 'Please select a pickup date'),
    pickupTime: z
      .string()
      .min(1, 'Please select a pickup time'),
    dropoffDate: z
      .string()
      .min(1, 'Please select a dropoff date'),
    dropoffTime: z
      .string()
      .min(1, 'Please select a dropoff time'),
    vehicleType: z
      .string()
      .min(1, 'Please select a vehicle type'),
  })
  .refine(
    (data) => {
      const pickup = new Date(`${data.pickupDate}T${data.pickupTime}`);
      const dropoff = new Date(`${data.dropoffDate}T${data.dropoffTime}`);
      return dropoff > pickup;
    },
    {
      message: 'Dropoff must be after pickup',
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
    pickupDate: formData.get('pickupDate') as string,
    pickupTime: formData.get('pickupTime') as string,
    dropoffDate: formData.get('dropoffDate') as string,
    dropoffTime: formData.get('dropoffTime') as string,
    vehicleType: formData.get('vehicleType') as string,
  };

  const parsed = bookingSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      fields: raw,
    };
  }

  // ─────────────────────────────────────────────────────────────
  // TODO: Wire to real backend
  //   - Save to database (Supabase / Postgres)
  //   - Send notification email (Resend / SendGrid)
  //   - Trigger WhatsApp/SMS to +254 780 957 810
  // ─────────────────────────────────────────────────────────────

  // Simulate network latency for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 900));

  return {
    success: true,
    message: `Thank you. We have received your request for a ${parsed.data.vehicleType.toLowerCase()} in ${parsed.data.pickupLocation}. Our team will call you within 2 hours to confirm.`,
    fields: raw,
  };
}