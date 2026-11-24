// Datos estructurados (JSON-LD) para Google.
import { SITE, PLAN } from '../data/site.mjs';

const ORG_ID = `${SITE.url}/#org`;
const SITE_ID = `${SITE.url}/#website`;
const abs = (path) => (path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`);

export function baseGraph({ path, title, description }) {
  return [
    {
      '@type': 'ProfessionalService',
      '@id': ORG_ID,
      name: SITE.name,
      url: `${SITE.url}/`,
      logo: `${SITE.url}/logo.png`,
      image: `${SITE.url}/og.png`,
      description: 'Agentes y soluciones de inteligencia artificial para empresas.',
      email: SITE.email,
      telephone: SITE.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.locality,
        addressRegion: SITE.region,
        addressCountry: SITE.country,
      },
      areaServed: 'Worldwide',
      sameAs: [SITE.linkedin],
    },
    {
      '@type': 'WebSite',
      '@id': SITE_ID,
      url: `${SITE.url}/`,
      name: SITE.name,
      inLanguage: 'es-CL',
      publisher: { '@id': ORG_ID },
    },
    {
      '@type': 'WebPage',
      '@id': `${abs(path)}#webpage`,
      url: abs(path),
      name: title,
      description,
      inLanguage: 'es-CL',
      isPartOf: { '@id': SITE_ID },
      about: { '@id': ORG_ID },
    },
  ];
}

export const breadcrumb = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
});

export const faqPage = (list) => ({
  '@type': 'FAQPage',
  mainEntity: list.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

export const agentOffer = () => ({
  '@type': 'Offer',
  name: PLAN.name,
  description: `${PLAN.conversations} conversaciones al mes en WhatsApp, web, Instagram y Facebook. Implementación sin costo, sin permanencia.`,
  price: String(PLAN.amount),
  priceCurrency: PLAN.currency,
  priceSpecification: {
    '@type': 'UnitPriceSpecification',
    price: PLAN.amount,
    priceCurrency: PLAN.currency,
    unitCode: 'MON',
    valueAddedTaxIncluded: false,
  },
  url: abs('/precios'),
  seller: { '@id': ORG_ID },
});

export const service = ({ name, description, path, offer }) => ({
  '@type': 'Service',
  name,
  description,
  url: abs(path),
  serviceType: name,
  provider: { '@id': ORG_ID },
  areaServed: 'Worldwide',
  ...(offer ? { offers: agentOffer() } : {}),
});
