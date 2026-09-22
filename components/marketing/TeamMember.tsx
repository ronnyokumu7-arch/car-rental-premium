'use client';

import { motion } from 'motion/react';
import { Phone, Mail } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  quote: string;
  initials: string;
  phone?: string;
  email?: string;
  index?: number;
}

export function TeamMember({
  name,
  role,
  quote,
  initials,
  phone,
  email,
  index = 0,
}: TeamMemberProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 items-center"
    >
      {/* Avatar / Photo placeholder */}
      <div className="md:col-span-2 flex justify-center md:justify-end">
        <div className="relative">
          {/* Gold ring */}
          <div className="absolute inset-0 rounded-full border border-accent-500/30 scale-110" />
          <div className="absolute inset-0 rounded-full border border-accent-500/15 scale-125" />

          {/* Avatar circle */}
          <div className="relative w-40 h-40 lg:w-52 lg:h-52 rounded-full bg-gradient-to-br from-primary-900 to-primary-700 flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background:
                  'radial-gradient(ellipse at 70% 30%, rgba(201, 162, 39, 0.35) 0%, transparent 60%)',
              }}
            />
            <div className="grain-overlay absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" />
            <span className="relative font-display text-6xl lg:text-7xl text-porcelain/90">
              {initials}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="md:col-span-3">
        <p className="type-caption text-accent-600 mb-3">{role}</p>
        <h3 className="font-display text-3xl lg:text-4xl text-primary-900 mb-6">
          {name}
        </h3>

        <blockquote className="relative border-l-2 border-accent-500 pl-6 mb-6">
          <p className="font-display text-xl lg:text-2xl leading-relaxed text-charcoal-700 ">
            &ldquo;{quote}&rdquo;
          </p>
        </blockquote>

        {(phone || email) && (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 text-primary-900 hover:text-accent-600 transition-colors"
              >
                <Phone size={14} />
                {phone}
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 text-primary-900 hover:text-accent-600 transition-colors"
              >
                <Mail size={14} />
                {email}
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}