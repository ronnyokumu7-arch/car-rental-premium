import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Share2,
  ArrowUpRight,
} from 'lucide-react';
import { BRAND } from '../../lib/constants';
import { CONTACT } from '../../lib/contact';
import { SocialLinks } from '../ui/SocialLinks';

/* ─────────────────────────────────────────────────────────────
   CONTACT INFO
   Sidebar beside the contact form.

   Structure:
     • WhatsApp card (featured — the highest-converting channel)
     • Phone
     • Email
     • Visit (address + directions)
     • Business hours
     • Social links

   Data comes from lib/contact.ts and lib/constants.ts —
   never hardcoded here.
   ───────────────────────────────────────────────────────────── */

export function ContactInfo() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    CONTACT.whatsappMessage
  )}`;

  return (
    <div className="space-y-4">

      {/* ═══════════════════════════════════════════
          WHATSAPP — featured, highest-converting channel
          ═══════════════════════════════════════════ */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-4 p-5 sm:p-6 bg-obsidian-950 rounded-2xl overflow-hidden transition-all duration-400 ease-lux hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(14,14,16,0.20)] focus:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2"
      >
        {/* Copper ambient glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 90% 20%, rgba(194,112,46,0.18) 0%, transparent 60%)',
          }}
        />

        {/* Copper top hairline */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/40 to-transparent"
        />

        {/* Icon */}
        <div className="relative w-12 h-12 rounded-full bg-copper-500/[0.15] border border-copper-500/40 flex items-center justify-center shrink-0">
          <MessageCircle
            size={20}
            strokeWidth={2}
            className="text-copper-300"
          />
        </div>

        {/* Content */}
        <div className="relative flex-1 min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-copper-400 mb-1.5">
            Fastest Response
          </p>
          <p className="text-white font-medium text-[15px] leading-tight">
            Chat on WhatsApp
          </p>
        </div>

        {/* Arrow */}
        <span
          aria-hidden="true"
          className="relative shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-white/15 text-white/60 transition-all duration-400 ease-lux group-hover:bg-copper-500 group-hover:text-obsidian-950 group-hover:border-copper-500 group-hover:rotate-45"
        >
          <ArrowUpRight size={14} strokeWidth={2.5} />
        </span>
      </a>

      {/* ═══════════════════════════════════════════
          PHONE
          ═══════════════════════════════════════════ */}
      <InfoCard icon={<Phone size={16} />} label="Call Us">
        <div className="space-y-1.5">
          {BRAND.phones.map((phone) => (
            <a
              key={phone}
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="block text-base font-display text-ink hover:text-copper-600 transition-colors duration-300 tabular-nums"
            >
              {phone}
            </a>
          ))}
        </div>
      </InfoCard>

      {/* ═══════════════════════════════════════════
          EMAIL
          ═══════════════════════════════════════════ */}
      <InfoCard icon={<Mail size={16} />} label="Email">
        <a
          href={`mailto:${CONTACT.email}`}
          className="text-sm font-medium text-ink hover:text-copper-600 transition-colors duration-300 break-all"
        >
          {CONTACT.email}
        </a>
      </InfoCard>

      {/* ═══════════════════════════════════════════
          VISIT
          ═══════════════════════════════════════════ */}
      <InfoCard icon={<MapPin size={16} />} label="Visit Us">
        <div className="space-y-1">
          <p className="text-sm font-medium text-ink">
            {BRAND.fullName}
          </p>
          <p className="text-sm text-ink-muted">
            {CONTACT.address.line1}
          </p>
          <p className="text-sm text-ink-muted">
            {CONTACT.address.city}
          </p>
          <p className="text-xs text-ink-subtle pt-1.5">
            {CONTACT.address.landmark}
          </p>
        </div>

        <a
          href={CONTACT.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-copper-600 hover:text-copper-700 transition-colors duration-300"
        >
          Get directions
          <ArrowUpRight
            size={12}
            strokeWidth={2.5}
            className="transition-transform duration-300 ease-lux group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </InfoCard>

      {/* ═══════════════════════════════════════════
          HOURS
          ═══════════════════════════════════════════ */}
      <InfoCard icon={<Clock size={16} />} label="Business Hours">
        <ul className="space-y-2.5">
          {CONTACT.businessHours.map(({ days, hours }) => (
            <li
              key={days}
              className="flex justify-between items-baseline gap-3 text-sm"
            >
              <span className="text-ink-muted">{days}</span>
              <span className="text-ink font-medium text-right tabular-nums">
                {hours}
              </span>
            </li>
          ))}
        </ul>
      </InfoCard>

      {/* ═══════════════════════════════════════════
          SOCIAL
          ═══════════════════════════════════════════ */}
      <InfoCard icon={<Share2 size={16} />} label="Follow Us">
        <SocialLinks size="sm" variant="light" />
      </InfoCard>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   INFO CARD
   Rounded ivory panel with a copper icon + uppercase label
   at the top, then children below.
   ───────────────────────────────────────────────────────────── */
function InfoCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-5 sm:p-6 transition-colors duration-300 hover:border-border-strong">
      {/* Header: icon + label */}
      <div className="flex items-center gap-2.5 mb-4">
        <span className="text-copper-500">{icon}</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-subtle">
          {label}
        </span>
      </div>

      {children}
    </div>
  );
}
