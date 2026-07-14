import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://chocolateshopee.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Chocolate Shopee — Nanded\'s Favourite Chocolate Store',
    template: '%s | Chocolate Shopee Nanded',
  },
  description: 'Nanded\'s most loved chocolate shop since 2001. Cadbury, Ferrero, Lindt, Toblerone, gift hampers & more. Bhagya Nager T point, Nanded. Open until 10 PM.',
  keywords: ['chocolate shop Nanded', 'Cadbury Nanded', 'Ferrero Rocher Nanded', 'gift hamper Nanded', 'chocolate store Nanded', 'Bhagya Nager T point'],
  authors: [{ name: 'Chocolate Shopee' }],
  creator: 'Chocolate Shopee',
  publisher: 'Chocolate Shopee',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Chocolate Shopee',
    title: 'Chocolate Shopee — Nanded\'s Favourite Chocolate Store',
    description: 'Nanded\'s most loved chocolate shop since 2001. All top brands, gift hampers, open until 10 PM.',
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 800,
        height: 600,
        alt: 'Chocolate Shopee — Nanded',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chocolate Shopee — Nanded\'s Favourite Chocolate Store',
    description: 'Nanded\'s most loved chocolate shop since 2001. Cadbury, Ferrero, Lindt & more.',
    images: [`${SITE_URL}/logo.png`],
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION ?? '',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Chocolate Shopee',
  description: 'Nanded\'s most loved chocolate shop since 2001. Largest selection of chocolates, gift hampers, and imported brands.',
  url: SITE_URL,
  telephone: '+919158882111',
  email: 'kshirsagarpramod.2012@gmail.com',
  foundingDate: '2001',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bhagya Nager T point',
    addressLocality: 'Nanded',
    addressRegion: 'Maharashtra',
    postalCode: '431601',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 19.1778,
    longitude: 77.3086,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '22:00',
    },
  ],
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, UPI',
  priceRange: '₹₹',
  hasMap: 'https://maps.google.com/?q=Bhagya+Nagar+Road+Nanded',
  sameAs: [],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Jost:wght@200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
