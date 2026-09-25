import localFont from 'next/font/local';
import { Mr_Dafoe } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileActionBar from '@/components/MobileActionBar';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import AmbientBackground from '@/components/AmbientBackground';
import { SITE_URL, site } from '@/data/site';
import { openingHoursSpecification } from '@/lib/hours';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Barlow is self-hosted as one small file per weight (see assets/fonts/README.md).
// Google's split subsets made every "₹" download four extra font files, even
// though Barlow has no rupee glyph — the sign is drawn by the system font.
const display = localFont({
  src: [
    { path: '../assets/fonts/BarlowCondensed-700.woff2', weight: '700', style: 'normal' },
    { path: '../assets/fonts/BarlowCondensed-800.woff2', weight: '800', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-barlow-condensed',
  fallback: ['Arial Narrow', 'Arial', 'sans-serif'],
});

const body = localFont({
  src: [
    { path: '../assets/fonts/Barlow-400.woff2', weight: '400', style: 'normal' },
    { path: '../assets/fonts/Barlow-600.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-barlow',
  fallback: ['system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
});

const script = Mr_Dafoe({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  preload: false,
  variable: '--font-dafoe',
});

const title = 'Flavours Of Punjab | Authentic Punjabi Restaurant in Rajinder Nagar, Delhi';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: '%s | Flavours Of Punjab' },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: 'Flavours Of Punjab — Authentic Punjabi Family Restaurant',
    description:
      'Smoky tandoori, butter chicken, dal makhni, biryani and fresh breads in Old Rajinder Nagar, New Delhi. Dine-in, takeaway, delivery and catering.',
    locale: 'en_IN',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flavours Of Punjab — Authentic Punjabi Family Restaurant',
    description: 'Smoky tandoori, butter chicken, dal makhni, biryani and fresh breads in Old Rajinder Nagar, New Delhi.',
  },
  category: 'restaurant',
};

export const viewport = {
  themeColor: '#0D0B09',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Restaurant',
      '@id': `${SITE_URL}/#restaurant`,
      name: site.name,
      description: site.description,
      url: SITE_URL,
      image: [`${SITE_URL}/opengraph-image.jpg`],
      logo: `${SITE_URL}/icon.svg`,
      telephone: site.phone.e164,
      priceRange: site.priceRange,
      servesCuisine: site.cuisines,
      acceptsReservations: true,
      menu: `${SITE_URL}/menu`,
      hasMap: site.maps.place,
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${site.address.street}, ${site.address.locality}`,
        addressLocality: site.address.city,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
      geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
      openingHoursSpecification: openingHoursSpecification(),
      sameAs: [site.social.instagram, site.order.swiggy, site.order.zomato],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: site.name,
      publisher: { '@id': `${SITE_URL}/#restaurant` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${display.variable} ${body.variable} ${script.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // JSON-LD must be inline; the content is static and escapes "<".
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <AmbientBackground />
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <MobileActionBar />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
