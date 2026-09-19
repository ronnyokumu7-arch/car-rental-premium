'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// ─────────────────────────────────────────────────────────────
// Configure sender + recipient here.
// The sender MUST be @royride.com (verified in Resend).
// The recipient can be changed anytime without re-verification.
// ─────────────────────────────────────────────────────────────
const FROM_EMAIL = 'Royride Website <sales@royride.com>';

// ⚠️ TEMPORARY: using a working inbox until carhire@royride.com is live.
// Change to 'carhire@royride.com' once that inbox is set up.
const DESTINATION_EMAIL = 'ronnyokumu7@gmail.com';

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  phone: z
    .string()
    .min(9, 'Please enter a valid phone number')
    .regex(/^[0-9+\s()-]+$/, 'Please enter a valid phone number'),
  email: z
    .string()
    .email('Please enter a valid email')
    .optional()
    .or(z.literal('')),
  service: z.string().min(1, 'Please select a service'),
  vehicle: z.string().optional(),
  message: z
    .string()
    .min(10, 'Please tell us a little about your requirement')
    .max(1000),
});

export type ContactState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  fields?: Record<string, string>;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: formData.get('name') as string,
    phone: formData.get('phone') as string,
    email: (formData.get('email') as string) || '',
    service: formData.get('service') as string,
    vehicle: (formData.get('vehicle') as string) || '',
    message: formData.get('message') as string,
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      fields: raw,
    };
  }

  const data = parsed.data;

  // Basic HTML escaping to prevent injection in the email body
  const esc = (s: string) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [DESTINATION_EMAIL],
      replyTo: data.email || undefined,
      subject: `New enquiry: ${data.service} — ${data.name}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a; background: #faf9f7;">
          <div style="border-left: 4px solid #c9a227; padding-left: 16px; margin-bottom: 28px;">
            <h1 style="font-size: 22px; margin: 0 0 4px; color: #081529; letter-spacing: -0.3px;">New Website Enquiry</h1>
            <p style="font-size: 12px; color: #6b6b6b; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Royride Car Hire</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; font-weight: 600; width: 130px; color: #3d3d3d; font-size: 14px;">Name</td>
              <td style="padding: 10px 0; font-size: 14px;">${esc(data.name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #3d3d3d; font-size: 14px;">Phone</td>
              <td style="padding: 10px 0; font-size: 14px;"><a href="tel:${esc(data.phone.replace(/\s/g, ''))}" style="color: #1a365d;">${esc(data.phone)}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #3d3d3d; font-size: 14px;">Email</td>
              <td style="padding: 10px 0; font-size: 14px;">${data.email ? `<a href="mailto:${esc(data.email)}" style="color: #1a365d;">${esc(data.email)}</a>` : '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #3d3d3d; font-size: 14px;">Service</td>
              <td style="padding: 10px 0; font-size: 14px;">${esc(data.service)}</td>
            </tr>
            ${data.vehicle ? `
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #3d3d3d; font-size: 14px;">Vehicle</td>
              <td style="padding: 10px 0; font-size: 14px; color: #a8861f; font-weight: 500;">${esc(data.vehicle)}</td>
            </tr>` : ''}
          </table>

          <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e5e5;" />

          <h2 style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #6b6b6b; margin-bottom: 12px;">Message</h2>
          <p style="line-height: 1.65; white-space: pre-wrap; font-size: 15px; color: #1a1a1a;">${esc(data.message)}</p>

          <hr style="margin: 28px 0; border: none; border-top: 1px solid #e5e5e5;" />

          <p style="font-size: 11px; color: #8a8a8a; margin: 0;">
            Sent from royride.com contact form · ${new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' })} EAT
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return {
        success: false,
        message:
          'We could not submit your enquiry. Please try again or call us directly at +254 780 957 810.',
        fields: raw,
      };
    }
  } catch (err) {
    console.error('Contact form error:', err);
    return {
      success: false,
      message:
        'Network error. Please try again or call us directly at +254 780 957 810.',
      fields: raw,
    };
  }

  return {
    success: true,
    message:
      "Thank you — we've received your enquiry. Our team will be in touch within 2 hours during business hours.",
  };
}