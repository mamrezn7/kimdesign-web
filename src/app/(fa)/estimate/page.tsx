import { metaFor, renderPage } from '@/lib/pages';

export const metadata = metaFor('estimate', 'fa');

export default function Page() {
  return renderPage('estimate', 'fa');
}
