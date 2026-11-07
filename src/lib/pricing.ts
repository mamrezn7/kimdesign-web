// kimdesign: price estimation data.
// MOCK VALUES: replace every number here with the studio's real rates before launch.
// All money values are in millions of Toman (1 = 1,000,000 Toman). Areas are in square metres.
// Used by the estimator (in the browser) and by the specialties page (at build time).

export type FinishId = 'standard' | 'premium' | 'luxury';
export type TypeId = 'full' | 'kitchen' | 'bathroom' | 'architecture' | 'joinery' | 'extension';
export interface ProjectType { id: TypeId; rate: Record<FinishId, number>; minArea: number; maxArea: number; defaultArea: number; weeks: [number, number]; fa: string; en: string; img: string }
export interface Extra { id: string; perM2?: number; pct?: number; fa: string; en: string }
export interface Input { type?: TypeId; area?: number; finish?: FinishId; condition?: string; extras?: string[]; fast?: boolean }

export const currency = {
  unit: 1_000_000,            // the numbers below are multiplied by this
  fa: 'تومان',
  en: 'Toman',
  round: 10_000_000,          // results are rounded to the nearest 10 million
};

// Rate per square metre for each project type, by finish level.
export const projectTypes: ProjectType[] = [
  { id: 'full',         rate: { standard: 18,  premium: 28,  luxury: 45 },  minArea: 40, maxArea: 600, defaultArea: 120, weeks: [10, 0.09],
    fa: 'بازسازی کامل', en: 'Full renovation', img: 'loft' },
  { id: 'kitchen',      rate: { standard: 34,  premium: 55,  luxury: 88 },  minArea: 6,  maxArea: 60,  defaultArea: 14,  weeks: [4, 0.25],
    fa: 'آشپزخانه', en: 'Kitchen', img: 'kitchen' },
  { id: 'bathroom',     rate: { standard: 40,  premium: 64,  luxury: 98 },  minArea: 3,  maxArea: 30,  defaultArea: 6,   weeks: [3, 0.4],
    fa: 'حمام و سرویس', en: 'Bathroom', img: 'bath-green' },
  { id: 'architecture', rate: { standard: 1.4, premium: 2.2, luxury: 3.6 }, minArea: 60, maxArea: 2000, defaultArea: 250, weeks: [6, 0.02],
    fa: 'طراحی معماری', en: 'Architectural design', img: 'concrete-facade' },
  { id: 'joinery',      rate: { standard: 22,  premium: 34,  luxury: 52 },  minArea: 4,  maxArea: 80,  defaultArea: 12,  weeks: [3, 0.15],
    fa: 'نجاری و پله', en: 'Joinery and stairs', img: 'oak-stair' },
  { id: 'extension',    rate: { standard: 30,  premium: 44,  luxury: 68 },  minArea: 15, maxArea: 400, defaultArea: 45,  weeks: [12, 0.12],
    fa: 'توسعه و سازه', en: 'Extension and structure', img: 'timber-fins' },
];

export const finishes: { id: FinishId; fa: string; en: string; note: { fa: string; en: string } }[] = [
  { id: 'standard', fa: 'استاندارد', en: 'Standard', note: { fa: 'مصالح باکیفیت داخلی، جزئیات ساده', en: 'Quality local materials, simple detailing' } },
  { id: 'premium',  fa: 'ممتاز',     en: 'Premium',  note: { fa: 'سنگ و چوب طبیعی، یراق‌آلات وارداتی', en: 'Natural stone and timber, imported fittings' } },
  { id: 'luxury',   fa: 'لوکس',      en: 'Luxury',   note: { fa: 'ساخت سفارشی، مصالح کمیاب، جزئیات دستی', en: 'Made to order, rare materials, hand-finished details' } },
];

// Condition of what is there now. Multiplies the base cost.
export const conditions = [
  { id: 'good', factor: 1.0,  fa: 'خوب',     en: 'Good',  note: { fa: 'فقط تعویض نازک‌کاری', en: 'Surfaces only' } },
  { id: 'fair', factor: 1.12, fa: 'متوسط',   en: 'Fair',  note: { fa: 'بخشی از تأسیسات نو می‌شود', en: 'Some services replaced' } },
  { id: 'poor', factor: 1.28, fa: 'فرسوده',  en: 'Poor',  note: { fa: 'تخریب تا سفت‌کاری', en: 'Stripped back to the shell' } },
];

// Extras. perM2 adds a rate per square metre; pct adds a share of the subtotal.
export const extras: Extra[] = [
  { id: 'demolition', perM2: 1.6, fa: 'تخریب و حمل نخاله', en: 'Demolition and waste removal' },
  { id: 'electrical', perM2: 2.4, fa: 'سیم‌کشی برق نو',     en: 'New electrical wiring' },
  { id: 'plumbing',   perM2: 2.9, fa: 'لوله‌کشی نو',        en: 'New plumbing' },
  { id: 'hvac',       perM2: 3.6, fa: 'گرمایش و سرمایش',    en: 'Heating and cooling' },
  { id: 'permits',    pct: 0.06,  fa: 'پروانه و نظارت',     en: 'Permits and supervision' },
];

// How the total divides, for the breakdown shown under the estimate.
export const split: { id: string; share: number; fa: string; en: string }[] = [
  { id: 'materials', share: 0.46, fa: 'مصالح',        en: 'Materials' },
  { id: 'labour',    share: 0.34, fa: 'دستمزد',       en: 'Labour' },
  { id: 'design',    share: 0.08, fa: 'طراحی و مدیریت', en: 'Design and management' },
  { id: 'reserve',   share: 0.12, fa: 'ذخیرهٔ پیش‌بینی‌نشده', en: 'Contingency' },
];

export const fastTrack = { factor: 1.15, fa: 'اجرای فوری', en: 'Fast-track schedule' };
export const spread = 0.12; // the range shown is ±12% around the estimate

export function estimate({ type = 'full', area, finish = 'standard', condition = 'good', extras: picked = [], fast = false }: Input = {}) {
  const t = projectTypes.find((p) => p.id === type) || projectTypes[0];
  const a = Math.min(t.maxArea, Math.max(t.minArea, Number(area) || t.defaultArea));
  const c = conditions.find((x) => x.id === condition) || conditions[0];
  let base = a * t.rate[finish] * c.factor;
  let add = 0;
  for (const id of picked) {
    const e = extras.find((x) => x.id === id);
    if (!e) continue;
    if (e.perM2) add += e.perM2 * a;
  }
  let subtotal = base + add;
  for (const id of picked) {
    const e = extras.find((x) => x.id === id);
    if (e && e.pct) subtotal += subtotal * e.pct;
  }
  if (fast) subtotal *= fastTrack.factor;
  const total = subtotal * currency.unit;
  const r = currency.round;
  const low = Math.max(r, Math.round((total * (1 - spread)) / r) * r);
  const high = Math.round((total * (1 + spread)) / r) * r;
  const mid = Math.round(total / r) * r;
  const weeks = Math.max(2, Math.round((t.weeks[0] + t.weeks[1] * a) * (fast ? 0.8 : 1) * (c.factor > 1.1 ? 1.15 : 1)));
  return { type: t, area: a, low, high, mid, weeks, parts: split.map((s) => ({ ...s, value: Math.round((mid * s.share) / r) * r })) };
}

// Lowest per-square-metre price for a type, in Toman (used for "from" prices).
export function fromRate(typeId: TypeId) {
  const t = projectTypes.find((p) => p.id === typeId);
  return t ? t.rate.standard * currency.unit : 0;
}
