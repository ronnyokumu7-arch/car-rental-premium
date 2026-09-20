'use client';

import { useEffect, useState } from 'react';
import { Star, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const WIDGET_REVIEWS = [
  {
    id: 'kilenzo',
    name: 'Kilenzo Safari',
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

export function GoogleReviewsWidget() {
  const [open, setOpen] = useState(false);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open]);

  // Auto-open once per session after 8s
  useEffect(() => {
    if (sessionStorage.getItem('royride-reviews-shown')) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem('royride-reviews-shown', '1');
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════════════
          Floating trigger pill — NAVY with gentle glow animation
          ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(true)}
            aria-label="See Google reviews"
            className="group fixed bottom-6 left-6 z-[90] flex items-center gap-3 pl-2 pr-4 py-2 bg-primary-900 border border-porcelain/15 rounded-full shadow-2xl hover:border-accent-500/60 hover:bg-primary-700 transition-all duration-300"
          >
            {/* Pulsing gold ring — draws eye without being intrusive */}
            <span className="absolute inset-0 rounded-full pointer-events-none">
              <motion.span
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(201, 162, 39, 0.4)',
                    '0 0 0 12px rgba(201, 162, 39, 0)',
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
                className="absolute inset-0 rounded-full"
              />
            </span>

            {/* Google "G" — porcelain pill on navy */}
            <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-porcelain shrink-0">
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
                    className="fill-accent-500 text-accent-500"
                  />
                ))}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-porcelain/70 font-medium">
                4.9 · 119 Reviews
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════
          Expanded panel — WHITE BODY + NAVY TOP BAR (as it was)
          ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-6 left-6 right-6 sm:right-auto z-[90] w-auto sm:w-[340px] max-h-[80vh] overflow-hidden bg-porcelain border border-charcoal-300/40 rounded-sm shadow-2xl"
          >
            {/* Navy header */}
            <div className="relative bg-primary-900 px-5 py-4">
              <div className="grain-overlay absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" />

              <div className="relative flex items-center gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-porcelain shrink-0">
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
                  <p className="text-[10px] uppercase tracking-widest text-accent-500 mb-0.5">
                    Rated on Google
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xl text-porcelain leading-none">
                      4.9
                    </span>
                    <div className="flex items-center gap-0.5">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star
                          key={i}
                          size={11}
                          className="fill-accent-500 text-accent-500"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-porcelain/50">
                      119 reviews
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close reviews"
                  className="shrink-0 w-8 h-8 flex items-center justify-center text-porcelain/60 hover:text-porcelain transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* White body — reviews */}
            <div className="p-5 space-y-5 max-h-[45vh] overflow-y-auto">
              {WIDGET_REVIEWS.map((review) => (
                <div key={review.id}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-full bg-primary-900 flex items-center justify-center text-porcelain text-xs font-display shrink-0">
                      {review.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-primary-900 truncate">
                        {review.name}
                      </p>
                      <div className="flex items-center gap-0.5">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <Star
                            key={i}
                            size={9}
                            className="fill-accent-500 text-accent-500"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-500 leading-relaxed pl-12">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>
              ))}
            </div>

            {/* White body — CTA footer */}
            <div className="border-t border-charcoal-300/30 px-5 py-3">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-widest text-primary-900 hover:text-accent-600 transition-colors group"
              >
                <span>See all 119 reviews on Google</span>
                <ExternalLink
                  size={12}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}