import { finishes, projectTypes } from '@/lib/pricing';
import { money, type Lang } from '@/lib/i18n';
import { Pic } from './Pic';

const pics: Record<string, { img: string; alt: { fa: string; en: string } }> = {
  standard: { img: 'oak-planks', alt: { fa: 'کف پارکت چوبی', en: 'A parquet floor' } },
  premium: { img: 'marble', alt: { fa: 'سنگ مرمر رگه‌دار', en: 'Veined marble' } },
  luxury: { img: 'spiral-stair', alt: { fa: 'پلهٔ مارپیچ چوبی دست‌ساز', en: 'A hand-built spiral timber stair' } },
};
const ui = {
  full: { fa: 'بازسازی کامل', en: 'Full renovation' },
  kitchen: { fa: 'آشپزخانه', en: 'Kitchen' },
  per: { fa: 'هر متر مربع', en: 'per m²' },
};

/** The three finish levels, each with its picture and real sample rates. */
export function Finishes({ lang }: { lang: Lang }) {
  const full = projectTypes.find((p) => p.id === 'full')!;
  const kitchen = projectTypes.find((p) => p.id === 'kitchen')!;
  return (
    <ul className="finishes">
      {finishes.map((f) => (
        <li key={f.id} data-reveal="">
          <div className="drift" style={{ overflow: 'hidden' }}><Pic name={pics[f.id].img} alt={pics[f.id].alt[lang]} sizes="(max-width: 760px) 100vw, 30vw" /></div>
          <h3 className="h3">{f[lang]}</h3>
          <p>{f.note[lang]}</p>
          <dl className="facts">
            <dt>{ui.full[lang]}</dt><dd>{money(full.rate[f.id] * 1e6, lang)} {ui.per[lang]}</dd>
            <dt>{ui.kitchen[lang]}</dt><dd>{money(kitchen.rate[f.id] * 1e6, lang)} {ui.per[lang]}</dd>
          </dl>
        </li>
      ))}
    </ul>
  );
}
