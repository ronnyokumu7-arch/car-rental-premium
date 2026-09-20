'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Shield,
  FileCheck,
  Plane,
  Award,
  Check,
  ArrowRight,
  Users,
  Car,
  Star,
} from 'lucide-react';
import { TeamMember } from './TeamMember';

export function AboutContent() {
  return (
    <main className="min-h-screen bg-porcelain">
      {/* ══════════════════════════════════════════════════════
          SECTION 1 — Hero
          ══════════════════════════════════════════════════════ */}
      <section className="relative bg-primary-900 pt-32 pb-24 lg:pb-32 px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 70% 30%, rgba(201, 162, 39, 0.2) 0%, transparent 60%)',
          }}
        />
        <div className="grain-overlay absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <p className="type-caption text-accent-500 mb-4">About Us</p>
          <h1 className="type-display text-porcelain mb-8 max-w-4xl">
            Nairobi&apos;s Trusted Fleet{' '}
            <span className="Italic font-light">Since 2016</span>
          </h1>
          <p className="type-lead text-porcelain/60 max-w-2xl">
            Reliable, cost-effective car hire for individuals, businesses,
            and expats — delivering value and top-notch customer experience
            across Kenya.
          </p>
        </div>
      </section>

      {/* SECTION 2 — Our Story */}
      <section className="py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 lg:sticky lg:top-32"
            >
              <p className="type-caption text-accent-600 mb-3">Our Story</p>
              <h2 className="font-display text-4xl lg:text-5xl text-primary-900 leading-tight mb-6">
                Built on Trust.
                <br />
                <span className="font-light">Driven by Detail.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-8 space-y-6 text-charcoal-700 leading-relaxed text-lg"
            >
              <p>
                Royride Car Hire began in 2016 with a simple promise: give
                people in Nairobi a car hire experience they could actually
                trust. No hidden fees. No last-minute surprises. Just
                reliable vehicles and honest service.
              </p>
              <p>
                Nearly a decade later, that promise has grown into a fleet of{' '}
                <span className="text-primary-900 font-semibold">
                  46 vehicles
                </span>{' '}
                — from executive SUVs and family vans to economy saloons —
                serving individuals, businesses, and expats across Kenya.
              </p>
              <p>
                We partner with{' '}
                <span className="text-primary-900 font-semibold">
                  17 private car owners
                </span>{' '}
                who trust us to manage and rent their vehicles. Every car in
                our fleet is vetted, insured, and maintained to the same
                standard we&apos;d want for our own family.
              </p>
              <p className="font-display text-xl text-primary-900 italic pt-4">
                The result: a fleet you can rely on, at prices you can
                trust, with service that keeps people coming back.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Mission */}
      <section className="bg-primary-900 py-24 lg:py-32 px-6 lg:px-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 30% 50%, rgba(201, 162, 39, 0.15) 0%, transparent 60%)',
          }}
        />
        <div className="grain-overlay absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <p className="type-caption text-accent-500 mb-6">Our Mission</p>
          <blockquote className="font-display text-3xl lg:text-5xl text-porcelain leading-tight mb-8">
            &ldquo;To become a top-rated car rental agency in Nairobi,
            delivering value and top-notch customer service and
            experience.&rdquo;
          </blockquote>
          <div className="w-16 h-px bg-accent-500 mx-auto" />
        </motion.div>
      </section>

      {/* SECTION 4 — What Sets Us Apart */}
      <section className="py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <p className="type-caption text-accent-600 mb-3">
              What Sets Us Apart
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-primary-900 leading-tight mb-6">
              Committed to Excellence
            </h2>
            <p className="type-lead">
              From a fleet of reliable vehicles to a simple booking process,
              we make every aspect of your rental experience as smooth as it
              can be.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Differentiator
              icon={<Shield size={22} />}
              title="Vetted Fleet"
              description="Every vehicle is inspected, insured, and fully road-ready before every hire."
              index={0}
            />
            <Differentiator
              icon={<FileCheck size={22} />}
              title="Verified Documents"
              description="Digital verification for faster handover — no paperwork delays."
              index={1}
            />
            <Differentiator
              icon={<Plane size={22} />}
              title="Airport Transfers"
              description="Real-time flight tracking and punctual JKIA pickups, day or night."
              index={2}
            />
            <Differentiator
              icon={<Award size={22} />}
              title="Since 2016"
              description="Nearly a decade of trust built on repeat customers and referrals."
              index={3}
            />
          </div>
        </div>
      </section>

      {/* SECTION 5 — Services */}
      <section className="bg-charcoal-900 py-24 lg:py-32 px-6 lg:px-8 relative overflow-hidden">
        <div className="grain-overlay absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <p className="type-caption text-accent-500 mb-3">Our Services</p>
            <h2 className="font-display text-4xl lg:text-5xl text-porcelain leading-tight">
              Two Ways to Drive
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="bg-primary-900/50 backdrop-blur-sm border border-porcelain/10 rounded-sm p-8 lg:p-10 hover:border-accent-500/40 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-full bg-accent-500/15 border border-accent-500/30 flex items-center justify-center mb-6">
                <Car size={22} className="text-accent-500" />
              </div>
              <p className="type-caption text-accent-500 mb-3">
                Self-Drive Hire
              </p>
              <h3 className="font-display text-2xl lg:text-3xl text-porcelain mb-4">
                Drive Around on Your Own Terms
              </h3>
              <p className="text-porcelain/70 leading-relaxed mb-8">
                Running errands, attending an event, or just need a car for
                the weekend? We&apos;ve made self-drive hire simple,
                affordable, and available anytime.
              </p>
              <Link
                href="/vehicles"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent-500 hover:text-porcelain transition-colors group"
              >
                Browse the Fleet
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-primary-900/50 backdrop-blur-sm border border-porcelain/10 rounded-sm p-8 lg:p-10 hover:border-accent-500/40 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-full bg-accent-500/15 border border-accent-500/30 flex items-center justify-center mb-6">
                <Users size={22} className="text-accent-500" />
              </div>
              <p className="type-caption text-accent-500 mb-3">
                Chauffeured Hire
              </p>
              <h3 className="font-display text-2xl lg:text-3xl text-porcelain mb-4">
                You Rent. We Drive.
              </h3>
              <p className="text-porcelain/70 leading-relaxed mb-8">
                0% liability, 100% peace of mind. From weddings and galas to
                airport pickups and drop-offs, we ensure every ride feels
                first-class.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent-500 hover:text-porcelain transition-colors group"
              >
                Book a Chauffeur
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — By the Numbers */}
      <section className="py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mb-16"
          >
            <p className="type-caption text-accent-600 mb-3">
              By the Numbers
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-primary-900 leading-tight">
              Trust, Measured
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <Stat
              value="17"
              label="Private Car Owners"
              sublabel="Partner with us"
              index={0}
            />
            <Stat
              value="46"
              label="Vehicles Available"
              sublabel="And growing"
              index={1}
            />
            <Stat
              value="119"
              label="Google Reviews"
              sublabel="Rated 4.9/5"
              stars
              index={2}
            />
            <Stat
              value="2016"
              label="Operating Since"
              sublabel="Nearly a decade"
              index={3}
            />
          </div>
        </div>
      </section>

      {/* SECTION 7 — Airport Transfer Band */}
      <section className="bg-primary-900 py-20 lg:py-28 px-6 lg:px-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 80% 50%, rgba(201, 162, 39, 0.25) 0%, transparent 60%)',
          }}
        />
        <div className="grain-overlay absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <p className="type-caption text-accent-500 mb-3">
                Airport Transfers
              </p>
              <h2 className="font-display text-4xl lg:text-5xl text-porcelain leading-tight mb-6">
                Land. Ride.{' '}
                <span className="italic font-light">Arrive.</span>
              </h2>
              <p className="text-porcelain/70 leading-relaxed mb-6">
                Real-time flight tracking. Punctual pickups. Executive
                vehicles with working A/C and professional chauffeurs.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Real-time flight tracking',
                  'Punctual airport pickups',
                  'Clean, comfortable vehicles',
                  'Direct drop-offs to hotel or residence',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-porcelain/70 text-sm"
                  >
                    <Check
                      size={16}
                      className="text-accent-500 shrink-0 mt-0.5"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-porcelain/5 backdrop-blur-sm border border-porcelain/10 rounded-sm p-8 lg:p-10"
            >
              <p className="text-[10px] uppercase tracking-widest text-accent-500 mb-3">
                Starting From
              </p>
              <p className="font-display text-5xl lg:text-6xl text-porcelain leading-none mb-4">
                USD 50
              </p>
              <p className="text-porcelain/60 text-sm leading-relaxed mb-8">
                JKIA to any hotel or residence within Nairobi. VIP transfers
                from USD 50.
              </p>
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center justify-center gap-2 w-full"
              >
                Schedule a Transfer
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — Meet the Team */}
      <section className="py-24 lg:py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <p className="type-caption text-accent-600 mb-3">Meet the Team</p>
            <h2 className="font-display text-4xl lg:text-5xl text-primary-900 leading-tight mb-6">
              The People Behind the Fleet
            </h2>
            <p className="type-lead">
              Royride is built by people who genuinely care about every hire,
              every journey, and every customer who trusts us with their
              travel.
            </p>
          </motion.div>

          <TeamMember
            name="Ronny Okumu"
            role="Founder & Managing Director"
            initials="RO"
            quote="I've always believed that great service isn't about the cars — it's about keeping your word. When I say your car will be there on time, it will be there on time. That's the promise Royride was built on, and it's why our customers keep coming back."
            phone="+254 780 957 810"
            email="sales@royride.com"
            index={0}
          />
        </div>
      </section>

      {/* SECTION 9 — Final CTA */}
      <section className="bg-charcoal-900 py-24 lg:py-32 px-6 lg:px-8 relative overflow-hidden">
        <div className="grain-overlay absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" />
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(201, 162, 39, 0.2) 0%, transparent 60%)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <p className="type-caption text-accent-500 mb-4">
            Ready When You Are
          </p>
          <h2 className="font-display text-4xl lg:text-5xl text-porcelain leading-tight mb-6">
            Let&apos;s Get You on the{' '}
            <span className="italic font-light">Road</span>
          </h2>
          <p className="text-porcelain/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Browse the fleet, book a chauffeur, or send us an enquiry. We
            respond within two hours during business hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/vehicles" className="btn-primary inline-block">
              Explore the Fleet
            </Link>
            <Link
              href="/contact"
              className="btn-secondary border-porcelain text-porcelain hover:bg-porcelain hover:text-primary-900 inline-block"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

/* ─────────────────────────────────────────────── */
function Differentiator({
  icon,
  title,
  description,
  index = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-porcelain border border-charcoal-300/30 rounded-sm p-6 hover:border-accent-500/40 hover:shadow-lg transition-all duration-500"
    >
      <div className="w-12 h-12 rounded-full bg-accent-500/10 border border-accent-500/30 flex items-center justify-center mb-5">
        <span className="text-accent-600">{icon}</span>
      </div>
      <h3 className="font-display text-xl text-primary-900 mb-3">{title}</h3>
      <p className="text-sm text-charcoal-500 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

function Stat({
  value,
  label,
  sublabel,
  stars,
  index = 0,
}: {
  value: string;
  label: string;
  sublabel?: string;
  stars?: boolean;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center lg:text-left"
    >
      {stars && (
        <div className="flex justify-center lg:justify-start gap-1 mb-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star
              key={i}
              size={14}
              className="fill-accent-500 text-accent-500"
            />
          ))}
        </div>
      )}
      <p className="font-display text-5xl lg:text-6xl text-primary-900 leading-none mb-3">
        {value}
      </p>
      <p className="text-[11px] uppercase tracking-widest text-charcoal-500 mb-1 font-medium">
        {label}
      </p>
      {sublabel && <p className="text-xs text-charcoal-500">{sublabel}</p>}
    </motion.div>
  );
}