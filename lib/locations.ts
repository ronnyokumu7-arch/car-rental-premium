export interface Location {
  value: string;
  label: string;
  fee: number;      // KES — flat fee for pickup OR return at this location
  region?: string;
  popular?: boolean;
}

/**
 * Nairobi pickup & return locations.
 *
 * Fee semantics:
 * - fee = 0   → customer collects from / returns to us (free)
 * - fee > 0   → we deliver / collect the vehicle (paid)
 * - fee = -1  → quote on request (custom address)
 */
export const LOCATIONS: Location[] = [
  {
    value: 'utawala-office',
    label: 'Utawala Office | Free',
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
    fee: -1,
    region: 'Other',
  },
];

export const DEFAULT_PICKUP_LOCATION = 'utawala-office';
export const DEFAULT_RETURN_LOCATION = 'same-as-pickup';

/** Compute the pickup fee from a location value. */
export function getPickupFee(value: string): number {
  const loc = LOCATIONS.find((l) => l.value === value);
  return loc?.fee ?? 0;
}

/**
 * Compute the return fee.
 *
 * Logic:
 * - "Same as pickup" → mirrors pickup fee (round-trip delivery)
 * - Return to Utawala Office → always 0 (customer drops car to us)
 * - Return to any other location → that location's fee
 */
export function getReturnFee(
  returnValue: string,
  pickupValue: string
): number {
  if (returnValue === 'same-as-pickup') {
    return getPickupFee(pickupValue);
  }
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

/**
 * Smart pickup label — changes based on whether the location is free or paid.
 *
 *   fee = 0     → "Pickup Location"
 *   fee > 0     → "Delivery Location"
 *   fee = -1    → "Custom Location"
 */
export function getPickupLabel(value: string): string {
  const fee = getPickupFee(value);
  if (fee === -1) return 'Custom Location';
  if (fee === 0) return 'Pickup Location';
  return 'Delivery Location';
}

/**
 * Smart pickup fee subtext — explains what the fee means.
 *
 *   fee = 0     → "Free pickup — collect from our Utawala office"
 *   fee > 0     → "Delivery fee: KES X"
 *   fee = -1    → "Quote on request"
 */
export function getPickupFeeLabel(value: string): string {
  const fee = getPickupFee(value);
  if (fee === -1) return 'Quote on request';
  if (fee === 0) return 'Free pickup — collect from our office';
  return `Delivery fee: KES ${fee.toLocaleString('en-KE')}`;
}

/**
 * Smart return fee subtext — distinguishes pickup from collection.
 *
 *   returnValue = "same-as-pickup" AND pickup free   → "Same as pickup — free"
 *   returnValue = "same-as-pickup" AND pickup paid   → "Round-trip delivery: KES X"
 *   returnValue = utawala-office                     → "Free return — bring it to us"
 *   returnValue = a paid location                    → "Collection fee: KES X"
 *   returnValue = custom                             → "Quote on request"
 */
export function getReturnFeeLabel(
  returnValue: string,
  pickupValue: string
): string {
  const pickupFee = getPickupFee(pickupValue);
  const returnFee = getReturnFee(returnValue, pickupValue);

  // Custom
  if (returnFee === -1) return 'Quote on request';

  // Same as pickup
  if (returnValue === 'same-as-pickup') {
    if (pickupFee === 0) return 'Same as pickup — no fee';
    if (pickupFee === -1) return 'Same as pickup — quote on request';
    return `Round-trip delivery: KES ${pickupFee.toLocaleString('en-KE')}`;
  }

  // Return to Utawala Office (free)
  if (returnValue === 'utawala-office') {
    return 'Free return — bring it to our office';
  }

  // Return to the same location as pickup (already paid as delivery)
  if (returnValue === pickupValue && returnFee === 0) {
    return 'Return to same location — no extra fee';
  }

  // Return to a different paid location
  if (returnFee > 0) {
    return `Collection fee: KES ${returnFee.toLocaleString('en-KE')}`;
  }

  return 'No fee';
}

/**
 * Build the return options list.
 * The "Same as pickup" option's label is DYNAMIC — shows the current
 * pickup fee inline so users see the true return cost before committing.
 */
export function buildReturnOptions(pickupValue: string): {
  value: string;
  label: string;
  fee: number;
}[] {
  const pickupFee = getPickupFee(pickupValue);

  let sameAsPickupLabel = 'Same as pickup';
  if (pickupFee === -1) {
    sameAsPickupLabel = 'Same as pickup (Quote on request)';
  } else if (pickupFee > 0) {
    sameAsPickupLabel = `Same as pickup (+ KES ${pickupFee.toLocaleString(
      'en-KE'
    )})`;
  }

  return [
    {
      value: 'same-as-pickup',
      label: sameAsPickupLabel,
      fee: pickupFee,
    },
    ...LOCATIONS.map((loc) => ({
      value: loc.value,
      label: loc.label,
      fee: loc.fee,
    })),
  ];
}
