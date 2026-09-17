'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { BRAND, NAV_LINKS } from '@/lib/constants';

export function Navbar() {
const [scrolled, setScrolled] = useState(false);
const [mobileOpen, setMobileOpen] = useState(false);
const pathname = usePathname();
const isHomePage = pathname === '/';

useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
<header
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    scrolled || mobileOpen
      ? 'bg-primary-900/95 backdrop-blur-md shadow-lg'
      : isHomePage
        ? 'bg-transparent'
        : 'bg-primary-900'
  }`}
>
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-porcelain font-display text-2xl tracking-[0.3em] font-normal"
          >
            {BRAND.name}
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-xs font-medium uppercase tracking-widest transition-colors duration-200 ${
                      isActive
                        ? 'text-accent-500'
                        : 'text-porcelain/80 hover:text-porcelain'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href={`tel:${BRAND.phones[0].replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-porcelain/80 hover:text-accent-500 transition-colors text-xs tracking-wider"
            >
              <Phone size={14} />
              <span>{BRAND.phones[0]}</span>
            </a>
            <Link href="/contact" className="btn-primary !px-6 !py-3">
              Book Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden text-porcelain p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 bg-primary-900 ${
          mobileOpen ? 'max-h-screen border-t border-porcelain/10' : 'max-h-0'
        }`}
      >
        <ul className="px-6 py-6 space-y-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-3 text-sm font-medium uppercase tracking-widest transition-colors ${
                    isActive ? 'text-accent-500' : 'text-porcelain/80'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="pt-4 border-t border-porcelain/10 space-y-3">
            <a
              href={`tel:${BRAND.phones[0].replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-porcelain/80 text-xs"
            >
              <Phone size={14} />
              {BRAND.phones[0]}
            </a>
            <a
              href={`tel:${BRAND.phones[1].replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-porcelain/80 text-xs"
            >
              <Phone size={14} />
              {BRAND.phones[1]}
            </a>
            <Link href="/contact" className="btn-primary w-full mt-2">
              Book Now
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}