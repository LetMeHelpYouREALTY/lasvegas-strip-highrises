import type { Metadata } from 'next'
import Link from 'next/link'
import { buildings } from '@/lib/buildings'
import type { FaqItem } from '@/lib/seo/faq'
import { JsonLd } from '@/lib/seo/json-ld'
import { breadcrumbListJsonLd } from '@/lib/seo/breadcrumbs'
import { CalendlyButton } from '@/components/Calendly'
import { RealScoutListings } from '@/components/RealScoutListings'
import { AreaFacts, MeetDrJan, QABlock } from '@/components/Standard'
import { calendlyUrl } from '@/lib/calendly'
import { STRIP_GEO } from '@/lib/areaFacts'

export const metadata: Metadata = {
  title: 'Las Vegas Strip High-Rise Condos for Sale | Guide',
  description:
    'Las Vegas Strip high-rise condos: tower-by-tower medians, dues and rental rules, with Dr. Jan Duffy, REALTOR® · 702-299-6607.',
  alternates: { canonical: 'https://lasvegasstriphighrises.com' },
}

const agentJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['RealEstateAgent', 'LocalBusiness'],
  '@id': 'https://lasvegasstriphighrises.com/#agent',
  name: 'Dr. Jan Duffy',
  url: 'https://lasvegasstriphighrises.com',
  image: 'https://lasvegasstriphighrises.com/dr-jan-duffy-headshot.jpg',
  telephone: '702-299-6607',
  priceRange: '$$$',
  description: 'Las Vegas Strip high-rise condo buyer and seller representation: Turnberry Place, Palms Place, Panorama Towers, The Martin, Veer, Waldorf Astoria, Trump International and One Las Vegas.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '7475 W Sahara Ave, Suite 100',
    addressLocality: 'Las Vegas',
    addressRegion: 'NV',
    postalCode: '89117',
    addressCountry: 'US',
  },
  areaServed: { '@id': 'https://lasvegasstriphighrises.com/#strip' },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00',
    },
  ],
}

const placeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Place',
  '@id': 'https://lasvegasstriphighrises.com/#strip',
  name: 'Las Vegas Strip high-rise corridor',
  description: 'About 4.2 miles of Las Vegas Boulevard from Sahara Avenue to Russell Road, with residential and condo-hotel towers on and beside it.',
  geo: { '@type': 'GeoCoordinates', latitude: STRIP_GEO.latitude, longitude: STRIP_GEO.longitude },
  containedInPlace: {
    '@type': 'AdministrativeArea',
    name: 'Clark County',
    containedInPlace: { '@type': 'State', name: 'Nevada' },
  },
}

const QA_ITEMS: FaqItem[] = [
  {
    question: 'What do Las Vegas Strip high-rise condos sell for?',
    answer:
      'Across 19 tower plats, 475 condos closed at a $480,000 median in the 12 months ending September 18, 2026, per Nevada Real Estate Group. The building matters far more than that average: tower medians ran from $207,000 at Palms Place to $2,906,000 at the Waldorf Astoria Residences.',
  },
  {
    question: 'Which towers are actually on the Strip?',
    answer:
      'Only the Waldorf Astoria, Veer and Sky Las Vegas have Las Vegas Boulevard addresses on the Strip. Panorama Towers and The Martin are on Dean Martin Drive west of I-15, and Turnberry Place is east of the Strip near the Convention Center.',
  },
  {
    question: 'How much are HOA dues in a Strip high-rise?',
    answer:
      'Median MLS dues ran from $661 a month at Trump International to $3,769 at One Queensridge Place, with most towers between $900 and $1,500 (records through November 1, 2026). Dues rise with unit size and cover different things in each building, so confirm the amount in the resale package.',
  },
  {
    question: 'Can I rent my unit by the night?',
    answer:
      'Usually not as a new owner. Clark County says operating a short-term rental without a license in the unincorporated county is unlawful, and its application period closed on August 21, 2023. Each building also sets its own lease rules.',
  },
  {
    question: 'Can I get a regular mortgage on a condo-hotel unit?',
    answer:
      "Often not. Fannie Mae's Selling Guide lists projects operated as hotels or offering daily rentals as ineligible, so condo-hotel buyers often pay cash or use a portfolio lender. Get a pre-approval that names the building.",
  },
]

const breadcrumbs = breadcrumbListJsonLd([{ name: 'Home', path: '/' }])

export default function HomePage() {
  return (
    <>
      <JsonLd data={[agentJsonLd, placeJsonLd, breadcrumbs]} />
      <main>
        <section className="relative bg-gray-950 text-white py-24 md:py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-yellow-950 opacity-80" />
          <div className="relative max-w-5xl mx-auto">
            <p className="text-yellow-400 text-xs font-semibold mb-4 uppercase tracking-[0.25em]">
              Las Vegas Strip · High-rise condos
            </p>
            <h1 className="font-serif text-4xl md:text-6xl mb-6 leading-tight max-w-4xl">
              Las Vegas Strip high-rise condos for sale, with Dr. Jan Duffy
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl">
              Eight towers from a $207,000 condo-hotel median to a $2,906,000 median at the Waldorf Astoria. Dr. Jan
              compares them on price per foot, dues and rental rules, then helps you buy or sell in the right one.
            </p>
            <div className="flex flex-wrap gap-4">
              <CalendlyButton url={calendlyUrl('buyer', 'hero', 'home')} className="bg-yellow-500 text-gray-950 font-semibold px-7 py-3 rounded-full hover:bg-yellow-400 transition">
                Book a buyer consultation
              </CalendlyButton>
              <Link href="/sell-your-las-vegas-strip-high-rise-condo" className="border border-yellow-500 text-yellow-400 font-semibold px-7 py-3 rounded-full hover:bg-yellow-950 transition">
                What&apos;s my condo worth?
              </Link>
            </div>
            <p className="text-xs text-gray-500 mt-6">Medians: Nevada Real Estate Group, MLS closings for the 12 months to September 30, 2026.</p>
          </div>
        </section>

        <RealScoutListings campaign="home" />

        <section className="py-16 px-4 bg-gray-950">
          <div className="max-w-5xl mx-auto">
            <p className="text-yellow-500 text-xs font-semibold uppercase tracking-[0.2em] mb-2">The towers</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-3">Which Strip tower fits your budget?</h2>
            <p className="text-gray-400 mb-10 max-w-3xl">
              Start with the median and the building type. Condo-hotels trade lowest and are hardest to finance;
              CityCenter towers carry the highest price per foot.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {buildings.map((b) => (
                <Link
                  key={b.slug}
                  href={`/buildings/${b.slug}`}
                  className="group border border-gray-800 rounded-xl p-5 hover:border-yellow-500 hover:bg-gray-900 transition"
                >
                  <h3 className="font-serif text-lg text-white group-hover:text-yellow-400 mb-1 transition">{b.name}</h3>
                  <p className="text-gray-500 text-xs mb-2">{b.kind} · {b.location}</p>
                  <p className="text-yellow-400 font-semibold text-sm">{b.priceRange}</p>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <CalendlyButton url={calendlyUrl('tour', 'towers', 'home')} className="inline-block border border-yellow-500 text-yellow-400 font-semibold px-6 py-3 rounded-full hover:bg-gray-900 transition">
                Tour two towers side by side
              </CalendlyButton>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-900 border-t border-gray-800">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-yellow-500 text-xs font-semibold uppercase tracking-[0.2em] mb-2">Buying</p>
              <h2 className="font-serif text-3xl text-white mb-4">What to check before an offer on a high-rise</h2>
              <p className="text-gray-300 mb-4">
                In a tower you buy into an association as much as a unit. Dr. Jan reads the budget, reserves, rental
                rules and any hotel-program agreement with you before you commit.
              </p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>Dues and what they cover, compared per square foot</li>
                <li>Reserve study and any special assessments</li>
                <li>Lease minimums and short-term rental limits</li>
                <li>Whether a lender will finance the building</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/buying-a-las-vegas-strip-high-rise-condo" className="text-yellow-400 underline">Read the buyer guide</Link>
                <CalendlyButton url={calendlyUrl('buyer', 'buying', 'home')} className="text-yellow-400 underline">Book a buyer call</CalendlyButton>
              </div>
            </div>
            <div>
              <p className="text-yellow-500 text-xs font-semibold uppercase tracking-[0.2em] mb-2">Selling</p>
              <h2 className="font-serif text-3xl text-white mb-4">Pricing a unit against its own building</h2>
              <p className="text-gray-300 mb-4">
                A single tower is its own market. Dr. Jan prices your unit against recent closings in the same
                building, stack and floor, not a corridor average, and shows you the active competition.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/sell-your-las-vegas-strip-high-rise-condo" className="text-yellow-400 underline">How selling works</Link>
                <CalendlyButton url={calendlyUrl('seller', 'selling', 'home')} className="text-yellow-400 underline">Book a listing consultation</CalendlyButton>
              </div>
            </div>
          </div>
        </section>

        <AreaFacts campaign="home" />

        <QABlock items={QA_ITEMS} campaign="home" />

        <MeetDrJan campaign="home" />
      </main>
    </>
  )
}
