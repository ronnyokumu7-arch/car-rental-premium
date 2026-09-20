'use client';

import Link from 'next/link';

interface PostBodyProps {
  content: string;
}

export function PostBody({ content }: PostBodyProps) {
  const blocks = content.split(/\n\n+/);

  return (
    <div className="prose-ir max-w-3xl mx-auto">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // H2 heading
        if (trimmed.startsWith('## ')) {
          return (
            <h2
              key={i}
              className="font-display text-2xl lg:text-3xl text-primary-900 leading-tight mt-12 mb-5"
            >
              {trimmed.replace('## ', '')}
            </h2>
          );
        }

        // Unordered list
        if (trimmed.startsWith('- ')) {
          const items = trimmed
            .split('\n')
            .filter((line) => line.trim().startsWith('- '))
            .map((line) => line.replace(/^-\s+/, ''));

          return (
            <ul key={i} className="space-y-3 my-6">
              {items.map((item, j) => (
                <li
                  key={j}
                  className="relative pl-6 text-charcoal-700 leading-relaxed"
                >
                  <span className="absolute left-0 top-3 w-3 h-px bg-accent-500" />
                  <InlineText text={item} />
                </li>
              ))}
            </ul>
          );
        }

        // Paragraph
        return (
          <p
            key={i}
            className="text-charcoal-700 leading-relaxed text-lg my-6"
          >
            <InlineText text={trimmed} />
          </p>
        );
      })}
    </div>
  );
}

/* ── Inline text renderer: handles **bold**, *italic*, [link](url) ── */
function InlineText({ text }: { text: string }) {
  // Split on markdown tokens, preserving delimiters
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  const patterns = [
    { regex: /\*\*(.+?)\*\*/, type: 'bold' },
    { regex: /\*(.+?)\*/, type: 'italic' },
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

    // Text before the match
    if (earliestMatch.index > 0) {
      parts.push(remaining.slice(0, earliestMatch.index));
    }

    // The formatted piece
    if (earliestMatch.type === 'bold') {
      parts.push(
        <strong key={key++} className="text-primary-900 font-semibold">
          {earliestMatch.groups[0]}
        </strong>
      );
    } else if (earliestMatch.type === 'italic') {
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
          className="link-accent"
        >
          {earliestMatch.groups[0]}
        </Link>
      );
    }

    remaining = remaining.slice(earliestMatch.index + earliestMatch.length);
  }

  return <>{parts}</>;
}