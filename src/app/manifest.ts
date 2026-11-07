import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'کیم دیزاین · kimdesign',
    short_name: 'kimdesign',
    description: 'معماری و بازسازی · Architecture and renovation',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf7f1',
    theme_color: '#0b406f',
    lang: 'fa',
    dir: 'rtl',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }, { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  };
}
