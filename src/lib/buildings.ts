export interface Building {
  slug: string
  name: string
  tagline: string
  priceRange: string
  description: string
  features: string[]
  location: string
  units: string
  yearBuilt: string
  stories: string
  zip: string
}

export const buildings: Building[] = [
  {
    slug: 'turnberry-place',
    name: 'Turnberry Place',
    tagline: 'Premier luxury high-rise on the north Strip',
    priceRange: '$500K – $3M+',
    description: `Turnberry Place is Las Vegas' most established luxury high-rise address, comprising four 38-story towers on Paradise Road just east of the north Strip. With residences ranging from 1,200 to over 5,000 square feet, Turnberry Place offers resort-level amenities including concierge, valet, pool complex, fitness center, and spa. The towers attract a mix of full-time residents and second-home buyers seeking a maintenance-free Strip-adjacent lifestyle. Floor plans include one- to four-bedroom units and penthouse configurations with panoramic Strip and mountain views.`,
    features: ['4 towers, 38 stories each', 'Concierge & valet', 'Resort pool complex', 'Fitness center & spa', 'In-unit washer/dryer', 'Gated & secured', 'Strip & mountain views'],
    location: 'Paradise Rd, north Strip corridor',
    units: '1,580 total across 4 towers',
    yearBuilt: '1999–2009',
    stories: '38 per tower',
    zip: '89169',
  },
  {
    slug: 'palms-place',
    name: 'Palms Place',
    tagline: 'Hotel-condo lifestyle minutes from the Strip',
    priceRange: '$250K – $1.2M',
    description: `Palms Place is a 47-story hotel-condo tower at the Palms Casino Resort, offering buyers a blend of personal use and optional rental income through the hotel rental program. Units range from studios to two-bedroom suites with high-end finishes, and amenities include a rooftop pool, fitness center, and full hotel services. The off-Strip location on Flamingo Rd provides easy freeway access without the traffic of Las Vegas Blvd, while the casino, dining, and entertainment of the Palms are steps away.`,
    features: ['47 stories', 'Hotel rental program option', 'Rooftop pool & sky villas', 'Hotel concierge services', 'Studio to 2-bedroom', 'Off-Strip privacy', 'Investment income potential'],
    location: 'Flamingo Rd, west of Strip',
    units: '599',
    yearBuilt: '2008',
    stories: '47',
    zip: '89103',
  },
  {
    slug: 'panorama-towers',
    name: 'Panorama Towers',
    tagline: 'True residential high-rise with Strip views',
    priceRange: '$350K – $1.8M',
    description: `Panorama Towers is a pair of 42-story residential towers located directly west of the Strip on Harmon Ave, offering genuine full-time residential living with sweeping Strip, mountain, and valley views. Unlike hotel-condos, Panorama is designed purely for living — no transient rentals, no casino traffic — with a refined lobby, concierge, two pools, fitness center, and a peaceful environment that feels removed from the Strip while being two blocks from it. Units range from one-bedroom to large three-bedroom floor plans.`,
    features: ['42-story pure residential', 'No transient hotel rentals', 'Two towers, two pools', 'Concierge & valet', 'Floor-to-ceiling windows', 'Direct Strip views', 'Dog-friendly'],
    location: 'Harmon Ave, directly west of Strip',
    units: '843 across 2 towers',
    yearBuilt: '2006–2007',
    stories: '42',
    zip: '89103',
  },
  {
    slug: 'one-las-vegas',
    name: 'One Las Vegas',
    tagline: 'South Strip twin towers with resort amenities',
    priceRange: '$300K – $1.1M',
    description: `One Las Vegas consists of two 20-story residential towers at the south end of the Strip near Mandalay Bay, offering full-time residential condos with a resort feel. Amenities include a resort-style pool, fitness center, and spa. Units are spacious by Strip standards, with floor-to-ceiling windows and Strip or mountain views. The south Strip location is quieter than the mid-Strip corridor, with easy access to the 15 freeway and the airport, making it popular with snowbirds and second-home buyers.`,
    features: ['Twin 20-story towers', 'Resort pool & spa', 'Fitness center', 'Spacious floor plans', 'South Strip location', 'Airport proximity', 'Mountain & Strip views'],
    location: 'Las Vegas Blvd South near Mandalay Bay',
    units: '400+',
    yearBuilt: '2007',
    stories: '20 per tower',
    zip: '89119',
  },
  {
    slug: 'waldorf-astoria-residences',
    name: 'Waldorf Astoria Residences',
    tagline: 'Ultra-luxury branded residences at CityCenter',
    priceRange: '$700K – $5M+',
    description: `The Waldorf Astoria Residences (formerly Mandarin Oriental Las Vegas) at CityCenter offers the most prestigious branded residential address on the Las Vegas Strip. Units occupy the upper floors of the 47-story tower, with the hotel below providing five-star services including room service, housekeeping, and access to the rooftop pool and spa. This is the choice for buyers who demand the highest standard of finishes, service, and exclusivity — and are willing to pay a significant premium for the Waldorf Astoria name and CityCenter address.`,
    features: ['47-story branded tower', 'Hotel-level services', 'Five-star concierge', 'CityCenter location', 'Upper-floor residences only', 'Rooftop pool & spa', 'Ultra-luxury finishes'],
    location: 'CityCenter, mid-Strip (Las Vegas Blvd)',
    units: '227 residences',
    yearBuilt: '2009',
    stories: '47 (residences on upper floors)',
    zip: '89158',
  },
  {
    slug: 'the-martin',
    name: 'The Martin',
    tagline: 'Boutique luxury steps from T-Mobile Arena',
    priceRange: '$350K – $1.5M',
    description: `The Martin is a 22-story luxury residential tower in the heart of the Strip corridor, positioned steps from T-Mobile Arena, Park MGM, and Allegiant Stadium. Unlike the larger hotel-condo towers, The Martin is a true residential building with a quieter, boutique feel, a resort pool, fitness center, and concierge. Its location is ideal for buyers who want walkable Strip access without the mass-market hotel environment. Units range from studios to two-bedroom floor plans with clean contemporary finishes.`,
    features: ['22-story boutique tower', 'Steps from T-Mobile Arena', 'Resort pool & fitness', 'Concierge', 'Walk to Allegiant Stadium', 'Contemporary finishes', 'True residential — no hotel'],
    location: 'Harmon Ave, steps from T-Mobile Arena',
    units: '344',
    yearBuilt: '2014',
    stories: '22',
    zip: '89103',
  },
  {
    slug: 'veer-towers',
    name: 'Veer Towers',
    tagline: 'Iconic tilted towers at the heart of CityCenter',
    priceRange: '$400K – $2M+',
    description: `Veer Towers are CityCenter's distinctive twin residential skyscrapers, each tilted 5 degrees in opposite directions, making them among the most visually recognizable buildings in Las Vegas. Designed by Helmut Jahn, the towers offer 335 total residences with floor-to-ceiling glass, designer finishes, and direct access to CityCenter's dining, retail (Crystals), and hotel options. The location is as central as it gets on the Strip, and the architecture commands a premium. A strong choice for design-conscious luxury buyers.`,
    features: ['Twin 37-story towers (tilted 5°)', 'Helmut Jahn architecture', 'Floor-to-ceiling glass', 'CityCenter access (Crystals)', 'Designer finishes', 'Concierge & valet', 'Trophy property'],
    location: 'CityCenter (between Bellagio & Aria)',
    units: '335 (168 + 167)',
    yearBuilt: '2010',
    stories: '37 per tower',
    zip: '89158',
  },
  {
    slug: 'trump-international',
    name: 'Trump International',
    tagline: 'Gold-glass icon on the north Strip',
    priceRange: '$300K – $2M+',
    description: `Trump International Hotel & Tower Las Vegas is a 64-story gold-glass tower on the north Strip, offering hotel-condo residences that can participate in the hotel rental program or be held exclusively for personal use. Amenities include a pool, spa, fitness center, and full hotel services. The tower's distinctive gold exterior is a north Strip landmark, and the upper floors command sweeping views of the Strip, mountains, and valley. Residences range from studios to three-bedroom suites with high-end finishes throughout.`,
    features: ['64-story gold-glass tower', 'Hotel rental program available', 'Pool, spa & fitness', 'Full hotel services', 'North Strip landmark', 'Studio to 3-bedroom', 'Panoramic valley views'],
    location: 'Fashion Show Dr, north Strip',
    units: '1,282',
    yearBuilt: '2008',
    stories: '64',
    zip: '89109',
  },
]

export function getBuilding(slug: string): Building | undefined {
  return buildings.find((b) => b.slug === slug)
}
