'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { VEHICLES, type Vehicle } from '../../lib/vehicles';
import { VehicleCardCompact } from './VehicleCardCompact';
import { VehicleModal } from './VehicleModal';
import {
  FleetFilters,
  type FilterState,
  type SortOption,
} from './FleetFilters';

const PRICE_MIN = 3500;
const PRICE_MAX = 55000;

const DEFAULT_FILTERS: FilterState = {
  category: 'All',
  seats: 'any',
  mode: 'All',
  transmission: 'All',
  minPrice: PRICE_MIN,
  maxPrice: PRICE_MAX,
  sort: 'popular',
};

export function VehicleGrid() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>(() => ({
    category: searchParams.get('category') ?? DEFAULT_FILTERS.category,
    seats: searchParams.get('seats') ?? DEFAULT_FILTERS.seats,
    mode: searchParams.get('mode') ?? DEFAULT_FILTERS.mode,
    transmission:
      searchParams.get('transmission') ?? DEFAULT_FILTERS.transmission,
    minPrice: Number(searchParams.get('minPrice')) || DEFAULT_FILTERS.minPrice,
    maxPrice: Number(searchParams.get('maxPrice')) || DEFAULT_FILTERS.maxPrice,
    sort: (searchParams.get('sort') as SortOption) ?? DEFAULT_FILTERS.sort,
  }));

  const [activeVehicle, setActiveVehicle] = useState<Vehicle | null>(null);

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
      if (newFilters.minPrice !== PRICE_MIN)
        params.set('minPrice', newFilters.minPrice.toString());
      if (newFilters.maxPrice !== PRICE_MAX)
        params.set('maxPrice', newFilters.maxPrice.toString());
      if (newFilters.sort !== 'popular') params.set('sort', newFilters.sort);

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router]
  );

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
        list.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }

    return list;
  }, [filters]);

  useEffect(() => {
    const gridAnchor = document.getElementById('fleet-grid-anchor');
    if (gridAnchor) {
      const rect = gridAnchor.getBoundingClientRect();
      if (rect.top < -100) {
        gridAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [filters.category]);

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
          {filtered.map((vehicle) => (
            <VehicleCardCompact
              key={vehicle.id}
              vehicle={vehicle}
              onViewDetails={() => setActiveVehicle(vehicle)}
              showDescription
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-porcelain border border-charcoal-300/30 rounded-sm">
          <p className="font-display text-2xl text-primary-900 mb-3">
            No vehicles match your filters
          </p>
          <p className="text-sm text-charcoal-500 mb-6">
            Try adjusting your selection, or contact us for custom requests.
          </p>
          <button
            type="button"
            onClick={() => updateFilters(DEFAULT_FILTERS)}
            className="btn-primary"
          >
            Clear All Filters
          </button>
        </div>
      )}

      <VehicleModal
        vehicle={activeVehicle}
        onClose={() => setActiveVehicle(null)}
      />
    </>
  );
}
