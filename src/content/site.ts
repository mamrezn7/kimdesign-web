import type { L } from '@/lib/i18n';

// SAMPLE BUSINESS DETAILS: confirm every value below before launch.
export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://kimdesign.ir').replace(/\/$/, ''),
  name: { fa: 'کیم دیزاین', en: 'kimdesign' } as L,
  tagline: { fa: 'معماری و بازسازی', en: 'Architecture and renovation' } as L,
  phone: '+982122000000',
  phoneDisplay: { fa: '۰۲۱ ۲۲۰۰ ۰۰۰۰', en: '+98 21 2200 0000' } as L,
  email: 'hello@kimdesign.ir',
  address: {
    street: { fa: 'خیابان ولیعصر، پلاک ۱۲۰۰', en: '1200 Valiasr Street' } as L,
    city: { fa: 'تهران', en: 'Tehran' } as L,
    country: 'IR',
    postalCode: '1965000000',
  },
  geo: { lat: 35.7915, lng: 51.4128 },
  hours: { fa: 'شنبه تا چهارشنبه، ۹ تا ۱۸ · پنجشنبه ۹ تا ۱۳', en: 'Saturday to Wednesday 9:00–18:00 · Thursday 9:00–13:00' } as L,
  openingHours: ['Sa-We 09:00-18:00', 'Th 09:00-13:00'],
  areaServed: { fa: 'تهران و کرج', en: 'Tehran and Karaj' } as L,
  social: { instagram: 'https://www.instagram.com/kimdesign', linkedin: 'https://www.linkedin.com/company/kimdesign' },
  // Set NEXT_PUBLIC_FORM_ENDPOINT to a form service (Formspree, Basin, your own API) to receive
  // submissions by POST. Without it, the forms open the visitor's mail app with everything filled in.
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || '',
};
