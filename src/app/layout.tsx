import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://lasvegasstriphighrises.com'),
  title: {
    default: 'Las Vegas Strip High-Rise Condos For Sale | Expert Guide',
    template: '%s | Las Vegas Strip Highrises',
  },
  description: 'Las Vegas Strip high-rise condos for sale — Turnberry Place, Palms Place, Panorama Towers, One Las Vegas, Waldorf Astoria & more. Dr. Jan Duffy, BHHS Nevada Properties · 702-299-6607.',
  keywords: ['Las Vegas Strip high-rise condos', 'Turnberry Place condos', 'Palms Place Las Vegas', 'Panorama Towers', 'One Las Vegas', 'Strip condos for sale'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lasvegasstriphighrises.com',
    siteName: 'Las Vegas Strip Highrises',
    title: 'Las Vegas Strip High-Rise Condos For Sale | Expert Guide',
    description:
      'Las Vegas Strip high-rise condos for sale — Turnberry Place, Palms Place, Panorama Towers, One Las Vegas, Waldorf Astoria & more. Dr. Jan Duffy · 702-299-6607.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Las Vegas Strip high-rise condos — Dr. Jan Duffy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Las Vegas Strip High-Rise Condos For Sale',
    description:
      'Expert guidance on Strip high-rise condos — Turnberry Place, Palms Place, Panorama Towers & more. Dr. Jan Duffy · 702-299-6607.',
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-gray-950">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
