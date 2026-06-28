"use client";

import { useApi } from "@/lib/useApi";

interface GpaTrendData {
  series: { term: string; gpa: number }[];
}

const X0 = 46;
const X1 = 524;
const Y0 = 22;
const Y1 = 160;
const MIN = 3.3;
const MAX = 3.9;

function xFor(i: number, length: number) {
  return X1 - ((X1 - X0) * i) / (length - 1);
}
function yFor(gpa: number) {
  return Y1 - ((gpa - MIN) / (MAX - MIN)) * (Y1 - Y0);
}

export function GpaTrendChart() {
  const { data } = useApi<GpaTrendData>("/api/gpa-trend");
  if (!data) return <div style={{ borderRadius: 18, border: "1px solid var(--bd)", boxShadow: "var(--card-shadow)", background: "var(--surface)", minHeight: 244 }} />;
  const gpaSeries = data.series;
  const points = gpaSeries.map((d, i) => ({
    term: d.term,
    gpa: d.gpa.toFixed(2),
    cx: +xFor(i, gpaSeries.length).toFixed(1),
    cy: +yFor(d.gpa).toFixed(1),
    last: i === gpaSeries.length - 1,
  }));

  const line = points.map((p, i) => `${i ? "L" : "M"} ${p.cx} ${p.cy}`).join(" ");
  const area = `M ${points[0].cx} ${Y1} ${points.map((p) => `L ${p.cx} ${p.cy}`).join(" ")} L ${points[points.length - 1].cx} ${Y1} Z`;
  const grid = [3.4, 3.55, 3.7, 3.85].map((g) => ({ y: +yFor(g).toFixed(1), label: g.toFixed(2) }));

  return (
    <div style={{ borderRadius: 18, border: "1px solid var(--bd)", boxShadow: "var(--card-shadow)", background: "var(--surface)", padding: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>اتجاه المعدل التراكمي</div>
          <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 3 }}>المعدل التراكمي عبر ستة فصول دراسية</div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            fontSize: 12,
            color: "var(--muted-s)",
            border: "1px solid var(--bd-3)",
            padding: "6px 11px",
            borderRadius: 8,
          }}
        >
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--accent)" }} />
          تراكمي
        </div>
      </div>
      <svg viewBox="0 0 560 200" style={{ width: "100%", height: "auto", display: "block", marginTop: 6, overflow: "visible" }}>
        <defs>
          <linearGradient id="gpaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {grid.map((g) => (
          <g key={g.label}>
            <line x1={46} x2={524} y1={g.y} y2={g.y} stroke="var(--bd)" strokeWidth={1} />
            <text x={532} y={g.y} textAnchor="start" dominantBaseline="middle" fill="var(--faint)" fontSize={11} fontFamily="var(--font-plex-mono), monospace">
              {g.label}
            </text>
          </g>
        ))}
        <path d={area} fill="url(#gpaFill)" />
        <path d={line} fill="none" stroke="var(--accent)" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p) => (
          <g key={p.term}>
            <circle cx={p.cx} cy={p.cy} r={4} fill="var(--bg)" stroke="var(--accent)" strokeWidth={2.2} />
            <text x={p.cx} y={192} textAnchor="middle" fill="var(--muted)" fontSize={11} fontFamily="var(--font-plex-mono), monospace">
              {p.term}
            </text>
            {p.last && (
              <>
                <circle cx={p.cx} cy={p.cy} r={6.5} fill="none" stroke="var(--accent)" strokeWidth={1.5} opacity={0.4} />
                <text x={p.cx} y={p.cy} dx={12} dy={-10} textAnchor="start" fill="var(--text-strong)" fontSize={12.5} fontWeight={600} fontFamily="var(--font-space-grotesk), sans-serif">
                  {p.gpa}
                </text>
              </>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
