import { site } from '@/content/site';
import type { Lang } from '@/lib/i18n';

export type Values = Record<string, string>;

export const formUi = {
  required: { fa: 'این بخش را پر کنید.', en: 'Please fill this in.' },
  email: { fa: 'نشانی ایمیل درست نیست.', en: 'That email address does not look right.' },
  phone: { fa: 'شمارهٔ تلفن را با پیش‌شماره بنویسید.', en: 'Please write the phone number with its area code.' },
  contactOne: { fa: 'ایمیل یا شمارهٔ تلفن را بنویسید.', en: 'Please give an email address or a phone number.' },
  sending: { fa: 'در حال ارسال…', en: 'Sending…' },
  failed: { fa: 'ارسال نشد. لطفاً دوباره تلاش کنید یا مستقیم ایمیل بزنید.', en: 'It did not send. Please try again, or email us directly.' },
  mailOpened: { fa: 'برنامهٔ ایمیل شما با پیام آماده باز شد. کافی است آن را بفرستید.', en: 'Your email app has opened with the message ready. Just press send.' },
};

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
// accepts Persian or Latin digits, spaces, dashes, brackets and a leading +
const phoneOk = (v: string) => toLatinDigits(v).replace(/[^\d]/g, '').length >= 8;
export const toLatinDigits = (v: string) => v.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))).replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));

export function validate(values: Values, rules: Record<string, ('required' | 'email' | 'phone')[]>, lang: Lang, needOneOf?: [string, string]) {
  const errors: Record<string, string> = {};
  for (const [name, list] of Object.entries(rules)) {
    const v = (values[name] || '').trim();
    for (const r of list) {
      if (r === 'required' && !v) { errors[name] = formUi.required[lang]; break; }
      if (r === 'email' && v && !emailOk(v)) { errors[name] = formUi.email[lang]; break; }
      if (r === 'phone' && v && !phoneOk(v)) { errors[name] = formUi.phone[lang]; break; }
    }
  }
  if (needOneOf && !values[needOneOf[0]]?.trim() && !values[needOneOf[1]]?.trim()) {
    errors[needOneOf[0]] = errors[needOneOf[0]] || formUi.contactOne[lang];
  }
  return errors;
}

/** Send to the configured endpoint, or fall back to the visitor's mail app. */
export async function deliver(kind: 'contact' | 'estimate', subject: string, body: string, values: Values): Promise<'sent' | 'mail'> {
  if (site.formEndpoint) {
    const res = await fetch(site.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ kind, subject, ...values, message_full: body }),
    });
    if (!res.ok) throw new Error(String(res.status));
    return 'sent';
  }
  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return 'mail';
}
