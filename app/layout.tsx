import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { FloatingWidgets } from '../components/layout/FloatingWidgets';
import { LocalBusinessSchema } from '../components/seo/LocalBusinessSchema';
import { BRAND } from '../lib/constants';
import './globals.css';

/* ─────────────────────────────────────────────────────────────
   FONTS — self-hosted at build time via next/font
   ───────────────────────────────────────────────────────────── */

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: true,
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
  adjustFontFallback: true,
});

/* ─────────────────────────────────────────────────────────────
   VIEWPORT
   ───────────────────────────────────────────────────────────── */

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FCFBF8' },
    { media: '(prefers-color-scheme: dark)', color: '#070708' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light dark',
};

/* ─────────────────────────────────────────────────────────────
   METADATA
   ───────────────────────────────────────────────────────────── */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://royride.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Royride Car Hire — Car Rental in Nairobi`,
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
    // google: 'your-verification-code-here',
  },
};

/* ─────────────────────────────────────────────────────────────
   THEME BOOTSTRAP — runs before paint, prevents dark-mode flash
   Reads localStorage, falls back to OS preference.
   ───────────────────────────────────────────────────────────── */

const THEME_SCRIPT = `
(function() {
  try {
    var stored = localStorage.getItem('royride-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.style.colorScheme = 'light';
    }
  } catch (e) {}
})();
`;

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
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
          // Must run before paint — no defer, no async
        />
      </head>
      <body className="font-sans bg-background text-ink antialiased min-h-screen flex flex-col">
        <LocalBusinessSchema />

        {/* Skip link for a11y — invisible until focused */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-ink focus:text-ink-inverted focus:rounded-sm focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>

        <Navbar />

        <main id="main" className="relative z-0 flex-1">
          {children}
        </main>

        <Footer />
        <FloatingWidgets />
      </body>
    </html>
  );
}
