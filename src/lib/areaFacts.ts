/**
 * Site standard v1: sourced, dated facts for the Las Vegas Strip high-rise corridor.
 * Every figure was retrieved on 2026-11-20 from the source named beside it. Re-check before reuse.
 */
export const FACTS_RETRIEVED = 'November 20, 2026'

export type AreaFact = { id: string; label: string; text: string; source: string; url: string; asOf: string }

const NREG_LUXURY = 'https://www.nevadarealestategroup.com/blog/luxury-condos-las-vegas-2026-buyers-guide'
const NREG_MARKET = 'https://www.nevadarealestategroup.com/blog/las-vegas-high-rise-condo-market-2026-record-pace'
const NREG_TOP10 = 'https://www.nevadarealestategroup.com/blog/top-10-high-rises-vegas-strip/'

export const AREA_FACTS: AreaFact[] = [
  {
    id: 'tower-median',
    label: 'Tower sales, last 12 months',
    text: 'Across 19 Las Vegas tower plats, 475 condos closed at a $480,000 median in the 12 months ending September 18, 2026, down from 496 sales a year earlier.',
    source: 'Nevada Real Estate Group, high-rise market report (MLS records)',
    url: NREG_MARKET,
    asOf: 'published September 19, 2026',
  },
  {
    id: 'million-plus',
    label: '$1 million and up',
    text: 'Tower sales of $1 million or more reached 88 in the same 12 months, against 77 and 76 in the two windows before.',
    source: 'Nevada Real Estate Group, high-rise market report',
    url: NREG_MARKET,
    asOf: 'published September 19, 2026',
  },
  {
    id: 'valley-condo',
    label: 'Valley condo benchmark',
    text: "Las Vegas REALTORS' September 2026 report put the valley-wide condo and townhome median at $290,000, as covered by FOX5.",
    source: 'Nevada Real Estate Group, Panorama Towers guide',
    url: 'https://www.nevadarealestategroup.com/blog/panorama-towers-las-vegas-high-rise-condo-buyers-guide-2026',
    asOf: 'updated November 1, 2026',
  },
  {
    id: 'waldorf',
    label: 'Waldorf Astoria Residences',
    text: '225 residences on the upper floors of a 47-story CityCenter tower (2009). 16 closings at a $2,906,000 median, $1,421 per square foot, median dues $3,261 a month.',
    source: 'Nevada Real Estate Group, luxury condo guide (12 months to September 30, 2026)',
    url: NREG_LUXURY,
    asOf: 'updated November 1, 2026',
  },
  {
    id: 'veer',
    label: 'Veer Towers',
    text: 'Two 37-story towers with 670 homes inside CityCenter (2010). 45 closings at a $550,000 median and $673 per square foot; median dues $1,080.',
    source: 'Nevada Real Estate Group, luxury condo guide (12 months to September 30, 2026)',
    url: NREG_LUXURY,
    asOf: 'updated November 1, 2026',
  },
  {
    id: 'turnberry',
    label: 'Turnberry Place',
    text: 'Four 38-story towers with about 720 homes on Paradise Road (2001 to 2006). 48 closings at a $744,800 median and $377 per square foot; median dues $1,388.',
    source: 'Nevada Real Estate Group, luxury condo guide (12 months to September 30, 2026)',
    url: NREG_LUXURY,
    asOf: 'updated November 1, 2026',
  },
  {
    id: 'panorama-martin',
    label: 'Dean Martin Drive towers',
    text: 'Panorama Towers (two towers, about 634 homes) closed 32 at a $552,500 median; The Martin (about 372 homes) closed 17 at $520,000. Both sit west of I-15.',
    source: 'Nevada Real Estate Group, luxury condo guide (12 months to September 30, 2026)',
    url: NREG_LUXURY,
    asOf: 'updated November 1, 2026',
  },
  {
    id: 'condo-hotels',
    label: 'Condo-hotels',
    text: 'Trump International (64 stories, 1,282 units) closed 30 at a $300,425 median; Palms Place (47 stories, 599 units) closed 44 at $207,000. Median dues: $661 and $827.',
    source: 'Nevada Real Estate Group, Las Vegas condo-hotels page (12 months to September 30, 2026)',
    url: 'https://www.nevadarealestategroup.com/las-vegas-condo-hotels',
    asOf: 'read November 20, 2026',
  },
  {
    id: 'financing',
    label: 'Financing a condo-hotel',
    text: "Fannie Mae's Selling Guide lists projects operated as hotels or offering daily rentals as ineligible, so condo-hotel buyers often need cash or a portfolio lender.",
    source: 'Nevada Real Estate Group, top 10 high-rises guide',
    url: NREG_TOP10,
    asOf: 'read November 20, 2026',
  },
  {
    id: 'short-term',
    label: 'Short-term rentals',
    text: 'Clark County says operating a short-term rental without a license in unincorporated Clark County is unlawful, and its application period closed on August 21, 2023.',
    source: 'Nevada Real Estate Group, top 10 high-rises guide',
    url: NREG_TOP10,
    asOf: 'read November 20, 2026',
  },
  {
    id: 'strip',
    label: 'The Strip itself',
    text: 'The Strip runs about 4.2 miles of Las Vegas Boulevard, from Sahara Avenue south to Russell Road; the Monorail covers 3.9 miles on its east side from Tropicana to Sahara.',
    source: 'Wikipedia, Las Vegas Strip',
    url: 'https://en.wikipedia.org/wiki/Las_Vegas_Strip',
    asOf: 'read November 20, 2026',
  },
]

/** Las Vegas Strip coordinates from Wikipedia (read 2026-11-20). */
export const STRIP_GEO = { latitude: 36.12, longitude: -115.1725 }
