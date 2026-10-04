/* ─────────────────────────────────────────────────────────────
   CONTACT — single source of truth for all contact channels.
   Used by: Footer, ContactForm, ContactInfo, ContactMap,
   LocalBusinessSchema, and the booking confirmation screens.
   ───────────────────────────────────────────────────────────── */
export const CONTACT = {
  /* ── WhatsApp ── */
  /** Digits only, no + or spaces — required by wa.me URL format */
  whatsapp: '254780957810',
  /** Default prefilled message when a user taps "Chat on WhatsApp" */
  whatsappMessage:
    'Hello Royride, I would like to enquire about your car hire services.',

  /* ── Email ── */
  email: 'sales@royride.com',
  /** Alias used where the display string may differ from the mailto target */
  emailDisplay: 'sales@royride.com',

  /* ── Hours ── */
  businessHours: [
    { days: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
    { days: 'Saturday', hours: '8:00 AM – 6:00 PM' },
    { days: 'Sunday', hours: 'Closed' },
  ],

  /* ── Address ──
     `short`  = footer, schema addressLocality
     `full`   = contact page, schema streetAddress
     `line1`  = legal entity name for footer/schema
  */
  address: {
    line1: 'Royride Car Hire Ltd.',
    landmark: 'Near The Bus Bistro — Utawala',
    city: 'Nairobi, Kenya',
    short: 'Utawala, Nairobi',
    full: 'Royride Car Hire Ltd., Kibiku Road, Utawala, Nairobi',
  },

  /* ── Maps ──
     Coordinates: -1.2776425, 36.9554776 (Royride Car Hire Ltd., Utawala)
     `mapEmbedUrl` is what the <iframe> loads.
     `directionsUrl` is what the "Get Directions" button opens.
     `shareUrl` is the short link for sharing.
  */
  mapEmbedUrl:
    'https://www.google.com/maps?q=-1.2776425,36.9554776&z=17&output=embed',

  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=-1.2776425,36.9554776',

  shareUrl: 'https://maps.app.goo.gl/MwewVWCk5ACe9r9w9',
} as const;

/* ─────────────────────────────────────────────────────────────
   SERVICE OPTIONS — dropdown values for contact form + enquiry.
   Order is intentional: highest-intent first.
   ───────────────────────────────────────────────────────────── */
export const SERVICE_OPTIONS = [
  'Self-Drive Hire',
  'Chauffeured Hire',
  'Airport Transfer',
  'Corporate Staff Transport',
  'Long-Term Rental',
  'Other Enquiry',
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];
export type Contact = typeof CONTACT;
