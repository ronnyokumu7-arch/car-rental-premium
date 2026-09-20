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
  const circleSize = size === 'sm' ? 'w-9 h-9' : 'w-10 h-10';
  const iconSize = size === 'sm' ? 15 : 17;

  const styles =
    variant === 'dark'
      ? 'border-porcelain/15 text-porcelain/60 hover:border-accent-500/60 hover:bg-accent-500/10 hover:text-accent-500'
      : 'border-charcoal-300/40 text-charcoal-500 hover:border-accent-500/60 hover:bg-accent-500/10 hover:text-accent-600';

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
            className={`group flex items-center justify-center ${circleSize} rounded-full border ${styles} transition-all duration-300 hover:-translate-y-0.5`}
          >
            <svg
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d={path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}