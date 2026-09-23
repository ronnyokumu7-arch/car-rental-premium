export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
export type RentalMode = 'Self-Drive' | 'Chauffeured' | 'Both';

export interface Vehicle {
  id: string;
  sku: string;
  name: string;
  category: string;
  dailyRate: number; // KES
  seats: number;
  fuel: FuelType;
  mode: RentalMode;
  popular?: boolean;
  transmission: 'Automatic' | 'Manual';
  description: string;
  features: string[];
  image?: string;
  accentFrom: string; // gradient start (used for SVG panel)
  accentTo: string; // gradient end
  silhouettePath: string; // SVG path for the vehicle outline
}

export const VEHICLES: Vehicle[] = [
  {
    id: 'prado-j150',
    sku: 'RYR-PRD-001',
    name: 'Toyota Prado J150',
    category: 'SUV',
    dailyRate: 14000,
    seats: 7,
    fuel: 'Diesel',
    mode: 'Both',
    popular: true,
    transmission: 'Automatic',
    description:
      'The definitive Nairobi SUV. Commanding presence, all-terrain capability, and comfort for seven — built for executive travel and weekend escapes alike.',
    features: [
      '4WD',
      'Leather Interior',
      'Bluetooth',
      'Reverse Camera',
      'Roof Rails',
    ],
    image: '/images/fleet/prado.jpg',
    accentFrom: '#0f2440',
    accentTo: '#1a365d',
    silhouettePath:
      'M12 62 L22 42 L42 32 L96 32 L120 44 L166 48 L178 62 L172 74 L20 74 Z',
  },
  {
    id: 'mazda-cx5',
    sku: 'RYR-CX5-002',
    name: 'Mazda CX-5',
    category: 'Crossover',
    dailyRate: 7500,
    seats: 5,
    fuel: 'Petrol',
    mode: 'Both',
    transmission: 'Automatic',
    description:
      'Refined, quiet, and effortlessly smooth. The CX-5 pairs premium Japanese engineering with an elegant cabin — ideal for city driving and coastal road trips.',
    features: [
      'Sunroof',
      'Leather Interior',
      'Apple CarPlay',
      'Reverse Camera',
      'Cruise Control',
    ],
    image: '/images/fleet/cx5.jpg',
    accentFrom: '#3d3d3d',
    accentTo: '#6b6b6b',
    silhouettePath:
      'M14 62 L26 40 L50 30 L98 30 L124 42 L162 46 L172 62 L168 74 L18 74 Z',
  },
  {
    id: 'honda-stepwgn',
    sku: 'RYR-STW-003',
    name: 'Honda Stepwgn',
    category: 'Van',
    dailyRate: 6500,
    seats: 8,
    fuel: 'Petrol',
    mode: 'Self-Drive',
    transmission: 'Automatic',
    description:
      'Spacious, practical, and economical. Eight seats, sliding doors, and generous luggage capacity — perfect for family trips and group airport transfers.',
    features: [
      '8 Seats',
      'Sliding Doors',
      'AC',
      'Bluetooth',
      'USB Charging',
    ],
    image: '/images/fleet/stepwgn.jpg',
    accentFrom: '#1a1a1a',
    accentTo: '#3d3d3d',
    silhouettePath:
      'M10 64 L18 38 L34 28 L120 28 L146 40 L176 46 L182 62 L178 76 L14 76 Z',
  },
];

export const formatPrice = (amount: number): string =>
  `KES ${amount.toLocaleString('en-KE')}`;