'use client';

import { motion } from 'motion/react';
import {
  CalendarCheck,
  PhoneCall,
  MapPin,
  Key,
  RotateCcw,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   SERVICES GRID → THE JOURNEY
   A horizontal walkthrough of what happens when you hire from
   Royride — from first click to final handover.

   Purpose:
     • Answer "how does this actually work?" for first-timers
     • Build confidence through transparency
     • Differentiate from transactional rental sites

   Different job from FinalCTA:
     FinalCTA asks "how do you want to drive?"
     This asks "what happens after I book?"
   ───────────────────────────────────────────────────────────── */

const STEPS = [
  {
    icon: CalendarCheck,
    step: '01',
    title: 'You book',
    duration: '5 minutes',
    description:
      'Pick your car, dates, and pickup location. Confirm in minutes — no paperwork, no office visit.',
  },
  {
    icon: PhoneCall,
    step: '02',
    title: 'We confirm',
    duration: 'Within 2 hours',
    description:
      'A concierge calls or texts to confirm your booking, driver (if any), and delivery window.',
  },
  {
    icon: MapPin,
    step: '03',
    title: 'We deliver',
    duration: 'To your door',
    description:
      'Your car arrives at your address — home, hotel, or JKIA arrivals. Free within Nairobi.',
  },
  {
    icon: Key,
    step: '04',
    title: 'You drive',
    duration: 'Anywhere in Kenya',
    description:
      'Fully insured, freshly cleaned, tank filled. Explore Kenya on your own terms.',
  },
  {
    icon: RotateCcw,
    step: '05',
    title: 'We collect',
    duration: 'Same place, any time',
    description:
      'Return to us, or we come get it. Free collection from Utawala or same-as-pickup drop-off.',
  },
] as const;

export function ServicesGrid() {
  return (
    <section className="relative bg-background py-20 lg:py-28 px-6 lg:px-8 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">

        {/* ═══════════════════════════════════════════
            HEADER
            ═══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-16 lg:mb-20"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-600 mb-4">
            How It Works
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.1] tracking-[-0.015em] mb-5">
            From first click to final handover.
          </h2>
          <p className="text-base lg:text-lg text-ink-muted leading-relaxed font-light max-w-2xl">
            Five steps, no surprises. Here&apos;s exactly what happens when
            you hire from Royride.
          </p>
        </motion.div>

        {/* ═══════════════════════════════════════════
            TIMELINE
            Desktop: horizontal line + dots + cards below
            Mobile: vertical line + dots + cards to the right
            ═══════════════════════════════════════════ */}

        {/* ── Desktop timeline (horizontal) ── */}
        <div className="hidden lg:block relative">
          {/* Connection line */}
          <div
            aria-hidden="true"
            className="absolute top-[26px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-border-strong to-transparent"
          />

          <div className="relative grid grid-cols-5 gap-6">
            {STEPS.map((step, i) => (
              <StepCard key={step.step} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* ── Mobile timeline (vertical) ── */}
        <div className="lg:hidden relative">
          <div className="relative space-y-10">
            {STEPS.map((step, i) => (
              <StepCardMobile
                key={step.step}
                step={step}
                index={i}
                isLast={i === STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   STEP CARD — desktop
   Vertical stack inside a column: dot → icon → step number →
   title → duration → description
   ───────────────────────────────────────────────────────────── */

function StepCard({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col items-center text-center"
    >
      {/* Timeline dot */}
      <span
        aria-hidden="true"
        className="relative z-10 flex items-center justify-center w-[52px] h-[52px] rounded-full bg-surface border border-border transition-all duration-500 ease-lux group-hover:border-copper-500/60 group-hover:bg-copper-500/[0.06]"
      >
        <Icon
          size={20}
          strokeWidth={1.75}
          className="text-copper-600 transition-transform duration-500 ease-lux group-hover:scale-110"
        />
      </span>

      {/* Step number */}
      <span className="mt-6 text-[10px] font-mono uppercase tracking-[0.24em] text-ink-subtle tabular-nums">
        Step {step.step}
      </span>

      {/* Title */}
      <h3 className="mt-3 font-display text-xl text-ink leading-tight tracking-[-0.01em]">
        {step.title}
      </h3>

      {/* Duration */}
      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-copper-600">
        {step.duration}
      </p>

      {/* Description */}
      <p className="mt-4 text-sm text-ink-muted leading-relaxed font-light">
        {step.description}
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STEP CARD — mobile
   Horizontal layout: dot + icon on the left, content on the right.
   Vertical line connecting each dot.
   ───────────────────────────────────────────────────────────── */

function StepCardMobile({
  step,
  index,
  isLast,
}: {
  step: (typeof STEPS)[number];
  index: number;
  isLast: boolean;
}) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex gap-5"
    >
      {/* Timeline column — icon + connecting line */}
      <div className="flex flex-col items-center shrink-0">
        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-border shrink-0">
          <Icon size={18} strokeWidth={1.75} className="text-copper-600" />
        </span>
        {!isLast && (
          <span
            aria-hidden="true"
            className="flex-1 w-px bg-border-strong mt-3"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-2">
        <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-ink-subtle tabular-nums">
          Step {step.step}
        </span>

        <h3 className="mt-2 font-display text-xl text-ink leading-tight tracking-[-0.01em]">
          {step.title}
        </h3>

        <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-copper-600">
          {step.duration}
        </p>

        <p className="mt-3 text-sm text-ink-muted leading-relaxed font-light">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
