export function Skeleton({ style }: { style?: React.CSSProperties }) {
  return <div data-skeleton style={style} />;
}

export function CardSkeleton({
  minHeight,
  children,
}: {
  minHeight: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        borderRadius: 18,
        border: "1px solid var(--bd)",
        boxShadow: "var(--card-shadow)",
        background: "var(--surface)",
        padding: 22,
        minHeight,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {children}
    </div>
  );
}
