/* ─────────────────────────────────────────────────────────────
   VEHICLES — fleet catalog.

   Structure:
     Each entry = one MODEL (not one unit). A model has a `units`
     count representing how many physical cars of that model are
     in the fleet. Sum of all units MUST equal FLEET_SIZE.

   This data feeds:
     • /vehicles grid + filters
     • Homepage fleet preview
     • Vehicle modal / detail
     • Booking bar (price ranges, seat counts)
     • Schema.org Vehicle structured data
     • Trust bar ("46 vehicles in fleet")

   Pricing:
     dailyRate       = KES/day, self-drive base
     chauffeuredRate = KES/day, with driver. Omit if not offered.
   ───────────────────────────────────────────────────────────── */

export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
export type RentalMode = 'Self-Drive' | 'Chauffeured' | 'Both';
export type Transmission = 'Automatic' | 'Manual';

/* ─────────────────────────────────────────────────────────────
   CATEGORIES
   ───────────────────────────────────────────────────────────── */

export const VEHICLE_CATEGORIES = [
  'SUV',
  'Crossover',
  'Sedan',
  'Wagon',
  'Hatchback',
  'Van',
] as const;
export type VehicleCategory = (typeof VEHICLE_CATEGORIES)[number];

/* ─────────────────────────────────────────────────────────────
   VEHICLE INTERFACE
   ───────────────────────────────────────────────────────────── */

export interface Vehicle {
  /* ── Identity ── */
  id: string;
  sku: string;
  name: string;
  category: VehicleCategory;

  /* ── Fleet count ── */
  /** Number of physical cars of this model available. */
  units: number;

  /* ── Pricing ── */
  dailyRate: number;
  chauffeuredRate?: number;

  /* ── Specs ── */
  seats: number;
  /** Alternative seat configurations offered (e.g. [5, 7] for Prado) */
  seatOptions?: number[];
  doors: number;
  luggage: number;
  fuel: FuelType;
  /** Alternative fuel options offered (e.g. ['Petrol', 'Diesel']) */
  fuelOptions?: FuelType[];
  transmission: Transmission;
  mode: RentalMode;
  year: number;

  /* ── Marketing ── */
  description: string;
  features: string[];

  /* ── Presentation ── */
  image?: string;
  accentFrom: string;
  accentTo: string;
  silhouettePath: string;

  /* ── Merchandising ── */
  popular?: boolean;
  hidden?: boolean;
  slug?: string;
}

/* ─────────────────────────────────────────────────────────────
   FLEET SIZE — declared here so the codebase has one number
   to trust. The build-time check below enforces it.
   ───────────────────────────────────────────────────────────── */

export const FLEET_SIZE = 46;

/* ─────────────────────────────────────────────────────────────
   CATALOG
   Order = display order on /vehicles (popular first, then
   by rate descending, then alphabetically).
   ───────────────────────────────────────────────────────────── */

export const VEHICLES: Vehicle[] = [
  /* ─── SUV ─── */
  {
    id: 'prado-j150',
    sku: 'RYR-PRD-001',
    name: 'Toyota Prado J150',
    category: 'SUV',
    units: 6,
    dailyRate: 14000,
    chauffeuredRate: 18000,
    seats: 7,
    seatOptions: [5, 7],
    doors: 5,
    luggage: 4,
    fuel: 'Diesel',
    fuelOptions: ['Petrol', 'Diesel'],
    transmission: 'Automatic',
    mode: 'Both',
    year: 2021,
    popular: true,
    description:
      'The definitive Nairobi SUV. Commanding presence, all-terrain capability, and comfort for seven — built for executive travel and weekend escapes alike.',
    features: [
      '4WD',
      'Leather Interior',
      'Bluetooth',
      'Reverse Camera',
      'Roof Rails',
      'Cruise Control',
      'Climate Control',
    ],
    image: '/images/fleet/prado.jpg',
    accentFrom: '#0E0E10',
    accentTo: '#3F3F46',
    silhouettePath:
      'M12 62 L22 42 L42 32 L96 32 L120 44 L166 48 L178 62 L172 74 L20 74 Z',
  },
  {
    id: 'harrier',
    sku: 'RYR-HRR-002',
    name: 'Toyota Harrier',
    category: 'SUV',
    units: 2,
    dailyRate: 9000,
    chauffeuredRate: 13000,
    seats: 5,
    doors: 5,
    luggage: 3,
    fuel: 'Petrol',
    transmission: 'Automatic',
    mode: 'Both',
    year: 2020,
    description:
      'Sharp, quiet, and unmistakably premium. The Harrier glides through the city with a cabin that feels a class above — ideal for executives and discerning travelers.',
    features: [
      'Leather Interior',
      'Panoramic Roof',
      'Apple CarPlay',
      'Android Auto',
      'Reverse Camera',
      'Cruise Control',
      'Push-Start',
    ],
    accentFrom: '#18181B',
    accentTo: '#3F3F46',
    silhouettePath:
      'M14 62 L28 40 L52 30 L96 30 L124 42 L162 46 L172 62 L168 74 L18 74 Z',
  },

  /* ─── Crossover ─── */
  {
    id: 'mazda-cx5',
    sku: 'RYR-CX5-003',
    name: 'Mazda CX-5',
    category: 'Crossover',
    units: 6,
    dailyRate: 7500,
    chauffeuredRate: 11000,
    seats: 5,
    doors: 5,
    luggage: 2,
    fuel: 'Petrol',
    fuelOptions: ['Petrol', 'Diesel'],
    transmission: 'Automatic',
    mode: 'Both',
    year: 2020,
    popular: true,
    description:
      'Refined, quiet, and effortlessly smooth. The CX-5 pairs premium Japanese engineering with an elegant cabin — ideal for city driving and coastal road trips.',
    features: [
      'Sunroof',
      'Leather Interior',
      'Apple CarPlay',
      'Android Auto',
      'Reverse Camera',
      'Cruise Control',
    ],
    image: '/images/fleet/cx5.jpg',
    accentFrom: '#27272A',
    accentTo: '#52525B',
    silhouettePath:
      'M14 62 L26 40 L50 30 L98 30 L124 42 L162 46 L172 62 L168 74 L18 74 Z',
  },
  {
    id: 'nissan-xtrail',
    sku: 'RYR-XTR-004',
    name: 'Nissan X-Trail',
    category: 'Crossover',
    units: 5,
    dailyRate: 7000,
    seats: 5,
    seatOptions: [5, 7],
    doors: 5,
    luggage: 3,
    fuel: 'Petrol',
    transmission: 'Automatic',
    mode: 'Self-Drive',
    year: 2020,
    description:
      'Practical, spacious, and confident on any road. The X-Trail balances crossover comfort with genuine SUV capability — a favourite for families and long-distance trips.',
    features: [
      'Panoramic Roof',
      'Apple CarPlay',
      'Reverse Camera',
      'Cruise Control',
      'Keyless Entry',
      'Roof Rails',
    ],
    accentFrom: '#27272A',
    accentTo: '#3F3F46',
    silhouettePath:
      'M12 62 L24 40 L50 30 L98 30 L124 42 L162 46 L172 62 L168 74 L18 74 Z',
  },

  /* ─── Sedan / Wagon ─── */
  {
    id: 'toyota-axio',
    sku: 'RYR-AXO-005',
    name: 'Toyota Axio',
    category: 'Sedan',
    units: 4,
    dailyRate: 4000,
    seats: 5,
    doors: 4,
    luggage: 2,
    fuel: 'Petrol',
    transmission: 'Automatic',
    mode: 'Self-Drive',
    year: 2019,
    description:
      'Fuel-sipping, easy to park, and quietly well-built. The Axio is the smart city sedan — perfect for daily commutes and business errands across Nairobi.',
    features: [
      'Air Conditioning',
      'Bluetooth',
      'Reverse Camera',
      'USB Charging',
      'Keyless Entry',
    ],
    accentFrom: '#3F3F46',
    accentTo: '#52525B',
    silhouettePath:
      'M16 62 L28 46 L54 36 L100 36 L124 46 L162 50 L170 62 L166 74 L20 74 Z',
  },
  {
    id: 'toyota-fielder',
    sku: 'RYR-FLD-006',
    name: 'Toyota Fielder',
    category: 'Wagon',
    units: 6,
    dailyRate: 4000,
    seats: 5,
    doors: 5,
    luggage: 4,
    fuel: 'Petrol',
    transmission: 'Automatic',
    mode: 'Self-Drive',
    year: 2019,
    description:
      'All the economy of a sedan with a boot that swallows real luggage. The Fielder is the practical traveller\'s choice — road trips, airport runs, and everything in between.',
    features: [
      'Air Conditioning',
      'Bluetooth',
      'Reverse Camera',
      'Large Boot',
      'USB Charging',
      'Keyless Entry',
    ],
    accentFrom: '#3F3F46',
    accentTo: '#71717A',
    silhouettePath:
      'M14 62 L26 42 L52 32 L118 32 L142 42 L172 46 L178 62 L174 76 L18 76 Z',
  },

  /* ─── Van ─── */
  {
    id: 'toyota-noah',
    sku: 'RYR-NOH-007',
    name: 'Toyota Noah',
    category: 'Van',
    units: 3,
    dailyRate: 6500,
    seats: 7,
    doors: 5,
    luggage: 5,
    fuel: 'Petrol',
    transmission: 'Automatic',
    mode: 'Both',
    year: 2019,
    description:
      'Seven seats, sliding doors, and thoughtful cabin design. The Noah makes group travel comfortable — airport transfers, family trips, and corporate shuttles.',
    features: [
      '7 Seats',
      'Sliding Doors',
      'Air Conditioning',
      'Bluetooth',
      'USB Charging',
      'Fold-flat Rear Seats',
    ],
    accentFrom: '#18181B',
    accentTo: '#3F3F46',
    silhouettePath:
      'M10 64 L18 38 L34 28 L120 28 L146 40 L176 46 L182 62 L178 76 L14 76 Z',
  },
  {
    id: 'honda-stepwgn',
    sku: 'RYR-STW-008',
    name: 'Honda Stepwgn',
    category: 'Van',
    units: 1,
    dailyRate: 6500,
    seats: 7,
    doors: 5,
    luggage: 6,
    fuel: 'Petrol',
    transmission: 'Automatic',
    mode: 'Both',
    year: 2019,
    popular: true,
    description:
      'Spacious, practical, and economical. Seven seats, sliding doors, and generous luggage capacity — perfect for family trips and group airport transfers.',
    features: [
      '7 Seats',
      'Sliding Doors',
      'Air Conditioning',
      'Bluetooth',
      'USB Charging',
      'Fold-flat Rear Seats',
    ],
    image: '/images/fleet/stepwgn.jpg',
    accentFrom: '#18181B',
    accentTo: '#3F3F46',
    silhouettePath:
      'M10 64 L18 38 L34 28 L120 28 L146 40 L176 46 L182 62 L178 76 L14 76 Z',
  },

  /* ─── Hatchback / Small cars ─── */
  {
    id: 'mazda-demio',
    sku: 'RYR-DMO-009',
    name: 'Mazda Demio',
    category: 'Hatchback',
    units: 5,
    dailyRate: 3500,
    seats: 5,
    doors: 5,
    luggage: 2,
    fuel: 'Petrol',
    transmission: 'Automatic',
    mode: 'Self-Drive',
    year: 2019,
    description:
      'Small, nimble, and remarkably economical. The Demio is the perfect city runabout — easy to park, light on fuel, and quietly comfortable.',
    features: [
      'Air Conditioning',
      'Bluetooth',
      'USB Charging',
      'Compact Size',
      'Keyless Entry',
    ],
    accentFrom: '#52525B',
    accentTo: '#71717A',
    silhouettePath:
      'M18 62 L30 44 L56 36 L98 36 L120 46 L156 50 L166 62 L162 74 L22 74 Z',
  },
  {
    id: 'nissan-note',
    sku: 'RYR-NTE-010',
    name: 'Nissan Note',
    category: 'Hatchback',
    units: 5,
    dailyRate: 3500,
    seats: 5,
    doors: 5,
    luggage: 2,
    fuel: 'Petrol',
    transmission: 'Automatic',
    mode: 'Self-Drive',
    year: 2019,
    description:
      'Rooomy for its class, gentle on fuel, and smooth around town. The Note is a practical, no-fuss option for everyday errands and short trips.',
    features: [
      'Air Conditioning',
      'Bluetooth',
      'Reverse Camera',
      'USB Charging',
      'Keyless Entry',
    ],
    accentFrom: '#52525B',
    accentTo: '#71717A',
    silhouettePath:
      'M16 62 L28 42 L54 34 L98 34 L122 44 L158 48 L168 62 L164 74 L20 74 Z',
  },
  {
    id: 'suzuki-swift',
    sku: 'RYR-SWF-011',
    name: 'Suzuki Swift',
    category: 'Hatchback',
    units: 3,
    dailyRate: 3500,
    seats: 5,
    doors: 5,
    luggage: 2,
    fuel: 'Petrol',
    transmission: 'Automatic',
    mode: 'Self-Drive',
    year: 2020,
    description:
      'Light, quick, and uncommonly fun to drive. The Swift turns Nairobi traffic into something approaching enjoyable — and sips fuel doing it.',
    features: [
      'Air Conditioning',
      'Bluetooth',
      'Reverse Camera',
      'USB Charging',
      'Keyless Entry',
    ],
    accentFrom: '#52525B',
    accentTo: '#71717A',
    silhouettePath:
      'M18 62 L30 44 L54 36 L96 36 L118 46 L154 50 L164 62 L160 74 L22 74 Z',
  },
];

/* ─────────────────────────────────────────────────────────────
   BUILD-TIME FLEET CHECK
   If someone edits VEHICLES and forgets to update FLEET_SIZE
   (or vice versa), this throws during `next build` — not at
   runtime in front of a customer.
   ───────────────────────────────────────────────────────────── */

if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
  const computed = VEHICLES.reduce((sum, v) => sum + v.units, 0);
  if (computed !== FLEET_SIZE) {
    throw new Error(
      `[vehicles] Fleet size mismatch: VEHICLES sums to ${computed} units, ` +
        `but FLEET_SIZE is declared as ${FLEET_SIZE}. ` +
        `Update either the units per model or the FLEET_SIZE constant.`
    );
  }
}

/* ─────────────────────────────────────────────────────────────
   DERIVED HELPERS
   ───────────────────────────────────────────────────────────── */

export function getVisibleVehicles(): Vehicle[] {
  return VEHICLES.filter((v) => !v.hidden);
}

export function getPopularVehicles(): Vehicle[] {
  return getVisibleVehicles().filter((v) => v.popular);
}

export function getVehicle(idOrSlug: string): Vehicle | undefined {
  return VEHICLES.find((v) => v.id === idOrSlug || v.slug === idOrSlug);
}

export function getPriceRange(): { min: number; max: number } {
  const visible = getVisibleVehicles();
  if (visible.length === 0) return { min: 0, max: 0 };
  const rates = visible.map((v) => v.dailyRate);
  return { min: Math.min(...rates), max: Math.max(...rates) };
}

export function getAvailableCategories(): VehicleCategory[] {
  const seen = new Set<VehicleCategory>();
  getVisibleVehicles().forEach((v) => seen.add(v.category));
  return VEHICLE_CATEGORIES.filter((c) => seen.has(c));
}

/** Total vehicles in fleet (derived — matches FLEET_SIZE). */
export function getFleetSize(): number {
  return VEHICLES.reduce((sum, v) => sum + v.units, 0);
}

/** Format a KES amount for display. */
export function formatPrice(amount: number): string {
  return `KES ${amount.toLocaleString('en-KE')}`;
}
