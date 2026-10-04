'use client';

import { SOCIAL_LINKS } from '../../lib/social';

interface SocialLinksProps {
  size?: 'sm' | 'md';
  variant?: 'light' | 'dark';
}

export function SocialLinks({
  size = 'sm',
  variant = 'dark',
}: SocialLinksProps) {
  const circle = size === 'sm' ? 'w-9 h-9' : 'w-10 h-10';
  const icon = size === 'sm' ? 15 : 17;

  /* ── Variant styles ──
     dark  = for use on obsidian/near-black surfaces (footer, navbar)
     light = for use on ivory/white surfaces (contact page, cards)
  */
  const variantStyles =
    variant === 'dark'
      ? 'border-white/12 text-white/55 hover:border-copper-400/70 hover:bg-copper-500/10 hover:text-copper-300'
      : 'border-obsidian-200 text-obsidian-500 hover:border-copper-500/70 hover:bg-copper-500/10 hover:text-copper-600';

  return (
    <ul className="flex items-center gap-3">
      {SOCIAL_LINKS.map(({ name, href, path }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            title={name}
            className={`
              group relative flex items-center justify-center
              ${circle} rounded-full border
              ${variantStyles}
              transition-all duration-400 ease-lux
              hover:-translate-y-1
            `}
          >
            {/* Copper halo — blooms on hover, sits behind the icon */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-lux pointer-events-none"
              style={{
                boxShadow: '0 0 20px rgba(194,112,46,0.35)',
              }}
            />

            <svg
              width={icon}
              height={icon}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="relative z-10 transition-transform duration-400 ease-lux group-hover:scale-[1.08]"
            >
              <path d={path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
