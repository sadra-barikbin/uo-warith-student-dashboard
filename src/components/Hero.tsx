"use client";

import { useApi } from "@/lib/useApi";
import { ChevronUpTrendIcon } from "./icons";

interface StudentData {
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

export function Hero() {
  const { data } = useApi<StudentData>("/api/student");
  if (!data) return <section data-hero style={{ minHeight: 168 }} />;
  const { student, rankInfo, academicStanding } = data;
  return (
    <section data-hero style={{ display: "flex", gap: 20, alignItems: "stretch" }}>
      <div
        style={{
          flex: 1,
          minWidth: 240,
          borderRadius: 18,
          border: "1px solid var(--bd)",
          boxShadow: "var(--card-shadow)",
          background: "linear-gradient(225deg, var(--accent-12), var(--hero-ov) 55%)",
          padding: 24,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: 13, color: "var(--accent)", fontWeight: 600 }}>
          صباح الخير، {student.firstName}
        </div>
        <div
          style={{
            fontSize: 25,
            fontWeight: 700,
            lineHeight: 1.4,
            margin: "10px 0 8px",
          }}
        >
          ترتيبكِ <span style={{ color: "var(--accent)" }}>السابع</span> من {rankInfo.cohortSize} هذا الفصل.
        </div>
        <div style={{ fontSize: 13.5, color: "var(--muted-s)", lineHeight: 1.7 }}>
          أنتِ ضمن الأعلى 5% من دفعتكِ، ومعدلكِ ارتفع بمقدار أربعة أجزاء من مئة منذ الفصل الماضي. زخمٌ قويّ مع
          اقتراب الامتحانات النهائية.
        </div>
      </div>

      <div data-stats style={{ flex: 1.35, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
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
    </section>
  );
}
