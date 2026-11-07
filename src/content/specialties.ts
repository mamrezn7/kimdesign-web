import type { L } from '@/lib/i18n';
import type { TypeId } from '@/lib/pricing';

export interface Specialty {
  id: TypeId;
  title: L;
  /** the heading, split so one word can carry the accent weight */
  heading: { before: L; accent: L; after: L };
  short: L;
  body: L;
  includes: L[];
  timeline: L;
  img: string;
  img2: string;
  alt: L;
  alt2: L;
}

// SAMPLE COPY: review with the studio before launch.
export const specialties: Specialty[] = [
  {
    id: 'architecture',
    title: { fa: 'طراحی معماری', en: 'Architectural design' },
    heading: { before: { fa: 'از', en: 'From' }, accent: { fa: 'طرح', en: 'sketch' }, after: { fa: 'تا پروانه', en: 'to permit' } },
    short: { fa: 'نقشه، مدل و پروانه، پیش از هر تخریبی.', en: 'Drawings, models and permits, before anything is taken down.' },
    body: {
      fa: 'هر پروژه با برداشت دقیق وضع موجود شروع می‌شود. بعد طرح اولیه، مدل سه‌بعدی و نقشه‌های اجرایی را آماده می‌کنیم و پرونده را تا گرفتن پروانه از شهرداری پیگیری می‌کنیم. چون همان تیم اجرا را هم بر عهده دارد، نقشه‌ها با بودجه و روش ساخت واقعی هماهنگ‌اند.',
      en: 'Every project starts with a measured survey of what is there. We then draw the concept, build a 3D model and produce the construction drawings, and we carry the file through to a municipal permit. Because the same team builds it, the drawings are priced and detailed for how it will really be made.',
    },
    includes: [
      { fa: 'برداشت و نقشهٔ وضع موجود', en: 'Measured survey and existing-condition drawings' },
      { fa: 'طرح اولیه و مدل سه‌بعدی', en: 'Concept design and 3D model' },
      { fa: 'نقشه‌های اجرایی و جزئیات', en: 'Construction drawings and details' },
      { fa: 'پیگیری پروانه و نظارت', en: 'Permit application and supervision' },
    ],
    timeline: { fa: '۶ تا ۱۲ هفته', en: '6 to 12 weeks' },
    img: 'concrete-facade',
    img2: 'roof-truss',
    alt: { fa: 'نمای بتنی نقش‌دار موزهٔ طراحی معماری در برلین', en: 'The patterned concrete facade of the Museum for Architectural Drawing, Berlin' },
    alt2: { fa: 'نقشهٔ مقطع یک سازهٔ چوبی سنتی', en: 'Section drawing of a traditional timber structure' },
  },
  {
    id: 'full',
    title: { fa: 'بازسازی کامل', en: 'Full renovation' },
    heading: { before: { fa: 'خانه‌ای', en: 'A home' }, accent: { fa: 'از نو', en: 'remade' }, after: { fa: 'ساخته شده', en: 'from within' } },
    short: { fa: 'آپارتمان یا خانه، از تخریب تا تحویل کلید.', en: 'Apartments and houses, from strip-out to handover.' },
    body: {
      fa: 'وقتی یک خانه از داخل بازسازی می‌شود، ترتیب کارها همه چیز است. تخریب، تأسیسات نو، کف، گچ، نجاری و رنگ را با یک برنامهٔ زمانی واحد و یک سرپرست کارگاه پیش می‌بریم، و هر هفته گزارش تصویری پیشرفت کار را برایتان می‌فرستیم.',
      en: 'When a home is rebuilt from the inside, the order of work is everything. Strip-out, new services, floors, plaster, joinery and paint run on one schedule under one site manager, and you get a photo report of progress every week.',
    },
    includes: [
      { fa: 'تخریب و حمل نخاله', en: 'Strip-out and waste removal' },
      { fa: 'برق، لوله‌کشی و گرمایش نو', en: 'New electrics, plumbing and heating' },
      { fa: 'کف، گچ‌کاری و رنگ', en: 'Floors, plaster and paint' },
      { fa: 'کابینت، کمد و درهای سفارشی', en: 'Made-to-measure cabinets, wardrobes and doors' },
    ],
    timeline: { fa: '۱۲ تا ۲۴ هفته', en: '12 to 24 weeks' },
    img: 'loft',
    img2: 'oak-planks',
    alt: { fa: 'فضای باز نشیمن و ناهارخوری با کف جناغی چوبی', en: 'Open living and dining room with a herringbone oak floor' },
    alt2: { fa: 'نمای نزدیک کف پارکت چوبی', en: 'Close view of a parquet floor' },
  },
  {
    id: 'kitchen',
    title: { fa: 'آشپزخانه', en: 'Kitchens' },
    heading: { before: { fa: 'آشپزخانه‌ای', en: 'Kitchens' }, accent: { fa: 'برای', en: 'made for' }, after: { fa: 'زندگی روزمره', en: 'daily life' } },
    short: { fa: 'چیدمان، کابینت، سنگ و نور، با هم طراحی‌شده.', en: 'Layout, cabinets, stone and light, designed together.' },
    body: {
      fa: 'آشپزخانهٔ خوب از چیدمان شروع می‌شود: فاصلهٔ گاز، سینک و یخچال، جای هر وسیله و مسیر نور روز. کابینت‌ها را در کارگاه خودمان می‌سازیم، سنگ را از معدن انتخاب می‌کنیم و تأسیسات را پیش از نصب بازبینی می‌کنیم.',
      en: 'A good kitchen starts with the plan: the distance between hob, sink and fridge, a place for everything and the path of daylight. Cabinets are built in our own workshop, stone is chosen at the yard, and every service is checked before anything is fitted.',
    },
    includes: [
      { fa: 'طراحی چیدمان و نورپردازی', en: 'Layout and lighting design' },
      { fa: 'کابینت سفارشی از کارگاه خودمان', en: 'Bespoke cabinets from our own workshop' },
      { fa: 'سنگ رویه و دیوار', en: 'Stone worktops and splashbacks' },
      { fa: 'نصب لوازم و تأسیسات', en: 'Appliance and services installation' },
    ],
    timeline: { fa: '۴ تا ۸ هفته', en: '4 to 8 weeks' },
    img: 'kitchen',
    img2: 'marble',
    alt: { fa: 'آشپزخانهٔ روشن با کابینت سفید و میز چوبی', en: 'Bright kitchen with white cabinets and a timber table' },
    alt2: { fa: 'رگه‌های سنگ مرمر از نزدیک', en: 'Veined marble up close' },
  },
  {
    id: 'bathroom',
    title: { fa: 'حمام و سرویس', en: 'Bathrooms' },
    heading: { before: { fa: 'حمامی', en: 'Bathrooms' }, accent: { fa: 'آرام', en: 'calm' }, after: { fa: 'و بی‌نشت', en: 'and watertight' } },
    short: { fa: 'عایق‌کاری، کاشی و یراق‌آلات، بی‌دردسر برای سال‌ها.', en: 'Waterproofing, tile and fittings, trouble-free for years.' },
    body: {
      fa: 'زیبایی حمام در کاشی است، اما عمرش در زیر کاشی. پیش از کاشی‌کاری، کف و دیوار را عایق و آزمایش آب می‌کنیم، شیب کف را دقیق می‌گیریم و لوله‌ها را طوری می‌کشیم که بعدها بدون شکستن کاشی قابل دسترسی باشند.',
      en: 'A bathroom looks good because of its tile and lasts because of what is under it. Before tiling we waterproof and flood-test the floor and walls, set the falls precisely, and run pipes so they can be reached later without breaking a single tile.',
    },
    includes: [
      { fa: 'عایق‌کاری و آزمایش آب', en: 'Waterproofing and flood test' },
      { fa: 'کاشی‌کاری و سنگ', en: 'Tiling and stonework' },
      { fa: 'دوش، وان و روشویی', en: 'Showers, baths and vanities' },
      { fa: 'تهویه و گرمایش از کف', en: 'Ventilation and underfloor heating' },
    ],
    timeline: { fa: '۳ تا ۶ هفته', en: '3 to 6 weeks' },
    img: 'bath-green',
    img2: 'bath-tub',
    alt: { fa: 'حمام با کاشی سبز تیره و آینهٔ گرد نورانی', en: 'Bathroom with dark green tile and a round lit mirror' },
    alt2: { fa: 'وان ایستاده روی کف سنگی', en: 'Freestanding bath on a stone floor' },
  },
  {
    id: 'joinery',
    title: { fa: 'نجاری و پله', en: 'Joinery and stairs' },
    heading: { before: { fa: 'چوب،', en: 'Timber,' }, accent: { fa: 'به اندازه', en: 'made' }, after: { fa: 'ساخته شده', en: 'to measure' } },
    short: { fa: 'پله، کمد، در و قفسه، در کارگاه خودمان.', en: 'Stairs, wardrobes, doors and shelving, from our own workshop.' },
    body: {
      fa: 'پله و کمد سفارشی را در کارگاه نجاری خودمان می‌سازیم، از چوب خشک‌شده و با اتصال‌های سنتی. اندازه‌ها را خودمان در محل برمی‌داریم، قطعات را پیش‌مونتاژ می‌کنیم و در کمترین زمان در خانه نصب می‌کنیم.',
      en: 'Stairs and fitted furniture are made in our own joinery workshop, from seasoned timber with traditional joints. We measure on site ourselves, pre-assemble in the workshop and fit in the home in the shortest time possible.',
    },
    includes: [
      { fa: 'پلهٔ چوبی و نرده', en: 'Timber stairs and balustrades' },
      { fa: 'کمد و قفسهٔ توکار', en: 'Built-in wardrobes and shelving' },
      { fa: 'درهای داخلی سفارشی', en: 'Made-to-measure internal doors' },
      { fa: 'پوشش دیوار و سقف چوبی', en: 'Timber wall and ceiling panelling' },
    ],
    timeline: { fa: '۳ تا ۱۰ هفته', en: '3 to 10 weeks' },
    img: 'oak-stair',
    img2: 'spiral-stair',
    alt: { fa: 'پلهٔ چوبی روشن با نردهٔ چوبی', en: 'Light timber stair with a timber balustrade' },
    alt2: { fa: 'پلهٔ مارپیچ چوبی از بالا', en: 'Spiral timber stair seen from above' },
  },
  {
    id: 'extension',
    title: { fa: 'توسعه و سازه', en: 'Extensions and structure' },
    heading: { before: { fa: 'فضای', en: 'More' }, accent: { fa: 'بیشتر', en: 'room' }, after: { fa: 'با سازهٔ مطمئن', en: 'on sound structure' } },
    short: { fa: 'افزودن طبقه یا اتاق، و مقاوم‌سازی سازهٔ موجود.', en: 'Added rooms and storeys, and strengthening what stands.' },
    body: {
      fa: 'افزودن یک اتاق یا طبقه، یا برداشتن یک دیوار باربر، با محاسبات سازه شروع می‌شود. مهندس سازهٔ ما طرح را محاسبه می‌کند، اسکلت فلزی، بتنی یا چوبی را اجرا می‌کنیم و کار را مطابق مقررات ملی ساختمان تحویل می‌دهیم.',
      en: 'Adding a room or a storey, or taking out a load-bearing wall, starts with structural calculations. Our structural engineer designs it, we build the steel, concrete or timber frame, and the work is handed over to the national building regulations.',
    },
    includes: [
      { fa: 'محاسبات و طراحی سازه', en: 'Structural calculations and design' },
      { fa: 'اسکلت فلزی، بتنی یا چوبی', en: 'Steel, concrete or timber frame' },
      { fa: 'مقاوم‌سازی لرزه‌ای', en: 'Seismic strengthening' },
      { fa: 'نما و عایق حرارتی', en: 'Facade and thermal insulation' },
    ],
    timeline: { fa: '۱۲ تا ۳۰ هفته', en: '12 to 30 weeks' },
    img: 'timber-fins',
    img2: 'framing',
    alt: { fa: 'نمای در حال ساخت با تیغه‌های چوبی عمودی', en: 'A facade under construction with vertical timber fins' },
    alt2: { fa: 'کارگری که اسکلت فلزی سبک را اندازه می‌گیرد', en: 'A worker measuring a light steel frame' },
  },
];
