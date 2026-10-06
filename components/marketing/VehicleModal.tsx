'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Users,
  Fuel,
  Cog,
  Key,
  UserCheck,
  Sparkles,
  X,
  Check,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { type Vehicle, formatPrice } from '../../lib/vehicles';

/* ─────────────────────────────────────────────────────────────
   VEHICLE MODAL
   Detail view for a single vehicle.

   Desktop: centered card, two-column (image left, details right)
   Mobile:  full-height bottom sheet, slides up

   Layout order (both breakpoints):
     Image (mobile top / desktop left)
       ↓
     Name + meta
     Spec strip
     Description (desktop always / mobile collapsed)
     Features
     Mode pills
       ↓
     STICKY BAR: price + full-width Reserve

   Contracts enforced:
     • body[data-modal-open] set while open (hides FAB widgets)
     • Escape closes
     • Backdrop click closes
     • Swipe-down on mobile closes (above the sticky bar)
     • Focus moves to close button, restored on close
     • Background scroll locked
   ───────────────────────────────────────────────────────────── */

interface VehicleModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
}

export function VehicleModal({ vehicle, onClose }: VehicleModalProps) {
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  /* ── Reset expanded state when the modal opens for a new vehicle ── */
  useEffect(() => {
    if (vehicle) setDetailsExpanded(false);
  }, [vehicle]);

  /* ── Lock body scroll + set modal-open flag ── */
  useEffect(() => {
    if (!vehicle) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.dataset.modalOpen = 'true';

    return () => {
      document.body.style.overflow = prevOverflow;
      delete document.body.dataset.modalOpen;
    };
  }, [vehicle]);

  /* ── Escape closes ── */
  useEffect(() => {
    if (!vehicle) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [vehicle, onClose]);

  /* ── Focus management ── */
  useEffect(() => {
    if (!vehicle) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 80);

    return () => {
      window.clearTimeout(focusTimer);
      previouslyFocused?.focus?.();
    };
  }, [vehicle]);

  /* ── Swipe-down to close — only fires on the scrollable content,
        not on the sticky CTA bar ── */
  const dragStartY = useRef<number | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (dragStartY.current === null) return;
      const delta = e.changedTouches[0].clientY - dragStartY.current;
      dragStartY.current = null;
      if (delta > 90) onClose();
    },
    [onClose]
  );

  return (
    <AnimatePresence>
      {vehicle && (
        <>
          {/* ═══ Backdrop ═══ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-[60] bg-obsidian-950/85 backdrop-blur-md"
          />

          {/* ═══ Positioning wrapper ═══ */}
          <div
            className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-6"
            onClick={onClose}
          >
            {/* ═══ Modal panel ═══ */}
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="vehicle-modal-title"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="
                relative w-full
                sm:max-w-4xl
                h-[92dvh] sm:h-auto sm:max-h-[calc(100dvh-3rem)]
                bg-surface
                rounded-t-2xl sm:rounded-lg
                shadow-[0_-8px_40px_rgba(14,14,16,0.20),0_24px_64px_rgba(14,14,16,0.24)]
                overflow-hidden
                flex flex-col
              "
            >
              {/* ── Mobile drag handle ── */}
              <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
                <span
                  aria-hidden="true"
                  className="w-10 h-1 rounded-full bg-border-strong"
                />
              </div>

              {/* ── Close button ── */}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close vehicle details"
                className="
                  absolute top-3 sm:top-4 right-3 sm:right-4 z-30
                  w-10 h-10 flex items-center justify-center
                  bg-obsidian-950/70 backdrop-blur-md
                  border border-white/15 rounded-full
                  text-white
                  hover:bg-copper-500 hover:text-obsidian-950 hover:border-copper-500
                  transition-all duration-300 ease-lux
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2
                "
              >
                <X size={18} strokeWidth={2.5} />
              </button>

              {/* ═══════════════════════════════════════════
                  SCROLLABLE CONTENT
                  ═══════════════════════════════════════════ */}
              <div
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain scrollbar-hide"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 sm:gap-0">

                  {/* ═══ Image panel ═══ */}
                  <div className="relative sm:col-span-5 aspect-[16/10] sm:aspect-auto sm:min-h-[480px] overflow-hidden bg-obsidian-950">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${vehicle.accentFrom} 0%, ${vehicle.accentTo} 100%)`,
                      }}
                    />

{vehicle.image ? (
  <>
    {/* eslint-disable-next-line @next/next/no-img-element -- intentionally plain img; source is already cached from VehicleCard, next/image adds overhead with no benefit inside a modal */}
    <img
      src={vehicle.image}
      alt={`${vehicle.name} — ${vehicle.category} available for hire in Nairobi`}
      className="absolute inset-0 w-full h-full object-cover"
      loading="eager"
      decoding="async"
    />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              'linear-gradient(to top, rgba(7,7,8,0.55) 0%, transparent 45%, rgba(7,7,8,0.10) 100%)',
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
                          className="absolute inset-0 w-full h-full p-8 sm:p-12 text-white/40"
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

                    {/* Badges */}
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
                  </div>

                  {/* ═══ Details column ═══ */}
                  <div className="sm:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col">

                    {/* Title */}
                    <h2
                      id="vehicle-modal-title"
                      className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink leading-tight tracking-[-0.015em] mb-3"
                    >
                      {vehicle.name}
                    </h2>

                    {/* Meta line */}
                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1.5 text-[10px] uppercase tracking-[0.18em] text-ink-subtle mb-5">
                      <span>{vehicle.category}</span>
                      <span
                        aria-hidden="true"
                        className="w-px h-3 bg-border-strong"
                      />
                      <span>{vehicle.year}</span>
                      <span
                        aria-hidden="true"
                        className="w-px h-3 bg-border-strong"
                      />
                      <span>{vehicle.fuel}</span>
                    </div>

                    {/* ═══ Spec strip — scrollable on mobile, grid on desktop ═══ */}
                    <div className="relative border-y border-border mb-6">
                      {/* Mobile: horizontal scroll strip */}
                      <div className="sm:hidden flex items-stretch overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                        <ModalSpec
                          icon={<Users size={14} />}
                          value={`${vehicle.seats} seats`}
                        />
                        <ModalSpec
                          icon={<Fuel size={14} />}
                          value={vehicle.fuel}
                        />
                        <ModalSpec
                          icon={<Cog size={14} />}
                          value={
                            vehicle.transmission === 'Automatic'
                              ? 'Auto'
                              : 'Manual'
                          }
                        />
                      </div>

                      {/* Right-edge fade */}
                      <div
                        aria-hidden="true"
                        className="sm:hidden absolute top-0 right-0 bottom-0 w-8 pointer-events-none"
                        style={{
                          background:
                            'linear-gradient(to right, transparent, var(--surface) 90%)',
                        }}
                      />

                      {/* Desktop: static 3-column grid */}
                      <div className="hidden sm:grid grid-cols-3">
                        <ModalSpec
                          icon={<Users size={15} />}
                          value={`${vehicle.seats} seats`}
                          withDivider
                        />
                        <ModalSpec
                          icon={<Fuel size={15} />}
                          value={vehicle.fuel}
                          withDivider
                        />
                        <ModalSpec
                          icon={<Cog size={15} />}
                          value={
                            vehicle.transmission === 'Automatic'
                              ? 'Auto'
                              : 'Manual'
                          }
                          withDivider
                        />
                      </div>
                    </div>

                    {/* ── Description — always visible on desktop ── */}
                    <div className="hidden sm:block mb-6">
                      <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-light">
                        {vehicle.description}
                      </p>
                    </div>

                    {/* ── Mobile: collapse details behind toggle ── */}
                    <div className="sm:hidden">
                      {!detailsExpanded ? (
                        <button
                          type="button"
                          onClick={() => setDetailsExpanded(true)}
                          className="w-full flex items-center justify-between gap-2 px-4 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-copper-600 border border-border rounded-md hover:border-copper-500/50 transition-all duration-300 ease-lux"
                        >
                          <span>See full details</span>
                          <ChevronDown
                            size={14}
                            className="transition-transform duration-300 ease-lux"
                          />
                        </button>
                      ) : (
                        <div className="mb-6">
                          <p className="text-sm text-ink-muted leading-relaxed font-light mb-6">
                            {vehicle.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* ═══ Features ═══ */}
                    {vehicle.features.length > 0 && (
                      <div
                        className={`mb-6 ${
                          !detailsExpanded ? 'max-sm:hidden' : ''
                        }`}
                      >
                        <p className="text-[10px] uppercase tracking-[0.18em] text-copper-600 mb-3 font-semibold">
                          Features
                        </p>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                          {vehicle.features.map((f) => (
                            <li
                              key={f}
                              className="flex items-center gap-2.5 text-sm text-ink-muted"
                            >
                              <Check
                                size={13}
                                strokeWidth={3}
                                className="text-copper-500 shrink-0"
                              />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* ═══ Mode pills ═══ */}
                    <div
                      className={`flex flex-wrap gap-2 ${
                        !detailsExpanded ? 'max-sm:hidden' : ''
                      }`}
                    >
                      {(vehicle.mode === 'Self-Drive' ||
                        vehicle.mode === 'Both') && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-obsidian-900/[0.04] text-ink text-[10px] font-medium uppercase tracking-[0.14em] rounded-md border border-border">
                          <Key size={10} strokeWidth={2.5} />
                          Self-Drive
                        </span>
                      )}
                      {(vehicle.mode === 'Chauffeured' ||
                        vehicle.mode === 'Both') && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-copper-500/[0.08] text-copper-700 text-[10px] font-medium uppercase tracking-[0.14em] rounded-md border border-copper-500/25">
                          <UserCheck size={10} strokeWidth={2.5} />
                          Chauffeured
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ═══════════════════════════════════════════
                  STICKY BAR — price + full-width Reserve
                  Pinned to the bottom of the panel, outside the
                  scroll area. Always visible.
                  ═══════════════════════════════════════════ */}
              <div className="shrink-0 border-t border-border bg-surface px-6 sm:px-8 lg:px-10 py-4 sm:py-5">
                <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-ink-subtle">
                    From
                  </p>
                  <p className="font-display text-2xl sm:text-3xl text-ink leading-none tabular-nums">
                    {formatPrice(vehicle.dailyRate)}
                    <span className="font-sans text-xs text-ink-subtle ml-2 tracking-wide">
                      /day
                    </span>
                  </p>
                </div>

                <Link
                  href={`/quote?vehicle=${vehicle.id}`}
                  className="group relative flex items-center justify-center gap-2 w-full px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-obsidian-950 rounded-md overflow-hidden transition-all duration-300 ease-lux hover:-translate-y-0.5"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg, #E3A468 0%, #D98A44 45%, #C2702E 100%)',
                    boxShadow:
                      '0 1px 2px rgba(168,90,34,0.20), 0 8px 24px rgba(194,112,46,0.28)',
                  }}
                >
                  <span className="relative z-10">Reserve This Vehicle</span>
                  <ArrowRight
                    size={14}
                    strokeWidth={2.5}
                    className="relative z-10 transition-transform duration-300 ease-lux group-hover:translate-x-0.5"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-lux"
                    style={{
                      background:
                        'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
                    }}
                  />
                </Link>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────
   MODAL SPEC
   Inline icon + value. No label. Scroll-snappable on mobile.
   ───────────────────────────────────────────────────────────── */
function ModalSpec({
  icon,
  value,
  withDivider = false,
}: {
  icon: React.ReactNode;
  value: string;
  withDivider?: boolean;
}) {
  return (
    <div
      className={`
        flex items-center gap-2.5
        px-4 py-4
        shrink-0 snap-start
        ${withDivider ? 'sm:border-l sm:border-border' : ''}
      `}
    >
      <span className="text-ink-subtle shrink-0">{icon}</span>
      <span className="text-sm text-ink-muted whitespace-nowrap leading-none">
        {value}
      </span>
    </div>
  );
}
