'use client';

import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import type { Testimonial } from '../../lib/testimonials';

/* ─────────────────────────────────────────────────────────────
   TESTIMONIAL CARD
   Dark surface, editorial typography, copper accents.
   Cycles through 3 ambient variants so a grid of cards
   doesn't look repetitive.

   Layout order:
     Stars + Google badge  (top row)
     Quote                 (editorial, Playfair)
     ─── hairline ───
     Author + role         (full width — no truncation)
   ───────────────────────────────────────────────────────────── */

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

const CARD_VARIANTS = [
  {
    gradient:
      'linear-gradient(135deg, #070708 0%, #0E0E10 55%, #18181B 100%)',
    glow: 'rgba(194, 112, 46, 0.14)',
  },
  {
    gradient:
      'linear-gradient(135deg, #0E0E10 0%, #18181B 55%, #27272A 100%)',
    glow: 'rgba(194, 112, 46, 0.20)',
  },
  {
    gradient:
      'linear-gradient(135deg, #18181B 0%, #2A1810 55%, #472410 100%)',
    glow: 'rgba(217, 138, 68, 0.22)',
  },
];

export function TestimonialCard({
  testimonial,
  index = 0,
}: TestimonialCardProps) {
  const initials = testimonial.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const variant = CARD_VARIANTS[index % CARD_VARIANTS.length];

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative flex flex-col
        rounded-lg
        p-6 sm:p-8 lg:p-9
        transition-all duration-500 ease-lux
        hover:-translate-y-1
        hover:shadow-[0_24px_56px_rgba(14,14,16,0.20)]
      "
    >
      {/* Base gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-lg"
        style={{ background: variant.gradient }}
      />

      {/* Warm copper glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-lg opacity-50 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 80% 15%, ${variant.glow} 0%, transparent 60%)`,
        }}
      />

      {/* Grain */}
      <div className="grain-overlay absolute inset-0 rounded-lg opacity-[0.08] mix-blend-overlay pointer-events-none" />

      {/* Copper top hairline */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent"
      />

      {/* Decorative quote mark */}
      <svg
        viewBox="0 0 32 32"
        className="absolute top-5 right-6 w-8 h-8 text-copper-400/15"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M10 6C5 6 2 10 2 15c0 5 3 9 8 9 1 0 2 0 3-1v-4c-1 1-2 1-3 1-2 0-3-2-3-4h6V6zm16 0c-5 0-8 4-8 9 0 5 3 9 8 9 1 0 2 0 3-1v-4c-1 1-2 1-3 1-2 0-3-2-3-4h6V6z" />
      </svg>

      {/* ═══ CONTENT ═══ */}
      <div className="relative flex flex-col flex-1">

        {/* ── Top row: stars + Google badge ── */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div
            className="flex items-center gap-0.5"
            aria-label={`${testimonial.rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                strokeWidth={2}
                className={
                  i < testimonial.rating
                    ? 'fill-copper-400 text-copper-400'
                    : 'text-white/15'
                }
              />
            ))}
          </div>

          {testimonial.source === 'Google' && (
            <div
              className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-white/95"
              aria-label="Verified Google review"
              title="Verified Google review"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* ── Quote ── */}
        <blockquote className="flex-1 mb-6">
          <p className="font-display text-[15px] sm:text-lg lg:text-xl leading-[1.55] text-white/90 tracking-[-0.005em]">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </blockquote>

        {/* ── Author block ── */}
        <figcaption className="flex items-center gap-3 pt-5 border-t border-white/[0.08]">
          <div className="w-10 h-10 rounded-full bg-copper-500/[0.12] border border-copper-500/30 flex items-center justify-center shrink-0">
            <span className="font-display text-xs text-copper-300">
              {initials}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-white leading-tight">
              {testimonial.name}
            </p>
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/45 leading-tight mt-1">
              {testimonial.role}
              {testimonial.location && ` · ${testimonial.location}`}
            </p>
          </div>
        </figcaption>
      </div>
    </motion.figure>
  );
}
