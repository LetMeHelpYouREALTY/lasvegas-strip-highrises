'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import {
  AMENITY_CATEGORIES,
  AMENITY_CATEGORY_ORDER,
  type AmenityCategoryId,
  curatedPlacesForCategory,
  directionsUrl,
  embedMapUrl,
  placeDirectionsUrl,
} from '@/lib/amenities'
import { COMMUNITY } from '@/lib/community'

type MapPlace = {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  rating?: number
  mapsUri?: string
}

type AmenityMapProps = {
  defaultCategory?: AmenityCategoryId
  /** Shorter chip row on preview sections */
  compact?: boolean
  className?: string
}

const MAP_HEIGHT_CLASS = 'min-h-[22rem] h-[28rem] md:h-[32rem]'

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'))
  if (window.google?.maps) return Promise.resolve()

  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-amenity-map]')
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('Maps script failed')))
      return
    }

    const script = document.createElement('script')
    script.dataset.amenityMap = 'true'
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&loading=async`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Maps script failed'))
    document.head.appendChild(script)
  })
}

function buildInfoContent(place: MapPlace): string {
  const rating =
    place.rating != null
      ? `<p class="text-sm text-gray-600 mt-1">Rating: ${place.rating.toFixed(1)}</p>`
      : ''
  const dir = place.mapsUri
    ? place.mapsUri
    : placeDirectionsUrl(place.name, place.address)
  return `<div class="p-1 max-w-[240px]">
    <p class="font-semibold text-gray-900">${place.name}</p>
    ${rating}
    <p class="text-sm text-gray-600 mt-1">${place.address}</p>
    <a href="${dir}" target="_blank" rel="noopener noreferrer" class="text-sm text-blue-700 underline mt-2 inline-block">Directions</a>
  </div>`
}

function communityInfoContent(): string {
  return `<div class="p-1 max-w-[240px]">
    <p class="font-semibold text-gray-900">${COMMUNITY.name}</p>
    <p class="text-sm text-gray-600 mt-1">${COMMUNITY.referenceAddress.street}, ${COMMUNITY.referenceAddress.locality}, ${COMMUNITY.referenceAddress.region}</p>
    <a href="${directionsUrl(COMMUNITY.center.lat, COMMUNITY.center.lng)}" target="_blank" rel="noopener noreferrer" class="text-sm text-blue-700 underline mt-2 inline-block">Directions</a>
  </div>`
}

export default function AmenityMap({
  defaultCategory = 'restaurants',
  compact = false,
  className = '',
}: AmenityMapProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const communityMarkerRef = useRef<google.maps.Marker | null>(null)
  const infoRef = useRef<google.maps.InfoWindow | null>(null)

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID
  const listId = useId()

  const [inView, setInView] = useState(false)
  const [activeCategory, setActiveCategory] = useState<AmenityCategoryId>(defaultCategory)
  const [apiFailed, setApiFailed] = useState(false)
  const useFallback = !apiKey || apiFailed
  const [loading, setLoading] = useState(false)

  const visibleCategories = compact
    ? AMENITY_CATEGORY_ORDER.slice(0, 6)
    : AMENITY_CATEGORY_ORDER

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setInView(true)
      },
      { rootMargin: '120px', threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((m) => m.setMap(null))
    markersRef.current = []
    communityMarkerRef.current?.setMap(null)
    communityMarkerRef.current = null
    infoRef.current?.close()
  }, [])

  const showCommunityMarker = useCallback((map: google.maps.Map) => {
    const marker = new google.maps.Marker({
      map,
      position: COMMUNITY.center,
      title: COMMUNITY.name,
      label: { text: '★', color: '#1a1a1a' },
    })
    marker.addListener('click', () => {
      if (!infoRef.current) infoRef.current = new google.maps.InfoWindow()
      infoRef.current.setContent(communityInfoContent())
      infoRef.current.open({ map, anchor: marker })
    })
    communityMarkerRef.current = marker
  }, [])

  const renderMarkers = useCallback(
    (map: google.maps.Map, items: MapPlace[]) => {
      clearMarkers()
      showCommunityMarker(map)
      if (!infoRef.current) infoRef.current = new google.maps.InfoWindow()

      const bounds = new google.maps.LatLngBounds()
      bounds.extend(COMMUNITY.center)

      items.forEach((place, index) => {
        const marker = new google.maps.Marker({
          map,
          position: { lat: place.lat, lng: place.lng },
          title: place.name,
          label: String(index + 1),
        })
        marker.addListener('click', () => {
          if (!infoRef.current) infoRef.current = new google.maps.InfoWindow()
          infoRef.current.setContent(buildInfoContent(place))
          infoRef.current.open({ map, anchor: marker })
        })
        markersRef.current.push(marker)
        bounds.extend({ lat: place.lat, lng: place.lng })
      })

      if (items.length > 0) {
        map.fitBounds(bounds)
      } else {
        map.setCenter(COMMUNITY.center)
      }
    },
    [clearMarkers, showCommunityMarker],
  )

  const fetchNearby = useCallback(
    async (map: google.maps.Map, category: AmenityCategoryId) => {
      setLoading(true)
      try {
        await loadGoogleMapsScript(apiKey!)
        await google.maps.importLibrary('places')
        const { Place } = google.maps.places
        const config = AMENITY_CATEGORIES[category]
        const { places: results } = await Place.searchNearby({
          fields: ['displayName', 'location', 'formattedAddress', 'rating', 'googleMapsURI'],
          locationRestriction: {
            center: COMMUNITY.center,
            radius: COMMUNITY.searchRadiusMeters,
          },
          includedPrimaryTypes: config.includedPrimaryTypes,
          maxResultCount: 15,
          rankPreference: google.maps.places.RankPreference.POPULARITY,
        })

        const mapped: MapPlace[] = results
          .filter((p) => p.location && p.displayName)
          .map((p, i) => {
            const displayName =
              typeof p.displayName === 'string' ? p.displayName : p.displayName?.text ?? 'Place'
            return {
            id: `${category}-${i}`,
            name: displayName,
            address: p.formattedAddress ?? '',
            lat: p.location!.lat,
            lng: p.location!.lng,
            rating: p.rating,
            mapsUri: p.googleMapsURI,
          }})


        if (mapped.length === 0) throw new Error('No results')
        renderMarkers(map, mapped)
      } catch {
        renderMarkers(map, [])
      } finally {
        setLoading(false)
      }
    },
    [apiKey, renderMarkers],
  )

  useEffect(() => {
    if (!inView || !apiKey) return

    const mapsApiKey = apiKey
    let cancelled = false

    async function init() {
      try {
        await loadGoogleMapsScript(mapsApiKey)
        if (cancelled || !mapContainerRef.current) return
        await google.maps.importLibrary('maps')

        if (!mapRef.current) {
          mapRef.current = new google.maps.Map(mapContainerRef.current, {
            center: COMMUNITY.center,
            zoom: 14,
            mapId: mapId || undefined,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: true,
          })
        }

        await fetchNearby(mapRef.current, activeCategory)
      } catch {
        if (!cancelled) setApiFailed(true)
      }
    }

    init()
    return () => {
      cancelled = true
    }
  }, [inView, apiKey, mapId, activeCategory, fetchNearby])

  const fallbackList = curatedPlacesForCategory(activeCategory)

  return (
    <div ref={rootRef} className={className}>
      <div
        role="tablist"
        aria-label="Amenity categories"
        className="flex flex-wrap gap-2 mb-4"
      >
        {visibleCategories.map((id) => {
          const cat = AMENITY_CATEGORIES[id]
          const selected = activeCategory === id
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`${listId}-tab-${id}`}
              aria-selected={selected}
              aria-controls={`${listId}-panel`}
              aria-label={cat.ariaLabel}
              onClick={() => setActiveCategory(id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition border ${
                selected
                  ? 'bg-yellow-500 text-gray-950 border-yellow-500'
                  : 'bg-gray-900 text-gray-300 border-gray-700 hover:border-yellow-600 hover:text-yellow-400'
              }`}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      <div
        id={`${listId}-panel`}
        role="tabpanel"
        aria-labelledby={`${listId}-tab-${activeCategory}`}
        className={`relative w-full rounded-xl overflow-hidden border border-gray-800 bg-gray-900 ${MAP_HEIGHT_CLASS}`}
      >
        {useFallback ? (
          <iframe
            title={`Map of ${COMMUNITY.name} area`}
            src={embedMapUrl()}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div
            ref={mapContainerRef}
            className="w-full h-full"
            aria-label={`Interactive map of ${AMENITY_CATEGORIES[activeCategory].label} near ${COMMUNITY.name}`}
          />
        )}
        {loading && !useFallback && (
          <p className="absolute bottom-3 left-3 text-xs text-gray-400 bg-gray-950/80 px-2 py-1 rounded">
            Loading places…
          </p>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wide mb-2">
          {useFallback ? 'Featured nearby places' : 'Also nearby'}
          {' · '}
          {AMENITY_CATEGORIES[activeCategory].label}
        </h3>
        <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-300">
          {fallbackList.map((p) => (
            <li key={p.name + p.address} className="border border-gray-800 rounded-lg p-3 bg-gray-900/50">
              <p className="font-medium text-white">{p.name}</p>
              <p className="text-gray-500 text-xs mt-0.5">{p.address}</p>
              {p.note && <p className="text-gray-500 text-xs mt-1">{p.note}</p>}
              <a
                href={placeDirectionsUrl(p.name, p.address)}
                className="text-yellow-500 text-xs mt-2 inline-block hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Directions
              </a>
            </li>
          ))}
        </ul>
        {useFallback && (
          <p className="text-gray-500 text-xs mt-3">
            Map preview uses Google&apos;s embed. Set{' '}
            <code className="text-gray-400">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> in Vercel for the
            full interactive amenity search.
          </p>
        )}
      </div>
    </div>
  )
}
