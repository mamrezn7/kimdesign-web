import type { L } from '@/lib/i18n';
import type { TypeId } from '@/lib/pricing';

export interface Project {
  id: string;
  type: TypeId;
  title: L;
  place: L;
  year: number;
  area: number;
  weeks: number;
  summary: L;
  story: L;
  scope: L[];
  media: { img: string; alt: L }[];
}

// SAMPLE PROJECTS: placeholders so the page is seen at full density.
// Replace each with a real job and the studio's own photographs before launch.
export const projects: Project[] = [
  {
    id: 'niavaran-loft',
    type: 'full',
    title: { fa: 'لافت نیاوران', en: 'Niavaran loft' },
    place: { fa: 'نیاوران، تهران', en: 'Niavaran, Tehran' },
    year: 2025, area: 180, weeks: 16,
    summary: { fa: 'یک طبقهٔ اداری قدیمی که به خانه‌ای روشن و باز تبدیل شد.', en: 'A former office floor turned into one bright, open home.' },
    story: {
      fa: 'دیوارهای داخلی برداشته شد تا نور پنجره‌های بلند به عمق خانه برسد. کف جناغی بلوط روی گرمایش از کف اجرا شد، تأسیسات سقف عمداً نمایان ماند و آشپزخانه و ناهارخوری در یک فضای پیوسته کنار هم نشستند.',
      en: 'Internal walls came down so the light from the tall windows could reach the back of the plan. A herringbone oak floor went down over underfloor heating, the ceiling services were left exposed on purpose, and kitchen and dining now share one continuous room.',
    },
    scope: [
      { fa: 'برداشتن دیوارهای غیرباربر', en: 'Non-load-bearing walls removed' },
      { fa: 'کف جناغی بلوط و گرمایش از کف', en: 'Herringbone oak over underfloor heating' },
      { fa: 'برق و نورپردازی نو', en: 'New electrics and lighting' },
    ],
    media: [
      { img: 'loft', alt: { fa: 'نشیمن و ناهارخوری باز با پنجره‌های بلند', en: 'Open living and dining room with tall windows' } },
      { img: 'oak-planks', alt: { fa: 'جزئیات کف چوبی', en: 'Detail of the timber floor' } },
      { img: 'carpenter', alt: { fa: 'نجار با کمربند ابزار در حال کار', en: 'A carpenter at work with a tool belt' } },
    ],
  },
  {
    id: 'zafaraniyeh-bath',
    type: 'bathroom',
    title: { fa: 'حمام کاشی سبز', en: 'Green tile bathroom' },
    place: { fa: 'زعفرانیه، تهران', en: 'Zafaraniyeh, Tehran' },
    year: 2025, area: 7, weeks: 4,
    summary: { fa: 'حمامی کوچک با کاشی سبز تیره و آینه‌های نورانی.', en: 'A small bathroom in deep green tile with lit mirrors.' },
    story: {
      fa: 'کاشی‌های براق سبز تیره در کنار رویهٔ چوبی، فضای کوچک را گرم و عمیق کرده است. دوش بدون قاب با کف هم‌سطح اجرا شد و همهٔ لوله‌ها از پشت یک دریچهٔ پنهان در دسترس‌اند.',
      en: 'Glazed deep-green tile next to a timber counter makes the small room feel warm and deep. The frameless shower sits on a level floor, and every pipe can be reached through a hidden hatch.',
    },
    scope: [
      { fa: 'عایق‌کاری و آزمایش آب', en: 'Waterproofing and flood test' },
      { fa: 'دوش هم‌سطح با کف', en: 'Level-access shower' },
      { fa: 'آینه و نور سفارشی', en: 'Custom mirrors and lighting' },
    ],
    media: [
      { img: 'bath-green', alt: { fa: 'حمام با کاشی سبز و آینهٔ گرد', en: 'Bathroom with green tile and a round mirror' } },
      { img: 'bath-vanity', alt: { fa: 'روشویی با رویهٔ سنگی', en: 'Vanity with a stone top' } },
    ],
  },
  {
    id: 'saadat-abad-kitchen',
    type: 'kitchen',
    title: { fa: 'آشپزخانهٔ خانوادگی', en: 'Family kitchen' },
    place: { fa: 'سعادت‌آباد، تهران', en: 'Saadat Abad, Tehran' },
    year: 2024, area: 18, weeks: 6,
    summary: { fa: 'آشپزخانه‌ای بلند و روشن برای خانواده‌ای پنج‌نفره.', en: 'A long, bright kitchen for a family of five.' },
    story: {
      fa: 'آشپزخانهٔ بسته به سمت پنجره باز شد و یک ردیف کابینت بلند، همهٔ وسایل را پنهان کرد. رویه‌ها از سنگ مرمر است و میز چوبی وسط، جای صبحانه و تکالیف بچه‌هاست.',
      en: 'The closed kitchen was opened towards the window, and one long run of tall cabinets now hides every appliance. The worktops are marble, and the timber table in the middle is where breakfast and homework happen.',
    },
    scope: [
      { fa: 'کابینت سفارشی تمام‌قد', en: 'Full-height bespoke cabinets' },
      { fa: 'رویهٔ مرمر', en: 'Marble worktops' },
      { fa: 'جابه‌جایی لوله‌کشی و گاز', en: 'Plumbing and gas relocated' },
    ],
    media: [
      { img: 'kitchen', alt: { fa: 'آشپزخانهٔ سفید با میز چوبی', en: 'White kitchen with a timber table' } },
      { img: 'marble', alt: { fa: 'سنگ مرمر رویه', en: 'The marble of the worktops' } },
    ],
  },
  {
    id: 'elahiyeh-bath',
    type: 'bathroom',
    title: { fa: 'حمام سنگ و بلوط', en: 'Stone and oak bathroom' },
    place: { fa: 'الهیه، تهران', en: 'Elahiyeh, Tehran' },
    year: 2024, area: 14, weeks: 5,
    summary: { fa: 'حمام اصلی با وان ایستاده و کف سنگی گرم.', en: 'A main bathroom with a freestanding bath on warm stone.' },
    story: {
      fa: 'کف سنگی بزرگ‌اندازه روی گرمایش از کف اجرا شد و کمدهای بلوط روشن، همهٔ وسایل را در خود جا دادند. وان ایستاده رو به پنجره قرار گرفت تا نور صبح مستقیم به آن برسد.',
      en: 'Large-format stone went down over underfloor heating, and pale oak cupboards hold everything. The freestanding bath faces the window so it catches the morning light.',
    },
    scope: [
      { fa: 'کف سنگی با گرمایش از کف', en: 'Stone floor with underfloor heating' },
      { fa: 'کمدهای بلوط سفارشی', en: 'Bespoke oak cupboards' },
      { fa: 'وان ایستاده و دوش جدا', en: 'Freestanding bath and separate shower' },
    ],
    media: [
      { img: 'bath-tub', alt: { fa: 'وان ایستاده روی کف سنگی', en: 'Freestanding bath on a stone floor' } },
      { img: 'bath-oak', alt: { fa: 'کمدهای بلوط روشن کنار پنجره', en: 'Pale oak cupboards by the window' } },
    ],
  },
  {
    id: 'lavasan-stair',
    type: 'joinery',
    title: { fa: 'پلهٔ بلوط', en: 'Oak stair' },
    place: { fa: 'لواسان', en: 'Lavasan' },
    year: 2024, area: 22, weeks: 7,
    summary: { fa: 'پله‌ای چوبی که سه طبقهٔ یک ویلا را به هم می‌دوزد.', en: 'A timber stair stitching the three floors of a villa together.' },
    story: {
      fa: 'پله‌ها در کارگاه ساخته و پیش‌مونتاژ شدند و نصب در محل تنها نه روز طول کشید. پاخورها از بلوط یکپارچه است و نرده‌ها با اتصال فاق و زبانه، بدون پیچ پیدا، اجرا شده‌اند.',
      en: 'The flights were made and pre-assembled in the workshop, and fitting on site took nine days. Treads are solid oak and the balustrade is mortise-and-tenon jointed, with no visible screws.',
    },
    scope: [
      { fa: 'پلهٔ بلوط یکپارچه', en: 'Solid oak stair' },
      { fa: 'نردهٔ چوبی با اتصال سنتی', en: 'Traditionally jointed balustrade' },
      { fa: 'پیش‌مونتاژ در کارگاه', en: 'Pre-assembled in the workshop' },
    ],
    media: [
      { img: 'oak-stair', alt: { fa: 'پلهٔ چوبی روشن', en: 'A light timber stair' } },
      { img: 'spiral-stair', alt: { fa: 'پلهٔ مارپیچ از بالا', en: 'A spiral stair seen from above' } },
      { img: 'gallery-stair', alt: { fa: 'نردهٔ چوبی و فلزی در فضای دوطبقه', en: 'A timber and iron balustrade over a double-height room' } },
    ],
  },
  {
    id: 'karaj-extension',
    type: 'extension',
    title: { fa: 'توسعهٔ چوبی', en: 'Timber extension' },
    place: { fa: 'کرج', en: 'Karaj' },
    year: 2023, area: 65, weeks: 22,
    summary: { fa: 'یک طبقهٔ تازه با سازهٔ سبک و نمای تیغه‌ای چوبی.', en: 'A new storey on a light frame, with a timber-fin facade.' },
    story: {
      fa: 'برای آنکه بار اضافه روی سازهٔ قدیمی کم بماند، طبقهٔ جدید با اسکلت سبک اجرا شد و ستون‌های موجود مقاوم‌سازی شدند. نمای تیغه‌ای چوبی نور تند غرب را می‌شکند و به ساختمان چهره‌ای تازه می‌دهد.',
      en: 'To keep the extra load on the old structure low, the new storey went up on a light frame and the existing columns were strengthened. The timber-fin facade breaks the hard western light and gives the building a new face.',
    },
    scope: [
      { fa: 'محاسبه و مقاوم‌سازی سازه', en: 'Structural design and strengthening' },
      { fa: 'اسکلت سبک طبقهٔ جدید', en: 'Light frame for the new storey' },
      { fa: 'نمای تیغه‌ای چوبی', en: 'Timber-fin facade' },
    ],
    media: [
      { img: 'timber-fins', alt: { fa: 'نمای تیغه‌ای چوبی در حال اجرا', en: 'The timber-fin facade going up' } },
      { img: 'framing', alt: { fa: 'اجرای اسکلت فلزی سبک', en: 'The light steel frame going up' } },
      { img: 'rebar', alt: { fa: 'آرماتوربندی در ارتفاع', en: 'Reinforcement being tied at height' } },
    ],
  },
];
