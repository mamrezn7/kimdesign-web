import { metaFor, renderPage } from '@/lib/pages';

export const metadata = metaFor('specialties', 'fa');

export default function Page() {
  return renderPage('specialties', 'fa');
}
