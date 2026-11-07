import { metaFor, renderPage } from '@/lib/pages';

export const metadata = metaFor('projects', 'en');

export default function Page() {
  return renderPage('projects', 'en');
}
