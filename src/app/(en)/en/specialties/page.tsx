import { metaFor, renderPage } from '@/lib/pages';

export const metadata = metaFor('specialties', 'en');

export default function Page() {
  return renderPage('specialties', 'en');
}
