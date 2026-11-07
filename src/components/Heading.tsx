import type { ElementType } from 'react';
import { t, type L, type Lang } from '@/lib/i18n';

/** Split a phrase into word spans so the heading can fade in word by word. */
function Words({ text }: { text: string }) {
  const parts = text.split(/(\s+)/);
  return (
    <>
      {parts.map((p, i) => (p.trim() ? <span className="w" key={i}>{p}</span> : p))}
    </>
  );
}

interface Props {
  as?: ElementType;
  lang: Lang;
  before?: L;
  accent?: L;
  after?: L;
  className?: string;
  id?: string;
}

/** The reference's mixed heading: thin display words around one heavier accent word. */
export function Heading({ as: Tag = 'h2', lang, before, accent, after, className = '', id }: Props) {
  return (
    <Tag id={id} className={`display words ${className}`}>
      {before && <Words text={t(before, lang)} />}
      {accent && (
        <>
          {' '}
          <em className="w">{t(accent, lang)}</em>{' '}
        </>
      )}
      {after && <Words text={t(after, lang)} />}
    </Tag>
  );
}
