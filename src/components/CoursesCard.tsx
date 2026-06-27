"use client";

import { useState } from "react";
import { gradeBand, type Course } from "@/lib/data";
import { useApi } from "@/lib/useApi";

type Term = "current" | "past";

interface CoursesData {
  term: Term;
  courses: Course[];
  meta: { gpa: string; sub: string; credits: string };
}

const bandTokens: Record<string, { color: string; bg: string }> = {
  pos: { color: "var(--pos)", bg: "var(--pos-bg)" },
  info: { color: "var(--info)", bg: "var(--info-bg)" },
  warn: { color: "var(--warn)", bg: "var(--warn-bg)" },
  neg: { color: "var(--neg)", bg: "var(--neg-bg)" },
};

function tabStyle(active: boolean): React.CSSProperties {
  return {
    padding: "7px 14px",
    borderRadius: 8,
    border: `1px solid ${active ? "var(--accent-22)" : "var(--bd-3)"}`,
    background: active ? "var(--accent-12)" : "transparent",
    color: active ? "var(--text-strong)" : "var(--muted)",
    fontFamily: "var(--font-plex-arabic), sans-serif",
    fontWeight: 500,
    fontSize: 13,
    cursor: "pointer",
    whiteSpace: "nowrap",
  };
}

export function CoursesCard() {
  const [term, setTerm] = useState<Term>("current");
  const { data } = useApi<CoursesData>(`/api/courses?term=${term}`);

  if (!data) {
    return <div style={{ borderRadius: 18, border: "1px solid var(--bd)", boxShadow: "var(--card-shadow)", background: "var(--surface)", minHeight: 360 }} />;
  }
  const { courses, meta } = data;

  return (
    <div style={{ borderRadius: 18, border: "1px solid var(--bd)", boxShadow: "var(--card-shadow)", background: "var(--surface)", padding: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>المقررات المسجَّلة</div>
          <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 3 }}>
            {meta.sub} · معدل الفصل {meta.gpa} · {meta.credits}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={tabStyle(term === "current")} onClick={() => setTerm("current")}>
            الفصل الثاني 2026
          </button>
          <button style={tabStyle(term === "past")} onClick={() => setTerm("past")}>
            الفصل الأول 2025
          </button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {courses.map((c) => {
          const band = bandTokens[gradeBand(c.grade)];
          return (
            <div
              key={c.code}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: 12,
                borderRadius: 12,
                border: "1px solid var(--bd-2)",
                background: "var(--ov-s)",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 62,
                  fontFamily: "var(--font-plex-mono), monospace",
                  fontSize: 12.5,
                  color: "var(--muted-s)",
                  fontWeight: 500,
                  direction: "ltr",
                  textAlign: "center",
                }}
              >
                {c.code}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {c.name}
                </div>
                <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 2 }}>
                  {c.instr} · {c.credits} وحدة
                </div>
              </div>
              <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 84, height: 6, borderRadius: 6, background: "var(--track)", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 6, width: `${c.pct}%`, background: band.color }} />
                </div>
                <div style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 12, color: "var(--muted)", width: 34, textAlign: "center", direction: "ltr" }}>
                  {c.pct}%
                </div>
                <div
                  style={{
                    minWidth: 42,
                    textAlign: "center",
                    padding: "4px 8px",
                    borderRadius: 7,
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    color: band.color,
                    background: band.bg,
                  }}
                >
                  {c.grade}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
