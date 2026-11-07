import Link from 'next/link';
import { href, type Lang } from '@/lib/i18n';
import { Pic } from './Pic';

const homeName = { fa: 'خانه', en: 'Home' };

/** The framed first screen of an inner page: same frame and furniture as the home hero, shorter. */
export function PageHero({ lang, title, lede, picA, picB, altA, altB, crumb }: {
  lang: Lang; title: string; lede: string; picA?: string; picB: string; altA?: string; altB: string; crumb: string;
}) {
  return (
    <div className="frame">
      <div className="frame__card">
        <div className="hero hero--page">
          {picA && (
            <div className="hero__pic-a load-in load-in--2"><Pic name={picA} alt={altA || ''} sizes="(max-width: 760px) 1px, 14vw" priority /></div>
          )}
          <div className="hero__pic-b"><Pic name={picB} alt={altB} sizes="(max-width: 760px) 100vw, 30vw" priority /></div>
          <div className="hero__text">
            <nav aria-label={lang === 'fa' ? 'مسیر صفحه' : 'Breadcrumb'}>
              <ol className="crumbs">
                <li><Link href={href(lang, 'home')}>{homeName[lang]}</Link></li>
                <li aria-current="page">{crumb}</li>
              </ol>
            </nav>
            <h1 className="display display--hero load-in">{title}</h1>
            <p className="hero__lede load-in load-in--2">{lede}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
