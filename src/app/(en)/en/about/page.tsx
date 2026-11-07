import { metaFor, renderPage } from '@/lib/pages';

export const metadata = metaFor('about', 'en');

export default function Page() {
  return renderPage('about', 'en');
}
