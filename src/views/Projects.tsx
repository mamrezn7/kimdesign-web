import Link from 'next/link';
import { href, type Lang } from '@/lib/i18n';
import { PageHero } from '@/components/PageHero';
import { ProjectList } from '@/components/ProjectList';
import { Heading } from '@/components/Heading';

const c = {
  crumb: { fa: 'پروژه‌ها', en: 'Projects' },
  h1: { fa: 'پروژه‌هایی که ساخته‌ایم', en: 'Projects we have built' },
  lede: {
    fa: 'آشپزخانه، حمام، پله و خانه‌هایی که از نو ساخته‌ایم؛ با متراژ، مدت اجرا و آنچه در هر کدام انجام شد.',
    en: 'Kitchens, bathrooms, stairs and whole homes we have rebuilt, with the area, the time on site and what we did in each.',
  },
  cta: { fa: 'پروژهٔ بعدی می‌تواند خانهٔ شما باشد.', en: 'The next project could be your home.' },
  ctaBtn: { fa: 'برآورد هزینه', en: 'Get an estimate' },
};

export function Projects({ lang }: { lang: Lang }) {
  return (
    <>
      <PageHero lang={lang} crumb={c.crumb[lang]} title={c.h1[lang]} lede={c.lede[lang]}
        picA="spiral-stair" altA={lang === 'fa' ? 'پلهٔ مارپیچ' : 'A spiral stair'}
        picB="bath-tub" altB={lang === 'fa' ? 'وان ایستاده روی کف سنگی' : 'A freestanding bath on a stone floor'} />
      <section className="section" aria-labelledby="h-list">
        <div className="wrap">
          <Heading id="h-list" lang={lang} className="display--center" before={{ fa: 'از آشپزخانه', en: 'From kitchens' }} accent={{ fa: 'تا', en: 'to' }} after={{ fa: 'کل خانه', en: 'whole homes' }} />
          <ProjectList lang={lang} />
        </div>
      </section>
      <div className="band" aria-hidden="true" />
      <section className="section section--frame" aria-label={c.ctaBtn[lang]}>
        <div className="wrap statement-block" data-reveal="">
          <p className="statement">{c.cta[lang]}</p>
          <Link className="btn btn--solid" href={href(lang, 'estimate')}>{c.ctaBtn[lang]}</Link>
        </div>
      </section>
    </>
  );
}
