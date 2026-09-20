import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { BRAND } from '../../lib/constants';
import { CONTACT } from '../../lib/contact';

export function ContactInfo() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    CONTACT.whatsappMessage
  )}`;

  return (
    <div className="space-y-6">
      {/* WhatsApp — featured, highest-converting */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 p-6 bg-primary-900 rounded-sm transition-all duration-300 hover:bg-primary-700"
      >
        <div className="w-12 h-12 rounded-full bg-accent-500/20 border border-accent-500/40 flex items-center justify-center shrink-0">
          <MessageCircle size={22} className="text-accent-500" />
        </div>
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-widest text-accent-500 mb-1">
            Fastest Response
          </p>
          <p className="text-porcelain font-medium">Chat on WhatsApp</p>
        </div>
        <span className="text-porcelain/40 group-hover:text-accent-500 group-hover:translate-x-1 transition-all">
          →
        </span>
      </a>

      {/* Phone numbers */}
      <InfoCard icon={<Phone size={18} />} label="Call Us">
        <div className="space-y-1">
          {BRAND.phones.map((phone) => (
            <a
              key={phone}
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="block text-primary-900 font-medium hover:text-accent-600 transition-colors"
            >
              {phone}
            </a>
          ))}
        </div>
      </InfoCard>

      {/* Email */}
      <InfoCard icon={<Mail size={18} />} label="Email">
        <a
          href="mailto:sales@royride.com"
          className="text-primary-900 font-medium hover:text-accent-600 transition-colors break-all"
        >
          sales@royride.com
        </a>
      </InfoCard>

      {/* Location */}
      <InfoCard icon={<MapPin size={18} />} label="Visit Us">
        <div className="space-y-1">
          <p className="text-primary-900 font-medium text-base">
            Royride Car Hire Ltd.
          </p>
          <p className="text-charcoal-700 text-sm">Kibiku Road, Utawala</p>
          <p className="text-charcoal-700 text-sm">Nairobi, Kenya</p>
        </div>
        <a
          href={CONTACT.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-xs uppercase tracking-widest text-accent-600 hover:text-accent-700 transition-colors"
        >
          Get Directions →
        </a>
      </InfoCard>

      {/* Hours */}
      <InfoCard icon={<Clock size={18} />} label="Business Hours">
        <ul className="space-y-2">
          {CONTACT.businessHours.map(({ days, hours }) => (
            <li
              key={days}
              className="flex justify-between items-baseline gap-3 text-sm"
            >
              <span className="text-charcoal-500">{days}</span>
              <span className="text-primary-900 font-medium text-right">
                {hours}
              </span>
            </li>
          ))}
        </ul>
      </InfoCard>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-porcelain border border-charcoal-300/30 rounded-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-accent-500">{icon}</span>
        <span className="text-[10px] uppercase tracking-widest text-charcoal-500 font-medium">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}