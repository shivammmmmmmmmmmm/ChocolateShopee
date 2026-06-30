import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chocolate Shopee — Nanded\'s Favourite Chocolate Store',
  description: 'Nanded\'s most loved chocolate shop since 2001. Cadbury, Ferrero, Lindt, Toblerone, gift hampers & more. Bhagya Nager T point, Nanded. Open until 10 PM.',
  keywords: ['chocolate shop Nanded', 'Cadbury Nanded', 'Ferrero Rocher', 'gift hamper Nanded', 'chocolate store', 'Bhagya Nager T point'],
  openGraph: {
    title: 'Chocolate Shopee — Nanded\'s Favourite Chocolate Store',
    description: 'Nanded\'s most loved chocolate shop since 2001. All top brands, gift hampers, open until 10 PM.',
    type: 'website',
    siteName: 'Chocolate Shopee, Nanded',
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
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
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
