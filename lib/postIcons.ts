import { Car, Compass, Newspaper, Tag, type LucideIcon } from 'lucide-react';
import type { PostCategory } from './posts';

/* ─────────────────────────────────────────────────────────────
   POST CATEGORY ICONS
   Maps each PostCategory to a lucide icon.
   Used by CompactPostCard, PostCard, FeaturedPost, and the
   /updates filter chips.
   ───────────────────────────────────────────────────────────── */

export const POST_CATEGORY_ICONS: Record<PostCategory, LucideIcon> = {
  News: Newspaper,
  Guides: Compass,
  Offers: Tag,
  Fleet: Car,
};

/* ─────────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────────── */

/**
 * Get the icon for a post category.
 * Falls back to Newspaper if the category is unknown (defensive).
 */
export function getCategoryIcon(category: string): LucideIcon {
  return (
    POST_CATEGORY_ICONS[category as PostCategory] ?? Newspaper
  );
}
