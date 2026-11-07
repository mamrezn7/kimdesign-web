import credits from '@/content/credits.generated.json';
import { type Lang } from '@/lib/i18n';
import { PageHero } from '@/components/PageHero';
import { Pic } from '@/components/Pic';

const c = {
  crumb: { fa: 'منابع تصاویر', en: 'Picture credits' },
  h1: { fa: 'منابع تصاویر', en: 'Picture credits' },
  lede: {
    fa: 'عکس‌ها و نقشه‌های این وب‌سایت با مجوزهای آزاد منتشر شده‌اند. نام عکاس، مجوز و منبع هر کدام در این فهرست آمده است.',
    en: 'The photographs and drawings on this site are published under open licences. Each one is listed with its creator, licence and source.',
  },
  by: { fa: 'از', en: 'by' },
  source: { fa: 'منبع', en: 'Source' },
};

type Credit = { file: string; title: string; creator?: string; license?: string; licenseUrl?: string; page?: string };

export function Credits({ lang }: { lang: Lang }) {
  return (
    <>
      <PageHero lang={lang} crumb={c.crumb[lang]} title={c.h1[lang]} lede={c.lede[lang]} picB="roof-truss" altB={lang === 'fa' ? 'نقشهٔ مقطع سازهٔ چوبی' : 'Section drawing of a timber structure'} />
      <section className="section" aria-label={c.h1[lang]}>
        <ul className="wrap" style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '48px 32px' }}>
          {(credits as Credit[]).map((cr) => (
            <li key={cr.file} data-reveal="" style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
              <Pic name={cr.file} alt={cr.title} sizes="(max-width: 600px) 100vw, 25vw" />
              <p dir="ltr" style={{ textAlign: 'start', fontSize: '0.95rem' }}>
                “{cr.title}”{cr.creator ? ` by ${cr.creator}` : ''}{cr.license ? `, ${cr.license}` : ''}
              </p>
              <p style={{ fontSize: '0.95rem' }}>
                {cr.page && <a href={cr.page} rel="noopener" target="_blank">{c.source[lang]}</a>}
                {cr.licenseUrl && <> · <a href={cr.licenseUrl} rel="noopener license" target="_blank">{cr.license}</a></>}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
