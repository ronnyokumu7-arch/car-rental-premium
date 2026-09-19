import { CONTACT } from '../../lib/contact';

export function ContactMap() {
  return (
    <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/9] rounded-sm overflow-hidden border border-charcoal-300/30">
      <iframe
        src={CONTACT.mapEmbedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Royride Car Hire Location — Utawala, Nairobi"
        className="absolute inset-0"
      />
    </div>
  );
}