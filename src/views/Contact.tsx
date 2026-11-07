import { site } from '@/content/site';
import { t, type Lang } from '@/lib/i18n';
import { PageHero } from '@/components/PageHero';
import { ContactForm } from '@/components/ContactForm';
import { Heading } from '@/components/Heading';
import { Pic } from '@/components/Pic';

const c = {
  crumb: { fa: 'تماس', en: 'Contact' },
  h1: { fa: 'با استودیو صحبت کنید', en: 'Talk to the studio' },
  lede: {
    fa: 'برای پروژهٔ تازه، بازدید محل یا هر پرسشی پیام بفرستید یا تماس بگیرید. معمولاً ظرف یک روز کاری پاسخ می‌دهیم.',
    en: 'Write or call about a new project, a site visit or any question. We usually reply within one working day.',
  },
  address: { fa: 'نشانی', en: 'Studio' },
  phone: { fa: 'تلفن', en: 'Phone' },
  email: { fa: 'ایمیل', en: 'Email' },
  hours: { fa: 'ساعت کاری', en: 'Hours' },
  area: { fa: 'محدودهٔ کار', en: 'Where we work' },
  map: { fa: 'نمایش روی نقشه', en: 'Open in a map' },
};

export function Contact({ lang }: { lang: Lang }) {
  const mapUrl = `https://www.openstreetmap.org/?mlat=${site.geo.lat}&mlon=${site.geo.lng}#map=17/${site.geo.lat}/${site.geo.lng}`;
  return (
    <>
      <PageHero lang={lang} crumb={c.crumb[lang]} title={c.h1[lang]} lede={c.lede[lang]}
        picA="bath-vanity" altA={lang === 'fa' ? 'روشویی با رویهٔ سنگی' : 'A vanity with a stone top'}
        picB="oak-stair" altB={lang === 'fa' ? 'پلهٔ چوبی روشن' : 'A light timber stair'} />
      <section className="section" aria-labelledby="h-write">
        <div className="wrap">
          <Heading id="h-write" lang={lang} className="display--center" before={{ fa: 'برای ما', en: 'Write' }} accent={{ fa: 'بنویسید', en: 'to us' }} />
          <div className="contact" style={{ marginTop: 'clamp(48px, 6vw, 90px)' }}>
            <div data-reveal=""><ContactForm lang={lang} /></div>
            <div className="details" data-reveal="">
              <dl>
                <div><dt>{c.address[lang]}</dt><dd>{t(site.address.street, lang)}{lang === 'fa' ? '، ' : ', '}{t(site.address.city, lang)}<br /><a href={mapUrl} rel="noopener" target="_blank">{c.map[lang]}</a></dd></div>
                <div><dt>{c.phone[lang]}</dt><dd><a href={`tel:${site.phone}`} dir="ltr">{t(site.phoneDisplay, lang)}</a></dd></div>
                <div><dt>{c.email[lang]}</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div>
                <div><dt>{c.hours[lang]}</dt><dd>{t(site.hours, lang)}</dd></div>
                <div><dt>{c.area[lang]}</dt><dd>{t(site.areaServed, lang)}</dd></div>
              </dl>
              <Pic name="kitchen" alt={lang === 'fa' ? 'آشپزخانهٔ روشن' : 'A bright kitchen'} sizes="(max-width: 900px) 100vw, 40vw" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
