/* ─────────────────────────────────────────────────────────────
   QUOTE — pricing logic + ID generation.

   This file is the single source of truth for:
     • How much a rental/transfer costs
     • What a quote ID looks like
     • What shape a quote object has

   Used by:
     • app/actions/sendQuote.ts (server)
     • components/quote/* (client)
     • Future: app/quote/[id]/page.tsx (shareable URL)

   Pricing rules:
     • Daily rate × days for car hire
     • Pickup + return fees from lib/locations.ts
     • Flat airport fee from lib/locations.ts
     • No multi-day discounts (yet — add later)

   IMPORTANT: This is an ESTIMATE engine, not a billing engine.
   Real prices can differ based on season, availability, and
   the concierge's discretion. Email + WhatsApp copy must say so.
   ───────────────────────────────────────────────────────────── */

import {
  getPickupFee,
  getReturnFee,
  requiresQuote as locationRequiresQuote,
} from './locations';
import { getVehicle, type Vehicle } from './vehicles';

/* ─────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────── */

export type QuoteService = 'car-hire' | 'airport-transfer';

export type QuoteDeliveryMethod = 'email' | 'whatsapp';

export interface QuoteLineItem {
  /** Short label — "Toyota Prado J150 · 3 days" */
  label: string;
  /** Optional secondary line — "Delivery: JKIA Airport" */
  detail?: string;
  /** KES amount for this line */
  amount: number;
}

export interface QuoteBreakdown {
  /** Line items, in display order */
  items: QuoteLineItem[];
  /** Sum of all line items, in KES */
  total: number;
  /** True if any part requires a custom quote (fee === -1) */
  requiresManualQuote: boolean;
}

export interface QuoteContact {
  name: string;
  phone: string;
  email?: string;
}

export interface QuoteRequest {
  service: QuoteService;

  /* ── Car hire specific ── */
  vehicleId?: string;
  pickupLocation?: string;
  returnLocation?: string;
  pickupDate?: string;
  dropoffDate?: string;

  /* ── Airport transfer specific ── */
  direction?: 'arrival' | 'departure';
  airport?: 'jkia' | 'wilson';
  transferDate?: string;
  timeWindow?: string;
  counterpartAddress?: string;
  passengers?: string;
  flightNumber?: string;

  /* ── Shared ── */
  contact: QuoteContact;
  delivery: QuoteDeliveryMethod;
  notes?: string;
}

export interface Quote {
  /** Human-readable reference — e.g. "RQR-7X4K2M" */
  id: string;
  /** ISO timestamp of when the quote was generated */
  createdAt: string;
  /** The original request */
  request: QuoteRequest;
  /** The computed price breakdown */
  breakdown: QuoteBreakdown;
  /** Estimated validity window in hours */
  validForHours: number;
}

/* ─────────────────────────────────────────────────────────────
   QUOTE ID
   Format: RQR-XXXXXX
   Uses an unambiguous alphabet (no 0/O/1/I/L) so customers can
   read it over the phone without confusion.
   ───────────────────────────────────────────────────────────── */

const ID_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no 0/O/1/I/L
const ID_LENGTH = 6;

export function generateQuoteId(): string {
  let id = '';
  for (let i = 0; i < ID_LENGTH; i++) {
    id += ID_ALPHABET[Math.floor(Math.random() * ID_ALPHABET.length)];
  }
  return `RQR-${id}`;
}

/* ─────────────────────────────────────────────────────────────
   DATE HELPERS
   ───────────────────────────────────────────────────────────── */

/** Full days between two ISO dates. Returns null if invalid. */
export function daysBetween(
  pickup: string | undefined,
  dropoff: string | undefined
): number | null {
  if (!pickup || !dropoff) return null;
  const a = new Date(pickup).getTime();
  const b = new Date(dropoff).getTime();
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  const days = Math.round((b - a) / 86_400_000);
  return days > 0 ? days : null;
}

/** Format KES amount for display. */
export function formatKES(amount: number): string {
  return `KES ${amount.toLocaleString('en-KE')}`;
}

/* ─────────────────────────────────────────────────────────────
   BUILD QUOTE BREAKDOWN
   Takes a request, returns the itemized breakdown.

   Never throws on missing data — returns what it can and marks
   `requiresManualQuote` if anything is unresolvable.
   ───────────────────────────────────────────────────────────── */

export function buildQuoteBreakdown(
  request: QuoteRequest
): QuoteBreakdown {
  const items: QuoteLineItem[] = [];
  let requiresManualQuote = false;

  if (request.service === 'car-hire') {
    /* ── Car hire ── */
    const vehicle = request.vehicleId
      ? getVehicle(request.vehicleId)
      : undefined;

    if (vehicle) {
      const days = daysBetween(request.pickupDate, request.dropoffDate);

      if (days) {
        items.push({
          label: vehicle.name,
          detail: `${days} day${days === 1 ? '' : 's'} × ${formatKES(vehicle.dailyRate)}`,
          amount: vehicle.dailyRate * days,
        });
      }

      /* Pickup / return fees */
      if (request.pickupLocation) {
        const pickupFee = getPickupFee(request.pickupLocation);
        if (pickupFee === -1) {
          requiresManualQuote = true;
          items.push({
            label: 'Pickup',
            detail: 'Custom address — quote on request',
            amount: 0,
          });
        } else if (pickupFee > 0) {
          items.push({
            label: 'Pickup delivery',
            detail: 'Vehicle brought to you',
            amount: pickupFee,
          });
        }
      }

      if (
        request.returnLocation &&
        request.returnLocation !== 'same-as-pickup'
      ) {
        const returnFee = getReturnFee(
          request.returnLocation,
          request.pickupLocation ?? ''
        );
        if (returnFee === -1) {
          requiresManualQuote = true;
          items.push({
            label: 'Return collection',
            detail: 'Custom address — quote on request',
            amount: 0,
          });
        } else if (returnFee > 0) {
          items.push({
            label: 'Return collection',
            detail: 'Vehicle collected from you',
            amount: returnFee,
          });
        }
      }

      /* Flag if the location combo requires manual quote */
      if (
        request.pickupLocation &&
        request.returnLocation &&
        locationRequiresQuote(
          request.pickupLocation,
          request.returnLocation
        )
      ) {
        requiresManualQuote = true;
      }
    }
  } else {
    /* ── Airport transfer ── */
    if (request.airport) {
      const airportFee = getPickupFee(request.airport);
      if (airportFee === -1) {
        requiresManualQuote = true;
      } else if (airportFee > 0) {
        items.push({
          label:
            request.direction === 'departure'
              ? 'Departure transfer'
              : 'Arrival transfer',
          detail:
            request.airport === 'jkia'
              ? 'JKIA Airport'
              : 'Wilson Airport',
          amount: airportFee,
        });
      }
    }
  }

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return { items, total, requiresManualQuote };
}

/* ─────────────────────────────────────────────────────────────
   FULL QUOTE ASSEMBLY
   Combines request + breakdown + id + timestamp.
   ───────────────────────────────────────────────────────────── */

export function buildQuote(request: QuoteRequest): Quote {
  return {
    id: generateQuoteId(),
    createdAt: new Date().toISOString(),
    request,
    breakdown: buildQuoteBreakdown(request),
    validForHours: 48,
  };
}

/* ─────────────────────────────────────────────────────────────
   HELPERS FOR THE WIZARD
   ───────────────────────────────────────────────────────────── */

/** True when the request has enough info to compute a real estimate. */
export function isQuoteReady(request: Partial<QuoteRequest>): boolean {
  if (!request.service) return false;

  if (request.service === 'car-hire') {
    return Boolean(
      request.vehicleId &&
        request.pickupLocation &&
        request.pickupDate &&
        request.dropoffDate
    );
  }

  return Boolean(
    request.airport &&
      request.transferDate &&
      request.timeWindow
  );
}

/** True when the contact section is complete. */
export function isContactReady(
  contact: Partial<QuoteContact>,
  delivery: QuoteDeliveryMethod
): boolean {
  if (!contact.name || contact.name.trim().length < 2) return false;
  if (!contact.phone || contact.phone.trim().length < 9) return false;
  if (delivery === 'email' && (!contact.email || !contact.email.includes('@')))
    return false;
  return true;
}
