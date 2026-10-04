import { CONTACT } from '../../lib/contact';

/* ─────────────────────────────────────────────────────────────
   CONTACT MAP
   Embedded Google Map showing the Royride Utawala office.

   Kept minimal and lazy-loaded. The map is a nice-to-have, not
   a conversion surface — a delay here costs nothing.
   ───────────────────────────────────────────────────────────── */

export function ContactMap() {
  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[21/9] lg:aspect-[16/9] rounded-2xl overflow-hidden border border-border bg-surface-sunken">

      {/* Map embed */}
      <iframe
        src={CONTACT.mapEmbedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Royride Car Hire location — Utawala, Nairobi"
        className="absolute inset-0"
      />

      {/* Subtle inner ring for depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-inset ring-black/[0.04]"
      />
    </div>
  );
}
