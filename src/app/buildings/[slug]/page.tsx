import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { buildings, getBuilding } from '@/lib/buildings'
import { breadcrumbListJsonLd } from '@/lib/seo/breadcrumbs'
import { JsonLd } from '@/lib/seo/json-ld'
import { CalendlyButton } from '@/components/Calendly'
import { RealScoutListings } from '@/components/RealScoutListings'
import { calendlyUrl } from '@/lib/calendly'
import { MeetDrJan } from '@/components/Standard'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return buildings.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const b = getBuilding(slug)
  if (!b) return {}
  return {
    title: `${b.name} Condos For Sale | Las Vegas Strip High-Rise`,
    description: `${b.name} condos for sale in Las Vegas: ${b.priceRange}, ${b.units} units, ${b.kind.toLowerCase()}. Dr. Jan Duffy · 702-299-6607.`,
    alternates: { canonical: `https://lasvegasstriphighrises.com/buildings/${slug}` },
  }
}

export default async function BuildingPage({ params }: Props) {
  const { slug } = await params
  const b = getBuilding(slug)
  if (!b) notFound()

  const breadcrumbs = breadcrumbListJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Buildings', path: '/buildings' },
    { name: b.name, path: `/buildings/${slug}` },
  ])

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <main className="bg-gray-950 min-h-screen">
        <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-950">
          <div className="max-w-5xl mx-auto">
            <p className="text-yellow-500 text-xs font-semibold uppercase tracking-[0.2em] mb-3">{b.location}</p>
            <h1 className="font-serif text-4xl md:text-5xl text-white mb-3">{b.name} condos for sale</h1>
            <p className="text-gray-300 text-xl mb-2">{b.tagline}</p>
            <p className="text-2xl font-semibold text-yellow-400">{b.priceRange}</p>
            <p className="text-xs text-gray-500 mt-2">MLS closings, 12 months to September 30, 2026, unless noted below.</p>
          </div>
        </section>

        <RealScoutListings campaign={`buildings/${b.slug}`} />

        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 prose">
              <h2>About {b.name}</h2>
              <p>{b.description}</p>
              <h2>Quick facts</h2>
              <ul>
                <li><strong>Type:</strong> {b.kind}</li>
                <li><strong>Address:</strong> {b.address}</li>
                <li><strong>Stories:</strong> {b.stories}</li>
                <li><strong>Units:</strong> {b.units}</li>
                <li><strong>Built:</strong> {b.yearBuilt}</li>
                {b.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <p className="text-sm">
                Source: <a href={b.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">{b.source}</a>, {b.asOf}.
                Retrieved November 20, 2026. Confirm dues and rules in the building&apos;s resale package.
              </p>
            </div>
            <aside>
              <div className="bg-black border border-yellow-900/40 rounded-xl p-6 sticky top-24">
                <h3 className="font-serif text-yellow-400 text-xl mb-3">Thinking about {b.name}?</h3>
                <p className="text-gray-400 text-sm mb-5">
                  Dr. Jan pulls the building&apos;s current listings and recent closings and goes over the dues and
                  rental rules with you before you tour.
                </p>
                <CalendlyButton url={calendlyUrl('tour', 'sidebar', `buildings/${b.slug}`)} className="block w-full bg-yellow-500 text-gray-950 font-bold text-center py-3 rounded-full hover:bg-yellow-400 transition mb-3">
                  Schedule a showing
                </CalendlyButton>
                <CalendlyButton url={calendlyUrl('seller', 'sidebar', `buildings/${b.slug}`)} className="block w-full border border-yellow-500 text-yellow-400 font-semibold text-center py-3 rounded-full hover:bg-gray-900 transition mb-3">
                  Selling here? Book a valuation
                </CalendlyButton>
                <a href="tel:7022996607" className="block w-full border border-yellow-500 text-yellow-400 font-semibold text-center py-3 rounded-full hover:bg-gray-900 transition">
                  Call 702-299-6607
                </a>
              </div>
            </aside>
          </div>
        </section>

        <MeetDrJan campaign={`buildings/${b.slug}`} />

        <section className="border-t border-gray-800 py-8 px-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link href="/buildings" className="text-yellow-500 hover:underline font-medium">← All Buildings</Link>
            <a href="/contact" className="bg-yellow-500 text-gray-950 font-bold px-6 py-2 rounded-lg hover:bg-yellow-400 transition text-sm">
              Get Expert Guidance
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
