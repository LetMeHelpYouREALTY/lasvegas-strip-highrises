/**
 * Geographic anchor for Las Vegas Strip high-rise condos covered on this site.
 * CityCenter (3730 S Las Vegas Blvd) sits mid-corridor between Panorama Towers,
 * Veer, Waldorf Astoria, Turnberry Place, and other featured buildings.
 * Coordinates: Wikipedia / Wikidata for CityCenter, Paradise, NV.
 */
export const COMMUNITY = {
  name: 'Las Vegas Strip High-Rises',
  shortName: 'Strip High-Rises',
  city: 'Las Vegas',
  state: 'NV',
  regionLabel: 'Las Vegas Strip high-rise corridor',
  center: {
    lat: 36.107725,
    lng: -115.17574,
  },
  /** Reference address for maps and schema (CityCenter main entrance). */
  referenceAddress: {
    street: '3730 S Las Vegas Blvd',
    locality: 'Las Vegas',
    region: 'NV',
    postalCode: '89109',
    country: 'US',
  },
  searchRadiusMeters: 2500,
} as const

export const SITE_PHONE = '702-299-6607'
export const SITE_PHONE_TEL = 'tel:7022996607'
