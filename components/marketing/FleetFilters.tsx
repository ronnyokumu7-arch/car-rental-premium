'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Range } from 'react-range';
import {
  SlidersHorizontal,
  Armchair,
  UserCheck,
  Settings2,
  Tag,
  X,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';
import { getPriceRange } from '../../lib/vehicles';
import { Select } from '../ui/Select';

/* ─────────────────────────────────────────────────────────────
   FLEET FILTERS
   Sidebar-style filter panel above the vehicle grid.

   Behavior:
     • Categories as top tabs (always visible)
     • Seats always visible (primary filter)
     • Mode + Transmission collapse on mobile
     • Sort + Price range in a sunken sub-panel
     • Filter state lives in URL params (owned by VehicleGrid)

   Price range is pulled from lib/vehicles.ts — never hardcode.
   ───────────────────────────────────────────────────────────── */

export type SortOption = 'popular' | 'price-asc' | 'price-desc';

export interface FilterState {
  category: string;
  seats: string;
  mode: string;
  transmission: string;
  minPrice: number;
  maxPrice: number;
  sort: SortOption;
}

const CATEGORIES = ['All', 'SUV', 'Crossover', 'Van'] as const;

const SEAT_OPTIONS = [
  { value: 'any', label: 'Any' },
  { value: '5', label: '5' },
  { value: '7', label: '7' },
  { value: '8+', label: '8+' },
];

const MODES = ['All', 'Self-Drive', 'Chauffeured'] as const;
const TRANSMISSIONS = ['All', 'Auto', 'Manual'] as const;

const SORT_OPTIONS = [
  { value: 'popular', label: 'Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

/* Live price range from the fleet — never hardcode. */
const PRICE_RANGE = getPriceRange();
const PRICE_STEP = 500;

/* ─────────────────────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────────────────────── */

interface FleetFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  resultCount: number;
}

export function FleetFilters({
  filters,
  onFiltersChange,
  resultCount,
}: FleetFiltersProps) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  /* ── Close collapsed panel on outside click ── */
  useEffect(() => {
    if (!expanded) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (cardRef.current && !cardRef.current.contains(target)) {
        setExpanded(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [expanded]);

  /* ── Filter updates ── */
  const updateFilter = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      onFiltersChange({ ...filters, [key]: value });
    },
    [filters, onFiltersChange]
  );

  const clearFilters = useCallback(() => {
    onFiltersChange({
      category: 'All',
      seats: 'any',
      mode: 'All',
      transmission: 'All',
      minPrice: PRICE_RANGE.min,
      maxPrice: PRICE_RANGE.max,
      sort: filters.sort,
    });
  }, [filters.sort, onFiltersChange]);

  /* ── Derived state ── */
  const hasActiveFilters = useMemo(
    () =>
      filters.category !== 'All' ||
      filters.seats !== 'any' ||
      filters.mode !== 'All' ||
      filters.transmission !== 'All' ||
      filters.minPrice !== PRICE_RANGE.min ||
      filters.maxPrice !== PRICE_RANGE.max,
    [filters]
  );

  const hiddenActiveCount =
    (filters.mode !== 'All' ? 1 : 0) +
    (filters.transmission !== 'All' ? 1 : 0);

  /* ── Range track offsets ── */
  const [rangeLeftPct, rangeRightPct] = useMemo(() => {
    const span = PRICE_RANGE.max - PRICE_RANGE.min || 1;
    const left = ((filters.minPrice - PRICE_RANGE.min) / span) * 100;
    const right =
      100 - ((filters.maxPrice - PRICE_RANGE.min) / span) * 100;
    return [left, right];
  }, [filters.minPrice, filters.maxPrice]);

  return (
    <div className="mb-12">
      {/* ═══════════════════════════════════════════
          Category tabs
          ═══════════════════════════════════════════ */}
      <div className="border-b border-border mb-6">
        <div className="flex items-stretch -mb-px overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => {
            const isActive = filters.category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => updateFilter('category', cat)}
                aria-pressed={isActive}
                className={`
                  relative shrink-0 flex items-center justify-center
                  px-5 py-3
                  text-[11px] font-medium uppercase tracking-[0.1em]
                  whitespace-nowrap
                  transition-colors duration-200 ease-lux
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2
                  ${
                    isActive
                      ? 'text-ink'
                      : 'text-ink-muted hover:text-ink'
                  }
                `}
              >
                {cat === 'All' ? 'All Vehicles' : cat}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-px h-0.5 bg-copper-500 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          Filter card
          ═══════════════════════════════════════════ */}
      <div
        ref={cardRef}
        className="bg-surface border border-border rounded-lg p-6 lg:p-8"
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-6 pb-5 border-b border-border">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-ink-subtle" />
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink">
              Refine Results
            </p>
          </div>

          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.16em] text-ink-subtle hover:text-copper-600 transition-colors duration-300"
              >
                <X size={12} />
                Clear
              </button>
            )}

            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="lg:hidden inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-copper-600 hover:text-copper-700 transition-colors duration-300"
            >
              {expanded ? 'Less' : 'More'}
              {hiddenActiveCount > 0 && !expanded && (
                <span className="w-4 h-4 flex items-center justify-center bg-copper-500 text-obsidian-950 text-[9px] font-bold rounded-full">
                  {hiddenActiveCount}
                </span>
              )}
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ease-lux ${
                  expanded ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            Always-visible: Seats
            ═══════════════════════════════════════════ */}
        <div className="mb-8">
          <FilterGroup
            label="Seats"
            icon={<Armchair size={14} />}
            options={SEAT_OPTIONS}
            value={filters.seats}
            onChange={(v) => updateFilter('seats', v)}
          />
        </div>

        {/* ═══════════════════════════════════════════
            Collapsible: Mode + Transmission
            Mobile: toggled. Desktop: always visible.
            ═══════════════════════════════════════════ */}
        <div
          className={`
            grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8
            transition-all duration-300 ease-lux overflow-hidden
            lg:!max-h-none lg:!opacity-100 lg:!mb-8
            ${
              expanded
                ? 'max-h-[600px] opacity-100 mb-8'
                : 'max-h-0 opacity-0 mb-0'
            }
          `}
        >
          <FilterGroup
            label="Rental Mode"
            icon={<UserCheck size={14} />}
            options={MODES.map((m) => ({ value: m, label: m }))}
            value={filters.mode}
            onChange={(v) => updateFilter('mode', v)}
          />

          <FilterGroup
            label="Transmission"
            icon={<Settings2 size={14} />}
            options={TRANSMISSIONS.map((t) => ({ value: t, label: t }))}
            value={filters.transmission}
            onChange={(v) => updateFilter('transmission', v)}
          />
        </div>

        {/* ═══════════════════════════════════════════
            Sub-panel: Sort + Price
            Sunken surface creates a "control room" feel.
            ═══════════════════════════════════════════ */}
        <div className="relative -mx-6 lg:-mx-8 px-6 lg:px-8 py-5 bg-surface-sunken border-y border-border">
          {/* Sort */}
          <div className="mb-6">
            <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-subtle mb-3">
              <Tag size={14} className="text-ink-subtle" />
              Sort By
            </label>

            <Select
              name="sort"
              value={filters.sort}
              onChange={(v) => updateFilter('sort', v as SortOption)}
              options={SORT_OPTIONS}
              placeholder="Sort by…"
              sheetTitle="Sort by"
              ariaLabel="Sort vehicles by"
            />
          </div>

          {/* Price Range */}
          <div className="pt-6 border-t border-border">
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-subtle">
                <Tag size={14} className="text-ink-subtle" />
                Price Range (per day)
              </label>
              <span className="text-[12px] font-semibold text-ink tabular-nums">
                KES {filters.minPrice.toLocaleString('en-KE')} –{' '}
                {filters.maxPrice.toLocaleString('en-KE')}
              </span>
            </div>

            <div className="px-1 pt-3">
              <Range
                values={[filters.minPrice, filters.maxPrice]}
                step={PRICE_STEP}
                min={PRICE_RANGE.min}
                max={PRICE_RANGE.max}
                onChange={(values) => {
                  onFiltersChange({
                    ...filters,
                    minPrice: values[0],
                    maxPrice: values[1],
                  });
                }}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    className="price-range-track"
                    style={props.style}
                  >
                    <div
                      className="price-range-track-active"
                      style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: `${rangeLeftPct}%`,
                        right: `${rangeRightPct}%`,
                      }}
                    />
                    {children}
                  </div>
                )}
                renderThumb={({ props, index }) => {
                  const { key, ...rest } = props;
                  return (
                    <div
                      key={key}
                      {...rest}
                      className="price-range-thumb"
                      aria-label={
                        index === 0
                          ? 'Minimum daily price'
                          : 'Maximum daily price'
                      }
                    />
                  );
                }}
              />
            </div>

            {/* Trust line */}
            <div className="mt-4 pt-3 border-t border-border flex items-center gap-2">
              <ShieldCheck
                size={12}
                className="text-copper-500 shrink-0"
              />
              <p className="text-[10px] uppercase tracking-widest text-ink-subtle">
                Standard rates. No hidden fees.
              </p>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            Result count
            ═══════════════════════════════════════════ */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-[11px] uppercase tracking-widest text-ink-subtle">
            Showing{' '}
            <span className="text-ink font-semibold tabular-nums">
              {resultCount}
            </span>{' '}
            {resultCount === 1 ? 'vehicle' : 'vehicles'}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FILTER GROUP
   Reusable pill row for any filter dimension.
   ───────────────────────────────────────────────────────────── */
function FilterGroup({
  label,
  icon,
  options,
  value,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-subtle mb-3">
        <span className="text-ink-subtle">{icon}</span>
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isActive = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={isActive}
              className={`
                inline-flex items-center justify-center
                h-10 px-4
                text-xs font-medium uppercase tracking-wider
                rounded-md border
                transition-all duration-200 ease-lux
                focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2
                ${
                  isActive
                    ? 'bg-obsidian-900 border-obsidian-900 text-white shadow-[0_4px_12px_rgba(14,14,16,0.15)]'
                    : 'bg-surface border-border text-ink-muted hover:border-obsidian-900/40 hover:text-ink'
                }
              `}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
