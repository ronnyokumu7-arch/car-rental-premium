'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Star, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRUST_STATS } from '../../lib/testimonials';

/* ─────────────────────────────────────────────────────────────
   GOOGLE REVIEWS WIDGET
   Floating pill → expands into a review panel.

   Visibility rules:
     • Hidden on /quote (task flow — don't distract)
     • Hidden before scrolling past the hero
     • Hidden when footer is in view
     • Hidden when a modal is open (body[data-modal-open="true"])
     • Auto-opens once per browser session after 8s (only if visible)

   Future: morphs into a contact CTA. Keep the shell reusable.
   ───────────────────────────────────────────────────────────── */

/* Featured reviews — curated 2-item teaser */
const WIDGET_REVIEWS = [
  {
    id: 'kilonzo',
    name: 'Kilonzo Safari',
    initials: 'KS',
    quote:
      'Great service and high professionalism by Ronny. I will be renting again with Royride.',
    rating: 5,
  },
  {
    id: 'maureen',
    name: 'Maureen Waigwe',
    initials: 'MW',
    quote:
      'Royride is the best online booking I found. Trustworthy, reliable and great customer service. Ronny goes above and beyond.',
    rating: 5,
  },
];

const GOOGLE_REVIEWS_URL = 'https://maps.app.goo.gl/MwewVWCk5ACe9r9w9';

/* Routes where the widget is intentionally suppressed */
const SUPPRESSED_ROUTES = ['/quote'];

/* Scroll threshold — fraction of viewport height before the
   widget is allowed to appear. Hero is min-h-screen, so 0.8
   means "just before the hero fully exits." */
const PAST_HERO_THRESHOLD = 0.8;

export function GoogleReviewsWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  /* ── Route suppression ── */
  const routeSuppressed = SUPPRESSED_ROUTES.some((r) =>
    pathname.startsWith(r)
  );

  /* ── Scroll — past hero ── */
  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * PAST_HERO_THRESHOLD;
      setPastHero(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Escape closes the panel ── */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  /* ── Auto-open once per session ── */
  useEffect(() => {
    if (routeSuppressed) return;
    if (!pastHero) return;
    if (sessionStorage.getItem('royride-reviews-shown')) return;

    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem('royride-reviews-shown', '1');
    }, 8000);
    return () => clearTimeout(timer);
  }, [routeSuppressed, pastHero]);

  /* ── Hide when footer enters viewport ── */
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: '0px 0px -10% 0px', threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  /* ── Hide when any modal is open ── */
  useEffect(() => {
    const sync = () =>
      setModalOpen(document.body.dataset.modalOpen === 'true');
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-modal-open'],
    });
    return () => observer.disconnect();
  }, []);

  /* ── Collapse the panel when the widget hides ── */
  useEffect(() => {
    if (
      footerVisible ||
      modalOpen ||
      routeSuppressed ||
      !pastHero
    ) {
      setOpen(false);
    }
  }, [footerVisible, modalOpen, routeSuppressed, pastHero]);

  const hidden =
    footerVisible || modalOpen || routeSuppressed || !pastHero;

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          key="g-review-widget"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed z-[80]"
          style={{
            bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
            left: '1.5rem',
          }}
        >
          <AnimatePresence mode="wait">
            {!open ? (
              /* Trigger pill */
              <motion.button
                key="pill"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setOpen(true)}
                aria-label="See Google reviews"
                className="group relative flex items-center gap-3 pl-2 pr-4 py-2 bg-obsidian-950 border border-white/12 rounded-full shadow-[0_8px_24px_rgba(14,14,16,0.32)] hover:border-copper-400/60 hover:-translate-y-0.5 transition-all duration-300 ease-lux"
              >
                <span className="absolute inset-0 rounded-full pointer-events-none">
                  <motion.span
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(194, 112, 46, 0.45)',
                        '0 0 0 14px rgba(194, 112, 46, 0)',
                      ],
                    }}
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                    className="absolute inset-0 rounded-full"
                  />
                </span>

                <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white shrink-0">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </span>

                <span className="relative flex flex-col items-start leading-none">
                  <span className="flex items-center gap-1 mb-0.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star
                        key={i}
                        size={10}
                        className="fill-copper-400 text-copper-400"
                      />
                    ))}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-white/70 font-medium">
                    {TRUST_STATS.rating} · {TRUST_STATS.reviewCount} Reviews
                  </span>
                </span>
              </motion.button>
            ) : (
              /* Expanded panel */
              <motion.div
                key="panel"
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-[calc(100vw-3rem)] sm:w-[360px] max-h-[80vh] overflow-hidden bg-ivory-50 border border-obsidian-200 rounded-lg shadow-[0_24px_64px_rgba(14,14,16,0.24)]"
                role="dialog"
                aria-label="Google reviews"
              >
                {/* Obsidian header */}
                <div className="relative bg-obsidian-950 px-5 py-4 overflow-hidden">
                  <div
                    aria-hidden="true"
                    className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-copper-500/40 to-transparent"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse at 20% 0%, rgba(194,112,46,0.14) 0%, transparent 60%)',
                    }}
                  />
                  <div className="grain-overlay absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none" />

                  <div className="relative flex items-center gap-3">
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white shrink-0">
                      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-copper-300 mb-0.5 font-semibold">
                        Rated on Google
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-xl text-white leading-none">
                          {TRUST_STATS.rating}
                        </span>
                        <div className="flex items-center gap-0.5">
                          {[0, 1, 2, 3, 4].map((i) => (
                            <Star
                              key={i}
                              size={11}
                              className="fill-copper-400 text-copper-400"
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-white/50 tracking-wide">
                          {TRUST_STATS.reviewCount} reviews
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setOpen(false)}
                      aria-label="Close reviews"
                      className="shrink-0 w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                {/* Ivory body — reviews */}
                <div className="p-5 space-y-5 max-h-[45vh] overflow-y-auto scrollbar-hide">
                  {WIDGET_REVIEWS.map((review) => (
                    <div key={review.id}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-full bg-obsidian-950 flex items-center justify-center text-white text-xs font-display shrink-0">
                          {review.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-ink truncate">
                            {review.name}
                          </p>
                          <div className="flex items-center gap-0.5">
                            {[0, 1, 2, 3, 4].map((i) => (
                              <Star
                                key={i}
                                size={9}
                                className="fill-copper-500 text-copper-500"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-ink-muted leading-relaxed pl-12">
                        &ldquo;{review.quote}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>

                {/* Ivory body — CTA footer */}
                <div className="border-t border-ivory-200 px-5 py-3">
                  <a
                    href={GOOGLE_REVIEWS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.16em] font-medium text-ink hover:text-copper-600 transition-colors duration-300 group"
                  >
                    <span>
                      See all {TRUST_STATS.reviewCount} reviews on Google
                    </span>
                    <ExternalLink
                      size={12}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
