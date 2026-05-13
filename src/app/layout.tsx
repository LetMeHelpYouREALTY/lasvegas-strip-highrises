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
