'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { href, type Lang, type RouteKey } from '@/lib/i18n';
import { specialties } from '@/content/specialties';
import { projects } from '@/content/projects';
import { Mark } from './Mark';
import { MoonIcon, SunIcon } from './icons';

const ui = {
  menu: { fa: 'منو', en: 'Menu' },
  close: { fa: 'بستن', en: 'Close' },
  estimate: { fa: 'برآورد هزینه', en: 'Get an estimate' },
  estimateShort: { fa: 'برآورد', en: 'Estimate' },
  home: { fa: 'صفحهٔ اصلی کیم دیزاین', en: 'kimdesign home' },
  theme: { fa: 'تغییر حالت روشن و تیره', en: 'Switch light and dark mode' },
  other: { fa: 'English', en: 'فارسی' },
  otherShort: { fa: 'EN', en: 'فا' },
  nav: { fa: 'منوی اصلی', en: 'Main menu' },
  studio: { fa: 'استودیو', en: 'Studio' },
  about: { fa: 'دربارهٔ ما', en: 'About us' },
  heritage: { fa: 'ریشه‌ها', en: 'Our roots' },
  process: { fa: 'روند کار', en: 'How we work' },
  values: { fa: 'اصول ما', en: 'What we hold to' },
  specs: { fa: 'تخصص‌ها', en: 'Specialties' },
  work: { fa: 'پروژه‌ها', en: 'Projects' },
  allWork: { fa: 'همهٔ پروژه‌ها', en: 'All projects' },
  contact: { fa: 'تماس', en: 'Contact' },
  faq: { fa: 'پرسش‌ها', en: 'Questions' },
  homeShort: { fa: 'خانه', en: 'Home' },
};

export function Bar({ lang, route, hideAtTop = false }: { lang: Lang; route: RouteKey; hideAtTop?: boolean }) {
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(hideAtTop);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const other: Lang = lang === 'fa' ? 'en' : 'fa';

  // the bar slides in once the first screen has been scrolled past (home only, as in the reference)
  useEffect(() => {
    if (!hideAtTop) return;
    const onScroll = () => setAtTop(window.scrollY < window.innerHeight * 0.55);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [hideAtTop]);

  const close = useCallback(() => { setOpen(false); btnRef.current?.focus(); }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = 'hidden';
    const first = menuRef.current?.querySelector<HTMLElement>('a');
    first?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab' && menuRef.current) {
        const items = [btnRef.current, ...menuRef.current.querySelectorAll<HTMLElement>('a')].filter(Boolean) as HTMLElement[];
        const i = items.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
        else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.documentElement.style.overflow = ''; document.removeEventListener('keydown', onKey); };
  }, [open, close]);

  const toggleTheme = () => {
    const root = document.documentElement;
    const current = root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('kd-theme', next); } catch { /* private mode */ }
  };

  let i = 0;
  const s = () => ({ 'data-stagger': true, style: { ['--i' as string]: i++ } });

  return (
    <>
      <header className="bar" data-hidden={atTop && !open ? 'true' : 'false'}>
        <div className="bar__start">
          <button ref={btnRef} type="button" className="menu-btn" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((v) => !v)}>
            <span>{ui.menu[lang]}</span>
            <span aria-hidden="true">{ui.close[lang]}</span>
            <span className="visually-hidden">{open ? ui.close[lang] : ''}</span>
          </button>
          <button type="button" className="icon-btn" onClick={toggleTheme} aria-label={ui.theme[lang]} title={ui.theme[lang]}>
            <span className="theme-icon theme-icon--dark"><MoonIcon /></span>
            <span className="theme-icon theme-icon--light"><SunIcon /></span>
          </button>
          <Link className="icon-btn" href={href(other, route)} hrefLang={other} lang={other} aria-label={ui.other[lang]} title={ui.other[lang]}>
            {ui.otherShort[lang]}
          </Link>
        </div>
        <Link href={href(lang, 'home')} className="bar__mark" aria-label={ui.home[lang]}>
          <Mark />
        </Link>
        <div className="bar__end">
          <Link className="btn" href={href(lang, 'estimate')}><span className="long">{ui.estimate[lang]}</span><span className="short">{ui.estimateShort[lang]}</span></Link>
        </div>
      </header>

      <div id="site-menu" ref={menuRef} className="menu" data-open={open} inert={!open} onClick={(e) => { if ((e.target as HTMLElement).closest('a')) setOpen(false); }}>
        <div className="menu__tools">
          <button type="button" className="icon-btn" onClick={toggleTheme} aria-label={ui.theme[lang]}>
            <span className="theme-icon theme-icon--dark"><MoonIcon /></span>
            <span className="theme-icon theme-icon--light"><SunIcon /></span>
          </button>
          <Link className="icon-btn" href={href(other, route)} hrefLang={other} lang={other} aria-label={ui.other[lang]}>{ui.otherShort[lang]}</Link>
        </div>
        <nav aria-label={ui.nav[lang]} style={{ display: 'contents' }}>
          <div className="menu__col">
            <ul>
              <li {...s()}><Link href={href(lang, 'about')}>{ui.about[lang]}</Link></li>
              <li {...s()}><Link href={href(lang, 'about', '#roots')}>{ui.heritage[lang]}</Link></li>
              <li {...s()}><Link href={href(lang, 'about', '#process')}>{ui.process[lang]}</Link></li>
              <li {...s()}><Link href={href(lang, 'about', '#values')}>{ui.values[lang]}</Link></li>
            </ul>
            <Link className="menu__big" href={href(lang, 'about')} {...s()}>{ui.studio[lang]}</Link>
          </div>
          <div className="menu__col">
            <ul>
              {specialties.map((sp) => (
                <li key={sp.id} {...s()}><Link href={href(lang, 'specialties', `#${sp.id}`)}>{sp.title[lang]}</Link></li>
              ))}
            </ul>
            <Link className="menu__big" href={href(lang, 'specialties')} {...s()}>{ui.specs[lang]}</Link>
          </div>
          <div className="menu__col">
            <ul>
              {projects.slice(0, 5).map((p) => (
                <li key={p.id} {...s()}><Link href={href(lang, 'projects', `#${p.id}`)}>{p.title[lang]}</Link></li>
              ))}
              <li {...s()}><Link href={href(lang, 'projects')}>{ui.allWork[lang]}</Link></li>
            </ul>
            <Link className="menu__big" href={href(lang, 'projects')} {...s()}>{ui.work[lang]}</Link>
          </div>
          <div className="menu__stack">
            <Link href={href(lang, 'estimate')}><span {...s()}>{ui.estimate[lang]}</span></Link>
            <Link href={href(lang, 'contact')}><span {...s()}>{ui.contact[lang]}</span></Link>
            <Link href={href(lang, 'estimate', '#faq')}><span {...s()}>{ui.faq[lang]}</span></Link>
            <Link href={href(lang, 'home')}><span {...s()}>{ui.homeShort[lang]}</span></Link>
          </div>
        </nav>
      </div>
    </>
  );
}
