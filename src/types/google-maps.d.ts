/* Minimal typings for Maps JavaScript API + Places (New) used by AmenityMap. */

declare namespace google.maps {
  class Map {
    constructor(el: HTMLElement, opts?: MapOptions)
    setCenter(latLng: LatLngLiteral | LatLng): void
    fitBounds(bounds: LatLngBounds): void
  }
  class LatLngBounds {
    constructor()
    extend(point: LatLngLiteral): void
  }
  class Marker {
    constructor(opts?: MarkerOptions)
    setMap(map: Map | null): void
    addListener(event: string, handler: () => void): void
  }
  class InfoWindow {
    constructor(opts?: { content?: string })
    setContent(content: string | Element): void
    open(opts: { map: Map; anchor?: Marker }): void
    close(): void
  }
  interface MapOptions {
    center?: LatLngLiteral
    zoom?: number
    mapId?: string
    disableDefaultUI?: boolean
    zoomControl?: boolean
    streetViewControl?: boolean
    mapTypeControl?: boolean
    fullscreenControl?: boolean
  }
  interface MarkerOptions {
    map?: Map
    position?: LatLngLiteral
    title?: string
    label?: string | { text: string; color?: string }
  }
  interface LatLngLiteral {
    lat: number
    lng: number
  }
  function importLibrary(name: 'maps' | 'places' | 'marker'): Promise<unknown>
  namespace places {
    enum RankPreference {
      POPULARITY = 'POPULARITY',
      DISTANCE = 'DISTANCE',
    }
    class Place {
      static searchNearby(request: {
        fields: string[]
        locationRestriction: { center: LatLngLiteral; radius: number }
        includedPrimaryTypes: string[]
        maxResultCount?: number
        rankPreference?: RankPreference
      }): Promise<{ places: PlaceInstance[] }>
    }
    interface PlaceInstance {
      displayName?: string | { text?: string }
      formattedAddress?: string
      location?: LatLngLiteral
      rating?: number
      googleMapsURI?: string
    }
  }
  namespace marker {
    class AdvancedMarkerElement {
      constructor(opts: {
        map?: Map
        position: LatLngLiteral
        title?: string
        content?: HTMLElement
      })
    }
  }
}

interface Window {
  google?: typeof google
  __amenityMapInit?: () => void
}
