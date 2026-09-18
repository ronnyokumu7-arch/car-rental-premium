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
  // Lock body scroll when modal is open
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
          {/* ── Backdrop (separate layer, full screen) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-primary-900/80 backdrop-blur-sm"
          />

          {/* ── Modal positioning wrapper ── */}
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6"
            onClick={onClose}
          >
            {/* ── Modal itself (stopPropagation keeps clicks inside from closing) ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-3rem)] overflow-y-auto overscroll-contain bg-porcelain rounded-sm shadow-2xl"
            >
              {/* ── Visual panel ── */}
              <div className="relative aspect-[16/9] sm:aspect-[16/9] overflow-hidden">
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

                {/* Silhouette */}
                <svg
                  viewBox="0 0 200 100"
                  className="absolute inset-0 w-full h-full p-8 sm:p-12 text-porcelain/50"
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

                {/* Category + Popular */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-2">
                  <span className="px-2.5 sm:px-3 py-1 bg-porcelain/10 backdrop-blur-sm border border-porcelain/20 rounded-sm text-[10px] font-medium uppercase tracking-widest text-porcelain">
                    {vehicle.category}
                  </span>
                  {vehicle.popular && (
                    <span className="flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-accent-500 text-primary-900 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                      <Sparkles size={10} />
                      Popular
                    </span>
                  )}
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-porcelain/10 backdrop-blur-sm border border-porcelain/20 rounded-full text-porcelain hover:bg-porcelain/20 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* ── Content ── */}
              <div className="p-5 sm:p-6 lg:p-10">
                {/* Title + SKU */}
                <div className="mb-5 sm:mb-6">
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-primary-900 mb-2 leading-tight">
                    {vehicle.name}
                  </h2>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-charcoal-500 font-mono">
                    SKU: {vehicle.sku}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed mb-6 sm:mb-8">
                  {vehicle.description}
                </p>

                {/* Specs grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-charcoal-300/20">
                  <ModalSpec
                    icon={<Users size={16} />}
                    label="Seats"
                    value={`${vehicle.seats}`}
                  />
                  <ModalSpec
                    icon={<Fuel size={16} />}
                    label="Fuel"
                    value={vehicle.fuel}
                  />
                  <ModalSpec
                    icon={<Key size={16} />}
                    label="Transmission"
                    value={vehicle.transmission}
                  />
                  <ModalSpec
                    icon={<UserCheck size={16} />}
                    label="Mode"
                    value={
                      vehicle.mode === 'Both'
                        ? 'Both Available'
                        : vehicle.mode
                    }
                  />
                </div>

                {/* Features */}
                {vehicle.features.length > 0 && (
                  <div className="mb-6 sm:mb-8">
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-widest text-accent-600 mb-3 sm:mb-4 font-medium">
                      Features
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {vehicle.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-xs sm:text-sm text-charcoal-700"
                        >
                          <Check
                            size={14}
                            className="text-accent-500 shrink-0"
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Price + CTA */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between pt-5 sm:pt-6 border-t border-charcoal-300/20">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-charcoal-500 mb-1">
                      From
                    </p>
                    <p className="font-display text-3xl sm:text-4xl text-primary-900 leading-none">
                      {formatPrice(vehicle.dailyRate)}
                      <span className="text-xs sm:text-sm font-sans text-charcoal-500 ml-2">
                        /day
                      </span>
                    </p>
                  </div>
                  <Link
                    href={`/contact?vehicle=${vehicle.id}`}
                    className="btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    Reserve This Vehicle
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────── */
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
    <div className="flex flex-col items-start gap-1.5 sm:gap-2">
      <span className="text-accent-500">{icon}</span>
      <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-charcoal-500">
        {label}
      </span>
      <span className="text-xs sm:text-sm font-medium text-primary-900">
        {value}
      </span>
    </div>
  );
}