import type { AmenityCategoryId } from '@/lib/amenities'
import { AMENITY_CATEGORIES } from '@/lib/amenities'
const cache = new Map<string, Promise<google.maps.places.Place[]>>()

export function searchCategory(
  center: google.maps.LatLngLiteral,
  categoryId: AmenityCategoryId,
  radiusMeters: number,
): Promise<google.maps.places.Place[]> {
  let p = cache.get(categoryId)
  if (!p) {
    p = (async () => {
      const { Place } = (await google.maps.importLibrary('places')) as google.maps.PlacesLibrary
      const config = AMENITY_CATEGORIES[categoryId]
      const { places } = await Place.searchNearby({
        fields: ['displayName', 'location', 'formattedAddress', 'googleMapsURI', 'id'],
        locationRestriction: { center, radius: radiusMeters },
        includedPrimaryTypes: config.includedPrimaryTypes,
        maxResultCount: 10,
        rankPreference: 'POPULARITY' as google.maps.places.SearchNearbyRankPreference,
      })
      return places
    })()
    p.catch(() => cache.delete(categoryId))
    cache.set(categoryId, p)
  }
  return p
}
