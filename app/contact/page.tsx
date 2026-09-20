import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ContactForm } from '../../components/contact/ContactForm';
import { ContactInfo } from '../../components/contact/ContactInfo';
import { ContactMap } from '../../components/contact/ContactMap';
import { BRAND } from '../../lib/constants';
import { CONTACT } from '../../lib/contact';
import { buildPageMetadata } from '../../lib/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with Royride Car Hire in Utawala, Nairobi. Call, WhatsApp, or send an enquiry — we respond within 2 hours during business hours.',
  path: '/contact',
  keywords: [
    'contact Royride car hire',
    'car hire Nairobi contact',
    'rent a car Nairobi phone',
    'Royride Utawala location',
    'WhatsApp car hire Nairobi',
  ],
});

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-porcelain">
      {/* Hero */}
      <section className="relative bg-primary-900 pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 70% 30%, rgba(201, 162, 39, 0.2) 0%, transparent 60%)',
          }}
        />
        <div className="grain-overlay absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <p className="type-caption text-accent-500 mb-4">Get in Touch</p>
          <h1 className="type-display text-porcelain mb-6 max-w-3xl">
            Let&apos;s Get You{' '}
            <span className="italic font-light">Moving</span>
          </h1>
          <p className="type-lead text-porcelain/60 max-w-2xl">
            Call, WhatsApp, or send us an enquiry. We respond within two
            hours during business hours — often much faster.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 lg:py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form (60%) */}
            <div className="lg:col-span-3">
              <Suspense
                fallback={
                  <div className="bg-porcelain border border-charcoal-300/30 rounded-sm p-10 text-center text-sm text-charcoal-500">
                    Loading form…
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </div>

            {/* Info (40%) */}
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* Map + Address */}
      <section className="pb-16 lg:pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left column — address + CTA */}
            <div className="lg:col-span-1">
              <p className="type-caption text-accent-600 mb-3">Find Us</p>
              <h2 className="font-display text-3xl lg:text-4xl text-primary-900 mb-6">
                Our Location
              </h2>

              <div className="space-y-1 mb-6">
                <p className="text-primary-900 font-medium text-lg">
                  {BRAND.fullName}
                </p>
                <p className="text-charcoal-700">
                  {CONTACT.address.line1}
                </p>
                <p className="text-charcoal-700">
                  {CONTACT.address.city}
                </p>
              </div>

              <div className="pt-4 border-t border-charcoal-300/30 mb-6">
                <p className="text-[10px] uppercase tracking-widest text-charcoal-500 mb-2">
                  Landmark
                </p>
                <p className="text-sm text-charcoal-700">
                  {CONTACT.address.landmark}
                </p>
              </div>

              <a
                href={CONTACT.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 w-full justify-center"
              >
                Get Directions
              </a>

              <a
                href={CONTACT.shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 w-full justify-center text-xs uppercase tracking-widest text-charcoal-500 hover:text-accent-600 transition-colors py-2"
              >
                View on Google Maps →
              </a>
            </div>

            {/* Right column — map */}
            <div className="lg:col-span-2">
              <ContactMap />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom strip — call now */}
      <section className="bg-primary-900 py-16 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="type-caption text-accent-500 mb-4">
            Prefer to Talk?
          </p>
          <h2 className="font-display text-3xl lg:text-4xl text-porcelain mb-6">
            Call Us Now
          </h2>
          <p className="type-lead text-porcelain/60 mb-8">
            Our team is available Monday through Saturday, 8 AM to 6 PM.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {BRAND.phones.map((phone, index) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, '')}`}
                className={
                  index === 0
                    ? 'btn-primary inline-block'
                    : 'btn-secondary border-porcelain text-porcelain hover:bg-porcelain hover:text-primary-900 inline-block'
                }
              >
                {phone}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}