'use client';

import {
  Users,
  Fuel,
  Key,
  UserCheck,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { type Vehicle, formatPrice } from '../../lib/vehicles';

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
  onViewDetails?: () => void;
}

export function VehicleCard({
  vehicle,
  index = 0,
  onViewDetails,
}: VehicleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onClick={onViewDetails}
      className={`group relative flex flex-col bg-porcelain border border-charcoal-300/20 rounded-sm overflow-hidden transition-all duration-500 hover:border-accent-500/40 hover:shadow-2xl hover:-translate-y-1 ${
        onViewDetails ? 'cursor-pointer' : ''
      }`}
    >
      {/* ── Visual panel with silhouette ── */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${vehicle.accentFrom} 0%, ${vehicle.accentTo} 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              'radial-gradient(ellipse at 70% 40%, rgba(201, 162, 39, 0.35) 0%, transparent 60%)',
          }}
        />
        <div className="grain-overlay absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" />

        <svg
          viewBox="0 0 200 100"
          className="absolute inset-0 w-full h-full p-8 text-porcelain/40 transition-all duration-700 group-hover:text-porcelain/70 group-hover:scale-105"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d={vehicle.silhouettePath}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        </svg>

        {/* Top-left: Category + Popular badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1 bg-porcelain/10 backdrop-blur-sm border border-porcelain/20 rounded-sm text-[10px] font-medium uppercase tracking-widest text-porcelain">
            {vehicle.category}
          </span>
          {vehicle.popular && (
            <span className="flex items-center gap-1 px-3 py-1 bg-accent-500 text-primary-900 rounded-sm text-[10px] font-bold uppercase tracking-widest">
              <Sparkles size={10} />
              Popular
            </span>
          )}
        </div>

        {/* Bottom-left: SKU */}
        <div className="absolute bottom-4 left-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-porcelain/50">
            {vehicle.sku}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="type-h3 text-primary-900 mb-3">{vehicle.name}</h3>

        <p className="text-sm text-charcoal-500 leading-relaxed line-clamp-2 mb-6">
          {vehicle.description}
        </p>

        <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-charcoal-300/20">
          <Spec
            icon={<Users size={16} />}
            label="Seats"
            value={`${vehicle.seats}`}
          />
          <Spec
            icon={<Fuel size={16} />}
            label="Fuel"
            value={vehicle.fuel}
          />
          <Spec
            icon={<Key size={16} />}
            label="Trans"
            value={vehicle.transmission === 'Automatic' ? 'Auto' : 'Manual'}
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {(vehicle.mode === 'Self-Drive' || vehicle.mode === 'Both') && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-900/5 text-primary-900 text-[10px] font-medium uppercase tracking-widest rounded-sm border border-primary-900/10">
              <Key size={11} />
              Self-Drive
            </span>
          )}
          {(vehicle.mode === 'Chauffeured' || vehicle.mode === 'Both') && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-900/5 text-primary-900 text-[10px] font-medium uppercase tracking-widest rounded-sm border border-primary-900/10">
              <UserCheck size={11} />
              Chauffeured
            </span>
          )}
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex items-end justify-between pt-2">
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
            className="flex items-center justify-center w-11 h-11 rounded-full bg-primary-900 text-porcelain transition-all duration-300 hover:bg-accent-500 hover:text-primary-900 group-hover:rotate-45"
            aria-label={`View ${vehicle.name}`}
          >
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────── */
function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-start gap-1.5">
      <span className="text-charcoal-400">{icon}</span>
      <span className="text-[9px] uppercase tracking-widest text-charcoal-500">
        {label}
      </span>
      <span className="text-sm font-medium text-primary-900">{value}</span>
    </div>
  );
}