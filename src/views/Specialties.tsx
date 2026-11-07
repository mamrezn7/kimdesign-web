import Link from 'next/link';
import { Fragment } from 'react';
import { href, money, type Lang } from '@/lib/i18n';
import { fromRate } from '@/lib/pricing';
import { specialties } from '@/content/specialties';
import { PageHero } from '@/components/PageHero';
import { Heading } from '@/components/Heading';
import { Pic } from '@/components/Pic';

const c = {
  crumb: { fa: 'تخصص‌ها', en: 'Specialties' },
  h1: { fa: 'شش تخصص، یک تیم', en: 'Six specialties, one team' },
  lede: {
    fa: 'از طراحی معماری تا آخرین کابینت، همهٔ کارها را خودمان انجام می‌دهیم یا مستقیم بر آن نظارت می‌کنیم.',
    en: 'From architectural design to the last cabinet, we do the work ourselves or supervise it directly.',
  },
  jump: { fa: 'فهرست تخصص‌ها', en: 'List of specialties' },
  intro: { fa: 'هر تخصص را یک سرپرست باتجربه اداره می‌کند، اما همه از روی یک نقشه و با یک برنامهٔ زمانی کار می‌کنند.', en: 'Each specialty is led by an experienced lead, but all of them work from one set of drawings and one schedule.' },
  includes: { fa: 'شامل', en: 'What it includes' },
  timeline: { fa: 'مدت معمول', en: 'Typical time' },
  from: { fa: 'از', en: 'From' },
  perM2: { fa: 'هر متر مربع', en: 'per m²' },
  estimate: { fa: 'برآورد هزینهٔ این کار', en: 'Estimate this work' },
};

export function Specialties({ lang }: { lang: Lang }) {
  return (
    <>
      <PageHero lang={lang} crumb={c.crumb[lang]} title={c.h1[lang]} lede={c.lede[lang]}
        picA="brick" altA={lang === 'fa' ? 'دیوار آجری' : 'A brick wall'}
        picB="kitchen" altB={lang === 'fa' ? 'آشپزخانهٔ روشن با میز چوبی' : 'A bright kitchen with a timber table'} />

      <section className="section section--frame" aria-label={c.jump[lang]} style={{ paddingBlock: 'clamp(72px, 9vw, 140px)' }}>
        <div className="wrap">
          <p className="statement" data-reveal=""><span>{c.intro[lang]}</span></p>
          <nav aria-label={c.jump[lang]}>
            <ul className="index-list">
              {specialties.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.title[lang]}</a></li>)}
            </ul>
          </nav>
        </div>
      </section>

      {specialties.map((s, i) => (
        <Fragment key={s.id}>
          {i > 0 && <div className={`band ${i % 2 ? 'band--key' : ''}`} aria-hidden="true" />}
          <section id={s.id} className={`section ${i % 2 ? 'section--cream' : ''}`} aria-labelledby={`h-${s.id}`}>
            <div className={`wrap spec ${i % 2 ? 'spec--flip' : ''}`}>
              <div className="spec__pic">
                <div className="drift" style={{ overflow: 'hidden' }}><Pic name={s.img} alt={s.alt[lang]} sizes="(max-width: 900px) 100vw, 48vw" /></div>
                <div className="spec__pic2" data-parallax="0.06"><Pic name={s.img2} alt={s.alt2[lang]} sizes="(max-width: 900px) 40vw, 20vw" /></div>
              </div>
              <div className="spec__text">
                <Heading id={`h-${s.id}`} lang={lang} before={s.heading.before} accent={s.heading.accent} after={s.heading.after} />
                <div data-reveal="" style={{ display: 'grid', gap: 24 }}>
                  <p className="label" style={{ textTransform: 'none', letterSpacing: 0, fontSize: '1.15rem', fontWeight: 400 }}>{s.title[lang]}: {s.short[lang]}</p>
                  <p>{s.body[lang]}</p>
                  <div style={{ display: 'grid', gap: 12 }}>
                    <h3 className="label">{c.includes[lang]}</h3>
                    <ul className="ticks">{s.includes.map((x) => <li key={x.en}>{x[lang]}</li>)}</ul>
                  </div>
                  <p className="spec__meta">
                    <span><strong>{c.timeline[lang]}:</strong> {s.timeline[lang]}</span>
                    <span><strong>{c.from[lang]}</strong> {money(fromRate(s.id), lang)} {c.perM2[lang]}</span>
                  </p>
                  <Link className="sq-link label" href={`${href(lang, 'estimate')}?type=${s.id}`}><span className="sq sq--sm" aria-hidden="true" /><span>{c.estimate[lang]}</span></Link>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      ))}
    </>
  );
}
