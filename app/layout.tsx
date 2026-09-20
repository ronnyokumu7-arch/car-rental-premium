import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { FloatingWidgets } from '../components/layout/FloatingWidgets';
import { LocalBusinessSchema } from '../components/seo/LocalBusinessSchema';
import { BRAND } from '../lib/constants';
import './globals.css';

/* ─────────────────────────────────────────────────────────────
   FONTS — self-hosted at build time via next/font
   No runtime requests to Google. Files are downloaded once during
   `next build` and served from your own domain afterward.
   ───────────────────────────────────────────────────────────── */

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
});

/* ─────────────────────────────────────────────────────────────
   METADATA — brand defaults for every page
   ───────────────────────────────────────────────────────────── */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://royride.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Royride — Rental Cars for Short-Term Use`,
    template: `%s — Royride`,
  },
  description: `${BRAND.tagline}. Concierge service, airport transfers, and a curated fleet of luxury vehicles.`,
  applicationName: BRAND.fullName,
  authors: [{ name: BRAND.fullName, url: SITE_URL }],
  creator: BRAND.fullName,
  publisher: BRAND.fullName,
  keywords: [
    'car hire Nairobi',
    'car rental Kenya',
    'rental cars Nairobi',
    'short-term car hire',
    'luxury car hire',
    'airport transfers Nairobi',
    'self-drive car hire',
    'chauffeured car hire',
    'Royride',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: SITE_URL,
    siteName: BRAND.fullName,
    title: 'Royride — Rental Cars for Short-Term Use',
    description:
      'Concierge service, airport transfers, and a curated fleet of luxury vehicles — delivered anywhere in Kenya.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Royride — Rental Cars for Short-Term Use',
    description:
      'Concierge service, airport transfers, and a curated fleet of luxury vehicles — delivered anywhere in Kenya.',
  },
  icons: {
    icon: '/icon',
    apple: '/apple-icon',
  },
  verification: {
    // Add your Google Search Console verification code here when ready:
    // google: 'your-verification-code-here',
  },
};

/* ─────────────────────────────────────────────────────────────
   ROOT LAYOUT
   ───────────────────────────────────────────────────────────── */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans bg-porcelain text-charcoal-700 antialiased">
        <LocalBusinessSchema />
        <Navbar />
        <main className="relative z-0">{children}</main>
        <Footer />
        <FloatingWidgets />
      </body>
    </html>
  );
}