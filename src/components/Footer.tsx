import Link from 'next/link';
import { site } from '@/content/site';
import { href, t, type Lang } from '@/lib/i18n';
import { Pic } from './Pic';
import { InstagramIcon, LinkedinIcon } from './icons';

const ui = {
  credits: { fa: 'منابع تصاویر', en: 'Picture credits' },
  contact: { fa: 'تماس', en: 'Contact' },
  estimate: { fa: 'برآورد هزینه', en: 'Estimate' },
  follow: { fa: 'ما را دنبال کنید', en: 'Follow us' },
  rights: { fa: 'همهٔ حقوق محفوظ است.', en: 'All rights reserved.' },
  creditLine: {
    fa: 'عکس‌ها با مجوز آزاد از ویکی‌مدیا کامنز، StockSnap و Openverse؛ فهرست کامل در صفحهٔ منابع تصاویر.',
    en: 'Photographs under open licences from Wikimedia Commons, StockSnap and Openverse; full list on the picture credits page.',
  },
};

export function Footer({ lang }: { lang: Lang }) {
  const year = 2026;
  return (
    <footer className="foot">
      <div className="band band--soft" aria-hidden="true" />
      <div style={{ position: 'relative' }}>
        <div className="foot__pic" aria-hidden="true"><Pic name="kashan-facade" alt="" sizes="100vw" /></div>
        <div className="foot__inner">
          <p className="foot__name">{t(site.name, lang)}</p>
          <address className="foot__info" style={{ fontStyle: 'normal' }}>
            <span className="label">{t(site.address.street, lang)} | {t(site.address.city, lang)}</span>
            <span>
              <a href={`tel:${site.phone}`} dir="ltr">{t(site.phoneDisplay, lang)}</a> | <a href={`mailto:${site.email}`}>{site.email}</a>
            </span>
            <span>{t(site.hours, lang)}</span>
          </address>
          <div className="foot__row">
            <ul className="foot__links">
              <li><Link href={href(lang, 'contact')}>{ui.contact[lang]}</Link></li>
              <li><Link href={href(lang, 'estimate')}>{ui.estimate[lang]}</Link></li>
              <li><Link href={href(lang, 'credits')}>{ui.credits[lang]}</Link></li>
            </ul>
            <p className="foot__credit">
              © {new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US', { useGrouping: false }).format(lang === 'fa' ? year - 621 : year)} {t(site.name, lang)}. {ui.rights[lang]} {ui.creditLine[lang]}
            </p>
            <div>
              <p className="label" style={{ marginBottom: 8 }}>{ui.follow[lang]}</p>
              <div className="foot__social">
                <a href={site.social.instagram} aria-label="Instagram" rel="noopener" target="_blank"><InstagramIcon /></a>
                <a href={site.social.linkedin} aria-label="LinkedIn" rel="noopener" target="_blank"><LinkedinIcon /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
