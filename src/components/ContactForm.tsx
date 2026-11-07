'use client';

import { useId, useState, type FormEvent } from 'react';
import type { Lang } from '@/lib/i18n';
import { deliver, formUi, validate, type Values } from './forms';

const ui = {
  name: { fa: 'نام و نام خانوادگی', en: 'Full name' },
  email: { fa: 'ایمیل', en: 'Email' },
  phone: { fa: 'تلفن', en: 'Phone' },
  topic: { fa: 'موضوع', en: 'Subject' },
  topics: {
    fa: ['پروژهٔ جدید', 'بازدید محل', 'همکاری', 'سؤال دربارهٔ پروژهٔ جاری', 'موضوع دیگر'],
    en: ['A new project', 'A site visit', 'Working with us', 'A project in progress', 'Something else'],
  },
  message: { fa: 'پیام', en: 'Message' },
  send: { fa: 'ارسال پیام', en: 'Send message' },
  thanks: { fa: 'پیام شما رسید', en: 'Message received' },
  thanksBody: { fa: 'ظرف یک روز کاری پاسخ می‌دهیم.', en: 'We reply within one working day.' },
  subject: { fa: 'پیام از وب‌سایت', en: 'Website message' },
};

export function ContactForm({ lang }: { lang: Lang }) {
  const id = useId();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'mail' | 'error'>('idle');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget)) as Values;
    const errs = validate(values, { name: ['required'], email: ['required', 'email'], phone: ['phone'], message: ['required'] }, lang);
    setErrors(errs);
    if (Object.keys(errs).length) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setStatus('sending');
    const body = `${ui.name[lang]}: ${values.name}\n${ui.email[lang]}: ${values.email}\n${ui.phone[lang]}: ${values.phone || '-'}\n${ui.topic[lang]}: ${values.topic}\n\n${values.message}`;
    try { setStatus(await deliver('contact', `${ui.subject[lang]}: ${values.topic}`, body, values)); }
    catch { setStatus('error'); }
  };
  const err = (n: string) => (errors[n] ? { 'aria-invalid': true as const, 'aria-describedby': `${id}-${n}-e` } : {});
  const msg = (n: string) => errors[n] && <span className="field__error" id={`${id}-${n}-e`}>{errors[n]}</span>;

  if (status === 'sent') {
    return (
      <div className="form__done" role="status">
        <p className="h3">{ui.thanks[lang]}</p>
        <p>{ui.thanksBody[lang]}</p>
      </div>
    );
  }

  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor={`${id}-name`}>{ui.name[lang]}</label>
        <input id={`${id}-name`} name="name" autoComplete="name" required {...err('name')} />{msg('name')}
      </div>
      <div className="field">
        <label htmlFor={`${id}-email`}>{ui.email[lang]}</label>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" dir="ltr" required {...err('email')} />{msg('email')}
      </div>
      <div className="field">
        <label htmlFor={`${id}-phone`}>{ui.phone[lang]}</label>
        <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" {...err('phone')} />{msg('phone')}
      </div>
      <div className="field">
        <label htmlFor={`${id}-topic`}>{ui.topic[lang]}</label>
        <select id={`${id}-topic`} name="topic">{ui.topics[lang].map((o) => <option key={o}>{o}</option>)}</select>
      </div>
      <div className="field field--full">
        <label htmlFor={`${id}-msg`}>{ui.message[lang]}</label>
        <textarea id={`${id}-msg`} name="message" required {...err('message')} />{msg('message')}
      </div>
      <div className="form__actions">
        <button className="btn btn--solid" type="submit" disabled={status === 'sending'}>{status === 'sending' ? formUi.sending[lang] : ui.send[lang]}</button>
        <p className="form__status" role="status">
          {status === 'mail' && formUi.mailOpened[lang]}
          {status === 'error' && formUi.failed[lang]}
        </p>
      </div>
    </form>
  );
}
