'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  Users,
  Luggage,
  Fuel,
  Car,
  Search,
  X,
  SlidersHorizontal,
  Tag,
} from 'lucide-react';
import {
  getVisibleVehicles,
  getAvailableCategories,
  formatPrice,
  type Vehicle,
  type VehicleCategory,
} from '../../lib/vehicles';
import { daysBetween, formatKES } from '../../lib/quote';
import { Select, type SelectOption } from '../ui/Select';
import { PillButton } from '../booking/shared';

/* ─────────────────────────────────────────────────────────────
   STEP 3 — VEHICLE
   Pick a vehicle from the fleet.

   Features:
     • Search — matches name, category, fuel, transmission, seats
     • Category filter — single-select via Select
     • Sort — Popular / Price low-high / Price high-low
     • Seats filter — pills, Any / 5 / 7 / 8+
     • Result count below the filter row
     • Empty state with a reset action

   Mobile UX:
     • Default: 🔍 icon, [Categories ▾], [Filter ▾]
     • Tap search → input expands, other controls collapse
     • Category and Filter open as Select sheets (already on brand)

   Desktop UX:
     • Search input always visible
     • Category + Sort + Seats all in one row

   Scroll behavior:
     • Mobile  — full list renders inline
     • Desktop — list is capped and scrolls internally
   ───────────────────────────────────────────────────────────── */

type SortOption = 'popular' | 'price-asc' | 'price-desc';

const SORT_OPTIONS: SelectOption[] = [
  { value: 'popular', label: 'Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

const SEAT_OPTIONS = [
  { value: 'any', label: 'Any' },
  { value: '5', label: '5' },
  { value: '7', label: '7' },
  { value: '8+', label: '8+' },
] as const;

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

  /* ── Filter state ── */
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [category, setCategory] = useState<VehicleCategory | 'All'>('All');
  const [sort, setSort] = useState<SortOption>('popular');
  const [seats, setSeats] = useState('any');
  const [filterOpen, setFilterOpen] = useState(false);

  /* ── Category options from the live fleet ── */
  const categoryOptions: SelectOption[] = useMemo(() => {
    const cats = getAvailableCategories();
    return [
      { value: 'All', label: 'All categories' },
      ...cats.map((c) => ({ value: c, label: c })),
    ];
  }, []);

  /* ── Filter + sort the fleet ── */
  const vehicles = useMemo(() => {
    let list = [...getVisibleVehicles()];

    /* Search — matches name, category, fuel, transmission, or seats */
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((v) => {
        const haystack = [
          v.name,
          v.category,
          v.fuel,
          v.transmission,
          `${v.seats}`,
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      });
    }

    /* Category */
    if (category !== 'All') {
      list = list.filter((v) => v.category === category);
    }

    /* Seats — "any" or a minimum */
    if (seats !== 'any') {
      const target = seats === '8+' ? 8 : Number(seats);
      list = list.filter((v) => v.seats >= target);
    }

    /* Sort */
    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.dailyRate - b.dailyRate);
        break;
      case 'price-desc':
        list.sort((a, b) => b.dailyRate - a.dailyRate);
        break;
      case 'popular':
      default:
        list.sort((a, b) => {
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          return a.dailyRate - b.dailyRate;
        });
    }

    return list;
  }, [query, category, seats, sort]);

  /* ── Active filter count (for the badge) ── */
  const activeFilterCount =
    (category !== 'All' ? 1 : 0) + (seats !== 'any' ? 1 : 0);

  /* ── Reset all filters ── */
  const resetFilters = () => {
    setQuery('');
    setCategory('All');
    setSeats('any');
    setSort('popular');
  };

  const hasAnyFilter = Boolean(query) || activeFilterCount > 0;

  return (
    <div>
      {/* ── Section header ── */}
      <header className="mb-6 lg:mb-8">
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

      {/* ═══════════════════════════════════════════
          SEARCH + FILTER ROW
          Mobile:  search icon → expands to input
          Desktop: search input always visible
          ═══════════════════════════════════════════ */}
      <div className="mb-6">

        {/* ── Mobile: compact row ── */}
        <div className="sm:hidden">
          <AnimatePresence mode="wait" initial={false}>
            {!searchOpen ? (
              <motion.div
                key="compact"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2"
              >
                {/* Search icon button */}
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Open search"
                  className="shrink-0 flex items-center justify-center w-11 h-11 rounded-lg border border-border bg-surface text-ink-muted hover:border-copper-500/40 hover:text-copper-600 transition-all duration-300 ease-lux"
                >
                  <Search size={16} strokeWidth={2.5} />
                </button>

                <div className="flex-1" />

                {/* Categories */}
                <div className="w-[130px]">
                  <Select
                    name="category"
                    value={category}
                    onChange={(v) =>
                      setCategory(v as VehicleCategory | 'All')
                    }
                    options={categoryOptions}
                    sheetTitle="Filter by category"
                    ariaLabel="Filter by category"
                    className="!h-11 !text-xs"
                  />
                </div>

                {/* Filter toggle */}
                <button
                  type="button"
                  onClick={() => setFilterOpen(true)}
                  aria-label="Open filters"
                  className="relative shrink-0 flex items-center justify-center w-11 h-11 rounded-lg border border-border bg-surface text-ink-muted hover:border-copper-500/40 hover:text-copper-600 transition-all duration-300 ease-lux"
                >
                  <SlidersHorizontal size={16} strokeWidth={2.5} />
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-copper-500 text-obsidian-950 text-[10px] font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="search-open"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <Search
                  size={15}
                  strokeWidth={2.5}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-subtle pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Prado, SUV, 7 seats…"
                  className="booking-input !pl-10 !pr-10"
                />
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setSearchOpen(false);
                  }}
                  aria-label="Close search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-full text-ink-subtle hover:text-ink transition-colors duration-200"
                >
                  <X size={14} strokeWidth={2.5} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Desktop: full row ── */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <Search
              size={15}
              strokeWidth={2.5}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-subtle pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Prado, SUV, 7 seats…"
              className="booking-input !pl-10 !pr-10"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-7 h-7 rounded-full text-ink-subtle hover:text-ink transition-colors duration-200"
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="w-[170px]">
            <Select
              name="category"
              value={category}
              onChange={(v) =>
                setCategory(v as VehicleCategory | 'All')
              }
              options={categoryOptions}
              sheetTitle="Filter by category"
              ariaLabel="Filter by category"
            />
          </div>

          {/* Sort */}
          <div className="w-[180px]">
            <Select
              name="sort"
              value={sort}
              onChange={(v) => setSort(v as SortOption)}
              options={SORT_OPTIONS}
              sheetTitle="Sort vehicles"
              ariaLabel="Sort vehicles"
            />
          </div>
        </div>

        {/* ── Desktop: seats pills below ── */}
        <div className="hidden sm:flex items-center gap-3 mt-3">
          <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-subtle">
            <Users size={12} strokeWidth={2.5} />
            Seats
          </label>
          <div className="flex items-center gap-2">
            {SEAT_OPTIONS.map((opt) => (
              <PillButton
                key={opt.value}
                active={seats === opt.value}
                pressed={seats === opt.value}
                onClick={() => setSeats(opt.value)}
              >
                {opt.label}
              </PillButton>
            ))}
          </div>
        </div>
      </div>

      {/* ── Result count ── */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-subtle">
          {vehicles.length === 1
            ? '1 vehicle'
            : `${vehicles.length} vehicles`}
          {query && (
            <span className="text-ink-muted normal-case tracking-normal">
              {' '}
              matching &ldquo;{query}&rdquo;
            </span>
          )}
        </p>

        {hasAnyFilter && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-[10px] font-semibold uppercase tracking-[0.16em] text-copper-600 hover:text-copper-700 transition-colors duration-300"
          >
            Clear all
          </button>
        )}
      </div>

      {/* ═══════════════════════════════════════════
          VEHICLE LIST
          ═══════════════════════════════════════════ */}
      {vehicles.length > 0 ? (
        <div
          role="radiogroup"
          aria-label="Choose a vehicle"
          className="
            space-y-3
            sm:max-h-[640px] sm:overflow-y-auto sm:scrollbar-hide
            sm:pr-2 sm:-mr-2
          "
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
      ) : (
        <div className="py-16 px-6 text-center bg-surface-sunken border border-border rounded-2xl">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-border mb-4">
            <Search
              size={18}
              strokeWidth={1.8}
              className="text-ink-subtle"
            />
          </div>
          <p className="font-display text-xl text-ink mb-2 tracking-[-0.01em]">
            No vehicles match.
          </p>
          <p className="text-sm text-ink-muted mb-6 font-light">
            Try a different search or clear your filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink border border-border rounded-full hover:border-copper-500/60 hover:text-copper-600 transition-all duration-300 ease-lux"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          MOBILE FILTER SHEET
          Uses the same bottom-sheet pattern as Select.
          Triggered by the Filter button above.
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {filterOpen && (
          <MobileFilterSheet
            onClose={() => setFilterOpen(false)}
            seats={seats}
            setSeats={setSeats}
            sort={sort}
            setSort={setSort}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MOBILE FILTER SHEET
   ───────────────────────────────────────────────────────────── */
function MobileFilterSheet({
  onClose,
  seats,
  setSeats,
  sort,
  setSort,
}: {
  onClose: () => void;
  seats: string;
  setSeats: (v: string) => void;
  sort: SortOption;
  setSort: (v: SortOption) => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 z-[199] bg-obsidian-950/60 backdrop-blur-sm sm:hidden"
      />

      {/* Sheet */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        className="
          fixed left-0 right-0 bottom-0 z-[200]
          bg-surface rounded-t-2xl
          max-h-[80vh]
          flex flex-col
          shadow-[0_-8px_40px_rgba(14,14,16,0.20)]
          sm:hidden
        "
      >
        {/* Copper top hairline */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent"
        />

        {/* Header */}
        <div className="shrink-0 pt-3 pb-3 px-5 border-b border-border">
          <div className="flex justify-center mb-3">
            <span
              aria-hidden="true"
              className="w-10 h-1 rounded-full bg-border-strong"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-subtle">
              Filters
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close filters"
              className="shrink-0 -mr-2 w-9 h-9 flex items-center justify-center text-ink-subtle hover:text-ink transition-colors duration-200"
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 py-6 space-y-8">

          {/* Seats */}
          <div>
            <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-copper-600 mb-4">
              <Users size={13} strokeWidth={2.5} />
              Seats
            </label>
            <div className="flex flex-wrap gap-2">
              {SEAT_OPTIONS.map((opt) => (
                <PillButton
                  key={opt.value}
                  active={seats === opt.value}
                  pressed={seats === opt.value}
                  onClick={() => setSeats(opt.value)}
                >
                  {opt.label}
                </PillButton>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-copper-600 mb-4">
              <Tag size={13} strokeWidth={2.5} />
              Sort by
            </label>
            <div className="flex flex-col gap-2">
              {SORT_OPTIONS.map((opt) => {
                const isActive = sort === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSort(opt.value as SortOption)}
                    className={`
                      flex items-center justify-between gap-3 px-4 py-4 rounded-lg border text-left
                      transition-all duration-300 ease-lux
                      ${
                        isActive
                          ? 'bg-copper-500/[0.06] border-copper-500'
                          : 'bg-surface border-border hover:border-copper-500/40'
                      }
                    `}
                  >
                    <span
                      className={`text-sm ${
                        isActive ? 'text-ink font-medium' : 'text-ink-muted'
                      }`}
                    >
                      {opt.label}
                    </span>
                    {isActive && (
                      <Check
                        size={16}
                        strokeWidth={2.5}
                        className="text-copper-500"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="shrink-0 border-t border-border px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="group relative flex items-center justify-center gap-2 w-full px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-obsidian-950 rounded-lg overflow-hidden transition-all duration-300 ease-lux hover:-translate-y-0.5"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #E3A468 0%, #D98A44 45%, #C2702E 100%)',
              boxShadow:
                '0 1px 2px rgba(168,90,34,0.20), 0 8px 24px rgba(194,112,46,0.28)',
            }}
          >
            <span className="relative z-10">Show results</span>
          </button>
        </div>
      </motion.div>
    </>
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
      {/* Selection indicator */}
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

      {/* Content */}
      <div className="flex-1 min-w-0">
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

        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-subtle mb-3">
          {vehicle.category}
          {vehicle.units > 1 && (
            <span className="text-ink-muted"> · {vehicle.units} available</span>
          )}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-ink-muted">
          <Spec icon={<Users size={12} />} value={`${vehicle.seats} seats`} />
          <Spec
            icon={<Luggage size={12} />}
            value={`${vehicle.luggage} bags`}
          />
          <Spec icon={<Fuel size={12} />} value={vehicle.fuel} />
          <Spec
            icon={<Car size={12} />}
            value={
              vehicle.transmission === 'Automatic' ? 'Auto' : 'Manual'
            }
          />
        </div>
      </div>

      {/* Price column */}
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
