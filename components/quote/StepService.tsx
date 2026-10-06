'use client';

import { Car, Plane, Check } from 'lucide-react';
import { motion } from 'motion/react';
import type { QuoteService } from '../../lib/quote';

/* ─────────────────────────────────────────────────────────────
   STEP 1 — SERVICE
   The first decision. Two big tiles: Car hire or Airport
   transfer. Whichever the user picks determines the rest of
   the wizard's shape.

   Not the same as the booking bar's tabs:
     • Booking bar → a form that submits immediately
     • This step   → a wizard that builds toward a quote

   The two tiles are tactile, editorial, and take up space.
   This is the opening question — it deserves the room.
   ───────────────────────────────────────────────────────────── */

const OPTIONS: {
  value: QuoteService;
  label: string;
  hint: string;
  description: string;
  icon: typeof Car;
}[] = [
  {
    value: 'car-hire',
    label: 'Car hire',
    hint: 'Self-drive or chauffeured',
    description:
      'Choose a vehicle, pick your dates, and drive on your own schedule. Delivered to your door.',
    icon: Car,
  },
  {
    value: 'airport-transfer',
    label: 'Airport transfer',
    hint: 'JKIA or Wilson',
    description:
      'Arrive in comfort. A professional chauffeur meets you, handles your luggage, and drives you straight to your destination.',
    icon: Plane,
  },
];

export function StepService({
  value,
  onChange,
}: {
  value: QuoteService | null;
  onChange: (value: QuoteService) => void;
}) {
  return (
    <div>
      {/* ── Section header ── */}
      <header className="mb-8 lg:mb-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-600 mb-3">
          Step 01 — What do you need?
        </p>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink leading-[1.1] tracking-[-0.015em] mb-3">
          Pick a service to quote.
        </h2>
        <p className="text-sm lg:text-base text-ink-muted leading-relaxed font-light max-w-xl">
          Both take under a minute. You can start over at any time.
        </p>
      </header>

      {/* ── Two tiles ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
        {OPTIONS.map((opt, i) => {
          const Icon = opt.icon;
          const isActive = value === opt.value;

          return (
            <motion.button
              key={opt.value}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => onChange(opt.value)}
              aria-pressed={isActive}
              className={`
                group relative flex flex-col items-start text-left
                p-6 lg:p-7 rounded-2xl border
                transition-all duration-300 ease-lux
                focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2
                ${
                  isActive
                    ? 'bg-obsidian-950 border-obsidian-950 text-white shadow-[0_12px_32px_rgba(14,14,16,0.20)]'
                    : 'bg-surface border-border text-ink hover:border-copper-500/40 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(14,14,16,0.08)]'
                }
              `}
            >
              {/* Selected checkmark — top-right */}
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-5 right-5 flex items-center justify-center w-7 h-7 rounded-full bg-copper-500 text-obsidian-950 shadow-[0_4px_12px_rgba(194,112,46,0.40)]"
                  aria-hidden="true"
                >
                  <Check size={14} strokeWidth={3} />
                </motion.span>
              )}

              {/* Icon */}
              <div
                className={`
                  flex items-center justify-center w-12 h-12 rounded-xl mb-6
                  transition-all duration-300 ease-lux
                  ${
                    isActive
                      ? 'bg-copper-500 text-obsidian-950'
                      : 'bg-copper-500/[0.10] border border-copper-500/25 text-copper-600 group-hover:scale-105'
                  }
                `}
              >
                <Icon size={20} strokeWidth={2} />
              </div>

              {/* Hint eyebrow */}
              <p
                className={`
                  text-[10px] font-semibold uppercase tracking-[0.22em] mb-2
                  transition-colors duration-300
                  ${isActive ? 'text-copper-300' : 'text-copper-600'}
                `}
              >
                {opt.hint}
              </p>

              {/* Label */}
              <h3
                className={`
                  font-display text-xl lg:text-2xl leading-tight tracking-[-0.01em] mb-3
                  transition-colors duration-300
                  ${isActive ? 'text-white' : 'text-ink'}
                `}
              >
                {opt.label}
              </h3>

              {/* Description */}
              <p
                className={`
                  text-sm leading-relaxed font-light
                  transition-colors duration-300
                  ${isActive ? 'text-white/70' : 'text-ink-muted'}
                `}
              >
                {opt.description}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* ── Bottom hint (only when a service is selected) ── */}
      {value && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-subtle text-center"
        >
          {value === 'car-hire'
            ? 'Next: trip details'
            : 'Next: transfer details'}
        </motion.p>
      )}
    </div>
  );
}
