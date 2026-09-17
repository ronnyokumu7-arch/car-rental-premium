import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { BRAND, NAV_LINKS } from '@/lib/constants';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-porcelain/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-display text-2xl tracking-[0.3em] text-porcelain"
            >
              {BRAND.name}
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-md">
              {BRAND.tagline}. Concierge service, airport transfers, and a curated fleet of luxury vehicles.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="type-caption text-accent-500 mb-5">Explore</h3>
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
          <div>
            <h3 className="type-caption text-accent-500 mb-5">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-1 shrink-0" />
                <span>{BRAND.location}</span>
              </li>
              {BRAND.phones.map((phone) => (
                <li key={phone} className="flex items-start gap-2">
                  <Phone size={14} className="mt-1 shrink-0" />
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="hover:text-accent-500 transition-colors"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-2">
                <Mail size={14} className="mt-1 shrink-0" />
                <a
                  href={`mailto:${BRAND.email}`}
                  className="hover:text-accent-500 transition-colors"
                >
                  {BRAND.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-porcelain/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs tracking-wider uppercase">
            © {year} {BRAND.fullName}. All rights reserved.
          </p>
          <p className="text-xs tracking-wider uppercase">
            Nairobi · Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}