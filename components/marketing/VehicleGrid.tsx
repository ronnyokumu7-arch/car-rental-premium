'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import {
  useSearchParams,
  useRouter,
  usePathname,
} from 'next/navigation';
import { VEHICLES, getPriceRange, type Vehicle } from '../../lib/vehicles';
import { VehicleCard } from './VehicleCard';
import { VehicleModal } from './VehicleModal';
import {
  FleetFilters,
  type FilterState,
  type SortOption,
} from './FleetFilters';

/* ─────────────────────────────────────────────────────────────
   VEHICLE GRID
   The /vehicles main content area.

   Responsibilities:
     • Hold filter state (synced to URL for shareability)
     • Filter + sort the fleet
     • Render VehicleCards
     • Open VehicleModal on card click
     • Show empty state with clear action

   URL params are the source of truth for filters — this makes
   any filtered view shareable and bookmarkable.
   ───────────────────────────────────────────────────────────── */

/* Live price range from the fleet — never hardcode. */
const PRICE_RANGE = getPriceRange();

const DEFAULT_FILTERS: FilterState = {
  category: 'All',
  seats: 'any',
  mode: 'All',
  transmission: 'All',
  minPrice: PRICE_RANGE.min,
  maxPrice: PRICE_RANGE.max,
  sort: 'popular',
};

/* ─────────────────────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────────────────────── */

export function VehicleGrid() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /* ── Filter state — initialized from URL params ── */
  const [filters, setFilters] = useState<FilterState>(() => ({
    category: searchParams.get('category') ?? DEFAULT_FILTERS.category,
    seats: searchParams.get('seats') ?? DEFAULT_FILTERS.seats,
    mode: searchParams.get('mode') ?? DEFAULT_FILTERS.mode,
    transmission:
      searchParams.get('transmission') ?? DEFAULT_FILTERS.transmission,
    minPrice:
      Number(searchParams.get('minPrice')) || DEFAULT_FILTERS.minPrice,
    maxPrice:
      Number(searchParams.get('maxPrice')) || DEFAULT_FILTERS.maxPrice,
    sort: (searchParams.get('sort') as SortOption) ?? DEFAULT_FILTERS.sort,
  }));

  const [activeVehicle, setActiveVehicle] = useState<Vehicle | null>(null);

  /* ── Sync filters to URL ── */
  const updateFilters = useCallback(
    (newFilters: FilterState) => {
      setFilters(newFilters);

      const params = new URLSearchParams();
      if (newFilters.category !== 'All')
        params.set('category', newFilters.category);
      if (newFilters.seats !== 'any') params.set('seats', newFilters.seats);
      if (newFilters.mode !== 'All') params.set('mode', newFilters.mode);
      if (newFilters.transmission !== 'All')
        params.set('transmission', newFilters.transmission);
      if (newFilters.minPrice !== PRICE_RANGE.min)
        params.set('minPrice', newFilters.minPrice.toString());
      if (newFilters.maxPrice !== PRICE_RANGE.max)
        params.set('maxPrice', newFilters.maxPrice.toString());
      if (newFilters.sort !== 'popular') params.set('sort', newFilters.sort);

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router]
  );

  /* ── Filter + sort the fleet ── */
  const filtered = useMemo(() => {
    let list = [...VEHICLES];

    if (filters.category !== 'All') {
      list = list.filter((v) => v.category === filters.category);
    }

    if (filters.seats !== 'any') {
      const targetSeats = Number(filters.seats);
      list = list.filter((v) => v.seats >= targetSeats);
    }

    if (filters.mode !== 'All') {
      list = list.filter(
        (v) => v.mode === filters.mode || v.mode === 'Both'
      );
    }

    if (filters.transmission !== 'All') {
      list = list.filter((v) => v.transmission === filters.transmission);
    }

    list = list.filter(
      (v) =>
        v.dailyRate >= filters.minPrice && v.dailyRate <= filters.maxPrice
    );

    switch (filters.sort) {
      case 'price-asc':
        list.sort((a, b) => a.dailyRate - b.dailyRate);
        break;
      case 'price-desc':
        list.sort((a, b) => b.dailyRate - a.dailyRate);
        break;
      case 'popular':
      default:
        list.sort(
          (a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0)
        );
    }

    return list;
  }, [filters]);

  /* ── Modal open/close drives the FAB visibility contract ── */
  useEffect(() => {
    if (activeVehicle) {
      document.body.dataset.modalOpen = 'true';
    } else {
      delete document.body.dataset.modalOpen;
    }
    return () => {
      delete document.body.dataset.modalOpen;
    };
  }, [activeVehicle]);

  /* ── Scroll grid into view when the category filter changes ── */
  useEffect(() => {
    const gridAnchor = document.getElementById('fleet-grid-anchor');
    if (!gridAnchor) return;
    const rect = gridAnchor.getBoundingClientRect();
    if (rect.top < -100) {
      gridAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [filters.category]);

  const clearFilters = useCallback(
    () => updateFilters(DEFAULT_FILTERS),
    [updateFilters]
  );

  return (
    <>
      <FleetFilters
        filters={filters}
        onFiltersChange={updateFilters}
        resultCount={filtered.length}
      />

      <div id="fleet-grid-anchor" className="scroll-mt-24" />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((vehicle, i) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              index={i}
              priority={i === 0}
              onViewDetails={() => setActiveVehicle(vehicle)}
            />
          ))}
        </div>
      ) : (
        <EmptyState onClear={clearFilters} />
      )}

      <VehicleModal
        vehicle={activeVehicle}
        onClose={() => setActiveVehicle(null)}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   EMPTY STATE
   ───────────────────────────────────────────────────────────── */
function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="py-20 px-8 text-center bg-surface-sunken border border-border rounded-lg">
      <p className="font-display text-2xl text-ink mb-3">
        No vehicles match your filters
      </p>
      <p className="text-sm text-ink-muted mb-6 max-w-md mx-auto leading-relaxed">
        Try adjusting your selection, or contact us for custom requests —
        we regularly source vehicles to order.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center justify-center px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink border border-border rounded-md hover:border-copper-500/60 hover:text-copper-600 transition-all duration-300 ease-lux"
      >
        Clear All Filters
      </button>
    </div>
  );
}
