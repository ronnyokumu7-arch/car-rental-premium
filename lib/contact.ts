export const CONTACT = {
  whatsapp: '254780957810',
  whatsappMessage: 'Hello, I would like to enquire about a your car hire services.',

  email: 'sales@royride.com',
  emailDisplay: 'sales@royride.com', // alias for clarity in components

  businessHours: [
    { days: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
    { days: 'Saturday', hours: '8:00 AM – 6:00 PM' },
    { days: 'Sunday', hours: 'Closed' },
  ],

  address: {
    line1: 'Royride Car Hire Ltd.',
    landmark: 'Near The Bus Bistro-Utawala',
    city: 'Nairobi, Kenya',
    short: 'Utawala, Nairobi',
    full: 'Royride Car Hire Ltd., Kibiku Road, Utawala, Nairobi',
  },

  // Royride Car Hire Ltd. — exact pin: -1.2776425, 36.9554776
  mapEmbedUrl:
    'https://www.google.com/maps?q=-1.277635,36.958060&z=17&output=embed',

  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=-1.2776425,36.9554776',

  shareUrl: 'https://maps.app.goo.gl/MwewVWCk5ACe9r9w9',
} as const;

export const SERVICE_OPTIONS = [
  'Self-Drive Hire',
  'Chauffeured Hire',
  'Airport Transfer',
  'Corporate Staff Transport',
  'Long-Term Rental',
  'Other Enquiry',
] as const;