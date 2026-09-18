'use client';

import { useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { VEHICLES, type Vehicle } from '../../lib/vehicles';
import { VehicleCard } from './VehicleCard';
import { VehicleModal } from './VehicleModal';

type SortOption = 'popular' | 'price-asc' | 'price-desc';

const CATEGORIES = ['All', 'SUV', 'Crossover', 'Van'] as const;
const MODES = ['All', 'Self-Drive', 'Chauffeured'] as const;

export function VehicleGrid() {
  const [category, setCategory] = useState<string>('All');
  const [mode, setMode] = useState<string>('All');
  const [sort, setSort] = useState<SortOption>('popular');
  const [activeVehicle, setActiveVehicle] = useState<Vehicle | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...VEHICLES];

    if (category !== 'All') {
      list = list.filter((v) => v.category === category);
    }

    if (mode !== 'All') {
      list = list.filter(
        (v) => v.mode === mode || v.mode === 'Both'
      );
    }

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.dailyRate - b.dailyRate);
        break;
      case 'price-desc':
        list.sort((a, b) => b.dailyRate - a.dailyRate);
        break;
      case 'popular':
      default:
        list.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }

    return list;
  }, [category, mode, sort]);

  const hasActiveFilters = category !== 'All' || mode !== 'All';

  const clearFilters = () => {
    setCategory('All');
    setMode('All');
  };

  return (
    <>
      {/* ── Filter bar ── */}
      <div className="mb-12">
        {/* Mobile filter toggle */}
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="lg:hidden w-full flex items-center justify-between px-5 py-4 bg-porcelain border border-charcoal-300/30 rounded-sm mb-4"
        >
          <span className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-primary-900">
            <SlidersHorizontal size={16} />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 w-5 h-5 flex items-center justify-center bg-accent-500 text-primary-900 text-[10px] font-bold rounded-full">
                {(category !== 'All' ? 1 : 0) + (mode !== 'All' ? 1 : 0)}
              </span>
            )}
          </span>
          {filtersOpen ? <X size={18} /> : null}
        </button>

        {/* Filter controls */}
        <div
          className={`lg:flex lg:items-center lg:justify-between gap-6 bg-porcelain border border-charcoal-300/30 rounded-sm px-6 py-5 ${
            filtersOpen ? 'block' : 'hidden lg:flex'
          }`}
        >
          {/* Left: filters */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            <FilterGroup
              label="Category"
              options={CATEGORIES as unknown as string[]}
              value={category}
              onChange={setCategory}
            />
            <FilterGroup
              label="Rental Mode"
              options={MODES as unknown as string[]}
              value={mode}
              onChange={setMode}
            />
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-[11px] uppercase tracking-widest text-charcoal-500 hover:text-accent-600 transition-colors flex items-center gap-1"
              >
                <X size={12} />
                Clear
              </button>
            )}
          </div>

          {/* Right: sort + count */}
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <div className="flex items-center gap-2">
              <label className="text-[11px] uppercase tracking-widest text-charcoal-500">
                Sort
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="text-xs bg-transparent border border-charcoal-300/40 rounded-sm px-3 py-1.5 text-primary-900 focus:outline-none focus:border-accent-500"
              >
                <option value="popular">Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Result count */}
        <p className="mt-4 text-[11px] uppercase tracking-widest text-charcoal-500">
          Showing{' '}
          <span className="text-primary-900 font-semibold">
            {filtered.length}
          </span>{' '}
          {filtered.length === 1 ? 'vehicle' : 'vehicles'}
        </p>
      </div>

      {/* ── Grid ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((vehicle, index) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              index={index}
              onViewDetails={() => setActiveVehicle(vehicle)}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="font-display text-2xl text-primary-900 mb-3">
            No vehicles match your filters
          </p>
          <p className="text-sm text-charcoal-500 mb-6">
            Try adjusting your selection, or contact us for custom requests.
          </p>
          <button
            onClick={clearFilters}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* ── Detail modal ── */}
      <VehicleModal
        vehicle={activeVehicle}
        onClose={() => setActiveVehicle(null)}
      />
    </>
  );
}

/* ─────────────────────────────────────────────── */
function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-charcoal-500 mb-2">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider rounded-sm border transition-all duration-200 ${
              value === opt
                ? 'bg-primary-900 text-porcelain border-primary-900'
                : 'bg-transparent text-charcoal-700 border-charcoal-300/40 hover:border-primary-900/50'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}