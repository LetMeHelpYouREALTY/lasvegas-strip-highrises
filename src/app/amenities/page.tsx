import type { Metadata } from 'next'
import Link from 'next/link'
import AmenityMap from '@/components/maps/AmenityMap'
import { CURATED_PLACES } from '@/lib/amenities'
import { COMMUNITY, SITE_PHONE, SITE_PHONE_TEL } from '@/lib/community'

const CANONICAL = 'https://lasvegasstriphighrises.com/amenities'

export const metadata: Metadata = {
  title: 'Nearby Amenities | Las Vegas Strip High-Rise Condos',
  description:
    'Restaurants, entertainment, grocery, healthcare, and parking near Las Vegas Strip high-rise condos — CityCenter, Panorama Towers, Veer, Turnberry Place & more. Dr. Jan Duffy · 702-299-6607.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Nearby Amenities | Las Vegas Strip High-Rises',
    description:
      'Hyperlocal guide to dining, shopping, hospitals, and commute access for Strip high-rise condo buyers.',
    url: CANONICAL,
    type: 'website',
  },
}

const FAQ_ITEMS = [
  {
    question: 'What grocery stores are near Las Vegas Strip high-rises?',
    answer:
      'Residents often shop at Whole Foods Market at Town Square on Las Vegas Boulevard South, use pharmacy and convenience options along the Strip corridor, or schedule delivery from building concierge desks — most towers are a short drive from full grocery runs.',
  },
  {
    question: 'How far are Strip high-rise condos from the Las Vegas Strip?',
    answer:
      'Buildings such as Panorama Towers, Veer Towers, and Waldorf Astoria Residences sit on or directly beside Las Vegas Boulevard; north-Strip towers like Turnberry Place and Trump International are minutes from the resort corridor by car or rideshare.',
  },
  {
    question: 'Are there hospitals near the Las Vegas Strip high-rise corridor?',
    answer:
      'Yes — Sunrise Hospital & Medical Center on Maryland Parkway and Valley Hospital Medical Center on Shadow Lane are established acute-care hospitals serving the central Las Vegas valley, including Strip-area residents.',
  },
  {
    question: 'How far is Harry Reid International Airport from Strip high-rises?',
    answer:
      'Harry Reid International Airport is roughly 3–5 miles south of the mid-Strip corridor; drive time is often about 10–20 minutes depending on your building, route, and traffic (approximate).',
  },
  {
    question: 'Where do Strip high-rise residents park?',
    answer:
      'Most condo towers include deeded or assigned garage parking; visitors use building guest parking, hotel garages, or public garages along Las Vegas Boulevard and at major resorts — policies vary by building.',
  },
  {
    question: 'What dining is walkable from CityCenter and Harmon Avenue towers?',
    answer:
      'CityCenter, Crystals, Aria, Bellagio, Park MGM, and The Park Las Vegas put dozens of restaurants within a short walk, from casual Strip cafes to destination chefs along the mid-Strip.',
  },
  {
    question: 'Is there golf near Las Vegas Strip condos?',
    answer:
      'Wynn Golf Club sits on the north Strip corridor; additional public and resort courses are a short drive into the valley, while many households also use hotel and building fitness amenities daily.',
  },
  {
    question: 'Which CCSD schools are assigned to Strip high-rise addresses?',
    answer:
      'Clark County School District (CCSD) assignments depend on your exact building address and can change with boundary updates. Verify current zoning with the CCSD Zoning Search before you rely on a particular campus.',
  },
  {
    question: 'How far is Downtown Summerlin from the Strip high-rise market?',
    answer:
      'Downtown Summerlin is roughly 12–18 miles west of the central Strip depending on route; expect about 20–35 minutes by car in typical conditions (approximate).',
  },
]

function buildJsonLd() {
  const itemList = {
    '@type': 'ItemList',
    name: `Featured places near ${COMMUNITY.name}`,
    itemListElement: CURATED_PLACES.map((place, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': place.schemaType,
        name: place.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: place.address.split(',')[0]?.trim(),
          addressLocality: COMMUNITY.city,
          addressRegion: COMMUNITY.state,
          addressCountry: 'US',
        },
      },
    })),
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lasvegasstriphighrises.com' },
          { '@type': 'ListItem', position: 2, name: 'Nearby Amenities', item: CANONICAL },
        ],
      },
      {
        '@type': 'Place',
        name: COMMUNITY.name,
        description: COMMUNITY.regionLabel,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: COMMUNITY.center.lat,
          longitude: COMMUNITY.center.lng,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: COMMUNITY.referenceAddress.street,
          addressLocality: COMMUNITY.referenceAddress.locality,
          addressRegion: COMMUNITY.referenceAddress.region,
          postalCode: COMMUNITY.referenceAddress.postalCode,
          addressCountry: COMMUNITY.referenceAddress.country,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
      itemList,
      {
        '@type': 'RealEstateAgent',
        name: 'Dr. Jan Duffy',
        url: 'https://lasvegasstriphighrises.com',
        telephone: SITE_PHONE,
        description: 'Las Vegas Strip high-rise condo specialist.',
        areaServed: {
          '@type': 'Place',
          name: COMMUNITY.name,
          geo: {
            '@type': 'GeoCoordinates',
            latitude: COMMUNITY.center.lat,
            longitude: COMMUNITY.center.lng,
          },
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: '7475 W Sahara Ave, Suite 100',
          addressLocality: 'Las Vegas',
          addressRegion: 'NV',
          postalCode: '89117',
          addressCountry: 'US',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '08:00',
            closes: '20:00',
          },
        ],
      },
    ],
  }
}

export default function AmenitiesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }} />
      <main className="bg-gray-950 min-h-screen">
        <section className="py-16 px-4 bg-black border-b border-yellow-900/30">
          <div className="max-w-5xl mx-auto">
            <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-yellow-400">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-400">Nearby Amenities</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Nearby Amenities in {COMMUNITY.name}, {COMMUNITY.city}
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl">
              A buyer&apos;s guide to dining, entertainment, shopping, healthcare, and daily errands around the{' '}
              {COMMUNITY.regionLabel} — anchored at CityCenter ({COMMUNITY.referenceAddress.street}).
            </p>
          </div>
        </section>

        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-2">Interactive amenity map</h2>
            <p className="text-gray-400 mb-6 text-sm">
              Filter by category. Map centers on the mid-Strip high-rise corridor; individual buildings may sit
              slightly north or south along Las Vegas Boulevard.
            </p>
            <AmenityMap defaultCategory="restaurants" compact={false} />
          </div>
        </section>

        <section className="py-14 px-4 bg-gray-900 border-t border-gray-800">
          <div className="max-w-5xl mx-auto prose prose-invert">
            <h2 className="text-white">Dining &amp; nightlife</h2>
            <p className="text-gray-400">
              Strip high-rise living puts destination restaurants in walking distance. Along the mid-Strip,
              Gordon Ramsay Hell&apos;s Kitchen, Bacchanal Buffet, and Mon Ami Gabi are established destinations
              on or just off Las Vegas Boulevard. Residents at Harmon Avenue towers and CityCenter often walk to
              Aria, Bellagio, and Crystals for additional chef-driven options without crossing a freeway.
            </p>

            <h2 className="text-white">Entertainment &amp; attractions</h2>
            <p className="text-gray-400">
              The Park Las Vegas connects Park MGM and T-Mobile Arena with outdoor space and dining. The Sphere
              on Sands Avenue is a major performance venue north of the core corridor. From Veer Towers or Waldorf
              Astoria Residences, Crystals and the resort core are steps away.
            </p>

            <h2 className="text-white">Shopping</h2>
            <p className="text-gray-400">
              Crystals at CityCenter and Fashion Show Mall on Las Vegas Boulevard serve luxury and mainstream
              retail within minutes of most Strip towers. For broader errands, Town Square and regional centers
              extend choice south and west of the Strip.
            </p>

            <h2 className="text-white">Grocery &amp; daily needs</h2>
            <p className="text-gray-400">
              Walgreens on Las Vegas Boulevard supports pharmacy and convenience runs. Full grocery trips often
              mean Whole Foods at Town Square south on Las Vegas Boulevard — plan a short drive or delivery
              from your building, a common pattern for high-rise owners.
            </p>

            <h2 className="text-white">Healthcare</h2>
            <p className="text-gray-400">
              Sunrise Hospital &amp; Medical Center (Maryland Parkway) and Valley Hospital Medical Center (Shadow
              Lane) are long-standing hospitals for the central valley. Urgent care and specialist offices cluster
              along Maryland Parkway and throughout Paradise and Winchester.
            </p>

            <h2 className="text-white">Parks, golf &amp; recreation</h2>
            <p className="text-gray-400">
              The Bellagio Conservatory offers a seasonal botanical experience on the Strip. Wynn Golf Club
              provides a resort course on the north Strip. Building amenities — pools, spas, and fitness centers —
              are the day-to-day recreation hub for many high-rise owners.
            </p>

            <h2 className="text-white">Commute &amp; key destinations</h2>
            <p className="text-gray-400">
              <strong className="text-gray-300">Harry Reid International Airport:</strong> approximately 10–20
              minutes from the mid-Strip by car, depending on building and traffic (approximate).{' '}
              <strong className="text-gray-300">Downtown Summerlin:</strong> roughly 20–35 minutes west (approximate).{' '}
              <strong className="text-gray-300">Downtown Las Vegas (Fremont):</strong> often 15–25 minutes north
              (approximate). South-Strip towers such as One Las Vegas can be closer to the airport; north-Strip
              addresses such as Turnberry Place and Trump International are closer to Fashion Show and the Convention
              Center corridor.
            </p>

            <h2 className="text-white">Schools &amp; higher education</h2>
            <p className="text-gray-400">
              When education matters, UNLV on Maryland Parkway is the major university campus serving the valley.
              For K–12 assignments, use the CCSD Zoning Search with your building&apos;s street address — campuses
              sit in neighborhoods off the resort corridor and boundaries can change.
            </p>
          </div>
        </section>

        <section className="py-14 px-4 border-t border-gray-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently asked questions</h2>
            <dl className="space-y-6">
              {FAQ_ITEMS.map((item) => (
                <div key={item.question} className="border border-gray-800 rounded-xl p-5 bg-gray-900/40">
                  <dt className="font-semibold text-white mb-2">{item.question}</dt>
                  <dd className="text-gray-400 text-sm leading-relaxed">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="py-14 px-4 bg-black border-t border-yellow-900/30">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Local guidance for Strip high-rise buyers</h2>
            <p className="text-gray-400 mb-6">
              Dr. Jan Duffy has sold and consulted on Las Vegas Strip towers for 35+ years — HOA nuance, rental
              programs, view corridors, and which floor plans fit your lifestyle.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <a
                href={SITE_PHONE_TEL}
                className="bg-yellow-500 text-gray-950 font-bold px-7 py-3 rounded-lg hover:bg-yellow-400 transition"
              >
                Call {SITE_PHONE}
              </a>
              <Link
                href="/contact"
                className="border border-yellow-500 text-yellow-400 font-semibold px-7 py-3 rounded-lg hover:bg-gray-900 transition"
              >
                Request a building consult
              </Link>
            </div>
            <p className="text-gray-500 text-xs">
              Dr. Jan Duffy · NV License #S.0197614.LLC · Berkshire Hathaway HomeServices Nevada Properties
              <br />
              7475 W Sahara Ave, Suite 100 · Las Vegas, NV 89117 ·{' '}
              <a href="mailto:janet.duffy@bhhsnv.com" className="hover:text-yellow-400">janet.duffy@bhhsnv.com</a>
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
