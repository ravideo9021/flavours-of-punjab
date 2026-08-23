import { Barlow_Condensed, Mr_Dafoe } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollEffects from '@/components/ScrollEffects';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import AnimatedGradient from '@/components/AnimatedGradient';

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-display',
});

const dafoe = Mr_Dafoe({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-script',
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://flavours-of-punjab.vercel.app'),
  title: {
    default: 'Flavours Of Punjab | Authentic Punjabi Family Restaurant – Veg & Non-Veg',
    template: '%s | Flavours Of Punjab',
  },
  description:
    'Experience authentic Punjabi cuisine at Flavours Of Punjab, Old Rajinder Nagar, New Delhi. Smoky tandoori, rich butter chicken, aromatic biryanis & traditional breads. Dine-in, takeaway & home delivery.',
  keywords:
    'Punjabi restaurant, Indian food, butter chicken, tandoori, biryani, dal makhni, paneer tikka, naan, Flavours Of Punjab, family restaurant, veg non-veg, Old Rajinder Nagar, New Delhi',
  authors: [{ name: 'Flavours Of Punjab' }],
  creator: 'Flavours Of Punjab',
  publisher: 'Flavours Of Punjab',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: 'Flavours Of Punjab – Authentic Punjabi Family Restaurant',
    description:
      'Savour the finest Punjabi cuisine — tandoori, curries, biryani, breads and more. Dine-in, takeaway & home delivery.',
    siteName: 'Flavours Of Punjab',
    locale: 'en_IN',
    images: [{ url: '/media/butter_chicken_bg.png', width: 1200, height: 630, alt: 'Flavours Of Punjab — Authentic Punjabi Cuisine' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flavours Of Punjab – Authentic Punjabi Restaurant',
    description:
      'Savour the finest Punjabi cuisine — tandoori, curries, biryani, breads and more.',
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍛</text></svg>",
  },
  other: {
    'theme-color': '#0D0B09',
  },
  category: 'restaurant',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${barlow.variable} ${dafoe.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Restaurant',
              name: 'Flavours Of Punjab',
              description:
                'Authentic Punjabi family restaurant serving vegetarian and non-vegetarian cuisine including tandoori, curries, biryani, breads and Indo-Chinese dishes.',
              servesCuisine: ['Punjabi', 'North Indian', 'Indo-Chinese'],
              telephone: '+919910297708',
              priceRange: '₹₹',
              acceptsReservations: true,
              address: {
                '@type': 'PostalAddress',
                streetAddress: '3/16, Shankar Rd, Block 3, Old Rajinder Nagar',
                addressLocality: 'New Delhi',
                addressRegion: 'Delhi',
                postalCode: '110060',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 28.6366247,
                longitude: 77.1838708,
              },
              url: 'https://www.google.com/maps/place/Flavours+Of+Punjab+Restaurant/@28.6366247,77.1812959,17z',
              hasMenu: {
                '@type': 'Menu',
                name: 'Main Menu',
                hasMenuSection: [
                  {
                    '@type': 'MenuSection',
                    name: 'Starters',
                    hasMenuItem: [
                      { '@type': 'MenuItem', name: 'Tandoori Chicken', offers: { '@type': 'Offer', priceCurrency: 'INR', price: '450' } },
                      { '@type': 'MenuItem', name: 'Paneer Tikka', offers: { '@type': 'Offer', priceCurrency: 'INR', price: '310' } },
                    ],
                  },
                  {
                    '@type': 'MenuSection',
                    name: 'Tawa & Tandoor',
                    hasMenuItem: [
                      { '@type': 'MenuItem', name: 'Butter Chicken', offers: { '@type': 'Offer', priceCurrency: 'INR', price: '650' } },
                      { '@type': 'MenuItem', name: 'Kadhai Chicken', offers: { '@type': 'Offer', priceCurrency: 'INR', price: '650' } },
                    ],
                  },
                  {
                    '@type': 'MenuSection',
                    name: 'Curries',
                    hasMenuItem: [
                      { '@type': 'MenuItem', name: 'Dal Makhni', offers: { '@type': 'Offer', priceCurrency: 'INR', price: '240' } },
                      { '@type': 'MenuItem', name: 'Paneer Makhni', offers: { '@type': 'Offer', priceCurrency: 'INR', price: '310' } },
                    ],
                  },
                  {
                    '@type': 'MenuSection',
                    name: 'Rice & Biryani',
                    hasMenuItem: [
                      { '@type': 'MenuItem', name: 'Chicken Biryani', offers: { '@type': 'Offer', priceCurrency: 'INR', price: '370' } },
                    ],
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body>
        <AnimatedGradient />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <ScrollEffects />
      </body>
    </html>
  );
}
