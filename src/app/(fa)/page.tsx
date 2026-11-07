import { metaFor, renderPage } from '@/lib/pages';

export const metadata = metaFor('home', 'fa');

export default function Page() {
  return renderPage('home', 'fa');
}
