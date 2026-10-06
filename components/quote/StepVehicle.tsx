'use client';

import { useMemo } from 'react';
import { motion } from 'motion/react';
import { Check, Users, Luggage, Fuel, Car } from 'lucide-react';
import {
  getVisibleVehicles,
  formatPrice,
  type Vehicle,
} from '../../lib/vehicles';
import { daysBetween, formatKES } from '../../lib/quote';

/* ─────────────────────────────────────────────────────────────
   STEP 3 — VEHICLE
   Pick a vehicle from the fleet.

   Only shown for car hire. Airport transfers get assigned a
   vehicle based on passenger count.

   Features:
     • Sorted by price (cheapest first)
     • Popular vehicles surface to the top of their price tier
     • Each card shows seats, luggage, fuel, transmission
     • Selected card expands slightly, gets copper ring
     • Live total updates in the summary panel via parent state

   Not the same as VehicleCard:
     • No image, no description, no gallery link
     • Just the facts a quote needs
     • Compact enough to scan quickly on mobile
   ───────────────────────────────────────────────────────────── */

interface StepVehicleProps {
  value: string;
  onChange: (id: string) => void;
  pickupDate: string;
  dropoffDate: string;
}

export function StepVehicle({
  value,
  onChange,
  pickupDate,
  dropoffDate,
}: StepVehicleProps) {
  const days = daysBetween(pickupDate, dropoffDate);

  /* ── Fleet sorted by price (popular first within tiers) ── */
  const vehicles = useMemo(() => {
    const list = [...getVisibleVehicles()];
    return list.sort((a, b) => {
      /* Popular first */
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      /* Then price ascending */
      return a.dailyRate - b.dailyRate;
    });
  }, []);

  return (
    <div>
      {/* ── Section header ── */}
      <header className="mb-8 lg:mb-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-600 mb-3">
          Step 03 — Choose a vehicle
        </p>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink leading-[1.1] tracking-[-0.015em] mb-3">
          Pick your ride.
        </h2>
        <p className="text-sm lg:text-base text-ink-muted leading-relaxed font-light max-w-xl">
          {days
            ? `${days} day${days === 1 ? '' : 's'} · prices shown per day`
            : 'Prices shown per day. Choose whichever fits your trip.'}
        </p>
      </header>

      {/* ── Fleet list ── */}
      <div
        role="radiogroup"
        aria-label="Choose a vehicle"
        className="space-y-3"
      >
        {vehicles.map((vehicle, i) => (
          <VehicleOption
            key={vehicle.id}
            vehicle={vehicle}
            selected={value === vehicle.id}
            onSelect={() => onChange(vehicle.id)}
            index={i}
            days={days}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VEHICLE OPTION
   One row per vehicle.
   ───────────────────────────────────────────────────────────── */

function VehicleOption({
  vehicle,
  selected,
  onSelect,
  index,
  days,
}: {
  vehicle: Vehicle;
  selected: boolean;
  onSelect: () => void;
  index: number;
  days: number | null;
}) {
  /* Per-day and total pricing */
  const total = days ? vehicle.dailyRate * days : vehicle.dailyRate;

  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        group relative w-full text-left
        flex items-start gap-4
        p-4 sm:p-5 rounded-xl border
        transition-all duration-300 ease-lux
        focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2
        ${
          selected
            ? 'bg-surface border-copper-500 ring-4 ring-copper-500/15 shadow-[0_12px_32px_rgba(14,14,16,0.08)]'
            : 'bg-surface border-border hover:border-copper-500/40 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(14,14,16,0.06)]'
        }
      `}
    >
      {/* ═══ Selection indicator ═══ */}
      <span
        aria-hidden="true"
        className={`
          shrink-0 mt-0.5 flex items-center justify-center
          w-5 h-5 rounded-full border-2
          transition-all duration-300 ease-lux
          ${
            selected
              ? 'bg-copper-500 border-copper-500'
              : 'bg-transparent border-border-strong group-hover:border-copper-500/60'
          }
        `}
      >
        {selected && (
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Check size={11} strokeWidth={3.5} className="text-obsidian-950" />
          </motion.span>
        )}
      </span>

      {/* ═══ Content ═══ */}
      <div className="flex-1 min-w-0">

        {/* Name + category badge */}
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h3
            className={`
              font-display text-lg sm:text-xl leading-tight tracking-[-0.01em]
              transition-colors duration-300
              ${selected ? 'text-copper-700' : 'text-ink'}
            `}
          >
            {vehicle.name}
          </h3>

          {vehicle.popular && (
            <span className="shrink-0 px-2 py-0.5 bg-copper-500/[0.10] border border-copper-500/25 text-copper-700 text-[9px] font-bold uppercase tracking-[0.14em] rounded-md">
              Popular
            </span>
          )}
        </div>

        {/* Category + fleet size */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-subtle mb-3">
          {vehicle.category}
          {vehicle.units > 1 && (
            <span className="text-ink-muted"> · {vehicle.units} available</span>
          )}
        </p>

        {/* Spec strip */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-ink-muted">
          <Spec icon={<Users size={12} />} value={`${vehicle.seats} seats`} />
          <Spec
            icon={<Luggage size={12} />}
            value={`${vehicle.luggage} bags`}
          />
          <Spec
            icon={<Fuel size={12} />}
            value={vehicle.fuel}
          />
          <Spec
            icon={<Car size={12} />}
            value={
              vehicle.transmission === 'Automatic' ? 'Auto' : 'Manual'
            }
          />
        </div>
      </div>

      {/* ═══ Price column ═══ */}
      <div className="shrink-0 text-right">
        <p className="font-display text-lg sm:text-xl text-ink leading-none tabular-nums">
          {formatPrice(vehicle.dailyRate)}
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-subtle mt-1">
          per day
        </p>

        {days && (
          <p className="text-[11px] text-copper-600 mt-2 font-medium tabular-nums">
            {formatKES(total)} total
          </p>
        )}
      </div>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────
   SPEC
   Small inline icon + value.
   ───────────────────────────────────────────────────────────── */

function Spec({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <span className="text-ink-subtle shrink-0">{icon}</span>
      <span>{value}</span>
    </span>
  );
}
