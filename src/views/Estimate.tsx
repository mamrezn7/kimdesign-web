import { type Lang } from '@/lib/i18n';
import { faq } from '@/content/faq';
import { PageHero } from '@/components/PageHero';
import { Estimator } from '@/components/Estimator';
import { Heading } from '@/components/Heading';
import { Finishes } from '@/components/Finishes';

const c = {
  crumb: { fa: 'برآورد هزینه', en: 'Estimate' },
  h1: { fa: 'هزینه‌اش چقدر می‌شود؟', en: 'What will it cost?' },
  lede: {
    fa: 'نوع پروژه، متراژ و سطح مصالح را انتخاب کنید تا بازه‌ای حدودی ببینید. بعد اگر خواستید، برای بازدید و پیش‌فاکتور دقیق درخواست بفرستید.',
    en: 'Choose the type of project, the area and the finish level to see a rough range. Then, if you like, ask us for a visit and a written quote.',
  },
};

export function Estimate({ lang }: { lang: Lang }) {
  return (
    <>
      <PageHero lang={lang} crumb={c.crumb[lang]} title={c.h1[lang]} lede={c.lede[lang]}
        picA="oak-planks" altA={lang === 'fa' ? 'کف چوبی' : 'A timber floor'}
        picB="plaster" altB={lang === 'fa' ? 'دیوار گچی فرسوده پیش از بازسازی' : 'A worn plaster wall before renovation'} />
      <section className="section" aria-labelledby="h-planner">
        <div className="wrap">
          <Heading id="h-planner" lang={lang} className="display--center" before={{ fa: 'برآوردگر', en: 'The cost' }} accent={{ fa: 'هزینه', en: 'planner' }} />
          <div style={{ marginTop: 'clamp(48px, 6vw, 90px)' }}>
            <Estimator lang={lang} mode="full" />
          </div>
        </div>
      </section>
      <section className="section section--frame" aria-labelledby="h-finish">
        <div className="wrap">
          <Heading id="h-finish" lang={lang} className="display--center" before={{ fa: 'سه سطح', en: 'Three' }} accent={{ fa: 'مصالح', en: 'finish' }} after={{ fa: 'و اجرا', en: 'levels' }} />
          <Finishes lang={lang} />
        </div>
      </section>
      <div className="band" aria-hidden="true" />
      <section id="faq" className="section section--cream" aria-labelledby="h-faq">
        <div className="wrap">
          <Heading id="h-faq" lang={lang} className="display--center" before={{ fa: 'پرسش‌های', en: 'Common' }} accent={{ fa: 'رایج', en: 'questions' }} />
          <div className="faq">
            {faq.map((f) => (
              <details key={f.q.en}>
                <summary>{f.q[lang]}</summary>
                <p>{f.a[lang]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
