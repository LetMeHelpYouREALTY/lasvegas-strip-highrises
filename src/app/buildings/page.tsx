import type { Metadata } from 'next'
import Link from 'next/link'
import { buildings } from '@/lib/buildings'
import { breadcrumbListJsonLd } from '@/lib/seo/breadcrumbs'
import { JsonLd } from '@/lib/seo/json-ld'
import { RealScoutListings } from '@/components/RealScoutListings'

export const metadata: Metadata = {
  title: 'All Las Vegas Strip High-Rise Buildings | Condos For Sale',
  description: 'Compare 8 Las Vegas high-rise condo towers: Turnberry Place, Palms Place, Panorama, The Martin, Waldorf Astoria, Veer, Trump and One Las Vegas. Medians, units and building type.',
  alternates: { canonical: 'https://lasvegasstriphighrises.com/buildings' },
}

const breadcrumbs = breadcrumbListJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Buildings', path: '/buildings' },
])

export default function BuildingsPage() {
  return (
    <>
      <JsonLd data={breadcrumbs} />
    <main className="bg-gray-950 min-h-screen">
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl text-white mb-2">Las Vegas Strip high-rise buildings with condos for sale</h1>
          <p className="text-gray-400 mb-10">Eight towers compared by median sale price, size and building type. Medians are MLS closings for the 12 months to September 30, 2026.</p>
        </div>
      </section>
      <RealScoutListings campaign="buildings" />
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-4">
            {buildings.map((b) => (
              <Link key={b.slug} href={`/buildings/${b.slug}`}
                className="group flex flex-col md:flex-row gap-6 border border-gray-800 rounded-xl p-6 hover:border-yellow-500 hover:bg-gray-900 transition"
              >
                <div className="flex-1">
                  <p className="text-yellow-500 text-xs font-semibold uppercase mb-1">{b.location}</p>
                  <h2 className="text-2xl font-bold text-white group-hover:text-yellow-400 mb-1">{b.name}</h2>
                  <p className="text-gray-400 text-sm mb-2">{b.tagline}</p>
                  <p className="text-gray-500 text-sm">{b.kind} · {b.stories} stories · Built {b.yearBuilt} · {b.units} units</p>
                </div>
                <div className="md:text-right space-y-1 md:min-w-[150px]">
                  <p className="text-lg font-bold text-yellow-400">{b.priceRange}</p>
                  <p className="text-yellow-500 text-sm font-semibold">View Building →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
    </>
  )
}
