"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { ChevronUpTrendIcon } from "./icons";
import { Skeleton } from "./Skeleton";

export interface StudentData {
  student: { firstName: string };
  rankInfo: { rank: number; cohortSize: number };
  academicStanding: {
    cumulativeGpa: number;
    prevGpa: number;
    delta: number;
    creditsEarned: number;
    creditsTotal: number;
    status: string;
    statusSub: string;
  };
}

const cardBase: React.CSSProperties = {
  borderRadius: 16,
  border: "1px solid var(--bd)",
  boxShadow: "var(--card-shadow)",
  background: "var(--surface)",
  padding: 18,
};

export function StatCards() {
  const { data } = useSWR<StudentData>("/api/student", fetcher);
  if (!data)
    return (
      <div data-stats style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{ ...cardBase, display: "flex", flexDirection: "column", gap: 10 }}>
            <Skeleton style={{ width: "55%", height: 11 }} />
            <Skeleton style={{ width: "70%", height: 28 }} />
            <Skeleton style={{ width: "85%", height: 11 }} />
          </div>
        ))}
      </div>
    );
  const { rankInfo, academicStanding } = data;

  return (
    <div data-stats style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <div style={cardBase}>
        <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600 }}>المعدل التراكمي</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 9 }}>
          <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: 30, fontWeight: 600 }}>
            {academicStanding.cumulativeGpa.toFixed(2)}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--pos)",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <ChevronUpTrendIcon />
            {academicStanding.delta.toFixed(2)}
          </div>
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 5 }}>
          مقابل {academicStanding.prevGpa.toFixed(2)} الفصل الماضي · من 4.00
        </div>
      </div>

      <div
        style={{
          ...cardBase,
          border: "1px solid var(--accent-22)",
          background: "linear-gradient(200deg,var(--accent-12),var(--surface) 70%)",
        }}
      >
        <div style={{ fontSize: 11, color: "var(--accent-label)", fontWeight: 600 }}>الترتيب على الدفعة</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 9 }}>
          <div
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontSize: 30,
              fontWeight: 600,
              color: "var(--accent)",
            }}
          >
            #{rankInfo.rank}
          </div>
          <div style={{ fontSize: 12, color: "var(--on-tint)", fontWeight: 600 }}>الأعلى 5%</div>
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 5 }}>
          من {rankInfo.cohortSize} في علوم الحاسوب
        </div>
      </div>

      <div style={cardBase}>
        <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600 }}>الوحدات المكتسبة</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 9 }}>
          <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: 30, fontWeight: 600 }}>
            {academicStanding.creditsEarned}
          </div>
          <div style={{ fontSize: 14, color: "var(--muted)", fontFamily: "var(--font-plex-mono), monospace" }}>
            /{academicStanding.creditsTotal}
          </div>
        </div>
        <div style={{ height: 6, borderRadius: 6, background: "var(--track)", marginTop: 11, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${(academicStanding.creditsEarned / academicStanding.creditsTotal) * 100}%`,
              borderRadius: 6,
              background: "linear-gradient(90deg,var(--accent),var(--accent2))",
            }}
          />
        </div>
      </div>

      <div style={cardBase}>
        <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600 }}>الوضع الأكاديمي</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 11 }}>
          <div
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "var(--pos)",
              boxShadow: "0 0 0 4px var(--pos-soft)",
            }}
          />
          <div style={{ fontSize: 19, fontWeight: 700 }}>{academicStanding.status}</div>
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 7 }}>{academicStanding.statusSub}</div>
      </div>
    </div>
  );
}
