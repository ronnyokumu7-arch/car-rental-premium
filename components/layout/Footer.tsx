import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../../lib/constants';
import { CONTACT } from '../../lib/contact';
import { SocialLinks } from '../ui/SocialLinks';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-porcelain/70 relative overflow-hidden">
      {/* Subtle warm glow for depth */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 0%, rgba(201, 162, 39, 0.15) 0%, transparent 50%)',
        }}
      />
      <div className="grain-overlay absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* ══════════════════════════════════════════════════
            TOP — Brand statement + WhatsApp CTA
            ══════════════════════════════════════════════════ */}
        <div className="pt-16 lg:pt-24 pb-12 lg:pb-16 border-b border-porcelain/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left — Brand statement */}
            <div className="lg:col-span-7">
              <Link href="/" className="inline-flex flex-col leading-none">
                <span className="font-display text-3xl lg:text-4xl tracking-[0.3em] text-porcelain">
                  {BRAND.name}
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-porcelain/50 mt-2">
                  Self-Drive &amp; Chauffeur Hire
                </span>
              </Link>

              <p className="text-porcelain/85 leading-relaxed mt-8 max-w-md text-base lg:text-lg">
                Premium car hire in Nairobi — concierge service, airport
                transfers, and a curated fleet delivered anywhere in Kenya.
              </p>
            </div>

            {/* Right — WhatsApp CTA */}
            <div className="lg:col-span-5 lg:text-right">
              <p className="text-[10px] uppercase tracking-[0.15em] text-porcelain/40 mb-4 font-medium">
                Fastest Response
              </p>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm font-medium tracking-widest uppercase text-porcelain hover:text-accent-500 transition-colors group"
              >
                <span>Chat on WhatsApp</span>
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-porcelain/25 group-hover:border-accent-500/70 group-hover:bg-accent-500/10 transition-all">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            MIDDLE — Three-column navigation + contact
            ══════════════════════════════════════════════════ */}
        <div className="py-12 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Explore */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] uppercase tracking-[0.15em] text-accent-500 mb-6 font-medium">
              Explore
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-accent-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-5">
            <h3 className="text-[10px] uppercase tracking-[0.15em] text-accent-500 mb-6 font-medium">
              Contact
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin
                  size={14}
                  className="mt-1 shrink-0 text-porcelain/40"
                />
                <div className="leading-relaxed">
                  <p className="text-porcelain/90">
                    {CONTACT.address.line1}
                  </p>
                  <p className="text-porcelain/50 text-xs mt-1">
                    {CONTACT.address.landmark}
                  </p>
                  <p>{CONTACT.address.city}</p>
                </div>
              </li>

              {BRAND.phones.map((phone) => (
                <li key={phone} className="flex items-start gap-3">
                  <Phone
                    size={14}
                    className="mt-0.5 shrink-0 text-porcelain/40"
                  />
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="hover:text-accent-500 transition-colors"
                  >
                    {phone}
                  </a>
                </li>
              ))}

              <li className="flex items-start gap-3">
                <Mail
                  size={14}
                  className="mt-0.5 shrink-0 text-porcelain/40"
                />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-accent-500 transition-colors break-all"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="lg:col-span-4">
            <h3 className="text-[10px] uppercase tracking-[0.15em] text-accent-500 mb-6 font-medium">
              Follow Us
            </h3>
            <SocialLinks size="sm" variant="dark" />
            <p className="text-xs text-porcelain/40 mt-6 leading-relaxed max-w-xs">
              Behind-the-scenes fleet updates, driving routes, and stories
              from the road.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            BOTTOM — Minimal signature strip
            ══════════════════════════════════════════════════ */}
        <div className="py-8 border-t border-porcelain/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-[0.15em] text-porcelain/40">
            © {year} {BRAND.fullName} · All rights reserved
          </p>
          <p className="text-[10px] uppercase tracking-[0.15em] text-porcelain/40">
            Nairobi · Kenya
          </p>
        </div>

        {/* ══════════════════════════════════════════════════
            SIGNATURE — Brand domain as closing mark
            ══════════════════════════════════════════════════ */}
        <div className="pb-12 lg:pb-16 text-center">
          <Link
            href="/"
            className="inline-block font-display text-4xl lg:text-6xl tracking-[0.15em] text-porcelain/15 hover:text-accent-500/40 transition-colors duration-500"
          >
            royride.com
          </Link>
        </div>
      </div>
    </footer>
  );
}