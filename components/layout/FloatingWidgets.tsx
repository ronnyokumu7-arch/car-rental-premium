'use client';

import { ScrollToTop } from './ScrollToTop';
import { GoogleReviewsWidget } from './GoogleReviewsWidget';

export function FloatingWidgets() {
  return (
    <>
      <GoogleReviewsWidget />
      <ScrollToTop />
    </>
  );
}