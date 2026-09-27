import { COMMUNITY } from '@/lib/community'

export type AmenityCategoryId =
  | 'restaurants'
  | 'entertainment'
  | 'parking'
  | 'grocery'
  | 'fitness'
  | 'cafes'
  | 'shopping'
  | 'healthcare'
  | 'pharmacies'
  | 'parks'
  | 'golf'
  | 'schools'

export type CuratedPlace = {
  name: string
  address: string
  category: AmenityCategoryId
  schemaType: string
  sourceUrl: string
  note?: string
}

/** High-rise / Strip corridor: dining and walkable Strip access first. */
export const AMENITY_CATEGORY_ORDER: AmenityCategoryId[] = [
  'restaurants',
  'entertainment',
  'parking',
  'grocery',
  'fitness',
  'cafes',
  'shopping',
  'healthcare',
  'pharmacies',
  'parks',
  'golf',
  'schools',
]

export const AMENITY_CATEGORIES: Record<
  AmenityCategoryId,
  { label: string; ariaLabel: string; includedPrimaryTypes: string[] }
> = {
  restaurants: {
    label: 'Restaurants',
    ariaLabel: 'Show nearby restaurants',
    includedPrimaryTypes: ['restaurant'],
  },
  entertainment: {
    label: 'Entertainment',
    ariaLabel: 'Show nearby entertainment and attractions',
    includedPrimaryTypes: ['tourist_attraction', 'performing_arts_theater', 'movie_theater'],
  },
  parking: {
    label: 'Parking',
    ariaLabel: 'Show nearby parking',
    includedPrimaryTypes: ['parking'],
  },
  grocery: {
    label: 'Grocery',
    ariaLabel: 'Show nearby grocery stores',
    includedPrimaryTypes: ['grocery_store', 'supermarket'],
  },
  fitness: {
    label: 'Fitness',
    ariaLabel: 'Show nearby gyms and fitness centers',
    includedPrimaryTypes: ['gym', 'fitness_center'],
  },
  cafes: {
    label: 'Cafes',
    ariaLabel: 'Show nearby cafes',
    includedPrimaryTypes: ['cafe', 'coffee_shop'],
  },
  shopping: {
    label: 'Shopping',
    ariaLabel: 'Show nearby shopping',
    includedPrimaryTypes: ['shopping_mall', 'department_store'],
  },
  healthcare: {
    label: 'Healthcare',
    ariaLabel: 'Show nearby hospitals and medical offices',
    includedPrimaryTypes: ['hospital', 'doctor'],
  },
  pharmacies: {
    label: 'Pharmacies',
    ariaLabel: 'Show nearby pharmacies',
    includedPrimaryTypes: ['pharmacy', 'drugstore'],
  },
  parks: {
    label: 'Parks',
    ariaLabel: 'Show nearby parks and open space',
    includedPrimaryTypes: ['park'],
  },
  golf: {
    label: 'Golf',
    ariaLabel: 'Show nearby golf courses',
    includedPrimaryTypes: ['golf_course'],
  },
  schools: {
    label: 'Schools',
    ariaLabel: 'Show nearby schools',
    includedPrimaryTypes: ['school', 'university'],
  },
}

/**
 * Verified places for fallback UI, on-page copy, and ItemList schema.
 * Names and street addresses match each sourceUrl (official listing).
 */
export const CURATED_PLACES: CuratedPlace[] = [
  {
    name: "Gordon Ramsay Hell's Kitchen",
    address: '3570 S Las Vegas Blvd, Las Vegas, NV 89109',
    category: 'restaurants',
    schemaType: 'Restaurant',
    sourceUrl: 'https://www.caesars.com/caesars-palace/restaurants/hells-kitchen',
  },
  {
    name: 'Bacchanal Buffet',
    address: '3570 S Las Vegas Blvd, Las Vegas, NV 89109',
    category: 'restaurants',
    schemaType: 'Restaurant',
    sourceUrl: 'https://www.caesars.com/caesars-palace/restaurants/bacchanal-buffet',
  },
  {
    name: 'Mon Ami Gabi',
    address: '3655 S Las Vegas Blvd, Las Vegas, NV 89109',
    category: 'restaurants',
    schemaType: 'Restaurant',
    sourceUrl: 'https://www.monamigabi.com/las-vegas/',
  },
  {
    name: 'The Park Las Vegas',
    address: '3782 S Las Vegas Blvd, Las Vegas, NV 89109',
    category: 'entertainment',
    schemaType: 'TouristAttraction',
    note: 'Outdoor dining and event space between Park MGM and T-Mobile Arena.',
    sourceUrl: 'https://www.theparkvegas.com/',
  },
  {
    name: 'The Sphere',
    address: '255 Sands Ave, Las Vegas, NV 89169',
    category: 'entertainment',
    schemaType: 'TouristAttraction',
    sourceUrl: 'https://www.thesphere.com/',
  },
  {
    name: 'Crystals at CityCenter',
    address: '3720 S Las Vegas Blvd, Las Vegas, NV 89109',
    category: 'shopping',
    schemaType: 'ShoppingCenter',
    sourceUrl: 'https://www.crystalsatcitycenter.com/',
  },
  {
    name: 'Fashion Show Mall',
    address: '3200 S Las Vegas Blvd, Las Vegas, NV 89109',
    category: 'shopping',
    schemaType: 'ShoppingCenter',
    sourceUrl: 'https://www.fashionshowlasvegas.com/',
  },
  {
    name: 'Whole Foods Market',
    address: '6689 S Las Vegas Blvd, Las Vegas, NV 89119',
    category: 'grocery',
    schemaType: 'GroceryStore',
    note: 'Town Square Las Vegas, south of the core Strip towers.',
    sourceUrl: 'https://www.wholefoodsmarket.com/stores/lvb',
  },
  {
    name: 'Starbucks',
    address: '3730 S Las Vegas Blvd, Las Vegas, NV 89158',
    category: 'cafes',
    schemaType: 'CafeOrCoffeeShop',
    note: 'ARIA Resort second-level promenade (CityCenter campus).',
    sourceUrl: 'https://aria.mgmresorts.com/en/restaurants/starbucks.html',
  },
  {
    name: 'Sunrise Hospital & Medical Center',
    address: '3186 S Maryland Pkwy, Las Vegas, NV 89109',
    category: 'healthcare',
    schemaType: 'Hospital',
    sourceUrl: 'https://www.sunrisehospital.com/',
  },
  {
    name: 'Valley Hospital Medical Center',
    address: '620 Shadow Ln, Las Vegas, NV 89106',
    category: 'healthcare',
    schemaType: 'Hospital',
    sourceUrl: 'https://www.valleyhospital.net/',
  },
  {
    name: 'Walgreens',
    address: '3765 S Las Vegas Blvd, Las Vegas, NV 89109',
    category: 'pharmacies',
    schemaType: 'Pharmacy',
    sourceUrl: 'https://www.walgreens.com/locator/walgreens-3765-las-vegas-blvd-s-las-vegas-nv-89109/id=4763',
  },
  {
    name: 'Bellagio Conservatory & Botanical Gardens',
    address: '3600 S Las Vegas Blvd, Las Vegas, NV 89109',
    category: 'parks',
    schemaType: 'Park',
    note: 'Seasonal indoor botanical display on the Strip.',
    sourceUrl: 'https://bellagio.mgmresorts.com/en/amenities/conservatory-botanical-garden.html',
  },
  {
    name: 'Wynn Golf Club',
    address: '3131 S Las Vegas Blvd, Las Vegas, NV 89109',
    category: 'golf',
    schemaType: 'GolfCourse',
    sourceUrl: 'https://www.wynnlasvegas.com/experiences/golf',
  },
  {
    name: 'University of Nevada, Las Vegas (UNLV)',
    address: '4505 S Maryland Pkwy, Las Vegas, NV 89154',
    category: 'schools',
    schemaType: 'CollegeOrUniversity',
    sourceUrl: 'https://www.unlv.edu/',
  },
]

export function curatedPlacesForCategory(category: AmenityCategoryId): CuratedPlace[] {
  return CURATED_PLACES.filter((p) => p.category === category)
}

export function embedMapUrl(): string {
  const { lat, lng } = COMMUNITY.center
  return `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`
}

export function directionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
}

export function placeDirectionsUrl(placeName: string, address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${placeName}, ${address}`)}`
}
