export const locales = ['fa', 'en'] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = 'fa';

/** A string in both languages. */
export type L = { fa: string; en: string };

export const t = (v: L | string, lang: Lang): string => (typeof v === 'string' ? v : v[lang]);

export const dir = (lang: Lang) => (lang === 'fa' ? 'rtl' : 'ltr');

/** Page keys and their path (without language prefix). */
export const routes = {
  home: '/',
  about: '/about/',
  specialties: '/specialties/',
  projects: '/projects/',
  estimate: '/estimate/',
  contact: '/contact/',
  credits: '/credits/',
} as const;
export type RouteKey = keyof typeof routes;

/** Persian lives at the root, English under /en. */
export function href(lang: Lang, key: RouteKey, hash = ''): string {
  const p = routes[key];
  const prefix = lang === 'fa' ? '' : '/en';
  return `${prefix}${p === '/' && prefix ? '/' : p}${hash}`.replace('//', '/');
}

const nf = { fa: new Intl.NumberFormat('fa-IR'), en: new Intl.NumberFormat('en-US') };
export const num = (n: number, lang: Lang) => nf[lang].format(n);

/** Money in Toman, written the way people say it: "2.4 billion Toman", "۸۵۰ میلیون تومان". */
export function money(value: number, lang: Lang): string {
  const fmt = (n: number, digits: number) =>
    new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US', { maximumFractionDigits: digits }).format(n);
  if (value >= 1e9) {
    const v = value / 1e9;
    return lang === 'fa' ? `${fmt(v, v < 10 ? 2 : 1)} میلیارد تومان` : `${fmt(v, v < 10 ? 2 : 1)} billion Toman`;
  }
  const v = value / 1e6;
  return lang === 'fa' ? `${fmt(v, 0)} میلیون تومان` : `${fmt(v, 0)} million Toman`;
}

/** A range written once with a shared unit when it can be: "760 – 970 million Toman". */
export function moneyRange(low: number, high: number, lang: Lang): string {
  const sameScale = (low >= 1e9) === (high >= 1e9);
  if (!sameScale) return `${money(low, lang)} – ${money(high, lang)}`;
  const full = money(high, lang);
  const unit = full.replace(/^[\d۰-۹٫.,٬]+\s*/, '');
  const lowNum = money(low, lang).replace(unit, '').trim();
  const highNum = full.replace(unit, '').trim();
  return `${lowNum} – ${highNum} ${unit}`;
}
