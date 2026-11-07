import Link from 'next/link';
import { href, money, type Lang } from '@/lib/i18n';
import { fromRate } from '@/lib/pricing';
import { specialties } from '@/content/specialties';
import { projects } from '@/content/projects';
import { Pic } from '@/components/Pic';
import { Mark, Motif } from '@/components/Mark';
import { Heading } from '@/components/Heading';
import { Estimator } from '@/components/Estimator';
import { ArrowDown } from '@/components/icons';

const c = {
  sub: { fa: 'معماری · بازسازی', en: 'Architecture · Renovation' },
  h1: { fa: 'طراحی و ساخت، زیر یک سقف', en: 'Design and build, under one roof' },
  lede: {
    fa: 'کیم دیزاین استودیوی معماری و بازسازی در تهران است. یک تیم، خانهٔ شما را طراحی، برآورد و اجرا می‌کند.',
    en: 'kimdesign is an architecture and renovation studio in Tehran. One team designs your home, prices it and builds it.',
  },
  estimate: { fa: 'برآورد هزینه', en: 'Get an estimate' },
  seeWork: { fa: 'پروژه‌ها را ببینید', en: 'See our projects' },
  scroll: { fa: 'ادامه', en: 'Scroll down' },
  statement1: {
    fa: 'از نخستین برداشت تا آخرین دست رنگ، کسی که فضای شما را طراحی کرده، هنگام ساختنش در کارگاه حاضر است.',
    en: 'From the first measured drawing to the last coat of paint, the person who planned your rooms is on site while they are built.',
  },
  processText: {
    fa: 'نقشه‌ها در دفتر ما کشیده می‌شوند و در کارگاه ما ساخته می‌شوند. هیچ چیز میان معمار و پیمانکار گم نمی‌شود، چون هر دو یک تیم‌اند. هر جزئیات پیش از اجرا قیمت دارد و هر تصمیم پیش از تخریب گرفته شده است.',
    en: 'Drawings are made in our studio and built by our own crews. Nothing gets lost between architect and contractor, because they are the same team. Every detail is priced before it is built, and every decision is made before anything comes down.',
  },
  steps: [
    { t: { fa: 'بازدید و برداشت', en: 'Visit and survey' }, d: { fa: 'اندازه‌ها، سازه و تأسیسات موجود', en: 'Measurements, structure and existing services' } },
    { t: { fa: 'طراحی', en: 'Design' }, d: { fa: 'طرح، مدل سه‌بعدی و نقشهٔ اجرایی', en: 'Concept, 3D model and construction drawings' } },
    { t: { fa: 'پیش‌فاکتور مکتوب', en: 'Written quote' }, d: { fa: 'قیمت هر بخش، پیش از امضا', en: 'Every part priced, before you sign' } },
    { t: { fa: 'اجرا و تحویل', en: 'Build and handover' }, d: { fa: 'یک سرپرست، گزارش هفتگی، ضمانت مکتوب', en: 'One site manager, weekly reports, written guarantee' } },
  ],
  studioText: {
    fa: 'نجارها، کاشی‌کارها و تأسیسات‌کاران ما سال‌هاست با هم کار می‌کنند. کابینت‌ها و پله‌ها را در کارگاه خودمان می‌سازیم و کارگاه ساختمانی را تمیز، آرام و قابل سکونت نگه می‌داریم.',
    en: 'Our joiners, tilers and services engineers have worked together for years. Cabinets and stairs are made in our own workshop, and the site is kept clean, quiet and liveable.',
  },
  aboutLink: { fa: 'دربارهٔ ما', en: 'About us' },
  statement2: {
    fa: 'معمار، مهندس سازه، نجار و استادکار؛ همه از روی یک نقشه کار می‌کنند و به یک مدیر پروژه پاسخ می‌دهند.',
    en: 'Architects, engineers, joiners and builders work from the same drawings and answer to one project manager.',
  },
  allSpecs: { fa: 'همهٔ تخصص‌ها', en: 'All specialties' },
  from: { fa: 'از', en: 'from' },
  perM2: { fa: 'هر متر مربع', en: 'per m²' },
  statement3: {
    fa: 'پیش از هر تصمیمی باید بدانید تقریباً چقدر هزینه دارد. نوع پروژه و متراژ را انتخاب کنید تا عدد همراه شما تغییر کند.',
    en: 'Before you commit to anything, you should know roughly what it costs. Choose a project and a size, and the figure moves with you.',
  },
  planner: { fa: 'برآوردگر هزینه', en: 'Cost planner' },
  recentText: {
    fa: 'آشپزخانه‌ای بلند و روشن برای خانواده‌ای پنج‌نفره در سعادت‌آباد: یک ردیف کابینت تمام‌قد، رویهٔ مرمر و میزی چوبی در میانه.',
    en: 'A long, bright kitchen for a family of five in Saadat Abad: one run of full-height cabinets, marble worktops and a timber table in the middle.',
  },
  allWork: { fa: 'همهٔ پروژه‌ها', en: 'All projects' },
  pmText: {
    fa: 'از روز بازدید تا تحویل کلید، یک نفر پاسخگوی شماست. او برنامه را می‌چیند، هر هفته گزارش تصویری می‌فرستد و هر تغییری را پیش از اجرا با قیمتش به شما می‌گوید.',
    en: 'From the first visit to the day you get your keys, one person answers to you. They set the schedule, send a photo report every week and tell you the price of any change before it is made.',
  },
  contact: { fa: 'با ما صحبت کنید', en: 'Talk to us' },
};

export function Home({ lang }: { lang: Lang }) {
  const featured = projects.find((p) => p.id === 'saadat-abad-kitchen')!;
  return (
    <>
      {/* first screen: framed card, mark, two offset pictures, the title low on the start side */}
      <div className="frame">
        <div className="frame__card">
          <div className="hero">
            <Link href={href(lang, 'home')} className="hero__logo load-in" aria-label={lang === 'fa' ? 'کیم دیزاین' : 'kimdesign'}>
              <Mark />
              <span className="wordmark">{lang === 'fa' ? 'کیم دیزاین' : 'kimdesign'}</span>
              <span className="wordmark-sub">{c.sub[lang]}</span>
            </Link>
            <div className="hero__pic-a load-in load-in--2">
              <Pic name="oak-stair" alt={lang === 'fa' ? 'پلهٔ چوبی روشن' : 'A light timber stair'} sizes="(max-width: 760px) 1px, 14vw" priority />
            </div>
            <div className="hero__pic-b load-in load-in--3">
              <Pic name="bath-green" alt={lang === 'fa' ? 'حمامی با کاشی سبز تیره و آینهٔ گرد' : 'A bathroom in dark green tile with a round mirror'} sizes="(max-width: 760px) 100vw, 28vw" priority />
            </div>
            <div className="hero__text">
              <h1 className="display display--hero load-in">{c.h1[lang]}</h1>
              <p className="hero__lede load-in load-in--2">{c.lede[lang]}</p>
              <div className="hero__actions load-in load-in--3">
                <Link className="btn btn--solid" href={href(lang, 'estimate')}>{c.estimate[lang]}</Link>
                <Link className="sq-link label" href={href(lang, 'projects')}><span className="sq sq--sm" aria-hidden="true" /><span>{c.seeWork[lang]}</span></Link>
              </div>
            </div>
          </div>
          <a className="scroll-down" href="#studio"><i><ArrowDown /></i>{c.scroll[lang]}</a>
        </div>
      </div>

      {/* statement on the lapis wash, then a full-bleed picture */}
      <section id="studio" className="section section--frame" aria-label={c.sub[lang]}>
        <div className="wrap statement-block" data-reveal="">
          <p className="statement">{c.statement1[lang]}</p>
        </div>
      </section>
      <div className="bleed drift" style={{ overflow: 'hidden' }}>
        <Pic name="timber-fins" alt={lang === 'fa' ? 'نمای در حال ساخت با تیغه‌های چوبی عمودی' : 'A facade going up, clad in vertical timber fins'} sizes="100vw" />
      </div>

      {/* "where time stops": heading, framed picture, text either side */}
      <section className="section section--cream" aria-labelledby="h-process">
        <div className="wrap">
          <Heading id="h-process" lang={lang} className="display--center" before={{ fa: 'جایی که', en: 'Where' }} accent={{ fa: 'نقشه', en: 'drawings' }} after={{ fa: 'خانه می‌شود', en: 'become rooms' }} />
          <div className="framed">
            <p className="framed__start" data-reveal=""><span style={{ display: 'block' }}>{c.processText[lang]}</span></p>
            <div className="framed__pic drift" data-parallax="0.05">
              <div><Pic name="roof-truss" alt={lang === 'fa' ? 'نقشهٔ مقطع یک سازهٔ چوبی سنتی' : 'Section drawing of a traditional timber structure'} sizes="(max-width: 900px) 80vw, 30vw" /></div>
            </div>
            <ol className="steps framed__end" data-reveal="">
              {c.steps.map((s) => (
                <li key={s.t.en}><strong>{s.t[lang]}</strong><span>{s.d[lang]}</span></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className="band" aria-hidden="true" />

      {/* split: heading, picture and motif link on one half; full-height picture on the other */}
      <section className="split" aria-labelledby="h-studio">
        <div className="split__text">
          <Heading id="h-studio" lang={lang} before={{ fa: 'استودیویی با', en: 'A studio of' }} accent={{ fa: 'دست‌های', en: 'patient' }} after={{ fa: 'صبور', en: 'hands' }} />
          <div data-reveal="" style={{ display: 'grid', gap: 40 }}>
            <Pic name="carpenter" alt={lang === 'fa' ? 'نجاری با کمربند ابزار کنار دیوار چوبی' : 'A carpenter with a tool belt beside timber cladding'} sizes="(max-width: 900px) 100vw, 40vw" />
            <p className="prose">{c.studioText[lang]}</p>
            <Link className="motif label" href={href(lang, 'about')} style={{ justifySelf: 'center' }}><Motif />{c.aboutLink[lang]}</Link>
          </div>
        </div>
        <div className="split__pic drift">
          <Pic name="rebar" alt={lang === 'fa' ? 'کارگری که در ارتفاع آرماتور می‌بندد' : 'A worker tying reinforcement bars high above the city'} sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
      </section>

      <div className="band" aria-hidden="true" />

      <section className="section" aria-label={c.allSpecs[lang]}>
        <div className="wrap statement-block" data-reveal="">
          <p className="statement">{c.statement2[lang]}</p>
        </div>
      </section>

      {/* "suites and rooms": staggered pictures on a tiled ground */}
      <section className="tiles" aria-labelledby="h-specs" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Heading id="h-specs" lang={lang} className="display--center" before={{ fa: 'تخصص‌ها', en: 'Specialties' }} accent={{ fa: 'و', en: 'and' }} after={{ fa: 'خدمات', en: 'services' }} />
        </div>
        <ul className="stagger">
          {specialties.map((s, i) => (
            <li key={s.id} data-parallax={i % 3 === 1 ? '0.06' : i % 3 === 2 ? '0.03' : undefined}>
              <Link className="card" href={href(lang, 'specialties', `#${s.id}`)}>
                <Pic name={s.img} alt={s.alt[lang]} sizes="(max-width: 760px) 50vw, 22vw" />
                <span className="card__label">
                  {s.title[lang]}
                  <span className="card__price">{c.from[lang]} {money(fromRate(s.id), lang)} {c.perM2[lang]}</span>
                </span>
              </Link>
              {(i === 0 || i === 2) && <span className="card__sq" aria-hidden="true" />}
            </li>
          ))}
        </ul>
        <div style={{ display: 'grid', placeItems: 'center', marginTop: 'clamp(56px, 7vw, 100px)' }}>
          <Link className="sq-link label" href={href(lang, 'specialties')}><span className="sq" aria-hidden="true" /><span>{c.allSpecs[lang]}</span></Link>
        </div>
      </section>

      {/* the live thing: a price before the first brick */}
      <section className="section" aria-labelledby="h-price" style={{ paddingBottom: 'clamp(56px, 7vw, 100px)' }}>
        <div className="wrap statement-block" data-reveal="">
          <p className="statement">{c.statement3[lang]}</p>
        </div>
        <div className="over" style={{ marginTop: 'clamp(64px, 8vw, 120px)' }}>
          <div className="over__pic drift"><Pic name="marble" alt={lang === 'fa' ? 'رگه‌های سنگ مرمر' : 'Veined marble'} sizes="270px" /></div>
          <Heading id="h-price" lang={lang} className="display--center" before={{ fa: 'قیمت،', en: 'A price' }} accent={{ fa: 'پیش از', en: 'before' }} after={{ fa: 'اولین آجر', en: 'the first brick' }} />
        </div>
      </section>
      <div className="band band--key" aria-hidden="true" />
      <section className="split" aria-label={c.planner[lang]} style={{ minHeight: 0 }}>
        <div className="split__pic drift">
          <Pic name="plaster" alt={lang === 'fa' ? 'دیوار گچی فرسوده پیش از بازسازی' : 'A worn plaster wall before renovation'} sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
        <div>
          <div style={{ display: 'grid', justifyItems: 'center', paddingTop: 'clamp(48px, 6vw, 90px)' }} className="label">
            <span className="motif"><Motif />{c.planner[lang]}</span>
          </div>
          <Estimator lang={lang} mode="mini" />
        </div>
      </section>
      <div className="band band--key" aria-hidden="true" />

      {/* "wellness and fitness": three columns, then a full-bleed picture */}
      <section className="section" aria-labelledby="h-recent">
        <div className="wrap">
          <Heading id="h-recent" lang={lang} className="display--center" before={{ fa: 'پروژه‌های', en: 'Recent' }} accent={{ fa: 'اخیر', en: 'work' }} />
          <div className="trio">
            <div className="trio__a drift"><Pic name={featured.media[0].img} alt={featured.media[0].alt[lang]} sizes="(max-width: 900px) 50vw, 25vw" /></div>
            <div className="trio__b" data-reveal="">
              <h3 className="h3">{featured.title[lang]}</h3>
              <p>{c.recentText[lang]}</p>
              <Link className="sq-link label" href={href(lang, 'projects')}><span className="sq" aria-hidden="true" /><span>{c.allWork[lang]}</span></Link>
            </div>
            <div className="trio__c drift" data-parallax="0.05"><Pic name="bath-tub" alt={lang === 'fa' ? 'وان ایستاده روی کف سنگی' : 'A freestanding bath on a stone floor'} sizes="(max-width: 900px) 50vw, 25vw" /></div>
          </div>
        </div>
      </section>
      <div className="bleed bleed--short drift" style={{ overflow: 'hidden' }}>
        <Pic name="spiral-stair" alt={lang === 'fa' ? 'پلهٔ مارپیچ چوبی از بالا' : 'A spiral timber stair seen from above'} sizes="100vw" />
      </div>

      {/* "your personal curator" */}
      <section className="section" aria-labelledby="h-pm">
        <div className="wrap">
          <Heading id="h-pm" lang={lang} className="display--center" before={{ fa: 'یک', en: 'Your own' }} accent={{ fa: 'مدیر پروژه', en: 'project' }} after={{ fa: 'برای شما', en: 'manager' }} />
          <div className="trio trio--low">
            <div className="trio__a drift"><Pic name="oak-planks" alt={lang === 'fa' ? 'کف پارکت چوبی' : 'A parquet floor'} sizes="(max-width: 900px) 50vw, 25vw" /></div>
            <div className="trio__b drift" data-parallax="0.04" style={{ alignSelf: 'end' }}><Pic name="bath-oak" alt={lang === 'fa' ? 'کمدهای بلوط روشن کنار وان' : 'Pale oak cupboards beside a bath'} sizes="(max-width: 900px) 100vw, 30vw" /></div>
            <div className="trio__c" data-reveal="" style={{ display: 'grid', gap: 40 }}>
              <p>{c.pmText[lang]}</p>
              <Link className="sq-link label" href={href(lang, 'contact')}><span className="sq" aria-hidden="true" /><span>{c.contact[lang]}</span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
