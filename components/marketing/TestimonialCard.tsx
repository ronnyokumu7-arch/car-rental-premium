'use client';

import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import type { Testimonial } from '../../lib/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="relative flex flex-col bg-primary-900/40 backdrop-blur-sm border border-porcelain/10 rounded-sm p-8 transition-all duration-500 hover:border-accent-500/40 hover:bg-primary-900/60"
    >
      {/* Decorative quote mark */}
      <svg
        viewBox="0 0 32 32"
        className="absolute top-6 right-6 w-10 h-10 text-accent-500/20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M10 6C5 6 2 10 2 15c0 5 3 9 8 9 1 0 2 0 3-1v-4c-1 1-2 1-3 1-2 0-3-2-3-4h6V6zm16 0c-5 0-8 4-8 9 0 5 3 9 8 9 1 0 2 0 3-1v-4c-1 1-2 1-3 1-2 0-3-2-3-4h6V6z" />
      </svg>

      {/* Stars */}
      <div className="flex items-center gap-1 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={
              i < testimonial.rating
                ? 'fill-accent-500 text-accent-500'
                : 'text-porcelain/20'
            }
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="flex-1 mb-8">
        <p className="font-display text-lg leading-relaxed text-porcelain/90">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4 pt-6 border-t border-porcelain/10">
        <div className="w-11 h-11 rounded-full bg-accent-500/15 border border-accent-500/30 flex items-center justify-center shrink-0">
          <span className="font-display text-sm text-accent-500">
            {initials}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-porcelain truncate">
            {testimonial.name}
          </p>
          <p className="text-[10px] uppercase tracking-widest text-porcelain/50 truncate">
            {testimonial.role}
            {testimonial.location && ` · ${testimonial.location}`}
          </p>
        </div>

        {testimonial.source === 'Google' && (
          <div className="flex items-center gap-1.5 shrink-0">
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5"
              aria-label="Google"
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
            <span className="text-[9px] uppercase tracking-widest text-porcelain/40">
              Google
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}