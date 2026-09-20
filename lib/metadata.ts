import type { Metadata } from 'next';

const SITE_URL = 'https://royride.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`;

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage = DEFAULT_OG_IMAGE,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} — Royride Car Hire`,
      description,
      url,
      siteName: 'Royride Car Hire',
      locale: 'en_KE',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} — Royride Car Hire`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — Royride Car Hire`,
      description,
      images: [ogImage],
    },
  };
}