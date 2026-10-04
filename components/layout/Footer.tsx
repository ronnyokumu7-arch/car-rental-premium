import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../../lib/constants';
import { CONTACT } from '../../lib/contact';
import { SocialLinks } from '../ui/SocialLinks';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-obsidian-950 text-white/70 overflow-hidden">
      {/* ── Ambient copper glow (top-left) — warms the black ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 900px 500px at 15% -10%, rgba(194,112,46,0.18) 0%, transparent 60%)',
        }}
      />
      {/* ── Cool obsidian counter-glow (bottom-right) — depth ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 700px 400px at 100% 110%, rgba(63,63,70,0.35) 0%, transparent 60%)',
        }}
      />
      {/* ── Grain overlay ── */}
      <div className="grain-overlay absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none" />
      {/* ── Hairline top border for definition against page ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* ══════════════════════════════════════════════════
            TOP — Brand statement + WhatsApp CTA
            ══════════════════════════════════════════════════ */}
        <div className="pt-20 lg:pt-28 pb-14 lg:pb-20 border-b border-white/[0.06]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left — Brand lockup + statement */}
            <div className="lg:col-span-7">
              <Link href="/" className="inline-flex flex-col leading-none group">
                <span className="font-display text-3xl lg:text-4xl tracking-[0.3em] text-white transition-colors duration-500 group-hover:text-copper-200">
                  {BRAND.name}
                </span>
                <span className="text-[9px] uppercase tracking-[0.32em] text-white/40 mt-2 transition-colors duration-500 group-hover:text-white/60">
                  Self-Drive &amp; Chauffeur Hire
                </span>
              </Link>

              <p className="text-white/75 leading-relaxed mt-8 max-w-lg text-base lg:text-lg font-light">
                Premium car hire in Nairobi — concierge service, airport
                transfers, and a curated fleet delivered anywhere in Kenya.
              </p>
            </div>

            {/* Right — WhatsApp CTA, upgraded to feel like a real button */}
            <div className="lg:col-span-5 lg:text-right">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/40 mb-5 font-medium">
                Fastest Response
              </p>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 pl-6 pr-2 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-white border border-white/15 rounded-full transition-all duration-400 ease-lux hover:border-copper-400/70 hover:bg-copper-500/[0.08] hover:-translate-y-0.5"
              >
                <span>Chat on WhatsApp</span>
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-copper-500 text-obsidian-950 transition-all duration-400 ease-lux group-hover:bg-copper-400 group-hover:rotate-45">
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            MIDDLE — Navigation + Contact + Social
            ══════════════════════════════════════════════════ */}
        <div className="py-14 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14">

          {/* Explore */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] uppercase tracking-[0.24em] text-copper-400 mb-7 font-semibold">
              Explore
            </h3>
            <ul className="space-y-3.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group relative inline-flex items-center text-sm text-white/70 hover:text-white transition-colors duration-300"
                  >
                    <span className="relative">
                      {link.label}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-copper-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-lux"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-5">
            <h3 className="text-[10px] uppercase tracking-[0.24em] text-copper-400 mb-7 font-semibold">
              Contact
            </h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3.5">
                <MapPin size={15} className="mt-1 shrink-0 text-copper-400/70" />
                <div className="leading-relaxed text-white/70">
                  <p className="text-white/90">{CONTACT.address.line1}</p>
                  <p className="text-white/45 text-xs mt-1 tracking-wide">
                    {CONTACT.address.landmark}
                  </p>
                  <p className="text-white/70">{CONTACT.address.city}</p>
                </div>
              </li>

              {BRAND.phones.map((phone) => (
                <li key={phone} className="flex items-start gap-3.5">
                  <Phone size={15} className="mt-0.5 shrink-0 text-copper-400/70" />
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="text-white/70 hover:text-copper-300 transition-colors duration-300 tracking-wide"
                  >
                    {phone}
                  </a>
                </li>
              ))}

              <li className="flex items-start gap-3.5">
                <Mail size={15} className="mt-0.5 shrink-0 text-copper-400/70" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-white/70 hover:text-copper-300 transition-colors duration-300 break-all"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="lg:col-span-4">
            <h3 className="text-[10px] uppercase tracking-[0.24em] text-copper-400 mb-7 font-semibold">
              Follow Us
            </h3>
            <SocialLinks size="sm" variant="dark" />
            <p className="text-xs text-white/40 mt-7 leading-relaxed max-w-xs font-light">
              Behind-the-scenes fleet updates, driving routes, and stories
              from the road.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            BOTTOM — Legal strip
            ══════════════════════════════════════════════════ */}
        <div className="py-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            © {year} {BRAND.fullName} · All rights reserved
          </p>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/35">
            <span>Nairobi</span>
            <span className="w-px h-3 bg-white/15" aria-hidden="true" />
            <span>Kenya</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            SIGNATURE — Oversized domain as closing mark
            ══════════════════════════════════════════════════ */}
        <div className="pb-16 lg:pb-20 pt-4 text-center">
          <Link
            href="/"
            aria-label={`${BRAND.name} — Home`}
            className="group inline-block relative"
          >
            {/* Copper underglow that reveals on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-0 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 ease-lux pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(194,112,46,0.7) 0%, transparent 60%)',
              }}
            />
            <span className="relative font-display text-4xl lg:text-7xl tracking-[0.12em] text-white/[0.10] group-hover:text-copper-300/50 transition-colors duration-700 ease-lux">
              royride.com
            </span>
          </Link>
        </div>

      </div>
    </footer>
  );
}
