'use client';

import Link from 'next/link';

/* ─────────────────────────────────────────────────────────────
   POST BODY
   Renders a post's markdown content (## headings, - lists,
   paragraphs, **bold**, *italic*, [links](url)).

   Layout:
     • Parent section provides `max-w-7xl mx-auto px-8`
     • Body centers its own `max-w-3xl` reading column inside
     • Everything below uses the site palette (obsidian / copper)
   ───────────────────────────────────────────────────────────── */

interface PostBodyProps {
  content: string;
}

export function PostBody({ content }: PostBodyProps) {
  const blocks = content.split(/\n\n+/);

  return (
    <div className="max-w-2xl mx-auto">

      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        /* ── H2 heading ── */
        if (trimmed.startsWith('## ')) {
          return (
            <h2
              key={i}
              className="font-display text-2xl lg:text-3xl text-ink leading-[1.2] tracking-[-0.015em] mt-14 mb-5 first:mt-0"
            >
              {trimmed.replace('## ', '')}
            </h2>
          );
        }

        /* ── H3 heading ── */
        if (trimmed.startsWith('### ')) {
          return (
            <h3
              key={i}
              className="font-display text-xl lg:text-2xl text-ink leading-[1.25] tracking-[-0.01em] mt-10 mb-4"
            >
              {trimmed.replace('### ', '')}
            </h3>
          );
        }

        /* ── Unordered list ── */
        if (trimmed.startsWith('- ')) {
          const items = trimmed
            .split('\n')
            .filter((line) => line.trim().startsWith('- '))
            .map((line) => line.replace(/^-\s+/, ''));

          return (
            <ul key={i} className="space-y-3.5 my-8">
              {items.map((item, j) => (
                <li
                  key={j}
                  className="relative pl-7 text-base lg:text-lg text-ink-muted leading-relaxed font-light"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[0.85em] w-3 h-px bg-copper-500"
                  />
                  <InlineText text={item} />
                </li>
              ))}
            </ul>
          );
        }

        /* ── Paragraph ── */
        return (
          <p
            key={i}
            className="text-base lg:text-lg text-ink-muted leading-[1.75] font-light my-6"
          >
            <InlineText text={trimmed} />
          </p>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   INLINE TEXT
   Handles **bold**, *italic*, [links](url).
   ───────────────────────────────────────────────────────────── */

function InlineText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  const patterns = [
    { regex: /\*\*(.+?)\*\*/, type: 'bold' },
    { regex: /\*(.+?)\*/, type: '' },
    { regex: /\[(.+?)\]\((.+?)\)/, type: 'link' },
  ];

  while (remaining.length > 0) {
    let earliestMatch: {
      index: number;
      length: number;
      type: string;
      groups: string[];
    } | null = null;

    for (const { regex, type } of patterns) {
      const match = remaining.match(regex);
      if (match && match.index !== undefined) {
        if (!earliestMatch || match.index < earliestMatch.index) {
          earliestMatch = {
            index: match.index,
            length: match[0].length,
            type,
            groups: match.slice(1),
          };
        }
      }
    }

    if (!earliestMatch) {
      parts.push(remaining);
      break;
    }

    if (earliestMatch.index > 0) {
      parts.push(remaining.slice(0, earliestMatch.index));
    }

    if (earliestMatch.type === 'bold') {
      parts.push(
        <strong key={key++} className="text-ink font-normal not-italic">
          {earliestMatch.groups[0]}
        </strong>
      );
    } else if (earliestMatch.type === '') {
      parts.push(
        <em key={key++} className="italic">
          {earliestMatch.groups[0]}
        </em>
      );
    } else if (earliestMatch.type === 'link') {
      parts.push(
        <Link
          key={key++}
          href={earliestMatch.groups[1]}
          className="text-copper-600 underline decoration-copper-500/30 underline-offset-4 hover:decoration-copper-500 transition-colors duration-200"
        >
          {earliestMatch.groups[0]}
        </Link>
      );
    }

    remaining = remaining.slice(earliestMatch.index + earliestMatch.length);
  }

  return <>{parts}</>;
}
