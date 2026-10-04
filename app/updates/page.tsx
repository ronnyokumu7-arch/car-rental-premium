import type { Metadata } from 'next';
import { UpdatesContent } from '../../components/marketing/UpdatesContent';
import { FinalCTA } from '../../components/marketing/FinalCTA';
import { buildPageMetadata } from '../../lib/metadata';
import { getPostsSorted } from '../../lib/posts';

export const metadata: Metadata = buildPageMetadata({
  title: 'Updates — Fleet News, Guides & Offers',
  description:
    'Fleet additions, travel guides, seasonal offers, and stories from Nairobi and beyond. Read the latest from Royride Car Hire.',
  path: '/updates',
  keywords: [
    'Royride updates',
    'car hire news Kenya',
    'Nairobi travel guides',
    'car rental offers Nairobi',
  ],
});

export default function UpdatesPage() {
  const postCount = getPostsSorted().length;

  return (
    <main id="main" className="relative">
      <UpdatesContent />

      {/* If there are posts, close with the real FinalCTA.
          If the page is empty, skip it (nothing to close out). */}
      {postCount > 0 && <FinalCTA />}
    </main>
  );
}
