import type { Announcement } from "@/lib/data";

const tagTokens: Record<string, { color: string; bg: string }> = {
  pos: { color: "var(--pos)", bg: "var(--pos-bg)" },
  warn: { color: "var(--warn)", bg: "var(--warn-bg)" },
  accent: { color: "var(--accent)", bg: "var(--accent-12)" },
  alt: { color: "var(--alt)", bg: "var(--alt-bg)" },
};

export function AnnouncementsCard({
  announcements,
  onMarkRead,
}: {
  announcements: (Announcement & { unread: boolean })[];
  onMarkRead: (id: string) => void;
}) {
  const unread = announcements.filter((a) => a.unread).length;

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontWeight: 700, fontSize: 16 }}>الإعلانات</div>
        <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{unread} غير مقروءة</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 14 }}>
        {announcements.map((a) => {
          const token = tagTokens[a.key];
          return (
            <div
              key={a.id}
              onClick={() => onMarkRead(a.id)}
              style={{
                borderRadius: 14,
                border: "1px solid var(--bd)",
                boxShadow: "var(--card-shadow)",
                background: "var(--surface)",
                padding: 16,
                cursor: "pointer",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 10.5, fontWeight: 600, color: token.color, background: token.bg, padding: "3px 9px", borderRadius: 6 }}>
                  {a.tag}
                </span>
                {a.unread && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />}
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.6 }}>{a.title}</div>
              <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 10 }}>{a.time}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
