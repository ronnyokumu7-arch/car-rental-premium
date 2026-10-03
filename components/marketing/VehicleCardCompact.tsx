'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { type Vehicle, formatPrice } from '../../lib/vehicles';

interface VehicleCardCompactProps {
  vehicle: Vehicle;
  onViewDetails?: () => void;
  /** Show the description paragraph below the name. Default: false */
  showDescription?: boolean;
}

export function VehicleCardCompact({
  vehicle,
  onViewDetails,
  showDescription = false,
}: VehicleCardCompactProps) {
  const shortMeta = `${vehicle.category} · ${vehicle.seats} seats`;

  const handleClick = () => {
    if (onViewDetails) {
      onViewDetails();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        group flex flex-col
        bg-porcelain border border-charcoal-300/30 rounded-sm overflow-hidden
        transition-all duration-300
        hover:border-accent-500/40
        hover:shadow-lg
        hover:-translate-y-0.5
        ${onViewDetails ? 'cursor-pointer' : ''}
      `}
    >
      {/* ── Visual panel ── */}
      <div className="relative aspect-[16/10] overflow-hidden transform-gpu">
        {/* Base gradient fallback */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${vehicle.accentFrom} 0%, ${vehicle.accentTo} 100%)`,
          }}
        />

        {vehicle.image && (
          <>
            <Image
              src={vehicle.image}
              alt={vehicle.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              quality={75}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-primary-900/20 pointer-events-none" />
          </>
        )}

        {/* Top-left: Category + Popular badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
          <span className="px-3 py-1 bg-porcelain/10 backdrop-blur-sm border border-porcelain/20 rounded-sm text-[10px] font-medium uppercase tracking-widest text-porcelain">
            {vehicle.category}
          </span>
          {vehicle.popular && (
            <span className="px-3 py-1 bg-accent-500 text-primary-900 rounded-sm text-[10px] font-bold uppercase tracking-widest">
              Popular
            </span>
          )}
        </div>

        {/* Bottom-left: SKU */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="text-[10px] font-mono uppercase tracking-widest text-porcelain/70">
            {vehicle.sku}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col p-6">
        {/* Name */}
        <h3 className="font-display text-2xl text-primary-900 leading-tight mb-1">
          {vehicle.name}
        </h3>

        {/* Meta line */}
        <p className="text-sm text-charcoal-500 mb-4">{shortMeta}</p>

        {/* Optional description */}
        {showDescription && (
          <p className="text-sm text-charcoal-500 leading-relaxed line-clamp-2 mb-5">
            {vehicle.description}
          </p>
        )}

        {/* Feature chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center px-3 py-1 bg-primary-900/5 text-primary-900 text-[10px] font-medium uppercase tracking-widest rounded-sm border border-primary-900/10">
            {vehicle.fuel}
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-primary-900/5 text-primary-900 text-[10px] font-medium uppercase tracking-widest rounded-sm border border-primary-900/10">
            {vehicle.transmission === 'Automatic' ? 'Auto' : 'Manual'}
          </span>
          {vehicle.mode !== 'Self-Drive' && (
            <span className="inline-flex items-center px-3 py-1 bg-primary-900/5 text-primary-900 text-[10px] font-medium uppercase tracking-widest rounded-sm border border-primary-900/10">
              Chauffeured
            </span>
          )}
        </div>

        {/* Price + CTA row */}
        <div className="flex items-end justify-between pt-4 border-t border-charcoal-300/20">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-charcoal-500 mb-1">
              From
            </p>
            <p className="font-display text-2xl text-primary-900 leading-none">
              {formatPrice(vehicle.dailyRate)}
              <span className="text-xs font-sans text-charcoal-500 ml-1">
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
            aria-label={`View ${vehicle.name}`}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-primary-900 text-porcelain transition-all duration-300 hover:bg-accent-500 hover:text-primary-900 group-hover:rotate-45"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
