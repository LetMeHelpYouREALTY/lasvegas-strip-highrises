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
import { loadGoogleMaps, mapsAuthFailed } from '@/lib/google-maps-loader'
import { searchCategory } from '@/lib/places-search'

type MapPlace = {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  mapsUri?: string
}

type AmenityMapProps = {
  defaultCategory?: AmenityCategoryId
  /** Shorter chip row on preview sections */
  compact?: boolean
  className?: string
}

const MAP_HEIGHT_CLASS = 'min-h-[22rem] h-[28rem] md:h-[32rem]'

function displayNameText(
  displayName: google.maps.places.Place['displayName'],
): string {
  if (displayName == null) return 'Place'
  if (typeof displayName === 'string') return displayName
  const named = displayName as { text?: string }
  return named.text ?? 'Place'
}

function placeToMapPlace(place: google.maps.places.Place, id: string): MapPlace | null {
  if (!place.location) return null
  const { lat, lng } = place.location.toJSON()
  return {
    id,
    name: displayNameText(place.displayName),
    address: place.formattedAddress ?? '',
    lat,
    lng,
    mapsUri: place.googleMapsURI ?? undefined,
  }
}

function buildPlaceInfoElement(place: MapPlace): HTMLElement {
  const wrap = document.createElement('div')
  wrap.className = 'p-1 max-w-[240px]'

  const title = document.createElement('p')
  title.className = 'font-semibold text-gray-900'
  title.textContent = place.name
  wrap.appendChild(title)

  if (place.address) {
    const addr = document.createElement('p')
    addr.className = 'text-sm text-gray-600 mt-1'
    addr.textContent = place.address
    wrap.appendChild(addr)
  }

  const dir = document.createElement('a')
  dir.className = 'text-sm text-blue-700 underline mt-2 inline-block'
  dir.target = '_blank'
  dir.rel = 'noopener noreferrer'
  dir.textContent = 'Directions'
  dir.href = place.mapsUri ?? placeDirectionsUrl(place.name, place.address)
  wrap.appendChild(dir)

  return wrap
}

function buildCommunityInfoElement(): HTMLElement {
  const wrap = document.createElement('div')
  wrap.className = 'p-1 max-w-[240px]'

  const title = document.createElement('p')
  title.className = 'font-semibold text-gray-900'
  title.textContent = COMMUNITY.name
  wrap.appendChild(title)

  const addr = document.createElement('p')
  addr.className = 'text-sm text-gray-600 mt-1'
  addr.textContent = `${COMMUNITY.referenceAddress.street}, ${COMMUNITY.referenceAddress.locality}, ${COMMUNITY.referenceAddress.region}`
  wrap.appendChild(addr)

  const dir = document.createElement('a')
  dir.className = 'text-sm text-blue-700 underline mt-2 inline-block'
  dir.target = '_blank'
  dir.rel = 'noopener noreferrer'
  dir.textContent = 'Directions'
  dir.href = directionsUrl(COMMUNITY.center.lat, COMMUNITY.center.lng)
  wrap.appendChild(dir)

  return wrap
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
  const [useFallback, setUseFallback] = useState(!apiKey || mapsAuthFailed)
  const [loading, setLoading] = useState(false)

  const visibleCategories = compact
    ? AMENITY_CATEGORY_ORDER.slice(0, 6)
    : AMENITY_CATEGORY_ORDER

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((m) => m.setMap(null))
    markersRef.current = []
    communityMarkerRef.current?.setMap(null)
    communityMarkerRef.current = null
    infoRef.current?.close()
  }, [])

  const enterFallback = useCallback(() => {
    clearMarkers()
    mapRef.current = null
    setUseFallback(true)
  }, [clearMarkers])

  useEffect(() => {
    const onAuthFailure = () => enterFallback()
    window.addEventListener('gmaps:auth-failure', onAuthFailure)
    return () => window.removeEventListener('gmaps:auth-failure', onAuthFailure)
  }, [enterFallback])

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

  const showCommunityMarker = useCallback((map: google.maps.Map) => {
    const marker = new google.maps.Marker({
      map,
      position: COMMUNITY.center,
      title: COMMUNITY.name,
      label: { text: '★', color: '#1a1a1a' },
    })
    marker.addListener('click', () => {
      if (!infoRef.current) infoRef.current = new google.maps.InfoWindow()
      infoRef.current.setContent(buildCommunityInfoElement())
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
          infoRef.current.setContent(buildPlaceInfoElement(place))
          infoRef.current.open({ map, anchor: marker })
        })
        markersRef.current.push(marker)
        bounds.extend({ lat: place.lat, lng: place.lng })
      })

      if (items.length > 0) {
        map.fitBounds(bounds)
      } else {
        map.setCenter(COMMUNITY.center)
        map.setZoom(14)
      }
    },
    [clearMarkers, showCommunityMarker],
  )

  const fetchNearby = useCallback(
    async (map: google.maps.Map, category: AmenityCategoryId) => {
      setLoading(true)
      try {
        const results = await searchCategory(
          COMMUNITY.center,
          category,
          COMMUNITY.searchRadiusMeters,
        )
        const mapped = results
          .map((p, i) => placeToMapPlace(p, `${category}-${i}`))
          .filter((p): p is MapPlace => p !== null)

        renderMarkers(map, mapped)
      } catch {
        renderMarkers(map, [])
      } finally {
        setLoading(false)
      }
    },
    [renderMarkers],
  )

  useEffect(() => {
    if (!inView || useFallback || !apiKey || mapsAuthFailed) return

    const mapsApiKey = apiKey
    let cancelled = false

    loadGoogleMaps(mapsApiKey)
      .then(async () => {
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
      })
      .catch(() => {
        if (!cancelled) enterFallback()
      })

    return () => {
      cancelled = true
    }
  }, [inView, apiKey, mapId, activeCategory, fetchNearby, useFallback, enterFallback])

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
          Featured places near {COMMUNITY.shortName}
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
      </div>
    </div>
  )
}
