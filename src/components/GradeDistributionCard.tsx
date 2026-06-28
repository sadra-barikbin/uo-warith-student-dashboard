"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { CardSkeleton, Skeleton } from "./Skeleton";

interface GradeDistributionData {
  distribution: { label: string; count: number; you?: boolean }[];
}

export function GradeDistributionCard() {
  const { data } = useSWR<GradeDistributionData>("/api/grade-distribution", fetcher);
  if (!data)
    return (
      <CardSkeleton minHeight={260}>
        <Skeleton style={{ width: "55%", height: 14 }} />
        <Skeleton style={{ width: "75%", height: 11 }} />
        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 150, marginTop: 10 }}>
          {[40, 70, 100, 65, 35, 50].map((h, i) => (
            <Skeleton key={i} style={{ flex: 1, height: `${h}%` }} />
          ))}
        </div>
      </CardSkeleton>
    );
  const gradeDistribution = data.distribution;
  const maxN = Math.max(...gradeDistribution.map((d) => d.count));
  const bars = gradeDistribution.map((d) => ({
    label: d.label,
    height: `${((d.count / maxN) * 100).toFixed(1)}%`,
    you: !!d.you,
    color: d.you ? "var(--accent)" : "var(--bar-bg)",
  }));

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
      <div style={{ fontWeight: 700, fontSize: 16 }}>توزيع درجات الدفعة</div>
      <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 3 }}>الدرجات النهائية — الخوارزميات CS 340</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 150, marginTop: 24 }}>
        {bars.map((b) => (
          <div key={b.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%", gap: 6 }}>
            {b.you && (
              <div style={{ fontSize: 9.5, fontWeight: 700, color: "var(--accent)", background: "var(--accent-12)", padding: "2px 5px", borderRadius: 5, whiteSpace: "nowrap" }}>
                أنتِ
              </div>
            )}
            <div style={{ width: "62%", borderRadius: "5px 5px 0 0", height: b.height, background: b.color }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 5, marginTop: 8, borderTop: "1px solid var(--bd)", paddingTop: 8 }}>
        {bars.map((b) => (
          <div key={b.label} style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-plex-mono), monospace", fontSize: 10.5, color: "var(--muted)" }}>
            {b.label}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: "var(--muted-s)", marginTop: 14, lineHeight: 1.7 }}>
        أنتِ في فئة <span style={{ color: "var(--accent)", fontWeight: 600 }}>A−</span> — أعلى من 81% من الدفعة.
      </div>
    </div>
  );
}
