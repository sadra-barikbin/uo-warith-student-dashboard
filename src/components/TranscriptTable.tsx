"use client";

import type { TranscriptTerm } from "@/lib/data";
import { useApi } from "@/lib/useApi";

interface TranscriptData {
  transcript: TranscriptTerm[];
}

export function TranscriptTable() {
  const { data } = useApi<TranscriptData>("/api/transcript");

  if (!data) {
    return (
      <div style={{ borderRadius: 18, border: "1px solid var(--bd)", boxShadow: "var(--card-shadow)", background: "var(--surface)", minHeight: 300 }} />
    );
  }

  const { transcript } = data;
  const totalCredits = transcript.reduce((sum, t) => sum + t.credits, 0);

  return (
    <div style={{ borderRadius: 18, border: "1px solid var(--bd)", boxShadow: "var(--card-shadow)", background: "var(--surface)", padding: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>السجل الفصلي</div>
          <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 3 }}>المعدل التراكمي والوحدات لكل فصل</div>
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "var(--font-plex-mono), monospace" }}>
          {totalCredits} وحدة إجمالاً
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {[...transcript].reverse().map((t) => {
          const inProgress = t.status !== "مكتمل";
          return (
            <div
              key={t.term}
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
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{t.label}</div>
                <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 2 }}>{t.credits} وحدة</div>
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "4px 10px",
                  borderRadius: 7,
                  color: inProgress ? "var(--accent)" : "var(--pos)",
                  background: inProgress ? "var(--accent-12)" : "var(--pos-bg)",
                  whiteSpace: "nowrap",
                }}
              >
                {t.status}
              </div>
              <div
                style={{
                  minWidth: 50,
                  textAlign: "center",
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                {t.gpa.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
