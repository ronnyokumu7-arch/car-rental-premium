import Link from 'next/link';
import { ArrowRight, Home, Car, Phone } from 'lucide-react';
import { BRAND } from '../lib/constants';

/* ─────────────────────────────────────────────────────────────
   NOT FOUND — 404 page
   Shown when a user hits a URL that doesn't exist.

   Structure:
     • Dark hero with a branded message
     • Three quick links back to useful places
     • Phone fallback for people who really want to talk

   Next.js automatically renders this for:
     • Unknown routes
     • notFound() calls from server components
   ───────────────────────────────────────────────────────────── */

export const metadata = {
  title: 'Page Not Found',
  description:
    'The page you were looking for could not be found. Browse the fleet or get in touch with Royride Car Hire.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-obsidian-950 flex items-center justify-center px-6 lg:px-8 py-24 overflow-hidden relative">

      {/* Ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 900px 600px at 50% 40%, rgba(194,112,46,0.16) 0%, transparent 60%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 700px 500px at 5% 100%, rgba(63,63,70,0.30) 0%, transparent 60%)',
        }}
      />

      {/* Grain */}
      <div className="grain-overlay absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" />

      <div className="relative max-w-2xl mx-auto text-center">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-8">
          <span
            aria-hidden="true"
            className="w-8 h-px bg-copper-500/60"
          />
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-copper-400">
            404 — Not Found
          </p>
          <span
            aria-hidden="true"
            className="w-8 h-px bg-copper-500/60"
          />
        </div>

        {/* Headline */}
        <h1 className="font-display text-white leading-[1.05] tracking-[-0.02em] mb-6 text-[clamp(2.5rem,6vw,4rem)]">
          This road{' '}
          <span className="italic font-light text-copper-200">
            doesn&apos;t exist.
          </span>
        </h1>

        {/* Subhead */}
        <p className="text-lg text-white/65 leading-relaxed font-light mb-12 max-w-lg mx-auto">
          The page you were looking for may have moved, been renamed, or
          never existed. Here&apos;s where you can go next.
        </p>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          <QuickLink
            href="/"
            icon={<Home size={16} />}
            label="Home"
          />
          <QuickLink
            href="/vehicles"
            icon={<Car size={16} />}
            label="Our fleet"
          />
          <QuickLink
            href="/contact"
            icon={<Phone size={16} />}
            label="Contact"
          />
        </div>

        {/* Primary CTA */}
        <Link
          href="/vehicles"
          className="group relative inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-obsidian-950 rounded-lg overflow-hidden transition-all duration-300 ease-lux hover:-translate-y-0.5"
          style={{
            backgroundImage:
              'linear-gradient(135deg, #E3A468 0%, #D98A44 45%, #C2702E 100%)',
            boxShadow:
              '0 1px 2px rgba(168,90,34,0.20), 0 8px 28px rgba(194,112,46,0.32)',
          }}
        >
          <span className="relative z-10">Explore the fleet</span>
          <ArrowRight
            size={14}
            strokeWidth={2.5}
            className="relative z-10 transition-transform duration-300 ease-lux group-hover:translate-x-1"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-lux"
            style={{
              background:
                'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
            }}
          />
        </Link>

        {/* Phone fallback */}
        <p className="text-[11px] uppercase tracking-[0.16em] text-white/40 mt-12">
          Or call us directly ·{' '}
          <a
            href={`tel:${BRAND.phones[0].replace(/\s/g, '')}`}
            className="text-white/70 hover:text-copper-300 transition-colors duration-300 tabular-nums"
          >
            {BRAND.phones[0]}
          </a>
        </p>
      </div>
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────
   QUICK LINK
   Small tile that links to a common destination.
   ───────────────────────────────────────────────────────────── */
function QuickLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-center gap-2.5 px-5 py-4 bg-white/[0.03] border border-white/[0.10] rounded-xl hover:border-copper-500/40 hover:bg-white/[0.05] transition-all duration-300 ease-lux"
    >
      <span className="text-copper-400 transition-transform duration-300 ease-lux group-hover:scale-110">
        {icon}
      </span>
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80 group-hover:text-white transition-colors duration-300">
        {label}
      </span>
    </Link>
  );
}
