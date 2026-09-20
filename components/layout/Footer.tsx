import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../../lib/constants';
import { CONTACT } from '../../lib/contact';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-porcelain/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* ── Brand ── */}
          <div className="lg:col-span-5">
            {/* Logo lockup — ROYRIDE + tagline */}
            <Link href="/" className="inline-flex flex-col leading-none mb-6">
              <span className="font-display text-3xl tracking-[0.3em] text-porcelain">
                {BRAND.name}
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-porcelain/50 mt-2">
                Self-Drive &amp; Chauffeur Hire
              </span>
            </Link>

            <p className="text-sm leading-relaxed max-w-md mb-6">
              Premium car hire in Nairobi. Concierge service, airport
              transfers, and a curated fleet of luxury vehicles — delivered
              anywhere in Kenya.
            </p>

            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent-500 hover:text-porcelain transition-colors"
            >
              Chat on WhatsApp →
            </a>
          </div>

          {/* ── Explore ── */}
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

          {/* ── Contact ── */}
          <div className="lg:col-span-4">
            <h3 className="text-[10px] uppercase tracking-[0.15em] text-accent-500 mb-6 font-medium">
              Contact
            </h3>
            <ul className="space-y-4 text-sm">
              {/* Address */}
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

              {/* Phones */}
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

              {/* Email */}
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
        </div>

        {/* ── Bottom strip ── */}
        <div className="mt-16 pt-8 border-t border-porcelain/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-[0.15em] text-porcelain/50">
            © {year} {BRAND.fullName} · All rights reserved
          </p>
          <p className="text-[10px] uppercase tracking-[0.15em] text-porcelain/50">
            Nairobi · Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}