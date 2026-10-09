'use client';

import Image from 'next/image';
import {
  Users,
  Fuel,
  Cog,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { type Vehicle, formatPrice } from '../../lib/vehicles';

/* ─────────────────────────────────────────────────────────────
   VEHICLE CARD
   The most-viewed component after the navbar.

   Design:
     • Compact layout — image, name, price, spec strip, text link
     • No bordered boxes, no description, no mode pills
     • Mount animation (no whileInView) — cards render immediately
       when the page loads, with a subtle stagger

   Used in: /vehicles grid, FeaturedFleet carousel
   ───────────────────────────────────────────────────────────── */

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
  onViewDetails?: () => void;
  priority?: boolean;
}

export function VehicleCard({
  vehicle,
  index = 0,
  onViewDetails,
  priority,
}: VehicleCardProps) {
  const hasImage = Boolean(vehicle.image);

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index, 5) * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onViewDetails}
      role={onViewDetails ? 'button' : undefined}
      tabIndex={onViewDetails ? 0 : undefined}
      onKeyDown={(e) => {
        if (onViewDetails && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onViewDetails();
        }
      }}
      className={`
        group relative flex flex-col
        bg-surface border border-border rounded-2xl overflow-hidden
        transition-all duration-500 ease-lux
        hover:border-copper-500/40 hover:-translate-y-1
        hover:shadow-[0_12px_32px_rgba(14,14,16,0.10),0_32px_64px_rgba(14,14,16,0.08)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2
        ${onViewDetails ? 'cursor-pointer' : ''}
      `}
    >
      {/* ═══════════════════════════════════════════
          VISUAL PANEL
          ═══════════════════════════════════════════ */}
      <div className="relative w-full aspect-[16/10] overflow-hidden transform-gpu bg-obsidian-950 shrink-0">

        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${vehicle.accentFrom} 0%, ${vehicle.accentTo} 100%)`,
          }}
        />

        {hasImage ? (
          <>
            <Image
              src={vehicle.image as string}
              alt={`${vehicle.name} — ${vehicle.category} available for hire in Nairobi`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-[900ms] ease-lux group-hover:scale-[1.06]"
              priority={priority ?? index === 0}
              loading={priority ?? index === 0 ? 'eager' : 'lazy'}
              quality={85}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(7,7,8,0.72) 0%, rgba(7,7,8,0.30) 30%, transparent 55%, rgba(7,7,8,0.15) 100%)',
              }}
            />
          </>
        ) : (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-55"
              style={{
                background:
                  'radial-gradient(ellipse at 70% 40%, rgba(194,112,46,0.35) 0%, transparent 60%)',
              }}
            />
            <div className="grain-overlay absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none" />
            <svg
              viewBox="0 0 200 100"
              className="absolute inset-0 w-full h-full p-8 text-white/35 transition-all duration-[700ms] ease-lux group-hover:text-white/60 group-hover:scale-[1.04]"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <path
                d={vehicle.silhouettePath}
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeLinejoin="round"
              />
            </svg>
          </>
        )}

        {/* Category + Popular */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
          <span className="px-2.5 py-1 bg-obsidian-950/70 backdrop-blur-md border border-white/10 rounded-md text-[10px] font-medium uppercase tracking-[0.16em] text-white/90">
            {vehicle.category}
          </span>
          {vehicle.popular && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-copper-500 rounded-md text-[10px] font-bold uppercase tracking-[0.16em] text-obsidian-950 shadow-[0_4px_12px_rgba(194,112,46,0.35)]">
              <Sparkles size={10} strokeWidth={2.5} />
              Popular
            </span>
          )}
        </div>

        {/* SKU + fleet count */}
        <div className="absolute bottom-3.5 left-3.5 z-10 flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/55">
            {vehicle.sku}
          </span>
          {vehicle.units > 1 && (
            <>
              <span
                aria-hidden="true"
                className="w-px h-3 bg-white/20"
              />
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/55">
                {vehicle.units} available
              </span>
            </>
          )}
        </div>

        {/* Corner action — reveals on hover */}
        <div
          aria-hidden="true"
          className="absolute top-3.5 right-3.5 z-10 opacity-0 translate-x-2 -translate-y-2 transition-all duration-400 ease-lux group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-copper-500 text-obsidian-950 shadow-[0_8px_24px_rgba(194,112,46,0.40)]">
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          CONTENT
          ═══════════════════════════════════════════ */}
      <div className="flex flex-col flex-1 p-5 lg:p-6">

        {/* Name */}
        <h3 className="font-display text-xl lg:text-2xl text-ink leading-tight tracking-[-0.01em] mb-2 group-hover:text-copper-700 transition-colors duration-300">
          {vehicle.name}
        </h3>

        {/* Price */}
        <p className="font-display text-lg lg:text-xl text-ink leading-none tabular-nums mb-5">
          {formatPrice(vehicle.dailyRate)}
          <span className="font-sans text-[11px] text-ink-subtle ml-1.5 tracking-wide">
            /day
          </span>
        </p>

        {/* Spec strip — no borders, inline */}
        <div className="flex items-center gap-3 py-1">
          <Spec
            icon={<Users size={13} />}
            value={`${vehicle.seats} seats`}
          />
          <span
            aria-hidden="true"
            className="w-px h-3.5 bg-border-strong"
          />
          <Spec
            icon={<Fuel size={13} />}
            value={vehicle.fuel}
          />
          <span
            aria-hidden="true"
            className="w-px h-3.5 bg-border-strong"
          />
          <Spec
            icon={<Cog size={13} />}
            value={
              vehicle.transmission === 'Automatic' ? 'Auto' : 'Manual'
            }
          />
        </div>

        {/* CTA — text link, left-aligned */}
        <div className="mt-auto pt-5">
          <span
            className="
              inline-flex items-center gap-2
              text-[11px] font-semibold uppercase tracking-[0.16em]
              text-copper-600
              transition-colors duration-300
              group-hover:text-copper-700
            "
          >
            <span>View details</span>
            <ArrowRight
              size={13}
              strokeWidth={2.5}
              className="transition-transform duration-300 ease-lux group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────
   SPEC
   ───────────────────────────────────────────────────────────── */
function Spec({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 min-w-0">
      <span className="text-ink-subtle shrink-0">{icon}</span>
      <span className="text-xs text-ink-muted whitespace-nowrap truncate">
        {value}
      </span>
    </span>
  );
}
