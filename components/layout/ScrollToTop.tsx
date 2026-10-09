'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/* ─────────────────────────────────────────────────────────────
   SCROLL TO TOP
   Appears once the user has scrolled past 600px.

   Hidden when:
     • The current route is in SUPPRESSED_ROUTES
       (wizard-style pages where focus should stay on the task)
     • A modal is open (body[data-modal-open])

   Deliberately does NOT hide on footer-visible — the button is
   a utility and users may want it at any scroll position.
   ───────────────────────────────────────────────────────────── */

/* Routes where the FAB is intentionally suppressed */
const SUPPRESSED_ROUTES = ['/quote'];

export function ScrollToTop() {
  const pathname = usePathname();
  const [scrolledEnough, setScrolledEnough] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  /* ── Route suppression ── */
  const routeSuppressed = SUPPRESSED_ROUTES.some((r) =>
    pathname.startsWith(r)
  );

  /* ── Scroll threshold ── */
  useEffect(() => {
    const onScroll = () => setScrolledEnough(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Hide when a modal is open ── */
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

  const visible = scrolledEnough && !modalOpen && !routeSuppressed;

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleClick}
          aria-label="Scroll back to top"
          className="group fixed z-[80] w-12 h-12 rounded-full bg-obsidian-900 text-white shadow-[0_8px_24px_rgba(14,14,16,0.28)] border border-white/[0.06] hover:bg-copper-500 hover:text-obsidian-950 hover:border-copper-500 transition-all duration-300 ease-lux hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(194,112,46,0.32)]"
          style={{
            bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
            right: '1.5rem',
          }}
        >
          <ArrowUp
            size={18}
            strokeWidth={2}
            className="absolute inset-0 m-auto transition-transform duration-300 ease-lux group-hover:-translate-y-0.5"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
