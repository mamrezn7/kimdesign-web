import { metaFor, renderPage } from '@/lib/pages';

export const metadata = metaFor('estimate', 'en');

export default function Page() {
  return renderPage('estimate', 'en');
}
