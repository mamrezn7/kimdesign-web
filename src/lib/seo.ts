import type { Metadata } from 'next';
import { site } from '@/content/site';
import { href, type Lang, type RouteKey, t, type L } from './i18n';

export const abs = (path: string) => `${site.url}${path}`;

/** Metadata for one page in one language, with canonical, hreflang and social cards. */
export function pageMeta(key: RouteKey, lang: Lang, title: L, description: L, image = '/og/kimdesign.jpg'): Metadata {
  const name = t(site.name, lang);
  const fullTitle = key === 'home' ? `${name} | ${t(title, lang)}` : `${t(title, lang)} | ${name}`;
  const url = abs(href(lang, key));
  return {
    metadataBase: new URL(site.url),
    title: { absolute: fullTitle },
    description: t(description, lang),
    alternates: {
      canonical: url,
      languages: { fa: abs(href('fa', key)), en: abs(href('en', key)), 'x-default': abs(href('fa', key)) },
    },
    openGraph: {
      type: 'website',
      url,
      siteName: name,
      title: fullTitle,
      description: t(description, lang),
      locale: lang === 'fa' ? 'fa_IR' : 'en_US',
      alternateLocale: lang === 'fa' ? ['en_US'] : ['fa_IR'],
      images: [{ url: image, width: 1200, height: 630, alt: t(title, lang) }],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description: t(description, lang), images: [image] },
    robots: { index: true, follow: true, 'max-image-preview': 'large' } as Metadata['robots'],
  };
}

/** The business, as schema.org structured data (GeneralContractor). */
export function businessJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${site.url}/#business`,
    name: t(site.name, lang),
    alternateName: t(site.name, lang === 'fa' ? 'en' : 'fa'),
    description: t(site.tagline, lang),
    url: abs(href(lang, 'home')),
    logo: abs('/icon.svg'),
    image: abs('/og/kimdesign.jpg'),
    telephone: site.phone,
    email: site.email,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: t(site.address.street, lang),
      addressLocality: t(site.address.city, lang),
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    openingHours: site.openingHours,
    areaServed: t(site.areaServed, lang),
    sameAs: Object.values(site.social),
    knowsLanguage: ['fa', 'en'],
  };
}

export function breadcrumbJsonLd(lang: Lang, items: { name: string; key: RouteKey }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(href(lang, it.key)) })),
  };
}
