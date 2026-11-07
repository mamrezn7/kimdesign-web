import type { Metadata } from 'next';
import { Shell } from '@/components/Shell';
import { Home } from '@/views/Home';
import { About } from '@/views/About';
import { Specialties } from '@/views/Specialties';
import { Projects } from '@/views/Projects';
import { Estimate } from '@/views/Estimate';
import { Contact } from '@/views/Contact';
import { Credits } from '@/views/Credits';
import { specialties } from '@/content/specialties';
import { projects } from '@/content/projects';
import { faq } from '@/content/faq';
import { site } from '@/content/site';
import { fromRate } from './pricing';
import { abs, breadcrumbJsonLd, pageMeta } from './seo';
import { href, t, type L, type Lang, type RouteKey } from './i18n';

const pages: Record<RouteKey, { title: L; description: L; View: (p: { lang: Lang }) => React.ReactNode }> = {
  home: {
    title: { fa: 'معماری و بازسازی در تهران', en: 'Architecture and renovation in Tehran' },
    description: {
      fa: 'کیم دیزاین: طراحی معماری، بازسازی کامل، آشپزخانه، حمام، نجاری و توسعهٔ ساختمان در تهران و کرج. برآورد آنلاین هزینه و بازدید رایگان.',
      en: 'kimdesign designs and builds in Tehran and Karaj: architecture, full renovations, kitchens, bathrooms, joinery and extensions. Online cost estimate and a free site visit.',
    },
    View: Home,
  },
  about: {
    title: { fa: 'دربارهٔ ما', en: 'About the studio' },
    description: {
      fa: 'معماران و سازندگانی که یک پروژه را از برداشت تا تحویل پیش می‌برند. با اصول کار، روند اجرا و ریشه‌های ما در معماری ایرانی آشنا شوید.',
      en: 'Architects and builders who take a project from survey to handover. Our principles, how a project runs, and our roots in Persian architecture.',
    },
    View: About,
  },
  specialties: {
    title: { fa: 'تخصص‌ها و خدمات', en: 'Specialties and services' },
    description: {
      fa: 'طراحی معماری، بازسازی کامل، آشپزخانه، حمام، نجاری و پله، توسعه و مقاوم‌سازی سازه؛ با شرح کار، مدت معمول و قیمت پایه.',
      en: 'Architectural design, full renovation, kitchens, bathrooms, joinery and stairs, extensions and structural work, with scope, typical timings and starting prices.',
    },
    View: Specialties,
  },
  projects: {
    title: { fa: 'پروژه‌ها', en: 'Projects' },
    description: {
      fa: 'نمونه‌کارهای کیم دیزاین: آشپزخانه، حمام، پله‌های چوبی و بازسازی کامل خانه، با متراژ، مدت اجرا و شرح کار.',
      en: 'kimdesign projects: kitchens, bathrooms, timber stairs and whole-home renovations, with area, time on site and what was done.',
    },
    View: Projects,
  },
  estimate: {
    title: { fa: 'برآورد هزینهٔ بازسازی', en: 'Renovation cost estimate' },
    description: {
      fa: 'هزینهٔ بازسازی، آشپزخانه، حمام یا طراحی را آنلاین برآورد کنید و برای بازدید و پیش‌فاکتور دقیق درخواست بفرستید.',
      en: 'Estimate the cost of a renovation, kitchen, bathroom or design online, then ask for a visit and a written quote.',
    },
    View: Estimate,
  },
  contact: {
    title: { fa: 'تماس با ما', en: 'Contact' },
    description: {
      fa: 'نشانی، تلفن، ایمیل و ساعت کاری کیم دیزاین در تهران، و فرم تماس برای پروژهٔ تازه یا بازدید محل.',
      en: 'kimdesign studio address, phone, email and hours in Tehran, and a form to ask about a new project or a site visit.',
    },
    View: Contact,
  },
  credits: {
    title: { fa: 'منابع تصاویر', en: 'Picture credits' },
    description: { fa: 'فهرست عکس‌ها و نقشه‌های این وب‌سایت با نام سازنده، مجوز و منبع.', en: 'The photographs and drawings used on this site, with creator, licence and source.' },
    View: Credits,
  },
};

export const metaFor = (key: RouteKey, lang: Lang): Metadata => {
  const m = pageMeta(key, lang, pages[key].title, pages[key].description);
  return key === 'credits' ? { ...m, robots: { index: false, follow: true } } : m;
};

function extraJsonLd(key: RouteKey, lang: Lang): object[] {
  const home = { name: t(site.name, lang), key: 'home' as RouteKey };
  const crumbs = key === 'home' ? [] : [breadcrumbJsonLd(lang, [home, { name: t(pages[key].title, lang), key }])];
  switch (key) {
    case 'home':
      return [{ '@context': 'https://schema.org', '@type': 'WebSite', name: t(site.name, lang), url: abs(href(lang, 'home')), inLanguage: lang, publisher: { '@id': `${site.url}/#business` } }];
    case 'specialties':
      return [...crumbs, {
        '@context': 'https://schema.org', '@type': 'ItemList', name: t(pages.specialties.title, lang),
        itemListElement: specialties.map((s, i) => ({
          '@type': 'ListItem', position: i + 1,
          item: {
            '@type': 'Service', name: t(s.title, lang), description: t(s.short, lang), url: abs(href(lang, 'specialties', `#${s.id}`)),
            provider: { '@id': `${site.url}/#business` }, areaServed: t(site.areaServed, lang),
            offers: { '@type': 'Offer', priceCurrency: 'IRR', priceSpecification: { '@type': 'UnitPriceSpecification', price: fromRate(s.id) * 10, priceCurrency: 'IRR', unitCode: 'MTK' } },
          },
        })),
      }];
    case 'projects':
      return [...crumbs, {
        '@context': 'https://schema.org', '@type': 'ItemList', name: t(pages.projects.title, lang),
        itemListElement: projects.map((p, i) => ({
          '@type': 'ListItem', position: i + 1,
          item: { '@type': 'CreativeWork', name: t(p.title, lang), description: t(p.summary, lang), url: abs(href(lang, 'projects', `#${p.id}`)), image: p.media.map((m) => abs(`/img/${m.img}-960.webp`)), dateCreated: String(p.year), creator: { '@id': `${site.url}/#business` } },
        })),
      }];
    case 'estimate':
      return [...crumbs, {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({ '@type': 'Question', name: t(f.q, lang), acceptedAnswer: { '@type': 'Answer', text: t(f.a, lang) } })),
      }];
    default:
      return crumbs;
  }
}

export function renderPage(key: RouteKey, lang: Lang) {
  const { View } = pages[key];
  return (
    <Shell lang={lang} route={key} hideBarAtTop={key === 'home'} jsonLd={extraJsonLd(key, lang)}>
      <View lang={lang} />
    </Shell>
  );
}
