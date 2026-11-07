import { metaFor, renderPage } from '@/lib/pages';

export const metadata = metaFor('credits', 'fa');

export default function Page() {
  return renderPage('credits', 'fa');
}
