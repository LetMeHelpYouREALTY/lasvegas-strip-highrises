import type { Metadata } from 'next'
import Link from 'next/link'
import { buildings } from '@/lib/buildings'

export const metadata: Metadata = {
  title: 'All Las Vegas Strip High-Rise Buildings | Condos For Sale',
  description: 'Compare all 8 Las Vegas Strip high-rise condo buildings — Turnberry Place, Palms Place, Panorama, Waldorf Astoria, Veer, Trump & more. Prices, stories, amenities.',
  alternates: { canonical: 'https://lasvegasstriphighrises.com/buildings' },
}

export default function BuildingsPage() {
  return (
    <main className="bg-gray-950 min-h-screen">
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Strip High-Rise Buildings</h1>
          <p className="text-gray-400 mb-10">8 buildings, every price point, honest comparisons.</p>
          <div className="space-y-4">
            {buildings.map((b) => (
              <Link key={b.slug} href={`/buildings/${b.slug}`}
                className="group flex flex-col md:flex-row gap-6 border border-gray-800 rounded-xl p-6 hover:border-yellow-500 hover:bg-gray-900 transition"
              >
                <div className="flex-1">
                  <p className="text-yellow-500 text-xs font-semibold uppercase mb-1">{b.location}</p>
                  <h2 className="text-2xl font-bold text-white group-hover:text-yellow-400 mb-1">{b.name}</h2>
                  <p className="text-gray-400 text-sm mb-2">{b.tagline}</p>
                  <p className="text-gray-500 text-sm">{b.stories} stories · Built {b.yearBuilt} · {b.units} units</p>
                </div>
                <div className="md:text-right space-y-1 md:min-w-[150px]">
                  <p className="text-2xl font-bold text-yellow-400">{b.priceRange}</p>
                  <p className="text-yellow-500 text-sm font-semibold">View Building →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
