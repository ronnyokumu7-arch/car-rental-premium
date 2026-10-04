import { SITE_URL } from '../../lib/metadata';

/* ─────────────────────────────────────────────────────────────
   BREADCRUMB SCHEMA (schema.org / BreadcrumbList)
   Renders as the clickable path under the page title in
   Google search results. Real CTR impact.

   Usage:
     <BreadcrumbSchema items={[
       { name: 'Home', url: '/' },
       { name: 'Vehicles', url: '/vehicles' },
     ]} />
   ───────────────────────────────────────────────────────────── */

export interface BreadcrumbItem {
  /** Display name shown in the breadcrumb */
  name: string;
  /** Path relative to site root — must start with '/' */
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      /* Normalize path — always starts with '/' */
      const path = item.url.startsWith('/') ? item.url : `/${item.url}`;
      /* Resolve against SITE_URL — handles preview deploys correctly */
      const fullUrl = `${SITE_URL}${path === '/' ? '' : path}`;

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: fullUrl,
      };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
