'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** One observer for the whole page: section entrances, word-by-word headings, picture drift and parallax. */
export function Motion() {
  const path = usePathname();
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal], .words, .drift');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }),
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );
    targets.forEach((el) => io.observe(el));

    // word-by-word headings: stagger each word
    document.querySelectorAll<HTMLElement>('.words').forEach((h) => {
      h.querySelectorAll<HTMLElement>('.w').forEach((w, i) => { w.style.transitionDelay = `${i * 90}ms`; });
    });

    const items = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
    let raf = 0;
    const tick = () => {
      raf = 0;
      const vh = innerHeight;
      for (const el of items) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) continue;
        const k = Number(el.dataset.parallax) || 0.08;
        const off = (r.top + r.height / 2 - vh / 2) * -k;
        el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    if (!reduce && items.length) { tick(); addEventListener('scroll', onScroll, { passive: true }); }
    return () => { io.disconnect(); removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [path]);
  return null;
}
