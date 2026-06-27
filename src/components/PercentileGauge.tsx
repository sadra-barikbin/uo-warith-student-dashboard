import { rankInfo } from "@/lib/data";

const R = 64;
const C = 2 * Math.PI * R;

export type RankDisplay = "exact" | "percentile" | "both";

export function PercentileGauge({ rankDisplay = "both" }: { rankDisplay?: RankDisplay }) {
  const fraction = rankInfo.percentile / 100;
  const dash = `${(fraction * C).toFixed(1)} ${C.toFixed(1)}`;
  const rankBig = rankDisplay === "percentile" ? "5%" : `#${rankInfo.rank}`;
  const rankSub =
    rankDisplay === "exact"
      ? `من ${rankInfo.cohortSize} طالباً`
      : rankDisplay === "percentile"
        ? `الأعلى من ${rankInfo.cohortSize}`
        : `الأعلى 5% · من ${rankInfo.cohortSize}`;
  const diff = (rankInfo.studentGpa - rankInfo.cohortAvgGpa).toFixed(2);

  return (
    <div
      style={{
        borderRadius: 18,
        border: "1px solid var(--bd)",
        boxShadow: "var(--card-shadow)",
        background: "var(--surface)",
        padding: 22,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 16 }}>المئوية على الدفعة</div>
      <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 3 }}>موقعكِ بين زملائك في التخصص</div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 0" }}>
        <svg viewBox="0 0 160 160" style={{ width: 170, height: 170 }}>
          <circle cx={80} cy={80} r={R} fill="none" stroke="var(--track)" strokeWidth={13} />
          <circle
            cx={80}
            cy={80}
            r={R}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={13}
            strokeLinecap="round"
            strokeDasharray={dash}
            transform="rotate(-90 80 80)"
          />
          <text x={80} y={72} textAnchor="middle" fill="var(--text-strong)" fontSize={34} fontWeight={600} fontFamily="var(--font-space-grotesk), sans-serif">
            {rankBig}
          </text>
          <text x={80} y={96} textAnchor="middle" fill="var(--muted)" fontSize={11.5} fontFamily="var(--font-plex-arabic), sans-serif">
            {rankSub}
          </text>
        </svg>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--bd)", paddingTop: 14, fontSize: 12.5 }}>
        <div>
          <div style={{ color: "var(--muted)" }}>متوسط الدفعة</div>
          <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600, fontSize: 16, marginTop: 3 }}>
            {rankInfo.cohortAvgGpa.toFixed(2)}
          </div>
        </div>
        <div style={{ textAlign: "left" }}>
          <div style={{ color: "var(--muted)" }}>فارقكِ</div>
          <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 600, fontSize: 16, marginTop: 3, color: "var(--pos)" }}>
            +{diff}
          </div>
        </div>
      </div>
    </div>
  );
}
