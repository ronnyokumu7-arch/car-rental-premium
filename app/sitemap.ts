import type { MetadataRoute } from 'next';
import { POSTS } from '@/lib/posts';
import { STATIC_PAGES } from '@/lib/sitePages';

const BASE_URL = 'https://royride.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = STATIC_PAGES.filter(
    (page) => !page.noIndex
  ).map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const postPages: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${BASE_URL}/updates/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...postPages];
}