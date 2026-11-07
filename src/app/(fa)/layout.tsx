import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Markazi_Text, Vazirmatn } from 'next/font/google';

const body = Vazirmatn({ subsets: ['arabic', 'latin'], variable: '--font-vazirmatn', display: 'swap' });
const accent = Markazi_Text({ subsets: ['arabic', 'latin'], variable: '--font-markazi', display: 'swap' });
const fontClass = `${body.variable} ${accent.variable}`;
import '../globals.css';

export const metadata: Metadata = {
  applicationName: 'کیم دیزاین',
  icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
  manifest: '/manifest.webmanifest',
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf7f1' },
    { media: '(prefers-color-scheme: dark)', color: '#111a22' },
  ],
};

// Runs before first paint: marks JS as available and applies a saved light/dark choice, so there is no flash.
const boot = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('kd-theme');if(t==='dark'||t==='light')d.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={fontClass} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
