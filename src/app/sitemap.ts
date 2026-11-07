import type { MetadataRoute } from 'next';
import { href, routes, type RouteKey } from '@/lib/i18n';
import { abs } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const keys = (Object.keys(routes) as RouteKey[]).filter((k) => k !== 'credits');
  const priority: Partial<Record<RouteKey, number>> = { home: 1, estimate: 0.9, specialties: 0.8, projects: 0.8 };
  return keys.flatMap((k) =>
    (['fa', 'en'] as const).map((lang) => ({
      url: abs(href(lang, k)),
      lastModified: new Date(),
      changeFrequency: k === 'projects' ? 'monthly' : 'yearly',
      priority: (priority[k] ?? 0.6) * (lang === 'fa' ? 1 : 0.9),
      alternates: { languages: { fa: abs(href('fa', k)), en: abs(href('en', k)), 'x-default': abs(href('fa', k)) } },
    })),
  );
}
