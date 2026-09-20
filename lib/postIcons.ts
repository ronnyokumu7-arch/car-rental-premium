import { Car, Compass, Newspaper, Tag, type LucideIcon } from 'lucide-react';

/**
 * Category → icon mapping for Update post visuals.
 * Used by CompactPostCard, PostCard, and FeaturedPost.
 */
export const POST_CATEGORY_ICONS: Record<string, LucideIcon> = {
  News: Newspaper,
  Guides: Compass,
  Offers: Tag,
  Fleet: Car,
};

export const getCategoryIcon = (category: string): LucideIcon => {
  return POST_CATEGORY_ICONS[category] ?? Newspaper;
};