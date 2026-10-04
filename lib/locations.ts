/* ─────────────────────────────────────────────────────────────
   LOCATIONS — Nairobi pickup & return locations.

   Fee semantics:
     fee = 0   → free (customer collects from / returns to our office)
     fee > 0   → paid delivery / collection (KES)
     fee = -1  → quote on request (custom address)

   Coordinates are stored so we can (a) render them on the contact
   map, (b) compute distance-based fees later, (c) feed schema.org.
   ───────────────────────────────────────────────────────────── */

export interface Location {
  /** Stable key — used in URLs, form values, and localStorage */
  value: string;
  /** Display label. No fee embedded — fee is rendered separately. */
  label: string;
  /** KES — see fee semantics above */
  fee: number;
  /** Nairobi sub-region — used for grouping in the picker */
  region?: string;
  /** Shown first / in a "Popular" group in the location picker */
  popular?: boolean;
  /** Optional coordinates for map + distance calc */
  lat?: number;
  lng?: number;
}

/* ─────────────────────────────────────────────────────────────
   LOCATIONS
   Order matters: popular locations first, then alphabetical-ish
   by region, then "custom" last. This is what users see.
   ───────────────────────────────────────────────────────────── */
export const LOCATIONS: Location[] = [
  {
    value: 'utawala-office',
    label: 'Utawala Office',
    fee: 0,
    region: 'Eastern Bypass',
    popular: true,
    // Royride HQ — matches CONTACT.address coords
    lat: -1.2776425,
    lng: 36.9554776,
  },
  {
    value: 'jkia',
    label: 'JKIA Airport',
    fee: 1500,
    region: 'Embakasi',
    popular: true,
    lat: -1.3192,
    lng: 36.9278,
  },
  {
    value: 'wilson-airport',
    label: 'Wilson Airport',
    fee: 2000,
    region: 'Langata',
    lat: -1.3219,
    lng: 36.8147,
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

/* ─────────────────────────────────────────────────────────────
   INTERNAL HELPERS
   ───────────────────────────────────────────────────────────── */

function findLocation(value: string): Location | undefined {
  return LOCATIONS.find((l) => l.value === value);
}

/* ─────────────────────────────────────────────────────────────
   PUBLIC API
   ───────────────────────────────────────────────────────────── */

/** Pickup fee for a given location value. Returns 0 if unknown. */
export function getPickupFee(value: string): number {
  return findLocation(value)?.fee ?? 0;
}

/**
 * Return fee logic:
 *   - "same-as-pickup"  → mirrors the pickup fee (round-trip)
 *   - Utawala Office    → 0 (customer returns the car to us)
 *   - Same value as pickup → 0 (already covered by the delivery fee)
 *   - Any other location → that location's fee
 */
export function getReturnFee(
  returnValue: string,
  pickupValue: string
): number {
  if (returnValue === 'same-as-pickup') return getPickupFee(pickupValue);
  if (returnValue === 'utawala-office') return 0;
  if (returnValue === pickupValue) return 0;
  return findLocation(returnValue)?.fee ?? 0;
}

/** True if either fee is "quote on request" (-1). */
export function requiresQuote(
  pickupValue: string,
  returnValue: string
): boolean {
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
 * Smart pickup label — swaps based on whether the location is free or paid.
 *   fee = 0   → "Pickup Location"
 *   fee > 0   → "Delivery Location"
 *   fee = -1  → "Custom Location"
 */
export function getPickupLabel(value: string): string {
  const fee = getPickupFee(value);
  if (fee === -1) return 'Custom Location';
  if (fee === 0) return 'Pickup Location';
  return 'Delivery Location';
}

/** Short fee summary for the pickup subtext. */
export function getPickupFeeLabel(value: string): string {
  const fee = getPickupFee(value);
  if (fee === -1) return 'Quote on request';
  if (fee === 0) return 'Free pickup — collect from our office';
  return `Delivery fee: KES ${fee.toLocaleString('en-KE')}`;
}

/**
 * Smart return fee label.
 * Distinguishes "same as pickup" / "free return to office" /
 * "paid collection from a different location".
 */
export function getReturnFeeLabel(
  returnValue: string,
  pickupValue: string
): string {
  const pickupFee = getPickupFee(pickupValue);
  const returnFee = getReturnFee(returnValue, pickupValue);

  if (returnFee === -1) return 'Quote on request';

  if (returnValue === 'same-as-pickup') {
    if (pickupFee === 0) return 'Same as pickup — no fee';
    if (pickupFee === -1) return 'Same as pickup — quote on request';
    return `Round-trip delivery: KES ${pickupFee.toLocaleString('en-KE')}`;
  }

  if (returnValue === 'utawala-office') {
    return 'Free return — bring it to our office';
  }

  if (returnValue === pickupValue && returnFee === 0) {
    return 'Return to same location — no extra fee';
  }

  if (returnFee > 0) {
    return `Collection fee: KES ${returnFee.toLocaleString('en-KE')}`;
  }

  return 'No fee';
}

/* ─────────────────────────────────────────────────────────────
   RETURN OPTIONS BUILDER
   Produces the dropdown for the "return location" field.
   "Same as pickup" is dynamic — shows the true cost inline.
   ───────────────────────────────────────────────────────────── */

export interface LocationOption {
  value: string;
  label: string;
  fee: number;
}

export function buildReturnOptions(pickupValue: string): LocationOption[] {
  const pickupFee = getPickupFee(pickupValue);

  let sameAsPickupLabel = 'Same as pickup';
  if (pickupFee === -1) {
    sameAsPickupLabel = 'Same as pickup (quote on request)';
  } else if (pickupFee > 0) {
    sameAsPickupLabel = `Same as pickup (+ KES ${pickupFee.toLocaleString(
      'en-KE'
    )})`;
  }

  return [
    { value: 'same-as-pickup', label: sameAsPickupLabel, fee: pickupFee },
    ...LOCATIONS.map((loc) => ({
      value: loc.value,
      label: loc.label,
      fee: loc.fee,
    })),
  ];
}

/* ─────────────────────────────────────────────────────────────
   DERIVED HELPERS — added for the new UI we're building
   ───────────────────────────────────────────────────────────── */

/** Locations grouped by region — for the picker's grouped list. */
export function getLocationsByRegion(): Record<string, Location[]> {
  return LOCATIONS.reduce<Record<string, Location[]>>((acc, loc) => {
    const region = loc.region ?? 'Other';
    (acc[region] ||= []).push(loc);
    return acc;
  }, {});
}

/** Popular locations only — for quick-pick chips in the booking bar. */
export function getPopularLocations(): Location[] {
  return LOCATIONS.filter((l) => l.popular);
}

/** Look up a full Location object. Returns undefined if not found. */
export function getLocation(value: string): Location | undefined {
  return findLocation(value);
}

/** All values as a typed tuple — useful for Zod enums in form validation. */
export const LOCATION_VALUES = LOCATIONS.map((l) => l.value) as [
  string,
  ...string[],
];
