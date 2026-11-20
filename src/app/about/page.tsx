import type { Metadata } from 'next'
import Image from 'next/image'
import { breadcrumbListJsonLd } from '@/lib/seo/breadcrumbs'
import { JsonLd } from '@/lib/seo/json-ld'
import { RealScoutListings } from '@/components/RealScoutListings'
import { CalendlyButton } from '@/components/Calendly'
import { calendlyUrl } from '@/lib/calendly'

export const metadata: Metadata = {
  title: 'About Dr. Jan Duffy | Las Vegas Strip High-Rise Condos',
  description:
    'Dr. Jan Duffy helps buyers and sellers in Las Vegas Strip high-rise condos compare towers on price per foot, dues and rental rules. 702-299-6607.',
  alternates: { canonical: 'https://lasvegasstriphighrises.com/about' },
}

const breadcrumbs = breadcrumbListJsonLd([
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
])

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      <main className="bg-gray-950 min-h-screen">
        <section className="py-16 px-4 bg-black">
          <div className="max-w-4xl mx-auto grid md:grid-cols-[160px_1fr] gap-8 items-center">
            <Image src="/dr-jan-duffy-headshot.jpg" alt="Dr. Jan Duffy" width={160} height={160} className="rounded-full mx-auto" priority />
            <div>
              <h1 className="font-serif text-4xl text-white mb-3">About Dr. Jan Duffy, Las Vegas Strip high-rise condo agent</h1>
              <p className="text-gray-300 text-lg">
                Dr. Jan Duffy represents buyers and sellers in the towers on and beside the Las Vegas Strip, from
                condo-hotels on Flamingo Road to the residences at CityCenter.
              </p>
            </div>
          </div>
        </section>

        <RealScoutListings campaign="about" />

        <section className="py-14 px-4 max-w-4xl mx-auto">
          <div className="prose">
            <h2>What she does for high-rise buyers</h2>
            <p>
              A tower purchase is part real estate, part association membership. Dr. Jan pulls the building&apos;s
              recent closings, reads the association budget, reserve study and lease rules with you, and checks
              whether a lender will finance the building before you write an offer.
            </p>
            <h2>What she does for high-rise sellers</h2>
            <p>
              Each tower is its own market. Dr. Jan prices a unit against recent closings in the same building, stack
              and floor, and times the listing against the active competition in that tower.
            </p>
            <h2>How to reach her</h2>
            <p>Call 702-299-6607, or book a time below. Office hours are Monday to Sunday, 8:00 AM to 8:00 PM.</p>
          </div>
          <div className="flex flex-wrap gap-4 mt-6">
            <CalendlyButton url={calendlyUrl('buyer', 'about', 'about')} className="bg-yellow-500 text-gray-950 font-semibold px-6 py-3 rounded-full hover:bg-yellow-400 transition">
              Book a buyer consultation
            </CalendlyButton>
            <CalendlyButton url={calendlyUrl('seller', 'about', 'about')} className="border border-yellow-500 text-yellow-400 font-semibold px-6 py-3 rounded-full hover:bg-gray-900 transition">
              Book a listing consultation
            </CalendlyButton>
            <a href="tel:7022996607" className="border border-yellow-500 text-yellow-400 font-semibold px-6 py-3 rounded-full hover:bg-gray-900 transition">
              Call 702-299-6607
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
