'use client';

import Link from 'next/link';
import { useEffect, useId, useMemo, useState, type FormEvent } from 'react';
import { conditions, estimate, extras, fastTrack, finishes, projectTypes, type FinishId, type TypeId } from '@/lib/pricing';
import { href, money, moneyRange, num, type Lang } from '@/lib/i18n';
import { deliver, formUi, validate, type Values } from './forms';
import { Pic } from './Pic';

const ui = {
  type: { fa: 'نوع پروژه', en: 'Project type' },
  area: { fa: 'متراژ', en: 'Floor area' },
  m2: { fa: 'متر مربع', en: 'm²' },
  finish: { fa: 'سطح مصالح و اجرا', en: 'Finish level' },
  condition: { fa: 'وضعیت فعلی', en: 'Current condition' },
  extras: { fa: 'کارهای جانبی', en: 'Extra work' },
  fast: { fa: 'زمان‌بندی', en: 'Schedule' },
  normal: { fa: 'معمولی', en: 'Standard' },
  result: { fa: 'برآورد حدودی', en: 'Rough estimate' },
  weeks: { fa: 'هفته اجرا', en: 'weeks on site' },
  for: { fa: 'برای', en: 'for' },
  note: {
    fa: 'این عدد بر اساس نرخ‌های نمونه است و جای پیش‌فاکتور را نمی‌گیرد. قیمت نهایی پس از بازدید محل اعلام می‌شود.',
    en: 'This figure uses sample rates and is not a quote. The final price follows a site visit.',
  },
  detailed: { fa: 'برآورد دقیق‌تر', en: 'Get a detailed estimate' },
  breakdown: { fa: 'تقسیم هزینه', en: 'How it divides' },
  // inquiry form
  formTitle: { fa: 'درخواست بازدید و پیش‌فاکتور', en: 'Ask for a visit and a written quote' },
  formLede: { fa: 'برآورد بالا همراه پیام شما فرستاده می‌شود. معمولاً ظرف یک روز کاری تماس می‌گیریم.', en: 'The estimate above is sent with your message. We usually reply within one working day.' },
  name: { fa: 'نام و نام خانوادگی', en: 'Full name' },
  phone: { fa: 'تلفن همراه', en: 'Mobile phone' },
  email: { fa: 'ایمیل', en: 'Email' },
  city: { fa: 'محله یا شهر پروژه', en: 'Neighbourhood or city' },
  start: { fa: 'زمان شروع دلخواه', en: 'Preferred start' },
  startOpts: {
    fa: ['هرچه زودتر', 'تا سه ماه دیگر', 'تا شش ماه دیگر', 'هنوز مشخص نیست'],
    en: ['As soon as possible', 'Within three months', 'Within six months', 'Not sure yet'],
  },
  message: { fa: 'دربارهٔ پروژه بگویید', en: 'Tell us about the project' },
  messageHint: { fa: 'اختیاری: وضعیت فعلی، خواسته‌ها، محدودیت‌ها.', en: 'Optional: what is there now, what you want, any constraints.' },
  send: { fa: 'ارسال درخواست', en: 'Send request' },
  thanks: { fa: 'درخواست شما ثبت شد', en: 'Your request is in' },
  thanksBody: { fa: 'به‌زودی برای هماهنگی بازدید با شما تماس می‌گیریم.', en: 'We will be in touch soon to arrange a visit.' },
  subject: { fa: 'درخواست برآورد', en: 'Estimate request' },
};

interface State { type: TypeId; area: number; finish: FinishId; condition: string; extras: string[]; fast: boolean }

export function Estimator({ lang, mode = 'full' }: { lang: Lang; mode?: 'mini' | 'full' }) {
  const id = useId();
  const [s, setS] = useState<State>({ type: mode === 'mini' ? 'kitchen' : 'full', area: mode === 'mini' ? 14 : 120, finish: 'premium', condition: 'fair', extras: [], fast: false });
  const t = projectTypes.find((p) => p.id === s.type)!;

  // a specialty page can link here with ?type=kitchen
  useEffect(() => {
    if (mode !== 'full') return;
    const q = new URLSearchParams(location.search).get('type') as TypeId | null;
    const pt = projectTypes.find((p) => p.id === q);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads the URL once, after hydration
    if (pt) setS((v) => ({ ...v, type: pt.id, area: pt.defaultArea }));
  }, [mode]);

  const r = useMemo(() => estimate(s), [s]);
  const set = <K extends keyof State>(k: K, v: State[K]) => setS((p) => ({ ...p, [k]: v }));
  const pickType = (v: TypeId) => { const pt = projectTypes.find((p) => p.id === v)!; setS((p) => ({ ...p, type: v, area: pt.defaultArea })); };
  const step = t.maxArea > 300 ? 10 : 1;

  const summary = [
    `${ui.type[lang]}: ${t[lang]}`,
    `${ui.area[lang]}: ${num(r.area, lang)} ${ui.m2[lang]}`,
    `${ui.finish[lang]}: ${finishes.find((f) => f.id === s.finish)![lang]}`,
    `${ui.condition[lang]}: ${conditions.find((c) => c.id === s.condition)![lang]}`,
    s.extras.length ? `${ui.extras[lang]}: ${s.extras.map((e) => extras.find((x) => x.id === e)![lang]).join('، ')}` : '',
    s.fast ? fastTrack[lang] : '',
    `${ui.result[lang]}: ${moneyRange(r.low, r.high, lang)}`,
  ].filter(Boolean).join('\n');

  const result = (
    <div className="result" aria-live="polite" aria-atomic="true">
      <p className="result__range">{moneyRange(r.low, r.high, lang)}</p>
      <p className="result__meta">
        <span>{ui.result[lang]} {ui.for[lang]} {t[lang]}</span>
        <span>{num(r.area, lang)} {ui.m2[lang]}</span>
        <span>{lang === 'fa' ? 'حدود' : 'About'} {num(r.weeks, lang)} {ui.weeks[lang]}</span>
      </p>
      {mode === 'full' && (
        <>
          <p className="label">{ui.breakdown[lang]}</p>
          <ul className="parts">
            {r.parts.map((p) => (
              <li key={p.id}>
                <span>{p[lang]}</span>
                <span>{money(p.value, lang)}</span>
                <i style={{ ['--w' as string]: `${Math.round(p.share * 100 / 0.46)}%` }} aria-hidden="true" />
              </li>
            ))}
          </ul>
        </>
      )}
      <small>{ui.note[lang]}</small>
      {mode === 'mini' && (
        <Link className="btn" href={`${href(lang, 'estimate')}?type=${s.type}`} style={{ justifySelf: 'start' }}>{ui.detailed[lang]}</Link>
      )}
    </div>
  );

  const inputs = (
    <div className="est">
      <fieldset>
        <legend>{ui.type[lang]}</legend>
        <div className={mode === 'full' ? 'type-grid' : 'choices'}>
          {projectTypes.filter((p) => mode === 'full' || ['kitchen', 'bathroom', 'full', 'joinery'].includes(p.id)).map((p) => (
            <label key={p.id} className={`choice ${mode === 'full' ? 'choice--pic' : ''}`}>
              <input type="radio" name={`${id}-type`} value={p.id} checked={s.type === p.id} onChange={() => pickType(p.id)} />
              <span>
                {mode === 'full' && <Pic name={p.img} alt="" sizes="64px" />}
                <span style={{ alignSelf: 'center' }}>{p[lang]}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor={`${id}-area`}>{ui.area[lang]}</label>
        <div className="area">
          <input id={`${id}-area`} type="range" min={t.minArea} max={t.maxArea} step={step} value={s.area}
            onChange={(e) => set('area', Number(e.target.value))} aria-valuetext={`${num(s.area, lang)} ${ui.m2[lang]}`} />
          <output htmlFor={`${id}-area`}>{num(s.area, lang)} <small style={{ fontSize: '0.55em' }}>{ui.m2[lang]}</small></output>
        </div>
      </div>

      <fieldset>
        <legend>{ui.finish[lang]}</legend>
        <div className="choices">
          {finishes.map((f) => (
            <label key={f.id} className={`choice ${mode === 'full' ? 'choice--box' : ''}`}>
              <input type="radio" name={`${id}-finish`} value={f.id} checked={s.finish === f.id} onChange={() => set('finish', f.id)} />
              <span>{f[lang]}{mode === 'full' && <small>{f.note[lang]}</small>}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {mode === 'full' && (
        <>
          <fieldset>
            <legend>{ui.condition[lang]}</legend>
            <div className="choices">
              {conditions.map((c) => (
                <label key={c.id} className="choice choice--box">
                  <input type="radio" name={`${id}-cond`} value={c.id} checked={s.condition === c.id} onChange={() => set('condition', c.id)} />
                  <span>{c[lang]}<small>{c.note[lang]}</small></span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>{ui.extras[lang]}</legend>
            <div className="choices">
              {extras.map((x) => (
                <label key={x.id} className="choice">
                  <input type="checkbox" value={x.id} checked={s.extras.includes(x.id)}
                    onChange={(e) => set('extras', e.target.checked ? [...s.extras, x.id] : s.extras.filter((v) => v !== x.id))} />
                  <span>{x[lang]}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>{ui.fast[lang]}</legend>
            <div className="choices">
              <label className="choice"><input type="radio" name={`${id}-fast`} checked={!s.fast} onChange={() => set('fast', false)} /><span>{ui.normal[lang]}</span></label>
              <label className="choice"><input type="radio" name={`${id}-fast`} checked={s.fast} onChange={() => set('fast', true)} /><span>{fastTrack[lang]}</span></label>
            </div>
          </fieldset>
        </>
      )}
    </div>
  );

  if (mode === 'mini') return <div className="mini-est">{inputs}{result}</div>;

  return (
    <>
      <div className="est-layout">
        {inputs}
        {result}
      </div>
      <Inquiry lang={lang} summary={summary} />
    </>
  );
}

function Inquiry({ lang, summary }: { lang: Lang; summary: string }) {
  const id = useId();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'mail' | 'error'>('idle');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget)) as Values;
    const errs = validate(values, { name: ['required'], phone: ['phone'], email: ['email'] }, lang, ['phone', 'email']);
    setErrors(errs);
    if (Object.keys(errs).length) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setStatus('sending');
    const body = `${summary}\n\n${ui.name[lang]}: ${values.name}\n${ui.phone[lang]}: ${values.phone || '-'}\n${ui.email[lang]}: ${values.email || '-'}\n${ui.city[lang]}: ${values.city || '-'}\n${ui.start[lang]}: ${values.start}\n\n${values.message || ''}`;
    try { setStatus(await deliver('estimate', `${ui.subject[lang]}: ${values.name}`, body, { ...values, estimate: summary })); }
    catch { setStatus('error'); }
  };

  const err = (n: string) => errors[n] ? { 'aria-invalid': true as const, 'aria-describedby': `${id}-${n}-e` } : {};

  if (status === 'sent') {
    return (
      <div className="form__done" role="status" style={{ marginTop: 80 }}>
        <p className="h3">{ui.thanks[lang]}</p>
        <p>{ui.thanksBody[lang]}</p>
      </div>
    );
  }

  return (
    <section aria-labelledby={`${id}-h`} style={{ marginTop: 'clamp(80px, 10vw, 150px)' }}>
      <div style={{ display: 'grid', gap: 18, marginBottom: 40, maxWidth: 720 }}>
        <h2 id={`${id}-h`} className="h3">{ui.formTitle[lang]}</h2>
        <p>{ui.formLede[lang]}</p>
      </div>
      <form className="form" noValidate onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor={`${id}-name`}>{ui.name[lang]}</label>
          <input id={`${id}-name`} name="name" autoComplete="name" required {...err('name')} />
          {errors.name && <span className="field__error" id={`${id}-name-e`}>{errors.name}</span>}
        </div>
        <div className="field">
          <label htmlFor={`${id}-phone`}>{ui.phone[lang]}</label>
          <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" {...err('phone')} />
          {errors.phone && <span className="field__error" id={`${id}-phone-e`}>{errors.phone}</span>}
        </div>
        <div className="field">
          <label htmlFor={`${id}-email`}>{ui.email[lang]}</label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" dir="ltr" {...err('email')} />
          {errors.email && <span className="field__error" id={`${id}-email-e`}>{errors.email}</span>}
        </div>
        <div className="field">
          <label htmlFor={`${id}-city`}>{ui.city[lang]}</label>
          <input id={`${id}-city`} name="city" autoComplete="address-level2" />
        </div>
        <div className="field field--full">
          <label htmlFor={`${id}-start`}>{ui.start[lang]}</label>
          <select id={`${id}-start`} name="start" defaultValue={ui.startOpts[lang][1]}>
            {ui.startOpts[lang].map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="field field--full">
          <label htmlFor={`${id}-msg`}>{ui.message[lang]}</label>
          <textarea id={`${id}-msg`} name="message" aria-describedby={`${id}-msg-h`} />
          <span className="field__hint" id={`${id}-msg-h`}>{ui.messageHint[lang]}</span>
        </div>
        <div className="form__actions">
          <button className="btn btn--solid" type="submit" disabled={status === 'sending'}>{status === 'sending' ? formUi.sending[lang] : ui.send[lang]}</button>
          <p className="form__status" role="status">
            {status === 'mail' && formUi.mailOpened[lang]}
            {status === 'error' && formUi.failed[lang]}
          </p>
        </div>
      </form>
    </section>
  );
}
