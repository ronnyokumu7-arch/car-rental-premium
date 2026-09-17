export const BRAND = {
  name: 'ROYRIDE',
  fullName: 'Royride Car Hire',
  tagline: 'Premium Car Hire in Nairobi',
  location: 'Utawala, Nairobi, Kenya',
  phones: ['+254 780 957 810', '+254 791 174 592'],
  email: 'carhire@royride.com',
} as const;

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Vehicles', href: '/vehicles' },
  { label: 'Updates', href: '/updates' },
  { label: 'Contact', href: '/contact' },
] as const;