import Link from 'next/link'
import AmenityMap from '@/components/maps/AmenityMap'
import { COMMUNITY } from '@/lib/community'
import type { AmenityCategoryId } from '@/lib/amenities'

type NearbyAmenitiesSectionProps = {
  title?: string
  subtitle?: string
  defaultCategory?: AmenityCategoryId
  compact?: boolean
}

export default function NearbyAmenitiesSection({
  title = `Life Near the ${COMMUNITY.shortName}`,
  subtitle = `Walkable Strip dining, entertainment, shopping, and services around the ${COMMUNITY.regionLabel}.`,
  defaultCategory = 'restaurants',
  compact = true,
}: NearbyAmenitiesSectionProps) {
  return (
    <section className="py-16 px-4 bg-gray-900" aria-labelledby="nearby-amenities-heading">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 id="nearby-amenities-heading" className="text-3xl font-bold text-white mb-2">
              {title}
            </h2>
            <p className="text-gray-400 max-w-2xl">{subtitle}</p>
          </div>
          <Link
            href="/amenities"
            className="shrink-0 text-yellow-400 font-semibold text-sm hover:underline"
          >
            Full amenities guide →
          </Link>
        </div>
        <AmenityMap defaultCategory={defaultCategory} compact={compact} />
      </div>
    </section>
  )
}
