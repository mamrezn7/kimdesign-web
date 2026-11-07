'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { projects } from '@/content/projects';
import { projectTypes, type TypeId } from '@/lib/pricing';
import { num, type Lang } from '@/lib/i18n';
import { Pic } from './Pic';

const ui = {
  all: { fa: 'همه', en: 'All' },
  filter: { fa: 'نمایش بر اساس نوع پروژه', en: 'Show by project type' },
  place: { fa: 'محل', en: 'Place' },
  year: { fa: 'سال', en: 'Year' },
  area: { fa: 'متراژ', en: 'Area' },
  time: { fa: 'مدت اجرا', en: 'On site' },
  m2: { fa: 'متر مربع', en: 'm²' },
  weeks: { fa: 'هفته', en: 'weeks' },
  scope: { fa: 'کارهای انجام‌شده', en: 'What we did' },
  open: { fa: 'بزرگ‌نمایی تصویر', en: 'Open picture' },
  close: { fa: 'بستن', en: 'Close' },
  prev: { fa: 'قبلی', en: 'Previous' },
  next: { fa: 'بعدی', en: 'Next' },
  of: { fa: 'از', en: 'of' },
  count: { fa: 'پروژه', en: 'projects' },
};

const year = (y: number, lang: Lang) => (lang === 'fa' ? new Intl.NumberFormat('fa-IR', { useGrouping: false }).format(y - 621) : String(y));

export function ProjectList({ lang }: { lang: Lang }) {
  const [filter, setFilter] = useState<TypeId | 'all'>('all');
  const [box, setBox] = useState<{ p: number; i: number } | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const used = projectTypes.filter((t) => projects.some((p) => p.type === t.id));
  const shown = projects.filter((p) => filter === 'all' || p.type === filter);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (box && !d.open) d.showModal();
    if (!box && d.open) d.close();
  }, [box]);

  const move = useCallback((step: number) => setBox((b) => {
    if (!b) return b;
    const n = projects[b.p].media.length;
    return { p: b.p, i: (b.i + step + n) % n };
  }), []);

  useEffect(() => {
    if (!box) return;
    const onKey = (e: KeyboardEvent) => {
      const fwd = lang === 'fa' ? 'ArrowLeft' : 'ArrowRight';
      const back = lang === 'fa' ? 'ArrowRight' : 'ArrowLeft';
      if (e.key === fwd) move(1);
      if (e.key === back) move(-1);
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [box, move, lang]);

  const open = (pid: string, i: number) => setBox({ p: projects.findIndex((x) => x.id === pid), i });
  const current = box ? projects[box.p] : null;

  return (
    <>
      <div className="filters" role="group" aria-label={ui.filter[lang]}>
        <label className="choice"><input type="radio" name="pf" checked={filter === 'all'} onChange={() => setFilter('all')} /><span>{ui.all[lang]} ({num(projects.length, lang)})</span></label>
        {used.map((t) => (
          <label key={t.id} className="choice">
            <input type="radio" name="pf" checked={filter === t.id} onChange={() => setFilter(t.id)} />
            <span>{t[lang]}</span>
          </label>
        ))}
      </div>
      <p className="visually-hidden" role="status">{num(shown.length, lang)} {ui.count[lang]}</p>

      <div style={{ marginTop: 'clamp(64px, 8vw, 120px)' }}>
        {shown.map((p) => (
          <article key={p.id} id={p.id} className="project load-in">
            <div className="project__main">
              <button type="button" onClick={() => open(p.id, 0)} aria-label={`${ui.open[lang]}: ${p.media[0].alt[lang]}`}>
                <Pic name={p.media[0].img} alt={p.media[0].alt[lang]} sizes="(max-width: 900px) 100vw, 58vw" />
              </button>
            </div>
            <div className="project__text">
              <h2 className="h3">{p.title[lang]}</h2>
              <p style={{ fontSize: '1.15rem' }}>{p.summary[lang]}</p>
              <dl className="facts">
                <dt>{ui.place[lang]}</dt><dd>{p.place[lang]}</dd>
                <dt>{ui.year[lang]}</dt><dd>{year(p.year, lang)}</dd>
                <dt>{ui.area[lang]}</dt><dd>{num(p.area, lang)} {ui.m2[lang]}</dd>
                <dt>{ui.time[lang]}</dt><dd>{num(p.weeks, lang)} {ui.weeks[lang]}</dd>
              </dl>
              <p>{p.story[lang]}</p>
              <div style={{ display: 'grid', gap: 12 }}>
                <h3 className="label">{ui.scope[lang]}</h3>
                <ul className="ticks">{p.scope.map((s) => <li key={s.en}>{s[lang]}</li>)}</ul>
              </div>
            </div>
            {p.media.length > 1 && (
              <ul className="project__thumbs" style={{ gridTemplateColumns: `repeat(${Math.max(2, p.media.length - 1)}, 1fr)` }}>
                {p.media.slice(1).map((m, i) => (
                  <li key={m.img}>
                    <button type="button" onClick={() => open(p.id, i + 1)} aria-label={`${ui.open[lang]}: ${m.alt[lang]}`}>
                      <Pic name={m.img} alt={m.alt[lang]} sizes="(max-width: 900px) 33vw, 19vw" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>

      <dialog ref={dlg} className="lightbox" aria-label={current ? current.title[lang] : undefined} onClose={() => setBox(null)} onClick={(e) => { if (e.target === e.currentTarget) setBox(null); }}>
        {current && box && (
          <div className="lightbox__inner">
            <div className="lightbox__top">
              <p className="label">{current.title[lang]} · {num(box.i + 1, lang)} {ui.of[lang]} {num(current.media.length, lang)}</p>
              <button type="button" className="btn" onClick={() => setBox(null)} autoFocus>{ui.close[lang]}</button>
            </div>
            <figure>
              <Pic name={current.media[box.i].img} alt={current.media[box.i].alt[lang]} sizes="100vw" />
              <figcaption>{current.media[box.i].alt[lang]}</figcaption>
            </figure>
            {current.media.length > 1 && (
              <div className="lightbox__nav">
                <button type="button" className="btn" onClick={() => move(-1)}>{ui.prev[lang]}</button>
                <button type="button" className="btn" onClick={() => move(1)}>{ui.next[lang]}</button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
