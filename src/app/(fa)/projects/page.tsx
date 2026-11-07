import { metaFor, renderPage } from '@/lib/pages';

export const metadata = metaFor('projects', 'fa');

export default function Page() {
  return renderPage('projects', 'fa');
}
