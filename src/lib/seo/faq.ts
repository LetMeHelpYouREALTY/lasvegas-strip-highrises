export type FaqItem = {
  question: string
  answer: string
}

/** General Strip high-rise buyer FAQs — no invented fees, prices, or building-specific claims. */
export const stripHighRiseFaqs: FaqItem[] = [
  {
    question: 'What counts as a Las Vegas Strip high-rise condo?',
    answer:
      'These are condominium units in multi-story towers on or near the Las Vegas Strip corridor, often with shared amenities, on-site management, and HOA governance. Floor plans, views, and ownership rules differ widely from tower to tower.',
  },
  {
    question: 'How is buying a Strip high-rise different from a single-family home?',
    answer:
      'You are buying into a homeowners association, not just the interior of a unit. Contracts and disclosures typically cover HOA documents, reserve studies, rental restrictions, and sometimes hotel or rental programs. A specialist can help you compare buildings before you tour.',
  },
  {
    question: 'Can I use a Strip high-rise as a short-term or vacation rental?',
    answer:
      'Rental rules are set by each building’s HOA and recorded documents, and they can change. Always review the current CC&Rs, house rules, and any hotel or rental program agreements with your agent and a real estate attorney before you rely on rental income.',
  },
  {
    question: 'What should I review before making an offer?',
    answer:
      'Beyond price and condition, buyers typically review HOA budgets and reserves, pending or past special assessments, transfer fees, parking and storage assignments, and any rental or hotel-program obligations. Your agent can request the right disclosures for the building you are considering.',
  },
  {
    question: 'How do I see what is for sale in Strip high-rise buildings?',
    answer:
      'Active inventory changes daily on the MLS. Contact Dr. Jan Duffy at 702-299-6607 or use the contact form on this site to name the buildings you care about; she can pull current listings and context for those towers.',
  },
]

export function faqPageJsonLd(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
