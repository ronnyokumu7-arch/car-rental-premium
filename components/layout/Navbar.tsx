'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';
import { BRAND, NAV_LINKS } from '@/lib/constants';

/* ─────────────────────────────────────────────────────────────
   NAVBAR
   Fixed header, three states:

     • transparent — at the top of any page (over the hero)
     • solid       — once scrolled > 24px, or while drawer is open
     • hidden      — mobile only, slides up on scroll-down past hero

   Mobile behavior:
     • Past 200px scroll + scrolling down → hide
     • Scrolling up                      → show
     • Near top of page                  → always show
     • Drawer open                       → always show

   Desktop behavior:
     • Always visible
     • Transparent → solid at 24px scroll

   Contracts:
     • Body scroll locked while drawer is open
     • Escape closes the drawer
     • Drawer closes on route change
   ───────────────────────────────────────────────────────────── */

/** Past this scroll depth the navbar may hide on scroll-down (mobile only) */
const HERO_THRESHOLD = 200;
/** Minimum scroll delta to trigger a hide/show (prevents jitter) */
const SCROLL_DELTA = 8;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();
  const lastScrollY = useRef(0);

  /* ── Scroll listener ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      /* Solid appearance once past the hero edge */
      setScrolled(y > 24);

      /* Hide/show logic — mobile only, past the hero */
      const isMobile = window.matchMedia('(max-width: 1023px)').matches;

      if (!isMobile) {
        /* Desktop: always visible */
        if (hidden) setHidden(false);
        lastScrollY.current = y;
        return;
      }

      /* Near the top — always show */
      if (y < HERO_THRESHOLD) {
        if (hidden) setHidden(false);
        lastScrollY.current = y;
        return;
      }

      /* Past the hero — react to scroll direction */
      const delta = y - lastScrollY.current;
      if (Math.abs(delta) > SCROLL_DELTA) {
        setHidden(delta > 0);
      }

      lastScrollY.current = y;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hidden]);

  /* ── Close drawer on route change ── */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* ── Lock body scroll while drawer is open ── */
  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  /* ── Close drawer on Escape ── */
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  /* Solid appearance once scrolled or while the drawer is open */
  const solid = scrolled || mobileOpen;

  /* Hide only on mobile, and never while the drawer is open */
  const shouldHide = hidden && !mobileOpen;

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-[100]
          transition-all duration-500 ease-lux
          ${
            solid
              ? 'bg-obsidian-950/85 backdrop-blur-xl border-b border-white/[0.06]'
              : 'bg-transparent border-b border-transparent'
          }
          ${shouldHide ? '-translate-y-full' : 'translate-y-0'}
        `}
      >
        <nav className="relative z-50 max-w-7xl mx-auto px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-500 ease-lux ${
              scrolled ? 'h-[68px]' : 'h-20'
            }`}
          >
            {/* ── Logo lockup ── */}
            <Link
              href="/"
              className="group flex flex-col leading-none"
              aria-label={`${BRAND.name} — Home`}
            >
              <span className="font-display text-2xl tracking-[0.3em] font-normal text-white transition-colors duration-300 group-hover:text-copper-300">
                {BRAND.name}
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/50 mt-1 transition-colors duration-300 group-hover:text-white/70">
                Self-drive &amp; chauffeur hire
              </span>
            </Link>

            {/* ── Desktop nav ── */}
            <ul className="hidden lg:flex items-center gap-9">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`group relative inline-flex flex-col items-center text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                        isActive
                          ? 'text-white'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {link.label}
                      <span
                        className={`absolute -bottom-1.5 left-0 right-0 h-px origin-left transition-transform duration-300 ease-lux ${
                          isActive
                            ? 'bg-copper-400 scale-x-100'
                            : 'bg-copper-400 scale-x-0 group-hover:scale-x-100'
                        }`}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* ── Desktop CTA cluster ── */}
            <div className="hidden lg:flex items-center gap-6">
              <a
                href={`tel:${BRAND.phones[0].replace(/\s/g, '')}`}
                className="group flex items-center gap-2 text-white/70 hover:text-copper-300 transition-colors duration-300 text-[11px] tracking-[0.14em] font-medium"
              >
                <Phone
                  size={13}
                  className="transition-transform duration-300 group-hover:-rotate-12"
                />
                <span className="tabular-nums">{BRAND.phones[0]}</span>
              </a>

              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-obsidian-950 rounded-sm overflow-hidden transition-all duration-300 ease-lux hover:-translate-y-0.5"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #E3A468 0%, #D98A44 45%, #C2702E 100%)',
                  boxShadow:
                    '0 1px 2px rgba(168,90,34,0.20), 0 8px 24px rgba(194,112,46,0.28)',
                }}
              >
                <span className="relative z-10">Book Now</span>
                <ArrowUpRight
                  size={13}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-lux"
                  style={{
                    background:
                      'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)',
                  }}
                />
              </Link>
            </div>

            {/* ── Mobile toggle ── */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="lg:hidden relative z-50 p-2 -mr-2 text-white transition-transform duration-300 active:scale-90"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile drawer overlay ── */}
      <div
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
        className={`lg:hidden fixed inset-0 z-[90] bg-obsidian-950/70 backdrop-blur-md transition-opacity duration-400 ease-lux ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ── Mobile drawer panel ── */}
      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-[95] w-[88%] max-w-[400px] bg-obsidian-950 border-l border-white/[0.06] transition-transform duration-500 ease-lux ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 pb-8 px-8 overflow-y-auto">
          <ul className="space-y-1">
            {NAV_LINKS.map((link, i) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <li
                  key={link.href}
                  style={{
                    transitionDelay: mobileOpen
                      ? `${120 + i * 60}ms`
                      : '0ms',
                  }}
                  className={`transform transition-all duration-500 ease-lux ${
                    mobileOpen
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-6'
                  }`}
                >
                  <Link
                    href={link.href}
                    className={`group flex items-center justify-between py-4 border-b border-white/[0.06] transition-colors duration-300 ${
                      isActive
                        ? 'text-copper-300'
                        : 'text-white/85 hover:text-white'
                    }`}
                  >
                    <span className="font-display text-3xl font-normal tracking-tight">
                      {link.label}
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-white/30 transition-all duration-300 group-hover:text-copper-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto pt-8 space-y-5">
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/40">
                Concierge
              </p>
              {BRAND.phones.map((phone, i) => (
                <a
                  key={i}
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-white/85 hover:text-copper-300 transition-colors duration-300 text-sm"
                >
                  <Phone size={14} className="text-copper-400" />
                  <span className="tracking-wider tabular-nums">
                    {phone}
                  </span>
                </a>
              ))}
            </div>

            <Link
              href="/contact"
              className="group relative flex items-center justify-center gap-2 w-full px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-obsidian-950 rounded-sm overflow-hidden"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #E3A468 0%, #D98A44 45%, #C2702E 100%)',
                boxShadow: '0 8px 24px rgba(194,112,46,0.28)',
              }}
            >
              <span className="relative z-10">Book Your Vehicle</span>
              <ArrowUpRight size={14} className="relative z-10" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
