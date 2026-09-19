export const CONTACT = {
  whatsapp: '254780957810',
  whatsappMessage: 'Hello Royride, I would like to enquire about a car hire.',

  email: 'sales@royride.com',
  emailDisplay: 'sales@royride.com', // alias for clarity in components

  businessHours: [
    { days: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
    { days: 'Saturday', hours: '8:00 AM – 6:00 PM' },
    { days: 'Sunday', hours: 'By appointment' },
  ],

  address: {
    line1: 'Kibiku Road',
    line2: 'Off Eastern Bypass, Utawala',
    landmark: 'Near The Bus Bistro',
    city: 'Nairobi, Kenya',
    short: 'Utawala, Nairobi',
    full: 'Kibiku Road, Off Eastern Bypass, Utawala — Near The Bus Bistro, Nairobi',
  },

  // Royride Car Hire Ltd. — exact pin: -1.2776425, 36.9554776
  mapEmbedUrl:
    'https://www.google.com/maps?q=-1.2776425,36.9554776&z=17&output=embed',

  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=-1.2776425,36.9554776',

  shareUrl: 'https://maps.app.goo.gl/MwewVWCk5ACe9r9w9',
} as const;

export const SERVICE_OPTIONS = [
  'Self-Drive Hire',
  'Chauffeured Hire',
  'Airport Transfer',
  'Corporate Fleet',
  'Long-Term Rental',
  'Other Enquiry',
] as const;