import manifest from '@/lib/images.generated.json';

type Entry = { width: number; height: number; widths: number[]; placeholder: string };
const images = manifest as Record<string, Entry>;

interface Props {
  name: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/** A responsive, pre-optimised picture with fixed dimensions (no layout shift). */
export function Pic({ name, alt, sizes = '(max-width: 760px) 100vw, 50vw', priority = false, className }: Props) {
  const img = images[name];
  if (!img) {
    if (process.env.NODE_ENV !== 'production') console.warn(`Pic: no image "${name}"`);
    return null;
  }
  const srcSet = img.widths.map((w) => `/img/${name}-${w}.webp ${w}w`).join(', ');
  const fallback = img.widths.find((w) => w >= 960) ?? img.widths[img.widths.length - 1];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={`/img/${name}-${fallback}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={img.width}
      height={img.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      style={{ backgroundImage: `url(${img.placeholder})`, backgroundSize: 'cover' }}
    />
  );
}

export const hasImage = (name: string) => Boolean(images[name]);
