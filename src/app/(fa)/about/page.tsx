import { metaFor, renderPage } from '@/lib/pages';

export const metadata = metaFor('about', 'fa');

export default function Page() {
  return renderPage('about', 'fa');
}
