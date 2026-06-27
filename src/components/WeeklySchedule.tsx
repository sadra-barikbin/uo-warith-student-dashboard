import { schedule } from "@/lib/data";
import { ArrowLeftIcon } from "./icons";

const colorTokens: Record<string, string> = {
  pos: "var(--pos)",
  info: "var(--info)",
  warn: "var(--warn)",
  alt: "var(--alt)",
};

export function WeeklySchedule() {
  return (
    <section style={{ borderRadius: 18, border: "1px solid var(--bd)", boxShadow: "var(--card-shadow)", background: "var(--surface)", padding: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>الجدول الأسبوعي</div>
          <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 3 }}>الفصل الثاني 2026 · المحاضرات والمختبرات</div>
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
            cursor: "pointer",
          }}
        >
          الامتحانات النهائية
          <ArrowLeftIcon />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12 }}>
        {schedule.map((d) => (
          <div key={d.day} style={{ display: "flex", flexDirection: "column", gap: 9, minWidth: 0 }}>
            <div style={{ fontSize: 11.5, color: "var(--muted)", fontWeight: 600, paddingBottom: 4, borderBottom: "1px solid var(--bd)" }}>
              {d.day}
            </div>
            {d.items.map((it, idx) => (
              <div
                key={idx}
                style={{
                  borderRadius: 10,
                  padding: 10,
                  background: "var(--ov-2)",
                  borderInlineStart: `2px solid ${colorTokens[it.col]}`,
                }}
              >
                <div style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: 11, color: "var(--muted-s)", direction: "ltr", textAlign: "start" }}>
                  {it.t}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, marginTop: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {it.c}
                </div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{it.r}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
