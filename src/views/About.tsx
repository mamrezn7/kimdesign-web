import Link from 'next/link';
import { href, type Lang, type L } from '@/lib/i18n';
import { PageHero } from '@/components/PageHero';
import { Heading } from '@/components/Heading';
import { Pic, hasImage } from '@/components/Pic';
import { Motif } from '@/components/Mark';

const c = {
  crumb: { fa: 'دربارهٔ ما', en: 'About' },
  h1: { fa: 'استودیویی که طراحی می‌کند و می‌سازد', en: 'A studio that draws and builds' },
  lede: {
    fa: 'کیم دیزاین را معمارانی بنا گذاشتند که نمی‌خواستند نقشه‌هایشان را به پیمانکاری ناآشنا بسپارند. امروز همان تیم، کار را از برداشت تا تحویل پیش می‌برد.',
    en: 'kimdesign was started by architects who did not want to hand their drawings to builders they had never met. Today the same team takes a project from survey to handover.',
  },
  statement: {
    fa: 'ما خانه را از پشت میز طراحی نمی‌کنیم. پیش از هر خط، در خانهٔ شما راه می‌رویم، نور را می‌بینیم و دیوارها را اندازه می‌گیریم.',
    en: 'We do not design a home from behind a desk. Before the first line is drawn, we walk through your rooms, watch the light and measure the walls.',
  },
  rootsText: {
    fa: 'خانه‌های قدیم کاشان و یزد هنوز بهترین معلم ما هستند: حیاطی که نور و هوا را به همهٔ اتاق‌ها می‌رساند، دیوارهای آجری که تابستان خنک و زمستان گرم می‌مانند، و جزئیاتی که برای صد سال ساخته شده‌اند. همین اصول را در آپارتمان‌ها و خانه‌های امروز به کار می‌بریم.',
    en: 'The old houses of Kashan and Yazd are still our best teachers: a courtyard that brings light and air to every room, brick walls that stay cool in summer and warm in winter, and details made to last a hundred years. We bring the same principles to the apartments and houses of today.',
  },
  rootsCaption: { fa: 'خانهٔ بروجردی‌ها، کاشان، ساخته‌شده در دهه‌های میانی سدهٔ سیزدهم خورشیدی', en: 'Borujerdi House, Kashan, built in the 1850s' },
  rootsDetail: { fa: 'کاربندی سقف در خانهٔ بروجردی‌ها، کاشان', en: 'The vaulted ceiling of Borujerdi House, Kashan' },
  values: [
    { t: { fa: 'یک تیم، یک قرارداد', en: 'One team, one contract' }, d: { fa: 'طراحی و اجرا در یک قرارداد، با یک مسئول. اگر چیزی درست نباشد، می‌دانید با چه کسی صحبت کنید.', en: 'Design and construction in one contract, with one person responsible. If something is wrong, you know exactly who to call.' } },
    { t: { fa: 'قیمتی که می‌شود رویش برنامه ریخت', en: 'A price you can plan around' }, d: { fa: 'پیش‌فاکتور ما جزءبه‌جزء است. هر تغییری پیش از اجرا، با قیمتش به شما اعلام می‌شود.', en: 'Our quotes are itemised. Any change is priced and agreed with you before it is built.' } },
    { t: { fa: 'ساخته‌شده برای نگهداری', en: 'Built to be looked after' }, d: { fa: 'لوله‌ها و سیم‌ها جایی می‌روند که بعدها بی‌تخریب در دسترس باشند، و هر پروژه با دفترچهٔ نگهداری تحویل می‌شود.', en: 'Pipes and cables go where they can be reached later without breaking anything, and every project comes with a maintenance file.' } },
    { t: { fa: 'کارگاهی آرام و تمیز', en: 'A clean, quiet site' }, d: { fa: 'ساعت کار با همسایه‌ها هماهنگ می‌شود، راه‌پله‌ها محافظت می‌شوند و هر روز نخاله جمع می‌شود.', en: 'Working hours are agreed with the neighbours, stairwells are protected and waste leaves the site every day.' } },
  ],
  process: [
    { t: { fa: 'بازدید و برداشت', en: 'Visit and survey' }, d: { fa: 'خانه را می‌بینیم، اندازه می‌گیریم و دربارهٔ زندگی شما در آن می‌پرسیم. وضعیت سازه و تأسیسات را بررسی و ثبت می‌کنیم.', en: 'We see the home, measure it and ask how you live in it. Structure and services are inspected and recorded.' }, img: 'plaster', alt: { fa: 'دیوار گچی فرسوده', en: 'A worn plaster wall' } },
    { t: { fa: 'طراحی و نقشه', en: 'Design and drawings' }, d: { fa: 'دو یا سه گزینهٔ طراحی، مدل سه‌بعدی و پس از انتخاب شما، نقشه‌های اجرایی کامل.', en: 'Two or three design options, a 3D model and, once you choose, a full set of construction drawings.' }, img: 'roof-truss', alt: { fa: 'نقشهٔ مقطع سازهٔ چوبی', en: 'Section drawing of a timber structure' } },
    { t: { fa: 'پیش‌فاکتور مکتوب', en: 'Written quote' }, d: { fa: 'قیمت هر بخش، برنامهٔ زمانی و جدول پرداخت مرحله‌ای، پیش از امضای قرارداد.', en: 'A price for every part, a schedule and staged payments, all before you sign.' }, img: 'marble', alt: { fa: 'سنگ مرمر', en: 'Marble' } },
    { t: { fa: 'اجرا', en: 'Construction' }, d: { fa: 'یک سرپرست کارگاه، گزارش تصویری هفتگی و بازدید مشترک در پایان هر مرحله.', en: 'One site manager, a photo report every week and a walk-through at the end of each stage.' }, img: 'framing', alt: { fa: 'اجرای اسکلت فلزی سبک', en: 'A light steel frame going up' } },
    { t: { fa: 'تحویل و ضمانت', en: 'Handover and guarantee' }, d: { fa: 'فهرست نواقص، تحویل کلید، دفترچهٔ نگهداری و ضمانت مکتوب اجرا.', en: 'A snagging list, the keys, a maintenance file and a written guarantee.' }, img: 'loft', alt: { fa: 'خانهٔ بازسازی‌شده با نور فراوان', en: 'A renovated home full of light' } },
  ] as { t: L; d: L; img: string; alt: L }[],
  cta: { fa: 'می‌خواهید بدانید پروژهٔ شما چقدر هزینه دارد؟', en: 'Want to know roughly what your project will cost?' },
  ctaBtn: { fa: 'برآورد هزینه', en: 'Get an estimate' },
};

export function About({ lang }: { lang: Lang }) {
  const rootsPic = hasImage('kashan-courtyard') ? 'kashan-courtyard' : 'kashan-facade';
  const detailPic = hasImage('muqarnas') ? 'muqarnas' : hasImage('muqarnas-dark') ? 'muqarnas-dark' : 'roof-truss';
  return (
    <>
      <PageHero lang={lang} crumb={c.crumb[lang]} title={c.h1[lang]} lede={c.lede[lang]}
        picA="oak-planks" altA={lang === 'fa' ? 'کف چوبی' : 'A timber floor'}
        picB="carpenter" altB={lang === 'fa' ? 'نجاری در حال کار' : 'A carpenter at work'} />

      <section className="section section--frame" aria-label={c.crumb[lang]}>
        <div className="wrap statement-block" data-reveal=""><p className="statement">{c.statement[lang]}</p></div>
      </section>

      <section id="roots" className="split" aria-labelledby="h-roots">
        <div className="split__pic drift">
          <Pic name={rootsPic} alt={c.rootsCaption[lang]} sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
        <div className="split__text">
          <Heading id="h-roots" lang={lang} before={{ fa: 'درس‌هایی از', en: 'Lessons from' }} accent={{ fa: 'خانه‌های', en: 'old' }} after={{ fa: 'قدیم', en: 'houses' }} />
          <div data-reveal="" style={{ display: 'grid', gap: 32 }}>
            <p className="prose">{c.rootsText[lang]}</p>
            <figure style={{ margin: 0, display: 'grid', gap: 12 }}>
              <Pic name={detailPic} alt={c.rootsDetail[lang]} sizes="(max-width: 900px) 100vw, 40vw" />
              <figcaption className="muted" style={{ fontSize: '0.9375rem' }}>{c.rootsDetail[lang]}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <div className="band" aria-hidden="true" />

      <section id="values" className="section" aria-labelledby="h-values">
        <div className="wrap">
          <Heading id="h-values" lang={lang} className="display--center" before={{ fa: 'آنچه به آن', en: 'What we' }} accent={{ fa: 'پایبندیم', en: 'hold' }} after={{ fa: '', en: 'to' }} />
          <ul className="values">
            {c.values.map((v) => (
              <li key={v.t.en} data-reveal=""><h3 className="h3">{v.t[lang]}</h3><p>{v.d[lang]}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <div className="band band--key" aria-hidden="true" />

      <section id="process" className="section section--cream" aria-labelledby="h-process">
        <div className="wrap">
          <Heading id="h-process" lang={lang} className="display--center" before={{ fa: 'روند', en: 'How a project' }} accent={{ fa: 'یک پروژه', en: 'runs' }} />
          <ol className="process">
            {c.process.map((p) => (
              <li key={p.t.en}>
                <div data-reveal=""><h3 className="h3">{p.t[lang]}</h3><p>{p.d[lang]}</p></div>
                <Pic name={p.img} alt={p.alt[lang]} sizes="(max-width: 760px) 100vw, 33vw" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--field" aria-label={c.ctaBtn[lang]}>
        <div className="wrap statement-block" data-reveal="">
          <p className="statement">{c.cta[lang]}</p>
          <Link className="btn" href={href(lang, 'estimate')}>{c.ctaBtn[lang]}</Link>
          <span className="motif" style={{ color: 'var(--on-field)' }}><Motif /></span>
        </div>
      </section>
    </>
  );
}
