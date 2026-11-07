import type { ReactNode } from 'react';
import { type Lang, type RouteKey } from '@/lib/i18n';
import { businessJsonLd } from '@/lib/seo';
import { Bar } from './Bar';
import { Footer } from './Footer';
import { Motion } from './Motion';
import { JsonLd } from './JsonLd';

const skip = { fa: 'رفتن به محتوای اصلی', en: 'Skip to content' };

export function Shell({ lang, route, hideBarAtTop = false, children, jsonLd = [] }: { lang: Lang; route: RouteKey; hideBarAtTop?: boolean; children: ReactNode; jsonLd?: object[] }) {
  return (
    <>
      <a className="skip" href="#main">{skip[lang]}</a>
      <Bar lang={lang} route={route} hideAtTop={hideBarAtTop} />
      <main id="main" tabIndex={-1}>{children}</main>
      <Footer lang={lang} />
      <Motion />
      <JsonLd data={[businessJsonLd(lang), ...jsonLd]} />
    </>
  );
}
