'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { SERVICE_OPTIONS } from '../../lib/contact';
import { BRAND } from '../../lib/constants';
import { VEHICLES } from '../../lib/vehicles';

/* ─────────────────────────────────────────────────────────────
   CONTACT — server action
   Receives the enquiry form, validates, sends via Resend.

   Contracts:
     • Validates with Zod 4
     • Escapes all user input before injecting into HTML email
     • Restores form fields on error (fields object)
     • Never exposes the recipient address to the client
     • Sends a branded HTML email using the current palette
   ───────────────────────────────────────────────────────────── */

/* ── Resend setup ── */
const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = `Royride Website <sales@royride.com>`;

/* ⚠️ TEMPORARY: using a working inbox until carhire@royride.com is live.
   Change to 'carhire@royride.com' once that inbox is set up. */
const DESTINATION_EMAIL = 'ronnyokumu7@gmail.com';

/* ── Schema ── */
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your full name')
    .max(100, 'Name is too long'),

  phone: z
    .string()
    .trim()
    .min(9, 'Please enter a valid phone number')
    .max(20, 'Phone number is too long')
    .regex(
      /^[0-9+\s()-]+$/,
      'Please enter a valid phone number'
    ),

  email: z
    .string()
    .trim()
    .max(150, 'Email is too long')
    .pipe(z.email('Please enter a valid email').or(z.literal('')))
    .optional(),

  service: z.enum(SERVICE_OPTIONS, {
    error: 'Please select a service',
  }),

  vehicle: z
    .string()
    .trim()
    .max(100, 'Vehicle name is too long')
    .optional(),

  message: z
    .string()
    .trim()
    .min(10, 'Please tell us a little about your requirement')
    .max(1000, 'Message is too long'),
});

export type ContactState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  fields?: Record<string, string>;
};

/* ── HTML escape ── */
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ─────────────────────────────────────────────────────────────
   ACTION
   ───────────────────────────────────────────────────────────── */

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: (formData.get('name') as string) || '',
    phone: (formData.get('phone') as string) || '',
    email: (formData.get('email') as string) || '',
    service: (formData.get('service') as string) || '',
    vehicle: (formData.get('vehicle') as string) || '',
    message: (formData.get('message') as string) || '',
  };

  const parsed = contactSchema.safeParse(raw);

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

  /* ── Verify the vehicle, if provided ──
     Guards against spoofed IDs being sent in the form. If the
     vehicle isn't in the fleet, we quietly omit it. */
  const matchedVehicle = data.vehicle
    ? VEHICLES.find(
        (v) =>
          v.name === data.vehicle ||
          v.id === data.vehicle ||
          v.slug === data.vehicle
      )
    : null;

  const vehicleLine = matchedVehicle
    ? `
      <tr>
        <td style="padding: 10px 0; font-weight: 600; color: #3F3F46; font-size: 14px;">Vehicle</td>
        <td style="padding: 10px 0; font-size: 14px; color: #C2702E; font-weight: 500;">${esc(
          matchedVehicle.name
        )}</td>
      </tr>`
    : '';

  /* ── Send via Resend ── */
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [DESTINATION_EMAIL],
      replyTo: data.email || undefined,
      subject: `New enquiry: ${data.service} — ${data.name}`,
      html: `
        <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #0E0E10; background: #FCFBF8;">

          <!-- Copper top bar -->
          <div style="height: 4px; background: linear-gradient(90deg, #D98A44, #C2702E, #A85A22); border-radius: 2px; margin-bottom: 32px;"></div>

          <!-- Header -->
          <div style="border-left: 3px solid #C2702E; padding-left: 16px; margin-bottom: 32px;">
            <h1 style="font-size: 22px; margin: 0 0 6px; color: #070708; letter-spacing: -0.3px; font-weight: 600;">
              New Website Enquiry
            </h1>
            <p style="font-size: 11px; color: #71717A; margin: 0; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 500;">
              ${BRAND.fullName}
            </p>
          </div>

          <!-- Data table -->
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
            <tr>
              <td style="padding: 12px 0; font-weight: 600; width: 130px; color: #3F3F46; font-size: 13px; border-bottom: 1px solid #EFEAE0;">Name</td>
              <td style="padding: 12px 0; font-size: 14px; border-bottom: 1px solid #EFEAE0;">${esc(
                data.name
              )}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: 600; color: #3F3F46; font-size: 13px; border-bottom: 1px solid #EFEAE0;">Phone</td>
              <td style="padding: 12px 0; font-size: 14px; border-bottom: 1px solid #EFEAE0;">
                <a href="tel:${esc(
                  data.phone.replace(/\s/g, '')
                )}" style="color: #C2702E; text-decoration: none; font-weight: 500;">${esc(
                  data.phone
                )}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: 600; color: #3F3F46; font-size: 13px; border-bottom: 1px solid #EFEAE0;">Email</td>
              <td style="padding: 12px 0; font-size: 14px; border-bottom: 1px solid #EFEAE0;">
                ${
                  data.email
                    ? `<a href="mailto:${esc(
                        data.email
                      )}" style="color: #C2702E; text-decoration: none;">${esc(
                        data.email
                      )}</a>`
                    : '<span style="color: #A1A1AA;">—</span>'
                }
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: 600; color: #3F3F46; font-size: 13px; border-bottom: 1px solid #EFEAE0;">Service</td>
              <td style="padding: 12px 0; font-size: 14px; border-bottom: 1px solid #EFEAE0;">${esc(
                data.service
              )}</td>
            </tr>
            ${vehicleLine}
          </table>

          <!-- Message -->
          <div style="background: #F7F4EE; border-radius: 8px; padding: 20px; margin-bottom: 28px;">
            <h2 style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #71717A; margin: 0 0 12px; font-weight: 600;">
              Message
            </h2>
            <p style="line-height: 1.65; white-space: pre-wrap; font-size: 15px; color: #0E0E10; margin: 0;">${esc(
              data.message
            )}</p>
          </div>

          <!-- Footer -->
          <p style="font-size: 11px; color: #A1A1AA; margin: 0; padding-top: 20px; border-top: 1px solid #EFEAE0;">
            Sent from royride.com contact form ·
            ${new Date().toLocaleString('en-KE', {
              timeZone: 'Africa/Nairobi',
            })} EAT
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return {
        success: false,
        message: `We couldn't submit your enquiry. Please try again or call us directly at ${BRAND.phones[0]}.`,
        fields: raw,
      };
    }
  } catch (err) {
    console.error('Contact form error:', err);
    return {
      success: false,
      message: `Network error. Please try again or call us directly at ${BRAND.phones[0]}.`,
      fields: raw,
    };
  }

  return {
    success: true,
    message:
      "Thank you — we've received your enquiry. Our team will be in touch within 2 hours during business hours.",
  };
}
