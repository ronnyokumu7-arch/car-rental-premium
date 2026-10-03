'use client';

import { useState, useRef, useEffect } from 'react';
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
  { value: '8', label: '8+' },
];
const MODES = ['All', 'Self-Drive', 'Chauffeured'] as const;
const TRANSMISSIONS = ['All', 'Automatic', 'Manual'] as const;

const PRICE_MIN = 3500;
const PRICE_MAX = 55000;
const PRICE_STEP = 500;

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

  // Close on outside click — but not on scroll
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

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: 'All',
      seats: 'any',
      mode: 'All',
      transmission: 'All',
      minPrice: PRICE_MIN,
      maxPrice: PRICE_MAX,
      sort: filters.sort,
    });
  };

  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.seats !== 'any' ||
    filters.mode !== 'All' ||
    filters.transmission !== 'All' ||
    filters.minPrice !== PRICE_MIN ||
    filters.maxPrice !== PRICE_MAX;

  // Count of hidden filters — now excludes sort since it's always visible
  const hiddenActiveCount =
    (filters.mode !== 'All' ? 1 : 0) +
    (filters.transmission !== 'All' ? 1 : 0);

  return (
    <div className="mb-12">
      {/* ── Category tabs ── */}
      <div className="border-b border-charcoal-300/30 mb-6">
        <div className="flex items-stretch -mb-px overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => {
            const isActive = filters.category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => updateFilter('category', cat)}
                className={`
                  relative shrink-0 flex items-center justify-center
                  px-5 py-3
                  text-[11px] font-medium uppercase tracking-[0.1em]
                  whitespace-nowrap
                  transition-colors duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2
                  ${
                    isActive
                      ? 'text-primary-900'
                      : 'text-charcoal-500 hover:text-primary-900'
                  }
                `}
              >
                {cat === 'All' ? 'All Vehicles' : cat}
                {isActive && (
                  <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-accent-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Filter card ── */}
      <div
        ref={cardRef}
        className="bg-porcelain border border-charcoal-300/30 rounded-sm p-6 lg:p-8"
      >
        {/* Header with toggle */}
        <div className="flex items-center justify-between mb-6 pb-5 border-b border-charcoal-300/20">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-charcoal-400" />
            <p className="text-[11px] font-medium uppercase tracking-widest text-primary-900">
              Refine Results
            </p>
          </div>

          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-widest text-charcoal-500 hover:text-accent-600 transition-colors"
              >
                <X size={12} />
                Clear
              </button>
            )}

            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="lg:hidden inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-accent-600 hover:text-primary-900 transition-colors"
            >
              {expanded ? 'Less' : 'More'}
              {hiddenActiveCount > 0 && !expanded && (
                <span className="w-4 h-4 flex items-center justify-center bg-accent-500 text-primary-900 text-[9px] font-bold rounded-full">
                  {hiddenActiveCount}
                </span>
              )}
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${
                  expanded ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* ── Always-visible filters (Seats) ── */}
        <div className="mb-8">
          <FilterGroup
            label="Seats"
            icon={<Armchair size={14} />}
            options={SEAT_OPTIONS.map((s) => ({ value: s.value, label: s.label }))}
            value={filters.seats}
            onChange={(v) => updateFilter('seats', v)}
          />
        </div>

        {/* ── Collapsible filters — Rental Mode & Transmission only ── */}
        <div
          className={`
            grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8
            transition-all duration-300 overflow-hidden
            lg:!max-h-none lg:!opacity-100 lg:!mb-8
            ${
              expanded
                ? 'max-h-[600px] opacity-100 mb-8'
                : 'max-h-0 opacity-0 mb-0 lg:mb-8'
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

        {/* ── Green-tinted band — Sort By + Price Range ── */}
        <div className="relative -mx-6 lg:-mx-8 px-6 lg:px-8 py-5 rounded-sm bg-[#0d3b2e]/[0.04]">
          {/* Sort By */}
          <div className="mb-6">
            <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-charcoal-700 mb-3">
              <Tag size={14} className="text-[#0d3b2e]/70" />
              Sort By
            </label>
            <select
              value={filters.sort}
              onChange={(e) =>
                updateFilter('sort', e.target.value as SortOption)
              }
              className="booking-input"
            >
              <option value="popular">Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="pt-6 border-t border-[#0d3b2e]/10">
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-charcoal-700">
                <Tag size={14} className="text-[#0d3b2e]/70" />
                Price Range (per day)
              </label>
              <span className="text-[12px] font-semibold text-primary-900">
                KES {filters.minPrice.toLocaleString('en-KE')} –{' '}
                {filters.maxPrice.toLocaleString('en-KE')}
              </span>
            </div>

            <div className="px-1 pt-1">
              <Range
                values={[filters.minPrice, filters.maxPrice]}
                step={PRICE_STEP}
                min={PRICE_MIN}
                max={PRICE_MAX}
                onChange={(values) => {
                  updateFilter('minPrice', values[0]);
                  updateFilter('maxPrice', values[1]);
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
                        left: `${
                          ((filters.minPrice - PRICE_MIN) /
                            (PRICE_MAX - PRICE_MIN)) *
                          100
                        }%`,
                        right: `${
                          100 -
                          ((filters.maxPrice - PRICE_MIN) /
                            (PRICE_MAX - PRICE_MIN)) *
                            100
                        }%`,
                      }}
                    />
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    className="price-range-thumb"
                    style={props.style}
                  />
                )}
              />
            </div>

            {/* Helper text */}
            <div className="mt-4 pt-3 border-t border-[#0d3b2e]/10 flex items-center gap-2">
              <ShieldCheck size={12} className="text-[#0d3b2e]/70 shrink-0" />
              <p className="text-[10px] uppercase tracking-widest text-charcoal-500">
                Standard rates. No hidden fees.
              </p>
            </div>
          </div>
        </div>

        {/* Result count */}
        <div className="mt-8 pt-6 border-t border-charcoal-300/20">
          <p className="text-[11px] uppercase tracking-widest text-charcoal-500">
            Showing{' '}
            <span className="text-primary-900 font-semibold">
              {resultCount}
            </span>{' '}
            {resultCount === 1 ? 'vehicle' : 'vehicles'}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Reusable filter group                                       */
/* ─────────────────────────────────────────────────────────── */
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
      <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-charcoal-500 mb-3">
        <span className="text-charcoal-400">{icon}</span>
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
                rounded-sm border
                transition-colors duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2
                ${
                  isActive
                    ? 'bg-primary-900 border-primary-900 text-porcelain'
                    : 'bg-white border-charcoal-300/50 text-charcoal-700 hover:border-primary-900/50 hover:text-primary-900'
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
