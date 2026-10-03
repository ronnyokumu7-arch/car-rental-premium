'use client';

import Link from 'next/link';
import {
  Truck,
  CarFront,
  Bus,
  Calendar,
  ArrowRight,
} from 'lucide-react';

const CATEGORIES = [
  {
    id: 'suv',
    label: 'SUV',
    description: 'Executive & family 4x4s',
    icon: Truck,
    href: '/vehicles?category=SUV',
  },
  {
    id: 'crossover',
    label: 'Crossover',
    description: 'Refined & versatile',
    icon: CarFront,
    href: '/vehicles?category=Crossover',
  },
  {
    id: 'van',
    label: 'Van',
    description: 'Group transfers & families',
    icon: Bus,
    href: '/vehicles?category=Van',
  },
  {
    id: 'long-term',
    label: 'Long-Term',
    description: 'Monthly hire rates',
    icon: Calendar,
    href: '/contact',
  },
];

export function CategoryGrid() {
  return (
    <section className="bg-porcelain pt-16 lg:pt-20 pb-8 lg:pb-12 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 lg:mb-10">
          <p className="type-caption text-accent-600 mb-2">
            Browse by Category
          </p>
          <h2 className="font-display text-2xl lg:text-3xl text-primary-900 leading-tight">
            Find Your Perfect Vehicle
          </h2>
        </div>

        {/* Grid / Carousel container */}
        <div
          className="
            flex lg:grid lg:grid-cols-4 gap-3 lg:gap-4
            overflow-x-auto lg:overflow-visible
            snap-x snap-mandatory lg:snap-none
            -mx-6 lg:mx-0
            px-6 lg:px-0
            pb-4 lg:pb-0
            scrollbar-hide
          "
        >
          {CATEGORIES.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.id}
                href={category.href}
                className="
                  group
                  snap-start shrink-0
                  w-[75%] sm:w-[45%] lg:w-auto
                  flex flex-row lg:flex-col
                  items-center lg:items-start
                  gap-4 lg:gap-0
                  p-4 lg:p-6
                  bg-porcelain
                  border border-charcoal-300/30
                  rounded-sm
                  shadow-[0_8px_24px_-8px_rgba(8,21,41,0.12)]
                  lg:shadow-none
                  transition-all duration-300
                  hover:border-accent-500/40
                  hover:shadow-lg
                  hover:-translate-y-0.5
                "
              >
                {/* Icon — navy circle, gold icon */}
                <div className="w-12 h-12 shrink-0 rounded-full bg-primary-900 flex items-center justify-center text-accent-500 transition-transform duration-300 group-hover:scale-110 lg:mb-4">
                  <Icon size={20} strokeWidth={1.75} />
                </div>

                {/* Content */}
                <div className="flex flex-col min-w-0 flex-1 lg:flex-none">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-primary-900 mb-1">
                    {category.label}
                  </p>

                  <p className="text-xs text-charcoal-500 leading-relaxed mb-2 lg:mb-4 lg:flex-1">
                    {category.description}
                  </p>

                  <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.15em] text-accent-600 transition-all duration-300 group-hover:gap-2">
                    View
                    <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
