import { metaFor, renderPage } from '@/lib/pages';

export const metadata = metaFor('home', 'en');

export default function Page() {
  return renderPage('home', 'en');
}
