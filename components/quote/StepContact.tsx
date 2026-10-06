'use client';

import {
  User,
  Phone,
  Mail,
  MessageSquare,
  Mail as MailIcon,
  MessageCircle,
} from 'lucide-react';
import { motion } from 'motion/react';
import type { QuoteContact, QuoteDeliveryMethod } from '../../lib/quote';

/* ─────────────────────────────────────────────────────────────
   STEP 4 — CONTACT
   Where do we send the quote, and how?
   
   Two sections:
     • Contact details (name, phone, email)
     • Delivery method (email or WhatsApp)

   Email only becomes required when the user chooses email
   delivery — for WhatsApp-only, we still want it optionally
   for follow-up.

   This step can also receive server action errors and restore
   the user's previous input via `fields`.
   ───────────────────────────────────────────────────────────── */

interface StepContactProps {
  contact: QuoteContact;
  setContact: (c: QuoteContact) => void;
  delivery: QuoteDeliveryMethod;
  setDelivery: (d: QuoteDeliveryMethod) => void;
  notes: string;
  setNotes: (v: string) => void;
  /** Server action field errors, keyed by field name */
  errors?: Record<string, string[]>;
  /** Server action field values — used to restore on validation error */
  fields?: Record<string, string>;
}

export function StepContact({
  contact,
  setContact,
  delivery,
  setDelivery,
  notes,
  setNotes,
  errors,
  fields,
}: StepContactProps) {
  /* Local field values — prefer the user's current input, fall
     back to server-returned fields (restoration after error). */
  const name = contact.name || fields?.name || '';
  const phone = contact.phone || fields?.phone || '';
  const email = contact.email || fields?.email || '';

  const updateContact = (patch: Partial<QuoteContact>) => {
    setContact({ ...contact, ...patch });
  };

  return (
    <div>
      {/* ── Section header ── */}
      <header className="mb-8 lg:mb-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-600 mb-3">
          Step 04 — Your details
        </p>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-ink leading-[1.1] tracking-[-0.015em] mb-3">
          Where should we send it?
        </h2>
        <p className="text-sm lg:text-base text-ink-muted leading-relaxed font-light max-w-xl">
          Your quote goes out within seconds. We&apos;ll also reach out
          personally to confirm the final price.
        </p>
      </header>

      <div className="space-y-6">

        {/* ═══════════════════════════════════════════
            CONTACT DETAILS
            ═══════════════════════════════════════════ */}
        <div className="space-y-5">

          {/* Name */}
          <ContactField
            label="Full name"
            icon={<User size={14} />}
            name="name"
            type="text"
            value={name}
            onChange={(v) => updateContact({ name: v })}
            placeholder="e.g. John Kamau"
            autoComplete="name"
            required
            error={errors?.name?.[0]}
          />

          {/* Phone */}
          <ContactField
            label="Phone number"
            icon={<Phone size={14} />}
            name="phone"
            type="tel"
            value={phone}
            onChange={(v) => updateContact({ phone: v })}
            placeholder="+254 7XX XXX XXX"
            autoComplete="tel"
            required
            error={errors?.phone?.[0]}
          />

          {/* Email */}
          <ContactField
            label={
              delivery === 'email'
                ? 'Email address'
                : 'Email address (optional)'
            }
            icon={<Mail size={14} />}
            name="email"
            type="email"
            value={email}
            onChange={(v) => updateContact({ email: v })}
            placeholder="you@example.com"
            autoComplete="email"
            required={delivery === 'email'}
            error={errors?.email?.[0]}
          />
        </div>

        {/* ═══════════════════════════════════════════
            DELIVERY METHOD
            ═══════════════════════════════════════════ */}
        <div>
          <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-subtle mb-3">
            How would you like to receive your quote?
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DeliveryOption
              value="email"
              label="By email"
              hint="A copy you can save or forward"
              icon={<MailIcon size={18} />}
              active={delivery === 'email'}
              onClick={() => setDelivery('email')}
            />
            <DeliveryOption
              value="whatsapp"
              label="By WhatsApp"
              hint="Instant, opens in WhatsApp"
              icon={<MessageCircle size={18} />}
              active={delivery === 'whatsapp'}
              onClick={() => setDelivery('whatsapp')}
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            NOTES
            ═══════════════════════════════════════════ */}
        <div>
          <label
            htmlFor="notes"
            className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-subtle mb-3"
          >
            <MessageSquare size={14} className="text-ink-subtle" />
            Anything else? (optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={notes || fields?.notes || ''}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Child seat, extra driver, specific pickup time — anything we should know"
            maxLength={500}
            rows={3}
            className="booking-input !h-auto py-3 resize-none"
          />
        </div>

        {/* ── Privacy line ── */}
        <p className="text-[11px] text-ink-subtle leading-relaxed pt-2">
          We never share your details. Your quote will be sent to the
          address or number you provide, and we may follow up personally
          to confirm.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CONTACT FIELD
   Standard text/tel/email input with a copper-tinted label.
   ───────────────────────────────────────────────────────────── */

function ContactField({
  label,
  icon,
  name,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  required,
  error,
}: {
  label: string;
  icon: React.ReactNode;
  name: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-subtle mb-2"
      >
        <span className="text-ink-subtle">{icon}</span>
        {label}
        {required && <span className="text-copper-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="booking-input"
        required={required}
      />
      {error && (
        <p className="mt-1.5 text-[11px] text-danger">{error}</p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DELIVERY OPTION
   Tile-style toggle for choosing email or WhatsApp.
   ───────────────────────────────────────────────────────────── */

function DeliveryOption({
  value,
  label,
  hint,
  icon,
  active,
  onClick,
}: {
  value: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={`
        group relative flex items-start gap-3.5
        p-4 rounded-xl border text-left
        transition-all duration-300 ease-lux
        focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2
        ${
          active
            ? 'bg-copper-500/[0.06] border-copper-500 ring-4 ring-copper-500/15'
            : 'bg-surface border-border hover:border-copper-500/40'
        }
      `}
    >
      {/* Icon */}
      <span
        className={`
          shrink-0 flex items-center justify-center w-10 h-10 rounded-lg
          transition-all duration-300 ease-lux
          ${
            active
              ? 'bg-copper-500 text-obsidian-950'
              : 'bg-copper-500/[0.10] border border-copper-500/25 text-copper-600'
          }
        `}
        aria-hidden="true"
      >
        {icon}
      </span>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className={`
            text-sm font-semibold leading-tight mb-1
            transition-colors duration-300
            ${active ? 'text-ink' : 'text-ink-muted'}
          `}
        >
          {label}
        </p>
        <p className="text-[11px] text-ink-subtle leading-snug">
          {hint}
        </p>
      </div>

      {/* Checkmark */}
      {active && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-copper-500 text-obsidian-950"
          aria-hidden="true"
        >
          <span className="text-[10px] font-bold">✓</span>
        </motion.span>
      )}
    </motion.button>
  );
}
