/** The kimdesign mark: a square kashi frame holding a K laid in brick courses. */
const cells: [number, number][] = [
  [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  [1, 3], [2, 2], [3, 1], [4, 0], [2, 4], [3, 5], [4, 6],
];
export function Mark({ title }: { title?: string }) {
  return (
    <svg viewBox="0 0 64 64" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title} fill="currentColor">
      <path fillRule="evenodd" d="M2 2h60v60H2zM6 6v52h52V6z" />
      <path fillRule="evenodd" d="M9 9h46v46H9zM10.5 10.5v43h43v-43z" opacity=".55" />
      {cells.map(([c, r]) => (
        <rect key={`${c}-${r}`} x={17 + c * 5.2} y={14.5 + r * 5.2} width={4.4} height={4.4} />
      ))}
      <rect x="43" y="14.5" width="4.4" height="4.4" opacity=".45" />
      <rect x="43" y="45.7" width="4.4" height="4.4" opacity=".45" />
    </svg>
  );
}

/** The motif used above labels: a square within a square, after the brick-bond bands. */
export function Motif() {
  return (
    <svg viewBox="0 0 72 72" aria-hidden="true">
      <path fill="currentColor" fillRule="evenodd" d="M0 0h72v72H0zM8 8v56h56V8zM14 14h44v44H14zM20 20v32h32V20z" />
      <rect x="24" y="24" width="24" height="24" fill="var(--gold)" />
      <rect x="31" y="31" width="10" height="10" fill="var(--paper)" />
    </svg>
  );
}
