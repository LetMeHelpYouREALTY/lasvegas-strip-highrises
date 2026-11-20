/**
 * Strip-corridor towers. Site standard v1: every figure below was retrieved 2026-11-20 from the
 * source on the same entry. Sales figures are MLS closings for the 12 months ending
 * September 30, 2026 unless the entry says otherwise. Re-check before reuse.
 */
export interface Building {
  slug: string
  name: string
  tagline: string
  /** Short market line, always with its sample size. */
  priceRange: string
  description: string
  features: string[]
  location: string
  address: string
  units: string
  yearBuilt: string
  stories: string
  kind: 'Residential' | 'Condo-hotel' | 'Residences above a hotel'
  source: string
  sourceUrl: string
  asOf: string
}

const NREG_LUXURY = 'https://www.nevadarealestategroup.com/blog/luxury-condos-las-vegas-2026-buyers-guide'
const NREG_HOTELS = 'https://www.nevadarealestategroup.com/las-vegas-condo-hotels'
const TOMES = 'https://tomesrealty.com/buildings'

export const buildings: Building[] = [
  {
    slug: 'turnberry-place',
    name: 'Turnberry Place',
    tagline: 'Four towers on Paradise Road, east of the Strip',
    priceRange: '$744,800 median · 48 closings',
    description:
      'Turnberry Place is four 38-story residential towers with about 720 homes on Paradise Road, east of the Strip near the Convention Center, built 2001 to 2006. Floor plans run large, so a $744,800 median works out to $377 a square foot. Median listing dues are $1,388 a month.',
    features: ['Four 38-story towers', 'About 720 homes', '$377 median per sq ft', 'Median dues $1,388 a month', 'Residential, not a condo-hotel'],
    location: 'Paradise Road, east of the Strip',
    address: '2777, 2827, 2857 and 2877 Paradise Rd',
    units: 'About 720',
    yearBuilt: '2001 to 2006',
    stories: '38 per tower',
    kind: 'Residential',
    source: 'Nevada Real Estate Group luxury condo guide; Tomes Realty building list (address)',
    sourceUrl: NREG_LUXURY,
    asOf: 'updated November 1, 2026',
  },
  {
    slug: 'palms-place',
    name: 'Palms Place',
    tagline: 'Condo-hotel tower next to the Palms on Flamingo Road',
    priceRange: '$207,000 median · 44 closings',
    description:
      'Palms Place is a 47-story condo-hotel with 599 units beside the Palms on West Flamingo Road, west of the Strip. It closed 44 units at a $207,000 median, and labeled dues ran a median $827 a month. Because the tower runs as a hotel, most buyers pay cash or use a portfolio lender.',
    features: ['47 stories', '599 units', 'Condo-hotel', 'Median dues $827 a month', 'Opened 2008'],
    location: 'West Flamingo Road, west of the Strip',
    address: '4381 W Flamingo Rd',
    units: '599',
    yearBuilt: '2008',
    stories: '47',
    kind: 'Condo-hotel',
    source: 'Nevada Real Estate Group condo-hotels page; Tomes Realty building list (address, year)',
    sourceUrl: NREG_HOTELS,
    asOf: 'read November 20, 2026',
  },
  {
    slug: 'panorama-towers',
    name: 'Panorama Towers',
    tagline: 'Two residential towers on Dean Martin Drive, west of I-15',
    priceRange: '$552,500 median · 32 closings',
    description:
      'Panorama Towers is two residential towers with about 634 homes on Dean Martin Drive, across I-15 from CityCenter, built 2006 to 2007. It closed 32 condos at a $552,500 median and $397 a square foot. Median listing dues are $1,517 a month, among the highest of the mid-priced towers.',
    features: ['Two towers', 'About 634 homes', '$397 median per sq ft', 'Median dues $1,517 a month', 'Residential, not a condo-hotel'],
    location: 'Dean Martin Drive, west of I-15',
    address: '4525 and 4575 Dean Martin Dr',
    units: 'About 634',
    yearBuilt: '2006 to 2007',
    stories: 'Two towers',
    kind: 'Residential',
    source: 'Nevada Real Estate Group luxury condo guide; Tomes Realty building list (address)',
    sourceUrl: NREG_LUXURY,
    asOf: 'updated November 1, 2026',
  },
  {
    slug: 'one-las-vegas',
    name: 'One Las Vegas',
    tagline: 'Two residential towers on South Las Vegas Boulevard',
    priceRange: 'Too few closings for a 12-month median',
    description:
      'One Las Vegas is two 20-story residential towers with 359 condos at 8255 S Las Vegas Blvd, ZIP 89123, well south of the resort corridor and close to the 215 Beltway and the airport. The towers were finished in 2008. It is a residential building, not a condo-hotel.',
    features: ['Two 20-story towers', '359 condos', 'Finished 2008', 'Residential, not a condo-hotel', 'Near the 215 Beltway'],
    location: 'South Las Vegas Boulevard, ZIP 89123',
    address: '8255 S Las Vegas Blvd',
    units: '359',
    yearBuilt: '2008',
    stories: '20 per tower',
    kind: 'Residential',
    source: 'VIP Homes and The Rivlin Group building pages; Tomes Realty (address, ZIP)',
    sourceUrl: 'https://www.viphomes.vegas/one-las-vegas',
    asOf: 'updated November 18, 2026',
  },
  {
    slug: 'waldorf-astoria-residences',
    name: 'Waldorf Astoria Residences',
    tagline: 'Private residences above a hotel at CityCenter',
    priceRange: '$2,906,000 median · 16 closings',
    description:
      'The Waldorf Astoria Residences are 225 private homes on the upper floors of a 47-story CityCenter tower that opened in 2009. Sixteen closed at a $2,906,000 median and $1,421 a square foot, the highest per-foot figure on the Strip. Median listing dues are $3,261 a month.',
    features: ['47-story tower', '225 residences', '$1,421 median per sq ft', 'Median dues $3,261 a month', 'Las Vegas Boulevard address'],
    location: 'CityCenter, Las Vegas Boulevard',
    address: 'CityCenter, Las Vegas Blvd S',
    units: '225',
    yearBuilt: '2009',
    stories: '47',
    kind: 'Residences above a hotel',
    source: 'Nevada Real Estate Group luxury condo guide',
    sourceUrl: NREG_LUXURY,
    asOf: 'updated November 1, 2026',
  },
  {
    slug: 'the-martin',
    name: 'The Martin',
    tagline: 'Residential tower next to Panorama on Dean Martin Drive',
    priceRange: '$520,000 median · 17 closings',
    description:
      'The Martin is a 45-story residential tower with about 372 homes on Dean Martin Drive, west of I-15, built in 2008. It closed 17 condos at a $520,000 median and $452 a square foot, and median listing dues are $934 a month, well below Panorama next door.',
    features: ['45 stories', 'About 372 homes', '$452 median per sq ft', 'Median dues $934 a month', 'Residential, not a condo-hotel'],
    location: 'Dean Martin Drive, west of I-15',
    address: '4471 Dean Martin Dr',
    units: 'About 372',
    yearBuilt: '2008',
    stories: '45',
    kind: 'Residential',
    source: 'Nevada Real Estate Group luxury condo guide; Tomes Realty building list (address)',
    sourceUrl: NREG_LUXURY,
    asOf: 'updated November 1, 2026',
  },
  {
    slug: 'veer-towers',
    name: 'Veer Towers',
    tagline: 'Two leaning residential towers inside CityCenter',
    priceRange: '$550,000 median · 45 closings',
    description:
      'Veer Towers is two 37-story residential towers with 670 homes inside CityCenter, completed in 2010. It closed 45 condos at a $550,000 median and $673 a square foot. Median listing dues are $1,080 a month. Veer is residential, not a condo-hotel, so confirm the lease rules before counting on rental income.',
    features: ['Two 37-story towers', '670 homes', '$673 median per sq ft', 'Median dues $1,080 a month', 'Las Vegas Boulevard address'],
    location: 'CityCenter, Las Vegas Boulevard',
    address: '3722 and 3726 S Las Vegas Blvd',
    units: '670',
    yearBuilt: '2010',
    stories: '37 per tower',
    kind: 'Residential',
    source: 'Nevada Real Estate Group luxury condo guide and Veer Towers guide; Tomes Realty (address)',
    sourceUrl: NREG_LUXURY,
    asOf: 'updated November 1, 2026',
  },
  {
    slug: 'trump-international',
    name: 'Trump International',
    tagline: 'Condo-hotel tower on Fashion Show Drive',
    priceRange: '$300,425 median · 30 closings',
    description:
      'Trump International is a 64-story condo-hotel with 1,282 units on Fashion Show Drive, opened in 2008, with no casino. It closed 30 units at a $300,425 median and $531 a square foot, and its $661 median dues are the lowest of the towers tracked. Plan on cash or a portfolio lender.',
    features: ['64 stories', '1,282 units', 'Condo-hotel', 'Median dues $661 a month', 'No casino'],
    location: 'Fashion Show Drive',
    address: '2000 Fashion Show Dr',
    units: '1,282',
    yearBuilt: '2008',
    stories: '64',
    kind: 'Condo-hotel',
    source: 'Nevada Real Estate Group luxury condo guide and condo-hotels page; Tomes Realty (address)',
    sourceUrl: NREG_LUXURY,
    asOf: 'updated November 1, 2026',
  },
]

export function getBuilding(slug: string): Building | undefined {
  return buildings.find((b) => b.slug === slug)
}
