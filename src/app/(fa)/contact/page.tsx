import { metaFor, renderPage } from '@/lib/pages';

export const metadata = metaFor('contact', 'fa');

export default function Page() {
  return renderPage('contact', 'fa');
}
