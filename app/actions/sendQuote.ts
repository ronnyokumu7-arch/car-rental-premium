'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import {
  buildQuote,
  formatKES,
  type Quote,
  type QuoteRequest,
  type QuoteService,
  type QuoteDeliveryMethod,
} from '../../lib/quote';
import { BRAND } from '../../lib/constants';
import { CONTACT } from '../../lib/contact';
import { getVehicle } from '../../lib/vehicles';

/* ─────────────────────────────────────────────────────────────
   SEND QUOTE — server action

   Receives a QuoteRequest from the wizard, validates it,
   builds a Quote, and either:

     • emails it via Resend (delivery = 'email'), OR
     • returns a WhatsApp deep-link (delivery = 'whatsapp')

   Always returns the Quote on success — the caller may want to
   log, cache, or eventually persist it.

   The email is styled to match the site — copper accents,
   ivory surface, editorial typography.
   ───────────────────────────────────────────────────────────── */

const resend = new Resend(process.env.RESEND_API_KEY);

/* Same sender + destination pattern as the contact form */
const FROM_EMAIL = `Royride Website <sales@royride.com>`;

/* ⚠️ TEMPORARY: switch to carhire@royride.com when the inbox is live */
const DESTINATION_EMAIL = 'ronnyokumu7@gmail.com';

/* ── Validation ── */
const quoteContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your full name')
    .max(100),
  phone: z
    .string()
    .trim()
    .min(9, 'Please enter a valid phone number')
    .max(20)
    .regex(/^[0-9+\s()-]+$/, 'Please enter a valid phone number'),
  email: z
    .string()
    .trim()
    .max(150)
    .pipe(z.email('Please enter a valid email').or(z.literal('')))
    .optional(),
});

const quoteRequestSchema = z
  .object({
    service: z.enum(['car-hire', 'airport-transfer'], {
      error: 'Please select a service',
    }),

    /* Car hire */
    vehicleId: z.string().optional(),
    pickupLocation: z.string().optional(),
    returnLocation: z.string().optional(),
    pickupDate: z.string().optional(),
    dropoffDate: z.string().optional(),

    /* Airport transfer */
    direction: z.enum(['arrival', 'departure']).optional(),
    airport: z.enum(['jkia', 'wilson']).optional(),
    transferDate: z.string().optional(),
    timeWindow: z.string().optional(),
    counterpartAddress: z.string().max(200).optional(),
    passengers: z.string().optional(),
    flightNumber: z.string().max(20).optional(),

    /* Shared */
    contact: quoteContactSchema,
    delivery: z.enum(['email', 'whatsapp'], {
      error: 'Please choose how to receive your quote',
    }),
    notes: z.string().max(500).optional(),
  })
  .refine(
    (data) => {
      if (data.service === 'car-hire') {
        return Boolean(
          data.vehicleId &&
            data.pickupLocation &&
            data.pickupDate &&
            data.dropoffDate
        );
      }
      return Boolean(
        data.airport && data.transferDate && data.timeWindow
      );
    },
    { message: 'Quote is missing required details' }
  );

export type SendQuoteState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  fields?: Record<string, string>;
  quote?: Quote;
  whatsappUrl?: string;
};

/* ─────────────────────────────────────────────────────────────
   ACTION
   ───────────────────────────────────────────────────────────── */

export async function sendQuote(
  _prev: SendQuoteState,
  formData: FormData
): Promise<SendQuoteState> {
  /* ── Parse FormData → raw object ── */
  const raw = {
    service: (formData.get('service') as string) || '',
    vehicleId: (formData.get('vehicleId') as string) || '',
    pickupLocation: (formData.get('pickupLocation') as string) || '',
    returnLocation: (formData.get('returnLocation') as string) || '',
    pickupDate: (formData.get('pickupDate') as string) || '',
    dropoffDate: (formData.get('dropoffDate') as string) || '',
    direction: (formData.get('direction') as string) || undefined,
    airport: (formData.get('airport') as string) || undefined,
    transferDate: (formData.get('transferDate') as string) || '',
    timeWindow: (formData.get('timeWindow') as string) || '',
    counterpartAddress:
      (formData.get('counterpartAddress') as string) || '',
    passengers: (formData.get('passengers') as string) || 'any',
    flightNumber: (formData.get('flightNumber') as string) || '',
    contact: {
      name: (formData.get('name') as string) || '',
      phone: (formData.get('phone') as string) || '',
      email: (formData.get('email') as string) || '',
    },
    delivery: (formData.get('delivery') as string) || 'email',
    notes: (formData.get('notes') as string) || '',
  };

  const parsed = quoteRequestSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
      fields: {
        name: raw.contact.name,
        phone: raw.contact.phone,
        email: raw.contact.email,
        notes: raw.notes,
      },
    };
  }

  const data = parsed.data;

  /* ── Build the Quote object ── */
  const request: QuoteRequest = {
    service: data.service as QuoteService,
    vehicleId: data.vehicleId,
    pickupLocation: data.pickupLocation,
    returnLocation: data.returnLocation,
    pickupDate: data.pickupDate,
    dropoffDate: data.dropoffDate,
    direction: data.direction,
    airport: data.airport,
    transferDate: data.transferDate,
    timeWindow: data.timeWindow,
    counterpartAddress: data.counterpartAddress,
    passengers: data.passengers,
    flightNumber: data.flightNumber,
    contact: data.contact,
    delivery: data.delivery as QuoteDeliveryMethod,
    notes: data.notes,
  };

  const quote = buildQuote(request);

  /* ── Compose the WhatsApp deep-link (always) ──
     Even if the user chose email delivery, we return the link
     so the UI can offer it as a secondary option. */
  const whatsappUrl = buildWhatsAppUrl(quote);

  /* ── Deliver by chosen method ── */
  if (data.delivery === 'email') {
    if (!data.contact.email) {
      return {
        success: false,
        message: 'An email address is required for email delivery.',
        fields: {
          name: raw.contact.name,
          phone: raw.contact.phone,
          email: raw.contact.email,
          notes: raw.notes,
        },
      };
    }

    try {
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: [data.contact.email],
        bcc: [DESTINATION_EMAIL],
        replyTo: DESTINATION_EMAIL,
        subject: `Your Royride quote ${quote.id} — ${formatKES(quote.breakdown.total)}`,
        html: buildQuoteEmailHtml(quote),
      });

      if (error) {
        console.error('Resend quote email error:', error);
        return {
          success: false,
          message: `We couldn't send your quote. Try again, or WhatsApp us directly.`,
          fields: {
            name: raw.contact.name,
            phone: raw.contact.phone,
            email: raw.contact.email,
            notes: raw.notes,
          },
        };
      }
    } catch (err) {
      console.error('Quote email error:', err);
      return {
        success: false,
        message: `Network error. Try again, or WhatsApp us directly.`,
        fields: {
          name: raw.contact.name,
          phone: raw.contact.phone,
          email: raw.contact.email,
          notes: raw.notes,
        },
      };
    }
  }

  /* ── Success ── */
  return {
    success: true,
    message:
      data.delivery === 'email'
        ? `Your quote ${quote.id} is on its way to ${data.contact.email}.`
        : `Your quote ${quote.id} is ready — tap to send it via WhatsApp.`,
    quote,
    whatsappUrl,
  };
}

/* ─────────────────────────────────────────────────────────────
   WHATSAPP DEEP-LINK
   Prefilled message with the full quote details.
   ───────────────────────────────────────────────────────────── */

function buildWhatsAppUrl(quote: Quote): string {
  const lines: string[] = [
    `Hi Royride, I'd like a quote:`,
    ``,
    `Ref: ${quote.id}`,
  ];

  /* Vehicle line */
  if (quote.request.vehicleId) {
    const vehicle = getVehicle(quote.request.vehicleId);
    if (vehicle) {
      lines.push(`Vehicle: ${vehicle.name}`);
    }
  }

  /* Trip lines */
  if (quote.request.service === 'car-hire') {
    if (quote.request.pickupDate && quote.request.dropoffDate) {
      lines.push(
        `Dates: ${quote.request.pickupDate} → ${quote.request.dropoffDate}`
      );
    }
    if (quote.request.pickupLocation) {
      lines.push(`Pickup: ${quote.request.pickupLocation}`);
    }
  } else {
    if (quote.request.direction && quote.request.airport) {
      lines.push(
        `${quote.request.direction === 'arrival' ? 'Arrival' : 'Departure'} at ${quote.request.airport.toUpperCase()}`
      );
    }
    if (quote.request.transferDate && quote.request.timeWindow) {
      lines.push(
        `Transfer: ${quote.request.transferDate} · ${quote.request.timeWindow}`
      );
    }
  }

  /* Total */
  if (quote.breakdown.total > 0) {
    lines.push(``, `Estimate: ${formatKES(quote.breakdown.total)}`);
  }

  /* Contact */
  lines.push(``, `From: ${quote.request.contact.name}`);
  if (quote.request.contact.phone) {
    lines.push(`Phone: ${quote.request.contact.phone}`);
  }

  const text = lines.join('\n');
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
}

/* ─────────────────────────────────────────────────────────────
   EMAIL HTML
   Copper accents on ivory. Matches the contact form's email
   template so both look like they came from the same company.
   ───────────────────────────────────────────────────────────── */

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildQuoteEmailHtml(quote: Quote): string {
  const { request, breakdown } = quote;

  /* Vehicle / service summary line */
  const summaryTitle = (() => {
    if (request.service === 'car-hire' && request.vehicleId) {
      const vehicle = getVehicle(request.vehicleId);
      return vehicle?.name ?? 'Car hire';
    }
    if (request.service === 'airport-transfer') {
      return request.direction === 'departure'
        ? 'Airport transfer — departure'
        : 'Airport transfer — arrival';
    }
    return 'Royride quote';
  })();

  /* Line items HTML */
  const lineItemsHtml = breakdown.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #EFEAE0; vertical-align: top;">
          <div style="font-size: 14px; color: #0E0E10; font-weight: 500;">${esc(item.label)}</div>
          ${
            item.detail
              ? `<div style="font-size: 12px; color: #71717A; margin-top: 2px;">${esc(item.detail)}</div>`
              : ''
          }
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #EFEAE0; text-align: right; vertical-align: top; white-space: nowrap;">
          <span style="font-size: 14px; color: #0E0E10; font-variant-numeric: tabular-nums;">
            ${item.amount > 0 ? formatKES(item.amount) : '—'}
          </span>
        </td>
      </tr>
    `
    )
    .join('');

  /* Trip details block */
  const tripDetails: string[] = [];
  if (request.service === 'car-hire') {
    if (request.pickupLocation)
      tripDetails.push(`<strong>Pickup:</strong> ${esc(request.pickupLocation)}`);
    if (request.returnLocation)
      tripDetails.push(`<strong>Return:</strong> ${esc(request.returnLocation)}`);
    if (request.pickupDate) tripDetails.push(`<strong>From:</strong> ${esc(request.pickupDate)}`);
    if (request.dropoffDate) tripDetails.push(`<strong>To:</strong> ${esc(request.dropoffDate)}`);
  } else {
    if (request.airport)
      tripDetails.push(`<strong>Airport:</strong> ${esc(request.airport.toUpperCase())}`);
    if (request.transferDate) tripDetails.push(`<strong>Date:</strong> ${esc(request.transferDate)}`);
    if (request.timeWindow) tripDetails.push(`<strong>Time:</strong> ${esc(request.timeWindow)}`);
    if (request.counterpartAddress)
      tripDetails.push(`<strong>Address:</strong> ${esc(request.counterpartAddress)}`);
    if (request.flightNumber)
      tripDetails.push(`<strong>Flight:</strong> ${esc(request.flightNumber)}`);
  }

  const tripHtml =
    tripDetails.length > 0
      ? `<div style="background: #F7F4EE; border-radius: 8px; padding: 18px; margin-bottom: 24px; font-size: 13px; color: #3F3F46; line-height: 1.7;">
          ${tripDetails.join('<br/>')}
        </div>`
      : '';

  /* Manual quote warning */
  const manualQuoteNote = breakdown.requiresManualQuote
    ? `<div style="background: #FBF3EC; border: 1px solid #E3A468; border-radius: 8px; padding: 14px 16px; margin-top: 20px; font-size: 13px; color: #87461B; line-height: 1.5;">
        <strong>One item needs a custom quote.</strong> We'll confirm final pricing for that item when we reply.
      </div>`
    : '';

  return `
    <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #0E0E10; background: #FCFBF8;">

      <!-- Copper top bar -->
      <div style="height: 4px; background: linear-gradient(90deg, #D98A44, #C2702E, #A85A22); border-radius: 2px; margin-bottom: 32px;"></div>

      <!-- Header -->
      <div style="border-left: 3px solid #C2702E; padding-left: 16px; margin-bottom: 28px;">
        <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #C2702E; font-weight: 600; margin-bottom: 6px;">
          Your Quote · ${esc(quote.id)}
        </div>
        <h1 style="font-size: 26px; margin: 0; color: #070708; letter-spacing: -0.3px; font-weight: 500; font-family: Georgia, serif;">
          ${esc(summaryTitle)}
        </h1>
      </div>

      <!-- Greeting -->
      <p style="font-size: 15px; color: #3F3F46; line-height: 1.6; margin-bottom: 24px;">
        Hi ${esc(request.contact.name.split(' ')[0])},
      </p>
      <p style="font-size: 15px; color: #3F3F46; line-height: 1.6; margin-bottom: 28px;">
        Thanks for the enquiry — here's your estimate. Reply to this email
        or call us directly and we'll confirm within 2 hours during business
        hours.
      </p>

      <!-- Trip details -->
      ${tripHtml}

      <!-- Price breakdown -->
      <div style="margin-bottom: 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          ${lineItemsHtml}

          <!-- Total row -->
          <tr>
            <td style="padding: 20px 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #71717A; font-weight: 600; border-top: 2px solid #0E0E10;">
              Estimated Total
            </td>
            <td style="padding: 20px 0 0; text-align: right; border-top: 2px solid #0E0E10;">
              <span style="font-size: 22px; color: #070708; font-family: Georgia, serif; font-variant-numeric: tabular-nums; letter-spacing: -0.3px;">
                ${formatKES(breakdown.total)}
              </span>
            </td>
          </tr>
        </table>
      </div>

      ${manualQuoteNote}

      <!-- Validity -->
      <p style="font-size: 12px; color: #71717A; line-height: 1.6; margin-top: 24px; margin-bottom: 28px;">
        This estimate is valid for ${quote.validForHours} hours.
        Final pricing confirmed when we speak.
      </p>

      <!-- CTAs -->
      <div style="border-top: 1px solid #EFEAE0; padding-top: 24px; margin-bottom: 24px;">
        <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #71717A; font-weight: 600; margin-bottom: 12px;">
          Ready to book?
        </div>
        <a href="tel:${esc(BRAND.phones[0].replace(/\s/g, ''))}" style="display: inline-block; padding: 14px 24px; background: linear-gradient(135deg, #E3A468, #C2702E); color: #070708; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 13px; letter-spacing: 0.5px;">
          Call ${esc(BRAND.phones[0])}
        </a>
      </div>

      <!-- Footer -->
      <p style="font-size: 11px; color: #A1A1AA; line-height: 1.7; margin: 0;">
        ${esc(BRAND.fullName)}<br/>
        ${esc(CONTACT.address.short)}<br/>
        Sent ${new Date(quote.createdAt).toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' })} EAT
      </p>
    </div>
  `;
}
