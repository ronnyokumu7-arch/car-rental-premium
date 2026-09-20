import type { Metadata } from 'next';
import { UpdatesContent } from '../../components/marketing/UpdatesContent';
import { buildPageMetadata } from '../../lib/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Updates',
  description:
    'News, travel guides, seasonal offers, and stories from behind the wheel. Fleet additions and driving inspiration from Royride Car Hire in Nairobi.',
  path: '/updates',
  keywords: [
    'car hire news Nairobi',
    'Kenya travel guides',
    'Nairobi driving routes',
    'Royride updates',
    'car rental offers Kenya',
  ],
});

export default function UpdatesPage() {
  return <UpdatesContent />;
}