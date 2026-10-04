'use client';

import Image from 'next/image';
import {
  Users,
  Fuel,
  Cog,
  Key,
  UserCheck,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { type Vehicle, formatPrice } from '../../lib/vehicles';

/* ─────────────────────────────────────────────────────────────
   VEHICLE CARD
   The most-viewed component after the navbar. Used in:
     • /vehicles grid
     • Homepage fleet preview
     • Featured sections
     • Search results

   Design language:
     • Ivory surface, obsidian text, copper accents
     • Cinematic image treatment with layered gradients
     • Quiet hover — border warms, shadow deepens, image scales
     • Specs rendered as a hairline-divided strip, not boxes
   ───────────────────────────────────────────────────────────── */

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
  onViewDetails?: () => void;
  /** Set to true on the first card for LCP priority loading */
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
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
        group relative flex flex-col h-full
        bg-surface border border-border rounded-lg overflow-hidden
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
        {/* Base gradient — the fallback when no photo */}
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

            {/* Bottom gradient — makes badges + SKU legible on any photo */}
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
            {/* Ambient warm glow */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-55"
              style={{
                background:
                  'radial-gradient(ellipse at 70% 40%, rgba(194,112,46,0.35) 0%, transparent 60%)',
              }}
            />
            {/* Grain */}
            <div className="grain-overlay absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none" />
            {/* Silhouette */}
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

        {/* ═══ Top-left: Category + Popular badges ═══ */}
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

        {/* ═══ Bottom-left: SKU + fleet count ═══ */}
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

        {/* ═══ Corner action indicator — reveals on hover ═══ */}
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
      <div className="flex flex-col flex-1 p-6">

        {/* Name */}
        <h3 className="font-display text-2xl text-ink leading-tight tracking-[-0.01em] mb-2 group-hover:text-copper-700 transition-colors duration-300">
          {vehicle.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-ink-muted leading-relaxed line-clamp-2 mb-6 font-light">
          {vehicle.description}
        </p>

        {/* ═══ Spec strip — hairline-divided ═══ */}
        <div className="grid grid-cols-3 border-y border-border py-4 mb-5">
          <Spec
            icon={<Users size={15} />}
            label="Seats"
            value={`${vehicle.seats}`}
          />
          <Spec
            icon={<Fuel size={15} />}
            label="Fuel"
            value={vehicle.fuel}
            withDivider
          />
          <Spec
            icon={<Cog size={15} />}
            label="Gearbox"
            value={vehicle.transmission === 'Automatic' ? 'Auto' : 'Manual'}
            withDivider
          />
        </div>

        {/* ═══ Mode pills ═══ */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(vehicle.mode === 'Self-Drive' || vehicle.mode === 'Both') && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-obsidian-900/[0.04] text-ink text-[10px] font-medium uppercase tracking-[0.14em] rounded-md border border-border">
              <Key size={10} strokeWidth={2.5} />
              Self-Drive
            </span>
          )}
          {(vehicle.mode === 'Chauffeured' || vehicle.mode === 'Both') && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-copper-500/[0.08] text-copper-700 text-[10px] font-medium uppercase tracking-[0.14em] rounded-md border border-copper-500/25">
              <UserCheck size={10} strokeWidth={2.5} />
              Chauffeured
            </span>
          )}
        </div>

        {/* ═══ Price + action ═══ */}
        <div className="mt-auto flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-ink-subtle mb-1.5">
              From
            </p>
            <p className="font-display text-3xl text-ink leading-none tabular-nums">
              {formatPrice(vehicle.dailyRate)}
              <span className="font-sans text-xs text-ink-subtle ml-1.5 tracking-wide">
                /day
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.();
            }}
            className="group/btn flex items-center justify-center w-11 h-11 rounded-full bg-obsidian-900 text-white transition-all duration-400 ease-lux hover:bg-copper-500 hover:text-obsidian-950 hover:scale-105 hover:shadow-[0_8px_24px_rgba(194,112,46,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2"
            aria-label={`View details for ${vehicle.name}`}
          >
            <ArrowUpRight
              size={17}
              strokeWidth={2.5}
              className="transition-transform duration-400 ease-lux group-hover/btn:rotate-45"
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────
   SPEC
   Vertical stack — icon on top, then label, then value.
   ───────────────────────────────────────────────────────────── */
function Spec({
  icon,
  label,
  value,
  withDivider = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  withDivider?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-start gap-1 px-3 first:pl-0 last:pr-0 ${
        withDivider ? 'border-l border-border' : ''
      }`}
    >
      <span className="text-ink-subtle mb-1">{icon}</span>
      <span className="text-[9px] uppercase tracking-[0.16em] text-ink-subtle font-medium">
        {label}
      </span>
      <span className="text-sm font-semibold text-ink">{value}</span>
    </div>
  );
}
