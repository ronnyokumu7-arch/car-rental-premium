/* ─────────────────────────────────────────────────────────────
   AIRPORT TRANSFER OPTIONS
   Shared between the server action and the client tab.
   Kept OUT of the 'use server' file because 'use server' only
   allows async function exports.
   ───────────────────────────────────────────────────────────── */

export const AIRPORTS = [
  { value: 'jkia', label: 'JKIA — Jomo Kenyatta Intl.' },
  { value: 'wilson', label: 'Wilson Airport' },
] as const;

export type AirportValue = (typeof AIRPORTS)[number]['value'];

export const TIME_WINDOWS = [
  { value: 'early-morning', label: 'Early morning', hint: '4:00 – 7:00' },
  { value: 'morning',       label: 'Morning',       hint: '7:00 – 11:00' },
  { value: 'midday',        label: 'Midday',        hint: '11:00 – 14:00' },
  { value: 'afternoon',     label: 'Afternoon',     hint: '14:00 – 17:00' },
  { value: 'evening',       label: 'Evening',       hint: '17:00 – 21:00' },
  { value: 'night',         label: 'Night',         hint: '21:00 – 4:00' },
] as const;

export type TimeWindowValue = (typeof TIME_WINDOWS)[number]['value'];

export const PASSENGER_OPTIONS = [
  { value: 'any', label: 'Any' },
  { value: '1',   label: '1' },
  { value: '2',   label: '2' },
  { value: '4',   label: '4' },
  { value: '6+',  label: '6+' },
] as const;

export const TRANSFER_VEHICLES = [
  { value: '', label: 'Any vehicle' },
  { value: 'Sedan', label: 'Sedan' },
  { value: 'SUV',   label: 'SUV' },
  { value: 'Van',   label: 'Van' },
] as const;
