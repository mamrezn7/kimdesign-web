import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Cormorant_Garamond, Karla } from 'next/font/google';

const display = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-cormorant', display: 'swap' });
const body = Karla({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-karla', display: 'swap' });
const fontClass = `${display.variable} ${body.variable}`;
import '../../globals.css';

export const metadata: Metadata = {
  applicationName: 'kimdesign',
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
    <html lang="en" dir="ltr" className={fontClass} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
