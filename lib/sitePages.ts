export interface SitePage {
  path: string;
  priority: number;
  changeFrequency:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  /** Optional: exclude from sitemap (e.g., thank-you pages) */
  noIndex?: boolean;
}

export const STATIC_PAGES: SitePage[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/vehicles', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/updates', priority: 0.8, changeFrequency: 'weekly' },
  // Add new pages below this line:
  // { path: '/list-your-car', priority: 0.8, changeFrequency: 'monthly' },
];