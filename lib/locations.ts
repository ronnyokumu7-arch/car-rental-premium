export interface Location {
  value: string;
  label: string;
  fee: number;      // KES — flat fee for pickup OR return at this location
  region?: string;  // For grouping in the dropdown
  popular?: boolean;
}

/**
 * Nairobi pickup & return locations.
 *
 * Fee logic:
 * - Utawala Office = free (customer collects from us)
 * - Other locations = flat delivery/collection fee
 *
 * Future upgrade: per-vehicle-category fees (small car vs Prado),
 * weight-aware pricing, distance-based calculation.
 */
export const LOCATIONS: Location[] = [
  {
    value: 'utawala-office',
    label: 'Utawala Office — Self-Collect',
    fee: 0,
    region: 'Eastern Bypass',
    popular: true,
  },
  {
    value: 'jkia',
    label: 'JKIA Airport',
    fee: 1500,
    region: 'Embakasi',
    popular: true,
  },
  {
    value: 'wilson-airport',
    label: 'Wilson Airport',
    fee: 2000,
    region: 'Langata',
  },
  {
    value: 'westlands',
    label: 'Westlands',
    fee: 2500,
    region: 'Westlands',
  },
  {
    value: 'parklands',
    label: 'Parklands',
    fee: 2500,
    region: 'Westlands',
  },
  {
    value: 'kilimani',
    label: 'Kilimani',
    fee: 2500,
    region: 'Dagoretti',
  },
  {
    value: 'lavington',
    label: 'Lavington',
    fee: 2500,
    region: 'Dagoretti',
  },
  {
    value: 'karen',
    label: 'Karen',
    fee: 3500,
    region: 'Langata',
  },
  {
    value: 'runda',
    label: 'Runda',
    fee: 3500,
    region: 'Westlands',
  },
  {
    value: 'muthaiga',
    label: 'Muthaiga',
    fee: 3500,
    region: 'Westlands',
  },
  {
    value: 'gigiri',
    label: 'Gigiri',
    fee: 3500,
    region: 'Westlands',
  },
  {
    value: 'custom',
    label: 'Custom Address — Request Quote',
    fee: -1,          // -1 signals "quote on request"
    region: 'Other',
  },
];

export const DEFAULT_PICKUP_LOCATION = 'utawala-office';
export const DEFAULT_RETURN_LOCATION = 'same-as-pickup';

/** Return options add "Same as pickup" as the default */
export const RETURN_OPTIONS = [
  {
    value: 'same-as-pickup',
    label: 'Same as pickup',
    fee: 0,
  },
  ...LOCATIONS.map((loc) => ({
    value: loc.value,
    label: loc.label,
    fee: loc.fee,
  })),
];

/** Compute the pickup fee from a location value. */
export function getPickupFee(value: string): number {
  const loc = LOCATIONS.find((l) => l.value === value);
  return loc?.fee ?? 0;
}

/**
 * Compute the return fee.
 * - "Same as pickup" → 0
 * - Return to Utawala Office → 0 (customer drops it off themselves)
 * - Return to any other location → that location's fee
 */
export function getReturnFee(
  returnValue: string,
  pickupValue: string
): number {
  if (returnValue === 'same-as-pickup') return 0;
  if (returnValue === 'utawala-office') return 0;
  if (returnValue === pickupValue) return 0;

  const loc = LOCATIONS.find((l) => l.value === returnValue);
  return loc?.fee ?? 0;
}

/** True if either fee is "quote on request" (-1). */
export function requiresQuote(pickupValue: string, returnValue: string): boolean {
  return (
    getPickupFee(pickupValue) === -1 ||
    getReturnFee(returnValue, pickupValue) === -1
  );
}

/** Format a KES fee for display. */
export function formatFee(fee: number): string {
  if (fee === 0) return 'Free';
  if (fee === -1) return 'Quote on request';
  return `KES ${fee.toLocaleString('en-KE')}`;
}
