// Turns the source pictures in assets-src/img into responsive WebP files in public/img,
// writes their sizes to src/lib/images.generated.json, makes the Open Graph image,
// and copies the picture credits to src/content/credits.generated.json.
import { readdirSync, mkdirSync, writeFileSync, existsSync, readFileSync, statSync } from 'node:fs';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const SRC = 'assets-src/img';
const OUT = 'public/img';
const WIDTHS = [480, 960, 1600];
mkdirSync(OUT, { recursive: true });
mkdirSync('public/og', { recursive: true });

const manifest = {};
const files = readdirSync(SRC).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
for (const file of files) {
  const { name } = parse(file);
  const input = join(SRC, file);
  const meta = await sharp(input).metadata();
  const widths = WIDTHS.filter((w) => w < meta.width);
  if (!widths.length || widths[widths.length - 1] < Math.min(meta.width, 1600)) widths.push(Math.min(meta.width, 1600));
  for (const w of widths) {
    const out = join(OUT, `${name}-${w}.webp`);
    if (existsSync(out) && statSync(out).mtimeMs > statSync(input).mtimeMs) continue;
    await sharp(input).rotate().resize({ width: w }).webp({ quality: 74 }).toFile(out);
  }
  const ratio = meta.height / meta.width;
  // a tiny blurred colour placeholder, so space and tone are there before the picture arrives
  const tiny = await sharp(input).resize(12).webp({ quality: 40 }).toBuffer();
  manifest[name] = {
    width: widths[widths.length - 1],
    height: Math.round(widths[widths.length - 1] * ratio),
    widths,
    placeholder: `data:image/webp;base64,${tiny.toString('base64')}`,
  };
}
writeFileSync('src/lib/images.generated.json', JSON.stringify(manifest, null, 1));

// Open Graph / social preview image (1200 × 630)
const ogSrc = ['loft', 'kitchen', 'bath-green'].map((n) => files.find((f) => parse(f).name === n)).find(Boolean);
if (ogSrc) await sharp(join(SRC, ogSrc)).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 80 }).toFile('public/og/kimdesign.jpg');

const creditsFile = join(SRC, 'credits.json');
const credits = existsSync(creditsFile) ? JSON.parse(readFileSync(creditsFile, 'utf8')) : [];
const list = (Array.isArray(credits) ? credits : credits.items || Object.values(credits))
  .filter((c) => c && (c.file || c.name))
  .map((c) => ({
    file: parse(c.file || c.name).name,
    title: c.title, creator: c.creator || undefined, license: c.licenseLabel || c.license, licenseUrl: c.licenseUrl, page: c.page, credit: c.credit,
  }))
  .filter((c) => manifest[c.file]);
writeFileSync('src/content/credits.generated.json', JSON.stringify(list, null, 1));
console.log(`images: ${Object.keys(manifest).length} pictures, ${list.length} credits`);
