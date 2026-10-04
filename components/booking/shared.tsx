'use client';

import { useFormStatus } from 'react-dom';
import {
  MapPin,
  ArrowRight,
  Check,
  ShieldCheck,
  Plane,
  Clock,
} from 'lucide-react';
import type { ReactNode } from 'react';

/* ─────────────────────────────────────────────────────────────
   SHARED PRIMITIVES — booking bar
   Used by CarHireTab, AirportTransferTab, and BookingBar.

   Design language:
     • Obsidian surfaces, copper accents
     • ease-lux motion curve
     • Tabular numerals for prices and counts
     • Semantic tokens (bg-surface, text-ink, border-border)
   ───────────────────────────────────────────────────────────── */

/* ═══════════════════════════════════════════════════════
   FIELD WRAPPER — label + icon + children + optional hint
   ═══════════════════════════════════════════════════════ */
export function FieldWrapper({
  label,
  icon,
  hint,
  children,
}: {
  label: string;
  icon: ReactNode;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-subtle mb-2">
        <span className="text-ink-subtle">{icon}</span>
        {label}
      </label>
      {children}
      {hint && (
        <p className="mt-1.5 text-[10px] uppercase tracking-widest text-ink-subtle">
          {hint}
        </p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PILL BUTTON — seat counts, passenger counts, vehicle types
   ═══════════════════════════════════════════════════════ */
export function PillButton({
  children,
  onClick,
  active = false,
  pressed,
  type = 'button',
}: {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  /** aria-pressed — set when this is a toggle. */
  pressed?: boolean;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-pressed={pressed ?? active}
      className={`
        inline-flex items-center justify-center
        min-w-[48px] h-[46px] px-4
        text-sm font-medium
        rounded-md border
        transition-all duration-200 ease-lux
        focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2
        ${
          active
            ? 'bg-obsidian-900 border-obsidian-900 text-white shadow-[0_4px_12px_rgba(14,14,16,0.15)]'
            : 'bg-surface border-border text-ink-muted hover:border-obsidian-900/40 hover:text-ink'
        }
      `}
    >
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   LOCATION FIELD — select with smart label + sub-hint
   ═══════════════════════════════════════════════════════ */
export function LocationField({
  label,
  subLabel,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  subLabel: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; fee: number }[];
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-subtle mb-2">
        <MapPin size={14} className="text-ink-subtle" />
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="booking-input"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
            {opt.fee > 0 && !opt.label.includes('KES')
              ? ` (+ KES ${opt.fee.toLocaleString('en-KE')})`
              : ''}
          </option>
        ))}
      </select>
      <p className="mt-1.5 text-[10px] uppercase tracking-widest text-ink-subtle">
        {subLabel}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CONCIERGE HEADER — live summary line
   Reads like a receptionist reading back your booking.
   ═══════════════════════════════════════════════════════ */
export function ConciergeHeader({
  segments,
}: {
  /** Short phrases, e.g. ["3 days", "Nairobi → JKIA", "2 pax"] */
  segments: (string | null | undefined)[];
}) {
  const clean = segments.filter(Boolean) as string[];

  return (
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
      <span
        className="inline-flex items-center gap-1.5 shrink-0"
        aria-hidden="true"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-copper-500 animate-pulse-soft" />
        <span className="text-[10px] uppercase tracking-[0.28em] text-copper-600 font-semibold">
          Summary
        </span>
      </span>

      {clean.length > 0 && (
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-ink-muted min-w-0">
          {clean.map((seg, i) => (
            <span key={i} className="inline-flex items-center gap-2">
              {i > 0 && (
                <span
                  className="w-px h-3 bg-border-strong"
                  aria-hidden="true"
                />
              )}
              <span className="tabular-nums">{seg}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SUBMIT BUTTON — glows copper when form is valid
   ═══════════════════════════════════════════════════════ */
export function SubmitButton({
  label = 'Check Availability',
  ready = true,
}: {
  label?: string;
  /** When true, button glows copper. When false, dims. */
  ready?: boolean;
}) {
  const { pending } = useFormStatus();

  const disabled = pending || !ready;

  return (
    <button
      type="submit"
      disabled={disabled}
      aria-disabled={disabled}
      className={`
        group relative inline-flex items-center justify-center gap-2
        px-6 lg:px-8 py-3
        text-xs font-semibold uppercase tracking-[0.16em]
        rounded-md overflow-hidden
        transition-all duration-300 ease-lux
        disabled:cursor-not-allowed
        ${
          ready
            ? 'text-obsidian-950 hover:-translate-y-0.5'
            : 'text-ink-subtle bg-surface-sunken border border-border'
        }
      `}
      style={
        ready
          ? {
              backgroundImage:
                'linear-gradient(135deg, #E3A468 0%, #D98A44 45%, #C2702E 100%)',
              boxShadow:
                '0 1px 2px rgba(168,90,34,0.20), 0 8px 24px rgba(194,112,46,0.28)',
            }
          : undefined
      }
    >
      {pending ? (
        <>
          <span
            className={`inline-block w-4 h-4 border-2 rounded-full animate-spin ${
              ready
                ? 'border-obsidian-950/30 border-t-obsidian-950'
                : 'border-ink-subtle/30 border-t-ink-subtle'
            }`}
          />
          <span className="relative z-10">Sending…</span>
        </>
      ) : (
        <>
          <span className="relative z-10">{label}</span>
          <ArrowRight
            size={14}
            strokeWidth={2.5}
            className="relative z-10 transition-transform duration-300 ease-lux group-hover:translate-x-0.5"
          />
          {ready && (
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-lux"
              style={{
                background:
                  'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
              }}
            />
          )}
        </>
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   SUMMARY BAR — bottom of card
   ═══════════════════════════════════════════════════════ */
export function SummaryBar({
  label,
  value,
  isQuote = false,
  isFree = false,
  children,
}: {
  label: string;
  value: string;
  isQuote?: boolean;
  isFree?: boolean;
  children: ReactNode;
}) {
  const valueColor = isQuote
    ? 'text-copper-600'
    : isFree
      ? 'text-success'
      : 'text-ink';

  return (
    <div className="bg-surface-sunken border-t border-border px-6 lg:px-10 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-ink-subtle">
        <span>{label}</span>
        <span
          className={`font-semibold text-sm normal-case tracking-normal tabular-nums ${valueColor}`}
        >
          {value}
        </span>
      </div>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FEEDBACK BANNER — success / error message above form
   ═══════════════════════════════════════════════════════ */
export function FeedbackBanner({
  success,
  message,
}: {
  success?: boolean;
  message?: string;
}) {
  if (!message) return null;

  return (
    <div
      role={success ? 'status' : 'alert'}
      className={`
        mb-4 px-6 py-4 rounded-lg text-sm flex items-start gap-3 border
        ${
          success
            ? 'bg-copper-500/[0.08] border-copper-500/30 text-copper-800'
            : 'bg-danger-soft border-danger/30 text-danger'
        }
      `}
    >
      {success && <Check size={18} className="mt-0.5 shrink-0" />}
      <p>{message}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TRUST STRIP — 3 items
   Mobile: horizontal scroll snap. Desktop: 3-column grid.
   ═══════════════════════════════════════════════════════ */
const TRUST_ITEMS = [
  {
    icon: <ShieldCheck size={18} />,
    title: 'Fully Insured',
    description: 'All vehicles comprehensively covered',
  },
  {
    icon: <Plane size={18} />,
    title: 'Airport Delivery',
    description: 'Free drop-off and pickup at JKIA',
  },
  {
    icon: <Clock size={18} />,
    title: 'Free Cancellation',
    description: 'Up to 24 hours before pickup',
  },
];

export function TrustStrip() {
  return (
    <div className="mt-6 flex sm:grid sm:grid-cols-3 gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none -mx-6 sm:mx-0 px-6 sm:px-0 pb-2 sm:pb-0 scrollbar-hide">
      {TRUST_ITEMS.map((item) => (
        <div
          key={item.title}
          className="snap-start shrink-0 w-[85%] sm:w-auto flex items-start gap-3 p-4 sm:p-5 bg-surface border border-border rounded-lg transition-colors duration-300 hover:border-copper-500/40"
        >
          <div className="w-10 h-10 rounded-full bg-copper-500/[0.10] border border-copper-500/30 flex items-center justify-center shrink-0 text-copper-600">
            {item.icon}
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink mb-1">
              {item.title}
            </p>
            <p className="text-xs text-ink-muted leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CAR SEATS ICON — custom SVG (side-profile, two seats)
   ═══════════════════════════════════════════════════════ */
export function CarSeatsIcon({
  size = 16,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5.5 18.5c-.8 0-1.5-.7-1.5-1.5 0-.6.3-1.1.8-1.4L6 14.5V6c0-1.1.9-2 2-2s2 .9 2 2v6.5l-.5 1.5" />
      <path d="M5.5 18.5H8" />
      <path d="M10 12.5c.8.3 1.5 1 1.5 2s-.7 1.7-1.5 2" />
      <path d="M14.5 18.5c-.8 0-1.5-.7-1.5-1.5 0-.6.3-1.1.8-1.4L15 14.5V6c0-1.1.9-2 2-2s2 .9 2 2v6.5l-.5 1.5" />
      <path d="M14.5 18.5H17" />
      <path d="M19 12.5c.8.3 1.5 1 1.5 2s-.7 1.7-1.5 2" />
    </svg>
  );
}
