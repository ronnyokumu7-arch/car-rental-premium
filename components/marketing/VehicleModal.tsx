'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Fuel,
  Key,
  UserCheck,
  Sparkles,
  X,
  Check,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { type Vehicle, formatPrice } from '../../lib/vehicles';

interface VehicleModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
}

export function VehicleModal({ vehicle, onClose }: VehicleModalProps) {
  useEffect(() => {
    if (!vehicle) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = original;
      window.removeEventListener('keydown', handleEsc);
    };
  }, [vehicle, onClose]);

  return (
    <AnimatePresence>
      {vehicle && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-primary-900/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 z-[70] w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-porcelain rounded-sm shadow-2xl"
          >
            {/* Visual panel */}
            <div className="relative aspect-[16/9] overflow-hidden">
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
                className="absolute inset-0 w-full h-full p-12 text-porcelain/50"
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

              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-porcelain/10 backdrop-blur-sm border border-porcelain/20 rounded-full text-porcelain hover:bg-porcelain/20 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 lg:p-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="type-h1 text-primary-900 mb-2">
                    {vehicle.name}
                  </h2>
                  <p className="text-[11px] uppercase tracking-widest text-charcoal-500 font-mono">
                    SKU: {vehicle.sku}
                  </p>
                </div>
              </div>

              <p className="type-body mb-8">{vehicle.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-charcoal-300/20">
                <ModalSpec
                  icon={<Users size={18} />}
                  label="Seats"
                  value={`${vehicle.seats}`}
                />
                <ModalSpec
                  icon={<Fuel size={18} />}
                  label="Fuel"
                  value={vehicle.fuel}
                />
                <ModalSpec
                  icon={<Key size={18} />}
                  label="Transmission"
                  value={vehicle.transmission}
                />
                <ModalSpec
                  icon={<UserCheck size={18} />}
                  label="Mode"
                  value={
                    vehicle.mode === 'Both'
                      ? 'Self-Drive or Chauffeured'
                      : vehicle.mode
                  }
                />
              </div>

              {vehicle.features.length > 0 && (
                <div className="mb-8">
                  <p className="type-caption text-accent-600 mb-4">
                    Features
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {vehicle.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-charcoal-700"
                      >
                        <Check size={14} className="text-accent-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pt-6 border-t border-charcoal-300/20">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-charcoal-500 mb-1">
                    From
                  </p>
                  <p className="font-display text-4xl text-primary-900 leading-none">
                    {formatPrice(vehicle.dailyRate)}
                    <span className="text-sm font-sans text-charcoal-500 ml-2">
                      /day
                    </span>
                  </p>
                </div>
                <Link
                  href={`/contact?vehicle=${vehicle.id}`}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Reserve This Vehicle
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ModalSpec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="text-accent-500">{icon}</span>
      <span className="text-[10px] uppercase tracking-widest text-charcoal-500">
        {label}
      </span>
      <span className="text-sm font-medium text-primary-900">{value}</span>
    </div>
  );
}